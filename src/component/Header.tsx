import { useEffect } from 'react'
import SignOut from './SignOut'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
export default function Header( {session} ) {

  return (
      <>
        <header>
          <div className="logo"><Link to="/">Log</Link></div>
          <Link to="/auth">Auth</Link>
          <Link to="/account">Account</Link>

          <SignOut session={session}/>
        </header>
      </>
  )
}
