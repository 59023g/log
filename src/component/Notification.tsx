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

  return (
      <>
        { !notif ? '' :
          <div className={notif.type ==='success' ? 
                  'notification success' : 
                  'notification failure'
          }>
            {notif.message}
          </div>
        
        }

      </>
  )
}

export default Notification
