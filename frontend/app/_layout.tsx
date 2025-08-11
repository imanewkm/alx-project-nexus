import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { useFrameworkReady } from '../hooks/useFrameworkReady';
import { apolloClient } from '../lib/apollo-client';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ApolloProvider client={apolloClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ApolloProvider>
  );
}