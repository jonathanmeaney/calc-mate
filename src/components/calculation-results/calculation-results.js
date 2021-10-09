import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Fade from 'react-reveal/Fade';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaInfoCircle } from 'react-icons/fa';

import TextUtils from 'lib/text-utils';

import CalculationSteps from 'components/calculation-steps';

import './style.scss';

const CalculationResults = ({
  results
}) => {
  const [showSteps, setShowSteps] = useState(false);

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  }

  const resultsValue = () => {
    let values = results.value;
    if(typeof values === 'object'){
      let attributes = [];
      Object.keys(results.value).forEach((key) => {
        const value = results.value[key];
        attributes.push(<span key={uuidv4()} className='result-value-attribute'>{TextUtils.capitalize(key)}: <Badge variant='secondary'>{String(value)}</Badge></span>);
      });

      values = attributes;
    }

    return (
      <Badge variant='light'>{values}</Badge>
    )
  }

  return (
    <div className='calculation-results' id='calculation-results'>
      {Object.keys(results).length > 0 && (
        <Fade>
          <Card bg='success'>
            <Card.Body>
              <h2 className='center-aligned' style={{'marginBottom': '0'}}>
                {results.type}: <Badge variant='light'>{resultsValue()}</Badge>&nbsp;
                <OverlayTrigger
                  key='top'
                  placement='top'
                  overlay={
                    <Tooltip id='tooltip-top'>
                      Click to toggle calculation steps.
                    </Tooltip>
                  }
                >
                  <FaInfoCircle style={{'cursor': 'pointer'}} onClick={toggleSteps} />
                </OverlayTrigger>
              </h2>
              <CalculationSteps steps={results.steps} show={showSteps} />
            </Card.Body>
          </Card>
        </Fade>
      )}
    </div>
  );
};

CalculationResults.propTypes = {
  results: PropTypes.object
}

CalculationResults.defaultProps = {
  results: {}
}

export default CalculationResults;
