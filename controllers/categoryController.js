const { collection, getDocs, doc, setDoc, getDoc } = require('firebase/firestore');
const firestore = require('../services/firebaseService');

const getCategoryRef = (categoryName) => doc(firestore, 'categories', categoryName);

const getAllCategories = async (req, res) => {
  try {
    const categoriesSnapshot = await getDocs(collection(firestore, 'categories'));
    const categories = categoriesSnapshot.docs.map((doc) => doc.id);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const categoryRef = getCategoryRef(categoryName);
    const categoryDoc = await getDoc(categoryRef);

    if (categoryDoc.exists()) {
      const productsCollectionRef = collection(categoryDoc.ref, 'products');
      const productsSnapshot = await getDocs(productsCollectionRef);
      const productsData = productsSnapshot.docs.map((productDoc) => productDoc.data());

      const categoryData = {
        products: productsData,
      };

      res.json(categoryData);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error fetching single category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const newCategoryRef = getCategoryRef(category);
    await setDoc(newCategoryRef, {});

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Implement updateCategory and deleteCategory as needed

module.exports = { getAllCategories, createCategory, getSingleCategory /* updateCategory, deleteCategory */ };
