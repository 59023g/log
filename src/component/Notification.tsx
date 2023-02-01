import { useEffect } from 'react'

interface NotificationProps {
  notif: {
    type: String,
    message: String
  } | null
  setNotif: Function
}
function Notification( {notif, setNotif}: NotificationProps ) {

  useEffect(() => {
    window.setTimeout(() => {
      setNotif(null)
    }, 2000)
  })

  const hide = notif ? '' : 'hide'
  const type = notif?.type === 'success' ? 'success' : 'failure'

  return (
      <>
        <div className={`notification ${hide} ${type}`}>
          {notif?.message}
        </div>
      </>
  )
}

export default Notification
