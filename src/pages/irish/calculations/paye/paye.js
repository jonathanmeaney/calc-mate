import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import { addCalculation } from "slices/calculations";
import { frequencyNames } from 'constants/frequencies';
import { taxStatusNames } from 'constants/tax-status';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { frequencyMaxPeriodMap } from 'constants/frequencies';

const Paye = ({
  labelCol,
  inputCol
}) => {
  const dispatch = useDispatch();
  const [calculationValues, setCalculationValues] = useState({
    pay: '',
    frequency: '1',
    period: '1',
    taxStatus: '1',
    srcop: '35300',
    taxCredit: '3300',
    override: {
      srcop: false,
      taxCredit: false
    }
  });

  const updateCalculationValue = (e) => {
    const {name, value, type} = e.target;

    let values = { [name]: value};
    if(type && type === 'checkbox'){
      const currentValue = calculationValues[name];
      values[name] = !Boolean(currentValue);
    }

    if(name === 'frequency'){
      values['period'] = '1';
    }

    setCalculationValues({
      ...calculationValues,
      ...values
    });
    console.log(calculationValues);
  }

  const periodOptions = () => {
    const frequency = calculationValues.frequency || '1';

    const periodCount = frequencyMaxPeriodMap[frequency];
    const options = [];

    for(let i=1; i<= periodCount; i++){
      options.push(
        <option key={`frequency_option_${i}`} value={String(i)}>{i}</option>
      );
    }

    return options;
  }

  const toggleEdit = (field, e) => {
    const updatedValues = calculationValues.override;
    updatedValues[field] = !Boolean(updatedValues[field]);
    setCalculationValues({...calculationValues, 'override': updatedValues});
  }

  const calculate = (e) => {
    e.preventDefault();

    const { frequency, taxStatus } = calculationValues;
    const period = parseFloat(calculationValues.period);
    const pay = parseFloat(calculationValues.pay);
    const srcop = parseFloat(calculationValues.srcop);
    const taxCredit = parseFloat(calculationValues.taxCredit);
    const periods = frequencyMaxPeriodMap[frequency];
    const steps = [];

    const periodSrcop = ((srcop/periods).toFixed(2) * period).toFixed(2);
    steps.push(`1) SRCOP for period: (${srcop} / ${periods}) * ${period} = ${periodSrcop}`);

    const periodTaxCredit = ((taxCredit/periods).toFixed(2) * period).toFixed(2);
    steps.push(`2) Tax Credit for period: ${taxCredit} / ${periods} * ${period} = ${periodTaxCredit}`);

    const srcop20p = (periodSrcop * 0.2).toFixed(2);
    steps.push(`3) SRCOP 20%: ${periodSrcop} * 0.2 = ${srcop20p}`);

    let taxCredit40p = ((pay - periodSrcop) * 0.4).toFixed(2);
    let taxCredit40pStep = `4) 40% of pay - period SRCOP: (${pay} - ${periodSrcop}) * 0.4 = ${taxCredit40p}`;
    if(pay < periodSrcop){
      taxCredit40p = 0;
      taxCredit40pStep = `4) Pay is less than period SRCOP: 0`;
    }
    steps.push(taxCredit40pStep);

    let taxCredit20p = pay * 0.2;
    let taxCredit20pStep = `5) period SRCOP less than pay so get 20% of pay: ${pay} * 0.2 = ${taxCredit20p}`;
    if(periodSrcop < pay){
      taxCredit20p = (parseFloat(srcop20p) + parseFloat(taxCredit40p)).toFixed(2);
      taxCredit20pStep = `5) Add SRCOP 20% + pay period SRCOP difference: ${srcop20p} + ${taxCredit40p} = ${taxCredit20p}`;
    }
    steps.push(taxCredit20pStep);

    let paye = (taxCredit20p - periodTaxCredit).toFixed(2);
    let payeStep = `6) subtract period tax credit from 20% pay: ${taxCredit20p} - ${periodTaxCredit} = ${paye}`;
    if(paye < 0){
      paye = 0;
      payeStep = `6) paye less than 0 so set to 0: 0`;
    }
    steps.push(payeStep);

    const results = {};
    results.periodSrcop = periodSrcop;
    results.periodTaxCredit = periodTaxCredit;
    results.srcop20p = srcop20p;
    results.taxCredit40p = taxCredit40p;
    results.taxCredit20p = taxCredit20p;
    results.paye = paye;
    results.steps = steps;

    setCalculationValues({
      ...calculationValues,
      results
    });

    dispatch(addCalculation({
      inputs: {
        pay,
        frequency: frequencyNames[frequency],
        period,
        taxStatus: taxStatusNames[taxStatus]
      },
      type: 'PAYE',
      value: paye,
      country: 'IE'
    }));
  }

  return (
    <Row>
      <Col xs={12} md={7}>
        <br/>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column xs={labelCol}>Pay</Form.Label>
            <Col xs={inputCol}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>€</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name='pay'
                  as='input'
                  type='number'
                  placeholder='Enter pay'
                  onChange={updateCalculationValue}
                  value={calculationValues.pay}
                />
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column xs={labelCol}>Frequency</Form.Label>
            <Col xs={inputCol}>
              <Form.Control
                as='select'
                name='frequency'
                custom
                onChange={updateCalculationValue}
                value={calculationValues.frequency}
              >
                <option value='1'>Weekly</option>
                <option value='2'>Monthly</option>
                <option value='3'>Two Weekly</option>
                <option value='4'>Four Weekly</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column xs={labelCol}>Period</Form.Label>
            <Col xs={inputCol}>
              <Form.Control
                as='select'
                name='period'
                custom
                onChange={updateCalculationValue}
                value={calculationValues.period}
              >
                {periodOptions()}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column xs={labelCol}>Tax Status</Form.Label>
            <Col xs={inputCol}>
              <Form.Control
                as='select'
                name='taxStatus'
                custom
                onChange={updateCalculationValue}
                value={calculationValues.taxStatus}
              >
                <option value='1'>Normal</option>
                <option value='2'>Week 1</option>
                <option value='3'>Emergency</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column xs={labelCol}>Std Cut Off (Year)</Form.Label>
            <Col xs={inputCol}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>€</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name='srcop'
                  as='input'
                  type='number'
                  placeholder='Enter SRCOP'
                  onChange={updateCalculationValue}
                  value={calculationValues.srcop}
                  disabled={!calculationValues.override.srcop}
                />
                <InputGroup.Append>
                  <InputGroup.Checkbox onClick={(e) => toggleEdit('srcop', e)} aria-label="Override value" />
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column xs={labelCol}>Tax Credits (Year)</Form.Label>
            <Col xs={inputCol}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>€</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name='taxCredit'
                  as='input'
                  type='number'
                  placeholder='Enter Tax Credit'
                  onChange={updateCalculationValue}
                  value={calculationValues.taxCredit}
                  disabled={!calculationValues.override.taxCredit}
                />
                <InputGroup.Append>
                  <InputGroup.Checkbox onClick={(e) => toggleEdit('taxCredit', e)} aria-label="Override value" />
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>

          <Button
            block
            variant='primary'
            type='submit'
            onClick={calculate}
            disabled={calculationValues.pay === ''}
          >
            Calculate
          </Button>
        </Form>
        <br/>
      </Col>
      <Col xs={12} md={5}>
        <br/>
        {calculationValues.results && (
          <>
            <Card bg='success'>
              <Card.Body>
                <h2 className='center-aligned' style={{'marginBottom': '0'}}>PAYE: <Badge variant="light">{calculationValues.results.paye}</Badge> </h2>
              </Card.Body>
            </Card>
            <br/>
            <Accordion>
              <Card bg='dark'>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Steps
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>{(calculationValues.results.steps || []).map(s => <p key={uuidv4()}>{s}</p>)}</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </>
        )}
      </Col>
    </Row>
  );
};

Paye.propTypes = {
  labelCol: PropTypes.number,
  inputCol: PropTypes.number
}

Paye.defaultProps = {
  labelCol: 3,
  inputCol: 9
}

export default Paye;
