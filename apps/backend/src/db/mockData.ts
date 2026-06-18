import type { CalendarEvent, Course, GradeItem } from "../types/domain.js";

export const demoUser = {
  id: "user_demo",
  name: "Lissette",
  email: "demo@focusu.app",
  career: "Ingenieria de Software",
  cycle: "6",
  totalCredits: 220,
  approvedCredits: 126
};

export const courses: Course[] = [
  {
    id: "course_ai",
    userId: demoUser.id,
    name: "Inteligencia Artificial",
    code: "CS-302",
    credits: 4,
    professor: "Dra. Ramos",
    color: "#12355B",
    folderName: "IA",
    summary: "Busqueda, aprendizaje supervisado, redes neuronales y proyecto aplicado."
  },
  {
    id: "course_stats",
    userId: demoUser.id,
    name: "Estadistica Aplicada",
    code: "MA-221",
    credits: 3,
    professor: "Mg. Salazar",
    color: "#1D5C4A",
    folderName: "Estadistica",
    summary: "Inferencia, regresion, pruebas de hipotesis y visualizacion de datos."
  },
  {
    id: "course_hci",
    userId: demoUser.id,
    name: "Interaccion Humano Computador",
    code: "UX-210",
    credits: 3,
    professor: "Arq. Vega",
    color: "#8A6A4F",
    folderName: "HCI",
    summary: "Investigacion de usuarios, prototipado, heuristicas y evaluacion UX."
  }
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "ev_ai_class",
    userId: demoUser.id,
    courseId: "course_ai",
    title: "Clase IA",
    type: "class",
    startsAt: "2026-06-18T09:00:00-05:00",
    endsAt: "2026-06-18T10:30:00-05:00",
    recurrence: "weekly"
  },
  {
    id: "ev_stats_study",
    userId: demoUser.id,
    courseId: "course_stats",
    title: "Bloque estudio Estadistica",
    type: "study",
    startsAt: "2026-06-18T15:00:00-05:00",
    endsAt: "2026-06-18T16:00:00-05:00",
    recurrence: "none"
  },
  {
    id: "ev_hci_review",
    userId: demoUser.id,
    courseId: "course_hci",
    title: "Revision de prototipo",
    type: "study",
    startsAt: "2026-06-18T18:00:00-05:00",
    endsAt: "2026-06-18T18:45:00-05:00",
    recurrence: "none"
  }
];

export const gradeItems: GradeItem[] = [
  { id: "g_ai_pc1", courseId: "course_ai", name: "Practica 1", weight: 20, score: 15 },
  { id: "g_ai_mid", courseId: "course_ai", name: "Parcial", weight: 30, score: 14 },
  { id: "g_ai_project", courseId: "course_ai", name: "Proyecto", weight: 20, score: 17 },
  { id: "g_ai_final", courseId: "course_ai", name: "Final", weight: 30, isFinal: true },
  { id: "g_st_lab", courseId: "course_stats", name: "Laboratorios", weight: 40, score: 16 },
  { id: "g_st_mid", courseId: "course_stats", name: "Parcial", weight: 25, score: 13 },
  { id: "g_st_final", courseId: "course_stats", name: "Final", weight: 35, isFinal: true },
  { id: "g_hci_research", courseId: "course_hci", name: "Investigacion", weight: 25, score: 18 },
  { id: "g_hci_proto", courseId: "course_hci", name: "Prototipo", weight: 35, score: 16 },
  { id: "g_hci_final", courseId: "course_hci", name: "Entrega final", weight: 40, isFinal: true }
];

