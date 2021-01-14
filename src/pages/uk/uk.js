import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const UKPage = () => {
  const labelCol = 4;
  const inputCol = 8;

  const [key, setKey] = useState('paye');

  return (
    <div className='irish'>
      <h2>UK</h2>
      <Row>
        <Col>
          <Tabs
            id='calculation-tabs'
            defaultActiveKey='paye'
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey='paye' title='PAYE'>
              <h3>Coming Soon</h3>
            </Tab>
            <Tab eventKey='ni' title='NI'>
              <h3>Coming Soon</h3>
            </Tab>
            <Tab eventKey='pensions' title='Pensions'>
              <h3>Coming Soon</h3>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default UKPage;
