import Product from '../../schema/product.js'

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const removedProduct = await Product.findByIdAndUpdate(
      id,
      { isdeleted: true, deleted_at: Date.now() },
      { new: true }
    );
    if (!removedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: removedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export default removeProduct;