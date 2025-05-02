import { z } from "zod";

// Dimensions
const dimensionsSchema = z.object({
  width: z.number().min(0, "Width must be positive"),
  height: z.number().min(0, "Height must be positive"),
  depth: z.number().min(0, "Depth must be positive"),
});

// Review
const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
  date: z.date().optional(), // Will be defaulted in the backend
  reviewerName: z.string().min(1),
  reviewerEmail: z.string().email(),
});

// Meta
const metaSchema = z.object({
  createdAt: z.date().optional(), // backend default
  updatedAt: z.date().optional(), // backend default
  barcode: z.string().min(1),
  qrCode: z.string().url(),
});

// Main Product Schema
export const productValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(["beauty", "electronics", "fashion"]),
    price: z.number().min(0),
    discountPercentage: z.number().min(0).max(100).optional(),
    rating: z.number().min(0).max(5).optional(),
    stock: z.number().min(0).optional(),
    tags: z.array(z.string()).optional(),
    brand: z.string().min(1),
    sku: z.string().min(1),
    weight: z.number().min(0).optional(),
    dimensions: dimensionsSchema,
    warrantyInformation: z.string().optional(),
    shippingInformation: z.string().optional(),
    availabilityStatus: z
      .enum(["In Stock", "Low Stock", "Out of Stock"])
      .optional(),
    reviews: z.array(reviewSchema).optional(),
    returnPolicy: z.string().optional(),
    minimumOrderQuantity: z.number().min(1).optional(),
    meta: metaSchema,
    images: z.array(z.string().url()).optional(),
    thumbnail: z.string().url(),
  }),
});

export const productZodValidationSchema = {
  productValidationSchema,
};
