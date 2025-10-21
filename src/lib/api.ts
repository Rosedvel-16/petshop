import { supabase } from './supabase'

// Helpers para invocar Edge Functions
async function invoke<T=any>(name: 'products'|'adoptions', init?: { method?: 'GET'|'POST'|'PATCH'|'DELETE', body?: any, path?: string }) {
  const { data, error } = await supabase.functions.invoke<T>(name + (init?.path ?? ''), {
    method: init?.method ?? 'GET',
    body: init?.body
  })
  if (error) throw error
  return data
}

// PUBLIC
export const api = {
  listProducts: () => invoke<any[]>('products'),
  listAdoptions: () => invoke<any[]>('adoptions'),

  // ADMIN (requiere sesión; RLS valida rol admin)
  createProduct: (p: any) => invoke('products', { method: 'POST', body: p }),
  updateProduct: (id: string, p: any) => invoke('products', { method: 'PATCH', path: `/${id}`, body: p }),
  deleteProduct: (id: string) => invoke('products', { method: 'DELETE', path: `/${id}` }),

  createPet: (p: any) => invoke('adoptions', { method: 'POST', body: p }),
  updatePet: (id: string, p: any) => invoke('adoptions', { method: 'PATCH', path: `/${id}`, body: p }),
  deletePet: (id: string) => invoke('adoptions', { method: 'DELETE', path: `/${id}` }),
}

// Perfil + rol
export async function getMyProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('id,email,role,full_name')
    .eq('id', user.id)
    .single()
  if (error) throw error
  return data
}
