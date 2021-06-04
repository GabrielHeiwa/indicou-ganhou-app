require("./DB_connection.js");
const Model = require("./models/indicacao_model.js");

module.exports = async function save(indication_data) {
    // Create model.
    const model = await Model.create(indication_data);

    // Try to save in the database.
    try {
        await model.save();

    } catch (err) {
        console.error(err);

    };
};
