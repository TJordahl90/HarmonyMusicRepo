import { React, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';


function Verification(){
    const [code, setCode] = useState("");
    const [verificationAttempts, setVerificationAttempts] = useState(2);
    const [resendAttempts, setResendAttempts] = useState(4);
    const location = useLocation();
    const navigate = useNavigate();
    // This variable will contain all user data.
    const data = location.state;
    
    useEffect(() => {
        console.log("User Data", data);
      }, []); 

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(verificationAttempts < 0){
        console.log("You have reached the maximum number of attempts, please request another verification code.");
        return;
      }
      
      try{
        // Takes the user input code, calls the VerificationCheckView to compare the input code vs the randomly generated one
        const response = await axios.post("http://138.197.87.6:80/verification/check/", { email: data.email, code: code });
        console.log("Verification code accepted", response.data);

        if(response.status == 200){
          // If the code comparison check returns successful, register the account
          try {
            const registration = await axios.post("http://138.197.87.6:80/register/", data);
            console.log("Registration successful:", registration.data);
            navigate('/login');
          }
          catch(error) {
            console.error("Error registering account:", error.response.data);
          }
        }
      }
      catch(error){
        console.error("Code incorrect:", error.response.data);

        console.log(`Incorrect code. You have ${verificationAttempts}} attempts left.`)
        setVerificationAttempts(prev => prev - 1);
      }
    }

    const resend = async (e) =>{
      if(resendAttempts < 0){
        console.log("You have exceeded the re-send attempts limit. Please register again.")
      }
      try{
        const createCode = await axios.post("http://138.197.87.6:80/verification/", data);
        setVerificationAttempts(2);
        setResendAttempts(prev => prev - 1);
        console.log("New verification code created for", data.email, `You have ${resendAttempts} re-send attempts available.`);
      }
      catch(error){
        console.error("Error re-sending email verification.", createCode.response.data);
      }
    }

    return (
      <Container className="py-5">
        <Row className="d-flex justify-content-center">
            <Col>
              <Card
                style={{
                  borderWidth: '4px',
                  borderColor: 'orange',
                  borderStyle: 'solid',
                  padding: '30px',
                }}
              >
                <Card.Body className="text-center">
                  <Card.Title
                    style={{
                      color: 'orange',
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Email Sent
                  </Card.Title>
                  <Card.Text style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                    Please enter the verification code
                  </Card.Text>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="verificationCode" className="mb-4">
                      <Form.Control
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter Verification Code"
                        style={{
                          fontSize: '1.25rem',
                          padding: '15px',
                        }}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="primary"
                      className="mb-3"
                      style={{
                        fontSize: '1.25rem',
                        padding: '10px 20px',
                      }}
                    >
                      Verify and Register
                    </Button>
                  </Form>
                  <Button
                    variant="link"
                    onClick={resend}
                    style={{
                      fontSize: '1.25rem',
                      textDecoration: 'underline',
                    }}
                  >
                    Re-send verification code
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </Container>
    );  
  };
export default Verification