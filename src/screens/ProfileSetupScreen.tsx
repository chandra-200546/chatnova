import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Avatar } from '../components/Avatar';
import { colors, radii } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileSetup'>;
export function ProfileSetupScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const { completeProfile } = useApp();
  const go = async () => {
    if (!name.trim()) return;
    await completeProfile(name.trim(), bio.trim() || 'Hey there! I am on ChatNova.');
    navigation.replace('Main');
  };
  return <View style={styles.c}><Text style={styles.t}>Set up your profile</Text><View style={{ marginVertical: 18 }}><Avatar name={name || 'Chat Nova'} size={84} /></View><TextInput style={styles.i} placeholder="Name" placeholderTextColor={colors.mutedText} value={name} onChangeText={setName} /><TextInput style={styles.i} placeholder="Bio / Status" placeholderTextColor={colors.mutedText} value={bio} onChangeText={setBio} /><Pressable style={styles.b} onPress={go}><Text style={styles.bt}>Continue</Text></Pressable></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center', alignItems: 'center' }, t: { color: colors.text, fontSize: 28, fontWeight: '800' }, i: { width: '100%', color: colors.text, backgroundColor: colors.card, borderRadius: radii.lg, padding: 14, marginBottom: 12 }, b: { width: '100%', backgroundColor: colors.primary, padding: 14, borderRadius: radii.lg, alignItems: 'center' }, bt: { color: colors.text, fontWeight: '700' } });
