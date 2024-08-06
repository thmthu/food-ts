import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';

const SearchBar = () => {

    return (
        <View className="flex-row items-center space-x-2 px-4 mt-3 pb-4">
            <View className="flex-row flex-1 items-center px-1 pb-1.5 gap-2 rounded-full border border-slate-400">
                <Icon.Search stroke="gray" width={15} height={15} />
                <TextInput placeholder='Restaurant' className="flex-1" />
                <View className="flex-row space-x-1 px-2 border-gray justify-center items-center">
                    <Icon.MapPin stroke="gray" width={20} height={20} />
                    <Text>HCM</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navi.navigate('LogIn')} style={{ backgroundColor: themeColors.bgColor(1) }} className="p-3 bg-gray-300 rounded-full">
                <Icon.LogOut strokeWidth={2.5} stroke="white" width={20} height={20} />
            </TouchableOpacity>
        </View>
    )
}
export default SearchBar;