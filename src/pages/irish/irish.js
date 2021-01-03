import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Paye from './calculations/paye';

const IrishPage = () => {
  const labelCol = 3;
  const inputCol = 9;

  const [key, setKey] = useState('paye');

  return (
    <div className='irish'>
      <h1>Irish</h1>
      <Row>
        <Col xs={12} md={8}>
          <h2>Calculations</h2>
          <Tabs
            id='calculation-tabs'
            defaultActiveKey='paye'
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey='paye' title='PAYE'>
              <Paye labelCol={labelCol} inputCol={inputCol} />
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
          <h2>History</h2>
          <Card
            bg='info'
            text='white'
          >
            <Card.Header>01/01/2021 13:45:32</Card.Header>
            <Card.Body>
              <Card.Title>PAYE</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
              </Card.Text>
            </Card.Body>
            <Card.Footer><Button block variant='light'>Open</Button></Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default IrishPage;
