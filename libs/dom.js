import { getLoginUrl } from './authentication.js';
import { getUserPlayLists, getUserData } from './user.js';

const addLoginUrlHREF = () => {
	const loginButton = document.getElementById('btn-login');
	loginButton.href = getLoginUrl();
};

const getLoginInfo = () => {
	//#access_token=BQDtDiEUKAlHBr9BmwY3sWeVaPeKfCOaEwNzovxxZHLW4gcoJwTJPxrCGfpu_1DeDKWSlVppsOnlkAt8KNOAayaFa1Dy6l8M2FuUqleHjTn_PPN5fRekMBGuFB7VFcWtK1vMBBu8hoaFsJ-B
	//token_type=Bearer
	//expires_in=3600

	//Existe un access token en el local storage?
	const access_token = localStorage.getItem('accesToken');
	if (access_token) {
		return {
			access_token,
		};
	}

	const hash = window.location.hash
		.substring(1)
		.split('&')
		.reduce(function (initial, item) {
			if (item) {
				var parts = item.split('=');
				initial[parts[0]] = decodeURIComponent(parts[1]);
			}
			return initial;
		}, {});

	/**
	 * {
	 *  access_token: ...,
	 *  token_type: 'Bearer',
	 *  expires_in: 3600
	 * }
	 */
	if (hash.access_token) {
		localStorage.setItem('accesToken', hash.access_token);
		window.location.hash = '';
		return hash;
	}

	return {};
};

const setUserData = async (access_token) => {
	const resultsPlaceholder = document.getElementById('result');

	const {
		display_name,
		email,
		followers: { total },
		images,
	} = await getUserData(access_token);

	resultsPlaceholder.innerHTML = `
        <div id="userData">
            <img src="${images[0]?.url}" />
            <h1>${display_name}</h1>
            <h2>${email}</h2>
            <p> You have ${total} followers </p>
        </div>
    `;
};

const setUserPlaylists = async (access_token) => {
	const resultsPlaceholder = document.getElementById('result');

	const { items } = await getUserPlayLists(access_token);
	resultsPlaceholder.innerHTML += '<div id="userPlaylists"><ul>';

	items.forEach(({ name, href }) => {
		resultsPlaceholder.innerHTML += `
            <li>                    
                <a href="${href}">${name}</a>
            </li>
        `;
	});

	resultsPlaceholder.innerHTML += '</ul></div>';
};

export const initProfile = () => {
	window.addEventListener('DOMContentLoaded', async (event) => {
		const { access_token } = getLoginInfo();

		if (access_token) {
			setUserData(access_token);
			setUserPlaylists(access_token);
		} else {
			window.location.href = 'login.html';
		}
	});
};

export const initLogin = () => {
	window.addEventListener('DOMContentLoaded', () => {
		addLoginUrlHREF();
		const { access_token } = getLoginInfo();
		if (access_token) {
			window.location.href = 'index.html';
		}
	});
};

/*export const intilogout = () => {
	document.querySelector('#logout').addEventListener('click', () => {
		localStorage.removeItem('accesToken');
		window.location.reload();
	});
};*/
