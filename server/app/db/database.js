//~import module
import { MongoClient } from "mongodb";
//~ Import Debug 
import debug from 'debug'; 
const logger = debug('Pool');


//~connexion 
const url = process.env.CONNEXION_STRING;
const client = new MongoClient(url);

client.connect()
    .then(() => logger('DB connected'))
    .catch((err) => logger('DB connection failed', err));

export default client ;