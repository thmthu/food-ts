import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather"
import { useNavigation } from '@react-navigation/native';

export default function RestaurantCard({ item }) {
    const navi = useNavigation();
    const resID = item.id;
    return (
        <TouchableWithoutFeedback
            onPress={() => navi.navigate('Restaurant', { resID })}>
            <View style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, // for Android
            }}
                className="bg-white mx-3 rounded-3xl drop-shadow-2xl m-3">
                <Image className="h-36 rounded-t-3xl "
                    source={{ uri: item.image }}
                    resizeMode="cover"

                />
                <View className="flex mt-3 ml-3" >
                    <View>
                        <Text className=" mb-2 text-xl font-extrabold">{item.name}</Text>
                    </View>
                    <View className="flex-row mb-2 gap-2">
                        <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4"></Image>
                        <Text>
                            ({item.reviews} review) <Text className=" font-bold text-gray-600">{item.category}</Text>
                        </Text>
                    </View>
                    <View className="flex-row  text-gray-500 mb-3">
                        <Icon.MapPin stroke="gray" width={20} height={20} />
                        <Text className=" ml-2 text-gray-400 font-bold">Nearby {item.address}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    )
}