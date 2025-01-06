document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() +1; 
    let snowAmount = 0
    
    console.log(currentMonth)
    const container = document.getElementById('emitter-container');
    //npx http-server  to run the site
    // Function to create a particle
    //I should replace these with pixelart foxes flying through space (it'd be cool)
    //or cache the foxes, this could cause heavy lag
    function createParticle() {
        const particle = document.createElement('img');
        particle.angle = 0;
        particle.hsp = Math.random() * 5;
        particle.classList.add('particle');

        // Fetch a random fox image URL
        if(currentMonth != 12)
        {
            /*fetch('https://randomfox.ca/floof/')
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
            });*/
        }
        else
        {
            if(snowAmount < 100)
            {
            particle.src = '/assets/vector/snowball.svg'
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = '0';
            //particle.style.width = '10%';
            //particle.style.height = 'auto'; 
            particle.hsp = '-20';
            particle.vsp = '20';
            particle.scale = '0.25';
            container.appendChild(particle);
            snowAmount += 1;

            animateParticle(particle);
            }
        }
    }

    // Function to animate the particle
    function animateParticle(particle) {
        const animationDuration = 1000 + Math.random() * 1000; // Random duration between 5 and 10 seconds
        const startOpacity = 1;
        const endOpacity = 0;

        const startTime = performance.now();
        function animationFrame(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = elapsedTime / animationDuration;
            //particle.angle += 1;
            //particle.vsp += particle.vsp;
            //particle.hsp -= 5;
            //particle.vsp += 10;

            // Move the particle upwards
            particle.style.transform = `translateY(${progress * 30}vh) translateX(${progress * 20}vh)`
            //particle.style.transform = `translateY(${particle.vsp}vh) translateX(${particle.hsp}vw)`;
            //particle.style.transform = `translateY(${particle.vsp}px) rotate(${particle.angle}deg) translateX(${particle.hsp}px)`;
            
            //console.log(particle.hsp)
            
            // Fade out the particle
            //particle.style.opacity = startOpacity - (startOpacity - endOpacity) * progress;

            if (progress < 2) {
                requestAnimationFrame(animationFrame);
            } else {
                snowAmount -= 1;
                container.removeChild(particle); // Remove the particle when animation is complete

            }
        }

        requestAnimationFrame(animationFrame);
    }

    // Emit particles at regular intervals
    setInterval(createParticle, 100); // Emit a particle every 50ms

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