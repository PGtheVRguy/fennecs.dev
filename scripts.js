

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

document.addEventListener('DOMContentLoaded', function() {
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

/*
const navbar = document.querySelector('#NavBar');
let navtop = navbar.offsetTop;
function stickynavbar() {
  if (window.scrollY >= navtop) {    
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');    
  }
}
window.addEventListener('scroll', stickynavbar);
*/

function loadNavbar() {
    if(window.mobileCheck == false)
    {
        navbarfile = '/navbar-m.html'
    }
    else
    {
        navbarfile = '/navbar-d.html'
    }
    fetch(navbarfile) //Desktop navbar
        .then(response => response.text())
        .then(data => {
            document.getElementById('NavBar').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
    
    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('Footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

}
