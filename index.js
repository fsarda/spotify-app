import { initProfile } from './libs/dom.js';
import { logout } from './libs/authentication.js';

initProfile();

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("logout").addEventListener('click', logout);
});
