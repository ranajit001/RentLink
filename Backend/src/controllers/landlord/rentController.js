import RentModel from '../../models/RentPayment.js';
import mongoose from 'mongoose';


//for every peroperty getting details sepersatly based on month and year
export const getLandlordRentRecords = async (req, res) => { 
  try {
    const landlordId = new mongoose.Types.ObjectId(req.user.id);
    const{year,month} = req.query;

    const y = parseInt(year || 2025);
    const m = parseInt(month || 7) - 1; // Month is 0-indexed in JS
    
    const start = new Date(y, m, 5);            
    const end = new Date(y, m, 6);              

    const report = await RentModel.aggregate([{
      $match:{dueDate: {$gte: start,$lt: end},landlordId:landlordId}
    },{
      $lookup:{
        from:'users',
        localField:'tenantId',
        foreignField:'_id',
        as:'tenant'
      }
    },{
      $unwind:'$tenant'
    },{
      $lookup:{
        from:'properties',
        localField:'propertyId',
        foreignField:'_id',
        as:'property',
      }
    },{
      $unwind:'$property'
    },{
      $group:{
        _id:'$property._id',
        rent: { $first:'$property.rent'},
      title: { $first: '$property.title' }, // hrere i am using $first because here
      address: { $first: '$property.address' } ,   //  i have more then 1 document for every property with seperate tenents
        tenants:{
          $push:{ 
            name:'$tenant.name',
            contactInfo:'$tenant.contactInfo',
            email:'$tenant.email',
            status: '$status',
            dueDate: '$dueDate',
            paidAt: '$paidAt'
          },
        },
        
        totalExpectedIncome:{ $sum: '$rent' },
        actualincome : {$sum:{
                            $cond:[{$eq:['$status','paid']} , '$rent' , 0]  //cond:{[operation[conditon,value]},value if true , value if false]
                              }
                            }
      }
    }
  ])


    res.json(report );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



