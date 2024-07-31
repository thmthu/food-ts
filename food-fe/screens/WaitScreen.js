import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function WaitScreen() {
    const navi = useNavigation()
    useEffect(() => {
        setTimeout(() => {
        }, 3000)
    }, [])
    return (
        <View className="flex-1 items-center justify-center">
            <Image source={require('../assets/images/delivery.gif')} className="h-80 w-80"></Image>
        </View >
    )
}