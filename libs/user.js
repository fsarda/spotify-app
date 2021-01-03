import { makeRequest } from './util.js';

export const getUserData = async (accessToken) => {
    return makeRequest('/me', accessToken);
}

export const getUserPlayLists = async (accessToken) => {
    return makeRequest('/me/playlists', accessToken);
}