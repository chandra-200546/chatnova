import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider, useApp } from '../context/AppContext';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { ProfileSetupScreen } from '../screens/ProfileSetupScreen';
import { MainTabs } from './Tabs';
import { ChatScreen } from '../screens/ChatScreen';
import { NewChatScreen } from '../screens/NewChatScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { GroupInfoScreen } from '../screens/GroupInfoScreen';
import { PrivacyScreen } from '../screens/PrivacyScreen';
import { ThemeScreen } from '../screens/ThemeScreen';
import { colors } from '../theme';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: { phone: string };
  ProfileSetup: undefined;
  Main: undefined;
  Chat: { chatId: string; name: string };
  NewChat: undefined;
  Settings: undefined;
  UserProfile: undefined;
  GroupInfo: undefined;
  Privacy: undefined;
  Theme: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigator() {
  const { isAuthenticated } = useApp();
  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, text: colors.text, border: colors.border, primary: colors.primary },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OtpScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="NewChat" component={NewChatScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="Theme" component={ThemeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function RootNavigator() {
  return (
    <AppProvider>
      <Navigator />
    </AppProvider>
  );
}
