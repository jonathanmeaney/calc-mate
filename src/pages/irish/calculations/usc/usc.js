import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { addCalculation } from "slices/calculations";
import { frequencyNames } from 'constants/frequencies';

import { CALCULATION_TYPES, COUNTRIES } from 'constants/enums';
import Calculator from 'lib/calculator';

import CalculationResults from 'components/calculation-results';
import TaxYearPicker from 'components/tax-year-picker';

import { taxYearSelector } from 'slices/tax-year';

const Usc = ({
  labelCol,
  inputCol
}) => {
  const dispatch = useDispatch();
  const taxYear = useSelector(taxYearSelector);

  const selected = taxYear || String(new Date().getFullYear());

  const [calculationValues, setCalculationValues] = useState({
    pay: '',
    frequency: '1',
    taxYear: selected
  });
  const payInputRef = React.createRef();

  const updateCalculationValue = (e) => {
    const {name, value} = e.target;
    let values = { [name]: value};

    setCalculationValues({
      ...calculationValues,
      ...values
    });

    // console.log(calculationValues)
  }

  const calculate = (e) => {
    e.preventDefault();
    payInputRef.current.blur();

    const results = Calculator.calculate(CALCULATION_TYPES.USC, {
      country: COUNTRIES.IE,
      taxYear: calculationValues.taxYear,
      inputs: {
        pay: calculationValues.pay,
        frequency: calculationValues.frequency
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
        taxYear: calculationValues.taxYear
      },
      type: 'USC',
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

Usc.propTypes = {
  labelCol: PropTypes.number,
  inputCol: PropTypes.number
}

Usc.defaultProps = {
  labelCol: 3,
  inputCol: 9
}

export default Usc;
