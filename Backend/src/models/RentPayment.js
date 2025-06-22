import mongoose from 'mongoose';

const rentPaymentSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'pending', 'late'], default: 'pending' },
  paidAt: { type: Date }
}, { timestamps: true });


const RentModel = mongoose.model('RentPayment', rentPaymentSchema);

export default RentModel;

