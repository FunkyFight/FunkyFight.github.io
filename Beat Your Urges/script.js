// script.js
const quotes = [
	"Nut, feel good for 5 seconds and bad for a whole month. Resist, feel bad for two weeks and feel good for at least a year until the next NNN.—u/FunkyFight",
	"Mastery over momentary desire is the triumph of self over self.",
	"Each time you resist the urge, you're sculpting a stronger will out of the clay of temptation.",
	"Edging always leads to failure. It's like a mathematical theorem, it's always true.—u/FunkyFight",
	"When you lose control of yourself, you lose your freedom.—Marie von Ebner-Eschenbach",
	"By constant self-discipline and self-control you can develop greatness of character.—Grenville Kleiser",
	"Your urges are unbearables? Meditation, exercise, studying, working on something you love are your best allies.—u/FunkyFight",
	"The secret to winning no nut november is not nutting—u/nnncontestant2023",
	"Remove anything that makes you think of nutting. Sanitize the content you watch.—u/FunkyFight",
	"In the silence of temptation, listen to the voice of your future self, thanking you for your strength.",
	"The momentary pleasure of yielding is fleeting, but the pride of self-control endures.",
	"Your future is built on the bricks of resistance you lay today.",
	"Every urge resisted adds a thread of strength to the fabric of your character.",
	"Temptation whispers promises it can never keep; resist it, and claim the promises you've made to yourself.",
	"Self-control is the quiet hero in the story of personal triumph.",
	"When you feel the pull of old habits, remind yourself that you are the captain of your destiny.",
];
document.addEventListener('DOMContentLoaded', function() {
    const citationElement = document.getElementById('citation');

    displayRandomCitation();

		function displayRandomCitation() {
			const index = Math.floor(Math.random() * quotes.length);
			const citationEtAuteur = quotes[index].split('—'); // Assurez-vous que le tiret est le même que celui utilisé dans votre fichier txt
			citationElement.textContent = citationEtAuteur[0].trim();
			if (citationEtAuteur.length > 1) {
				document.getElementById('auteur').textContent = `— ${citationEtAuteur[1].trim()}`;
			} else {
				document.getElementById('auteur').textContent = '';
			}
		}

		function updateCountdown() {
			const now = new Date();
			const currentYear = now.getFullYear();
			const nextDecemberFirst = new Date(`December 1, ${currentYear} 00:00:00`);
			
			// Si nous sommes déjà en décembre, réglez le compte à rebours pour le 1er décembre de l'année prochaine
			if (now.getMonth() === 11 && now.getDate() > 1) {
				nextDecemberFirst.setFullYear(currentYear + 1);
			}
			
			const diff = nextDecemberFirst - now;
		
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / 1000 / 60) % 60);
			const seconds = Math.floor((diff / 1000) % 60);
		
			document.getElementById('countdown').textContent = 
				`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds to go!!`;
		}
		
		// Initialisation du compte à rebours
		updateCountdown();
		// Mise à jour du compte à rebours chaque seconde
		setInterval(updateCountdown, 1000);
});