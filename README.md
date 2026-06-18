# FocusU MVP

FocusU es un MVP móvil multiplataforma para estudiantes universitarios. Centraliza cursos, calendario, documentos, asistente de estudio con IA, cálculo de notas, sesiones de enfoque y bienestar.

## Stack elegida

- Mobile: Expo + React Native + TypeScript.
- Backend: Node.js + Express + SQLite.
- IA: arquitectura RAG inicial con modo mock y adaptador OpenAI opcional.
- Persistencia: SQLite local para MVP, con entidades listas para migrar a PostgreSQL.

## Ejecutar localmente

1. Instala dependencias:

```bash
npm install
```

2. Copia variables del backend:

```bash
cp apps/backend/.env.example apps/backend/.env
```

3. Levanta el backend:

```bash
npm run dev:backend
```

4. En otra terminal, levanta Expo:

```bash
npm run dev:mobile
```

5. Abre la app con Expo Go o un simulador iOS/Android.

Por defecto la app usa `http://localhost:4000`. En un dispositivo físico, cambia `EXPO_PUBLIC_API_URL` por la IP local de tu máquina.

## Flujos MVP incluidos

- Login/registro mock con backend.
- Cursos activos con sílabos y materiales.
- Análisis de sílabo por IA mock o OpenAI.
- Dashboard con calendario, estadísticas, recomendación diaria y accesos rápidos.
- Calendario diario/semanal con clases y bloques de estudio.
- Calculadora de notas por curso, promedio ponderado y nota necesaria en final.
- Focus Timer asociado a curso con simulación de bloqueo de distracciones.
- Wellness con estado emocional y recomendaciones personalizadas.

## Documentación

- [Arquitectura](docs/architecture.md)
- [Modelo de datos](docs/database-model.md)
- [UX/UI y navegación](docs/ux-ui.md)

