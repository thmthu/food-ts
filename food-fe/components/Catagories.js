import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { categories } from '../constants'

export default function Catagories() {
    const [isPress, setPress] = useState('');

    return (
        <View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                className="overflow-visible"
            >
                {
                    categories.map((catagory, index) => {
                        let isActive = isPress == catagory.id
                        let effect1 = isActive ? 'py-2 font-black' : 'py-2 font-light';
                        let effect2 = isActive ? 'mx-2 rounded-full p-2 bg-yellow-200 ' : 'mx-2 rounded-full p-2 bg-slate-200';
                        return (
                            <TouchableOpacity
                                key={index}
                                className="flex items-center justify-center "
                                onPress={() => setPress(catagory.id)}>
                                <View className={effect2}>
                                    <Image style={{ width: 45, height: 45 }} source={catagory.image}></Image>
                                </View>
                                <Text className={effect1}>{catagory.name}</Text>
                            </TouchableOpacity>
                        )

                    })
                }
            </ScrollView>
        </View>
    )
}