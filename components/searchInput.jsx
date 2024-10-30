import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from "@/constants";
import { usePathname } from 'expo-router';
import { router } from 'expo-router';

const SearchInput = ({ initialQuery }) => {
  const pathName = usePathname();

  const [query, setQuery] = useState(initialQuery || '');
  return (
    <View className='w-full h-14 px-4 bg-black-200 border-purple-900 border-2 rounded-2xl focus:border-secondary flex-row space-x-4 items-center'>
      <TextInput
        value={query}
        placeholder="Search for a video topic"
        onChangeText={(e) => setQuery(e)}
        className='flex-1 text-white font-pregular text-base'
        placeholderTextColor={'#7C7C7C'}
      />
      <TouchableOpacity 
        className='justify-center'
        onPress={() => {
          if (!query) return Alert.alert('Please enter a search query');
          if (pathName.startsWith('/search')) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className='w-6 h-6'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;