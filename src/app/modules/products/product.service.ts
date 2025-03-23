import ProductModel from "./product.model";
import { Product } from "./products.interface";

const createProduct = async (product: Product) => {
  return await ProductModel.create(product);
};

const findProductById = async (productId: string) => {
  return await ProductModel.findById(productId);
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const searchTerm = query.searchTerm || "";
  const filters = { ...query };
  delete filters.searchTerm;
  delete filters.sort;
  delete filters.limit;
  delete filters.page;
  delete filters.fields;

  let productsQuery = ProductModel.find({
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],
  }).find(filters);

  const sort = query.sort ? String(query.sort) : "-createdAt";
  productsQuery = productsQuery.sort(sort);

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  productsQuery = productsQuery.skip(skip).limit(limit);

  if (query.fields) {
    const fields = String(query.fields).split(",").join(" ");
    productsQuery = productsQuery.select(fields);
  } else {
    productsQuery = productsQuery.select("-__v");
  }

  const result = await productsQuery.exec();

  const total = await ProductModel.countDocuments();
  const totalPages = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
    data: result,
  };
};

const updateProductById = async (
  productId: string,
  payload: Partial<Product>
) => {
  return await ProductModel.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteProductById = async (productId: string) => {
  return await ProductModel.findByIdAndDelete(productId);
};

export const ProductService = {
  createProduct,
  findProductById,
  getAllProducts,
  updateProductById,
  deleteProductById,
};
