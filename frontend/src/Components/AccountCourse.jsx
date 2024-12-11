import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "js-cookie";
import './AccountCourse.css';

const AccountCourse = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(
        localStorage.getItem("isAuthorized") === "true"
    );
    const navigate = useNavigate();


    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthorized") === "true";
        setIsAuthorized(authStatus);

        const getCourse = async () => {
            try {
                const response = await axios.get(`https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/account_course/${courseId}/`, { headers: { "X-CSRFToken": csrfToken }, withCredentials: true });
                console.log(response.data);
                setCourseData(response.data);
            } 
            catch (error) {
                console.error("Error fetching course", error);
            }
        };

        getCourse();
    }, [courseId]);

    const handleDeleteCourse = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = Cookies.get("csrftoken");

            const deleteResponse = await axios.delete(
                `https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/account_course/${courseId}/`, 
                {
                    headers: { "X-CSRFToken": csrfToken },
                    withCredentials: true,
                },
            );

            console.log(deleteResponse.data);
            navigate("/account");
        } 
        catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    if(!courseData) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <Card className="p-4 shadow-sm " style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
                        <Row className="mb-3 align-items-center">
                            <Col className="d-flex justify-content-start">
                                <Link to={'/account'}>
                                    <Button className="mb-0">
                                        Back to Home
                                    </Button>
                                </Link>
                            </Col>

                            {isAuthorized && (
                                <Col className="d-flex justify-content-end">
                                    <Button className="mb-0" variant="danger" onClick={handleDeleteCourse}>
                                        Delete Course
                                    </Button>
                                </Col>
                            )}
                        </Row>


                        <Card.Body>
                            <Card.Title as="h1" className="d-flex justify-content-center" style={{ color: 'orange' }}>{courseData.course.title}</Card.Title>
                            <Card.Text>{courseData.course.description}</Card.Text>
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
                                                <Link to={`/account/course/${courseId}/lesson/${lesson.id}`}>
                                                    <Button variant="primary" className="mt-3">Go to Lesson</Button>
                                                </Link>
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

export default AccountCourse;
