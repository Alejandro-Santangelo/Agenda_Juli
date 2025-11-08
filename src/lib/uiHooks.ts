import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import type { Paciente as SupabasePaciente, Sesion as SupabaseSesion, Tarea as SupabaseTarea } from './supabase'
import { 
  UIPaciente, 
  UISesion, 
  UITarea,
  adaptPacienteToUI, 
  adaptTareaToUI,
  adaptPacienteFromUI,
  adaptSesionFromUI,
  adaptTareaFromUI 
} from './adapters'

// Hook mejorado para pacientes con sesiones
export function useUIData() {
  const [pacientes, setPacientes] = useState<UIPaciente[]>([])
  const [tareas, setTareas] = useState<UITarea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar todos los datos
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Cargar pacientes
      const { data: pacientesData, error: pacientesError } = await supabase
        .from('pacientes')
        .select('*')
        .order('created_at', { ascending: false })

      if (pacientesError) throw pacientesError

      // Cargar sesiones
      const { data: sesionesData, error: sesionesError } = await supabase
        .from('sesiones')
        .select('*')
        .order('fecha', { ascending: true })

      if (sesionesError) throw sesionesError

      // Cargar tareas
      const { data: tareasData, error: tareasError } = await supabase
        .from('tareas')
        .select('*')
        .order('fecha', { ascending: true })

      if (tareasError) throw tareasError

      // Adaptar datos para la UI
      const adaptedPacientes = (pacientesData || []).map(paciente => 
        adaptPacienteToUI(paciente, sesionesData || [])
      )
      
      const adaptedTareas = (tareasData || []).map(adaptTareaToUI)

      setPacientes(adaptedPacientes)
      setTareas(adaptedTareas)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // PACIENTES
  const createPaciente = async (pacienteData: Partial<UIPaciente>) => {
    try {
      const supabaseData = adaptPacienteFromUI(pacienteData)
      const { data: newPaciente, error } = await supabase
        .from('pacientes')
        .insert([supabaseData])
        .select()
        .single()

      if (error) throw error

      // Si hay sesiones, crearlas también
      if (pacienteData.sesiones && pacienteData.sesiones.length > 0) {
        const sesionesData = pacienteData.sesiones.map(sesion => 
          adaptSesionFromUI(sesion, newPaciente.id)
        )
        
        const { error: sesionesError } = await supabase
          .from('sesiones')
          .insert(sesionesData)

        if (sesionesError) throw sesionesError
      }

      await fetchData() // Recargar datos
      return newPaciente
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear paciente')
      throw err
    }
  }

  const updatePaciente = async (id: number, updates: Partial<UIPaciente>) => {
    try {
      const supabaseData = adaptPacienteFromUI(updates)
      const { error } = await supabase
        .from('pacientes')
        .update(supabaseData)
        .eq('id', id)

      if (error) throw error

      await fetchData() // Recargar datos
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar paciente')
      throw err
    }
  }

  const deletePaciente = async (id: number) => {
    try {
      // Primero eliminar sesiones relacionadas
      const { error: sesionesError } = await supabase
        .from('sesiones')
        .delete()
        .eq('paciente_id', id)

      if (sesionesError) throw sesionesError

      // Luego eliminar paciente
      const { error } = await supabase
        .from('pacientes')
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchData() // Recargar datos
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar paciente')
      throw err
    }
  }

  // TAREAS
  const createTarea = async (tareaData: Partial<UITarea>) => {
    try {
      const supabaseData = adaptTareaFromUI(tareaData)
      const { data, error } = await supabase
        .from('tareas')
        .insert([supabaseData])
        .select()
        .single()

      if (error) throw error

      await fetchData() // Recargar datos
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear tarea')
      throw err
    }
  }

  const updateTarea = async (id: number, updates: Partial<UITarea>) => {
    try {
      const supabaseData = adaptTareaFromUI(updates)
      const { error } = await supabase
        .from('tareas')
        .update(supabaseData)
        .eq('id', id)

      if (error) throw error

      await fetchData() // Recargar datos
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar tarea')
      throw err
    }
  }

  const deleteTarea = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tareas')
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchData() // Recargar datos
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar tarea')
      throw err
    }
  }

  const toggleTareaStatus = async (id: number) => {
    try {
      const tarea = tareas.find(t => t.id === id)
      if (!tarea) throw new Error('Tarea no encontrada')

      const newStatus = tarea.estado === 'pendiente' ? 'completada' : 'pendiente'
      await updateTarea(id, { estado: newStatus })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar estado de tarea')
      throw err
    }
  }

  // SESIONES
  const createSesion = async (pacienteId: number, sesionData: Omit<UISesion, 'id'>) => {
    try {
      const supabaseData = adaptSesionFromUI({ id: 0, ...sesionData }, pacienteId)
      const { error } = await supabase
        .from('sesiones')
        .insert([supabaseData])

      if (error) throw error

      await fetchData() // Recargar datos
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear sesión')
      throw err
    }
  }

  const deleteSesion = async (sesionId: number) => {
    try {
      const { error } = await supabase
        .from('sesiones')
        .delete()
        .eq('id', sesionId)

      if (error) throw error

      await fetchData() // Recargar datos
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar sesión')
      throw err
    }
  }

  return {
    // Datos
    pacientes,
    tareas,
    loading,
    error,
    
    // Funciones de actualización
    refetch: fetchData,
    
    // Pacientes
    createPaciente,
    updatePaciente,
    deletePaciente,
    
    // Tareas
    createTarea,
    updateTarea,
    deleteTarea,
    toggleTareaStatus,
    
    // Sesiones
    createSesion,
    deleteSesion
  }
}