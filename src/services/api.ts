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

export const getCart = async () => {
    try {
        const token = sessionStorage.getItem('accessToken');
        const response: AxiosResponse = await axios.get(
            `http://localhost:5000/api/cart`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ErrorResponse || { detail: "Network error" };
    }
};

// Add item to cart
export const addToCart = async (productId: string, quantity: number) => {
    const token = sessionStorage.getItem('accessToken');

    const response: AxiosResponse = await axios.post(
            `http://localhost:5000/api/cart`,
            {
                productId,
                quantity
            },
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }
           
        );
        return response.data;
};

// Update cart item quantity
export const updateCartItem = async (productId: string, quantity: number) => {
    const token = sessionStorage.getItem('accessToken');

   const response: AxiosResponse = await axios.put(
            `http://localhost:5000/api/cart`,
            {
                productId,
                quantity
            },
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
};

// Remove item from cart
export const removeFromCart = async (productId: string ) => {

    const token = sessionStorage.getItem('accessToken');

   const response: AxiosResponse = await axios.delete(
            `http://localhost:5000/api/cart/item/${productId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            },
        );
        return response.data;
};

// Clear entire cart
export const clearCart = async () => {

       const token = sessionStorage.getItem('accessToken');

   const response: AxiosResponse = await axios.delete(
            `http://localhost:5000/api/cart/clear`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            },
        );
        return response.data;
};

export interface CreateOrderPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}


export const createOrder = async (payload: CreateOrderPayload) => {
    const token = sessionStorage.getItem('accessToken');
    const { data } = await axios.post( `http://localhost:5000/api/orders`, payload , {
         headers: {
                    'Authorization': `Bearer ${token}`
                },
    });
    return data;
};

export const payOrder = async (orderId: string ) => {
    const token = sessionStorage.getItem('accessToken');
    const response = await axios.post( `http://localhost:5000/api/payment/payu` , { orderId }, {
         headers: {
                    'Authorization': `Bearer ${token}`
                },
    });
    return response ;
};