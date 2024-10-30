import { StatusBar } from "expo-status-bar";
import { Redirect, router, Link } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/customButton";
import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import { name as appName } from '../app.json';
import { useGlobalContext } from "../context/GlobalProvider";

AppRegistry.registerComponent(appName, () => App);

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[80px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />
          <Text className="text-3xl text-white font-bold text-center">
            Welcome to{" "}
            <Text className="text-secondary-200">Aora</Text>
          </Text>
          <Image
            source={images.path}
            className="w-[136px] h-[15px] relative -top-2 -right-24"
            resizeMode="contain"
          />
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton 
            title="Continue with Email" 
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}