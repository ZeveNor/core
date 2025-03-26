import ProductItem from '../../schema/productItem.js';

const removeParticipant = async (req, res) => {
  try {
    const { id } = req.params; 
    const { userId } = req.body; 

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const productItem = await ProductItem.findById(id);

    if (!productItem) {
      return res.status(404).json({ message: 'ProductItem not found' });
    }

    if (!productItem.participants.includes(userId)) {
      return res.status(400).json({ message: 'User is not a participant' });
    }

    productItem.participants = productItem.participants.filter(participant => participant !== userId);
    productItem.participants_count = productItem.participants.length;

    await productItem.save();

    res.status(200).json({ message: 'User removed successfully', productItem });
  } catch (error) {
    res.status(500).json({ message: 'Error removing participant', error: error.message });
  }
};

export default removeParticipant;
