import { model, Schema } from "mongoose";
import { Product } from "./products.interface";

const DimensionsSchema = new Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
});

const ReviewSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const MetaSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: { type: String, required: true },
  qrCode: { type: String, required: true },
});

const productSchema = new Schema<Product>({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["beauty", "electronics", "fashion"],
    required: true,
  },
  price: { type: Number, min: 0, required: true },
  discountPercentage: { type: Number, min: 0, max: 100 },
  rating: { type: Number, min: 0, max: 5 },
  stock: { type: Number, min: 0 },
  tags: [{ type: String }],
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  weight: { type: Number, min: 0 },
  dimensions: { type: DimensionsSchema, required: true },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: {
    type: String,
    enum: ["In Stock", "Low Stock", "Out of Stock"],
  },
  reviews: [ReviewSchema],
  returnPolicy: String,
  minimumOrderQuantity: { type: Number, min: 1 },
  meta: { type: MetaSchema, required: true },
  images: [{ type: String }],
  thumbnail: { type: String, required: true },
});

const ProductModel = model<Product>("Product", productSchema);

export default ProductModel;
