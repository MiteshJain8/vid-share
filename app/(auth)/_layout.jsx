import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
    <SafeAreaView className="bg-primary h-full">
        <Stack>
            <Stack.Screen 
                name="sign-in"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="sign-up"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
        <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
    </>
  )
}

export default AuthLayout