import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientID = "ade8299f6f084c1e9b1d5f8d5bdb283d";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(",")}&response_type=token&show_dialog=true`; 

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });


    apiClient.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export default apiClient;
