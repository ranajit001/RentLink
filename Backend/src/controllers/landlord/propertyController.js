import PropertyModel from '../../models/Property.js';
import UserModel from '../../models/User.js';

//  Add new property (Landlord only)
export const addProperty = async (req, res) => { 

  try {
    const { name, address, description,amount } = req.body;

    const data = await PropertyModel.findOne({name,landlordId: req.user._id,address})
    if(data) return res.status(409).json({message:'already exists',property:data})

    const property = new PropertyModel({
      name,
      address,
      amount,
      description,
      landlordId: req.user._id,
    });

    await property.save();
    res.status(201).json({ message: 'Property added', property });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add property', error: err.message });
  }
};

//  View all properties of landlord
export const getMyProperties = async (req, res) => {
  try {
    const properties = await PropertyModel.find({ landlordId: req.user._id });
    res.json({ success: true, properties });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties', error: err.message });
  }
};




//  Assign tenant to property
export const assignTenant = async (req, res) => {
  try {
    const { propertyId, email } = req.body;

    const user = await UserModel.findOne({email})
    if(!user) return res.status(400).json({message:'tenant not found'})

    const property = await PropertyModel.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.landlordId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
      if(property.tenantIds.includes(user._id))
          return res.status(400).json({message:'already assigned'});
    property.tenantIds.push(user._id); // support multiple tenants
    await property.save();

    res.json({ message: 'Tenant assigned successfully', property });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign tenant', error: err.message });
  }
};
