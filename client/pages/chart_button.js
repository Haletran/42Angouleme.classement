var charts = [
    document.getElementById('myChart'),
    document.getElementById('myChart2'),
/*     document.getElementById('myChart3'),
    document.getElementById('myChart4'),
    document.getElementById('myChart5') */
  ];
  var currentIndex = 0;
  var nextButton = document.getElementById('switchButton_after');
  var prevButton = document.getElementById('switchButton_before');
  
  for (var i = 1; i < charts.length; i++) {
    charts[i].style.display = 'none';
  }
  
  nextButton.addEventListener('click', function() {
    charts[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % charts.length;
    charts[currentIndex].style.display = 'block';
  });
  
  prevButton.addEventListener('click', function() {
    charts[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + charts.length) % charts.length;
    charts[currentIndex].style.display = 'block';
  });