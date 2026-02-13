// ===== STARFIELD =====

class Star {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 1.5;
    this.opacity = Math.random() * 0.7 + 0.3;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push(new Star(canvas));
}

function animateStars() {
  ctx.fillStyle = 'rgba(11, 11, 13, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.update();
    star.draw(ctx);
  });

  requestAnimationFrame(animateStars);
}

animateStars();

// ===== PAGE NAVIGATION =====

function openPage(pageId, el) {
  document.querySelectorAll('.page').forEach(p =>
    p.classList.remove('active')
  );

  document.querySelectorAll('nav span').forEach(n =>
    n.classList.remove('active')
  );

  document.getElementById(pageId).classList.add('active');
  el.classList.add('active');
}