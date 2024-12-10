import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Custom CSS for footer styling

export default function Footer() {
    return (
        <footer className="footer custom-footer">
            <Container fluid className="text-center">
                <Row className="footer-row">
                    <Col md={4} className="footer-column">
                        <h5 className="footer-title">House of Harmony Music</h5>
                        <p className="footer-copy">Your go-to place for online music courses.</p>
                        <p className="footer-copy">&copy; 2024 House of Harmony Music</p>
                    </Col>
                    <Col md={4} className="footer-column">
                        <h5 className="footer-title">Quick Links</h5>
                        <ul className="footer-list">
                            <li><a href="/about" className="footer-link">About</a></li>
                            <li><a href="/services" className="footer-link">Services</a></li>
                            <li><a href="/contact" className="footer-link">Contact</a></li>
                        </ul>
                    </Col>
                    <Col md={4} className="footer-column">
                        <h5 className="footer-title">Connect</h5>
                        <ul className="footer-list">
                            <li><a href="" className="footer-link">Facebook</a></li>
                            <li><a href="" className="footer-link">Twitter</a></li>
                            <li><a href="" className="footer-link">Instagram</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
