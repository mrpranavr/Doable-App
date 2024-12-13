import { Slot } from "expo-router";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="[groupTask]" options={{ headerShown: false }} />
    </Stack>
  );
}
