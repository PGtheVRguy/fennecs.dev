/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };


document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('emitter-container');

    // Function to create a particle
    function createParticle() {
        const particle = document.createElement('img');
        particle.angle = 0;
        particle.hsp = Math.random() * 5;
        particle.classList.add('particle');

        // Fetch a random fox image URL
        fetch('https://randomfox.ca/floof/')
            .then(response => response.json())
            .then(data => {
                particle.src = data.image; // Set particle.src to the fetched image URL
                // Set initial position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.bottom = `-128px`; // Offset downward by its height
                container.appendChild(particle);

                // Animate the particle
                animateParticle(particle);
            })
            .catch(error => {
                console.error('Error fetching random fox image:', error);
                // Fallback image in case of an error
                particle.src = 'particle.jpg'; // Replace with your fallback image URL
                // Set initial position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.bottom = `64px`; // Offset downward by its height
                container.appendChild(particle);

                // Animate the particle
                animateParticle(particle);
            });
    }

    // Function to animate the particle
    function animateParticle(particle) {
        const animationDuration = 5000 + Math.random() * 5000; // Random duration between 5 and 10 seconds
        const startOpacity = 1;
        const endOpacity = 0;

        const startTime = performance.now();

        function animationFrame(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = elapsedTime / animationDuration;
            particle.angle += 1;

            // Move the particle upwards
            particle.style.transform = `translateY(-${progress * 150}vh) rotate(${particle.angle}deg) translateX(-${particle.hsp}vh)`;

            // Fade out the particle
            //particle.style.opacity = startOpacity - (startOpacity - endOpacity) * progress;

            if (progress < 1) {
                requestAnimationFrame(animationFrame);
            } else {
                container.removeChild(particle); // Remove the particle when animation is complete
            }
        }

        requestAnimationFrame(animationFrame);
    }

    // Emit particles at regular intervals
    setInterval(createParticle, 50); // Emit a particle every 50ms

    // Function to handle 3D hover effect and glint effect
    function handleMouseMove(event) {
        const zoomElements = document.querySelectorAll('.zoom');
        zoomElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elX = rect.left + rect.width / 2;
            const elY = rect.top + rect.height / 2;
            const angleX = (event.clientY - elY) / 10; // Increase sensitivity by using a smaller divisor
            const angleY = (event.clientX - elX) / -10; // Increase sensitivity by using a smaller divisor
            
            el.style.setProperty('--rotateX', `${angleX}deg`);
            el.style.setProperty('--rotateY', `${angleY}deg`);

            // Update glint position
            const glint = el.querySelector('.glint');
            if (glint) {
                const glintX = (event.clientX - rect.left) / rect.width * 100;
                glint.style.transform = `skewX(-30deg) translateX(${glintX}%)`;
            }
        });
    }
    window.addEventListener('scroll', handleMouseMove);
    document.addEventListener('mousemove', handleMouseMove);

    // Add tilt class on hover
    const zoomElements = document.querySelectorAll('.zoom');
    zoomElements.forEach(el => {
        el.addEventListener('mouseenter', () => el.classList.add('tilt'));
        el.addEventListener('mouseleave', () => el.classList.remove('tilt'));
    });
});
