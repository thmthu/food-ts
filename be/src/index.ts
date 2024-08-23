import 'reflect-metadata';
import express from 'express';
import loader from './loaders';

async function startServer() {
    const app = express();

    console.log('index1')
    await loader({ expressApp: app });

    app.listen(process.env.MANAGE_PORT, () => {
        console.log(`
      ################################################
      🛡️  Server listening on port: ${process.env.MANAGE_PORT} 🛡️
      ################################################
    `);
    }).on('error', err => {
        console.log(err);
        process.exit(1);
    });

}

startServer();