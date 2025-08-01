import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  description:{type:String,default:''},
  rent:{type:Number,required:true},
  medias:[{type:String,required:true}],
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tenantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // same to accepted in property application approved
  pending:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  rejected:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isRented:{type:Boolean,default:false},
}, { timestamps: true });

 const PropertyModel = mongoose.model('Property', propertySchema);


export default PropertyModel;