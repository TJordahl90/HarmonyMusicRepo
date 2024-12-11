import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "js-cookie";

const PasswordReset = () => {
    const { userId, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            // set error message
            console.log("Passwords dont match try again.")
            return;
        }

        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await axios.post(
                `https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/password_reset/${userId}/${token}/`,
                { password },
                {
                    headers: { "X-CSRFToken": csrfToken },
                    withCredentials: true,
                },

            );
            console.log(response.data)
            navigate('/login');
        } 
        catch (error) {
            console.error(error)
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4" style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>   
                <Row className="justify-content-center">
                    <Col>
                        <h3 className="mb-4">Set a New Password</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="password">
                                <Form.Label style={{color:'orange'}}>New Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="confirmPassword" className="mt-3">
                                <Form.Label style={{color:'orange'}}>Confirm Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm your new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Reset Password
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card> 
        </Container>
    );
};

export default PasswordReset;
