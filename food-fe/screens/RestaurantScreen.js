import { View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import DishRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../slices/restaurantSlice';
import { setData } from '../api/foodApi';

const screenWidth = Dimensions.get('window').width;

export default function RestaurantScreen() {
    const myRoute = useRoute();
    const params = myRoute.params;
    const id = params.resID;
    const navi = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRestaurant({ ...params }));
    }, [dispatch, params]);

    const [dishes, setDishes] = useState([]);
    const [res, setRes] = useState(null); // Set initial state to null

    useEffect(() => {
        setData(`${id}`, setRes);
        setData(`dish-restaurant/${id}`, setDishes);

    }, []);

    return (
        <View className='flex-1'>
            <StatusBar barStyle="light-content" />

            <CartIcon />
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}>
                <View className="relative">
                    <StatusBar themeColors='white' />
                    {res && (
                        <Image source={{ uri: res.image }} style={{ width: screenWidth, height: 300 }} />
                    )}
                    <TouchableOpacity
                        onPress={() => navi.goBack()}
                        className="absolute rounded-full bg-white p-2 top-5 left-4">
                        <Icon.ArrowLeft stroke={themeColors.bgColor(1)} strokeWidth={3} />
                    </TouchableOpacity>
                </View>
                <ScrollView className="rounded-t-3xl -mt-8 bg-white pb-36">
                    <View className="flex mt-3 ml-3">
                        <View>
                            {res && (
                                <Text className=" mb-2 text-4xl font-extrabold">{res.name}</Text>
                            )}
                        </View>
                        <View className="flex-row mb-2 gap-2">
                            <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
                            <Text>
                                ({res && res.reviews} review) <Text className=" font-bold text-gray-600">{params.category}</Text>
                            </Text>
                            <Icon.MapPin stroke="gray" width={20} height={20} />
                            {res && (
                                <Text className=" text-gray-400 font-bold">Nearby {res.address}</Text>
                            )}
                        </View>
                        {res && (
                            <Text className="text-gray-600 text-m ">{res.description}</Text>
                        )}
                        <Text className="text-2xl font-extrabold my-2">Menu</Text>
                        {(dishes.length > 0) && dishes.map((dish, index) => (
                            <DishRow
                                key={index}
                                item={dish}
                            />
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
}
