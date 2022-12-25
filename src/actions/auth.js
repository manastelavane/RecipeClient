import { AUTH,UPDATE,UPDATE_SUCCESS } from '../constants/actionTypes';
import * as api from '../api/index.js';

//To signin a user
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

//To signup a user
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

//To googlesignin a user
export const googlesignin = (result,token, navigate) => async (dispatch) => {
  try {
    let formData={ firstName: result?.name, lastName: '', email: result?.email, password: '', confirmPassword: '',selectedFile: result?.imageUrl,googleId:result?.googleId }
    const { data } = await api.googleSignUp(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

//To update user profile
export const updateProfile = (profiledata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await api.updateProfile(profiledata,config);
    dispatch({
      type: UPDATE_SUCCESS,
      payload:data,
    });
  } catch (error) {
    console.log(error);
  }
};