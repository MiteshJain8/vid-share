import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from "@/constants";

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='w-full h-16 px-4 bg-black-200 border-purple-900 border-2 rounded-2xl focus:border-secondary flex-row'>
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          className='flex-1 text-white font-psemibold text-base'
          placeholderTextColor={'#7C7C7C'}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='absolute right-4 top-4'>
            <Image source={showPassword? icons.eyeHide : icons.eye} className='w-6 h-6' resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField