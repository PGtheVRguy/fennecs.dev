// script.js

const container = document.getElementById('emitter-container');

// Function to create a particle
function createParticle() {
    const particle = document.createElement('img');
    particle.angle = 0;
    particle.src = 'particle.jpg'; // Replace with your PNG image
    particle.classList.add('particle');

    // Set initial position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-128px`; // Offset downward by its height
    container.appendChild(particle);

    // Animate the particle
    animateParticle(particle);
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
        particle.style.transform = `translateY(-${progress * 150}vh) rotate(${particle.angle}deg)`;
        //particle.style.transform = ``

        // Fade out the particle
        particle.style.opacity = startOpacity - (startOpacity - endOpacity) * progress;

        if (progress < 1) {
            requestAnimationFrame(animationFrame);
        } else {
            container.removeChild(particle); // Remove the particle when animation is complete
        }
    }

    requestAnimationFrame(animationFrame);
}

// Emit particles at regular intervals
setInterval(createParticle, 50); // Emit a particle every 300ms
