import axios, { type AxiosResponse } from 'axios';
import type { ErrorResponse } from 'react-router-dom';

export const signup = async (body: any) => {
    try {
        const response: AxiosResponse = await axios.post(
            'http://localhost:5000/api/auth/register',
            { ...body }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ErrorResponse || { detail: "Network error" };
    }
};


export const loginUser = async (body: any) => {
    try {
        const response: AxiosResponse = await axios.post(
            'http://localhost:5000/api/auth/login',
            { ...body }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ErrorResponse || { detail: "Network error" };
    }
};