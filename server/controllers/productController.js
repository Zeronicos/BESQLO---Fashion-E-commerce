require('../models/database');
const Category = require('../models/category');
const Product = require('../models/product');

/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Product.find({}).sort({ _id: -1 }).limit(limitNumber);
        const men = await Product.find({ category: 'Men' }).limit(limitNumber);
        const women = await Product.find({ category: 'Women' }).limit(limitNumber);
        const kids = await Product.find({ category: 'Kids' }).limit(limitNumber);
        const casual = await Product.find({ category: 'Casual' }).limit(limitNumber);
        const sport = await Product.find({ category: 'Sport' }).limit(limitNumber);

        const clothes = { latest, men, women, kids, casual, sport };

        res.render('index', { title: 'BESTQLO - Homepage', categories, clothes });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error in server" });
    }
}



exports.exploreCategories = async (req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'BESTQLO - Categories', categories });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error in server" });
    }
}

/**
 * GET /categories/:id
 * Categories By Id
 */

exports.exploreCategoriesById = async (req, res) => {
    try {

        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoriesById = await Product.find({ 'category': categoryId }).limit(limitNumber);
        res.render('categories', { title: 'BESTQLO - Categories', categoriesById });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error in server" });
    }
}

/**
 * GET /product/:id
 * Product
 */

exports.exploreProduct = async (req, res) => {
    try {
        let productId = req.params.id;

        const product = await Product.findById(productId);

        res.render('product', { title: 'BESTQLO - Product', product });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error in server" });
    }
}

/**
 * POST /search
 * Search
 */

exports.searchProduct = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let product = await Product.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });

        res.render('search', { title: 'BESQLO - Search', product });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error in server" });
    }
}

/**
 * GET /explore-latest
 * Explore Latest
 */

exports.exploreLatest = async (req, res) => {
    try {
        const limitNumber = 20;
        const product = await Product.find({}).sort({ _id: -1 }).limit(limitNumber);

        res.render('explore-latest', { title: 'BESTQLO - Explore Latest', product });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error in server" });
    }
}

/**
 * GET /explore-random
 * Explore Random
 */

exports.exploreRandom = async (req, res) => {
    Product.aggregate([
        { $sample: { size: 20 } }
    ])
        .then(products => {
            res.render('explore-random', { products });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error retrieving products");
        });
}

/**
 * GET /cart
 * Cart
 */

exports.exploreCart = async (req, res) => {
    try {

        res.render('cart', { title: 'BESTQLO - Cart' });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error in server" });
    }
}

/**
 * GET /wishlist
 * Wishlist
 */

exports.exploreWishlist = async (req, res) => {
    try {
        res.render('wishlist', { title: 'BESTQLO - Wishlist' });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error in server" });
    }
}

/**
 * GET /Profile
 * Wishlist
 */

exports.exploreProfile = async (req, res) => {
    try {
        res.render('profile', { title: 'BESTQLO - Profile' });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error in server" });
    }
}



// async function insertDummyCategoryData() {
//     try {
//         await Category.insertMany([
//             {
//                 "name": "Men",
//                 "image": "man.jpg"
//             },
//             {
//                 "name": "Women",
//                 "image": "man.jpg"
//             },
//             {
//                 "name": "Kids",
//                 "image": "man.jpg"
//             },
//             {
//                 "name": "Casual",
//                 "image": "man.jpg"
//             },
//             {
//                 "name": "Sport",
//                 "image": "man.jpg"
//             },
//         ]);
//     } catch (error) {
//         console.log('err', + error);
//     }
// }

// insertDummyCategoryData();

async function insertDummyProductData() {
    try {
        await Product.insertMany([
            // {
            //     "name": "Cute Outfit",
            //     "category": "Kids",
            //     "description": "Casual & Sporty",
            //     "image": "product_13.png",
            //     "old_price": 399,
            //     "new_price": 199
            // }, {
            //     "name": "Cute Outfit",
            //     "category": "Kids",
            //     "description": "Casual & Sporty",
            //     "image": "product_33.png",
            //     "old_price": 399,
            //     "new_price": 199
            // },
            // {
            //     "name": "Cute Outfit",
            //     "category": "Kids",
            //     "description": "Casual & Sporty",
            //     "image": "product_11.png",
            //     "old_price": 399,
            //     "new_price": 199
            // },



        ]);
    } catch (error) {
        console.log('err', + error);
    }
}

insertDummyProductData();