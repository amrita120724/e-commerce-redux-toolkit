import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getProducts } from "../features/products/productsSlice";
// import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

 

    const handleLogoClick = () => {
        // Navigate to the root path ("/") when logo is clicked
       dispatch(getProducts())
    };

  const handleSignOut = (event) => {
    console.log("Inside signout Function");
    event.preventDefault();
    dispatch(logout());
    window.sessionStorage.removeItem("userInfo");
  };

  return (
    <header>
      <Navbar
        bg="primary"
        navbar="light"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/" onClick={handleLogoClick}>
            <Navbar.Brand>ECart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {userInfo && (
                <LinkContainer to="/profile">
                  <Nav.Link>
                    <i class="bi bi-bucket-fill"> Profile</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {!userInfo && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i class="bi bi-box-arrow-in-right"> Log In</i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && (
                <LinkContainer to="/" onClick={handleSignOut}>
                  <Nav.Link>
                    <i class="bi bi-box-arrow-in-right"> Sign Out</i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
