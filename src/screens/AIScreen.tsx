import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AIActionCard } from '../components/AIActionCard';
import { colors, radii } from '../theme';

const actions = [
  'Summarize a chat', 'Translate messages', 'Generate smart replies', 'Convert voice to text', 'Detect spam/fraud',
  'Schedule reminders from chats', 'Rewrite message professionally', 'Make message friendly', 'Generate status caption', 'Extract tasks from chat'
];

export function AIScreen() {
  const [q, setQ] = useState(''); const [answer, setAnswer] = useState('');
  return <View style={styles.c}><Text style={styles.t}>AI Assistant</Text><Text style={styles.s}>Your smart messaging companion</Text><FlatList data={actions} keyExtractor={(x) => x} renderItem={({ item, index }) => <AIActionCard title={item} description="Boost messaging productivity" badge={index > 5 ? 'Coming soon' : undefined} onPress={() => setAnswer(`Selected: ${item}`)} />} style={{ marginTop: 10 }} contentContainerStyle={{ paddingBottom: 20 }} /><View style={styles.chat}><TextInput style={styles.i} placeholder="Ask AI" placeholderTextColor={colors.mutedText} value={q} onChangeText={setQ} /><Pressable onPress={() => setAnswer('I can help summarize, translate, or rewrite your messages.')} style={styles.b}><Text style={styles.bt}>Send</Text></Pressable></View>{answer ? <Text style={styles.a}>{answer}</Text> : null}</View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 14 }, t: { color: colors.text, fontSize: 28, fontWeight: '800' }, s: { color: colors.mutedText }, chat: { flexDirection: 'row', gap: 8, marginTop: 10 }, i: { flex: 1, backgroundColor: colors.card, borderRadius: radii.lg, color: colors.text, padding: 12 }, b: { backgroundColor: colors.primary, borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 }, bt: { color: colors.text, fontWeight: '700' }, a: { color: colors.accent, marginTop: 10 } });
