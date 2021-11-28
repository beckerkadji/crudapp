import express, { urlencoded } from 'express';
import connect from './utils/connect';
import appLogger from './middlewares/appLogger';
import path from 'path';
import addUser from './routes/index';
import * as dotenv from 'dotenv';
import axios from 'axios';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from './swagger.json';

dotenv.config();

const app:express.Application = express();

const port = <string>process.env.PORT;
const hostname = <string>process.env.HOSTNAME;
axios.defaults.baseURL = `http://${hostname}:${port}/omega/`;

//setting the view engine
app.set('view engine', 'ejs');

//seting the root path for views directory
app.set('views', path.join(__dirname,'views'));

//load assets
app.use('/css', express.static(path.join(__dirname, "assets/css")));
app.use('/js', express.static(path.join(__dirname, "assets/js")));
app.use('/img', express.static(path.join(__dirname, "assets/img")))

// to configure middleware for all request
app.use(appLogger);

//to configure server to receive formdata
app.use(express.json());
app.use(urlencoded({extended:true}));


app.get('/', (req:express.Request, res:express.Response) => {
   res.status(200).send(`<h3 style="font-family: Lato, sans-serif; color: cadetblue">Welcome to expressJs server </h3>`);
});

//router configuration
app.use('/omega', addUser)

app.listen(port, async () => {
    console.log(`Server is started at http://${hostname}:${port}`);

    await connect();
});

