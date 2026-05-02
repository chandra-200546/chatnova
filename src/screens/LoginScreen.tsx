import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors, radii } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
export function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const next = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) return setError('Enter at least 10 digits');
    setError(''); navigation.navigate('OTP', { phone: digits });
  };
  return <View style={styles.c}><Text style={styles.t}>Welcome to ChatNova</Text><Text style={styles.s}>Enter your phone number to continue</Text><View style={styles.row}><Text style={styles.cc}>+91</Text><TextInput style={styles.i} keyboardType="phone-pad" placeholder="Phone number" placeholderTextColor={colors.mutedText} value={phone} onChangeText={setPhone} /></View>{error ? <Text style={styles.e}>{error}</Text> : null}<Pressable style={styles.b} onPress={next}><Text style={styles.bt}>Continue</Text></Pressable><Text style={styles.f}>By continuing, you agree to Terms and Privacy.</Text></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' }, t: { color: colors.text, fontSize: 30, fontWeight: '800' }, s: { color: colors.mutedText, marginTop: 8 }, row: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: radii.lg, marginTop: 20, alignItems: 'center' }, cc: { color: colors.text, padding: 14 }, i: { flex: 1, color: colors.text, padding: 14, paddingLeft: 0 }, b: { backgroundColor: colors.primary, marginTop: 16, borderRadius: radii.lg, padding: 14, alignItems: 'center' }, bt: { color: colors.text, fontWeight: '700' }, f: { color: colors.mutedText, marginTop: 14, fontSize: 12 }, e: { color: colors.danger, marginTop: 8 } });
