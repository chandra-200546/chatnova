import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { useApp } from '../context/AppContext';
import { colors, radii } from '../theme';

export function CallsScreen() {
  const { calls } = useApp();
  return <View style={styles.c}><Text style={styles.t}>Calls</Text><FlatList data={calls} keyExtractor={(x) => x.id} renderItem={({ item }) => <View style={styles.card}><Avatar name={item.name} /><View style={{ flex: 1 }}><Text style={styles.n}>{item.name}</Text><Text style={[styles.m, item.direction === 'missed' && { color: colors.danger }]}>{item.direction} • {item.time}</Text></View><Ionicons name={item.type === 'video' ? 'videocam' : 'call'} color={colors.accent} size={20} /></View>} contentContainerStyle={{ paddingBottom: 120 }} /><Pressable style={styles.fab}><Ionicons name="call" size={22} color={colors.text} /></Pressable></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 14 }, t: { color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: 10 }, card: { backgroundColor: colors.card, borderRadius: radii.lg, padding: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12 }, n: { color: colors.text, fontWeight: '700' }, m: { color: colors.mutedText }, fab: { position: 'absolute', right: 20, bottom: 90, backgroundColor: colors.primary, width: 54, height: 54, borderRadius: radii.full, alignItems: 'center', justifyContent: 'center' } });
