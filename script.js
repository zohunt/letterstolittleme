// Generate random stars
const starsContainer = document.querySelector(".stars");
const numberOfStars = 150;

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // Random position anywhere on screen
  star.style.top = Math.random() * 100 + "vh";
  star.style.left = Math.random() * 100 + "vw";

  // Random size
  const size = Math.random() * 2 + 1; // between 1px and 3px
  star.style.width = size + "px";
  star.style.height = size + "px";

  // Random animation delay so they don’t all twinkle at once
  star.style.animationDelay = Math.random() * 2 + "s";

  starsContainer.appendChild(star);
}
function createShootingStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  // Random start position at the top or left edge
  const startTop = Math.random() * window.innerHeight * 0.5;
  const startLeft = Math.random() * window.innerWidth * 0.5;
  star.style.top = `${startTop}px`;
  star.style.left = `${startLeft}px`;

  document.body.appendChild(star);

  // Animate the shooting star
  star.animate([
    { transform: 'translate(0, 0) rotate(45deg)', opacity: 1 },
    { transform: 'translate(300px, 300px) rotate(45deg)', opacity: 0 }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });

  setTimeout(() => star.remove(), 1000);
}

// Launch a new shooting star every 3–6 seconds
setInterval(() => {
  if (Math.random() < 0.7) {
    createShootingStar();
  }
}, 3000);
