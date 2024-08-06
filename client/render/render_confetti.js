function triggerConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    var myConfetti = confetti.create(canvas, { resize: true });
    var duration = 5 * 100000;
    var end = Date.now() + duration;

    (function frame() {
      myConfetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      myConfetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
  window.onload = triggerConfetti;