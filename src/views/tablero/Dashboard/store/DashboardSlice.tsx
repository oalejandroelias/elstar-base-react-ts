import { apiGetDataDashboard } from "@/services/DashboardService"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export type Statistic = {
    Documento: string
    Archivo: string
    Id: number
}

export type DashboardData = {
    statisticData: Statistic[]
}

type DashboardDataResponse = DashboardData
//type DashboardDataResponse = any

export type DashboardState = {
    loading: boolean
    dashboardData: Partial<DashboardData>
}

export const SLICE_NAME = 'Dashboard'

export const getDashboardData = createAsyncThunk('Dashboard/data/getDashboardData', async() => {
    const response = await apiGetDataDashboard<DashboardDataResponse>()
        return response.data
})

const initialState: DashboardState = {
    loading: true,
    dashboardData: {}
}

const DashboardSlice = createSlice({
    name: `${initialState}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getDashboardData.fulfilled, (state, action) =>{
            state.dashboardData = action.payload.body.data
            state.loading = false
        }).addCase(getDashboardData.pending, (state) => {
            state.loading = true
        })
    },
})

export default DashboardSlice.reducer