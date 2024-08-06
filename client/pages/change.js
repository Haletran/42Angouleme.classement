document.getElementById('yearSelect').addEventListener('change', function() {
  window.location.href = '/classement?year=' + this.value;
});