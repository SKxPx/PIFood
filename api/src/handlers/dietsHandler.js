const getAllDiet = require("../controllers/dietsController");

const getDietsHandler = async (req, res) => {
  try {
    const response = await getAllDiet();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDietsHandler;
