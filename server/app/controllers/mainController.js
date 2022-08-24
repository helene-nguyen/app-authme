//~ Import Debug 
import debug from 'debug'; 
const logger = debug('Controller');
//~ Import modules

async function renderHomePage(req,res) {
    try {
        res.json({
            message: `Welcome to auth API AuhtMe`,
            instruction: `You are here for only one reason : try to do your best to create a great authentication using NodeJS, Express, JWT`
        });
    } catch (err) {
        logger(err.message);
    }
};

export { renderHomePage };

