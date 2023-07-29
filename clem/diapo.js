document.addEventListener('DOMContentLoaded', function() {
	console.log("Le DOM est chargé")
	var gifs = document.querySelectorAll('.gifs img');
	// Hide everything
	for (var i = 0; i < gifs.length; i++) {
		gifs[i].style.display = 'none';
		console.log("Toutes les images ont été cachées")
	}


	var i = 0;
	var interval = setInterval(function () {
		// Print each element
		gifs[i].style.display = 'none';
		i = (i + 1) % gifs.length;
		gifs[i].style.display = 'inline';
	}, 5000);
});