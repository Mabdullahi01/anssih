// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { useAxios } from 'src/hooks/useAxios'
import { RoleType } from 'src/types/apps/roleType'

interface DataParams {
  q: string
}

// ** Fetch Invoices
export const fetchData = createAsyncThunk('roles/all', async (params: DataParams) => {
  const response = await useAxios.get('/role/all')
  const allRoles = response.data.data.roles
  const { q = '' } = params ?? ''

  const queryLowered = q.toLowerCase()

  const filteredRoles = allRoles.filter(
    (role: RoleType) =>
      role.name.toLowerCase().includes(queryLowered) || role.permission.toLowerCase().includes(queryLowered)
  )

  return {
    allRoles: allRoles,
    filteredRoles: filteredRoles,
    params: params,
    total: allRoles.length
  }

  return response.data
})

export const roleSlice = createSlice({
  name: 'roles',
  initialState: {
    allRoles: [],
    total: 1,
    params: {},
    filteredRoles: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.filteredRoles = action.payload.filteredRoles
      state.params = action.payload.params
      state.allRoles = action.payload.allRoles
      state.total = action.payload.total
    })
  }
})

export default roleSlice.reducer
