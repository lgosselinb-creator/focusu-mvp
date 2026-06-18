import type { Course, GradeItem } from "../types/domain.js";

export function courseAverage(items: GradeItem[]) {
  const completed = items.filter((item) => typeof item.score === "number");
  const weight = completed.reduce((sum, item) => sum + item.weight, 0);
  if (weight === 0) return 0;
  return completed.reduce((sum, item) => sum + (item.score ?? 0) * item.weight, 0) / weight;
}

export function weightedAverage(courses: Course[], grades: GradeItem[]) {
  const rows = courses.map((course) => ({
    course,
    average: courseAverage(grades.filter((item) => item.courseId === course.id))
  }));
  const credits = rows.reduce((sum, row) => sum + row.course.credits, 0);
  if (credits === 0) return 0;
  return rows.reduce((sum, row) => sum + row.average * row.course.credits, 0) / credits;
}

export function neededFinalScore(items: GradeItem[], target = 11) {
  const final = items.find((item) => item.isFinal);
  if (!final || final.weight <= 0) return null;
  const nonFinal = items.filter((item) => !item.isFinal && typeof item.score === "number");
  const accumulated = nonFinal.reduce((sum, item) => sum + (item.score ?? 0) * (item.weight / 100), 0);
  const needed = (target - accumulated) / (final.weight / 100);
  return Math.max(0, Math.min(20, Number(needed.toFixed(2))));
}
