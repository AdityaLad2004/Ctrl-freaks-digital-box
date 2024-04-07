import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://atharvmandpe2:Athu234@cluster0.enfsd50.mongodb.net/complaintsDB', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log("DB connected");
    } catch (error) {
        throw new Error("Error to connect to db");
    }
}



export default connect;