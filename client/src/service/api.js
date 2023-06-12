import axios from "axios";

const URL = "http://localhost:5000";



export const getPaints = async () => {
  try {
    return await axios.get(`${URL}/paints`);
  } catch (error) {
    console.log("Error while getting all the paints ", error);
  }
};

export const checkLogin = async (username, password) => {
  try {
    const response = await axios.post(`${URL}/users/login`, { username, password });
    return response.data;
  } catch (error) {
    return { error: "Login failed" };
  }
};

// export const editProduct = async (product, productId) => {
//   try {
//     return await axios.put(`${URL}/edit/product/${productId}`, product);
//   } catch (error) {
//     console.log("Error while calling edit user API ", error);
//   }
// };

// export const getProduct = async (productId) => {
//   try {
//     return await axios.get(`${URL}/product/${productId}`);
//   } catch (error) {
//     console.log("Error while getting the product with product ID ", error);
//   }
// };

// export const deleteProduct = async (productId) => {
//   try {
//     return await axios.delete(`${URL}/delete/product/${productId}`);
//   } catch (error) {
//     console.log("Error while deleting the product api ", error);
//   }
// };