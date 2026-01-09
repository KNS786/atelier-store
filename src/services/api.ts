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

export const getProducts = async (page: number, limit: number, category='', search='') => {
    try {
        const response: AxiosResponse = await axios.get(
            `http://localhost:5000/api/products?page=${page}&limit=${limit}&category=${category}&search=${search}`,
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ErrorResponse || { detail: "Network error" };
    }
};

export const getSearchProduct = async (search = null) => {
    try {
        const response: AxiosResponse = await axios.get(
            `http://localhost:5000/api/products?search=${search}`,
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ErrorResponse || { detail: "Network error" };
    }
};

export const getProductById = async (id:string) => {
    try {
        const response: AxiosResponse = await axios.get(
            `http://localhost:5000/api/products/${id}`,
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ErrorResponse || { detail: "Network error" };
    }
};