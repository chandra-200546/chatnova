import { Navigate, Route, Routes } from 'react-router-dom';
import MainTabs from './MainTabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import GroupsScreen from '../screens/GroupsScreen';
import StatusScreen from '../screens/StatusScreen';
import CallsScreen from '../screens/CallsScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NewChatScreen from '../screens/NewChatScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import ThemeScreen from '../screens/ThemeScreen';

export default function AppNavigator() {
  return <div className="app-shell"><Routes><Route path="/" element={<><HomeScreen /><MainTabs /></>} /><Route path="/groups" element={<><GroupsScreen /><MainTabs /></>} /><Route path="/status" element={<><StatusScreen /><MainTabs /></>} /><Route path="/calls" element={<><CallsScreen /><MainTabs /></>} /><Route path="/ai" element={<><AIAssistantScreen /><MainTabs /></>} /><Route path="/chat/:chatId" element={<ChatScreen />} /><Route path="/settings" element={<SettingsScreen />} /><Route path="/new-chat" element={<NewChatScreen />} /><Route path="/user-profile" element={<UserProfileScreen />} /><Route path="/group-info" element={<GroupInfoScreen />} /><Route path="/privacy" element={<PrivacyScreen />} /><Route path="/theme" element={<ThemeScreen />} /><Route path="*" element={<Navigate to="/" />} /></Routes></div>;
}
