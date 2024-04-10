//import { initialState } from './../../../../store/slices/base/commonSlice';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { TableQueries } from "@/@types/common";
import { apiGetPublicaciones, apiDeletePublicacion } from '@/services/PublicacionService';

type Publicacion = {
    Id: string
    Archivo: string
    Documento: string
    Titulo: string
}

type Publicaciones = Publicacion[]

type GetPublicaciones = {
    data: Publicaciones
    total: number
}

type FilterQueries = {
    Archivo: string
    Titulo: string
}

export type PublicacionListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedPublicacion: string
    tableData: TableQueries
    filterData: FilterQueries
    publicacionList: Publicacion[]
}

type GetPublicacionesRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = "tablePublicacionList"

export const getPublicaciones = createAsyncThunk(
    SLICE_NAME + '/publicaciones',
    async (data: GetPublicacionesRequest) => {
        const response = await apiGetPublicaciones<GetPublicacionesRequest, GetPublicacionesRequest>(data)
        return response.data
    }
)

export const deletePublicacion = async (data: { id: string | string[] }) => {
    const response = await apiDeletePublicacion<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: ''
    }
}

const initialState: PublicacionListState = {
    loading: false,
    deleteConfirmation: false,
    selectedPublicacion: '',
    publicacionList: [],
    tableData: initialTableData,
    filterData: {
        Archivo: '',
        Titulo: ''
    },
}

const publicacionListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updatePublicacionState: (state, action) => {
            state.publicacionList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedPublicacion: (state, action) => {
            state.selectedPublicacion = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPublicaciones.fulfilled, (state, action) => {
            state.publicacionList = action.payload.body.data
            state.tableData.total = action.payload.body.total
            state.loading = false
        })
    }
})

export const { updatePublicacionState, setTableData, setFilterData, toggleDeleteConfirmation, setSelectedPublicacion } = publicacionListSlice.actions

export default publicacionListSlice.reducer