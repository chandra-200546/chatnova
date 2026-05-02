import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors, radii } from '../theme';

export function NewChatScreen({ navigation }: any) {
  const { contacts } = useApp();
  return <View style={styles.c}><Text style={styles.t}>New Chat</Text><TextInput style={styles.i} placeholder="Search contacts" placeholderTextColor={colors.mutedText} /><View style={styles.actions}><Text style={styles.a}>New Group</Text><Text style={styles.a}>New Broadcast</Text><Text style={styles.a}>Invite Friend</Text></View><FlatList data={contacts} keyExtractor={(x) => x.id} renderItem={({ item }) => <Pressable style={styles.row} onPress={() => navigation.navigate('Chat', { chatId: 'c1', name: item.name })}><Avatar name={item.name} isOnline={item.isOnline} /><View><Text style={styles.n}>{item.name}</Text><Text style={styles.m}>{item.bio}</Text></View></Pressable>} /></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 14 }, t: { color: colors.text, fontSize: 26, fontWeight: '800' }, i: { backgroundColor: colors.card, color: colors.text, borderRadius: radii.lg, padding: 12, marginVertical: 10 }, actions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }, a: { color: colors.accent, fontSize: 12 }, row: { flexDirection: 'row', gap: 12, padding: 10, backgroundColor: colors.card, borderRadius: radii.lg, marginBottom: 8 }, n: { color: colors.text, fontWeight: '700' }, m: { color: colors.mutedText } });
