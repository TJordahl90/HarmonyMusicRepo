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
                const response = await axios.get(`http://138.197.87.6:80/lesson/${lessonId}/`, { withCredentials: true });
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
    <Container className="py-7">
        <Row className="d-flex justify-content-center">
            <Col>
                <Card style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>                    
                    <Card.Body className="p-3 text-start">
                        <Link to={`/account/course/${courseId}`}>
                            <Button className="mb-0">
                                Back to Course
                            </Button>
                        </Link>
                    </Card.Body>

                    <Card.Body>
                        <Card.Title style={{ color: 'orange' }}>{lessonData.title}</Card.Title>
                        <Card.Text>{lessonData.description}</Card.Text>
                        <Row className="d-flex flex-column align-items-center">
                            <Col className="mb-3 d-flex justify-content-center" style={{ width: '100%' }}>
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
                                        <source src={`http://138.197.87.6:80/${lessonData.video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </Col>
                                
                            <Col className="mb-3 d-flex justify-content-center" style={{ width: '100%' }}>
                                { lessonData.image && (
                                    <img
                                        className="lesson-image"
                                        src={`http://138.197.87.6:80/${lessonData.image}`}
                                        alt="Lesson Image"
                                        style={{
                                            width: '90%',
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
                    </Card.Body>
                    
                    <Card.Body className="text-end">
                        <Link to={'#'}>
                            <Button variant="primary">
                                Go to Next Lesson
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    );
};

export default Lesson;