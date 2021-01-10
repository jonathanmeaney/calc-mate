import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Navitem from 'react-bootstrap/Navitem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaCalculator } from 'react-icons/fa';
import { DiGithubBadge } from 'react-icons/di';

import CalculationHistory from 'components/calculation-history';

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
      <Navbar bg="dark" variant="dark" fixed="top" expand="md">
        <Navbar.Brand href="/">Calculation Companion <FaCalculator /></Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey="1" as={Link} to='/uk' id='/uk' className={activeTab === '/uk' ? 'active' : activeTab === '/uk' ? 'active' : ''} onClick={updateActiveTab}>UK</Nav.Link>
            <Nav.Link eventKey="2" as={Link} to='/irish' id='/irish' className={activeTab === '/irish' ? 'active' : activeTab === '/irish' ? 'active' : ''} onClick={updateActiveTab}>Irish</Nav.Link>
            <Nav.Link eventKey="3" as={Link} to='/help' id='/help' className={activeTab === '/help' ? 'active' : activeTab === '/help' ? 'active' : ''} onClick={updateActiveTab}>Help</Nav.Link>
            <Navitem>
              <a href='https://github.com/jonathanmeaney/calculation-companion'  target='_blank' className='github-link'><DiGithubBadge /></a>
            </Navitem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="main-content">
        <Row>
          <Col xs={12} md={7} lg={8}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/uk" component={UKPage} />
              <Route exact path="/irish" component={IrishPage} />
              <Route exact path="/help" component={HelpPage} />
              <Route component={NotFoundPage} />
            </Switch>
            <br/>
          </Col>
          <Col xs={12} md={5} lg={4}>
            <CalculationHistory />
          </Col>
        </Row>
      </Container>
      <footer className='app-footer clear'>
        <a href='https://jonathan.meaney.dev' target='_blank'>Jonathan II Meaney</a> &copy; 2021
      </footer>
    </div>
  );
};

export default App;
