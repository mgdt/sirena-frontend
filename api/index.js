import axios from "axios";
import queryString from "query-string";

const headers = {
  "Content-Type": "application/json",
};

// export const baseUrl =
//   import.meta.env.MODE == "development"
//     ? "http://localhost:5002"
//     : "https://www.batoturon.beget.app";

export const baseUrl = "https://www.batoturon.beget.app";

export async function fetchCategories() {
  const response = await axios.get(`${baseUrl}/categories`);
  return response.data;
}

export async function fetchCategory(slug) {
  const response = await axios.get(`${baseUrl}/categories/${slug}`);
  return response.data;
}

export async function fetchBrands() {
  const response = await axios.get(`${baseUrl}/brands`);
  return response.data;
}

export async function fetchBrand(slug) {
  const response = await axios.get(`${baseUrl}/brands/${slug}`);
  return response.data;
}

export async function fetchProducts(filters) {
  const filtersString = queryString.stringify(filters);
  const response = await axios.get(`${baseUrl}/products?${filtersString}`);
  return response.data;
}

export async function fetchProduct(id) {
  const response = await axios.get(`${baseUrl}/products/${id}`);
  return response.data;
}

export async function fetchFilterFields() {
  const response = await axios.get(`${baseUrl}/products/filterFields`);
  return response.data;
}

export async function fetchCartItems(ids) {
  const response = await axios.get(`${baseUrl}/products/variations?ids=${ids}`);
  return response.data;
}

export async function fetchArticles() {
  const response = await axios.get(`${baseUrl}/articles`);
  return response.data;
}

export async function fetchArticle(slug) {
  const response = await axios.get(`${baseUrl}/articles/${slug}`);
  return response.data;
}

export async function fetchField(key) {
  const response = await axios.get(`${baseUrl}/fields/${key}`);
  return response.data;
}

export async function fetchQuestions() {
  const response = await axios.get(`${baseUrl}/questions`);
  return response.data;
}

export async function fetchSeo() {
  const response = await axios.get(`${baseUrl}/seo`);
  return response.data;
}

export async function fetchFeedbacks() {
  const response = await axios.get(`${baseUrl}/feedbacks`);
  return response.data;
}

export async function fetchVideoFeedbacks() {
  const response = await axios.get(`${baseUrl}/videoFeedbacks`);
  return response.data;
}

export async function sendCallback(body) {
  const response = await axios.post(`${baseUrl}/mailer/callback`, body, {
    headers,
  });
}

export async function sendQuestion(body) {
  const response = await axios.post(`${baseUrl}/mailer/faq`, body, {
    headers,
  });
}

export async function fetchRecommendedProducts() {
  const response = await axios.get(`${baseUrl}/products/recommended`);
  return response.data;
}

export async function fetchPromocode(code) {
  const response = await axios.get(`${baseUrl}/promocodes/${code}`);
  return response.data;
}

export async function createOrder(order) {
  const response = await axios.post(
    `${baseUrl}/orders`,
    JSON.stringify(order),
    {
      headers,
    }
  );
  return response.data;
}

export async function checkOrders() {
  const response = await axios.get(`${baseUrl}/orders/check`);
  return response.data;
}
