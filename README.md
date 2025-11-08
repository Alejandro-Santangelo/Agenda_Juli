# Agenda Juli 📅

Una aplicación web moderna para gestión de agenda médica con pacientes y citas, desarrollada con React, TypeScript y Supabase.

## 🚀 Características

- **📋 Gestión de Pacientes**: Registro completo con información personal y múltiples sesiones
- **📅 Agenda Interactiva**: Vista de calendario con programación de citas y tareas
- **🎯 Estados de Tareas**: Seguimiento de pendientes y completadas con prioridades
- **💾 Persistencia en la Nube**: Datos almacenados en Supabase con sincronización en tiempo real
- **📱 Responsive Design**: Interfaz optimizada para dispositivos móviles y desktop
- **🎨 UI Moderna**: Diseño elegante con Tailwind CSS y animaciones fluidas

## 🛠️ Tecnologías

- **Frontend**: React 19.2.0 + TypeScript
- **Build Tool**: Vite 7.2.2
- **Styling**: Tailwind CSS v4.1.17
- **Animaciones**: Framer Motion
- **Base de Datos**: Supabase
- **Despliegue**: Vercel

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Alejandro-Santangelo/Agenda_Juli.git
cd Agenda_Juli
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env.local` con tus credenciales de Supabase:
```
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

4. Ejecuta el proyecto:
```bash
npm run dev
```

## 🗄️ Base de Datos

El proyecto utiliza tres tablas principales en Supabase:

### Pacientes
- Información personal completa
- Estados de seguimiento (activo, seguimiento, inactivo)
- Datos de contacto opcionales

### Sesiones
- Múltiples sesiones por paciente
- Fechas y horarios específicos
- Estados de programación

### Tareas
- Tareas de agenda con descripción
- Prioridades (alta, media, baja)
- Estados (pendiente, completada)
- Horarios con duración opcional

## 🚀 Despliegue

Para desplegar en Vercel:

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en Vercel
3. El despliegue se realiza automáticamente

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👤 Autor

**Alejandro Santangelo**
- GitHub: [@Alejandro-Santangelo](https://github.com/Alejandro-Santangelo)

---

Desarrollado con ❤️ para facilitar la gestión de agendas médicas