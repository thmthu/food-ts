import React from 'react';
import { TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

const TextInputCustom = ({ hidePassword, setHidePassword, isPassword, style, icon, label, handleChange, handleBlur, value, ...props }) => {
    return (
        <View style={style} className="flex-row items-center border border-slate-400  mx-5 px-1 pb-1.5 rounded-lg"  >
            <Ionicons name={icon} size={24} color="rgba(251, 150, 40, 0.5)" className="m-2" />
            <TextInput
                style={{ flex: 1 }}

                onChangeText={handleChange(label)}
                onBlur={handleBlur(label)}
                value={value}
                label={label}
                placeholder={label}
                {...props}

            />
            {/* {(isPassword) &&
                (<TouchableOpacity className="m-2" onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={"rgba(251, 150, 40, 0.5)"}></Ionicons>
                </TouchableOpacity>)

            } */}
        </View>
    )
}

export default TextInputCustom;