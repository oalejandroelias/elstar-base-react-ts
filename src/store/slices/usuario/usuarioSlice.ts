import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export interface UsuarioState {
    signedIn: boolean
    token: string | null
}

const initialState: UsuarioState = {
    signedIn: false,
    token: null,
}

const usuarioSlice = createSlice({
    name: `${SLICE_BASE_NAME}/usuario`,
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<string>) {
            state.signedIn = true
            state.token = action.payload
        },
        signOutSuccess(state) {
            state.signedIn = false
            state.token = null
        },
    },
})

export const { signInSuccess, signOutSuccess } = usuarioSlice.actions
export default usuarioSlice.reducer