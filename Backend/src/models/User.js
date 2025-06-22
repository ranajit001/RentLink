import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
        type: String,
        required: true 
        },
  email:{ 
        type: String,
        required: true,
        unique: true 
        },
  role:
        { type: String,
         enum: ['tenant', 'landlord'],
        required: true 
        },
  password:{ 
        type: String,
        required: true
        },
  contactInfo: {
        type: String
        },
  language: {
        type: String,
        default: 'english'
     },
        assignedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]

}, { timestamps: true });

 const UserModel = mongoose.model('User', userSchema);

 export default UserModel;


