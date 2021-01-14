import React from 'react';

import { FaInfoCircle } from 'react-icons/fa';

const HelpPage = () => {
  return (
    <div className='help'>
      <h1>Help</h1>
      <p>
        Calc Mate is an application that lets you perform different tax calculations for the UK and Ireland.
      </p>
      <p>
        Simply pick the country and calculation type you want to do. Then fill in the form with the details and click calculate. The result will be displayed along with an <FaInfoCircle /> and when you click on it you will see the different steps of the calculation and how the final result was achieved.
      </p>
      <p>
        Each calculation you perform is stored in the history. You will be able to see all the calculations you have done recently and their results.
      </p>
    </div>
  );
};

export default HelpPage;
