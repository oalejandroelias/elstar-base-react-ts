import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetPublicacion,
    apiPutPublicacion,
    apiDeletePublicacion,
} from '@/services/PublicacionService'

type PublicacionData = {
    Id?: string
    Archivo?: string
    Documento?: string
    UbiFisId?: string
    Tipo?: number
    Nivel?: number
    Titulo?: string
    Paginas?: string
    Tomo?: string
    Editorial?: string
    Anio?: string
    Tema?: string
    FechaIng?: string
    Tamanio?: string
    Visible?: string
    UltVisita?: string
    CategoriaId?: string
    Resumen?: string
    FecAlta?: string
    UsuAlta?: string
    FecMod?: string
    UsuMod?: string
    URL?: string
    ExtraidoDe?: string
    Lugar?: string
    //upload: string
    // img?: string
    // imgList?: {
    //     id: string
    //     name: string
    //     img: string
    // }[]
    // upload: File[]
    //select?: number
    //tags?: string[]
}

export type PublicacionEditState = {
    loading: boolean
    publicacionData: PublicacionData
}

type GetPublicacionResponse = PublicacionData

export const SLICE_NAME = 'publicacionEdit'

export const getPublicacion = createAsyncThunk(
    SLICE_NAME + '/getPublicaciones',
    async (data: { Id: string }) => {
        const response = await apiGetPublicacion<
            GetPublicacionResponse,
            { Id: string }
        >(data)
        return response.data
    }
)

export const updatePublicacion = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutPublicacion<T, U>(data)
    return response.data
}

export const deletePublicacion = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeletePublicacion<T, U>(data)
    return response.data
}

const initialState: PublicacionEditState = {
    loading: true,
    publicacionData: {},
}

const publicacionEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPublicacion.fulfilled, (state, action) => {
                state.publicacionData = action.payload.body
                state.loading = false
            })
            .addCase(getPublicacion.pending, (state) => {
                state.loading = true
            })
    },
})

export default publicacionEditSlice.reducer
