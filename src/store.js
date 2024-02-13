import { configureStore } from '@reduxjs/toolkit'
import todolistReducer from './reducers/todocount'
// import { postSlice } from './reducers/todocount'
import { a } from './reducers/todocount';


export const Store = configureStore({
  reducer: {
   
    todocount:a.sr,
    post:a.psr
  },

})

