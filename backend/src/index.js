require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server'); 
const { expressMiddleware } = require('@apollo/server/express4')
const typeDefs = require('./graphql/schemas/index.js')
const resolvers = require('./graphql/resolvers/index.js');
const cors = require('cors');
const bodyParser = require('body-parser')

const userRouter = require('./routes/userRoutes.js')
const employeeRouter = require('./routes/employeeRoutes.js')
const errorHandler = require('./middleware/errorHandler.js')
const SERVER_PORT = process.env.PORT || 3000;

// configure environment (based on current .env)
require('dotenv').config({ path: `.env`});


async function run() {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const mongoURI = process.env.MONGO_URI;
    console.log(mongoURI);
    await mongoose.connect(mongoURI);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Connected to database successfully.')

    app.get('/', (req, res) => {
        res.send('Welcome to Assignment 1');
    })

    app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

    // app.use('/api/v1/user', userRouter);
    // app.use('/api/v1/emp', employeeRouter);

    app.use(errorHandler);

    app.listen(SERVER_PORT, () => { console.log('Server is running...') });


  } finally {
    // await mongoose.disconnect();
  }
}

run().catch(console.dir); 

