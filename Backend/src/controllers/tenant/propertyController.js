import mongoose from 'mongoose';
import PropertyModel from '../../models/Property.js';

//  Get properties assigned to current tenant
export const rentedproperties = async (req, res) => {

  try {
    const properties = await PropertyModel.find({ tenantIds: new mongoose.Types.ObjectId(req.user.id) })
                              .populate('landlordId' ,'-password -assignedProperties')
    res.json({ success: true, properties });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const rentApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id || !userId) {
      return res.status(400).json({ message: 'User ID and Property ID are required' });
    }

    // Check if the user is already a tenant
    const alreadyTenant = await PropertyModel.findOne({
      _id: id,
      tenantIds: new mongoose.Types.ObjectId(userId)
    });

    if (alreadyTenant) {
      return res.status(401).json({ message: 'User already rented the property' });
    }
    // Check if the user is  in pending
    const alreadyPending = await PropertyModel.findOne({
      _id: id,
      pending: new mongoose.Types.ObjectId(userId)
    });

    if (alreadyPending) {
      return res.status(409).json({ message: 'User already applied and is pending approval' });
    }

    // Add to pending array 
    await PropertyModel.updateOne(
      { _id: id },
      { $addToSet: { pending: new mongoose.Types.ObjectId(userId) } }
    );

    return res.status(201).json({ message: 'Applied successfully' });

  } catch (err) {
    console.error('Error in rentApplication:', err);
    res.status(500).json({ message: err.message });
  }
};



export const propertiesWhreGotrejewctedOrApplied = async (req,res) => { //console.log('hiiiiiiiiiiii');

    try {
        // console.log('comming');
          const userId = new mongoose.Types.ObjectId(req.user.id);
          const[rejected,pending]= await Promise.all([
            (PropertyModel.find({ rejected: userId }).populate('landlordId' ,'-password -assignedProperties')),
            (PropertyModel.find({  pending: userId }).populate('landlordId' ,'-password -assignedProperties')),
          ]);
          // console.log(pending,rejected);
          
    res.json({ success: true, properties:{rejected,pending} });

    } catch (error) {
      console.log(error);
      
       res.status(500).json({ message: error.message });
    }
}
