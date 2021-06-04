const mongoose = require("mongoose");

const mongo = mongoose.connect(`mongodb+srv://EngFor:Energia123@indicouganhou.ewhv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Conectado ao banco de dados!"));

module.exports = mongo;