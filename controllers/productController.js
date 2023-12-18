const {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} = require('firebase/firestore');

const firestore = require('../services/firebaseService');

const getProductCollectionRef = (category) =>
  collection(firestore, 'categories', category, 'products');

const getAllProducts = async (req, res) => {
  try {
    const categoriesSnapshot = await getDocs(collection(firestore, 'categories'));
    const products = [];

    for (const categoryDoc of categoriesSnapshot.docs) {
      const category = categoryDoc.id;
      const productsRef = getProductCollectionRef(category);
      const productsSnapshot = await getDocs(productsRef);
      const categoryProducts = productsSnapshot.docs.map((productDoc) =>
        productDoc.data()
      );
      products.push({
        category,
        products: categoryProducts,
      });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { category, product_id } = req.params;
    const productRef = doc(
      firestore,
      'categories',
      category,
      'products',
      product_id
    );
    const productDoc = await getDoc(productRef);

    if (productDoc.exists()) {
      const productData = productDoc.data();
      res.json({ category, ...productData });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching single product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllProductsFromFirestore = async () => {
  try {
    const categoriesSnapshot = await getDocs(collection(firestore, 'categories'));
    const products = [];

    for (const categoryDoc of categoriesSnapshot.docs) {
      const category = categoryDoc.data;
      const productsRef = getProductCollectionRef(category);
      const productsSnapshot = await getDocs(productsRef);

      const categoryProducts = productsSnapshot.docs.map((productDoc) =>
        productDoc.data()
      );
      products.push({
        category,
        products: categoryProducts,
      });
    }

    return products;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    throw new Error('Error fetching products from Firestore');
  }
};

const createProduct = async (req, res) => {
  try {
    const { category, product } = req.body;
    const productsRef = getProductCollectionRef(category);
    const newProductRef = doc(productsRef, product.catalog);
    await setDoc(newProductRef, product);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getAllProductsFromFirestore,
  getSingleProduct,
};
