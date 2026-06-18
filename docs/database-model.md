# Modelo de Base de Datos

## Entidades

- `users`: cuenta, email, nombre, hash de contraseña.
- `academic_profiles`: carrera, ciclo, progreso, créditos totales.
- `curriculum_courses`: malla curricular, créditos, estado aprobado/faltante.
- `courses`: cursos activos, color, docente, créditos, carpeta.
- `documents`: archivos subidos, tipo, tamaño, estado de análisis.
- `document_chunks`: índice semántico/lexical por documento.
- `ai_conversations`: conversaciones por curso.
- `ai_messages`: mensajes, rol, citas y costos estimados.
- `calendar_events`: clases, estudio, exámenes y eventos personales.
- `grade_items`: evaluaciones, peso, nota y fecha.
- `focus_sessions`: sesiones, duración planeada, duración real, curso.
- `wellness_logs`: estado emocional, estrés, energía, recomendaciones.
- `study_stats`: agregados diarios por usuario y curso.

## Fórmulas

Promedio por curso:

```text
suma(nota * peso) / suma(pesos registrados)
```

Promedio ponderado general:

```text
suma(promedio_del_curso * creditos) / suma(creditos)
```

Nota necesaria en final:

```text
(meta - promedio_actual_sin_final * peso_acumulado) / peso_final
```

