import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accesssToken } = action.payload
            state.token = accesssToken
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token