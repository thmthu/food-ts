import { config } from "../config/baseURL";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchData = async (type) => {
    try {
        const baseURL = config.apiUrl;
        const token = await AsyncStorage.getItem('accessToken'); // Retrieve the token from AsyncStorage
        const response = await fetch(`${baseURL}api/restaurants/${type}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error.message, error.stack);
        throw error;
    }
}

export const setData = async (type, setData) => {
    try {
        const data = await fetchData(type);
        setData(data);
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}