import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Paye from './calculations/paye';
import Usc from './calculations/usc';

const IrishPage = () => {
  const labelCol = 4;
  const inputCol = 8;

  const [key, setKey] = useState('paye');

  /* istanbul ignore next */
  const selectTab = (tab) => {
    setKey(tab);
  }

  return (
    <div className='irish'>
      <h2>Irish</h2>
      <Row>
        <Col>
          <Tabs
            id='calculation-tabs'
            defaultActiveKey='paye'
            activeKey={key}
            onSelect={selectTab}
          >
            <Tab eventKey='paye' title='PAYE'>
              <Paye labelCol={labelCol} inputCol={inputCol} />
            </Tab>
            <Tab eventKey='usc' title='USC'>
              <Usc labelCol={labelCol} inputCol={inputCol} />
            </Tab>
            <Tab eventKey='prsi' title='PRSI'>
              <h3>Coming Soon</h3>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default IrishPage;
