import React, { useEffect } from 'react'

const Notification = ({noti, setNoti}) => {
  useEffect(() => {
    setTimeout(() => {
      setNoti({...noti, content: null})
    }, 3000)
  }, [])

  return (
    <div className={`noti ${noti?.type}`}>{noti.content}</div>
  )
}

export default Notification