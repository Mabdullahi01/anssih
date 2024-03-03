// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { useAxios } from '../../../hooks/useAxios'

// ** Fetch Users
export const fetchData = createAsyncThunk('events/all', async () => {
  // ** react hook
  const response = await useAxios.get('/event/all')
  const allEvents = response.data.data.events

  return {
    events: allEvents,
    total: allEvents.length
  }
})

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    total: 1
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.events = action.payload.events
      state.total = action.payload.total
    })
  }
})

export default eventsSlice.reducer
