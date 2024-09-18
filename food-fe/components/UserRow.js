import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
export default function UserRow({ item }) {

    return (

        <View
            style={
                { borderColor: themeColors.bgColor(0.4) }
            }
            className="my-6 bg-white border-2 rounded-xl first-letter:flex-row gap-2 flex-1 mx-2 mr-4 pb-2 pr-2">
            <Image className="h-20 w-20 rounded-xl "
                source={{ uri: item.image }}></Image>
            <View className='flex-1'>
                <Text className="text-xl font-bold">{item.name}</Text>

                <View className="flex-row justify-between items-center">
                    <View className="flex-row gap-3 items-center">


                    </View>
                </View>
            </View>
        </View>
    )
}