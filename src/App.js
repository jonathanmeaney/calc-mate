import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaCalculator } from 'react-icons/fa';

import HomePage from './pages/home';
import UKPage from './pages/uk';
import IrishPage from './pages/irish';
import HelpPage from './pages/help';
import NotFoundPage from './pages/not-found';

import './styles.scss';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  }

  useEffect(() => {
    if(location.pathname !== activeTab){
      setActiveTab(location.pathname);
    }
  }, [location, activeTab, setActiveTab]);

  return (
    <div className="app">
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">Calculation Companion <FaCalculator /></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/uk' id='/uk' className={activeTab === '/uk' ? 'active' : activeTab === '/uk' ? 'active' : ''} onClick={updateActiveTab}>UK</Nav.Link>
          <Nav.Link as={Link} to='/irish' id='/irish' className={activeTab === '/irish' ? 'active' : activeTab === '/irish' ? 'active' : ''} onClick={updateActiveTab}>Irish</Nav.Link>
          <Nav.Link as={Link} to='/help' id='/help' className={activeTab === '/help' ? 'active' : activeTab === '/help' ? 'active' : ''} onClick={updateActiveTab}>Help</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="main-content">
        <Row>
          <Col>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/uk" component={UKPage} />
              <Route exact path="/irish" component={IrishPage} />
              <Route exact path="/help" component={HelpPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <footer className='app-footer clear'>
        Crafted with love, by monsters
      </footer>
    </div>
  );
};

export default App;
