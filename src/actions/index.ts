import axios, { AxiosResponse } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const UPLOAD_NAME = process.env.NEXT_PUBLIC_UPLOAD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

const upload = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${UPLOAD_NAME}/image/upload`,
});

export const uploadCloudinary = async (file: File | null) => {
  if(!file){
    return null
  }
  const formData = new FormData();
  formData.append('file',file);
  formData.append('upload_preset',UPLOAD_PRESET as string);
  const imageData = await upload.post('/',formData);
  return imageData.data.url;
};

axiosClient.interceptors.request.use((config: any) => {
  if (config.url?.indexOf("login") !== -1) {
    return config;
  }

  if (!config?.headers) {
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );
  }

  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error?.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
        deleteCookie("token");
      }
    }
    return Promise.reject(error?.response?.data);
  }
);

export default axiosClient;