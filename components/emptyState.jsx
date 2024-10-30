import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './customButton'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
    return (
    <View className='justify-center items-center px-4'>
        <Image 
            source={images.empty} 
            className='w-[270px] h-[210px]' 
            resizeMode='contain' 
        />
        <Text className='font-pmedium text-xl text-gray-100'>{title}</Text>
        <Text className='text-sm font-psemibold text-white mt-2'>{subtitle}</Text>

        <CustomButton 
            title='Create video'
            containerStyles='my-6 w-3/4'
            textStyles='text-sm font-psemibold'
            handlePress={() => router.push('/create')}
        />
    </View >
  )
}

export default EmptyState