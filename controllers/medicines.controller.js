
const { db } = require('../utils/connectDB');
const medicinesCollection = db.collection("medicines");

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