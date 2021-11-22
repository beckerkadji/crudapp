import mongoose from 'mongoose';
import config from 'config';

async function connect(){
    const dbUri = config.get<string>('dbUri');

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