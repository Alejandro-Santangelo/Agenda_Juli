import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para la base de datos
export interface Paciente {
  id: number
  nombre: string
  edad: number
  motivo?: string
  telefono?: string
  email?: string
  observaciones?: string
  estado: 'activo' | 'seguimiento' | 'inactivo'
  created_at: string
  updated_at: string
}

export interface Sesion {
  id: number
  paciente_id: number
  fecha: string
  hora: string
  estado: 'programada' | 'completada' | 'cancelada'
  notas?: string
  created_at: string
  updated_at: string
  // Relación con paciente
  pacientes?: Paciente
}

export interface Tarea {
  id: number
  titulo: string
  descripcion?: string
  fecha: string
  hora: string
  hora_fin?: string
  estado: 'pendiente' | 'completada'
  prioridad: 'alta' | 'media' | 'baja'
  created_at: string
  updated_at: string
}