import {supabase} from '../service/supabase'

export default function SignOut({session}) {
    return ( <> {
        !session
            ? ''
            : (
                <div className="sign-out" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </div>
            )
        } 
    </>
  )
}