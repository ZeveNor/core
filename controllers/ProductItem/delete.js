import ProductItem from '../../schema/productItem.js'

const deleteProductItem = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'ProductItem deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ProductItem', error });
  }
};

export default deleteProductItem;