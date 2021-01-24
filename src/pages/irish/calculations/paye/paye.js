import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { addCalculation } from "slices/calculations";
import { frequencyNames } from 'constants/frequencies';
import { taxStatusNames } from 'constants/tax-status';

import { frequencyMaxPeriodMap } from 'constants/frequencies';
import { CALCULATION_TYPES, COUNTRIES } from 'constants/enums';
import Calculator from 'lib/calculator';

import CalculationResults from 'components/calculation-results';
import TaxYearPicker from 'components/tax-year-picker';

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
    taxYear: String(new Date().getFullYear())
  });
  const payInputRef = React.createRef();

  const updateCalculationValue = (e) => {
    const {name, value} = e.target;
    let values = { [name]: value};

    if(name === 'frequency'){
      values['period'] = '1';
    }

    setCalculationValues({
      ...calculationValues,
      ...values
    });

    // console.log(calculationValues)
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

  const calculate = (e) => {
    e.preventDefault();
    payInputRef.current.blur();

    const results = Calculator.calculate(CALCULATION_TYPES.PAYE, {
      country: COUNTRIES.IE,
      taxYear: calculationValues.taxYear,
      inputs: {
        period: calculationValues.period,
        pay: calculationValues.pay,
        frequency: calculationValues.frequency,
        taxStatus: calculationValues.taxStatus
      }
    });

    setCalculationValues({
      ...calculationValues,
      results
    });

    dispatch(addCalculation({
      inputs: {
        pay: calculationValues.pay,
        frequency: frequencyNames[calculationValues.frequency],
        period: calculationValues.period,
        taxStatus: taxStatusNames[calculationValues.taxStatus],
        taxYear: calculationValues.taxYear
      },
      type: 'PAYE',
      value: results.value,
      country: 'IE'
    }));

    const yOffset = -75;
    const element = document.getElementById('calculation-results');
    /* istanbul ignore next */
    if(element){
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <br/>
        <TaxYearPicker country={COUNTRIES.IE} onChange={updateCalculationValue} />
        <Form>
          <Form.Group as={Row}>
            <Form.Label column xs={labelCol}>Pay</Form.Label>
            <Col xs={inputCol}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>€</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  ref={payInputRef}
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
      </Col>
      <Col xs={12}>
        <br/>
        <CalculationResults results={calculationValues.results} />
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
