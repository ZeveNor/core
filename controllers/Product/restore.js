import Product from '../../schema/product.js'

const restoreProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const restoredProduct = await Product.findByIdAndUpdate(
      id,
      { isdeleted: false, deleted_at: null },
      { new: true });
    if (!restoredProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: restoredProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export default restoreProduct;