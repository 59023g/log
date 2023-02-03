import { useEffect, useState } from 'react'
import { ParsedItems } from '../types'
import { insertItem } from '../service/supabase'

import { AuthError, Session } from '@supabase/supabase-js'
import Item from "./Item"
import { parseItem } from "../utils"

export default function InputItem(
  { session, setNotif }: {session: Session, setNotif: any} ) {
  const [loading, setLoading] = useState<boolean>(false)
  const [parsedItems, setParsedItems] = useState<ParsedItems>([])
  const [itemString, setItemString] = useState<string>("")


  useEffect(() => {
    const parsedItems = parseItem(itemString)
    setParsedItems(parsedItems)
  }, [itemString])


  const handleSubmitItem = async () => {
    try{
      setLoading(true)
      let { data, error, status } = await insertItem(session.user, itemString)
      if (error && status !== 406) { throw error }
      setNotif({type: "success", message: "Saved!"})
      setItemString("")
    } catch(error) {
      setNotif({type: "error", message: (error as AuthError).message})
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className="input-container">
    <div className="p16 df fdr"> 
      {
        parsedItems.map((item, i) =>
          <Item item={item} i={i}/>
        )
      }        
    </div>
    <div className=" p16" style={{background: `antiquewhite`}}>
        <div className="df fdc">
          <input 
            type="text"
            value={itemString}
            onChange={(e) => setItemString(e.target.value)}></input>
          <button   
            className="mt4" 
            onClick={handleSubmitItem}>
              Save
          </button>
        </div>
        {loading}
    </div>
    </div>
    </>
  )
  
}
