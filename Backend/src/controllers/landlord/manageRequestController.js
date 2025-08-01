import mongoose from "mongoose";
import MaintenanceModel from "../../models/MaintenanceRequest.js";


// all requests details...
export const getLandlordRequests = async (req, res) => {
  try {
    const landlordId = req.user.id;

    const requests = await MaintenanceModel.aggregate([
      // Match requests for this landlord
      {
        $match: {
          landlordId: new mongoose.Types.ObjectId(landlordId)
        }
      },
      
      // Populate tenant details
      {
        $lookup: {
          from: 'users',
          localField: 'tenantId',
          foreignField: '_id',
          as: 'tenant'
        }
      },
      
      // Unwind tenant array
      {
        $unwind: '$tenant'
      },
      
      // Sort by creation date (newest first)
      {
        $sort: { createdAt: -1 }
      },
      
      // Group by property
      {
        $group: {
          _id: '$propertyId',
          requests: {
            $push: {
              _id: '$_id',
              tenant: {
                _id: '$tenant._id',
                name: '$tenant.name',
                email: '$tenant.email',
                phone: '$tenant.phone'
              },
              category: '$category',
              urgency: '$urgency',
              description: '$description',
              medias: '$medias',
              messages: '$messages',
              status: '$status',
              createdAt: '$createdAt',
              updatedAt: '$updatedAt'
            }
          },
          totalRequests: { $sum: 1 },
          pendingRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          inProgressRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'in progress'] }, 1, 0] }
          },
          completedRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          highUrgencyCount: {
            $sum: { $cond: [{ $eq: ['$urgency', 'high'] }, 1, 0] }
          },
          latestRequest: { $max: '$createdAt' }
        }
      },
      
      // Sort properties by latest request date (most recent first)
      {
        $sort: { latestRequest: -1 }
      },
      
      // Populate property details
      {
        $lookup: {
          from: 'properties',
          localField: '_id',
          foreignField: '_id',
          as: 'property'
        }
      },
      
      // Unwind property array
      {
        $unwind: '$property'
      },
      
      // Final projection with clean structure
      {
        $project: {
          propertyId: '$_id',
          property: {
            _id: '$property._id',
            title: '$property.title',
            address: '$property.address',
            medias: '$property.medias'
          },
          requests: 1,
          summary: {
            totalRequests: '$totalRequests',
            pendingRequests: '$pendingRequests',
            inProgressRequests: '$inProgressRequests',
            completedRequests: '$completedRequests',
            highUrgencyCount: '$highUrgencyCount'
          },
          latestRequest: 1
        }
      }
    ]);

    res.json({ success: true, data: requests });
  } catch (err) {
    console.error('Error fetching detailed landlord requests:', err);
    res.status(500).json({ 
      message: 'Failed to fetch maintenance requests', 
      error: err.message 
    });
  }
};



export const updateRequestStatus = async (req, res) => { 
  try {
  
    const { status, message } = req.body;

    const request = await MaintenanceModel.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.landlordId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    request.status = status;
    if (message) request.messages.push(`Landlord: ${message}`) 

    await request.save();
    res.json({ message: "Request updated successfully", request });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update request", error: err.message });
  }
};

//  Get single request by ID (with full info)
export const getRequestById = async (req, res) => {
  try {
    const request = await MaintenanceModel.findById(req.params.id)
      .populate("tenantId", "name email")
      .populate("propertyId", "name address");

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.landlordId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json({ success: true, request });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve request", error: err.message });
  }
};
