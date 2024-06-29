import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "./reducer/cartreducer";
export default configureStore({
    reducer: {
        cart: cartreducer

    }
})