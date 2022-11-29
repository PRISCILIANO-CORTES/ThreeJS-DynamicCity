import { App } from './App';

const app = new App(document.querySelector('#ciudad-container'));

window.addEventListener('resize', () => {
	app.onResize();
});
