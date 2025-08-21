// 404 animation for static HTML site
// This script creates a floating 404 animation overlay and click spark effect for the site.

(function() {
  // 404 Animation
  function create404Overlay() {
    const overlay = document.createElement('div');
    overlay.id = 'notfound-overlay';
    overlay.innerHTML = `
      <div class="notfound-404">
        <span>4</span><span class="zero">0</span><span>4</span>
      </div>
      <div class="notfound-msg">Page Not Found</div>
    `;
    document.body.appendChild(overlay);
  }

  // Only show 404 if body has .show-404
  if (document.body.classList.contains('show-404')) {
    create404Overlay();
  }

  // Click Spark Animation
  function createSpark(x, y, color = '#fff', count = 8, size = 10, radius = 15, duration = 400) {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 9999;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const sparks = Array.from({ length: count }, (_, i) => ({
      angle: (2 * Math.PI * i) / count,
      start: performance.now()
    }));
    function draw(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const spark of sparks) {
        const t = Math.min(1, (now - spark.start) / duration);
        if (t < 1) alive = true;
        const eased = t * (2 - t);
        const dist = eased * radius;
        const lineLen = size * (1 - eased);
        const x1 = x + dist * Math.cos(spark.angle);
        const y1 = y + dist * Math.sin(spark.angle);
        const x2 = x + (dist + lineLen) * Math.cos(spark.angle);
        const y2 = y + (dist + lineLen) * Math.sin(spark.angle);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      if (alive) {
        requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(draw);
  }

  document.addEventListener('click', function(e) {
    createSpark(e.clientX, e.clientY, '#6366f1', 10, 12, 22, 500);
  });
})();
