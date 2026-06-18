import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { PressableScale } from "../components/PressableScale";
import { SectionTitle } from "../components/SectionTitle";
import { colors } from "../theme/colors";
import type { Course } from "../types/domain";

export function FocusScreen({ courses }: { courses: Course[] }) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [courseId, setCourseId] = useState(courses[0].id);
  const selected = courses.find((course) => course.id === courseId) ?? courses[0];

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [running]);

  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");

  return (
    <View>
      <Card style={styles.timer}>
        <Text style={styles.course}>{selected.name}</Text>
        <Text style={styles.clock}>{minutes}:{rest}</Text>
        <Text style={styles.blocking}>Bloqueo de redes: simulacion activa para MVP</Text>
        <View style={styles.controls}>
          <PressableScale style={styles.primary} onPress={() => setRunning(!running)}>
            <Ionicons name={running ? "pause-outline" : "play-outline"} size={22} color={colors.paper} />
            <Text style={styles.primaryText}>{running ? "Pausar" : "Iniciar"}</Text>
          </PressableScale>
          <PressableScale style={styles.secondary} onPress={() => { setRunning(false); setSeconds(25 * 60); }}>
            <Ionicons name="stop-outline" size={22} color={colors.navy} />
          </PressableScale>
        </View>
      </Card>
      <SectionTitle title="Asociar a curso" />
      {courses.map((course) => (
        <PressableScale key={course.id} onPress={() => setCourseId(course.id)} style={[styles.courseRow, courseId === course.id && { borderColor: course.color }]}>
          <View style={[styles.dot, { backgroundColor: course.color }]} />
          <Text style={styles.courseRowText}>{course.name}</Text>
        </PressableScale>
      ))}
      <SectionTitle title="Historial" />
      <Card>
        <Text style={styles.history}>Hoy · 45 min reales · Estadistica Aplicada</Text>
        <Text style={styles.history}>Ayer · 90 min reales · Inteligencia Artificial</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  timer: { backgroundColor: colors.green, alignItems: "center" },
  course: { color: colors.greenSoft, fontWeight: "800" },
  clock: { color: colors.paper, fontSize: 58, fontWeight: "900", marginVertical: 14, letterSpacing: 0 },
  blocking: { color: colors.greenSoft, textAlign: "center" },
  controls: { flexDirection: "row", gap: 10, marginTop: 18 },
  primary: { minHeight: 52, minWidth: 150, borderRadius: 8, backgroundColor: colors.navy, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  primaryText: { color: colors.paper, fontWeight: "900" },
  secondary: { width: 54, minHeight: 52, borderRadius: 8, backgroundColor: colors.paper, alignItems: "center", justifyContent: "center" },
  courseRow: { minHeight: 52, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, marginBottom: 8, padding: 12, flexDirection: "row", alignItems: "center" },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  courseRowText: { color: colors.ink, fontWeight: "800" },
  history: { color: colors.inkMuted, marginBottom: 8 }
});
