import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Fade from 'react-reveal/Fade';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import './style.scss';

const CalculationSteps = ({
  steps,
  show
}) => {

  const stepsList = steps.map((step, index) => {
    const stepPieces = step.split(':');
    const stepDescription = stepPieces[0];
    const stepCalculation = stepPieces[1];
    return (
      <Card bg='dark' className='step' key={uuidv4()}>
        <Card.Body>
          <Badge className='step-number' variant='primary'>{index+1}</Badge>
          <div className='step-body center-aligned'>
            {stepDescription}
            <Card bg='light' text='dark'>
              <Card.Body>
                {stepCalculation}
              </Card.Body>
            </Card>
          </div>
        </Card.Body>
      </Card>
    )
  });

  return (
    <div className='calculation-steps'>
      <Fade collapse when={show}>
        <Card.Body>{stepsList}</Card.Body>
      </Fade>
    </div>
  );
};

CalculationSteps.propTypes = {
  steps: PropTypes.array,
  show: PropTypes.bool
}

CalculationSteps.defaultProps = {
  steps: [],
  show: false
}

export default CalculationSteps;
