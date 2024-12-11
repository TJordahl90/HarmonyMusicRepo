import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Accordion, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "js-cookie";
import './ServicesCourse.css';

const ServicesCourse = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getCourse = async () => {
            try {
                const csrfToken = Cookies.get("csrftoken");
                const response = await axios.get(
                    `https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/services_course/${courseId}/`,
                    {
                        headers: { "X-CSRFToken": csrfToken },
                        withCredentials: true,
                    },
                );
                console.log(response.data);
                setCourseData(response.data);
            } 
            catch (error) {
                console.error("Error fetching course", error);
            }
        };

        getCourse();
    }, [courseId]);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const success = query.get("success");
        const canceled = query.get("canceled");

        if (success) {
            setMessage("Payment successful! Thank you for your purchase.");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }

        if (canceled) {
            setMessage("Payment was canceled. Feel free to try again.");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }, []);

    const handlePayment = async () => {
        try {
            const authResponse = await axios.get('https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/check_auth/', { withCredentials: true });
            if (!authResponse.data.authenticated) {
                navigate('/login');
                return;
            }

            const csrfToken = Cookies.get("csrftoken");
            const response = await axios.post(
                "https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/create_checkout_session/",
                {
                    course_id: courseId,
                },
                {
                    headers: { "X-CSRFToken": csrfToken },
                    withCredentials: true,
                },
            );

            if (response.data.checkout_url) {
                // Redirect user to Stripe Checkout
                window.location.href = response.data.checkout_url;
            } 
            else if (response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            }
            else {
                console.error("Failed to get checkout URL");
            }
        } 
        catch (error) {
            console.error("Error during checkout session creation:", error);
        }
    };

    if(!courseData) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-5">
            {showAlert && message && (
                <Alert variant={message.includes("successful") ? "success" : "danger"}>
                    {message}
                </Alert>
            )}
            <Row className="mb-4">
                <Col>
                    <Card className="p-4 shadow-sm" style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
                        <Card.Body>
                            <Card.Title as="h1" className="d-flex justify-content-center" style={{ color: 'orange' }}>{courseData.course.title}</Card.Title>
                            <Card.Text>{courseData.course.description}</Card.Text>
                            <Button variant="primary" className="mt-3" onClick={handlePayment} disabled={courseData.course_owned}>
                                {courseData.course_owned ? "Owned" : `$ ${courseData.course.price}`}
                            </Button>
                        </Card.Body>

                        {courseData.lessons_preview && courseData.lessons_preview.length > 0 ? (
                            courseData.lessons_preview.map((lesson, index) => (
                                <Card.Body>
                                    <Card.Title as="h5" style={{ color: 'orange' }}>{lesson.title}</Card.Title>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Lesson Details</Accordion.Header>
                                            <Accordion.Body>{lesson.overview}</Accordion.Body>
                                            <Accordion.Body>
                                                <Button variant="secondary" className="mt-3" disabled='true'>Purchase to view</Button>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card.Body>
                            ))
                        ) : (
                            <Card className="p-4 shadow-sm">
                                <Card.Body>
                                    <Card.Text>No lessons available</Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ServicesCourse;
