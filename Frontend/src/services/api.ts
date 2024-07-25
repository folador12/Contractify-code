import axios, { AxiosError } from "axios";

export const setupAPIClient = (ctx = undefined) => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  return api;
};
