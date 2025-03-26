import ProductItem from '../../schema/productItem.js';

const removeProductItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductItem = await ProductItem.findByIdAndUpdate(
      id,
      { isdeleted: false, deleted_at: null },
      { new: true }
    );
    res.status(200).json({ message: 'ProductItem updated successfully', productItem: updatedProductItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating ProductItem', error });
  }
};

export default removeProductItem;