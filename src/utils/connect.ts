import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

async function connect(){
    const dbUri = <string>process.env.DATABASE;

   try{
    const con = await mongoose.connect(dbUri);
    console.log(`Database connected: ${con.connection.host}`);
   }
   catch(error){
       console.error("Could not connect to db");
       process.exit(1);
   }
}

export default connect;