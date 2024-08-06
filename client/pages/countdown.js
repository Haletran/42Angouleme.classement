var countDownDate = new Date("Aug 30, 2024 17:00:00").getTime();
var startDate = new Date("Aug 5 2024 11:00:00").getTime();

var countdownInterval = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var totalDuration = countDownDate - startDate;
  var elapsed = now - startDate;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("countdown").innerHTML = days + " jours restants";

  var progress = Math.floor((elapsed / totalDuration) * 100);
  document.getElementById("progressBar").value = progress;

  if (distance <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "Fin de la piscine !";
  }
}, 10);