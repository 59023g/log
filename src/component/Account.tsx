import React, { useState, useEffect } from 'react'
import { supabase } from '../service/supabase'
import { AuthError, Session } from '@supabase/supabase-js'


const Account = ({ session, setNotif }: {session: Session, setNotif: any}) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const { user } = session
      let { data, error, status } = await supabase
        .from('users')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setNotif({type:"success", message: "Success. Logged in!"})

      }
    } catch (error) {
      console.log(error)
      setNotif({type: "error", message: (error as AuthError).message})
    } finally {

      setLoading(false)
    }
  }

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { user } = session

      const updates = {
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('users').update(updates).eq("id", user.id)

      if (error) {
        throw error
      }
    } catch (error) {
      setNotif({type: "error", message: (error as AuthError).message})
    } finally {
      setNotif({type: "success", message: "Saved!"})

      setLoading(false)
    }
  }

  return (
    <main className="container p16 bb df fdc" >
          <div>
          <form onSubmit={updateProfile} className="form">
            <div className="df"><label>Email:</label> {session.user.email}</div>
            <div className='mt8 df'>
              <label htmlFor="username">Name</label>
              <input
                id="username"
                type="text"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mt8 df'>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="url"
                value={website || ''}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className='mt8'>
              <button className="w100" disabled={loading}>
                Update profile
              </button>
            </div>
          </form>
          <button type="button" className="mt4 w100" onClick={() => supabase.auth.signOut()}>
              Sign Out
            </button>
          </div>

    </main>
  )
}

export default Account