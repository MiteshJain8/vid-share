import { Text, View, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { images } from "@/constants";
import FormField from '../../components/formField';
import { useState } from 'react';
import CustomButton from '../../components/customButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const signUp = () => {
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all fields', [{ text: 'OK' }], { cancelable: false });
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await createUser(form.email, form.password, form.username);
            setUser(result);
            setIsLoggedIn(true);
            // Set it to global state
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
                    <Image source={images.logo} className='w-[130px] h-[80px]' resizeMode='contain' />
                    <Text className='text-2xl font-psemibold text-white'>Sign Up</Text>
                    <FormField
                        title="Username"
                        handleChangeText={(value) => setForm({ ...form, username: value })}
                        value={form.username}
                        placeholder="Enter a username"
                        otherStyles="mt-6"
                    />
                    <FormField
                        title="Email"
                        handleChangeText={(value) => setForm({ ...form, email: value })}
                        value={form.email}
                        placeholder="Enter an email"
                        keyboardType="email-address"
                        otherStyles="mt-6"
                    />
                    <FormField
                        title="Password"
                        handleChangeText={(value) => setForm({ ...form, password: value })}
                        value={form.password}
                        placeholder="Enter a password"
                        otherStyles="mt-6"
                    />
                    <CustomButton
                        title="Sign Up"
                        containerStyles="mt-6"
                        handlePress={submit}
                        isLoading={isSubmitting}
                    />
                    <Text className='text-center text-gray-100 font-pmedium mt-4'>Already have an account? <Link href="/sign-in" className='text-secondary font-psemibold'>Sign In</Link></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default signUp
