import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ noti }) => {
  return (
    <div className={noti.type} style={{ border: '1px solid black' }}>{noti.content}</div>
  )
}

Notification.propTypes = {
  noti: PropTypes.string.isRequired
}

export default Notification