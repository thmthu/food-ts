import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import * as Icon from "react-native-feather"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, selectItemByID, selectItems } from '../slices/cartSlice'

export default function DishRow({ item }) {
    const itemCurrent = useSelector(state => selectItemByID(state, item.id));
    const dispatch = useDispatch();
    const handleMinus = () => {
        dispatch(removeFromCart(item.id));
    }
    const handlePlus = () => {
        dispatch(addToCart({ ...item }));
    }
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
                <Text>{item.description}</Text>

                <View className="flex-row justify-between items-center">
                    <Text className="text-l font-extrabold ">${item.price}</Text>
                    <View className="flex-row gap-3 items-center">

                        <TouchableOpacity onPress={handleMinus}
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                            className="rounded-full p-1  ">
                            <Icon.Minus stroke={'white'} strokeWidth={2} height={20} width={20} />
                        </TouchableOpacity >
                        <Text >{itemCurrent.length}</Text>
                        <TouchableOpacity
                            onPress={handlePlus}
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                            className="rounded-full p-1  ">
                            <Icon.Plus stroke={'white'} strokeWidth={2} height={20} width={20} />
                        </TouchableOpacity >
                    </View>
                </View>
            </View>
        </View>
    )
}