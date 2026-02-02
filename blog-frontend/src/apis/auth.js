import blogApi from "./axios";

export const loginUser = (data) => blogApi.post("/auth/login", data);
export const signupUser = (data) => blogApi.post("/auth/signup", data);
export const forgotPassword = (email) =>
  blogApi.post("/auth/forgot-password", { email });