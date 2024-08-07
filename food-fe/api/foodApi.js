import { config } from "../config/baseURL";

export const fetchData = async (type) => {
    try {
        const baseURL = config.apiUrl
        const response = await fetch(`${baseURL}api/restaurants/${type}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
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
