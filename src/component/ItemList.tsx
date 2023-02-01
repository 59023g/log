import { useEffect, useState } from 'react'
import { supabase } from '../service/supabase'
import { AuthError, Session } from '@supabase/supabase-js'
import Items from "./Items"

interface Item {
  items: string[][]
  created_at: Date
}
export default function InputItem( { session }: {session: Session} ) {
  const [items, setItems] = useState<Item[] | []>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getItems()
  }, [session]) // recently added item




  const getItems = async () => {
    try{
      setLoading(true)
      const { user } = session
      let { data, error, status } = await supabase
        .from('log')
        // https://supabase.com/docs/guides/database/json
        .select(`items:data->items, created_at:data->created_at`)
        // https://supabase.com/docs/reference/javascript/order
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)

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
