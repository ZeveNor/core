import ProductItem from '../../schema/productItem.js'

const addProductItem = async (req, res) => {
  try {
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
    
    const newProductItem = new ProductItem({
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
    });
    await newProductItem.save();
    res.status(201).json({ message: 'ProductItem added successfully', productItem: newProductItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding ProductItem', error });
  }
};

export default addProductItem;