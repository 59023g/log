import { useState, useEffect } from 'react'
import { supabase } from './service/supabase'
import { Session } from '@supabase/supabase-js'

import './App.css'
import Auth from './component/Auth'
import Account from './component/Account'
import Notification from './component/Notification'

function App() {
  const [session, setSession] = useState(null)
  const [notif, setNotif] = useState(null)

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session }}) => {
        setSession(session)
      })
      
    supabase.auth
      .onAuthStateChange((_event, session) => {
        setSession(session)
    })
  }, [])

  return (
    <>
      {
        !session ? 
        <Auth setNotif={setNotif}/> : 
        <Account setNotif={setNotif} key={session.user.id} session={session} />
      }
      <Notification notif={notif} setNotif={setNotif}/>
    </>
  )
}

export default App
