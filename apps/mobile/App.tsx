import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LoginScreen } from "./src/screens/LoginScreen";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { CoursesScreen } from "./src/screens/CoursesScreen";
import { StudyScreen } from "./src/screens/StudyScreen";
import { CalendarScreen } from "./src/screens/CalendarScreen";
import { GradesScreen } from "./src/screens/GradesScreen";
import { FocusScreen } from "./src/screens/FocusScreen";
import { WellnessScreen } from "./src/screens/WellnessScreen";
import { PressableScale } from "./src/components/PressableScale";
import { colors } from "./src/theme/colors";
import { mockCourses } from "./src/data/mock";

const tabs = [
  { key: "home", label: "Inicio", icon: "grid-outline" },
  { key: "profile", label: "Perfil", icon: "school-outline" },
  { key: "study", label: "IA", icon: "sparkles-outline" },
  { key: "calendar", label: "Agenda", icon: "calendar-outline" },
  { key: "grades", label: "Notas", icon: "stats-chart-outline" },
  { key: "focus", label: "Focus", icon: "timer-outline" },
  { key: "wellness", label: "Bienestar", icon: "heart-outline" }
] as const;

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["key"]>("home");
  const [courses] = useState(mockCourses);

  const screen = useMemo(() => {
    const props = { courses };
    switch (activeTab) {
      case "profile":
        return <CoursesScreen {...props} />;
      case "study":
        return <StudyScreen {...props} />;
      case "calendar":
        return <CalendarScreen {...props} />;
      case "grades":
        return <GradesScreen {...props} />;
      case "focus":
        return <FocusScreen {...props} />;
      case "wellness":
        return <WellnessScreen {...props} />;
      default:
        return <DashboardScreen {...props} onNavigate={setActiveTab} />;
    }
  }, [activeTab, courses]);

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.shell}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>FocusU</Text>
            <Text style={styles.subtitle}>Organiza tu vida academica con IA</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>LG</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {screen}
        </ScrollView>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <PressableScale key={tab.key} onPress={() => setActiveTab(tab.key)} style={[styles.tab, activeTab === tab.key && styles.tabActive]}>
              <Ionicons name={tab.icon} size={20} color={activeTab === tab.key ? colors.paper : colors.inkMuted} />
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
            </PressableScale>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  shell: { flex: 1, paddingHorizontal: 18, paddingTop: 8 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 },
  brand: { color: colors.navy, fontSize: 28, fontWeight: "800", letterSpacing: 0 },
  subtitle: { color: colors.inkMuted, marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.green, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.paper, fontWeight: "800" },
  content: { paddingBottom: 98 },
  tabBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: colors.paper,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 24,
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tab: { width: 48, minHeight: 54, alignItems: "center", justifyContent: "center", borderRadius: 18 },
  tabActive: { backgroundColor: colors.navy },
  tabLabel: { fontSize: 10, color: colors.inkMuted, marginTop: 2 },
  tabLabelActive: { color: colors.paper, fontWeight: "700" }
});
