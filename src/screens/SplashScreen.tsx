import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export function SplashScreen({ navigation }: Props) {
  const { restoreSession } = useApp();
  useEffect(() => {
    restoreSession().then((ok) => setTimeout(() => navigation.replace(ok ? 'Main' : 'Login'), 2000));
  }, []);
  return (
    <LinearGradient colors={['#0B1024', '#0F172A']} style={styles.container}>
      <Text style={styles.logo}>ChatNova</Text><Text style={styles.tag}>Secure. Smart. Connected.</Text><ActivityIndicator color={colors.accent} style={{ marginTop: 16 }} />
    </LinearGradient>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center' }, logo: { color: colors.text, fontSize: 38, fontWeight: '800' }, tag: { color: colors.mutedText, marginTop: 8 } });
