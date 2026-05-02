import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors, radii } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>;
export function OtpScreen({ navigation, route }: Props) {
  const [otp, setOtp] = useState('');
  const [err, setErr] = useState('');
  const { loginWithPhone } = useApp();
  const verify = () => {
    if (!/^\d{6}$/.test(otp)) return setErr('Enter any 6-digit OTP');
    loginWithPhone(route.params.phone);
    navigation.replace('ProfileSetup');
  };
  return <View style={styles.c}><Text style={styles.t}>Verify OTP</Text><Text style={styles.s}>Code sent to +91 {route.params.phone}</Text><TextInput value={otp} onChangeText={setOtp} keyboardType="number-pad" maxLength={6} style={styles.i} placeholder="000000" placeholderTextColor={colors.mutedText} />{err ? <Text style={styles.e}>{err}</Text> : null}<Pressable style={styles.b} onPress={verify}><Text style={styles.bt}>Verify</Text></Pressable><Pressable onPress={() => navigation.goBack()}><Text style={styles.link}>Back</Text></Pressable><Text style={styles.s}>Resend in 00:24</Text></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' }, t: { color: colors.text, fontSize: 28, fontWeight: '800' }, s: { color: colors.mutedText, marginTop: 8 }, i: { color: colors.text, letterSpacing: 12, backgroundColor: colors.card, borderRadius: radii.lg, padding: 14, marginTop: 18, textAlign: 'center', fontSize: 24 }, b: { backgroundColor: colors.primary, marginTop: 16, borderRadius: radii.lg, padding: 14, alignItems: 'center' }, bt: { color: colors.text, fontWeight: '700' }, link: { color: colors.accent, marginTop: 14 }, e: { color: colors.danger, marginTop: 8 } });
