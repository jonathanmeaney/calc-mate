import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';

import { calculationsSelector } from 'slices/calculations';

import TextUtils from 'lib/text-utils';

import './style.scss';

const CalculationHistory = () => {
  const calculations = useSelector(calculationsSelector);

  const cards = calculations.map((calculation) => {
    const inputs = calculation.inputs || {};
    let flag = <span role="img" aria-label="Flag: Ireland">🇮🇪</span>;
    if(calculation.country !== 'IE'){
      flag = <span role="img" aria-label="Flag: United Kingdom">🇬🇧</span>;
    }
    const inputsRows = [];
    let inputTable = null;
    Object.keys(inputs).sort().forEach((key) => {
      const value = inputs[key] || '';
      inputsRows.push(
        <tr key={uuidv4()}>
          <td>{key}:</td><td><Badge variant='light'>{value}</Badge></td>
        </tr>
      )
    });

    if(inputsRows.length > 0){
      inputTable = (
        <div className='inputs-table-container'>
          Inputs<br/>
          <Table size='sm' className='inputs-table'>
            <tbody>
              {inputsRows}
            </tbody>
          </Table>
        </div>
      );
    }

    const calculationValue = () => {
      let values = calculation.value;
      if(typeof values === 'object'){
        let attributes = [];
        Object.keys(calculation.value).forEach((key) => {
          const value = calculation.value[key];
          attributes.push(<tr key={uuidv4()}><td>{TextUtils.capitalize(key)}:</td><td><Badge variant='secondary'>{String(value)}</Badge></td></tr>);
        });

        values = (
          <Table size='sm' className='values-table'>
            <tbody>
              {attributes}
            </tbody>
          </Table>
        );
      }

      return (
        <Badge variant='light'>{values}</Badge>
      )
    }

    return(
      <Card
        bg='info'
        text='white'
        className='history-card'
        key={calculation.id}
      >
        <Card.Header>{calculation.time}</Card.Header>
        <Card.Body>
          <Card.Title>{flag} {calculation.type} Calculation</Card.Title>
          {inputTable}
          <Card.Title className='right-aligned'>{calculation.type}: {calculationValue()}</Card.Title>
        </Card.Body>
      </Card>
    )
  })
  return (
    <div className='calculation-history'>
      <h2>History</h2>
      <div className='card-list'>
        {cards}
      </div>
    </div>
  );
};

export default CalculationHistory;
