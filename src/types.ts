export type Product = {
  id: string
  name: string
  description?: string | null
  price: number
  stock: number
  category?: string | null
  image_url?: string | null
  is_active: boolean
  created_at?: string
  updated_at?: string | null
}

export type Adoption = {
  id: string
  name: string
  age_years?: number | null
  breed?: string | null
  size?: 'small' | 'medium' | 'large' | null
  sex?: 'male' | 'female' | null
  description?: string | null
  image_url?: string | null
  status: 'available' | 'adopted'
  created_at?: string
  updated_at?: string | null
}
