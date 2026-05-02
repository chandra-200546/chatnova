import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { colors, radii } from '../theme';

export function GroupInfoScreen() {
  return <ScrollView style={styles.c}><View style={styles.h}><Avatar name="College Group" size={84} /><Text style={styles.n}>College Group</Text><Text style={styles.m}>Projects, updates, events</Text></View><View style={styles.card}><Text style={styles.n}>Members</Text><Text style={styles.m}>Aarav, Mia, Rohit, +53</Text></View><View style={styles.card}><Text style={styles.n}>Admin tools</Text><Text style={styles.m}>Add member • Group permissions • Polls</Text></View><View style={[styles.card, { backgroundColor: '#3C1A1A' }]}><Text style={styles.d}>Leave group</Text></View></ScrollView>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 14 }, h: { alignItems: 'center', backgroundColor: colors.card, borderRadius: radii.lg, padding: 16, marginBottom: 10 }, n: { color: colors.text, fontWeight: '700' }, m: { color: colors.mutedText, marginTop: 4 }, card: { backgroundColor: colors.card, borderRadius: radii.lg, padding: 14, marginBottom: 8 }, d: { color: colors.danger, fontWeight: '700' } });
