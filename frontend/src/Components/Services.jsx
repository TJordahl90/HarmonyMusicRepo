import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
    const { courseId } = useParams(); // Use params to get the courseId
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Fetch course list
    useEffect(() => {
        const getCourses = async () => {
            try {
                console.log("got courses");
                const response = await axios.get('https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/course_list/');
                setCourses(response.data);
            } 
            catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        getCourses();
    }, []);

    // Fetch a specific course detail if courseId is available
    useEffect(() => {
        if (courseId) {
            const getSelectedCourse = async () => {
                try {
                    const response = await axios.get(`https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/course/${courseId}/`);
                    setSelectedCourse(response.data);
                } 
                catch (error) {
                    console.error("Error fetching course:", error);
                }
            };

            getSelectedCourse();
        }
    }, [courseId]);

    if (!courses.length) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <Card className="p-4 shadow-sm" style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
                        <Card.Body>
                            <Card.Title as="h1" className="d-flex justify-content-center" style={{ color: 'orange' }}>Courses</Card.Title>
                            <Card.Text className="text-start" style={{ width: '100%', maxWidth: '870px', margin: '0 auto' }}>
                                Embark on a musical adventure with our comprehensive online courses in guitar, piano, 
                                and vocal training. Whether you aspire to strum the perfect chord, play enchanting melodies, 
                                or find your unique voice, our courses are crafted to guide you every step of the way. Join 
                                us and transform your musical dreams into reality with expert instruction and interactive 
                                lessons designed for all skill levels.
                            </Card.Text>
                        </Card.Body>

                        <Row className="d-flex justify-content-center">
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <Col xs={12} sm={6} md={3} lg={10} key={course.id}>
                                        <Card className="mb-4" style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid', marginLeft: '15px', marginRight: '15px'  }}>
                                            <Card.Img
                                                variant="top"
                                                src={course.cover_image ? `https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/${course.cover_image}`: "https://via.placeholder.com/150"}
                                                height="auto"
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <Card.Body>
                                                <Card.Title className="d-flex justify-content-center" style={{ color: 'orange' }}>{course.title}</Card.Title>
                                                <Card.Text>{course.overview}</Card.Text>
                                                <div className="d-flex justify-content-center">
                                                <Link to={`/course-list/course/${course.id}`}>
                                                    <Button variant="primary">View Course</Button>
                                                </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col xs={12}>
                                    <p>No courses available</p>
                                </Col>
                            )}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
        
    );
};

export default Services;
