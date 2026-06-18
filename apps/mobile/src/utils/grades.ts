import type { Course, GradeItem } from "../types/domain";

export function courseAverage(items: GradeItem[]) {
  const completed = items.filter((item) => typeof item.score === "number");
  const weight = completed.reduce((sum, item) => sum + item.weight, 0);
  if (!weight) return 0;
  return completed.reduce((sum, item) => sum + (item.score ?? 0) * item.weight, 0) / weight;
}

export function weightedAverage(courses: Course[], grades: GradeItem[]) {
  const credits = courses.reduce((sum, course) => sum + course.credits, 0);
  return courses.reduce((sum, course) => {
    const avg = courseAverage(grades.filter((grade) => grade.courseId === course.id));
    return sum + avg * course.credits;
  }, 0) / credits;
}

export function neededFinal(items: GradeItem[], target: number) {
  const final = items.find((item) => item.isFinal);
  if (!final) return null;
  const accumulated = items
    .filter((item) => !item.isFinal && typeof item.score === "number")
    .reduce((sum, item) => sum + (item.score ?? 0) * (item.weight / 100), 0);
  return Math.max(0, Math.min(20, (target - accumulated) / (final.weight / 100)));
}
