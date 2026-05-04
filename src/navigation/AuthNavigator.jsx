import { Navigate, Route, Routes } from 'react-router-dom';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';

export default function AuthNavigator() {
  return <Routes><Route path="/" element={<SplashScreen />} /><Route path="/login" element={<LoginScreen />} /><Route path="/otp" element={<OTPScreen />} /><Route path="/profile-setup" element={<ProfileSetupScreen />} /><Route path="*" element={<Navigate to="/" />} /></Routes>;
}
