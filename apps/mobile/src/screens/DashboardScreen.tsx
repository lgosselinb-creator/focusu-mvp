import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { PressableScale } from "../components/PressableScale";
import { SectionTitle } from "../components/SectionTitle";
import { mockEvents, mockGrades } from "../data/mock";
import { colors } from "../theme/colors";
import type { Course } from "../types/domain";
import { weightedAverage } from "../utils/grades";

type TabKey = "home" | "profile" | "study" | "calendar" | "grades" | "focus" | "wellness";

export function DashboardScreen({ courses, onNavigate }: { courses: Course[]; onNavigate: (tab: TabKey) => void }) {
  const average = weightedAverage(courses, mockGrades);
  return (
    <View>
      <Card style={styles.hero}>
        <Text style={styles.heroTitle}>Hoy tienes 3 bloques academicos</Text>
        <Text style={styles.heroBody}>Prioriza IA por la manana y deja Estadistica para un bloque corto de practica.</Text>
      </Card>
      <View style={styles.stats}>
        <Metric label="Promedio" value={average.toFixed(1)} />
        <Metric label="Creditos" value="10" />
        <Metric label="Focus" value="2h 15m" />
      </View>
      <SectionTitle title="Calendario del dia" action="Semana" />
      {mockEvents.map((event) => (
        <Card key={event.id} style={styles.event}>
          <View style={styles.time}>
            <Text style={styles.timeText}>{event.startsAt}</Text>
            <Text style={styles.timeEnd}>{event.endsAt}</Text>
          </View>
          <View style={styles.eventMain}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventType}>{event.type === "class" ? "Clase" : "Bloque de estudio"}</Text>
          </View>
        </Card>
      ))}
      <SectionTitle title="Accesos rapidos" />
      <View style={styles.quickGrid}>
        {[
          ["study", "sparkles-outline", "Asistente"],
          ["focus", "timer-outline", "Focus Timer"],
          ["grades", "stats-chart-outline", "Notas"],
          ["wellness", "heart-outline", "Bienestar"]
        ].map(([key, icon, label]) => (
          <PressableScale key={key} style={styles.quick} onPress={() => onNavigate(key as TabKey)}>
            <Ionicons name={icon as never} size={24} color={colors.navy} />
            <Text style={styles.quickText}>{label}</Text>
          </PressableScale>
        ))}
      </View>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.navy },
  heroTitle: { color: colors.paper, fontSize: 23, fontWeight: "900", letterSpacing: 0 },
  heroBody: { color: "#DCE8F5", marginTop: 8, lineHeight: 20 },
  stats: { flexDirection: "row", gap: 10 },
  metric: { flex: 1, minHeight: 82, justifyContent: "center" },
  metricValue: { color: colors.green, fontSize: 23, fontWeight: "900" },
  metricLabel: { color: colors.inkMuted, marginTop: 3 },
  event: { flexDirection: "row", alignItems: "center" },
  time: { width: 66 },
  timeText: { color: colors.navy, fontWeight: "900" },
  timeEnd: { color: colors.inkMuted, fontSize: 12 },
  eventMain: { flex: 1, borderLeftWidth: 4, borderLeftColor: colors.green, paddingLeft: 12 },
  eventTitle: { color: colors.ink, fontWeight: "800" },
  eventType: { color: colors.inkMuted, marginTop: 3 },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  quick: { width: "48%", backgroundColor: colors.surface, borderRadius: 8, borderWidth: 1, borderColor: colors.line, padding: 16, minHeight: 88, justifyContent: "space-between" },
  quickText: { color: colors.ink, fontWeight: "800" }
});
