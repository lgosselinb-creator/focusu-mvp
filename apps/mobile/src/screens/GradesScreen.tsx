import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { mockGrades } from "../data/mock";
import { colors } from "../theme/colors";
import type { Course } from "../types/domain";
import { courseAverage, neededFinal, weightedAverage } from "../utils/grades";

export function GradesScreen({ courses }: { courses: Course[] }) {
  const weighted = weightedAverage(courses, mockGrades);
  return (
    <View>
      <Card style={styles.summary}>
        <Text style={styles.summaryLabel}>Promedio ponderado general</Text>
        <Text style={styles.summaryValue}>{weighted.toFixed(2)}</Text>
        <Text style={styles.summaryLabel}>Formula: suma promedio x creditos / total de creditos</Text>
      </Card>
      <SectionTitle title="Cursos y evaluaciones" />
      {courses.map((course) => {
        const items = mockGrades.filter((item) => item.courseId === course.id);
        const average = courseAverage(items);
        const need11 = neededFinal(items, 11);
        return (
          <Card key={course.id}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.avg}>{average.toFixed(1)}</Text>
            </View>
            {items.map((item) => (
              <View key={item.id} style={styles.gradeRow}>
                <Text style={styles.gradeName}>{item.name}</Text>
                <Text style={styles.gradeMeta}>{item.weight}% · {item.score ?? "pendiente"}</Text>
              </View>
            ))}
            <View style={styles.projection}>
              <Text style={styles.projectionText}>Necesitas {need11?.toFixed(1) ?? "-"} en final para aprobar con 11.</Text>
            </View>
          </Card>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { backgroundColor: colors.navy },
  summaryLabel: { color: "#DCE8F5" },
  summaryValue: { color: colors.paper, fontSize: 42, fontWeight: "900", marginVertical: 6 },
  courseHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  courseName: { color: colors.ink, fontSize: 17, fontWeight: "900", flex: 1 },
  avg: { color: colors.green, fontSize: 22, fontWeight: "900" },
  gradeRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 7, borderTopWidth: 1, borderTopColor: colors.line },
  gradeName: { color: colors.ink, fontWeight: "700" },
  gradeMeta: { color: colors.inkMuted },
  projection: { backgroundColor: colors.paper, borderRadius: 8, padding: 10, marginTop: 10 },
  projectionText: { color: colors.brown, fontWeight: "800" }
});
