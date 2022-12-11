import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}
const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const getProductDetail = createAsyncThunk(
  "ProductDetail/getProductDetail",
  async (touristRouteId: string, thunkApi) => {
    const { data } = await axios.get(`/touristRoutes/${touristRouteId}`);
    
    return data;
  }
);

//使用createSlice创建reducers
export const productDetailSlice = createSlice({
  name: "ProductDetail", //命名空间
  initialState, //初始数据
  reducers:{},
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
