
const template = document.createElement('template');
template.innerHTML = `
	<style>
		h3 {
			color:blue;
		}
		img {
			height:  50%;
		}
		#show-info {
			color: #fff;
			border-radius: 5px;
			color: purple;
		}
	</style>
	<div>
	<img />
	<div>
		<h3></h3>
	</div>
	<div id="info-text">
		<p id="year"></p>
		<p id="genre"></p>
		<p id="actor"></p>
		<p id="director"></p>
		<p id="awards"></p>
		
	</div>
	<button id='show-info'>Show info</button>
	
	</div>

`;


class MovieInfo extends HTMLElement{
	constructor(){
		super();
		this.showInfo = true;
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
		this.shadowRoot.querySelector('img').src = this.getAttribute('movieImage');
	}
	connectedCallback(){
		this.render();
	}
	render(){
	  let myname = this.getAttribute('name');
	  this.shadowRoot.querySelector('#show-info').addEventListener('click', () => this.getInfo());
	}
	
	async getInfo() {
		const info = this.shadowRoot.querySelector('#info-text')
		const btn = this.shadowRoot.querySelector('#show-info');
		if(this.showInfo){
			const movieId = 'tt1201607';
			const requestUrl =
			'http://www.omdbapi.com?i='+movieId+'&apikey=thewdb';
		
			const res = await fetch(requestUrl);
			const json = await res.json();
			
			this.shadowRoot.querySelector('#year').innerText = 'Year of release: ' + json.Year;
			this.shadowRoot.querySelector('#genre').innerText = 'Genre: ' + json.Genre;
			this.shadowRoot.querySelector('#actor').innerText = 'Actors: ' + json.Actors;
			this.shadowRoot.querySelector('#director').innerText = 'Director: ' + json.Director;
			this.shadowRoot.querySelector('#awards').innerText = 'Genre: ' + json.Awards;
			info.style.display = 'block';
			btn.innerText = "Hide Info";
		} else {
			info.style.display = 'none';
			btn.innerText = "Show Info";
		}
		this.showInfo = !this.showInfo; 

	}
	disconnectedCallback(){
		this.shadowRoot.querySelector('#showInfo').removeEventListener();
	}
}
customElements.define('movie-info', MovieInfo);
