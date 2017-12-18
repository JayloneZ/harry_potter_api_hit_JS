var app = function () {
	var url = 'http://hp-api.herokuapp.com/api/characters';

	makeRequest(url, function () {
		if (this.status !== 200) return;
		var jsonString = this.responseText;
		var pokemon = JSON.parse(jsonString);
		render(pokemon);
	});
};

var makeRequest = function (url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.addEventListener('load', callback);
	request.send();
};

var render = function (pokemon) {
	var storedPokemon = localStorage.getItem('selectedPokemon');
	var pokemonToDisplay = null;

	if (storedPokemon) {
		pokemonToDisplay = JSON.parse(storedPokemon);
		var select = document.querySelector('#pokemon');
		select.selectedIndex = pokemonToDisplay.index;
	} else {
		pokemonToDisplay = pokemon[0];
	}

	populateSelect(pokemon);
	updateInfo(pokemonToDisplay);
};

var populateSelect = function (pokemon) {
	var select = document.querySelector('#pokemon');

	pokemon.forEach(function (item, index) {
		item.index = index;
		var option = document.createElement('option');
		option.value = index;
		option.text = item.name;
		select.appendChild(option);
	});

	select.addEventListener('change', function (event) {
		var index = this.value;
		var onePokemon = pokemon[index];

		updateInfo(onePokemon);

		var jsonString = JSON.stringify(onePokemon);
		localStorage.setItem('selectedPokemon', jsonString);
	});
};

var updateInfo = function (pokemon) {
	var pTags = document.querySelectorAll('#info p');
	pTags[0].innerText = pokemon.name;
	pTags[1].innerText = pokemon.height;
	pTags[2].innerText = pokemon.weight;
};

document.addEventListener('DOMContentLoaded', app);
