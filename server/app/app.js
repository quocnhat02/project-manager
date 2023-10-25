import express from 'express';
import cors from 'cors';
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes.js';
import { globalErrHandler } from '../middlewares/globalErrHandles.js';
import productRoutes from '../routes/productRoutes.js';
import categoryRoutes from '../routes/categoryRoutes.js';
import brandsRoutes from '../routes/brandRoutes.js';
import colorsRoutes from '../routes/colorRoutes.js';
import reviewRoutes from '../routes/reviewRoutes.js';
import orderRoutes from '../routes/orderRoutes.js';
import couponRoutes from '../routes/couponRoutes.js';

dotenv.config();

dbConnect();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productRoutes);
app.use('/api/v1/categories/', categoryRoutes);
app.use('/api/v1/brands/', brandsRoutes);
app.use('/api/v1/colors/', colorsRoutes);
app.use('/api/v1/reviews/', reviewRoutes);
app.use('/api/v1/orders/', orderRoutes);
app.use('/api/v1/coupons/', couponRoutes);

app.use(globalErrHandler);
// app.use(notFound);

export default app;

//2etCKxCSLy7lUV7f
