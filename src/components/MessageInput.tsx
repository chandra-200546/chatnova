import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors, radii } from '../theme';

export function MessageInput({ text, setText, onSend }: { text: string; setText: (v: string) => void; onSend: () => void }) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="happy-outline" size={20} color={colors.mutedText} />
      <TextInput style={styles.input} placeholder="Type message" placeholderTextColor={colors.mutedText} value={text} onChangeText={setText} />
      <Ionicons name="attach" size={20} color={colors.mutedText} />
      <Ionicons name="camera" size={20} color={colors.mutedText} />
      <Pressable onPress={onSend}><Ionicons name={text.trim() ? 'send' : 'mic'} size={21} color={colors.accent} /></Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: radii.full, paddingHorizontal: 12, paddingVertical: 10, gap: 10 },
  input: { flex: 1, color: colors.text },
});
