import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goodsService from './goodsService'

const initialState = {
    goods: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//create goods

export const createGoods = createAsyncThunk('goods/create', async (goodData, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goodsService.createGoods(goodData, token)
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message) 
    }
}) 

// Get goals
export const getGoods = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goodsService.getGoods(token)
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message) 
    }
})

//Delete good
export const deleteGood = createAsyncThunk('goods/delete', async (id, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goodsService.deleteGood(id, token)
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message) 
    }
}) 

export const goodsSlice = createSlice({
    name:'good',
    initialState,
    reducers: {
        reset: (state) => initialState
    }, extraReducers: (builder) => {
        builder
            .addCase(createGoods.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoods.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goods.push(action.payload)
            })
            .addCase(createGoods.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoods.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoods.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goods = action.payload
            })
            .addCase(getGoods.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGood.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGood.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goods = state.goods.filter((good) => good._id !== action.payload.id)
            })
            .addCase(deleteGood.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = goodsSlice.actions
export default goodsSlice.reducer