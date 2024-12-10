import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import './AccountSettings.css';

function AccountSettings() {
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    username: user ? user.user_info.username : '',
    first_name: user ? user.user_info.first_name : '',
    last_name: user ? user.user_info.last_name : '',
    email: user ? user.user_info.email : '',
    phone: user && user.account_info ? user.account_info.phone : '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e, field) => {
    setFormValues({
      ...formValues,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('Failed to update account information. Please try again.');
  };

  const handleCancel = () => {
    setFormValues({
      username: user ? user.user_info.username : '',
      first_name: user ? user.user_info.first_name : '',
      last_name: user ? user.user_info.last_name : '',
      email: user ? user.user_info.email : '',
      phone: user && user.account_info ? user.account_info.phone : '',
    });
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="AccountSettingsContainer">
      <Row className="AccountRow">
        <Col className="AccountColLeft">
          <Card className="AccountCard shadow-lg">
            <Card.Body>
              <div className="image-container">
                <img src="account.webp" alt="User Profile" className="image" />
              </div>
              <Card.Text className="AccountWelcome">Welcome {formValues.username}!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="AccountColRight">
          <Card className="AccountCard shadow-lg">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {!isEditing ? (
                <>
                  <div className="input-box">
                    <Form.Label>Username</Form.Label>
                    <p>{formValues.username}</p>
                  </div>
                  <div className="input-box">
                    <Form.Label>First Name</Form.Label>
                    <p>{formValues.first_name}</p>
                  </div>
                  <div className="input-box">
                    <Form.Label>Last Name</Form.Label>
                    <p>{formValues.last_name}</p>
                  </div>
                  <div className="input-box">
                    <Form.Label>Email</Form.Label>
                    <p>{formValues.email}</p>
                  </div>
                  <div className="input-box">
                    <Form.Label>Phone</Form.Label>
                    <p>{formValues.phone}</p>
                  </div>
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Edit Information
                  </Button>
                </>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <div className="input-box">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.username}
                      onChange={(e) => handleInputChange(e, 'username')}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.first_name}
                      onChange={(e) => handleInputChange(e, 'first_name')}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.last_name}
                      onChange={(e) => handleInputChange(e, 'last_name')}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formValues.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.phone}
                      onChange={(e) => handleInputChange(e, 'phone')}
                    />
                  </div>
                  <Button type="submit" variant="success">
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={handleCancel} className="ms-2">
                    Cancel
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AccountSettings;
