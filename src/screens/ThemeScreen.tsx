import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme';

const accents = ['#4F46E5', '#06B6D4', '#22C55E', '#F59E0B'];
export function ThemeScreen() {
  const [accent, setAccent] = useState(accents[0]);
  return <View style={styles.c}><Text style={styles.t}>Theme</Text><View style={styles.r}><Text style={styles.n}>Dark Mode</Text><Text style={styles.m}>Enabled</Text></View><View style={styles.r}><Text style={styles.n}>Light Mode</Text><Text style={styles.m}>Coming soon</Text></View><View style={styles.r}><Text style={styles.n}>System Default</Text><Text style={styles.m}>Off</Text></View><Text style={[styles.n, { marginVertical: 8 }]}>Accent Color</Text><View style={{ flexDirection: 'row', gap: 10 }}>{accents.map((a) => <Pressable key={a} onPress={() => setAccent(a)} style={[styles.sw, { backgroundColor: a, borderWidth: accent === a ? 2 : 0, borderColor: colors.text }]} />)}</View><View style={[styles.r, { marginTop: 12 }]}><Text style={styles.n}>Chat Wallpaper</Text><Text style={styles.m}>Aurora (mock)</Text></View></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 14 }, t: { color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: 8 }, r: { backgroundColor: colors.card, borderRadius: radii.lg, padding: 14, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' }, n: { color: colors.text, fontWeight: '700' }, m: { color: colors.mutedText }, sw: { width: 34, height: 34, borderRadius: radii.full } });
