import { createClient, Session } from '@supabase/supabase-js'
import config from "../../config"
import { ItemString, ParsedItems } from '../types'

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey)

// https://learnsql.com/cookbook/how-to-group-by-month-in-postgresql/

export const insertItem = async (
  user: Session["user"], 
  itemString: ItemString
) => {
  return await supabase
  .from('log')
  .insert({
    user_id: user.id,
    data: {
      entry: itemString,
      created_at: new Date().toISOString(),
    }
  })
  .eq('user_id', user.id)
  .single()
}

export const getItems = async ( user: Session["user"] ) => {
  return await supabase
    .from('log')
    // https://supabase.com/docs/guides/database/json
    .select(`entry:data->entry, created_at:data->created_at`)
    // https://supabase.com/docs/reference/javascript/order
    .order('created_at', { ascending: false })
    .eq('user_id', user.id)
}

