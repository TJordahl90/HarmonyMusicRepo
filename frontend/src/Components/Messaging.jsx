import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import axios from 'axios';
import Cookies from "js-cookie";
import './Messaging.css';

function Messaging() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [question, setQuestion] = useState('');
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "name") {
			setName(value);
		}
		else if (name === "email") {
			setEmail(value);
		}
		else if (name === "question") {
			setQuestion(value);
		}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = Cookies.get("csrftoken");
			const formData = { name, email, question };
            await axios.post(
				"https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/email_contact/", 
				formData,
				{
                    headers: { "X-CSRFToken": csrfToken },
                    withCredentials: false,
                }
			);

			setMessage("Question successfully submitted. Check your email inbox for a response.")
			setName('');
			setEmail('');
			setQuestion('');
        } 
		catch (err) {
            console.error(err);
            setMessage("Error submitting the question. Try again later.");
        }

		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, 3000);
    };

    return (
        <Container className="messaging-form py-5" style={{ maxWidth: '700px' }} fluid>
            <Card style={{ padding: '40px', borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
            <Row className="justify-content-center">
                <Col>
                    <h1 className="text-center mb-4" style={{color: 'orange'}}>Contact Us</h1>
					<h4 className="text-center" style={{color: 'orange'}}>Have a question? Send us a message!</h4>
					{showAlert && message && (
                		<Alert variant={message.includes("successfully") ? "success" : "danger"}>
                		    {message}
                		</Alert>
            		)}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName" className="mb-3" >
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formQuestion" className="mb-3">
                            <Form.Label>Question:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="question"
                                value={question}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Enter your question"
                                required
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

export default Messaging;
