import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme';

export function AIActionCard({ title, description, badge, onPress }: { title: string; description: string; badge?: string; onPress: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
      {badge ? <Text style={styles.badge}>{badge}</Text> : null}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: '#1D2650', borderWidth: 1, borderColor: '#334155', padding: 14, borderRadius: radii.lg, marginBottom: 10 },
  title: { color: colors.text, fontWeight: '700' },
  desc: { color: colors.mutedText, marginTop: 4 },
  badge: { marginTop: 8, color: '#A5B4FC', fontSize: 12 },
});
