import { makeRequest } from './util.js';

export const getUserData = accessToken => {
    return makeRequest('/me', accessToken);
}

export const getUserPlayLists = accessToken => {
    return makeRequest('/me/playlists', accessToken);
}

export const getUserToptracks = accessToken => {
    return makeRequest('/me/top/tracks?limit=10', accessToken);
}