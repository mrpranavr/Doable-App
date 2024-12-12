import { Slot } from "expo-router";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="userModal" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}
