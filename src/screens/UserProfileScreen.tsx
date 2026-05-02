import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { useApp } from '../context/AppContext';
import { colors, radii } from '../theme';

export function UserProfileScreen() {
  const { currentUser } = useApp();
  return <ScrollView style={styles.c}><View style={styles.h}><Avatar name={currentUser?.name || 'Me'} size={84} /><Text style={styles.n}>{currentUser?.name}</Text><Text style={styles.m}>{currentUser?.phone}</Text><Text style={styles.m}>{currentUser?.bio}</Text></View><View style={styles.card}><Text style={styles.n}>Media, Links, Docs</Text><Text style={styles.m}>24 items</Text></View><View style={styles.card}><Text style={styles.m}>Mute notifications</Text></View><View style={[styles.card, { backgroundColor: '#3C1A1A' }]}><Text style={styles.d}>Block user</Text></View><View style={[styles.card, { backgroundColor: '#3C1A1A' }]}><Text style={styles.d}>Report user</Text></View></ScrollView>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 14 }, h: { alignItems: 'center', backgroundColor: colors.card, borderRadius: radii.lg, padding: 16, marginBottom: 10 }, n: { color: colors.text, fontWeight: '800', fontSize: 20, marginTop: 10 }, m: { color: colors.mutedText, marginTop: 4 }, card: { backgroundColor: colors.card, borderRadius: radii.lg, padding: 14, marginBottom: 8 }, d: { color: colors.danger, fontWeight: '700' } });
