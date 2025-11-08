import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import type { Paciente, Sesion, Tarea } from './supabase'

// Hook para manejar pacientes
export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar pacientes
  const fetchPacientes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('pacientes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPacientes(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  // Crear paciente
  const createPaciente = async (paciente: Omit<Paciente, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('pacientes')
        .insert([paciente])
        .select()
        .single()

      if (error) throw error
      setPacientes(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear paciente')
      throw err
    }
  }

  // Actualizar paciente
  const updatePaciente = async (id: number, updates: Partial<Paciente>) => {
    try {
      const { data, error } = await supabase
        .from('pacientes')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setPacientes(prev => prev.map(p => p.id === id ? data : p))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar paciente')
      throw err
    }
  }

  // Eliminar paciente
  const deletePaciente = async (id: number) => {
    try {
      const { error } = await supabase
        .from('pacientes')
        .delete()
        .eq('id', id)

      if (error) throw error
      setPacientes(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar paciente')
      throw err
    }
  }

  useEffect(() => {
    fetchPacientes()
  }, [])

  return {
    pacientes,
    loading,
    error,
    createPaciente,
    updatePaciente,
    deletePaciente,
    refetch: fetchPacientes
  }
}

// Hook para manejar sesiones
export function useSesiones() {
  const [sesiones, setSesiones] = useState<(Sesion & { pacientes?: Paciente })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar sesiones con información del paciente
  const fetchSesiones = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sesiones')
        .select(`
          *,
          pacientes (*)
        `)
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true })

      if (error) throw error
      setSesiones(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  // Crear sesión
  const createSesion = async (sesion: Omit<Sesion, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('sesiones')
        .insert([sesion])
        .select(`
          *,
          pacientes (*)
        `)
        .single()

      if (error) throw error
      setSesiones(prev => [...prev, data].sort((a, b) => {
        const dateCompare = a.fecha.localeCompare(b.fecha)
        return dateCompare !== 0 ? dateCompare : a.hora.localeCompare(b.hora)
      }))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear sesión')
      throw err
    }
  }

  // Actualizar sesión
  const updateSesion = async (id: number, updates: Partial<Sesion>) => {
    try {
      const { data, error } = await supabase
        .from('sesiones')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(`
          *,
          pacientes (*)
        `)
        .single()

      if (error) throw error
      setSesiones(prev => prev.map(s => s.id === id ? data : s))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar sesión')
      throw err
    }
  }

  // Eliminar sesión
  const deleteSesion = async (id: number) => {
    try {
      const { error } = await supabase
        .from('sesiones')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSesiones(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar sesión')
      throw err
    }
  }

  // Obtener sesiones por fecha
  const getSesionesByDate = (fecha: string) => {
    return sesiones.filter(s => s.fecha === fecha)
  }

  // Obtener sesiones por paciente
  const getSesionesByPaciente = (pacienteId: number) => {
    return sesiones.filter(s => s.paciente_id === pacienteId)
  }

  useEffect(() => {
    fetchSesiones()
  }, [])

  return {
    sesiones,
    loading,
    error,
    createSesion,
    updateSesion,
    deleteSesion,
    getSesionesByDate,
    getSesionesByPaciente,
    refetch: fetchSesiones
  }
}

// Hook para manejar tareas
export function useTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar tareas
  const fetchTareas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tareas')
        .select('*')
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true })

      if (error) throw error
      setTareas(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  // Crear tarea
  const createTarea = async (tarea: Omit<Tarea, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tareas')
        .insert([tarea])
        .select()
        .single()

      if (error) throw error
      setTareas(prev => [...prev, data].sort((a, b) => {
        const dateCompare = a.fecha.localeCompare(b.fecha)
        return dateCompare !== 0 ? dateCompare : a.hora.localeCompare(b.hora)
      }))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear tarea')
      throw err
    }
  }

  // Actualizar tarea
  const updateTarea = async (id: number, updates: Partial<Tarea>) => {
    try {
      const { data, error } = await supabase
        .from('tareas')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setTareas(prev => prev.map(t => t.id === id ? data : t))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar tarea')
      throw err
    }
  }

  // Eliminar tarea
  const deleteTarea = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tareas')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTareas(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar tarea')
      throw err
    }
  }

  // Obtener tareas por fecha
  const getTareasByDate = (fecha: string) => {
    return tareas.filter(t => t.fecha === fecha)
  }

  // Cambiar estado de tarea
  const toggleTareaStatus = async (id: number) => {
    const tarea = tareas.find(t => t.id === id)
    if (tarea) {
      const newStatus = tarea.estado === 'pendiente' ? 'completada' : 'pendiente'
      await updateTarea(id, { estado: newStatus })
    }
  }

  useEffect(() => {
    fetchTareas()
  }, [])

  return {
    tareas,
    loading,
    error,
    createTarea,
    updateTarea,
    deleteTarea,
    getTareasByDate,
    toggleTareaStatus,
    refetch: fetchTareas
  }
}