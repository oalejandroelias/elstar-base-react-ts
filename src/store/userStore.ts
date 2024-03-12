
import {create} from 'zustand'

const initialState = {
    id: 0,
    nombre: ''
}

interface userState {
    id: number,
    nombre: string
}

const useStore = create((set) => ({
    user: initialState,
    nombre: '',
    createUser: () => {},
}))

export default useStore