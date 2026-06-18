import type { CalendarEvent, Course, GradeItem } from "../types/domain";

export const mockCourses: Course[] = [
  { id: "course_ai", name: "Inteligencia Artificial", code: "CS-302", credits: 4, professor: "Dra. Ramos", color: "#12355B", summary: "Busqueda, ML, redes neuronales y proyecto aplicado." },
  { id: "course_stats", name: "Estadistica Aplicada", code: "MA-221", credits: 3, professor: "Mg. Salazar", color: "#1D5C4A", summary: "Inferencia, regresion, pruebas de hipotesis y visualizacion." },
  { id: "course_hci", name: "Interaccion Humano Computador", code: "UX-210", credits: 3, professor: "Arq. Vega", color: "#8A6A4F", summary: "Investigacion, prototipado, heuristicas y evaluacion UX." }
];

export const mockEvents: CalendarEvent[] = [
  { id: "ev1", courseId: "course_ai", title: "Clase IA", type: "class", startsAt: "09:00", endsAt: "10:30" },
  { id: "ev2", courseId: "course_stats", title: "Estudio Estadistica", type: "study", startsAt: "15:00", endsAt: "16:00" },
  { id: "ev3", courseId: "course_hci", title: "Revision prototipo", type: "study", startsAt: "18:00", endsAt: "18:45" }
];

export const mockGrades: GradeItem[] = [
  { id: "g1", courseId: "course_ai", name: "Practica 1", weight: 20, score: 15 },
  { id: "g2", courseId: "course_ai", name: "Parcial", weight: 30, score: 14 },
  { id: "g3", courseId: "course_ai", name: "Proyecto", weight: 20, score: 17 },
  { id: "g4", courseId: "course_ai", name: "Final", weight: 30, isFinal: true },
  { id: "g5", courseId: "course_stats", name: "Labs", weight: 40, score: 16 },
  { id: "g6", courseId: "course_stats", name: "Parcial", weight: 25, score: 13 },
  { id: "g7", courseId: "course_stats", name: "Final", weight: 35, isFinal: true },
  { id: "g8", courseId: "course_hci", name: "Investigacion", weight: 25, score: 18 },
  { id: "g9", courseId: "course_hci", name: "Prototipo", weight: 35, score: 16 },
  { id: "g10", courseId: "course_hci", name: "Entrega final", weight: 40, isFinal: true }
];
