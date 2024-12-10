import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "js-cookie";

const PasswordForgot = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await axios.post(
                'http://138.197.87.6:80/request_password_reset/', 
                { email },
                {
                    headers: { "X-CSRFToken": csrfToken },
                    withCredentials: true,
                },
            );
            console.log(response.data)
        } 
        catch (error) {
            console.error(error)
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col >
                    <h3 className="mb-4">Reset Your Password</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Send Reset Link
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default PasswordForgot;
