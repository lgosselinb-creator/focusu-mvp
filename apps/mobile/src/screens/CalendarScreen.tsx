import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { PressableScale } from "../components/PressableScale";
import { SectionTitle } from "../components/SectionTitle";
import { mockEvents } from "../data/mock";
import { colors } from "../theme/colors";
import type { Course } from "../types/domain";

export function CalendarScreen({ courses }: { courses: Course[] }) {
  const [view, setView] = useState<"day" | "week">("day");
  return (
    <View>
      <View style={styles.segment}>
        {(["day", "week"] as const).map((item) => (
          <PressableScale key={item} onPress={() => setView(item)} style={[styles.segmentItem, view === item && styles.segmentActive]}>
            <Text style={[styles.segmentText, view === item && styles.segmentTextActive]}>{item === "day" ? "Dia" : "Semana"}</Text>
          </PressableScale>
        ))}
      </View>
      <SectionTitle title={view === "day" ? "Jueves 18 de junio" : "Semana academica"} action="+ Bloque" />
      {mockEvents.map((event) => {
        const course = courses.find((item) => item.id === event.courseId);
        return (
          <Card key={event.id} style={styles.event}>
            <View style={[styles.rail, { backgroundColor: course?.color ?? colors.navy }]} />
            <View style={styles.body}>
              <Text style={styles.time}>{event.startsAt} - {event.endsAt}</Text>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.meta}>{course?.name ?? "Personal"} · {event.type === "class" ? "repeticion semanal" : "bloque editable"}</Text>
            </View>
          </Card>
        );
      })}
      <Card style={styles.creator}>
        <Text style={styles.title}>Crear horario de clase</Text>
        <Text style={styles.meta}>Curso, dia, hora, repeticion semanal, editar y eliminar quedan modelados para backend.</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  segment: { flexDirection: "row", backgroundColor: colors.surface, borderRadius: 8, borderWidth: 1, borderColor: colors.line, padding: 4, marginBottom: 12 },
  segmentItem: { flex: 1, minHeight: 42, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  segmentActive: { backgroundColor: colors.navy },
  segmentText: { color: colors.inkMuted, fontWeight: "800" },
  segmentTextActive: { color: colors.paper },
  event: { flexDirection: "row", padding: 0, overflow: "hidden" },
  rail: { width: 8 },
  body: { flex: 1, padding: 14 },
  time: { color: colors.green, fontWeight: "900" },
  title: { color: colors.ink, fontSize: 17, fontWeight: "900", marginTop: 4 },
  meta: { color: colors.inkMuted, marginTop: 4, lineHeight: 19 },
  creator: { backgroundColor: colors.blueSoft }
});
