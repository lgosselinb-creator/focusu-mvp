import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PressableScale } from "../components/PressableScale";
import { colors } from "../theme/colors";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.hero}>
        <Text style={styles.logo}>FocusU</Text>
        <Text style={styles.value}>Organiza tu vida academica con IA</Text>
      </View>
      <View style={styles.panel}>
        <TextInput style={styles.input} placeholder="Correo universitario" autoCapitalize="none" defaultValue="demo@focusu.app" />
        <TextInput style={styles.input} placeholder="Contrasena" secureTextEntry defaultValue="focusu" />
        <PressableScale style={styles.primary} onPress={onLogin}>
          <Ionicons name="log-in-outline" size={20} color={colors.paper} />
          <Text style={styles.primaryText}>{mode === "login" ? "Iniciar sesion" : "Crear cuenta"}</Text>
        </PressableScale>
        <View style={styles.actions}>
          <Text style={styles.link} onPress={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? "Registro" : "Ya tengo cuenta"}
          </Text>
          <Text style={styles.link}>Recuperar contrasena</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper, justifyContent: "center", padding: 22 },
  hero: { marginBottom: 34 },
  logo: { fontSize: 46, fontWeight: "900", color: colors.navy, letterSpacing: 0 },
  value: { fontSize: 19, color: colors.inkMuted, marginTop: 8 },
  panel: { backgroundColor: colors.surface, borderRadius: 8, padding: 16, borderWidth: 1, borderColor: colors.line },
  input: { minHeight: 52, borderWidth: 1, borderColor: colors.line, borderRadius: 8, paddingHorizontal: 14, marginBottom: 12, color: colors.ink },
  primary: { minHeight: 52, borderRadius: 8, backgroundColor: colors.navy, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  primaryText: { color: colors.paper, fontWeight: "800", fontSize: 16 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  link: { color: colors.green, fontWeight: "700" }
});
