import React, {useEffect, useState} from 'react';
import { Navbar, Button, Form, Nav, Col, InputGroup, ButtonGroup  } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function Mynavbar(props) {
  
  return (
    
<Navbar collapseOnSelect expand="lg" bg="" variant="dark" fixed="top">
<Link to="/advert"><Navbar.Brand>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px' }}>
                <img
                  src="https://es.seaicons.com/wp-content/uploads/2015/09/Online-Shopping-icon.png"
                  width="38"
                  height="38"
                  className="d-inline-block align-top"
                  alt="WallaKeep"
                />{' '}
                <span className="navbar-tittle-wallaclone " style= {{ marginLeft: '5px' }} >Wallaclone</span>
            </div>
        </Navbar.Brand>
        </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">

    </Nav>
    <Nav>
    
    <Form inline>

      {
          this.state.isLogged === false ?
          
            <Link to={`/login`}><Button className="button is-primary">Login</Button></Link>
          
        
          :
          <ButtonGroup>
            <Button  className="mr-sm-2 button is-primary is-outlined"   >My Walla</Button>
            <Button className="mr-sm-2 button is-warning is-outlined" onClick={this.onLogoutClick} >Logout</Button>
          </ButtonGroup>
      }
            
          </Form>
    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
}

