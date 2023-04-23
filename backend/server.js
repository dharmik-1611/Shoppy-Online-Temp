const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: "backend/config/config.env" });
const connectDatbase = require('./config/database');

//Handling Uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})
connectDatbase();
const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})
// console.log(youtube);
//Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down to the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})