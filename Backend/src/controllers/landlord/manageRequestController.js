
import MaintenanceModel from "../../models/MaintenanceRequest.js";


// Landlord gets all requests for their properties
export const getLandlordRequests = async (req, res) => {
  try {
    const requests = await MaintenanceModel.find({ landlordId: req.user._id })
      .populate("tenantId", "name email")
      .populate("propertyId", "name address")
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch requests", error: err.message });
  }
};

// ✅ Landlord updates status and optional message
export const updateRequestStatus = async (req, res) => {  console.log('comming');
  try {
  
    const { status, message } = req.body;

    const request = await MaintenanceModel.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.landlordId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    request.status = status;
    if (message) request.message = `Landlord: ${message}`;

    await request.save();
    res.json({ message: "Request updated successfully", request });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update request", error: err.message });
  }
};

// ✅ Get single request by ID (with full info)
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
