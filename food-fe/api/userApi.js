import { config } from "../config/baseURL";

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${config.apiUrl}api/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const { token, refreshToken } = data;
            return { token, refreshToken };
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (user) => {

    try {
        const response = await fetch(`${config.apiUrl}api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}