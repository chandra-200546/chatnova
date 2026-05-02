import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Chat } from '../types';
import { Avatar } from './Avatar';
import { colors, radii } from '../theme';

export function ChatCard({ item, onPress }: { item: Chat; onPress: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Avatar name={item.name} isOnline={item.isOnline} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.msg}>{item.lastMessage}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unreadCount > 0 ? <Text style={styles.badge}>{item.unreadCount}</Text> : null}
        {item.isPinned ? <Ionicons name="pin" size={14} color={colors.accent} /> : null}
        {item.isMuted ? <Ionicons name="volume-mute" size={14} color={colors.mutedText} /> : null}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, padding: 12, borderRadius: radii.lg, marginBottom: 10 },
  content: { flex: 1 }, name: { color: colors.text, fontWeight: '700' }, msg: { color: colors.mutedText, marginTop: 3 },
  meta: { alignItems: 'flex-end', gap: 4 }, time: { color: colors.mutedText, fontSize: 12 },
  badge: { backgroundColor: colors.primary, color: colors.text, paddingHorizontal: 7, paddingVertical: 2, borderRadius: radii.full, fontSize: 11, overflow: 'hidden' },
});
