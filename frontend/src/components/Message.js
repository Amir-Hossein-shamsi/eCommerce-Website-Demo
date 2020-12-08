import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ vriant, children }) => {
  return <Alert variant={vriant}>{children}</Alert>
}

Message.defaultProps = {
  vriant: 'info',
}
export default Message
