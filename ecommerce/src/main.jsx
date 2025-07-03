import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductListContainer from "./components/ProductListContainer.jsx";
import {Provider} from "react-redux";
import store from "./stores/stores.js";
import ProductAddPresenter from "./components/ProductAddPresenter.jsx";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StrictMode>
            <ProductListContainer />
            <ProductAddPresenter />
        </StrictMode>
    </Provider>
)
