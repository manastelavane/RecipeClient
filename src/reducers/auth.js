import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };

    case actionType.UPDATE:
      return { ...state, loading: true };

    case actionType.UPDATE_SUCCESS:
      let userdata=JSON.parse(localStorage.getItem('profile'))
      userdata.result.name=action.payload.name;
      userdata.result.selectedFile=action.payload.selectedFile;
      localStorage.clear();
      localStorage.setItem('profile', JSON.stringify({ ...userdata }));
      return { ...state, authData: userdata, loading: false, errors: null };
      
    default:
      return state;
  }
};

export default authReducer;
