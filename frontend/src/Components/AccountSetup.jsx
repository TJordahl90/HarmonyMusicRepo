import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountSetup.css';
import "./Verification.jsx";
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function AccountSetup() 
{
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) 
  {
    e.preventDefault();

    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      username: username,
      password: password,
    };

    try{
      // This will now call the VerificationView in the backend to create the verification code
      const response = await axios.post("https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/verification/", registrationData)
      console.log(response.data)
      setMessage("Verification code sent to your email!");
      setError('');
      
      //Once the code is created, you are redirected to the verification page
      setTimeout(() => {
        navigate('/verification', { state: registrationData })
      }, 1000);
    }
    catch (error) {
      console.error(error.response ? error.response.data : error.message)
      if (error.response && error.response.data) {
        const errors = error.response.data;
        if (errors.username) {
          setError("Username is already in use. Please choose another.");
        } 
        else if (errors.email) {
          setError("This email has already been registered.");
        } 
        else if (errors.password) {
          setError("Invalid password. Ensure it meets the criteria.");
        } 
        else {
          setError("An error has occurred. Please try again.");
        }
      } 
      else {
        setError("Unable to connect to the server. Please check your connection.");
      }
      setMessage('');
    }

    setTimeout(() => {
      setError('');
      setMessage('');
    }, 3000);
  }

  return(
    <Container
      className="account-setup py-5"
      style={{ maxWidth: '700px', padding: '30px' }}
      fluid
    >
      <Card
        style={{
          padding: '40px',
          borderWidth: '3px',
          borderColor: 'orange',
          borderStyle: 'solid',
        }}
      >
        <Row className="justify-content-center">
          <Col>
            <h1 className="text-center mb-4" style={{ color: 'orange' }}>
              Account Setup
            </h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default AccountSetup;
