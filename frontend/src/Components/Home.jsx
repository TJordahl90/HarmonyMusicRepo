import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';

export default function Home() {
    return (
        <div className="HomeContainer">
            <div className="Background">
                <div className="Welcome">
                    <h1>HOUSE OF HARMONY MUSIC</h1>
                    <h1>YOUR MUSIC JOURNEY BEGINS HERE</h1>
                </div>
            </div>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} >
                        <div className="About" style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
                            <h2 >Learn to play music with House of Harmony Music</h2>
                            <p>
                                House of Harmony Music offers personalized instruction from the multi-instrumentalist, Brandon Shadman. 
                                With over a decade of musical experience, including skills in singing, piano, trumpet, and guitar. 
                                He currently teaches pop, rock, and music fundamentals, helping students unlock their ideal 
                                sound. In 2023, House of Harmony Music was founded to offer personalized music instruction 
                                while balancing his studies.
                                Learn more about Brandon Shadman here: <a href="http://localhost:5173/about">[About Page]</a>
                            </p>
                            <br></br>
                            <h2>Our Courses</h2>
                            <p>
                                Embark on a musical adventure with our comprehensive online courses in guitar, piano, and vocal training. 
                                Whether you aspire to strum the perfect chord, play enchanting melodies, or find your unique voice, our 
                                courses are crafted to guide you every step of the way. Join us and transform your musical dreams into 
                                reality with expert instruction and interactive lessons designed for all skill levels.
                                See all courses here: <a href="http://localhost:5173/course-list">[Courses Page]</a>
                            </p>
                            <br></br>
                            <h2>Schedule an Appointment</h2>
                            <p>
                                You can make your appointment for a music lesson with Brandon Shadman. Simply reach out via the 
                                provided contact information here: <a href="http://localhost:5173/contact">[Contact Page]</a>. Feel free to ask any 
                                questions about lesson structure or the instructor's approach before booking to ensure a great 
                                fit for your musical goals.
                            </p>
                            <br></br>
                            <h2>Register</h2>
                            <p>
                                To receive updates and personalized course recommendations, simply create an account on the 
                                platform by providing your email address. Once registered, you’ll be able to sign up for tailored 
                                music lessons based on your interests and skill level. You’ll also get exclusive updates about new 
                                courses, events, and special offers delivered directly to your inbox. This way, you can stay 
                                informed and ensure your lessons align with your musical goals.
                                Register here: <a href="http://localhost:5173/register">[Register Page]</a>
                            </p>
                        </div>                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
