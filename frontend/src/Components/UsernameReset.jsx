import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "js-cookie";

const UsernameReset = () => {
    const { userId, token } = useParams();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await axios.post(
                `http://138.197.87.6:80/username_reset/${userId}/${token}/`,
                { username },
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
            <Row className="justify-content-center">
                <Col>
                    <h3 className="mb-4">Set a New Username</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>New Username:</Form.Label>
                            <Form.Control
                                type="username"
                                placeholder="Enter your new username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Reset Username
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UsernameReset;
