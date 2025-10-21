import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getMyProfile } from '../lib/api'

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>(null)
  const [role, setRole] = useState<'admin'|'customer'|null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    (async () => {
      if (!session) { setRole(null); setLoading(false); return }
      try {
        const profile = await getMyProfile()
        setRole((profile?.role as any) ?? null)
      } catch { setRole(null) }
      finally { setLoading(false) }
    })()
  }, [session])

  return { loading, session, role }
}
