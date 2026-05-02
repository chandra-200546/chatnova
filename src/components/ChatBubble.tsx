import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Message } from '../types';
import { colors, radii } from '../theme';

export function ChatBubble({ message, isMe }: { message: Message; isMe: boolean }) {
  const bubbleColor = isMe ? '#2B3570' : colors.card;
  return (
    <View style={[styles.row, { justifyContent: isMe ? 'flex-end' : 'flex-start' }]}>
      <View style={[styles.bubble, { backgroundColor: bubbleColor }]}> 
        <Text style={styles.text}>{message.type === 'deleted' ? 'This message was deleted' : message.text}</Text>
        <Text style={styles.time}>{message.time} {isMe ? '??' : ''}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { marginVertical: 4 },
  bubble: { maxWidth: '82%', padding: 10, borderRadius: radii.md },
  text: { color: colors.text },
  time: { color: colors.mutedText, fontSize: 11, marginTop: 3, alignSelf: 'flex-end' },
});
