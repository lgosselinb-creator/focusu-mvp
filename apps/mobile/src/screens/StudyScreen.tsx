import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { PressableScale } from "../components/PressableScale";
import { SectionTitle } from "../components/SectionTitle";
import { colors } from "../theme/colors";
import type { Course } from "../types/domain";

export function StudyScreen({ courses }: { courses: Course[] }) {
  const [selected, setSelected] = useState(courses[0].id);
  const course = courses.find((item) => item.id === selected) ?? courses[0];
  const [question, setQuestion] = useState("Que debo estudiar primero?");
  return (
    <View>
      <SectionTitle title="Carpetas de curso" />
      <View style={styles.folderRow}>
        {courses.map((item) => (
          <PressableScale key={item.id} onPress={() => setSelected(item.id)} style={[styles.folder, selected === item.id && { backgroundColor: item.color }]}>
            <Ionicons name="folder-outline" size={22} color={selected === item.id ? colors.paper : item.color} />
            <Text style={[styles.folderText, selected === item.id && styles.folderActive]}>{item.code}</Text>
          </PressableScale>
        ))}
      </View>
      <Card>
        <Text style={styles.courseName}>{course.name}</Text>
        <Text style={styles.copy}>{course.summary}</Text>
        <View style={styles.upload}>
          <Ionicons name="cloud-upload-outline" size={22} color={colors.green} />
          <Text style={styles.uploadText}>Subir silabo PDF/Word</Text>
        </View>
      </Card>
      <SectionTitle title="Analisis IA del silabo" />
      <Card>
        <Text style={styles.label}>Resumen</Text>
        <Text style={styles.copy}>El curso se organiza por unidades, practica semanal y evaluaciones progresivas. La IA prioriza los documentos subidos.</Text>
        <Text style={styles.label}>Temas principales</Text>
        <Text style={styles.copy}>Busqueda · Modelos supervisados · Proyecto · Evaluacion final</Text>
        <Text style={styles.label}>Plan inicial</Text>
        <Text style={styles.copy}>3 bloques de 45 min por semana, flashcards por unidad y repaso 5 dias antes del final.</Text>
      </Card>
      <SectionTitle title="Chat RAG" />
      <Card>
        <TextInput style={styles.input} value={question} onChangeText={setQuestion} />
        <Text style={styles.answer}>Segun el silabo subido, empieza por los temas con evaluacion cercana. No use informacion externa.</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  folderRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  folder: { flex: 1, minHeight: 72, borderRadius: 8, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, padding: 10, justifyContent: "space-between" },
  folderText: { color: colors.ink, fontWeight: "900" },
  folderActive: { color: colors.paper },
  courseName: { color: colors.ink, fontSize: 18, fontWeight: "900" },
  copy: { color: colors.inkMuted, lineHeight: 20, marginTop: 8 },
  upload: { marginTop: 14, minHeight: 46, borderRadius: 8, borderWidth: 1, borderColor: colors.line, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  uploadText: { color: colors.green, fontWeight: "800" },
  label: { color: colors.navy, fontWeight: "900", marginTop: 8 },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: 12, color: colors.ink },
  answer: { color: colors.ink, backgroundColor: colors.greenSoft, padding: 12, borderRadius: 8, marginTop: 12, lineHeight: 20 }
});
