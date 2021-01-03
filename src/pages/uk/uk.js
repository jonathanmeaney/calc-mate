import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import InputGroup from 'react-bootstrap/InputGroup';

const UKPage = () => {
  const [key, setKey] = useState('paye');
  const [calculationValues, setCalculationValues] = useState({
    frequency: '1',
    period: '1'
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
    const periodMap = {
      '1': 52,
      '2': 12,
      '3': 26,
      '4': 13
    };
    const periodCount = periodMap[frequency];
    const options = [];

    for(let i=1; i<= periodCount; i++){
      options.push(
        <option key={`frequency_option_${i}`} value={String(i)}>{i}</option>
      );
    }

    return options;
  }

  return (
    <div className='uk'>
      <h1>UK</h1>
      <Row>
        <Col xs={12} md={4}>
          <h2>Calculations</h2>
          <Tabs
            id='calculation-tabs'
            defaultActiveKey='paye'
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey='paye' title='Paye'>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column xs='2'>Pay</Form.Label>
                  <Col xs='10'>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>£</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name='pay'
                        as='input'
                        type='number'
                        placeholder='Enter pay'
                        onChange={updateCalculationValue}
                      />
                    </InputGroup>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column xs='2'>Frequency</Form.Label>
                  <Col xs='10'>
                    <Form.Control
                      as='select'
                      name='frequency'
                      custom
                      onChange={updateCalculationValue}
                    >
                      <option value='1'>Weekly</option>
                      <option value='2'>Monthly</option>
                      <option value='3'>Two Weekly</option>
                      <option value='4'>Four Weekly</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column xs='2'>Period</Form.Label>
                  <Col xs='10'>
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

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </Tab>
            <Tab eventKey='usc' title='USC'>
              <Form>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type='email' placeholder='Enter email' />
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Password' />
                </Form.Group>
                <Form.Group controlId='formBasicCheckbox'>
                  <Form.Check type='checkbox' label='Check me out' />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </Tab>
          </Tabs>
          <br/>
        </Col>
        <Col xs={12} md={4}>
          <h2>Results</h2>
        </Col>
        <Col xs={12} md={4}>
          <h2>History</h2>
          <Card
            bg='info'
            text='white'
          >
            <Card.Header>Calculation: 13:45:32 01/01/2021</Card.Header>
            <Card.Body>
              <Card.Title>PAYE</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UKPage;
