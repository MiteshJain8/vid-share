import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { icons } from '@/constants';
import { View, Text, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, name, color, focused }) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image 
        source = {icon}
        resizeMode = "contain"
        tintColor = {color}
        className = "w-5 h-5"
      />
      <Text className = {`${focused ? "font-psemibold text-white" : "font-pregular text-gray-200"}`}>
      {name}
      </Text>
    </View>
  )
} 

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopColor: '#232533',
          height: 84,
          borderTopWidth: 1,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon = {icons.home} 
              color = {color}
              name = "Home"
              focused = {focused}
              />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmark',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon = {icons.bookmark} 
              color = {color}
              name = "Bookmark"
              focused = {focused}
              />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon = {icons.plus} 
              color = {color}
              name = "Create"
              focused = {focused}
              />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon = {icons.profile} 
              color = {color}
              name = "Profile"
              focused = {focused}
              />
          ),
        }}
      />
    </Tabs>
  );
}
