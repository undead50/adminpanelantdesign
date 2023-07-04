import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL } from './../../config';
import axios from 'axios';

export const postLoginData = createAsyncThunk('auth/postLoginData',async(payload)=>{
  try {
    const url = BACKEND_URL + '/auth/adlogin';
    const { data } = await axios.post(url,payload);
    return data
  }
  catch(err){
    return err
  }
})



const authSlice = createSlice({
    reducerPath: 'authreducerPath',
    name:'auth',
    initialState: {
        isLoggedIn: false,
        data: null,
        loading:false,
        error: false,
        userInfo:{
          userName: '',
          solId:'',
          email:'',
          departmentName:'',
          token:''
      }
    },
    reducers: {
        login: (state, action) => {

        },
        setUser: (state,action) => {
          state.userInfo = action.payload
        },
       
        logout: (state, action) => {
          console.log("called logout function")
          state.isLoggedIn = false;
          state.data = null;
          state.userInfo = null;
          
        }
    },
    extraReducers: {
      [postLoginData.pending]: (state) => {
        state.loading = true;
      },
      [postLoginData.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload;        
      },
      [postLoginData.rejected]: (state, action) => {
        state.loading = false;
        state.error = true;
      }
    }
})

export const { login, logout, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;