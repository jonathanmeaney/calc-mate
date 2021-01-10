import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Paye from './calculations/paye';

const IrishPage = () => {
  const labelCol = 4;
  const inputCol = 8;

  const [key, setKey] = useState('paye');

  return (
    <div className='irish'>
      <h2>Irish</h2>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </div>
  );
};

export default IrishPage;
