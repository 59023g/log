import { useEffect, useState } from 'react'
import { AuthError, Session } from '@supabase/supabase-js'

import ItemList from "./ItemList"
import { insertItem } from '../service/supabase'
import { ParsedItems } from '../types'
import InputItem from './InputItem'

export default function Home( 
  { session, setNotif }: {session: Session, setNotif: any} 
) {
  
  return (
      <>
      <ItemList session={session}/>
      <InputItem session={session} setNotif={setNotif}/>
      </>
  )
}
