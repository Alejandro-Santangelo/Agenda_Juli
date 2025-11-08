import type { Paciente as SupabasePaciente, Sesion as SupabaseSesion, Tarea as SupabaseTarea } from './supabase';

// Interfaces para la UI (formato original)
export interface UIPaciente {
  id: number;
  nombre: string;
  edad: number;
  motivo: string;
  sesiones: UISesion[];
  fecha_turno?: string; // Para compatibilidad
  hora?: string; // Para compatibilidad
  observaciones: string;
  estado: 'activo' | 'seguimiento' | 'inactivo';
  telefono?: string;
  email?: string;
}

export interface UISesion {
  id: number;
  fecha: string;
  hora: string;
}

export interface UITarea {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  hora_fin?: string;
  estado: 'pendiente' | 'completada';
  prioridad: 'alta' | 'media' | 'baja';
}

// Adaptadores para convertir de Supabase a UI
export function adaptPacienteToUI(
  paciente: SupabasePaciente, 
  sesiones: SupabaseSesion[] = []
): UIPaciente {
  const pacienteSesiones = sesiones
    .filter(sesion => sesion.paciente_id === paciente.id)
    .map(sesion => ({
      id: sesion.id,
      fecha: sesion.fecha,
      hora: sesion.hora
    }));

  // Para compatibilidad con el código legacy, usamos la primera sesión como fecha_turno/hora
  const firstSession = pacienteSesiones[0];

  return {
    id: paciente.id,
    nombre: paciente.nombre,
    edad: paciente.edad || 0,
    motivo: paciente.motivo || '',
    sesiones: pacienteSesiones,
    fecha_turno: firstSession?.fecha,
    hora: firstSession?.hora,
    observaciones: paciente.observaciones || '',
    estado: paciente.estado as 'activo' | 'seguimiento' | 'inactivo',
    telefono: paciente.telefono || undefined,
    email: paciente.email || undefined
  };
}

export function adaptTareaToUI(tarea: SupabaseTarea): UITarea {
  return {
    id: tarea.id,
    titulo: tarea.titulo,
    descripcion: tarea.descripcion || '',
    fecha: tarea.fecha,
    hora: tarea.hora,
    hora_fin: tarea.hora_fin || undefined,
    estado: tarea.estado as 'pendiente' | 'completada',
    prioridad: tarea.prioridad as 'alta' | 'media' | 'baja'
  };
}

// Adaptadores para convertir de UI a Supabase
export function adaptPacienteFromUI(paciente: Partial<UIPaciente>): Omit<SupabasePaciente, 'id' | 'created_at' | 'updated_at'> {
  return {
    nombre: paciente.nombre || '',
    edad: paciente.edad || 0,
    motivo: paciente.motivo || undefined,
    observaciones: paciente.observaciones || undefined,
    estado: paciente.estado || 'activo',
    telefono: paciente.telefono || undefined,
    email: paciente.email || undefined
  };
}

export function adaptSesionFromUI(
  sesion: UISesion, 
  pacienteId: number
): Omit<SupabaseSesion, 'id' | 'created_at' | 'updated_at'> {
  return {
    paciente_id: pacienteId,
    fecha: sesion.fecha,
    hora: sesion.hora,
    estado: 'programada'
  };
}

export function adaptTareaFromUI(tarea: Partial<UITarea>): Omit<SupabaseTarea, 'id' | 'created_at' | 'updated_at'> {
  return {
    titulo: tarea.titulo || '',
    descripcion: tarea.descripcion || undefined,
    fecha: tarea.fecha || '',
    hora: tarea.hora || '',
    hora_fin: tarea.hora_fin || undefined,
    estado: tarea.estado || 'pendiente',
    prioridad: tarea.prioridad || 'media'
  };
}