// src/apiService.js
import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3001';

export const getAllPlants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/plants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/carts/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addCart = async (cart) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/carts`, cart);
    return response.data;
  } catch (error) {
    console.error('Error adding cart:', error);
    throw error;
  }
};

export const updateCartServer = async (cartId, updatedCartData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/carts/${cartId}`, updatedCartData);
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const addUser = async (user) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, user);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
};
  
export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, user);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};