// Fuzzy 404 Not Found animation in vanilla JS for canvas
(function() {
  const canvas = document.getElementById('fuzzy404');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const text = '404 Not Found';
  const fontSize = 100;
  const fontWeight = 900;
  const fontFamily = 'Segoe UI, Arial, sans-serif';
  const color = '#000';
  const baseIntensity = 0.18;
  const hoverIntensity = 0.5;
  let isHovering = false;
  let animationFrameId;

  function drawFuzzyText(intensity) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    // Draw fuzzy effect by shifting scanlines
    for (let j = 0; j < fontSize + 20; j++) {
      const dx = Math.floor(intensity * (Math.random() - 0.5) * 30);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, y - fontSize/2 + j, canvas.width, 1);
      ctx.clip();
      ctx.fillStyle = color;
      ctx.fillText(text, x + dx, y);
      ctx.restore();
    }
    ctx.restore();
  }

  function animate() {
    drawFuzzyText(isHovering ? hoverIntensity : baseIntensity);
    animationFrameId = requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Only hover if inside text area (roughly center)
    if (x > canvas.width * 0.1 && x < canvas.width * 0.9 && y > canvas.height * 0.2 && y < canvas.height * 0.8) {
      isHovering = true;
    } else {
      isHovering = false;
    }
  });
  canvas.addEventListener('mouseleave', function() {
    isHovering = false;
  });

  animate();
})();
