fetch('../../generate_info/db/aug.json')
    .then(response => response.json())
    .then(data => {
        let exam00Count = 0;
        let rush01Count = 0;
        let exam01Count = 0;
        let totalLevel = 0;

        data.forEach(person => {
            if (person.exam1 >= 30) exam00Count++;
            if (person.rush00 >= 30) rush01Count++;
            if (person.exam1 >= 30) exam01Count++;
            totalLevel += person.level;
        });

        const averageLevel = totalLevel / data.length;

        document.getElementById('container-data2').innerHTML = `<strong>${exam00Count} / ${data.length}</strong> <br> <span style="color:grey;">ont validé l'exam 00</span>`;
        document.getElementById('container-data4').innerHTML = `<strong>${averageLevel.toFixed(2)}</strong><br> <span style="color:grey;">level moyen</span>`;
        document.getElementById('container-data5').innerHTML = `<strong></strong><br> <span style="color:grey;">Ratio F/G</span>`;
        document.getElementById('container-data1').innerHTML = `<strong>${rush01Count} / ${data.length}</strong> <br> <span style="color:grey;">ont validé le RUSH 00</span>`;
        document.getElementById('container-data3').innerHTML = `<strong>${exam01Count} / ${data.length}</strong> <br> <span style="color:grey;">ont validé l'exam 01</span>`;
    })
    .catch(error => console.error('Erreur:', error));