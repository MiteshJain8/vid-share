import { Text, View, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { images } from "@/constants";
import FormField from '../../components/formField';
import { useState } from 'react';
import CustomButton from '../../components/customButton';
import { Link } from 'expo-router';
import { logIn, getCurrentUser } from '../../lib/appwrite';


const signIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
        Alert.alert('Error', 'Please fill in all fields', [{ text: 'OK' }], { cancelable: false });
        return;
    }
    setIsSubmitting(true);
    try {
        await logIn(form.email, form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLoggedIn(true);
        console.log(result);
        router.replace('/home');
    } catch (error) {
        Alert.alert('Error', error.message, [{ text: 'OK' }], { cancelable: false });
    } finally {
        setIsSubmitting(false);
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
        <ScrollView>
            <View className='w-full h-full px-4 my-6 justify-center'>
                <Image source={images.logo} className='w-[130px] h-[80px]' resizeMode='contain'/>
                <Text className='text-2xl font-psemibold text-white'>Sign In</Text>
                <FormField
                  title="Email" 
                  handleChangeText={(value) => setForm({...form, email: value})}
                  value={form.email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  otherStyles="mt-6"
                />
                <FormField
                  title="Password" 
                  handleChangeText={(value) => setForm({...form, password: value})}
                  value={form.password}
                  placeholder="Enter your password"
                  otherStyles="mt-6"
                />
                <CustomButton 
                  title="Sign In" 
                  containerStyles="mt-6" 
                  handlePress={submit}
                  isLoading={isSubmitting}
                />
                <Text className='text-center text-gray-100 font-pmedium mt-4'>Don't have an account yet? <Link href="/sign-up" className='text-secondary font-psemibold'>Sign Up</Link></Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default signIn
