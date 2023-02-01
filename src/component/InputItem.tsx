import { useEffect, useState } from 'react'
import { supabase } from '../service/supabase'
import { AuthError, Session } from '@supabase/supabase-js'
import ItemList from "./ItemList"
import Item from "./Item"

export default function InputItem( { session, setNotif }: {session: Session, setNotif: any} ) {
  const [itemString, setItemString] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [parsedItems, setParsedItems] = useState<string[][]>([])

  useEffect(() => {
    const parsedItems = parseItem(itemString)
    setParsedItems(parsedItems)
  }, [itemString])

  const itemSplit = "&"
  const qtyValSplit = ","

  // parse the text so it follows this rule (qty & value), (qty & value)
  const parseItem = (itemString: string) => {
    if(!itemString.length) return []
    const itemArr = itemString.split(itemSplit)
    const finalArr = itemArr.map((item) => {
        return item.split(qtyValSplit).map((split) => {
          return split.trim()
        })
      })

    // drop empty arr at end if exists
    if(!finalArr[finalArr.length - 1][0].length) {
      return finalArr.splice(0, finalArr.length - 1 )
    }
    return finalArr
  }

  const handleSubmitItem = async () => {
    try{
      setLoading(true)
      const { user } = session
      let { data, error, status } = await supabase
        .from('log')
        .insert({
          user_id: user.id,
          data: {
            items: parsedItems,
            created_at: new Date().toISOString(),
          }
        })
        .eq('user_id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }
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
      <ItemList session={session}/>
      
      <div className="input-container">
        <div className="p16 df fdr"> 
          {
            parsedItems.map((item, i) =>
              <Item item={item} i={i}/>
            )
          }
           <div> {itemString}</div>
        
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
