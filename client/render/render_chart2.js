fetch('../generate_info/data_store/levelmoyenne.json')
    .then(response => response.text())
    .then(data => {
        let points = data.split('\n').filter(line => line.trim() !== '').map(line => Number(line));
        points = points.filter((value, index, self) => index === 0 || value !== self[index - 1]);
        let ctx = document.getElementById('myChart2').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: points.map((value) => ''),
                datasets: [{
                    label: 'Level moyen',
                    data: points,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options:
            {
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolution du level moyen de la piscine de aout 2024'
                    }
                },
            }
        });
    });