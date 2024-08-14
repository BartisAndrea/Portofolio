import { Col, Row, Alert } from "react-bootstrap";

export const Newsletter = ({ status, message }) => {
  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>Explore My Digital Art Portfolio<br />& Stay Inspired</h3>
            {status === 'sending' && <Alert>Sending...</Alert>}
            {status === 'error' && <Alert variant="danger">{message}</Alert>}
            {status === 'success' && <Alert variant="success">{message}</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <div className="art-promo-bx">
              <p>Check out my latest digital art creations and get inspired by unique designs and illustrations. Dive into my portfolio now!</p>
              <a href="/portfolio" className="btn btn-primary">Visit My Portfolio</a>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
