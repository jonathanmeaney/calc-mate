import React from 'react';

import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  return (
    <div className='home'>
      <Jumbotron>
        <h1>Welcome to Calc Mate</h1>
        <p>
          Calc Mate lets you perform different tax calculations for the UK and Ireland. Just pick your country and calculation type, fill in the form and click on <b>calculate</b>. You'll soon get the result and a breakdown of how the result was reached!
        </p>
        <p>
          <Link to='/help'>
            <Button variant="primary">Learn more</Button>
          </Link>
        </p>
      </Jumbotron>
    </div>
  );
};

export default HomePage;
