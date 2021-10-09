import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <>
      <div style={{ height: 50 }}></div>
      <footer id='footer1'>
        <Container>
          <Row>
            <Col className='text-center py-3'>Copyright &copy; Shopsessed</Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer
