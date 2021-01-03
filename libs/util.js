export const makeRequest = async (endpoint, accessToken) => {
    return fetch(`https://api.spotify.com/v1${endpoint}`,
        {   
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
    ).then(response => response.json())
}