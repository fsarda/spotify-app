const CLIENT_ID = '1d4773f5b39644418f955bfcb75a3ac0';
const REDIRECT_URI = 'http://127.0.0.1:5500/index.html';
const scopes = ['user-read-email', 'user-top-read'];

export const getLoginUrl = () =>
	'https://accounts.spotify.com/authorize?client_id=' +
	CLIENT_ID +
	'&redirect_uri=' +
	encodeURIComponent(REDIRECT_URI) +
	'&scope=' +
	encodeURIComponent(scopes.join(' ')) +
	'&response_type=token';


