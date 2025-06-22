import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  amount:{type:Number,required:true},
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tenantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

 const PropertyModel = mongoose.model('Property', propertySchema);


export default PropertyModel;