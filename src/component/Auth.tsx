import React, { useState } from 'react'
import { supabase } from '../service/supabase'
import { AuthError } from '@supabase/supabase-js'

function Auth({ setNotif }: 
  { setNotif: React.Dispatch<React.SetStateAction<any>> }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('Sending login link...')

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      setMessage('Check email for login link')
    } catch (error) {
      setNotif({type: "error", message: (error as AuthError).message })
    } finally {
      setLoading(true)
    }
  }

  return (
      <main className="container p16 bb">
      {loading
          ? (<div>{message}</div>)
          : (
              <div>Sign Up (or Log in)
                  <form onSubmit={handleLogin} className="df fdc mt4">
                      <input
                          id="email"
                          className="inputField"
                          type="email"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}/>
                      <button className="mt8" aria-live="polite">
                          Send Link
                      </button>
                  </form>
                  <p>Log is an easy to use, encrypted way for you to keep track of anything. Use it to record gym sets, diet, thoughts, or whatever you can think of!</p>
              </div>
          )}
      </main>
  )
}

export default Auth
