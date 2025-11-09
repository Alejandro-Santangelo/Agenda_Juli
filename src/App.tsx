import React, { useState } from 'react';
import { FlowerIcon, CalendarIcon, PatientsIcon, BackIcon } from './FlowerIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIData } from './lib/uiHooks';
import type { UIPaciente as Paciente, UISesion as Sesion, UITarea as Tarea } from './lib/adapters';

const TABS = [
  { key: 'agenda', label: 'Mi Agenda' },
  { key: 'pacientes', label: 'Mis Pacientes' },
];

// Función para detectar dispositivos móviles
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Función para obtener el viewport height correcto en móviles
const getViewportHeight = () => {
  return window.visualViewport ? window.visualViewport.height : window.innerHeight;
};

export default function App() {
  const [section, setSection] = useState<'home' | 'agenda' | 'pacientes'>('home');
  
  // Hook unificado para todos los datos
  const {
    pacientes,
    tareas,
    loading,
    error,
    createPaciente,
    updatePaciente,
    deletePaciente,
    createTarea,
    updateTarea,
    deleteTarea,
    toggleTareaStatus,
    createSesion,
    deleteSesion
  } = useUIData();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando datos...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg z-50 max-w-md">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-300/20 to-accent-400/30" />
      
      {/* Elementos flotantes decorativos */}
      <div className="absolute top-20 left-4 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-primary-300/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-4 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-accent-300/20 rounded-full blur-lg animate-pulse-slow" />
      <div className="absolute bottom-20 left-1/4 w-32 sm:w-40 h-32 sm:h-40 bg-primary-200/10 rounded-full blur-2xl animate-bounce-slow" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 font-poppins">
        <AnimatePresence mode="wait">
          {section === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-12"
            >
              {/* Título principal */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 text-shadow-lg tracking-tight">
                  Agenda de <span className="text-yellow-300 drop-shadow-lg">Juli</span>
                </h1>
              </motion.div>

              {/* Botones principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                <motion.button
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    transition: { duration: 0.3 } 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full h-64 glass-strong rounded-3xl p-6 sm:p-8 text-white overflow-hidden neon clickable btn-mobile"
                  onClick={() => setSection('agenda')}
                >
                  {/* Efecto shimmer */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6">
                    <div className="p-4 bg-primary-500/30 rounded-2xl group-hover:bg-primary-400/40 transition-colors duration-300">
                      <CalendarIcon color="#ffffff" size={64} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2 title-mobile">Mi Agenda</h3>
                      <p className="text-white/70 text-xs sm:text-sm">Gestiona tus citas y recordatorios</p>
                    </div>
                  </div>
                  
                  {/* Indicador de hover */}
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <motion.button
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    transition: { duration: 0.3 } 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full h-64 glass-strong rounded-3xl p-6 sm:p-8 text-white overflow-hidden neon clickable btn-mobile"
                  onClick={() => setSection('pacientes')}
                >
                  {/* Efecto shimmer */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6">
                    <div className="p-4 bg-accent-500/30 rounded-2xl group-hover:bg-accent-400/40 transition-colors duration-300">
                      <PatientsIcon color="#ffffff" size={64} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2 title-mobile">Mis Pacientes</h3>
                      <p className="text-white/70 text-xs sm:text-sm">Administra información de pacientes</p>
                    </div>
                  </div>
                  
                  {/* Indicador de hover */}
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>

              {/* Decoración flotante */}
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 opacity-20"
              >
                <FlowerIcon color="#ffffff" size={80} />
              </motion.div>
            </motion.div>
          )}

          {section === 'agenda' && (
            <motion.div
              key="agenda"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl"
            >
              <AgendaSection 
                tareas={tareas} 
                createTarea={createTarea}
                deleteTarea={deleteTarea}
                updateTarea={updateTarea}
                toggleTareaStatus={toggleTareaStatus}
                pacientes={pacientes} 
                setSection={setSection} 
              />
            </motion.div>
          )}

          {section === 'pacientes' && (
            <motion.div
              key="pacientes"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl"
            >
              <PacientesSection 
                pacientes={pacientes} 
                createPaciente={createPaciente}
                deletePaciente={deletePaciente}
                updatePaciente={updatePaciente}
                createSesion={createSesion}
                deleteSesion={deleteSesion}
                tareas={tareas} 
                setSection={setSection} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


// Iconos adicionales para el CRUD
function AddIcon({ color = '#ffffff', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon({ color = '#ffffff', size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeleteIcon({ color = '#ef4444', size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="11" x2="10" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="11" x2="14" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SaveIcon({ color = '#10b981', size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17,21 17,13 7,13 7,21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="7,3 7,8 15,8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CancelIcon({ color = '#ef4444', size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface AgendaSectionProps {
  tareas: Tarea[];
  createTarea: (tarea: Partial<Tarea>) => Promise<any>;
  deleteTarea: (id: number) => Promise<void>;
  updateTarea: (id: number, updates: Partial<Tarea>) => Promise<void>;
  toggleTareaStatus: (id: number) => Promise<void>;
  pacientes: Paciente[];
  setSection: React.Dispatch<React.SetStateAction<'home' | 'agenda' | 'pacientes'>>;
}

function AgendaSection({ tareas, createTarea, deleteTarea, updateTarea, toggleTareaStatus, pacientes, setSection }: AgendaSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDaySchedule, setShowDaySchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [editingTask, setEditingTask] = useState<Tarea | null>(null);
  const [formData, setFormData] = useState<Partial<Tarea>>({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    hora_fin: '',
    estado: 'pendiente',
    prioridad: 'media'
  });

  // Funciones helper para el calendario
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
  };

  // Función para obtener la agenda completa del día (incluyendo pacientes y actividades)
  const getFullDaySchedule = (date: string) => {
    const schedule: Array<{
      hora: string;
      paciente: Paciente | null;
      sesion: Sesion | null;
      tarea: Tarea | null;
      isOcupado: boolean;
    }> = [];
    
    // Filtrar sesiones de pacientes y tareas para este día
    const sesionesByHour: { [key: string]: { paciente: Paciente; sesion: Sesion } } = {};
    
    pacientes.forEach(paciente => {
      if (paciente.sesiones && paciente.sesiones.length > 0) {
        paciente.sesiones.forEach(sesion => {
          if (sesion.fecha === date) {
            const hourStr = sesion.hora.split(':')[0].padStart(2, '0') + ':00';
            sesionesByHour[hourStr] = { paciente, sesion };
          }
        });
      }
      // Compatibilidad con formato antiguo (fecha_turno/hora)
      else if (paciente.fecha_turno === date && paciente.hora) {
        const hourStr = paciente.hora.split(':')[0].padStart(2, '0') + ':00';
        sesionesByHour[hourStr] = { 
          paciente, 
          sesion: { id: 0, fecha: paciente.fecha_turno, hora: paciente.hora }
        };
      }
    });
    
    const tareasDelDia = tareas.filter(t => t.fecha === date);
    
    // Crear mapa de horas ocupadas por tareas (pueden ocupar múltiples horas)
    const tareasByHour: { [key: string]: Tarea } = {};
    const horasOcupadasPorTareas = new Set<string>();
    
    tareasDelDia.forEach(t => {
      if (t.hora) {
        const horaInicio = parseInt(t.hora.split(':')[0]);
        const horaInicioStr = horaInicio.toString().padStart(2, '0') + ':00';
        
        // La tarea se muestra en su hora de inicio
        tareasByHour[horaInicioStr] = t;
        
        // Si tiene hora_fin, marcar todas las horas intermedias como ocupadas
        if (t.hora_fin) {
          const horaFin = parseInt(t.hora_fin.split(':')[0]);
          
          // Marcar todas las horas desde inicio hasta fin como ocupadas
          for (let h = horaInicio; h <= horaFin; h++) {
            const hourStr = h.toString().padStart(2, '0') + ':00';
            horasOcupadasPorTareas.add(hourStr);
          }
        } else {
          // Si no tiene hora_fin, solo ocupa 1 hora
          horasOcupadasPorTareas.add(horaInicioStr);
        }
      }
    });
    
    // Generar horarios de 6:00 a 23:00
    for (let hour = 6; hour <= 23; hour++) {
      const hourStr = hour.toString().padStart(2, '0') + ':00';
      const sesionData = sesionesByHour[hourStr] || null;
      const tarea = tareasByHour[hourStr] || null;
      const isOcupado = sesionData !== null || horasOcupadasPorTareas.has(hourStr);
      
      schedule.push({
        hora: hourStr,
        paciente: sesionData?.paciente || null,
        sesion: sesionData?.sesion || null,
        tarea,
        isOcupado
      });
    }
    
    return schedule;
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      hora_fin: '',
      estado: 'pendiente',
      prioridad: 'media'
    });
    setEditingTask(null);
    setShowForm(false);
    setShowCalendar(false);
    setShowDaySchedule(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTask) {
        await updateTarea(editingTask.id, formData);
      } else {
        const newTask = {
          titulo: formData.titulo || '',
          descripcion: formData.descripcion || '',
          fecha: formData.fecha || '',
          hora: formData.hora || '',
          hora_fin: formData.hora_fin,
          estado: formData.estado || 'pendiente' as const,
          prioridad: formData.prioridad || 'media' as const
        };
        await createTarea(newTask);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
      alert('Error al guardar la tarea. Por favor intenta de nuevo.');
    }
  };

  const handleEdit = (tarea: Tarea) => {
    setEditingTask(tarea);
    setFormData(tarea);
    setShowForm(true);
    setShowList(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      try {
        await deleteTarea(id);
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        alert('Error al eliminar la tarea. Por favor intenta de nuevo.');
      }
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      await toggleTareaStatus(id);
    } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
      alert('Error al actualizar el estado. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white text-shadow mb-8">Mi Agenda Personal</h2>
        
        {/* Botones de acción mejorados */}
        <div className="flex items-center justify-center mb-4" style={{ gap: '4rem' }}>
          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
              boxShadow: '0 10px 40px rgba(249, 115, 22, 0.4)'
            }}
            className="group relative overflow-hidden rounded-3xl px-12 py-6 text-white hover:shadow-2xl transition-all flex items-center gap-4 font-bold text-lg border-2 border-orange-400/50"
            title="Nueva actividad"
          >
            <div className="relative z-10">
              <AddIcon size={28} color="#fff" />
            </div>
            <span className="relative z-10">Nueva Actividad</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowList(true)}
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #6366f1 100%)',
              boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4)'
            }}
            className="group relative overflow-hidden rounded-3xl px-12 py-6 text-white hover:shadow-2xl transition-all flex items-center gap-4 font-bold text-lg border-2 border-purple-400/50"
            title="Ver todas las actividades"
          >
            <svg className="relative z-10" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span className="relative z-10">Ver Todas</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Modal para formulario */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={resetForm}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[101] rounded-[2rem] p-4 sm:p-8 shadow-2xl overflow-y-auto backdrop-blur-md border border-white/30 modal-mobile scroll-mobile modal-responsive"
              style={{ 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '650px', 
                maxWidth: '90vw', 
                maxHeight: '85vh',
                background: 'linear-gradient(135deg, rgba(251, 207, 232, 0.95) 0%, rgba(254, 215, 170, 0.95) 50%, rgba(255, 237, 213, 0.95) 100%)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white title-mobile">
                    {editingTask ? '✏️ Editar Cita' : '➕ Nueva Cita'}
                  </h3>
                  <p className="text-white/60 mt-1 text-xs sm:text-sm">Completa los datos de tu actividad personal</p>
                </div>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors btn-mobile"
                >
                  <CancelIcon size={24} />
                </button>
              </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Título */}
                  <div>
                    <label className="block text-white text-base font-semibold mb-2">
                      📌 Título de la cita
                    </label>
                    <div className="flex justify-center mb-4">
                      <button
                        type="button"
                        onClick={() => setSection('home')}
                        className="max-w-xs py-4 px-4 text-lg font-bold rounded-full shadow-lg bg-accent-400 text-white hover:bg-accent-500 transition-all flex items-center justify-center gap-3"
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5M12 19l-7-7 7-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        Volver
                      </button>
                    </div>
                    <input
                      type="text"
                      value={formData.titulo}
                      onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                      className="w-full px-5 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                      placeholder="Ej: Consulta con Dr. García"
                      required
                    />
                  </div>

                  {/* Fecha y Hora en fila */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-base font-semibold mb-2">
                        📅 Fecha
                      </label>
                      <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                        onFocus={() => setShowCalendar(true)}
                        className="w-full px-5 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all cursor-pointer"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white text-base font-semibold mb-2">
                        🕐 Hora Inicio
                      </label>
                      <input
                        type="time"
                        value={formData.hora}
                        onChange={(e) => setFormData({...formData, hora: e.target.value})}
                        className="w-full px-5 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                        required
                        readOnly={!formData.fecha}
                        placeholder={!formData.fecha ? "Fecha primero" : ""}
                      />
                    </div>
                  </div>

                  {/* Hora Fin (opcional) */}
                  <div>
                    <label className="block text-white text-base font-semibold mb-2">
                      ⏱️ Hora Fin <span className="text-xs text-white/50">(opcional - si dura más de 1 hora)</span>
                    </label>
                    <input
                      type="time"
                      value={formData.hora_fin || ''}
                      onChange={(e) => setFormData({...formData, hora_fin: e.target.value})}
                      className="w-full px-5 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                      readOnly={!formData.hora}
                      placeholder={!formData.hora ? "Hora inicio primero" : "Vacío = 1 hora"}
                    />
                  </div>

                  {/* Prioridad con botones grandes */}
                  <div>
                    <label className="block text-white text-base font-semibold mb-2">
                      ⚡ Prioridad
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {(['baja', 'media', 'alta'] as const).map((prioridad) => (
                        <button
                          key={prioridad}
                          type="button"
                          onClick={() => setFormData({...formData, prioridad})}
                          className={`py-4 px-5 rounded-2xl text-base font-semibold transition-all ${
                            formData.prioridad === prioridad
                              ? prioridad === 'alta' 
                                ? 'bg-red-500/40 text-red-100 ring-2 ring-red-400 shadow-lg' 
                                : prioridad === 'media' 
                                ? 'bg-yellow-500/40 text-yellow-100 ring-2 ring-yellow-400 shadow-lg' 
                                : 'bg-green-500/40 text-green-100 ring-2 ring-green-400 shadow-lg'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {prioridad.charAt(0).toUpperCase() + prioridad.slice(1)}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-center pt-2">
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-white text-base font-semibold mb-2">
                      📝 Descripción
                    </label>
                    <textarea
                      value={formData.descripcion}
                      onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                      className="w-full px-5 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all resize-none"
                      placeholder="Detalles de la cita..."
                      rows={4}
                      required
                    />
                    <div className="flex justify-center pt-4">
                      <div className="flex justify-end w-full">
                        <div className="mr-8">
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 px-8 py-4 bg-white/10 text-white rounded-2xl text-base font-medium hover:bg-white/20 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl text-base font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                    >
                      {editingTask ? 'Actualizar' : 'Guardar'}
                    </button>
                  </div>
                </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal del Calendario */}
      <AnimatePresence>
        {showCalendar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
              onClick={() => setShowCalendar(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[151] pointer-events-none modal-responsive"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '500px'
              }}
            >
              <div 
                className="rounded-3xl p-4 sm:p-8 w-full shadow-2xl pointer-events-auto modal-mobile scroll-mobile"
                style={{
                  backgroundColor: '#fbd7a5',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                  borderRadius: '2rem',
                  padding: '1rem 1rem 2rem 2rem',
                  width: '100%',
                  pointerEvents: 'auto',
                  overflowY: 'auto',
                  maxHeight: 'calc(100vh - 8rem)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white title-mobile">📅 Selecciona Fecha</h3>
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors btn-mobile"
                  >
                    <CancelIcon size={24} />
                  </button>
                </div>
                
                {/* Calendario simple */}
                <div className="space-y-4">
                  {(() => {
                    const today = new Date();
                    const currentMonth = today.getMonth();
                    const currentYear = today.getFullYear();
                    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
                    const firstDay = getFirstDayOfMonth(currentYear, currentYear);
                    const days = [];
                    
                    // Días del mes
                    for (let i = 1; i <= daysInMonth; i++) {
                      days.push(i);
                    }
                    
                    return (
                      <div>
                        <div className="text-center mb-4">
                          <h4 className="text-xl font-bold text-white">
                            {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][currentMonth]} {currentYear}
                          </h4>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                            <div key={day} className="text-center text-white/90 font-bold text-base py-2">
                              {day}
                            </div>
                          ))}
                          {Array(firstDay).fill(null).map((_, i) => (
                            <div key={`empty-${i}`} className="h-[52px] border border-white/10 bg-white/5" />
                          ))}
                          {days.map(day => {
                            const date = new Date(currentYear, currentMonth, day);
                            const dateStr = formatDateForInput(date);
                            const isToday = day === today.getDate();
                            return (
                              <button
                                key={day}
                                onClick={() => {
                                  setSelectedDate(dateStr);
                                  setShowDaySchedule(true);
                                }}
                                className={`h-[52px] flex flex-col items-center justify-center text-white font-semibold transition-all text-base border border-white/10 ${
                                  isToday
                                    ? 'ring-2 ring-yellow-400'
                                    : ''
                                }`}
                                style={{ backgroundColor: 'rgba(148, 163, 184, 0.1)' }}
                              >
                                <span className="font-bold">{day}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de Agenda del Día */}
      <AnimatePresence>
        {showDaySchedule && selectedDate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
              onClick={() => setShowDaySchedule(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[201] pointer-events-none modal-responsive"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '600px'
              }}
            >
              <div 
                className="rounded-3xl p-8 w-full shadow-2xl pointer-events-auto overflow-y-auto modal-mobile scroll-mobile"
                style={{
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.25) 0%, rgba(22,163,74,0.25) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(34,197,94,0.5)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                  maxHeight: 'calc(100vh - 12rem)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">📋 {formatDateForDisplay(selectedDate)}</h3>
                    {showForm && (
                      <p className="text-white/70 text-sm mt-1">💡 Selecciona un horario disponible (sin pacientes)</p>
                    )}
                  </div>
                  <button
                    onClick={() => setShowDaySchedule(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <CancelIcon size={24} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-white">📋 Agenda completa del día (6:00 - 24:00):</h4>
                  
                  {getFullDaySchedule(selectedDate).map((slot, index) => {
                    const hasPaciente = slot.paciente !== null;
                    const hasTarea = slot.tarea !== null;
                    const isDisponible = !slot.isOcupado;
                    
                    // Calcular duración si hay tarea con hora_fin
                    let duracionHoras = 1;
                    if (hasTarea && slot.tarea!.hora_fin) {
                      const horaInicio = parseInt(slot.tarea!.hora.split(':')[0]);
                      const horaFin = parseInt(slot.tarea!.hora_fin.split(':')[0]);
                      duracionHoras = horaFin - horaInicio + 1;
                    }
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => {
                          if (isDisponible && showForm) {
                            setFormData({
                              ...formData,
                              fecha: selectedDate,
                              hora: slot.hora
                            });
                            setShowDaySchedule(false);
                            setShowCalendar(false);
                          }
                        }}
                        className={`p-4 rounded-xl transition-all ${
                          hasPaciente
                            ? 'bg-red-500/20 border-2 border-red-400/30'
                            : hasTarea
                            ? 'bg-blue-500/20 border-2 border-blue-400/30'
                            : slot.isOcupado
                            ? 'bg-purple-500/20 border-2 border-purple-400/30 cursor-not-allowed'
                            : isDisponible && showForm
                            ? 'bg-emerald-500/20 border-2 border-emerald-400/30 cursor-pointer hover:bg-emerald-500/30'
                            : 'bg-white/10 border-2 border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className="text-lg font-bold text-white">{slot.hora}</h5>
                              {hasPaciente ? (
                                <span className="text-xs bg-red-500/40 text-red-100 px-2 py-1 rounded-full font-medium">
                                  �‍⚕️ Paciente
                                </span>
                              ) : hasTarea ? (
                                <span className="text-xs bg-blue-500/40 text-blue-100 px-2 py-1 rounded-full font-medium">
                                  📝 Actividad Personal {duracionHoras > 1 ? `(${duracionHoras}h)` : ''}
                                </span>
                              ) : slot.isOcupado ? (
                                <span className="text-xs bg-purple-500/40 text-purple-100 px-2 py-1 rounded-full font-medium">
                                  🔒 Ocupado
                                </span>
                              ) : (
                                <span className="text-xs bg-emerald-500/40 text-emerald-100 px-2 py-1 rounded-full font-medium">
                                  ✅ Disponible
                                </span>
                              )}
                            </div>
                            
                            {hasPaciente && (
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                  <p className="text-white/60 text-xs">Paciente</p>
                                  <p className="text-white font-semibold">{slot.paciente!.nombre}</p>
                                </div>
                                <div>
                                  <p className="text-white/60 text-xs">Teléfono</p>
                                  <p className="text-white font-semibold">{slot.paciente!.telefono || 'No registrado'}</p>
                                </div>
                              </div>
                            )}
                            
                            {hasTarea && (
                              <div className="mt-2">
                                <p className="text-white/60 text-xs">Actividad</p>
                                <p className="text-white font-semibold">{slot.tarea!.titulo}</p>
                                <p className="text-white/70 text-sm mt-1">{slot.tarea!.descripcion}</p>
                                {slot.tarea!.hora_fin && (
                                  <p className="text-white/60 text-xs mt-1">
                                    ⏱️ {slot.tarea!.hora} - {slot.tarea!.hora_fin}
                                  </p>
                                )}
                              </div>
                            )}
                            
                            {isDisponible && !hasTarea && showForm && (
                              <p className="text-emerald-200 text-sm mt-1">Click para agendar actividad en este horario</p>
                            )}
                            
                            {slot.isOcupado && !hasTarea && !hasPaciente && (
                              <p className="text-purple-200 text-sm mt-1">Hora ocupada por actividad de varias horas</p>
                            )}
                          </div>

                          {/* Botones de acción para ACTIVIDADES PERSONALES */}
                          {hasTarea && (
                            <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => {
                                  setEditingTask(slot.tarea!);
                                  setFormData({
                                    ...slot.tarea!,
                                    fecha: '',
                                    hora: '',
                                    hora_fin: ''
                                  });
                                  setShowCalendar(true);
                                }}
                                className="px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors text-xs flex items-center gap-1.5 whitespace-nowrap"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                  <line x1="16" y1="2" x2="16" y2="6"></line>
                                  <line x1="8" y1="2" x2="8" y2="6"></line>
                                  <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                Reprogramar
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`¿Cancelar actividad "${slot.tarea!.titulo}" el ${selectedDate} a las ${slot.hora}?`)) {
                                    try {
                                      await deleteTarea(slot.tarea!.id);
                                    } catch (error) {
                                      console.error('Error al cancelar la actividad:', error);
                                      alert('Error al cancelar la actividad. Por favor intenta de nuevo.');
                                    }
                                  }
                                }}
                                className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-xs flex items-center gap-1.5 whitespace-nowrap"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                                Cancelar
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lista de tareas */}
      <div className="grid gap-6">
        {tareas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-white/30 text-6xl mb-4">📅</div>
            <div className="text-white/50 text-xl font-medium">No hay citas programadas</div>
            <p className="text-white/30 text-sm mt-2">Haz clic en el botón + para agregar una</p>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={() => setSection('home')}
                className="max-w-xs py-4 px-4 text-lg font-bold rounded-full shadow-lg text-white hover:bg-accent-500 transition-all flex items-center justify-center gap-3"
                style={{ backgroundColor: '#f8bb6d' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5M12 19l-7-7 7-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                Volver
              </button>
            </div>
          </motion.div>
        ) : (
          tareas.map((tarea, index) => (
            <motion.div
              key={tarea.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-strong rounded-2xl p-6 text-white shadow-2xl group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{tarea.titulo}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tarea.prioridad === 'alta' ? 'bg-red-500/20 text-red-300' :
                      tarea.prioridad === 'media' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {tarea.prioridad}
                    </span>
                  </div>
                  <p className="text-white/70 mb-4">{tarea.descripcion}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-primary-500/30 px-3 py-1 rounded-lg">
                      📅 {tarea.fecha}
                    </span>
                    <span className="bg-accent-500/30 px-3 py-1 rounded-lg">
                      🕐 {tarea.hora}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => toggleStatus(tarea.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      tarea.estado === 'completada' 
                        ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                        : 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
                    }`}
                  >
                    {tarea.estado === 'completada' ? '✓ Completada' : '⏳ Pendiente'}
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tarea)}
                      className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="Editar"
                    >
                      <EditIcon size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(tarea.id)}
                      className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Eliminar"
                    >
                      <DeleteIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal de Ver Todas las Actividades */}
      <AnimatePresence>
        {showList && tareas.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowList(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[101] pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '800px'
              }}
            >
              <div 
                className="rounded-[2rem] p-8 w-full shadow-2xl pointer-events-auto overflow-y-auto"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.25) 0%, rgba(147,51,234,0.25) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(168,85,247,0.5)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                  maxHeight: 'calc(100vh - 10rem)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-white">📋 Todas mis Actividades</h3>
                  <button
                    onClick={() => setShowList(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <CancelIcon size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {tareas.map((tarea, index) => (
                    <motion.div
                      key={tarea.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-white">{tarea.titulo}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              tarea.prioridad === 'alta' ? 'bg-red-500/30 text-red-200' :
                              tarea.prioridad === 'media' ? 'bg-yellow-500/30 text-yellow-200' :
                              'bg-green-500/30 text-green-200'
                            }`}>
                              {tarea.prioridad.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm mb-3">{tarea.descripcion}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-lg flex items-center gap-1">
                              📅 {tarea.fecha}
                            </span>
                            <span className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-lg flex items-center gap-1">
                              🕐 {tarea.hora}
                            </span>
                            <span className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
                              tarea.estado === 'completada' 
                                ? 'bg-green-500/20 text-green-200' 
                                : 'bg-orange-500/20 text-orange-200'
                            }`}>
                              {tarea.estado === 'completada' ? '✓ Completada' : '⏳ Pendiente'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              handleEdit(tarea);
                              setShowList(false);
                            }}
                            className="p-2.5 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-colors"
                            title="Editar"
                          >
                            <EditIcon size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(tarea.id)}
                            className="p-2.5 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-colors"
                            title="Eliminar"
                          >
                            <DeleteIcon size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PacientesSectionProps {
  pacientes: Paciente[];
  createPaciente: (paciente: Partial<Paciente>) => Promise<any>;
  deletePaciente: (id: number) => Promise<void>;
  updatePaciente: (id: number, updates: Partial<Paciente>) => Promise<void>;
  createSesion: (pacienteId: number, sesion: Omit<Sesion, 'id'>) => Promise<void>;
  deleteSesion: (sesionId: number) => Promise<void>;
  tareas: Tarea[];
  setSection: React.Dispatch<React.SetStateAction<'home' | 'agenda' | 'pacientes'>>;
}

function PacientesSection({ 
  pacientes, 
  createPaciente, 
  deletePaciente, 
  updatePaciente,
  createSesion,
  deleteSesion,
  tareas, 
  setSection 
}: PacientesSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDaySessions, setShowDaySessions] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [editingPatient, setEditingPatient] = useState<Paciente | null>(null);
  const [formData, setFormData] = useState<Partial<Paciente>>({
    nombre: '',
    edad: 0,
    motivo: '',
    sesiones: [],
    fecha_turno: '',
    hora: '',
    observaciones: '',
    estado: 'activo',
    telefono: '',
    email: ''
  });

  // Estado temporal para agregar nuevas sesiones
  const [nuevaSesion, setNuevaSesion] = useState<{ fecha: string; hora: string }>({
    fecha: '',
    hora: ''
  });

  // Obtener sesiones del día seleccionado
  const getSessionsByDate = (date: string) => {
    const sesionesDelDia: Array<{ paciente: Paciente; sesion: Sesion }> = [];
    
    pacientes.forEach(paciente => {
      if (paciente.sesiones && paciente.sesiones.length > 0) {
        paciente.sesiones.forEach(sesion => {
          if (sesion.fecha === date) {
            sesionesDelDia.push({ paciente, sesion });
          }
        });
      }
      // Compatibilidad con formato antiguo
      else if (paciente.fecha_turno === date && paciente.hora) {
        sesionesDelDia.push({
          paciente,
          sesion: { id: 0, fecha: paciente.fecha_turno, hora: paciente.hora }
        });
      }
    });
    
    return sesionesDelDia.sort((a, b) => a.sesion.hora.localeCompare(b.sesion.hora));
  };

  // Generar horarios disponibles sugeridos (de 8:00 a 20:00, evitando ocupados)
  const getSuggestedAvailableSlots = (date: string) => {
    const occupiedSessions = getSessionsByDate(date);
    const occupiedHours = occupiedSessions.map(p => {
      const [hour, minute] = p.sesion.hora.split(':').map(Number);
      return hour; // Solo la hora (cada sesión dura 1 hora)
    });

    const suggestedSlots = [];
    // Horario laboral típico: 8:00 a 20:00
    for (let hour = 8; hour <= 19; hour++) {
      // Si esta hora NO está ocupada, es disponible
      if (!occupiedHours.includes(hour)) {
        const timeStr = `${String(hour).padStart(2, '0')}:00`;
        suggestedSlots.push(timeStr);
      }
    }

    return suggestedSlots.slice(0, 6); // Máximo 6 sugerencias
  };

  // Generar agenda completa del día (6:00 a 24:00) con pacientes y actividades personales
  const getFullDaySchedule = (date: string) => {
    const sessions = getSessionsByDate(date);
    const tareasDelDia = tareas.filter(t => t.fecha === date);
    const schedule = [];
    
    // Crear objeto map para acceso rápido por hora (sesiones de pacientes)
    const sessionsByHour: { [key: string]: { paciente: Paciente; sesion: Sesion } } = {};
    sessions.forEach(({ paciente, sesion }) => {
      const hour = sesion.hora.substring(0, 2); // Obtener solo la hora (ej: "10" de "10:00")
      sessionsByHour[hour] = { paciente, sesion };
    });

    // Crear mapa de horas ocupadas por tareas (pueden ocupar múltiples horas)
    const tareasByHour: { [key: string]: Tarea } = {};
    const horasOcupadasPorTareas = new Set<string>();
    
    tareasDelDia.forEach(t => {
      if (t.hora) {
        const horaInicio = parseInt(t.hora.split(':')[0]);
        const hourStr = horaInicio.toString().padStart(2, '0');
        
        // La tarea se muestra en su hora de inicio
        tareasByHour[hourStr] = t;
        
        // Si tiene hora_fin, marcar todas las horas intermedias como ocupadas
        if (t.hora_fin) {
          const horaFin = parseInt(t.hora_fin.split(':')[0]);
          
          // Marcar todas las horas desde inicio hasta fin como ocupadas
          for (let h = horaInicio; h <= horaFin; h++) {
            const hStr = h.toString().padStart(2, '0');
            horasOcupadasPorTareas.add(hStr);
          }
        } else {
          // Si no tiene hora_fin, solo ocupa 1 hora
          horasOcupadasPorTareas.add(hourStr);
        }
      }
    });

    // Generar todos los horarios de 6:00 a 24:00
    for (let hour = 6; hour <= 23; hour++) {
      const hourStr = String(hour).padStart(2, '0');
      const timeStr = `${hourStr}:00`;
      const sesionData = sessionsByHour[hourStr] || null;
      const tarea = tareasByHour[hourStr] || null;
      const isOcupado = sesionData !== null || horasOcupadasPorTareas.has(hourStr);
      
      schedule.push({
        hora: timeStr,
        paciente: sesionData?.paciente || null,
        sesion: sesionData?.sesion || null,
        tarea,
        isOcupado
      });
    }

    return schedule;
  };

  // Generar días del mes actual
  const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Domingo, 1 = Lunes, etc.
    
    const days = [];
    
    // Días vacíos al inicio (para alinear correctamente)
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  // Obtener estado del día (libre, disponible, ocupado)
  const getDayStatus = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const sessions = getSessionsByDate(dateStr);
    
    if (sessions.length === 0) return 'free'; // Sin sesiones
    if (sessions.length < 6) return 'available'; // Con sesiones pero hay espacio
    return 'full'; // Día completo (6+ sesiones)
  };

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const handleDayClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    
    // Si el formulario de paciente está abierto, preparar para agregar nueva sesión
    if (showForm) {
      // Actualizar fecha en el estado temporal para nueva sesión
      setNuevaSesion({...nuevaSesion, fecha: dateStr});
      // Abrir modal de sesiones para seleccionar hora
      console.log('Abriendo modal de sesiones para fecha:', dateStr);
      setShowDaySessions(true);
    } else {
      // Si no hay formulario, solo mostrar las sesiones del día
      setShowDaySessions(true);
    }
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que tenga al menos una sesión
    if (!formData.sesiones || formData.sesiones.length === 0) {
      alert('Debes agregar al menos una sesión para el paciente');
      return;
    }
    
    try {
      if (editingPatient) {
        await updatePaciente(editingPatient.id, formData);
      } else {
        await createPaciente(formData);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error al guardar el paciente:', error);
      alert('Error al guardar el paciente. Por favor intenta de nuevo.');
    }
  };

  // Función para agregar una sesión al paciente
  const agregarSesion = () => {
    if (nuevaSesion.fecha && nuevaSesion.hora) {
      const sesionesActuales = formData.sesiones || [];
      const nuevaSesionId = Math.max(...sesionesActuales.map(s => s.id), 0) + 1;
      
      setFormData({
        ...formData,
        sesiones: [
          ...sesionesActuales,
          {
            id: nuevaSesionId,
            fecha: nuevaSesion.fecha,
            hora: nuevaSesion.hora
          }
        ]
      });
      
      // Limpiar campos temporales
      setNuevaSesion({ fecha: '', hora: '' });
      setShowDaySessions(false);
      setShowCalendar(false);
    }
  };

  // Función para eliminar una sesión
  const eliminarSesion = (sesionId: number) => {
    if (confirm('¿Eliminar esta sesión?')) {
      setFormData({
        ...formData,
        sesiones: (formData.sesiones || []).filter(s => s.id !== sesionId)
      });
    }
  };

  // Función resetForm actualizada
  const resetForm = () => {
    setFormData({
      nombre: '',
      edad: 0,
      motivo: '',
      sesiones: [],
      fecha_turno: '',
      hora: '',
      observaciones: '',
      estado: 'activo',
      telefono: '',
      email: ''
    });
    setNuevaSesion({ fecha: '', hora: '' });
    setEditingPatient(null);
    setShowForm(false);
    setShowCalendar(false);
    setShowDaySessions(false);
    setShowList(false);
  };

  const handleEdit = (paciente: Paciente) => {
    setEditingPatient(paciente);
    setFormData(paciente);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
      try {
        await deletePaciente(id);
      } catch (error) {
        console.error('Error al eliminar el paciente:', error);
        alert('Error al eliminar el paciente. Por favor intenta de nuevo.');
      }
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white text-shadow mb-8">Mis Pacientes</h2>
        
        {/* Botones de acción mejorados */}
        <div className="flex items-center justify-center mb-4" style={{ gap: '4rem' }}>
          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCalendar(!showCalendar)}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
              boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4)'
            }}
            className="group relative overflow-hidden rounded-3xl px-12 py-6 text-white hover:shadow-2xl transition-all flex items-center gap-4 font-bold text-lg border-2 border-emerald-400/50"
          >
            <svg className="relative z-10" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="relative z-10">Calendario</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowList(!showList)}
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #6366f1 100%)',
              boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4)'
            }}
            className="group relative overflow-hidden rounded-3xl px-12 py-6 text-white hover:shadow-2xl transition-all flex items-center gap-4 font-bold text-lg border-2 border-purple-400/50"
          >
            <svg className="relative z-10" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
              <path d="M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2"></path>
              <path d="M9 12h6"></path>
              <path d="M9 16h6"></path>
            </svg>
            <span className="relative z-10">Ver Lista</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
              boxShadow: '0 10px 40px rgba(249, 115, 22, 0.4)'
            }}
            className="group relative overflow-hidden rounded-3xl px-12 py-6 text-white hover:shadow-2xl transition-all flex items-center gap-4 font-bold text-lg border-2 border-orange-400/50"
          >
            <div className="relative z-10">
              <AddIcon size={28} />
            </div>
            <span className="relative z-10">Nuevo Paciente</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Modal de Calendario */}
      <AnimatePresence>
        {showCalendar && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
              onClick={() => setShowCalendar(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[151] pointer-events-none modal-responsive"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '42rem'
              }}
            >
              <div 
                className="rounded-[2rem] p-4 sm:p-6 w-full shadow-2xl pointer-events-auto overflow-y-auto border-2 border-white/30 backdrop-blur-xl modal-mobile scroll-mobile"
                style={{ maxHeight: 'calc(100vh - 8rem)', backgroundColor: '#fbd7a5' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white title-mobile">📅 Calendario de Sesiones</h3>
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors btn-mobile"
                  >
                    <CancelIcon size={24} />
                  </button>
                </div>

                {/* Navegación del mes */}
                <div className="flex items-center justify-between mb-4 bg-[#f59532]/80 rounded-2xl p-3 sm:p-4">
                  <button
                    onClick={previousMonth}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors btn-mobile"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <h4 className="text-lg sm:text-xl font-bold text-white title-mobile">
                    {monthNames[currentMonth]} {currentYear}
                  </h4>
                  <button
                    onClick={nextMonth}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors btn-mobile"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Calendario */}
                <div className="mb-4">
                  {/* Nombres de los días */}
                  <div className="grid grid-cols-7 mb-2">
                    {dayNames.map(day => (
                      <div key={day} className="text-center text-white/90 font-bold text-base py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Días del mes - Grid sin gaps para tabla continua */}
                  <div className="grid grid-cols-7 border-2 border-white/20 rounded-lg overflow-hidden">
                    {generateCalendarDays(currentYear, currentMonth).map((day, index) => {
                      if (day === null) {
                        return <div key={`empty-${index}`} className="h-[48px] sm:h-[52px] border border-white/10 bg-white/5" />;
                      }

                      const status = getDayStatus(currentYear, currentMonth, day);
                      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const isSelected = selectedDate === dateStr;
                      const isToday = 
                        day === new Date().getDate() && 
                        currentMonth === new Date().getMonth() && 
                        currentYear === new Date().getFullYear();

                      return (
                        <motion.button
                          key={day}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDayClick(day)}
                          className={`h-[48px] sm:h-[52px] flex flex-col items-center justify-center text-white font-semibold transition-all text-sm sm:text-base border border-white/10 clickable ${
                            isSelected 
                              ? 'ring-2 ring-inset ring-white' 
                              : ''
                          } ${
                            isToday 
                              ? 'ring-2 ring-inset ring-yellow-400' 
                              : ''
                          }`}
                          style={{
                            backgroundColor: 
                              status === 'free' ? 'rgba(148, 163, 184, 0.1)' : 
                              status === 'available' ? 'rgba(34, 197, 94, 0.15)' : 
                              'rgba(239, 68, 68, 0.15)'
                          }}
                        >
                          <span className="font-bold">{day}</span>
                          {status !== 'free' && (
                            <span className="text-[8px] mt-0.5">
                              {status === 'available' ? '●' : '●●●'}
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Leyenda */}
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(148, 163, 184, 0.3)' }} />
                      <span className="text-white/70">Libre</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(34, 197, 94, 0.3)' }} />
                      <span className="text-white/70">Disponible</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.3)' }} />
                      <span className="text-white/70">Completo</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de Sesiones del Día */}
      <AnimatePresence>
        {showDaySessions && selectedDate && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
              onClick={(e) => {
                e.stopPropagation();
                setShowDaySessions(false);
              }}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[201] pointer-events-none modal-responsive"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '48rem'
              }}
            >
              <div 
                className="rounded-[2rem] p-4 sm:p-6 w-full shadow-2xl pointer-events-auto overflow-y-auto modal-mobile scroll-mobile"
                style={{ 
                  maxHeight: 'calc(100vh - 12rem)',
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(22, 163, 74, 0.25) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(34, 197, 94, 0.5)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-2xl font-bold text-white title-mobile">
                    📅 Sesiones del {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <button
                    onClick={() => setShowDaySessions(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors btn-mobile"
                  >
                    <CancelIcon size={24} />
                  </button>
                </div>

                {/* Lista de sesiones del día */}
                <div className="space-y-3">
                  {showForm && editingPatient && (
                    <div className="bg-yellow-500/20 border-2 border-yellow-500/50 rounded-xl p-3 mb-4">
                      <p className="text-yellow-100 text-sm font-medium">
                        🔄 Reprogramando sesión de: <span className="font-bold">{editingPatient.nombre}</span>
                      </p>
                      <p className="text-yellow-100 text-xs mt-1">
                        Sesión actual: {editingPatient.fecha_turno} a las {editingPatient.hora}
                      </p>
                    </div>
                  )}

                  {showForm && !editingPatient && (
                    <div className="bg-blue-500/20 border-2 border-blue-500/50 rounded-xl p-3 mb-4">
                      <p className="text-blue-100 text-sm font-medium">
                        💡 Cada sesión dura aproximadamente 1 hora. Los horarios en rojo están ocupados, los verdes están disponibles.
                      </p>
                    </div>
                  )}

                  <h4 className="text-lg font-semibold text-white/90 mb-3 border-b border-white/20 pb-2">
                    📋 Agenda completa del día (6:00 - 24:00):
                  </h4>

                  <div className="space-y-2">
                    {getFullDaySchedule(selectedDate).map((slot, index) => {
                      const hasPaciente = slot.paciente !== null;
                      const hasTarea = slot.tarea !== null;
                      const isDisponible = !slot.isOcupado;
                      
                      // Calcular duración si hay tarea con hora_fin
                      let duracionHoras = 1;
                      if (hasTarea && slot.tarea!.hora_fin) {
                        const horaInicio = parseInt(slot.tarea!.hora.split(':')[0]);
                        const horaFin = parseInt(slot.tarea!.hora_fin.split(':')[0]);
                        duracionHoras = horaFin - horaInicio + 1;
                      }
                      
                      return (
                        <motion.div
                          key={slot.hora}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.02 }}
                          className={`rounded-xl p-4 transition-all ${
                            hasPaciente
                              ? 'bg-red-500/10 border-2 border-red-500/30'
                              : hasTarea
                              ? 'bg-blue-500/10 border-2 border-blue-500/30'
                              : slot.isOcupado
                              ? 'bg-purple-500/10 border-2 border-purple-500/30 cursor-not-allowed'
                              : showForm 
                              ? 'bg-emerald-500/10 border-2 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400 cursor-pointer' 
                              : 'bg-white/5 border-2 border-white/10'
                          }`}
                          onClick={() => {
                            if (isDisponible && showForm) {
                              // Agregar sesión directamente al array de sesiones
                              const sesionesActuales = formData.sesiones || [];
                              const nuevaSesionId = Math.max(...sesionesActuales.map(s => s.id), 0) + 1;
                              
                              setFormData({
                                ...formData,
                                sesiones: [
                                  ...sesionesActuales,
                                  {
                                    id: nuevaSesionId,
                                    fecha: selectedDate,
                                    hora: slot.hora
                                  }
                                ]
                              });
                              
                              setShowDaySessions(false);
                              setShowCalendar(false);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                                hasPaciente ? 'bg-red-500/30' : hasTarea ? 'bg-blue-500/30' : slot.isOcupado ? 'bg-purple-500/30' : 'bg-emerald-500/30'
                              }`}>
                                {hasPaciente ? '👨‍⚕️' : hasTarea ? '📝' : slot.isOcupado ? '�' : '✓'}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="text-lg font-bold text-white">{slot.hora}</h5>
                                  {hasPaciente ? (
                                    <span className="text-xs bg-red-500/40 text-red-100 px-2 py-1 rounded-full font-medium">
                                      👨‍⚕️ Paciente
                                    </span>
                                  ) : hasTarea ? (
                                    <span className="text-xs bg-blue-500/40 text-blue-100 px-2 py-1 rounded-full font-medium">
                                      📝 Actividad {duracionHoras > 1 ? `(${duracionHoras}h)` : ''}
                                    </span>
                                  ) : slot.isOcupado ? (
                                    <span className="text-xs bg-purple-500/40 text-purple-100 px-2 py-1 rounded-full font-medium">
                                      🔒 Ocupado
                                    </span>
                                  ) : (
                                    <span className="text-xs bg-emerald-500/40 text-emerald-100 px-2 py-1 rounded-full font-medium">
                                      ✅ Disponible
                                    </span>
                                  )}
                                </div>
                                
                                {hasPaciente && (
                                  <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                      <p className="text-white/60 text-xs">Paciente</p>
                                      <p className="text-white font-semibold">{slot.paciente!.nombre}</p>
                                    </div>
                                    <div>
                                      <p className="text-white/60 text-xs">Teléfono</p>
                                      <p className="text-white font-semibold">{slot.paciente!.telefono || 'No registrado'}</p>
                                    </div>
                                  </div>
                                )}
                                
                                {hasTarea && (
                                  <div className="mt-2">
                                    <p className="text-white/60 text-xs">Actividad Personal</p>
                                    <p className="text-white font-semibold">{slot.tarea!.titulo}</p>
                                    <p className="text-white/70 text-sm">{slot.tarea!.descripcion}</p>
                                    {slot.tarea!.hora_fin && (
                                      <p className="text-white/60 text-xs mt-1">
                                        ⏱️ {slot.tarea!.hora} - {slot.tarea!.hora_fin}
                                      </p>
                                    )}
                                  </div>
                                )}
                                
                                {isDisponible && !hasTarea && showForm && (
                                  <p className="text-emerald-200 text-sm mt-1">Click para agendar en este horario</p>
                                )}
                                
                                {slot.isOcupado && !hasTarea && !hasPaciente && (
                                  <p className="text-purple-200 text-sm mt-1">Hora ocupada por actividad de varias horas</p>
                                )}
                              </div>
                            </div>

                            {/* Botones de acción SOLO para PACIENTES */}
                            {hasPaciente && (
                              <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => {
                                    setEditingPatient(slot.paciente!);
                                    setFormData({
                                      ...slot.paciente!,
                                      fecha_turno: '',
                                      hora: ''
                                    });
                                    setShowCalendar(true);
                                  }}
                                  className="px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors text-xs flex items-center gap-1.5 whitespace-nowrap"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                  </svg>
                                  Reprogramar
                                </button>
                                <button
                                  onClick={async () => {
                                    if (confirm(`¿Cancelar sesión de ${slot.paciente!.nombre} el ${selectedDate} a las ${slot.hora}?`)) {
                                      try {
                                        // Encontrar la sesión correspondiente
                                        const sesion = slot.paciente!.sesiones.find(s => 
                                          s.fecha === selectedDate && s.hora === slot.hora
                                        );
                                        if (sesion) {
                                          await deleteSesion(sesion.id);
                                        }
                                      } catch (error) {
                                        console.error('Error al cancelar la sesión:', error);
                                        alert('Error al cancelar la sesión. Por favor intenta de nuevo.');
                                      }
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-xs flex items-center gap-1.5 whitespace-nowrap"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                  Cancelar
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lista de Pacientes (Vista Simplificada) */}
      <AnimatePresence>
        {showList && pacientes.length > 0 && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowList(false)}
            />
            
            {/* Modal de Lista */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[101] pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '56rem'
              }}
            >
              <div 
                className="rounded-[2rem] p-8 w-full shadow-2xl pointer-events-auto overflow-y-auto"
                style={{ 
                  maxHeight: 'calc(100vh - 12rem)',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(147, 51, 234, 0.25) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(168, 85, 247, 0.5)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-white">📋 Lista de Pacientes</h3>
                  <button
                    onClick={() => setShowList(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <CancelIcon size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {pacientes.map((paciente, index) => (
                    <motion.div
                      key={paciente.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Columna 1: Nombre y Estado */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-500/30 rounded-full flex items-center justify-center text-xl">
                              👤
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-white">{paciente.nombre}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                paciente.estado === 'activo' ? 'bg-green-500/20 text-green-300' :
                                paciente.estado === 'seguimiento' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-gray-500/20 text-gray-300'
                              }`}>
                                {paciente.estado}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Columna 2: Teléfono */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent-500/30 rounded-full flex items-center justify-center text-xl">
                            📞
                          </div>
                          <div>
                            <p className="text-xs text-white/60">Teléfono</p>
                            <p className="text-white font-medium">
                              {paciente.telefono || 'No registrado'}
                            </p>
                          </div>
                        </div>

                        {/* Columna 3: Próxima Sesión */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center text-xl">
                            📅
                          </div>
                          <div>
                            <p className="text-xs text-white/60">Próxima Sesión</p>
                            <p className="text-white font-medium">
                              {paciente.fecha_turno && paciente.hora 
                                ? `${paciente.fecha_turno} a las ${paciente.hora}`
                                : 'Sin agendar'
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-2 mt-4 justify-end">
                        <button
                          onClick={() => {
                            setEditingPatient(paciente);
                            setFormData({
                              ...paciente,
                              fecha_turno: '',
                              hora: ''
                            });
                            setShowList(false);
                            setShowCalendar(true);
                          }}
                          className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors text-sm flex items-center gap-2"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          Reprogramar
                        </button>
                        <button
                          onClick={() => {
                            setShowList(false);
                            handleEdit(paciente);
                          }}
                          className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm flex items-center gap-2"
                        >
                          <EditIcon size={14} />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(paciente.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm flex items-center gap-2"
                        >
                          <DeleteIcon size={14} />
                          Eliminar
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal para formulario de pacientes */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={resetForm}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[101] pointer-events-none modal-responsive"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '48rem'
              }}
            >
              <div 
                className="rounded-[2rem] p-4 sm:p-5 w-full shadow-2xl pointer-events-auto overflow-y-auto modal-mobile scroll-mobile modal-content-mobile"
                style={{ 
                  maxHeight: 'calc(100vh - 4rem)',
                  background: 'linear-gradient(135deg, rgba(254, 249, 195, 0.95) 0%, rgba(254, 240, 138, 0.95) 50%, rgba(253, 230, 138, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(254, 240, 138, 0.4)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white title-mobile">
                    {editingPatient ? '✏️ Editar Paciente' : '➕ Nuevo Paciente'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors btn-mobile"
                  >
                    <CancelIcon size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Información Personal */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white/90 border-b border-white/20 pb-2">
                      👤 Información Personal
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="block text-white text-sm font-medium mb-2">
                          Nombre Completo
                        </label>
                        <div className="flex justify-center mb-4">
                          <button
                            type="button"
                            onClick={() => setSection('home')}
                            className="max-w-xs py-4 px-4 text-lg font-bold rounded-full shadow-lg bg-accent-400 text-white hover:bg-accent-500 transition-all flex items-center justify-center gap-3"
                          >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5M12 19l-7-7 7-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            Volver
                          </button>
                        </div>
                        <input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-base placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                          placeholder="Ej: María González"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Edad
                        </label>
                        <input
                          type="number"
                          value={formData.edad}
                          onChange={(e) => setFormData({...formData, edad: parseInt(e.target.value) || 0})}
                          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-base focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                          min="0"
                          max="150"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          📞 Teléfono
                        </label>
                        <input
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-base placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                          placeholder="123-456-7890"
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          ✉️ Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-base placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                          placeholder="paciente@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Información Médica */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-8 border-b border-white/20 pb-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowCalendar(true);
                        }}
                        className="max-w-md mx-auto py-10 min-h-[5rem] text-white rounded-full shadow-lg hover:scale-105 active:scale-95 font-extrabold text-3xl border border-white/30 transition-all duration-200 cursor-pointer touch-manipulation"
                        style={{ backgroundColor: '#f59532', minHeight: '80px', minWidth: '280px' }}
                      >
                        Asignar sesiones al Paciente
                      </button>
                    </div>
                    
                    {/* Lista de sesiones */}
                    {formData.sesiones && formData.sesiones.length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {formData.sesiones.map((sesion) => (
                          <div
                            key={sesion.id}
                            className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center">
                                📅
                              </div>
                              <div>
                                <p className="text-white font-semibold">{sesion.fecha}</p>
                                <p className="text-white/70 text-sm">🕐 {sesion.hora}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => eliminarSesion(sesion.id)}
                              className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                              title="Eliminar sesión"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                <></>
                    )}

                    {/* Estado con botones */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        📊 Estado
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['activo', 'seguimiento', 'inactivo'] as const).map((estado) => (
                          <button
                            key={estado}
                            type="button"
                            onClick={() => setFormData({...formData, estado})}
                            className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                              formData.estado === estado
                                ? estado === 'activo' ? 'bg-green-500/40 text-green-100 ring-2 ring-green-400' :
                                  estado === 'seguimiento' ? 'bg-blue-500/40 text-blue-100 ring-2 ring-blue-400' :
                                  'bg-gray-500/40 text-gray-100 ring-2 ring-gray-400'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            {estado.charAt(0).toUpperCase() + estado.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        📝 Observaciones
                      </label>
                      <textarea
                        value={formData.observaciones}
                        onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-2xl text-white text-base placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all resize-none"
                        placeholder="Notas adicionales sobre el paciente..."
                        rows={3}
                      />
                      <div className="flex justify-center pt-4">
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 px-6 py-3 bg-white/10 text-white rounded-2xl text-base font-medium hover:bg-white/20 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-2xl text-base font-bold hover:from-accent-600 hover:to-accent-700 transition-all shadow-lg"
                    >
                      {editingPatient ? 'Actualizar' : 'Guardar'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lista de pacientes */}
      <div className="grid gap-6">
        {pacientes.length === 0 ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-white/30 text-6xl mb-4">👥</div>
            <div className="text-white/50 text-xl font-medium">No hay pacientes registrados</div>
            <p className="text-white/30 text-sm mt-2">Haz clic en el botón + para agregar una</p>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={() => setSection('home')}
                className="max-w-xs py-4 px-4 text-lg font-bold rounded-full shadow-lg text-white hover:bg-accent-500 transition-all flex items-center justify-center gap-3"
                style={{ backgroundColor: '#f8bb6d' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5M12 19l-7-7 7-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                Volver
              </button>
            </div>
          </motion.div>
        ) : (
          pacientes.map((paciente, index) => (
            <motion.div
              key={paciente.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-strong rounded-2xl p-6 text-white shadow-2xl group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{paciente.nombre}</h3>
                    <span className="bg-secondary-500/30 px-3 py-1 rounded-full text-xs font-medium text-secondary-200">
                      {paciente.edad} años
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      paciente.estado === 'activo' ? 'bg-green-500/20 text-green-300' :
                      paciente.estado === 'seguimiento' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {paciente.estado}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-white/70 mb-2">
                        <strong>Motivo:</strong> {paciente.motivo}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="bg-primary-500/30 px-3 py-1 rounded-lg">
                          📅 {paciente.fecha_turno}
                        </span>
                        <span className="bg-accent-500/30 px-3 py-1 rounded-lg">
                          🕐 {paciente.hora}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {paciente.telefono && (
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <span>📞</span>
                          <span>{paciente.telefono}</span>
                        </div>
                      )}
                      {paciente.email && (
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <span>✉️</span>
                          <span>{paciente.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {paciente.observaciones && (
                    <p className="text-white/60 text-sm bg-white/10 rounded-lg p-3">
                      <strong>Observaciones:</strong> {paciente.observaciones}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2 ml-6">
                  <button
                    onClick={() => handleEdit(paciente)}
                    className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                    title="Editar paciente"
                  >
                    <EditIcon size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(paciente.id)}
                    className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                    title="Eliminar paciente"
                  >
                    <DeleteIcon size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
