import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme';

export function PrivacyScreen() {
  return <View style={styles.c}>{['Last seen', 'Profile photo', 'About', 'Status', 'Read receipts', 'Blocked contacts', 'App lock'].map((i) => <View key={i} style={styles.r}><Text style={styles.n}>{i}</Text><Text style={styles.m}>Everyone</Text></View>)}</View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 14 }, r: { backgroundColor: colors.card, borderRadius: radii.lg, padding: 14, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' }, n: { color: colors.text, fontWeight: '700' }, m: { color: colors.mutedText } });
