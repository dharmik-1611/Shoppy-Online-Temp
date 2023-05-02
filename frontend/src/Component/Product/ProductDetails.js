import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../Actions/productAction';
const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);
    console.log('Product details in state:', product);
    useEffect(() => {

        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    return (
        <>
            <div className='ProductDetails'>
                <Carousel>
                    {product && Array.isArray(product.images) && product.images.map((item, i) => (
                        <img className="CarouselImage" key={i}
                            src={item.url}
                            alt={`${i} Slide`}
                        />
                    ))}

                </Carousel>
            </div>
        </>
    )
}

export default ProductDetails;
