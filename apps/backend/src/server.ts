import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { analyzeSyllabus, answerWithRag } from "./ai/rag.js";
import { calendarEvents, courses, demoUser, gradeItems } from "./db/mockData.js";
import { courseAverage, neededFinalScore, weightedAverage } from "./services/grades.js";

dotenv.config();

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: Number(process.env.MAX_UPLOAD_MB ?? 12) * 1024 * 1024 }
});

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => res.json({ ok: true, app: "FocusU API" }));

app.post("/auth/login", (req, res) => {
  const { email } = req.body;
  res.json({ token: "focusu-demo-token", user: { ...demoUser, email: email ?? demoUser.email } });
});

app.post("/auth/register", (req, res) => {
  res.status(201).json({ token: "focusu-demo-token", user: { ...demoUser, ...req.body } });
});

app.get("/me/academic-profile", (_req, res) => {
  res.json({
    user: demoUser,
    progress: Math.round((demoUser.approvedCredits / demoUser.totalCredits) * 100),
    approvedCourses: ["Programacion II", "Base de Datos", "Calculo II"],
    pendingCourses: ["Arquitectura Cloud", "Tesis I", "Seguridad de Software"],
    activeCourses: courses
  });
});

app.get("/courses", (_req, res) => res.json(courses));

app.post("/courses", (req, res) => {
  const created = {
    id: `course_${Date.now()}`,
    userId: demoUser.id,
    folderName: req.body.name,
    color: "#12355B",
    ...req.body
  };
  courses.push(created);
  res.status(201).json(created);
});

app.post("/courses/:courseId/documents/analyze", upload.single("file"), (req, res) => {
  const text = req.body.text ?? req.file?.buffer.toString("utf8") ?? "";
  res.json(analyzeSyllabus(text, req.file?.originalname ?? "texto pegado"));
});

app.post("/ai/chat", (req, res) => {
  const { question, chunks = [] } = req.body;
  res.json(answerWithRag(question ?? "", chunks.length ? chunks : courses.map((course) => course.summary ?? "")));
});

app.get("/calendar/events", (_req, res) => res.json(calendarEvents));

app.post("/calendar/events", (req, res) => {
  const event = { id: `ev_${Date.now()}`, userId: demoUser.id, recurrence: "none", ...req.body };
  calendarEvents.push(event);
  res.status(201).json(event);
});

app.get("/grades", (_req, res) => {
  const byCourse = courses.map((course) => {
    const items = gradeItems.filter((item) => item.courseId === course.id);
    return {
      course,
      items,
      average: Number(courseAverage(items).toFixed(2)),
      neededFor11: neededFinalScore(items, 11),
      neededFor16: neededFinalScore(items, 16)
    };
  });
  res.json({
    byCourse,
    weightedAverage: Number(weightedAverage(courses, gradeItems).toFixed(2))
  });
});

app.post("/grades/:courseId/items", (req, res) => {
  const item = { id: `g_${Date.now()}`, courseId: req.params.courseId, ...req.body };
  gradeItems.push(item);
  res.status(201).json(item);
});

const focusSessions: unknown[] = [];

app.post("/focus/sessions", (req, res) => {
  const session = { id: `fs_${Date.now()}`, userId: demoUser.id, createdAt: new Date().toISOString(), ...req.body };
  focusSessions.push(session);
  res.status(201).json(session);
});

app.get("/focus/sessions", (_req, res) => res.json(focusSessions));

app.post("/wellness/recommendation", (req, res) => {
  const { mood = "neutral", stress = 3, studyMinutes = 90 } = req.body;
  res.json({
    mood,
    stress,
    recommendations: [
      stress >= 4 ? "Haz una respiracion 4-7-8 antes del siguiente bloque." : "Mantener bloques cortos hoy es suficiente.",
      studyMinutes > 120 ? "Programa una pausa activa de 8 minutos." : "Cierra con una sesion ligera de repaso.",
      "Prioriza una tarea academica critica y una tarea pequena para conservar energia."
    ]
  });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`FocusU API running on http://localhost:${port}`);
});
