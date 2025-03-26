import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Connection from './utils/db.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/AuthRoutes.js'; 
import ProductRoutes from './routes/ProductRoutes.js'
import ProductItemRoutes from './routes/ProductItemRoutes.js'

dotenv.config({ path: '.env' });  

const app = express();
const port = process.env.WEB_PORT;
const projectName = process.env.PROJECT_NAME;

Connection()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get('/', (req, res) => {
  res.send("HELLO");
});

app.use('/api/auth', AuthRoutes);
app.use('/api/product', ProductRoutes);
app.use('/api/product/item', ProductItemRoutes);

app.listen(port, () => {
  console.log(`Compiled successfully!`);
  console.log(`You can now view ${projectName} in the postman or browser.`);
  console.log(`  `);
  console.log(`  Local: http://localhost:${port}`);
  console.log(`  `);
});

