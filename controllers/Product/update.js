import Product from '../../schema/product.js'

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, description, subscription_type } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { product_name, description, subscription_type },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export default updateProduct;