import { AUTH,UPDATE,UPDATE_SUCCESS,AUTH_LOADING,SIGNUP_FAIL,SIGNIN_FAIL,G_SIGNIN_FAIL,CLEAR_ERRORS } from '../constants/actionTypes';
import * as api from '../api/index.js';

//To signin a user
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({type:AUTH_LOADING})
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: SIGNIN_FAIL, payload: error.response.data.message });
  }
};

//To signup a user
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({type:AUTH_LOADING})
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: SIGNUP_FAIL, payload: error.response.data.message });
  }
};

//To googlesignin a user
export const googlesignin = (result,token, navigate) => async (dispatch) => {
  try {
    dispatch({type:AUTH_LOADING})
    let formData={ firstName: result?.name, lastName: '', email: result?.email, password: '', confirmPassword: '',selectedFile: result?.imageUrl,googleId:result?.googleId }
    const { data } = await api.googleSignUp(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: G_SIGNIN_FAIL, payload: error.response.data.message });
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
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};