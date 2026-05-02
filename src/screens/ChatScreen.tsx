import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { ChatBubble } from '../components/ChatBubble';
import { MessageInput } from '../components/MessageInput';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors, radii } from '../theme';

export function ChatScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'Chat'>) {
  const { messagesByChat, sendMessage } = useApp();
  const [text, setText] = useState('');
  const items = useMemo(() => messagesByChat[route.params.chatId] || [], [messagesByChat, route.params.chatId]);
  return <View style={styles.c}><View style={styles.h}><Pressable onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={22} color={colors.text} /></Pressable><Avatar name={route.params.name} size={34} isOnline /><View style={{ flex: 1 }}><Text style={styles.n}>{route.params.name}</Text><Text style={styles.st}>online • typing...</Text></View><Ionicons name="sparkles" size={19} color={colors.accent} /><Ionicons name="call" size={19} color={colors.text} /><Ionicons name="videocam" size={19} color={colors.text} /><Pressable onPress={() => navigation.navigate('UserProfile')}><Ionicons name="ellipsis-vertical" size={19} color={colors.text} /></Pressable></View><View style={styles.pin}><Text style={{ color: colors.warning }}>Pinned: Sprint checklist and tasks</Text></View><FlatList data={items} keyExtractor={(x) => x.id} renderItem={({ item }) => <><ChatBubble message={item} isMe={item.senderId === 'me'} />{item.type === 'translated' ? <Text style={styles.tr}>Translate</Text> : null}</>} ListHeaderComponent={<Text style={styles.date}>Today</Text>} contentContainerStyle={{ paddingBottom: 8 }} /><View style={styles.sr}><Text style={styles.srt}>Okay bro</Text><Text style={styles.srt}>I'll check</Text><Text style={styles.srt}>Send details</Text><Text style={styles.srt}>Call me</Text></View><MessageInput text={text} setText={setText} onSend={() => { if (!text.trim()) return; sendMessage(route.params.chatId, text.trim()); setText(''); }} /><Pressable style={styles.ai}><Ionicons name="sparkles" size={20} color={colors.text} /></Pressable></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 12 }, h: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 8 }, n: { color: colors.text, fontWeight: '700' }, st: { color: colors.mutedText, fontSize: 12 }, pin: { backgroundColor: '#3A2E0B', padding: 8, borderRadius: radii.md, marginBottom: 8 }, date: { color: colors.mutedText, textAlign: 'center', marginBottom: 8 }, tr: { color: colors.accent, fontSize: 12, marginLeft: 6 }, sr: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 }, srt: { backgroundColor: colors.card, color: colors.text, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radii.full, fontSize: 12 }, ai: { position: 'absolute', right: 20, bottom: 88, backgroundColor: colors.primary, width: 42, height: 42, borderRadius: radii.full, alignItems: 'center', justifyContent: 'center' } });
