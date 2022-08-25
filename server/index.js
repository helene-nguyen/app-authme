//~ Import Dotenv 
import 'dotenv/config';

//~ Import Express 
import express from 'express'; 
const app = express(); 
//! export for test JEST
export { app };

//~ Import modules
import { router } from './app/routes/index.js';
import { ErrorApi } from './app/services/errorHandler.js';

//~ Protect API
import helmet from 'helmet';
app.use(helmet());

//~ IMPORTATION SWAGGER DOCS
// import { specs, serve, setup, cssOptions} from './app/swaggerDocs/swaggerDocs.js';
// app.use('/api-docs', serve, setup(specs, cssOptions));

//~ Import Debug 
import debug from 'debug'; 
const logger = debug('EntryPoint');

//~ Encoding
//accept Content-type: application/json
app.use(express.json());
// accept Content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({
extended: true
}));

//~ Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
    next();
});

//If you have your node.js behind a proxy and are using secure: true, you need to set 'trust proxy' in express
app.set('trust proxy', 1)
// trust first proxy if deploy Heroku

//~ Session
import session from 'express-session';
app.use(session({
    saveUninitialized: true,
    resave: true,
    proxy: true,
    secret: process.env.SESSION_SECRET,
    cookie: { 
        httpOnly:true,
        secure : true,
        sameSite: 'lax', // or 'strict'
        maxAge: 24 * 60 * 60 * 1000 //24 hours
        //expires : new Date(Date.now() + 60 * 60 * 1000) //1 hour
        }
}));

//~ Router
app.use(router);

//~ Error 404 NOT Found
app.use((req, res)=>{
    throw new ErrorApi(`Page Not Found !`, req, res, 404);
});


//~ Launch Server 
if (process.env.NODE_ENV !== 'test') {
    
    const PORT = process.env.PORT ?? 3000; 
     
    app.listen(PORT, () => { 
    logger(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`); 
    });
}

