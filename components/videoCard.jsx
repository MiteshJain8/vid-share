import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
    const [play, setPlay] = useState(false)

    return (
        <View className='flex-col items-center mb-14 px-4'>
            <View className='flex-row items-start gap-3'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
                        <Image
                            source={{ uri: avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>

                    <View className='flex-1 justify-center ml-3 gap-y-1'>
                        <Text className='text-white text-sm font-psemibold' numberOfLines={1}>{title}</Text>
                        <Text className='text-gray-100 text-sx font-pregular' numberOfLines={1}>{username}</Text>
                    </View>
                </View>

                <View className='pt-2'>
                    <Image
                        source={icons.menu}
                        className='w-5 h-5'
                        resizeMode='contain'
                    />
                </View>
            </View>

            {play ? (
                <Video
                source={{ uri: video }}
                className='rounded-xl w-full h-60 mt-3'
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                    setPlay(false);
                    }
                }}
                />
            ) : (
                <TouchableOpacity 
                    activeOpacity={0.7} 
                    className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                    onPress={() => setPlay(true)}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className='w-full h-full rounded-xl mt-4'
                        resizeMode='cover'
                    />

                    <Image
                        source = {icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}

        </View>
  )
}

export default VideoCard