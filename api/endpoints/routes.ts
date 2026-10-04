const apiBaseUrl = (process.env.API_BASE_URL ?? "https://fakestoreapi.com").replace(
  /\/+$/,
  "",
);

export const API_ENDPOINTS = {
  products: `${apiBaseUrl}/products`,
  productById: (productId: number) => `${apiBaseUrl}/products/${productId}`,
  carts: `${apiBaseUrl}/carts`,
  cartById: (cartId: number) => `${apiBaseUrl}/carts/${cartId}`,
  users: `${apiBaseUrl}/users`,
  userById: (userId: number) => `${apiBaseUrl}/users/${userId}`,
} as const;
