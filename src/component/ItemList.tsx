import { useEffect, useState } from 'react'
import { supabase } from '../service/supabase'
import { AuthError, Session } from '@supabase/supabase-js'
import Items from "./Items"
import { getItems } from '../service/supabase'
interface Item {
  items: string[][]
  created_at: Date
}
export default function InputItem( { session }: {session: Session} ) {
  const [items, setItems] = useState<Item[] | []>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getItemsComponent()
  }, [session]) // recently added item

  const getItemsComponent = async () => {
    try{
      setLoading(true)
      const { user } = session
      let { data, error, status } = await getItems(session.user)

      if (error && status !== 406) { throw error }
      console.log(data)
      setItems(data)
    } catch(error) {
      // setNotif({type: "error", message: (error as AuthError).message})
    } finally {
      setLoading(false)

    }
  }
  

  return (
      <>
        {!items.length ?
        "" : 
        <div className='items-container'>
          <ul>
            {
              <Items items={items} />
            }
            
          </ul>
        </div>
        }
      </>
  )
}
