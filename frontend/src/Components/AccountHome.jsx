import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Tabs, Tab, Container, Row, Col, Card, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AccountHome.css';

function AccountHome() 
{
    const [courses, setCourses] = useState([]);
    const [activeTab, setActiveTab] = useState('courses');
    const [isAuthorized, setIsAuthorized] = useState(
        localStorage.getItem("isAuthorized") === "true"
    );
    
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;
    console.log(user)

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthorized") === "true";
        setIsAuthorized(authStatus);

        const getCourses = async () => {
            try {
                const response = await axios.get('http://138.197.87.6:80/courses/', { withCredentials: true });
                console.log("Courses:", response.data);
                setCourses(response.data);
            } 
            catch(error) {
                console.error("Error fetching courses:", error);
            }
        };

        getCourses();
    }, []);

    return (
        <Container className="account-home py-5" fluid style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
            <div className="welcome-message">
                <h1 style={{ color: 'orange' }}>Welcome, {user ? user.user_info.username : "Guest"}!</h1>
                <p style={{ color: 'black' }}>Here’s what’s available in your account:</p>
            </div>

            <Tabs
                activeKey={activeTab}
                onSelect={(tabKey) => setActiveTab(tabKey)}
                className="mb-4"
            >
                <Tab eventKey="courses" title="Courses">
                    <Container>
                        <Row className="g-4">
                            {courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <Col md={4} key={index}>
                                        <Card lassName="course-card h-100 d-flex flex-column" style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
                                            <Card.Img
                                                variant="top"
                                                src={course.cover_image ? `http://138.197.87.6:80/${course.cover_image}` : "https://via.placeholder.com/150"}
                                                alt="Course"
                                                className="course-image"
                                            />
                                            <Card.Body className="d-flex flex-column">
                                                <Card.Title style={{ color: 'orange' }}>{course.title}</Card.Title>
                                                <Card.Text className="flex-grow-1">{course.overview}</Card.Text>
                                                <Link to={`/account/course/${course.id}`}>
                                                    <Button variant="primary">View Details</Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p>No courses available. Start by adding a new course!</p>
                            )}
                        </Row>
                    </Container>
                </Tab>

                <Tab eventKey="settings" title="Account Settings">
                    <div className="account-home-tab">
                        <h3>Manage Your Account</h3>
                        <p>Edit your personal details or change your preferences here.</p>
                        <Link to="/account/settings">
                            <Button variant="secondary">Go to Settings</Button>
                        </Link>
                    </div>
                </Tab>

                {isAuthorized && (
                    <Tab eventKey="addCourse" title="Create New Course">
                        <div className="account-home-tab">
                            <h3>Create a New Course</h3>
                            <p>Provide the details to create a new course.</p>
                            <Link to="/account/create-course">
                                <Button variant="success">Add Course</Button>
                            </Link>
                        </div>
                    </Tab>
                )}
                {isAuthorized && (
                    <Tab eventKey="emailAll" title="Email Users">
                        <div className="account-home-tab">
                            <h3>Email All Users</h3>
                            <p>Send an email to all registered users.</p>
                            <Link to="/account/mass-email">
                                <Button variant="success">Create Email</Button>
                            </Link>
                        </div>
                    </Tab>                  
                )}
            </Tabs>
        </Container>
    );
}

export default AccountHome;
