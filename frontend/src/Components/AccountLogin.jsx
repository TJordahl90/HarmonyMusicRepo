import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AccountLogin.css';

function AccountLogin() 
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                const response = await axios.get('https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/csrf/', { withCredentials: true });
                setCsrfToken(response.data.csrfToken);
                //console.log("CSRF token created:", response.data);
            } 
            catch(error) {
                console.error("Error fetching CSRF token:", error);
            }
        };

        getCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        const loginData = {
            username: username,
            password: password,
        };

        const tokenData = {
            headers: { 'X-CSRFToken': csrfToken },
            withCredentials: true,
        };
  
        try {
            const response = await axios.post("https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/login/", loginData, tokenData);
            console.log("Login successful:", response.data);
            setMessage("Successful login!");
            setError('');
            
            // Extracts the courses array from the user data object being stored in the localStorage
            const { courses, ...accInfoWithoutCourses } = response.data.account_info;
            const objectWithoutCourses = {
              ...response.data,
              account_info: accInfoWithoutCourses
            };

            localStorage.setItem("userData", JSON.stringify(objectWithoutCourses));
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("isAuthorized", response.data.user_auth)
            
            setTimeout(() => {
                navigate('/account', { state: response.data });
            }, 1000);
        }
        catch (error) {
            console.error(error.response ? error.response.data : error.message)
            if (error.response && error.response.data) {
                if (error.response.data.non_field_errors) {
                    setError("Invalid credentials.");
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

    return ( 
        <Container
            className="AccountLogin account-login py-5"
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
                    Login to Your Account
                    </h1>
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
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

                    <Button variant="primary" type="submit" className="w-100 mb-3">
                        Login
                    </Button>
                    </Form>
                    <div className="text-center">
                    <Link to="/forgot-username/" className="d-block mb-2">
                        Forgot Username?
                    </Link>
                    <Link to="/forgot-password/" className="d-block">
                        Forgot Password?
                    </Link>
                    </div>
                </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default AccountLogin;
