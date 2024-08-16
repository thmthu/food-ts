import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import RestaurantCard from '../components/RestaurantCard'
import { setData } from '../api/foodApi'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
export default function SearchScreen() {
    const restaurantName = useRoute().params.restaurantName;
    const [restaurants, setRestaurant] = useState([]);
    console.log(restaurantName);
    useEffect(() => {
        const fetchData = async () => {
            setData(`restaurant-detail-by-name/${restaurantName}`, setRestaurant);
        };

        fetchData();
    }, []);
    return (
        <SafeAreaView className="bg-white">
            <SearchBar />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 15
                }}
                className="overflow-visible mt-3">
                {
                    restaurants.map((item, index) => {
                        return (
                            <RestaurantCard
                                key={index}
                                item={item}
                            />
                        )
                    })
                }
            </ScrollView>

        </SafeAreaView>
    )
}