// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { useAxios } from '../../../hooks/useAxios'

// ** Fetch Users
export const fetchData = createAsyncThunk('scholars/all', async () => {
  // ** react hook
  const response = await useAxios.get('/scholar/all')
  const allScholars = response.data.data.scholars

  return {
    allScholars: allScholars,
    total: allScholars.length
  }
})

export const scholarsSlice = createSlice({
  name: 'scholars',
  initialState: {
    allScholars: [],
    total: 1,
    params: {},
    filteredScholars: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.allScholars = action.payload.allScholars
      state.total = action.payload.total
    })
  }
})

export default scholarsSlice.reducer
