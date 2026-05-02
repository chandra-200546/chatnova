# ChatNova

Secure. Smart. Connected.

A production-structured Expo React Native MVP for a WhatsApp-like app with AI-ready architecture.

## Install

```bash
npm install
npm start
```

## Tech

- Expo + React Native + TypeScript
- React Navigation (stack + bottom tabs)
- AsyncStorage (mock auth/session)
- Expo Vector Icons

## App Flows

- Splash -> Login -> OTP -> Profile Setup -> Main Tabs
- Tabs: Chats, Groups, Status, Calls, AI
- Extra screens: Settings, New Chat, User Profile, Group Info, Privacy, Theme

## Backend-Ready Services

- `src/services/api`
- `src/services/socket`
- `src/services/auth`
- `src/services/ai`
- `src/services/storage`

## Notes

- Uses realistic mock data and local state.
- Message send, search, settings toggles, and logout are functional.
- Ready for future integration with Express/MongoDB/Socket.io/FCM/WebRTC/OpenAI.
