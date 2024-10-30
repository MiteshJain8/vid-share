import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/emptyState'
import InfoBox from '../../components/infoBox'
import { getUserPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/videoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { router } from 'expo-router'
import { logIn, getCurrentUser, setUser, setIsLoggedIn } from '../../lib/appwrite';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      setTimeout(() => {}, 1000);
      router.replace('/sign-in');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <SafeAreaView className='bg-primary w-full h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className='mt-6 mb-4 px-4 w-full justify-center items-center'>
            <TouchableOpacity 
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image
                source={ icons.logout}
                className='w-6 h-6'
                resizeMode='contain'
              />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary justify-center items-center rounded-lg'>
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              />
            </View>

            <InfoBox 
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mb-3 flex-row'>
              <InfoBox 
                title={posts?.length || 0}
                subtitle='Videos'
                containerStyles='mr-10'
                titleStyles='text-lg'
              />
              <InfoBox 
                title="1.8k"
                subtitle='Followers'
                titleStyles='text-lg'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='No videos found for this search result'
          />
        )}
        
      />
    </SafeAreaView>
  )
}

export default Profile