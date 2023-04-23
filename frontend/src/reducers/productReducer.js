import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from '../constants/productConstants';
export const ProductReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                productCount: action.payload.productCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                product: action.payload,

            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};