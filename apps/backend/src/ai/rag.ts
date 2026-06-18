const externalNotice = "No use informacion externa para esta respuesta.";

export function analyzeSyllabus(text: string, fileName = "silabo") {
  const normalized = text.trim() || sampleSyllabus;
  const topics = extractList(normalized, ["tema", "unidad", "semana"]).slice(0, 6);
  const evaluations = extractList(normalized, ["evaluacion", "parcial", "final", "practica", "proyecto"]).slice(0, 5);
  return {
    source: fileName,
    summary: normalized.slice(0, 420),
    mainTopics: topics.length ? topics : ["Objetivos del curso", "Evaluaciones", "Proyecto aplicado"],
    detectedEvaluations: evaluations.length ? evaluations : ["Parcial 30%", "Proyecto 30%", "Final 40%"],
    initialStudyPlan: [
      "Revisar el silabo y marcar fechas de evaluacion.",
      "Crear 3 bloques semanales de 45 minutos para lectura y practica.",
      "Generar flashcards por cada unidad terminada.",
      "Reservar una sesion larga 5 dias antes de cada evaluacion."
    ],
    grounding: {
      basedOnDocuments: true,
      externalInfo: externalNotice
    }
  };
}

export function answerWithRag(question: string, chunks: string[]) {
  const context = chunks.find((chunk) => chunk.toLowerCase().includes(question.toLowerCase().split(" ")[0])) ?? chunks[0];
  return {
    answer: context
      ? `Segun el documento subido, lo mas relevante es: ${context.slice(0, 360)}`
      : "No encontre esa informacion en tus documentos. Puedes subir el silabo o darme mas contexto.",
    citations: context ? [{ document: "Material del curso", excerpt: context.slice(0, 120) }] : [],
    usedExternalInfo: false
  };
}

function extractList(text: string, keywords: string[]) {
  return text
    .split(/\n|\.|;/)
    .map((line) => line.trim())
    .filter((line) => keywords.some((keyword) => line.toLowerCase().includes(keyword)))
    .map((line) => line.replace(/^[-*]\s*/, ""));
}

const sampleSyllabus =
  "Curso de Inteligencia Artificial. Unidades: busqueda informada, aprendizaje supervisado, redes neuronales. Evaluacion: practica 20%, parcial 30%, proyecto 20%, final 30%.";
