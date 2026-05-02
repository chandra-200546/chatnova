import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ChatCard } from '../components/ChatCard';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors, radii } from '../theme';

const folders = ['All', 'Unread', 'Personal', 'Work', 'Family', 'Business', 'AI'] as const;
export function ChatsScreen({ navigation }: any) {
  const { chats } = useApp(); const [search, setSearch] = useState(''); const [folder, setFolder] = useState<(typeof folders)[number]>('All');
  const filtered = useMemo(() => chats.filter((c) => (folder === 'All' || c.folder === folder || (folder === 'Unread' && c.unreadCount > 0)) && c.name.toLowerCase().includes(search.toLowerCase())), [chats, search, folder]);
  return <View style={styles.c}><View style={styles.h}><Text style={styles.t}>ChatNova</Text><View style={styles.hr}><Ionicons name="search" size={20} color={colors.text} /><Ionicons name="camera" size={20} color={colors.text} /><Pressable onPress={() => navigation.navigate('Settings')}><Ionicons name="ellipsis-vertical" size={20} color={colors.text} /></Pressable></View></View><TextInput style={styles.s} placeholder="Search chats" placeholderTextColor={colors.mutedText} value={search} onChangeText={setSearch} /><ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>{folders.map((f) => <Pressable key={f} onPress={() => setFolder(f)} style={[styles.chip, folder === f && styles.chipA]}><Text style={[styles.chipT, folder === f && { color: colors.text }]}>{f}</Text></Pressable>)}</ScrollView><FlatList data={filtered} keyExtractor={(x) => x.id} renderItem={({ item }) => <ChatCard item={item} onPress={() => navigation.navigate('Chat', { chatId: item.id, name: item.name })} />} contentContainerStyle={{ paddingBottom: 120 }} /><Pressable style={styles.fab} onPress={() => navigation.navigate('NewChat')}><Ionicons name="chatbubbles" size={22} color={colors.text} /></Pressable></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 14 }, h: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, t: { color: colors.text, fontSize: 28, fontWeight: '800' }, hr: { flexDirection: 'row', gap: 14 }, s: { backgroundColor: colors.card, color: colors.text, borderRadius: radii.lg, padding: 12, marginBottom: 10 }, chip: { backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radii.full, marginRight: 8 }, chipA: { backgroundColor: colors.primary }, chipT: { color: colors.mutedText, fontSize: 12 }, fab: { position: 'absolute', right: 20, bottom: 90, backgroundColor: colors.primary, width: 54, height: 54, borderRadius: radii.full, alignItems: 'center', justifyContent: 'center' } });
