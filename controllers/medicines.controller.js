
const { db } = require('../utils/connectDB');
const medicinesCollection = db.collection("medicines");

// getting all the medicines
module.exports.getMedicines = async (req, res) => {
    try {
        const medicines = await medicinesCollection.find().toArray();
        const medNum = medicines.length; // Corrected this line to get the length of medicines
        res.status(200).json({
            success: true,
            message: `${medNum} medicines found successfully`, // Corrected this line to properly format the message
            data: medicines
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        });
    }
}

// adding new medicines
module.exports.postMedicine = async (req, res) => {
    try {
        const {
            medicine_name,
            generic_name,
            company_name,
            alt_medicines,
            description,
            doses,
            side_effects,
            actions,
            interactions,
            uses,
            sold,
            warnings,
        } = req.body;

        // Validate required fields
        if (!medicine_name || !generic_name || !company_name || !alt_medicines) {
            return res.status(400).json({
                success: false,
                message: "Medicine name, generic name, and company name are required fields.",
            });
        }


        // Check if a medicine with the same name already exists
        const existingMedicine = await medicine.findOne({ medicine_name });
        if (existingMedicine) {
            return res.status(409).json({
                success: false,
                message: "A medicine with this name already exists.",
            });
        }

        // Create the new medicine object
        const newMedicine = {
            medicine_name,
            generic_name,
            company_name,
            alt_medicines: alt_medicines || [], // Default to empty array if not provided
            description: description || "", // Default to empty string if not provided
            doses: doses || "", // Default to empty string if not provided
            side_effects: side_effects || [], // Default to empty array if not provided
            actions: actions || "", // Default to empty string if not provided
            interactions: interactions || [], // Default to empty array if not provided
            uses: uses || [], // Default to empty array if not provided
            sold: sold || 0, // Default sold is 0 if not provided
            warnings: warnings || [], // Default to empty array if not provided
            createdAt: new Date().toISOString().split('T')[0], // Add a timestamp for when the medicine was created
        };

        // Insert the new medicine into the collection
        const result = await medicine.insertOne(newMedicine);

        res.status(201).json({
            success: true,
            message: "New medicine added successfully",
            data: newMedicine, // Return the inserted document
        });
    } catch (error) {
        console.error("Error adding new medicine:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

//* getting medicines by name, company, generic------------
module.exports.searchMedicines = async (req, res) => {

    const term = req.params.term;
    const limit = parseInt(req.query.limit, 10) || 10; // Default limit is 10 if not specified
    const regex = new RegExp(term, 'i'); // Case-insensitive regex for the term

    try {
        const query = {
            $or: [
                { medicine_name: { $regex: regex } },
                { generic_name: { $regex: regex } },
                { company_name: { $regex: regex } }
            ]
        };

        const medicines = await medicine.find(query).limit(limit).toArray();

        const medNum = medicines.length;

        res.status(200).json({
            success: true,
            message: `${medNum} medicines found successfully`,
            data: medicines
        });
    } catch (error) {
        console.error('Error fetching medicines:', error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        });
    }

}

//* getting top 20 medicines by sold-----------------------
module.exports.getTopMedicines = async (req, res) => {
    try {
        const topMedicines = await medicine.find().sort({ sold: -1 }).limit(20).toArray();
        const medNum = topMedicines.length; // Corrected this line to get the length of medicines
        res.status(200).json({
            success: true,
            message: `${medNum} medicines found successfully`, // Corrected this line to properly format the message
            data: topMedicines
        });
    }
    catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

//* getting latest medicines on lastSoldDate -----------------
module.exports.getLatestSoldMedicines = async (req, res) => {
    try {
        const latestMedicines = await medicine
            .find({ lastSoldDate: { $exists: true } }) // Only include medicines with the lastSoldDate field
            .sort({ lastSoldDate: -1 }) // Sort by lastSoldDate in descending order (latest first)
            .limit(20) // Limit the results to the latest 20 medicines
            .toArray();

        const medNum = latestMedicines.length;

        res.status(200).json({
            success: true,
            message: `${medNum} latest sold medicines found successfully`,
            data: latestMedicines,
        });
    } catch (error) {
        console.error("Error fetching latest sold medicines:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}