import Header from './Header'
import { Outlet } from "react-router-dom";

export default function Layout({session}) {
  return (
    <>
      <Outlet />
      <Header session={session}/>
    </>
  );
}