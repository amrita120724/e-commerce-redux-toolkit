import React, { useEffect } from "react";
import { Button, Form, FormGroup, Row, Col } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../actions/userActions";
import { login} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = useSelector((state) => state.user);
  const { loading, success, error, userInfo } = userLogin;
  const users = useSelector((state)=> state.users);
  const userFullName = users.find(user=> user.username === username)
  

  // console.log(loading, success, error, userInfo);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Fullname",userFullName.fullname)
    dispatch(login({username, password}));
    window.sessionStorage.setItem("userInfo", JSON.stringify({username, password, fullname:userFullName.fullname}))
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/')
      // console.log(userInfo)
    }
  });

  return (
    <>
      {loading && <Spinner animation="grow" />}
      {error && <AlertMessage variant="danger" message={error} />}
      {success && <AlertMessage variant="success" message={success} />}
      <FormGroup className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="txt"
          id="username"
          placeholder="Username"
          onChange={handleUsernameChange}
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}
        className="mb-3"
      >
        Login
      </Button>
    </>
  );
};

export default LoginPage;
