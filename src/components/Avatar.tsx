import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme';

export function Avatar({ name, size = 48, isOnline }: { name: string; size?: number; isOnline?: boolean }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.txt}>{initials}</Text>
      {isOnline ? <View style={styles.dot} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  txt: { color: colors.text, fontWeight: '700' },
  dot: { position: 'absolute', bottom: 1, right: 1, width: 11, height: 11, borderRadius: radii.full, backgroundColor: colors.secondary, borderWidth: 2, borderColor: colors.background },
});
