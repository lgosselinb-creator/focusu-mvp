# Arquitectura FocusU

## Módulos

- `apps/mobile`: app Expo con pantallas, navegación, componentes reutilizables, cliente API y datos mock.
- `apps/backend`: API REST, SQLite, servicios de IA/RAG, carga de documentos y lógica académica.
- `docs`: decisiones de arquitectura, modelo de datos y UX/UI.

## Backend

La API está separada por rutas:

- `auth`: registro, login y sesión mock.
- `courses`: cursos activos, materiales, análisis de sílabos.
- `calendar`: clases recurrentes y bloques de estudio.
- `grades`: evaluaciones, promedios y proyecciones.
- `focus`: sesiones de estudio y tiempo real estudiado.
- `wellness`: estado emocional y recomendaciones.
- `ai`: chat RAG por curso.

El MVP usa SQLite para bajar fricción local. La frontera de persistencia está encapsulada en `db`, por lo que se puede migrar a PostgreSQL/Supabase/Firebase sin rediseñar las pantallas.

## RAG inicial

1. El usuario sube un PDF/Word o texto de sílabo.
2. El backend extrae texto, crea chunks y los guarda como `document_chunks`.
3. En modo mock, usa búsqueda lexical simple para recuperar contexto.
4. En modo OpenAI, el adaptador queda preparado para generar respuestas con contexto y citar fuente.
5. La respuesta separa `basado_en_documentos` de `informacion_externa` cuando aplique.

## Seguridad y privacidad

- Documentos asociados al `user_id`.
- Límite de tamaño por archivo configurado.
- Separación de metadata de archivo y chunks.
- Cost control: modo mock, límite de tokens, resumen previo y cache de análisis.
- Preparado para almacenamiento externo con URLs firmadas.

## Limitaciones MVP

- El bloqueo de redes sociales es una simulación funcional en JS. La arquitectura deja preparado `nativeBlockingProvider` para Android Accessibility/Usage Stats y iOS Family Controls.
- El parser PDF/Word está representado con carga de texto/base64 para MVP. En producción se recomienda procesamiento asincrónico con cola y workers.

