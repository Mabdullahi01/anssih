// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useAxios } from 'src/hooks/useAxios'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Mandate
export const fetchData = createAsyncThunk('mandate/all', async () => {
  const response = await useAxios.get('/mandate/all')

  const data = response.data.data.mandate.content

  return {
    allData: data,
    total: data.length
  }
})

// ** Add Mandate
export const createMandate = createAsyncThunk(
  'mandate/create',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await useAxios.post('/mandate/create', {
      data
    })
    dispatch(fetchData())

    return response.data
  }
)

// ** Delete User
export const deleteMandate = createAsyncThunk('mandate/delete', async (id: number | string, { dispatch }: Redux) => {
  const response = await useAxios.delete('/mandate/delete', {
    data: id
  })
  dispatch(fetchData())

  return response.data
})

// ** get mandate

export const getMandate = createAsyncThunk('mandate/get', async (email: string | undefined) => {
  const response = await useAxios.get('/mandate/find/' + email)

  return response.data.data.mandate
})

export const mandateSlice = createSlice({
  name: 'mandate',
  initialState: {
    data: [],
    total: 1,
    allData: [],
    scholar: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.total = action.payload.total
      state.allData = action.payload.allData
    }),
      builder.addCase(getMandate.fulfilled, (state, action) => {
        state.scholar = action.payload
      })
  }
})

export default mandateSlice.reducer
