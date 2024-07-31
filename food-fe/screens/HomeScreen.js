import { View, Text, TextInput, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import Catagories from '../components/Catagories';
import FeatureRow from '../components/FeatureRow';
import { useNavigation } from '@react-navigation/native';
import { setData } from '../api/foodApi';
export default function HomeScreen() {
    const [featured2, setFeatured] = useState([]);
    const navi = useNavigation();

    useEffect(() => {
        setData('featured', setFeatured);
    }, []);

    const isLoading = featured2.length === 0;

    return (
        <SafeAreaView className="bg-white">
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'dark-content'}
            />

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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                <Catagories />

                <View className="mt-2">
                    {isLoading ? (
                        <Text>Loading featured items...</Text>
                    ) : (
                        featured2.map((item, index) => (
                            <FeatureRow
                                key={index}
                                title={item.title}
                                description={item.description}
                                featuredId={item.id}
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
