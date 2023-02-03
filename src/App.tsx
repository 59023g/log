import { useState, useEffect } from 'react'
import { supabase } from './service/supabase'
import { Session } from '@supabase/supabase-js'

import './App.css'
import Auth from './component/Auth'
import Account from './component/Account'
import Notification from './component/Notification'
import SignOut from './component/SignOut'
import Home from './component/Home'
import Layout from "./component/Layout"

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";


function App() {
  const [session, setSession] = useState(null)
  const [notif, setNotif] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session }}) => {
        console.log("get", session)
        setSession(session)
      })
      
    supabase.auth
      .onAuthStateChange((_event, session) => {
        // console.log("stateChange", session)
        setSession(session)
    })
  }, [])

  // todo "route protect"
  // if session go to /
  return (
    <>
      <Routes>
        <Route element={ <Layout session={session} />}>

          <Route 
            path="/" 
            element={
              <Home session={session} setNotif={setNotif} /> 
          }/>

          <Route path="/account" element={ 
            !session ? 
            <Navigate to="/auth"/> : 
            <Account 
              setNotif={setNotif} 
              key={session.user.id} 
              session={session} />
          } />
          <Route path="/auth" element={ <Auth setNotif={setNotif}/> }/>
          </Route>
      </Routes>
      <Notification notif={notif} setNotif={setNotif}/>
    </>
  )
}

export default App
