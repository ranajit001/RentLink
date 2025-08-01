import PropertyModel from '../../models/Property.js';
import UserModel from '../../models/User.js';
import cloudinary from '../../configs/cloudinary.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';


export const addProperty = async (req, res) => { 

  try {  
    const { title, address, description,rent } = req.body; 
    

    const data = await PropertyModel.findOne({title,landlordId: req.user.id,address});
    if(data) return res.status(409).json({message:'already exists',property:data});

    const uploadPromis = req.files.map(async file=>{
      const uploadurls = await cloudinary.uploader.upload(file.path);
      fs.unlink(file.path);
      return uploadurls.secure_url
    })

    const medias = await Promise.all(uploadPromis)

    const property = new PropertyModel({
      title,
      address,
      rent,
      description,
      landlordId: new mongoose.Types.ObjectId(req.user.id),
      medias
    });

    await property.save();
    res.status(201).json({ message: 'Property added', property });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: 'Failed to add property', error: err.message });
  }
};


// View all properties of landlord
export const getMyProperties = async (req, res) => {
  try {
    const { search = '' } = req.query;

    const searchObj = {
      landlordId: new mongoose.Types.ObjectId(req.user.id),
    };

    if (search.trim()) {
      searchObj.$or = [
        { title: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const properties = await PropertyModel.aggregate([
      { $match: searchObj },

      // Populate tenantIds
      {
        $lookup: {
          from: 'users',
          localField: 'tenantIds',
          foreignField: '_id',
          as: 'tenantDetails',
        },
      },

      // Populate pending
      {
        $lookup: {
          from: 'users',
          localField: 'pending',
          foreignField: '_id',
          as: 'pendingDetails',
        },
      },

      // Populate rejected
      {
        $lookup: {
          from: 'users',
          localField: 'rejected',
          foreignField: '_id',
          as: 'rejectedDetails',
        },
      },

      // Optional: You can project only the fields you want
      // {
      //   $project: {
      //     title: 1,
      //     address: 1,
      //     rent: 1,
      //     tenantDetails: { name: 1, email: 1 },
      //     ...
      //   }
      // }
    ]);


    res.json({ success: true, properties });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch properties',
      error: err.message,
    });
  }
};






//  Assign or reject  tenant to property

export const rejectOrAssignTenant = async (req, res) => {
  try {
    let { propertyId, userId, action,email } = req.body;



    if (!propertyId || (!userId && !email) || !['assign', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Provide valid propertyId, userId, and action (assign or reject)' });
    }

if (email && !userId) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User with this email not found' });
  }
  userId = user._id;
}
 


    const property = await PropertyModel.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.landlordId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    property.pending = property.pending.filter(id => id.toString() !== userId.toString());

    if (action === 'assign') {
      if (property.tenantIds.some(id => id.toString() === userId.toString())) {
        return res.status(400).json({ message: 'User already assigned as tenant' });
      }

      property.tenantIds.push(userId);
            //also ad to the array of user
      await UserModel.updateOne({_id:userId},{ $addToSet: { assignedProperties: new mongoose.Types.ObjectId(propertyId) }})
    }

    if (action === 'reject') {
      if (property.rejected.some(id => id.toString() === userId.toString())) {
        return res.status(400).json({ message: 'User already rejected' });
      }

      property.rejected.push(userId);


    }

    await property.save();
    return res.status(200).json({ message: `Tenant ${action}ed successfully`, property });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
