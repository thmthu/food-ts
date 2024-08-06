import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
export default function WaitScreen() {

    return (
        <View className="flex-1 items-center justify-center">
            <Image source={require('../assets/images/delivery.gif')} className="h-80 w-80"></Image>
        </View >
    )
}