import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "../features/productSlice";
import addproductsReducer from "../features/productAddSlice";

const stores = configureStore({
    reducer: {
        products: productsReducer,
        addproduct: addproductsReducer,
    }
})

export default stores;