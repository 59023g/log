import { useEffect, useState } from 'react'
import { Session, AuthError } from '@supabase/supabase-js'
import { IItem } from "../types"

import { getItems } from '../service/supabase'
import { parseItem } from "../utils"
import Item from "./Item"

function filterByDay(item) {
  const date = new Date(item.created_at)
  date.getDay()


}
function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

export default function InputItem({ session, setNotif }: {session: Session, setNotif: any} ) {
  const [items, setItems] = useState<IItem[] | []>([])
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
      // sort by day  
      const result = groupBy(data, (c) => {
        const date = new Date(c.created_at)
        return `${date.getMonth()+1}-${date.getDay()}`
      } );
      console.log(Object.keys(result))
      setItems(result)
    } catch(error) {
      setNotif({type: "error", message: (error as AuthError).message})
    } finally {
      setLoading(false)

    }
  }
  
  const renderDate = (date: Date) => {
    // ${("" + (date.getMonth() + 1)).padStart(2, '0')}-${date.getDate()}
  return `
    ${date.getHours()}:${("" + (date.getMinutes())).padStart(2, '0')}
    `
}

  return (
      <>
      <div className='items-container'>
        {!items.length || loading ?
        "Loading..." : 
          <ul>
            {items.map((item, index) => {
              return (
                <li className="df mt4" key={index} data-id={index}>
                  <div className="date mr4">
                    { renderDate(new Date(items[index].created_at)) }
                  </div>
                    {parseItem(item.entry).map(
                      (entry, i) => {
                        return (<Item entry={entry} i={i}/>)
                    })
                  }
                </li>
              );
            })}
            
          </ul>
        }
        </div>
      </>
  )
}
