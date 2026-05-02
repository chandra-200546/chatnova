import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors, radii } from '../theme';

export function GroupsScreen({ navigation }: any) {
  const { groups } = useApp(); const [showPoll] = useState(true);
  return <View style={styles.c}><Text style={styles.t}>Groups</Text>{showPoll ? <View style={styles.poll}><Text style={styles.pt}>Group Poll: Friday meetup?</Text><Text style={styles.ps}>Yes 62% | No 38%</Text></View> : null}<FlatList data={groups} keyExtractor={(x) => x.id} renderItem={({ item }) => <Pressable style={styles.card} onPress={() => navigation.navigate('Chat', { chatId: 'c8', name: item.name })}><Avatar name={item.name} /><View style={{ flex: 1 }}><Text style={styles.n}>{item.name}</Text><Text style={styles.m}>{item.lastMessage}</Text><Text style={styles.m}>{item.memberCount} members • {item.lastActive}</Text></View>{item.isAdmin ? <Text style={styles.a}>Admin</Text> : null}{item.unreadCount > 0 ? <Text style={styles.b}>{item.unreadCount}</Text> : null}</Pressable>} contentContainerStyle={{ paddingBottom: 120 }} /><Pressable style={styles.fab}><Ionicons name="people" size={24} color={colors.text} /></Pressable></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 14 }, t: { color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: 10 }, poll: { backgroundColor: '#1E1B4B', borderRadius: radii.lg, padding: 12, marginBottom: 10 }, pt: { color: colors.text, fontWeight: '700' }, ps: { color: colors.mutedText, marginTop: 4 }, card: { flexDirection: 'row', gap: 12, backgroundColor: colors.card, padding: 12, borderRadius: radii.lg, marginBottom: 10, alignItems: 'center' }, n: { color: colors.text, fontWeight: '700' }, m: { color: colors.mutedText, marginTop: 2 }, a: { color: colors.accent, fontSize: 12 }, b: { backgroundColor: colors.primary, color: colors.text, borderRadius: radii.full, paddingHorizontal: 7, paddingVertical: 2, overflow: 'hidden' }, fab: { position: 'absolute', right: 20, bottom: 90, backgroundColor: colors.primary, width: 54, height: 54, borderRadius: radii.full, alignItems: 'center', justifyContent: 'center' } });
