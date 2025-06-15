const allowedCategories = ['books', 'electronics', 'clothing', 'other'];

const parseCategory = (value) => {
  if (typeof value === 'undefined') return undefined;
  if (!allowedCategories.includes(value)) return undefined;
  return value;
};

const parsePrice = (value) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? undefined : parsed;
};

export const parseFilterParams = (query) => {
  const { category, minPrice, maxPrice } = query;

  const parsedCategory = parseCategory(category);
  const parsedMinPrice = parsePrice(minPrice);
  const parsedMaxPrice = parsePrice(maxPrice);

  const filter = {};

  if (parsedCategory !== undefined) {
    filter.category = parsedCategory;
  }

  if (parsedMinPrice !== undefined || parsedMaxPrice !== undefined) {
    filter.price = {};
    if (parsedMinPrice !== undefined) {
      filter.price.$gte = parsedMinPrice;
    }
    if (parsedMaxPrice !== undefined) {
      filter.price.$lte = parsedMaxPrice;
    }
  }

  return filter;
};
