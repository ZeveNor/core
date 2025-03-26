import ProductItem from '../../schema/productItem.js';

const updateProductItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productItem_name,
      product_id,
      description,
      productItem_id,
      productItem_pass,
      productItem_email,
      productItem_mail_pass,
      productItem_recovery_pass,
      productItem_note,
      max_participants,
    } = req.body;

    const updatedProductItem = await ProductItem.findByIdAndUpdate(
      id,
      {
        productItem_name,
        product_id,
        description,
        productItem_id,
        productItem_pass,
        productItem_email,
        productItem_mail_pass,
        productItem_recovery_pass,
        productItem_note,
        max_participants,
      },
      { new: true }
    );
    res.status(200).json({ message: 'ProductItem updated successfully', productItem: updatedProductItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating ProductItem', error });
  }
};

export default updateProductItem;