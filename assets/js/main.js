/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
			parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 20

		};

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px',  '1800px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ '481px',   '736px'  ],
		xsmall:  [ null,      '480px'  ],
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch?
	if (browser.mobile) {

		// Turn on touch mode.
		$body.addClass('is-touch');

		// Height fix (mostly for iOS).
		window.setTimeout(function() {
			$window.scrollTop($window.scrollTop() + 1);
		}, 0);

	}

	// Footer.
	breakpoints.on('<=medium', function() {
		$footer.insertAfter($main);
	});

	breakpoints.on('>medium', function() {
		$footer.appendTo($header);
	});

	// Header.

	// Parallax background.
	if (browser.name == 'ie' || browser.mobile)
		settings.parallax = false;

	if (settings.parallax) {

		breakpoints.on('<=medium', function() {
			$window.off('scroll.strata_parallax');
			$header.css('background-position', '');
		});

		breakpoints.on('>medium', function() {
			$header.css('background-position', 'left 0px');

			$window.on('scroll.strata_parallax', function() {
				$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
			});
		});

		$window.on('load', function() {
			$window.triggerHandler('scroll');
		});
	}

	// Main Sections: Two.

	// Lightbox gallery.
	$window.on('load', function() {

		$('#two').poptrox({
			caption: function($a) { return $a.next('h3').text(); },
			overlayColor: '#2c2c2c',
			overlayOpacity: 0.85,
			popupCloserText: '',
			popupLoaderText: '',
			selector: '.work-item a.image:not(.no-lightbox)', // <-- updated line
			usePopupCaption: true,
			usePopupDefaultStyling: false,
			usePopupEasyClose: false,
			usePopupNav: true,
			windowMargin: (breakpoints.active('<=small') ? 0 : 50)
		});

	});

})(jQuery);


// GPA Animation Script

function animateGPAcircles() {
	document.querySelectorAll('.gpa-circle').forEach(circleWrapper => {
		const rect = circleWrapper.getBoundingClientRect();
		const inView = rect.top <= window.innerHeight - 100;

		if (inView && !circleWrapper.classList.contains('animated')) {
			const svgPath = circleWrapper.querySelector('.circle');
			const text = circleWrapper.querySelector('.percentage');
			const targetGPA = parseFloat(circleWrapper.getAttribute('data-gpa'));
			const maxGPA = 4.0;

			let currentGPA = 0;
			const duration = 1000; // total duration in ms
			const frameRate = 10;  // update every 10ms
			const totalSteps = duration / frameRate;
			const increment = targetGPA / totalSteps;

			circleWrapper.classList.add('animated');

			const animate = setInterval(() => {
				currentGPA += increment;
				if (currentGPA >= targetGPA) {
					currentGPA = targetGPA;
					clearInterval(animate);
				}

				const percent = (currentGPA / maxGPA) * 100;
				svgPath.setAttribute('stroke-dasharray', `${percent}, 100`);
				text.textContent = currentGPA.toFixed(2);
			}, frameRate);
		}
	});
}

window.addEventListener('scroll', animateGPAcircles);
window.addEventListener('load', animateGPAcircles);

// Skill box

function scrollToSkillsAndHighlight(className) {
	const section = document.getElementById("technical-skills");
  
	// Smooth scroll to section
	section.scrollIntoView({ behavior: "smooth" });
  
	// Remove existing highlights first
	document.querySelectorAll(".skill-tags .tag").forEach(tag => {
	  tag.classList.remove("highlight");
	});
  
	// Delay to allow scroll animation to finish (adjust if needed)
	setTimeout(() => {
	  const targets = document.querySelectorAll(`.skill-tags .${className}`);
	  targets.forEach(tag => tag.classList.add("highlight"));
  
	  // Remove after 1.2s
	  setTimeout(() => {
		targets.forEach(tag => tag.classList.remove("highlight"));
	  }, 10200);
	}, 500); // ⏳ adjust this delay to match scroll duration
  }
  
  // technical Skills
  function scrollToFocusAreaAndHighlight(className) {
	// Find the specific skill box to center
	const target = document.querySelector(`.skill-box.${className}`);
	if (!target) return;
  
	// Scroll that skill-box into center of the screen
	target.scrollIntoView({ behavior: "smooth", block: "center" });
  
	// Remove any existing highlight
	document.querySelectorAll(".skill-box").forEach(box => {
	  box.classList.remove("highlight");
	});
  
	// Highlight it after slight delay
	setTimeout(() => {
	  target.classList.add("highlight");
  
	  // Remove after animation
	  setTimeout(() => {
		target.classList.remove("highlight");
	  }, 1200);
	}, 400); // Wait for scroll to complete before animating
  }
  