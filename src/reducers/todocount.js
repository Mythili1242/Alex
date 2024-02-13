import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios, * as others from 'axios';
import { useEffect } from 'react';
const API_URL = "http://localhost:3001/todos";



// export const getTodoAsync = () =>async (dispatch) => {
 
//   try {
//     const response = await axios.get(`${API_URL}`);
 
//   dispatch(getTodo(response.data));

//   } catch (err) {
//     throw new Error(err);
//   }
// };

export const getPosts=createAsyncThunk("getPosts",async ()=> {
  // return fetch("http://localhost:3001/todos").then((res)=>res.json())
  const res = await axios.get(API_URL)
  return res.data
});


export const postSlice=createSlice({
  name:"posts",
  initialState:{
    posts:[],
    loading:false,
  },
  extraReducers:{
    [getPosts.pending]:(state,action)=>{
      state.loading=true;
      console.log("pending...")
    },
    [getPosts.fulfilled]:(state,action)=>{
      state.loading=false;
       state.posts=action.payload;
      // return {...state,posts:action.payload}
      console.log("success");
      
     
    },
    [getPosts.rejected]:(state,action)=>{
      state.loading=false;
      console.log("rejected")
    },
  }

})




export const Slice = createSlice({
  name: 'Wishlist',
  initialState : {
    value: 0,
    data:[],
   
  },
  reducers: {
    add: (state,action) => {
      state.value =action.payload.length;
    },

    getTodo: (state, action) => {
      state.data = [action.payload];
    }

    // [getTodoAsync.pending]: (state, action) => {
    //   state.loading=true
    // },
    // [getTodoAsync.fulfilled]: (state, action) => {
    //   state.loading=false;
    //   state.data = [action.payload];
    // },
    // [getTodoAsync.rejected]: (state, action) => {
    //   state.loading=false;
    // }
  
   
  },
})



// Action creators are generated for each case reducer function
 export const {add,getTodo} = Slice.actions





// export default Slice.reducer
export const a={psr:postSlice.reducer,sr:Slice.reducer}
