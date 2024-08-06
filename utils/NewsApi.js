import { newsApiKey } from "./ApiKey";
import axios from "axios";

// Endpoints
const apiBaseUrl = "https://newsapi.org/v2";

const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=us&apiKey=${newsApiKey}`;
const recommendedNewsUrl = `${apiBaseUrl}/top-headlines?country=us&category=business&apiKey=${newsApiKey}`;
const discoverNewsUrl = (discover) =>
  `${apiBaseUrl}/top-headlines/sources?country=us&category=${discover}&apiKey=${newsApiKey}`;
const searchNewsUrl = (query) =>
  `${apiBaseUrl}/everything?q=${query}&apiKey=${newsApiKey}`;

const newsApiCall = async (endpoints, params) => {
  try {
    const response = await axios.get(endpoints, { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return {};
  }
};

export const fetchBreakingNews = async () => newsApiCall(breakingNewsUrl);
export const fetchRecommendedNews = async () => newsApiCall(recommendedNewsUrl);
export const fetchDiscoverNews = async (discover) =>
  newsApiCall(discoverNewsUrl(discover));
export const fetchSearchNews = async (query) =>
  newsApiCall(searchNewsUrl(query));
