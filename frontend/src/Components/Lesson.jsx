import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import './Lesson.css';

const Lesson = () => {
    const { lessonId, courseId } = useParams();
    const [lessonData, setLessonData] = useState(null);

    useEffect(() => {
        const getLesson = async () => {
            try {
                const response = await axios.get(`https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/lesson/${lessonId}/`, { withCredentials: true });
                console.log(response.data);
                setLessonData(response.data);
            } 
            catch (error) {
                console.error("Error fetching lesson", error);
            }
        };

        getLesson();
    }, [lessonId]);

    if(!lessonData) {
        return <div>Loading...</div>;
    }

    return (
    <Container className="py-5">
        <Row className="d-flex justify-content-center mb-4">
            <Col>
                <Card className="p-4 shadow-sm" style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>                    
                    <Row className="mb-3 align-items-center">
                        <Col className="d-flex justify-content-start">
                            <Link to={`/account/course/${courseId}`}>
                                <Button className="mb-0">
                                    Back to Course
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                    <Card.Body>
                        <Card.Title as="h1" className="d-flex justify-content-center" style={{ color: 'orange' }}>
                            {lessonData.title}
                        </Card.Title>
                        <Card.Text>{lessonData.description}</Card.Text>
                    </Card.Body>

                    <Row className="d-flex flex-column align-items-center">
                        <Col className="mb-5 py-2 d-flex justify-content-center" style={{ width: '100%' }}>
                            { lessonData.video && (
                                <video 
                                    className="lesson-video"
                                    controls
                                    style={{
                                        width: '90%',
                                        height: 'auto',
                                        borderRadius: '5px',
                                        borderWidth: '3px', 
                                        borderColor: 'orange', 
                                        borderStyle: 'solid'
                                    }}
                                >
                                    <source src={`https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/${lessonData.video}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </Col>
                            
                        <Col className="mb-3 d-flex justify-content-center" style={{ width: '100%' }}>
                            { lessonData.image && (
                                <img
                                    className="lesson-image"
                                    src={`https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/${lessonData.image}`}
                                    alt="Lesson Image"
                                    style={{
                                        width: '60%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                        borderWidth: '3px', 
                                        borderColor: 'orange', 
                                        borderStyle: 'solid'
                                    }}
                                />
                            )}
                        </Col>
                    </Row>
                    
                    {/* not enough time to implement
                    <Card.Body className="text-end">
                        <Link to={'#'}>
                            <Button variant="primary">
                                Go to Next Lesson
                            </Button>
                        </Link>
                    </Card.Body> */}
                </Card>
            </Col>
        </Row>
    </Container>
    );
};

export default Lesson;