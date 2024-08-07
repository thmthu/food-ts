import React, { useState } from 'react';
import { Button, TextInput, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Keyboard } from 'react-native';
import TextInputCustom from '../components/TextInputCustom';
import { useNavigation } from '@react-navigation/native';
import { setEmail } from '../slices/emailSlice';
import { useDispatch } from 'react-redux';
import { config } from "../config/baseURL";
import { loginUser } from '../api/userApi';

export default function LoginScreen() {
    const navi = useNavigation();
    const dispatch = useDispatch();
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState("");
    const [isShowMess, setShowMessage] = useState(false);


    const handlleMessage = (mess, isShow) => {
        setMessage(mess);
        setShowMessage(isShow);
    }
    const handleSubmit = async (values) => {
        try {
            if (values.email == "" || values.password == "") {
                handlleMessage("Please fill all fields", true);
                return;
            }
            const response = await loginUser(values.email, values.password);
            if (response) {
                handlleMessage("Login successful", true);
                dispatch(setEmail(values.email));
                navi.navigate('Home', { email: values.email });
                handlleMessage("", true);

            } else {
                handlleMessage("Login failed. Username or password is incorrect", true);
                console.log('Request failed');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View className="mt-40">
                        <Text style={{ color: "rgba(251, 146, 60, 20)" }} className="font-extrabold text-center text-3xl my-3"> LOGIN </Text>
                        <TextInputCustom
                            style={{ marginBottom: 15 }}
                            label="Email"
                            icon="mail"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            placeholder="asley@gmail.com"
                            placeholderTextColor="gray"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"

                        />
                        <TextInputCustom
                            style={{ marginBottom: 5 }}
                            label="password"
                            icon="lock-closed"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            placeholder="*******"
                            placeholderTextColor="gray"
                            onchangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            isPassword={true}

                        />
                        {isShowMess && (<View className="flex-row justify-center my-2">
                            <Text className="text-red-500">{message}</Text>
                        </View>)}
                        <View className="mx-40 rounded-lg">
                            <Button title="Submit"
                                onPress={handleSubmit}
                                color="rgba(251, 146, 60, 20)">

                            </Button>
                        </View>
                        <View className="flex-row justify-center mt-3">
                            <Text> Don't have an account already?</Text>
                            <TouchableOpacity onPress={() => navi.navigate('SignUp')}>
                                <Text className="text-blue-400"> Register here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            )}
        </Formik>
    );
}
