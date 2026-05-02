import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({ wrap: { padding: 26, alignItems: 'center' }, title: { color: colors.text, fontWeight: '700', fontSize: 17 }, desc: { color: colors.mutedText, textAlign: 'center', marginTop: 8 } });
