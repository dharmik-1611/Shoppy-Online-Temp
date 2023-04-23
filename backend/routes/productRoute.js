const express = require('express');
const { getAllProducts, createProduct, updateProducts, deleteProduct, getProductsDetail, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
router.route('/products').get(getAllProducts);//users
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);//admin
router.route('/admin/products/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProducts).delete(isAuthenticatedUser, deleteProduct);//admin
router.route('/products/:id').get(getProductsDetail);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);
module.exports = router; 