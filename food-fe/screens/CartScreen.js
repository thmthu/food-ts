import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from "react-native-feather"
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../slices/restaurantSlice'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, selectItems } from '../slices/cartSlice'
import { selectEmail } from '../slices/emailSlice'

export default function CartScreen() {
    const navi = useNavigation();
    const res = useSelector(state => selectRestaurant(state));
    const items = useSelector(selectItems);
    const [listItems, setListItems] = useState({});
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch()
    const email = useSelector(state => selectEmail(state));

    const handlePress = async () => {
        const billDetails = Object.entries(listItems).map(([dish_id, items]) => ({
            dish_id,
            quantity: items.length,
            price: items[0].price
        }));

        const billInfo = {
            email,
            total,
            billDetails
        };

        try {
            const response = await fetch('http://172.20.240.1:3000/bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(billInfo)
            });

            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            navi.navigate('WaitScreen');
        } catch (error) {
            console.error('Failed to fetch API', error);
        }
    }
    useEffect(() => {
        const temp = items.reduce((group, item) => {
            if (group[item.id])
                group[item.id].push(item);
            else group[item.id] = [item];

            return group;
        }, {});
        setListItems(temp);
        const newTotal = items.reduce((total, item) => total + item.price, 0);
        setTotal(newTotal)
    }, [items, setListItems, setTotal])
    return (
        <View className="bg-white flex-1">
            <View className="py-3">
                <View className="relative py-4">
                    <TouchableOpacity
                        onPress={() => {
                            navi.goBack()
                        }}
                        style={{ backgroundColor: themeColors.bgColor(1) }}

                        className="absolute rounded-full p-2 top-5 left-4">
                        <Icon.ArrowLeft stroke={'white'} strokeWidth={3}></Icon.ArrowLeft>
                    </TouchableOpacity>
                </View>
                <View >
                    <Text className="text-xl font-extrabold text-center">Your cart</Text>
                    <Text className=" text-gray-500 text-center">{res.name}</Text>
                </View>
            </View>
            <View
                style={{ backgroundColor: themeColors.bgColor(0.3) }}
                className="flex-row justify-center items-center px-4">
                <Image source={require('../assets/images/bikeGuy.png')} className="w-20 h-20"></Image>
                <Text className="flex-1 text-center"> Deliver in 20-30 minutes</Text>
                <Text className="font-extrabold" style={{ color: themeColors.bgColor(1) }}> Change</Text>
            </View>
            <ScrollView>
                {
                    Object.entries(listItems).map(([key, items]) => {
                        return (
                            <View key={items[0].id} className="flex-row items-center my-4 mx-4">
                                <Text className="font-bold mr-2 text-lg">{items.length}x</Text>
                                <Image source={{ uri: items[0].image }} className="w-20 h-20 rounded-full" />
                                <Text className="mx-2 font-bold flex-1"> {items[0].name}</Text>
                                <Text className="mx-2 font-bold"> ${items[0].price}</Text>
                                <TouchableOpacity
                                    onPress={() => dispatch(removeFromCart(items[0].id))
                                    }
                                    style={{ backgroundColor: themeColors.bgColor(1) }}
                                    className="rounded-full p-1  ">
                                    <Icon.Minus stroke={'white'} strokeWidth={2} height={20} width={20} />
                                </TouchableOpacity >
                            </View>
                        )
                    }

                    )
                }
            </ScrollView>
            <View className="absolute bottom-0 space-y-4 rounded-t-3xl px-8 w-full py-4"
                style={{ backgroundColor: themeColors.bgColor(0.3) }}>

                <View className="flex-row items-center">
                    <Text className="text-gray-700 flex-1"> Subtotal</Text>
                    <Text className="text-gray-700"> {total}</Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-gray-900 flex-1"> Deliver fee</Text>
                    <Text className="text-gray-900"> $2</Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="font-bold flex-1"> Total</Text>
                    <Text className="font-bold"> ${total + 2}</Text>
                </View>
                <TouchableOpacity
                    onPress={handlePress}
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="rounded-3xl w-full p-3">
                    <Text className="text-white font-extrabold text-xl text-center"> Place Order</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}