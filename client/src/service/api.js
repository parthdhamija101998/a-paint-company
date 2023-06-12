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

export const editPaint = async (paint, _id) => {
  try {
    const response = await axios.put(`${URL}/paints/update/${_id}`, { updatedPaint: paint });
    return response.data;
  } catch (error) {
    console.log("Error ", error);
  }
};


export const getPaint = async (_id) => {
  try {
    return await axios.get(`${URL}/paints/${_id}`);
  } catch (error) {
    console.log("Error while getting the Paint with ID ", error);
  }
};
