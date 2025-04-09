
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("purgeTab");

  button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "deleteRandomTab" });
    launchConfetti();
  });

  function launchConfetti() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 9999;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const confetti = [];

    const colors = ["#ff0", "#0f0", "#0ff", "#f0f", "#f00", "#00f"];

    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 100 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncrement: Math.random() * 0.1 + 0.05
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
        ctx.stroke();
      });
      update();
    }

    function update() {
      confetti.forEach(c => {
        c.tiltAngle += c.tiltAngleIncrement;
        c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
        c.tilt = Math.sin(c.tiltAngle - c.d / 3) * 15;
        if (c.y > canvas.height) {
          c.y = -10;
          c.x = Math.random() * canvas.width;
        }
      });
    }

    function animate() {
      draw();
      requestAnimationFrame(animate);
    }

    // Set canvas size to match display
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    animate();

    // Cleanup after 3 seconds
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 3000);
  }
});