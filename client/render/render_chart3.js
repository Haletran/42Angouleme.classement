fetch('../generate_info/db/aug.json')
    .then(response => response.json())
    .then(data => {
        data = data.map(item => {
            if (item.exam === null) {
                item.exam = "n'y est pas allé";
            }
            return item;
        });

        let groupedExams = data.reduce((acc, curr) => {
            if (curr.exam in acc) {
                acc[curr.exam].push(curr.login);
            } else {
                acc[curr.exam] = [curr.login];
            }
            return acc;
        }, {});

        let login =  Object.keys(groupedExams).map(key => `(${groupedExams[key].join(', ')})`);
        let labels = Object.keys(groupedExams).map(key => `${key}`);
        let counts = Object.values(groupedExams).map(value => value.length);

        let ctx = document.getElementById('myChart3').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'nb users',
                    data: counts,
                    borderWidth: 1,
                    borderColor: 'rgb(148, 134, 225)',
                    hoverBackgroundColor: 'rgba(47, 47, 146)'
                }]
            },
            options: {
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Resultats du premier examen de la piscine aout 2024'
                  }
                },
                scales: {
                    y: {
                        display: false
                    }
                }
            },
        });
    });


    fetch('../generate_info/db/aug.json')
    .then(response => response.json())
    .then(data => {
        data = data.map(item => {
            if (item.exam1 === null) {
                item.exam1 = "n'y est pas allé";
            }
            return item;
        });

        let groupedExams = data.reduce((acc, curr) => {
            if (curr.exam1 in acc) {
                acc[curr.exam1].push(curr.login);
            } else {
                acc[curr.exam1] = [curr.login];
            }
            return acc;
        }, {});

        let login =  Object.keys(groupedExams).map(key => `(${groupedExams[key].join(', ')})`);
        let labels = Object.keys(groupedExams).map(key => `${key}`);
        let counts = Object.values(groupedExams).map(value => value.length);

        let ctx = document.getElementById('myChart4').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'nb users',
                    data: counts,
                    borderWidth: 1,
                    borderColor: 'rgb(148, 134, 225)',
                    hoverBackgroundColor: 'rgba(47, 47, 146)'
                }]
            },
            options: {
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Resultats du second examen de la piscine de aout 2024'
                  }
                },
                scales: {
                    y: {
                        display: false
                    }
                }
            },
        });
    });


    fetch('../generate_info/db/aug.json')
    .then(response => response.json())
    .then(data => {
        data = data.map(item => {
            if (item.exam2 === null) {
                item.exam2 = "n'y est pas allé";
            }
            return item;
        });

        let groupedExams = data.reduce((acc, curr) => {
            if (curr.exam2 in acc) {
                acc[curr.exam2].push(curr.login);
            } else {
                acc[curr.exam2] = [curr.login];
            }
            return acc;
        }, {});

        let login =  Object.keys(groupedExams).map(key => `(${groupedExams[key].join(', ')})`);
        let labels = Object.keys(groupedExams).map(key => `${key}`);
        let counts = Object.values(groupedExams).map(value => value.length);

        let ctx = document.getElementById('myChart5').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'nb users',
                    data: counts,
                    borderWidth: 1,
                    borderColor: 'rgb(148, 134, 225)',
                    hoverBackgroundColor: 'rgba(47, 47, 146)'
                }]
            },
            options: {
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Resultats du troisieme examen de la piscine de aout 2024'
                  }
                },
                scales: {
                    y: {
                        display: false
                    }
                }
            },
        });
    });