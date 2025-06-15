import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async (filter = {}) => {
  let query = ProductModel.find();

  if (filter.category) {
    query = query.where('category').equals(filter.category);
  }

  if (filter.price) {
    if (filter.price.$gte !== undefined) {
      query = query.where('price').gte(filter.price.$gte);
    }
    if (filter.price.$lte !== undefined) {
      query = query.where('price').lte(filter.price.$lte);
    }
  }

  return await query.exec();
};

export const getProductById = (productId) => {
  return ProductModel.findById(productId);
};

export const updateProduct = async (productId, payload) => {
  const result = await ProductModel.findOneAndUpdate(
    { _id: productId },
    payload,
    { new: true },
  );
  return result;
};

export const creatProduct = (payload) => {
  return ProductModel.create(payload);
};

export const deleteProduct = (productId) => {
  return ProductModel.findByIdAndDelete(productId);
};
