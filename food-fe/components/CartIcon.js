import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { featured } from '../constants'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/cartSlice'

export default function CartIcon() {
    const navi = useNavigation();
    const item = useSelector(selectItems);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const newTotal = item.reduce((total, item) => total + item.price, 0);
        setTotal(newTotal)
    }, [item])
    if (!item.length)
        return null

    return (
        <View className="absolute bottom-12 w-full z-50 " >
            <TouchableOpacity
                onPress={() => navi.navigate('Cart')}
                style={
                    { backgroundColor: themeColors.bgColor(1) }
                }
                className="flex-row items-center justify-between mx-5 rounded-full"
            >
                <View className="p-2 px-4 rounded-full bg-slate-400/40 m-3  ">
                    <Text className="text-white text-xl font-bold ">{item.length}</Text>
                </View>
                <Text className="font-bold text-lg text-white flex-1 text-center">View Cart</Text>
                <Text className="text-white text-xl font-bold mx-5 ">${total}</Text>
            </TouchableOpacity>
        </View>
    )
}