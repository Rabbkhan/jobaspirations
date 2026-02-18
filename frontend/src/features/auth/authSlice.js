import { createSlice } from '@reduxjs/toolkit'
import { LogOut } from 'lucide-react'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false
    },
    reducers: {
        //actions

        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        Logout(state) {
            ;((state.user = null), (state.isAuthenticated = false))
        }
    }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
