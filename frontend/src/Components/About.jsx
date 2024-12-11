import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.css';

export default function About() {
    return (
        <Container className="AboutContainer py-5">
            <Row className="AboutRow">
                <Col className="AboutCol">
                    <Card className="AboutCard" style={{ borderWidth: '3px', borderColor: 'orange', borderStyle: 'solid'}}>
                        <Row className="align-items-center">
                            <Col md={6} className="text-center mb-3 mb-md-0">
                                <img
                                    src="BrandonPic.jpg"
                                    alt="Picture of Brandon Shadman playing guitar"
                                    className="img"
                                />
                            </Col>
                            <Col md={6}>
                                <Card.Body >
                                    <h1>Meet Brandon Shadman</h1>
                                    <p>
                                        Brandon Shadman is a 20-year-old multi-instrumentalist musician with a decade of musical experience.
                                        Beginning his musical journey at a young age, teaching himself to sing. He began his at a young age,
                                        teaching himself to sing, and has since mastered a variety of instruments through self-directed learning.
                                    </p>
                                    <p>
                                        During high school, Brandon added the piano to his repertoire and competed at multiple state levels
                                        as one of the lead trumpet players in his school band. His self-taught guitar proficiency—his most
                                        difficult instrument to date—became evident during the COVID-19 lockdown.
                                    </p>
                                    <p>
                                        He currently uses his vast and varied experience to teach pop, rock, and basic music fundamentals
                                        to eager musicians, helping them to realize their own potential.
                                    </p>
                                </Card.Body>
                            </Col>
                        </Row>            
                        <Row className="AboutRow">
                            <Col className="AboutCol"> 
                                <Card.Body style={{ width: '1250px'}}>
                                    <h1>House of Harmony Music</h1>
                                    <p>
                                        House of Harmony Music is a local brand created by Brandon Shadman to sell his skill in multiple instruments 
                                        to a booming hometown community.
                                    </p>
                                    <p>
                                        Founded in 2023, House of Harmony was created with the purpose of better satisfying the needs of 
                                        the suburban private instructor consumer as well as creating a schedule that can better fit around 
                                        Brandon’s life as a full-time student.
                                    </p>
                                </Card.Body>                                
                                <Card.Body>
                                    <h1>My Gear</h1>
                                    <p>Brandon uses the Yamaha E253 Piano, the Ibanez AEG18 Acoustic Guitar, the Ibanez AZES40 Electric Guitar, and the Fender Mustange LT25 Multi-Preset Amp.</p>
                                </Card.Body>
                            </Col>
                        </Row> 
                    </Card>
                </Col>
            </Row>   
        </Container>
    );
}
