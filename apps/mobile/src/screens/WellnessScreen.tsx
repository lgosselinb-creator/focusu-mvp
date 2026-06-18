import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { PressableScale } from "../components/PressableScale";
import { SectionTitle } from "../components/SectionTitle";
import { colors } from "../theme/colors";
import type { Course } from "../types/domain";

const moods = ["calma", "neutral", "estres", "cansancio"];

export function WellnessScreen({ courses }: { courses: Course[] }) {
  const [mood, setMood] = useState("neutral");
  return (
    <View>
      <Card style={styles.hero}>
        <Text style={styles.title}>Carga academica actual</Text>
        <Text style={styles.copy}>{courses.length} cursos activos. Recomendacion: una pausa breve antes del siguiente bloque exigente.</Text>
      </Card>
      <SectionTitle title="Estado emocional" />
      <View style={styles.moods}>
        {moods.map((item) => (
          <PressableScale key={item} onPress={() => setMood(item)} style={[styles.mood, mood === item && styles.moodActive]}>
            <Text style={[styles.moodText, mood === item && styles.moodTextActive]}>{item}</Text>
          </PressableScale>
        ))}
      </View>
      <SectionTitle title="Respiracion 4-7-8" />
      <Card>
        <Text style={styles.breathe}>Inhala 4 · Sosten 7 · Exhala 8</Text>
        <Text style={styles.copy}>Haz 3 rondas antes de estudiar o despues de una clase intensa.</Text>
      </Card>
      <SectionTitle title="Recomendaciones IA" />
      <Card>
        <Text style={styles.reco}>Reduce el bloque de la tarde a 45 minutos y cierra con flashcards. Si el estres sube, cambia una tarea de produccion por una de repaso.</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.brown },
  title: { color: colors.paper, fontSize: 20, fontWeight: "900" },
  copy: { color: colors.inkMuted, lineHeight: 20, marginTop: 8 },
  moods: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 12 },
  mood: { width: "48%", minHeight: 52, borderRadius: 8, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, alignItems: "center", justifyContent: "center" },
  moodActive: { backgroundColor: colors.navy },
  moodText: { color: colors.ink, fontWeight: "800" },
  moodTextActive: { color: colors.paper },
  breathe: { color: colors.green, fontSize: 24, fontWeight: "900" },
  reco: { color: colors.ink, lineHeight: 21, fontWeight: "600" }
});
