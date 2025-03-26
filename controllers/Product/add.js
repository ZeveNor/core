import Product from '../../schema/product.js'

const addProduct = async (req, res) => {
  try {
    const { product_name, description, subscription_type } = req.body;
    const newProduct = new Product({ product_name, description, subscription_type });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

export default addProduct;