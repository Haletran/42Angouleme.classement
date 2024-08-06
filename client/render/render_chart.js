fetch('../generate_info/data_store/totalCorrectionPoints.json')
    .then(response => response.text())
    .then(data => {
        let points = data.split('\n').filter(line => line.trim() !== '').map(line => Number(line));
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: points.map((value) => ''),
                datasets: [{
                    label: 'Points de correction',
                    data: points,
                    //borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options:
            {
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolution des points de correction de la piscine de aout 2024'
                    }
                },
            }
        });
    });
