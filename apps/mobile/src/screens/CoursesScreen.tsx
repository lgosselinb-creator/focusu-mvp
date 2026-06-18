import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { colors } from "../theme/colors";
import type { Course } from "../types/domain";

export function CoursesScreen({ courses }: { courses: Course[] }) {
  return (
    <View>
      <Card style={styles.profile}>
        <Text style={styles.name}>Lissette Gosselin</Text>
        <Text style={styles.meta}>Ingenieria de Software · Ciclo 6</Text>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.meta}>126 de 220 creditos aprobados · 57%</Text>
      </Card>
      <SectionTitle title="Cursos activos" action={`${courses.length}/7`} />
      {courses.map((course) => (
        <Card key={course.id}>
          <View style={styles.courseTop}>
            <View style={[styles.swatch, { backgroundColor: course.color }]} />
            <View style={styles.courseCopy}>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.meta}>{course.code} · {course.credits} creditos · {course.professor}</Text>
            </View>
          </View>
          <Text style={styles.summary}>{course.summary}</Text>
          <View style={styles.folder}>
            <Text style={styles.folderText}>Carpeta: silabo, PDFs, Word, apuntes y pesos de evaluacion</Text>
          </View>
        </Card>
      ))}
      <SectionTitle title="Malla curricular" />
      <Card>
        <Text style={styles.meta}>Aprobados: Programacion II, Base de Datos, Calculo II</Text>
        <Text style={styles.meta}>Faltantes: Arquitectura Cloud, Seguridad, Tesis I</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: { backgroundColor: colors.green },
  name: { color: colors.paper, fontSize: 22, fontWeight: "900" },
  meta: { color: colors.inkMuted, marginTop: 4 },
  progressTrack: { height: 10, borderRadius: 5, backgroundColor: "#CFE2D9", marginVertical: 14 },
  progressFill: { height: 10, width: "57%", borderRadius: 5, backgroundColor: colors.tan },
  courseTop: { flexDirection: "row", alignItems: "center" },
  swatch: { width: 42, height: 42, borderRadius: 8, marginRight: 12 },
  courseCopy: { flex: 1 },
  courseName: { color: colors.ink, fontSize: 17, fontWeight: "900" },
  summary: { color: colors.ink, marginTop: 12, lineHeight: 20 },
  folder: { backgroundColor: colors.paper, borderRadius: 8, padding: 10, marginTop: 12 },
  folderText: { color: colors.brown, fontWeight: "700" }
});
