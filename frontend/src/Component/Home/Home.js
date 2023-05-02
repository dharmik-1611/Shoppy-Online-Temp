import { React, useEffect } from 'react'
import Product from './Product.js';
import './Home.css';
import MetaData from '../Layout/MetaData.js';
import { getProduct } from '../../Actions/productAction.js';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Layout/Loader/Loader.js';
const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, product, productCount } = useSelector(state => state.product);
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="Shoppy Online" />
                    <div className='banner'>
                        <p>Welcome to Shoppy Online</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <a href="#container">
                            <button>
                                Scroll
                            </button>
                        </a>
                    </div>
                    <h2 className='homeHeading'>Featured Products </h2>
                    <div className="container" id="container">
                        {Array.isArray(product) && product.map((product) => <Product product={product} />)}
                    </div>
                </>
            )}
        </>
    )
}
export default Home;