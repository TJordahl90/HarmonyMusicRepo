import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from "axios";
import Cookies from "js-cookie";

function CreateCourse() {
    const [courseTitle, setCourseTitle] = useState("");
    const [courseOverview, setCourseOverview] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const [courseCoverImage, setCourseCoverImage] = useState(null);
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const [lessons, setLessons] = useState([
        { title: "", overview: "", description: "", video: null, image: null }
    ]);

    const handleLessonChange = (index, field, value) => {
        const allLessons = [...lessons];
        const lessonToUpdate = allLessons[index];

        if (lessonToUpdate) {
            lessonToUpdate[field] = value;
        }

        setLessons(allLessons);
    };

    const addLesson = () => {
        const newLesson = { title: "", overview: "", description: "", video: null, image: null };
        const allLessons = [...lessons];

        allLessons.push(newLesson);
        setLessons(allLessons);
    };

    const removeLesson = (index) => {
        const allLessons = [];

        for (let i = 0; i < lessons.length; i++) {
            if (i != index) {
                allLessons.push(lessons[i]);
            }
        }

        setLessons(allLessons);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data for the course
        const courseData = new FormData();
        courseData.append("title", courseTitle);
        courseData.append("overview", courseOverview);
        courseData.append("description", courseDescription);
        courseData.append("price", coursePrice);
        if (courseCoverImage) {
            courseData.append("cover_image", courseCoverImage);
        }

        // Create form data for lessons
        const lessonData = new FormData();
        lessons.forEach((lesson, index) => {
            Object.entries(lesson).forEach(([key, value]) => {
                lessonData.append(`lesson_${index}_${key}`, value);
            })
        });

        try {
            const csrfToken = Cookies.get("csrftoken");

            const lessonResponse = await axios.post(
                'https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/lessons/', 
                lessonData,
                {
                    headers: { "X-CSRFToken": csrfToken },
                    withCredentials: true,
                },
            );

            console.log("Successfully created lessons:", lessonResponse.data);

            const lessonIds = lessonResponse.data.lesson_ids;
            lessonIds.forEach((id) => {
                courseData.append("lessonIds", id);
            });

            const courseResponse = await axios.post(
                'https://harmonymusicbackend-c9ce11d363f1.herokuapp.com/courses/',  
                courseData, 
                {
                    headers: { "X-CSRFToken": csrfToken },
                    withCredentials: true,
                },
            );

            console.log("Successfully created course:", courseResponse.data);
            setMessage("Course successfully created!");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            // setCourseTitle("");
            // setCourseOverview("");
            // setCourseDescription("");
            // setCoursePrice("");
            // setCourseCoverImage(null);
            // setLessons([]);
            // addLesson();
        } 
        catch(error) {
            console.error("Error creating lessons or course:", error);
            setMessage("Error creating course. Try again.");
        }
    };

    return (
        <Container className="p-4 mx-auto" style={{ maxWidth: '1000px' }} fluid>
            {showAlert && message && (
                <Alert variant={message.includes("successfully") ? "success" : "danger"}>
                    {message}
                </Alert>
            )}
            <Row className="mb-4">
                <Col>
                    <h1 style={{fontWeight: 'bold'}}>Create New Course</h1>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Card className="mb-4" style={{ width: '100%', borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
                    <Card.Body>
                        <Row className="mb-3">
                            <Col>
                                <h4 style={{fontWeight: 'bold'}}>Course</h4>
                            </Col>
                        </Row>
                        <Form.Group controlId="courseTitle" className="mb-4">
                            <Form.Label style={{color: 'orange'}}>Course Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter course title"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="courseOverview" className="mb-3">
                            <Form.Label style={{color: 'orange'}}>Course Overview</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Enter a brief course overview"
                                value={courseOverview}
                                onChange={(e) => setCourseOverview(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="courseDescription" className="mb-3">
                            <Form.Label style={{color: 'orange'}}>Course Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter a detailed course description"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="coursePrice" className="mb-3">
                            <Form.Label style={{color: 'orange'}}>Course Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter course price"
                                value={coursePrice}
                                onChange={(e) => setCoursePrice(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="courseCoverImage" className="mb-3">
                            <Form.Label style={{color: 'orange'}}>Upload Course Cover Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setCourseCoverImage(e.target.files[0])}
                            />
                        </Form.Group>
                    </Card.Body>
                </Card>
                {lessons.map((lesson, index) => (
                    <Card className="mb-4" key={index} style={{ width: '100%', borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid' }}>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col>
                                    <h4 style={{fontWeight: 'bold'}}>Lesson {index + 1}</h4>
                                </Col>
                                <Col className="text-end">
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeLesson(index)}
                                        disabled={lessons.length === 1}
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                            <Form.Group controlId={`lessonTitle-${index}`} className="mb-3">
                                <Form.Label style={{color: 'orange'}}>Lesson Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter lesson title"
                                    value={lesson.title}
                                    onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId={`lessonOverview-${index}`} className="mb-3">
                                <Form.Label style={{color: 'orange'}}>Lesson Overview</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Enter a brief lesson overview"
                                    value={lesson.overview}
                                    onChange={(e) => handleLessonChange(index, 'overview', e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId={`lessonDescription-${index}`} className="mb-3">
                                <Form.Label style={{color: 'orange'}}>Lesson Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter a detailed lesson description"
                                    value={lesson.description}
                                    onChange={(e) => handleLessonChange(index, 'description', e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId={`lessonVideo-${index}`} className="mb-3">
                                <Form.Label style={{color: 'orange'}}>Upload Lesson Video</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => handleLessonChange(index, 'video', e.target.files[0])}
                                    // required
                                />
                            </Form.Group>
                            <Form.Group controlId={`lessonImage-${index}`} className="mb-3">
                                <Form.Label style={{color: 'orange'}}>Upload Lesson Image/File</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleLessonChange(index, 'image', e.target.files[0])}
                                    // required
                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                ))}
                <Row className="d-flex mb-4" style={{ width: '100%' }}>
                    <Col className="">
                        <Button variant="success" onClick={addLesson} className="w-100">
                            Add Another Lesson
                        </Button>
                    </Col>
                    <Col className="justify-content-end">
                        <Button type="submit" variant="primary" className="w-100">
                            Create Course
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default CreateCourse;
