// ==== Starfield with twinkling stars ====

const starsContainer = document.getElementById('stars-container');
const starCount = 150;

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 2 + 1; // 1 to 3 px
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.position = 'absolute';
  star.style.backgroundColor = 'white';
  star.style.borderRadius = '50%';
  star.style.opacity = 0.8;
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';
  star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  return star;
}

// Add stars to container
for (let i = 0; i < starCount; i++) {
  starsContainer.appendChild(createStar());
}

// Add star twinkle CSS dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes twinkle {
    0%, 100% {opacity: 0.8;}
    50% {opacity: 0.2;}
  }
`;
document.head.appendChild(styleSheet);


// ==== Constellation lines on Canvas ====

const canvas = document.getElementById('constellation-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Generate constellation stars data with x, y
const constellationStars = [];
const constellationCount = 30;

for (let i = 0; i < constellationCount; i++) {
  constellationStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 1
  });
}

// Helper: draw a star circle
function drawStar(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.shadowColor = 'white';
  ctx.shadowBlur = 10;
  ctx.fill();
}

// Connect stars with lines to simulate constellation
function drawConstellations() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  constellationStars.forEach(star => {
    drawStar(star.x, star.y, star.radius);
  });

  // Draw lines - connect each star to a few neighbors
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  for (let i = 0; i < constellationCount; i++) {
    let starA = constellationStars[i];
    // connect to next 1-3 stars randomly (but close by)
    let connections = 1 + Math.floor(Math.random() * 3);
    for (let j = 1; j <= connections; j++) {
      let starB = constellationStars[(i + j) % constellationCount];
      // only draw if distance is small enough
      let dx = starA.x - starB.x;
      let dy = starA.y - starB.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        ctx.beginPath();
        ctx.moveTo(starA.x, starA.y);
        ctx.lineTo(starB.x, starB.y);
        ctx.stroke();
      }
    }
  }
}

// Animate subtle shimmering of constellation lines and stars
let twinklePhase = 0;

function animate() {
  twinklePhase += 0.02;
  ctx.globalAlpha = 0.7 + 0.3 * Math.sin(twinklePhase * 3);
  drawConstellations();
  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}
animate();


// ==== Parallax effect on stars ====

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function parallaxStars() {
  const stars = document.querySelectorAll('#stars-container .star');
  stars.forEach((star, i) => {
    // Small movement opposite to mouse direction
    const movementX = (mouseX - window.innerWidth / 2) * 0.01 * (i % 5);
    const movementY = (mouseY - window.innerHeight / 2) * 0.01 * (i % 5);
    star.style.transform = `translate(${movementX}px, ${movementY}px)`;
  });
  requestAnimationFrame(parallaxStars);
}
parallaxStars();
const container = document.querySelector('.container');
const toggleBtn = document.getElementById('toggleStyle');

toggleBtn.addEventListener('click', () => {
  container.classList.toggle('ethereal');
  container.classList.toggle('cathedral');
});
