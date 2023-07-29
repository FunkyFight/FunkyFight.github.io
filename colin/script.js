// Play in loop pizzatron.mp3
var audio = new Audio('./sound/pizzatron.mp3');
audio.loop = true;
audio.play();

anime({
	targets: '.furry',
	rotate: 360,
	loop: true,
	// interpolation quadratic
	easing: 'linear',
	duration: 2000
	
});

// Object .title must have float animation
anime({
	targets: '.title',
	keyframes: [
		{translateY: -100},
		{translateY: 100},
		{translateY: 0},
	],
	loop: true,
	easing: 'linear',
	duration: 400
})



