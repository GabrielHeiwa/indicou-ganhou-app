import { MongoClient } from "mongodb";

const mongo = new MongoClient(`mongodb+srv://EngFor:Energia123@indicouganhou.ewhv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default (await mongo).connection