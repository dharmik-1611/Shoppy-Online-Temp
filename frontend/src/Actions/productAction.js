import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST } from '../constants/productConstants';
import axios from 'axios';
export const getProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        const { data } = await axios.get('/api/v1/products');
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: {
                product: data.product,
                productCount: data.productCount
            },
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/products/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        });
        console.log('Product details fetched successfully:', data.product);
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        console.log('Error fetching product details:', error.response.data.message);
    }
};

//clearing Errors
export const clearErrors = async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}