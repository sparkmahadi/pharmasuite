const { db } = require('../utils/connectDB');
const medicinesCollection = db.collection("medicines");

//* getting a specific medicine by id-------------------
module.exports.getMedicineById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const SingleMedicine = await medicine.findOne(query);
        if (!SingleMedicine) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Medicine retrieved successfully",
            data: SingleMedicine,
        });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


//* updating a specific medicine by id
module.exports.updateMedicineById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const { ...fields } = req.body;
        const filter = { _id: new ObjectId(id) };
        const updatedBlog = { $set: { ...fields } };
        const result = await medicine.updateOne(filter, updatedBlog);
        res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//* deleting a medicine by id-------------
    module.exports.deleteMedicineById = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Validate the ID format
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid medicine ID format.",
        });
      }
  
      const filter = { _id: new ObjectId(id) };
      const result = await medicine.deleteOne(filter);
  
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Medicine not found.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Medicine deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting medicine:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };
  

//* updating or adding lastSoldDate--------------------------
    module.exports.updateLastSoldDate = async (req, res) => {
    try {
        const id = req.params.id;
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

        const filter = { _id: new ObjectId(id) };
        const update = { $set: { lastSoldDate: currentDate } }; // Set or update the lastSoldDate field

        const result = await medicine.updateOne(filter, update);

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found',
            });
        }

        const updatedMedicine = await medicine.findOne(filter); // Fetch the updated document

        res.status(200).json({
            success: true,
            message: `lastSoldDate field updated successfully`,
            data: updatedMedicine, // Return the updated medicine
        });
    } catch (error) {
        console.error('Error updating lastSoldDate field:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//* updating amountSold of specific medicine by id---------------
    module.exports.updateSoldAmount = async (req, res) => {
    try {
        const id = req.params.id;
        const { amountSold } = req.body;

        // Validate the amountSold value
        if (!amountSold || typeof amountSold !== 'number') {
            return res.status(400).json({
                success: false,
                message: "'amountSold' must be a number",
            });
        }

        const filter = { _id: new ObjectId(id) };
        const update = { $inc: { sold: amountSold } }; // Increment the existing 'sold' field by the amountSold

        const result = await medicine.updateOne(filter, update);

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found',
            });
        }

        const updatedMedicine = await medicine.findOne(filter); // Fetch the updated document

        res.status(200).json({
            success: true,
            message: `Medicine sold field updated successfully`,
            data: updatedMedicine,  // Return the updated medicine
        });
    } catch (error) {
        console.error('Error updating sold field:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//* deleting any specific field of a specific medicine------------------
    module.exports.deleteFieldsById = async (req, res) => {
    const { id, field } = req.params;
  
    try {
      const filter = { _id: new ObjectId(id) };
      const update = { $unset: { [field]: "" } }; // Unset the field
  
      const updateResult = await medicine.updateOne(filter, update);
  
      if (updateResult.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Medicine not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: `Field '${field}' deleted successfully`,
      });
    } catch (error) {
      console.error('Error deleting field from medicine:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong from delete field',
      });
    }
  };