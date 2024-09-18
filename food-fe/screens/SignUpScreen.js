import React, { useState } from 'react';
import { Button, TextInput, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import TextInputCustom from '../components/TextInputCustom';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../api/userApi';

export default function SignUpScreen() {
    const navi = useNavigation();

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState("");
    const [isShowMess, setShowMessage] = useState(false);
    const handlleMessage = (mess, isShow) => {
        setMessage(mess);
        setShowMessage(isShow);
    }

    const handleSubmit = async (values) => {
        try {
            if (values.email == "" || values.password == "" || values.name == "" || values.address == "") {
                handlleMessage("Please fill all fields", true);
                return;
            }
            console.log(values);
            const data = await registerUser(values);
            handlleMessage(data.message, true);
        } catch (error) {
            console.error('Error2:', error);
        }
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                address: ''
            }}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="mt-40">
                        <Text style={{ color: "rgba(251, 146, 60, 20)" }} className="font-extrabold text-center text-3xl my-3"> SIGN UP </Text>
                        <TextInputCustom
                            style={{ marginBottom: 15 }}
                            label="name"
                            icon="person"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            placeholder="Asley Smith"
                            placeholderTextColor="gray"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        <TextInputCustom
                            style={{ marginBottom: 15 }}
                            label="email"
                            icon="mail"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            placeholder="asley@gmail.com"
                            placeholderTextColor="gray"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TextInputCustom
                            style={{ marginBottom: 15 }}
                            label="address"
                            icon="location"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            placeholder="address"
                            placeholderTextColor="gray"
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address}
                        />
                        <TextInputCustom
                            style={{ marginBottom: 15 }}
                            label="password"
                            icon="lock-closed"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            placeholder="*******"
                            placeholderTextColor="gray"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            isPassword={true}
                        />
                        {isShowMess && (
                            <View className="flex-row justify-center my-2">
                                <Text className="text-red-500">{message}</Text>
                            </View>
                        )}
                        <View className="mx-40 rounded-lg">
                            <Button
                                title="Submit"
                                onPress={handleSubmit}
                                color="rgba(251, 146, 60, 20)"
                            />
                        </View>
                        <View className="flex-row justify-center mt-3">
                            <TouchableOpacity onPress={() => navi.navigate('LogIn')}>
                                <Text className="text-blue-400"> Log in here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </Formik>
    );
}