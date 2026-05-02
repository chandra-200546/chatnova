import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ChatsScreen } from '../screens/ChatsScreen';
import { GroupsScreen } from '../screens/GroupsScreen';
import { StatusScreen } from '../screens/StatusScreen';
import { CallsScreen } from '../screens/CallsScreen';
import { AIScreen } from '../screens/AIScreen';
import { colors, radii } from '../theme';

const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 16,
          borderRadius: radii.xl,
          height: 64,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarIcon: ({ color, size }) => {
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            Chats: 'chatbubble-ellipses',
            Groups: 'people',
            Status: 'radio',
            Calls: 'call',
            AI: 'sparkles',
          };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Calls" component={CallsScreen} />
      <Tab.Screen name="AI" component={AIScreen} />
    </Tab.Navigator>
  );
}
