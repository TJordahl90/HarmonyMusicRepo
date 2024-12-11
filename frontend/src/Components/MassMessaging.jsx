import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import axios from 'axios';
import Cookies from "js-cookie";

function MassMessaging() {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "subject") {
            setSubject(value);
        } 
        else if (name === "body") {
            setBody(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = Cookies.get("csrftoken");
            const formData = { subject, body };
            const response = await axios.post(
                "https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/mass_email_contact/",
                formData,
                {
                    headers: { "X-CSRFToken": csrfToken },
                    withCredentials: true,
                }
            );

            setMessage("Successfully sent email to all accounts!");
            setError('');
            setSubject('');
            setBody('');
        } 
        catch (err) {
            console.error(err);
            setError("Email failed, please try again.");
            setMessage('');
        }

        setTimeout(() => {
            setMessage('');
            setError('');
        }, 3000);
    };

    return (
        <Container className="messaging-form my-4" style={{ maxWidth: '700px' }} fluid>
            <Card style={{ padding: '40px', borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
                <Row className="justify-content-center">
                    <Col>
                        <h1 className="text-center mb-4 text-warning">Mass Email</h1>
                        <h4 className="text-center text-warning">Send an email to all registered accounts</h4>

                        {message && <Alert variant="success">{message}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formSubject" className="mb-3">
                                <Form.Label>Email Subject:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="subject"
                                    value={subject}
                                    onChange={handleChange}
                                    placeholder="Enter email subject line"
                                    required
                                    aria-label="Email subject"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBody" className="mb-3">
                                <Form.Label>Email Body:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="body"
                                    value={body}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Enter email body"
                                    required
                                    aria-label="Email body"
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Send
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default MassMessaging;
