import { View, Text, TextInput, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import Catagories from '../components/Catagories';
import FeatureRow from '../components/FeatureRow';
import { useNavigation } from '@react-navigation/native';
import { setData } from '../api/foodApi';
import SearchBar from '../components/SearchBar';
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
            <SearchBar />
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
