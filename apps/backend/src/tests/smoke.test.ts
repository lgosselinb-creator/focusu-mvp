import assert from "node:assert/strict";
import { courses, gradeItems } from "../db/mockData.js";
import { courseAverage, neededFinalScore, weightedAverage } from "../services/grades.js";

const aiGrades = gradeItems.filter((item) => item.courseId === "course_ai");

assert.equal(Number(courseAverage(aiGrades).toFixed(2)), 15.14);
assert.equal(neededFinalScore(aiGrades, 11), 1.33);
assert.equal(Number(weightedAverage(courses, gradeItems).toFixed(2)), 15.56);

console.log("FocusU smoke tests passed");
