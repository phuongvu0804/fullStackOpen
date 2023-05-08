import React from 'react'

const Notification = ({message, setNoti}) => {
    if (message === null) {
        return null
    } else {
        setTimeout(() => setNoti(null), 3000)  
    } 

  return (
    <div className="noti">{message}</div>
  )
}

export default Notification