let users = [
    // add tutor here
];
  
let tutorsDiv = document.getElementById('tutors');
  
tutorsDiv.style.display = 'flex';
tutorsDiv.style.justifyContent = 'space-around';
tutorsDiv.style.textAlign = 'center';
tutorsDiv.style.flexWrap = 'wrap';
  
users.forEach(user => {
    let userDiv = document.createElement('div');
    userDiv.className = 'tutor';
  
    let userLink = document.createElement('a');
    userLink.href = user.intra;
    userLink.target = '_blank';
  
    let img = document.createElement('img');
    img.id = 'tutor-image';
    img.src = user.imageUrl;
    img.style.borderRadius = '70%';
    img.style.width = '110px';
    img.style.height = '110px';
    img.style.objectFit = 'cover';
  
    userLink.appendChild(img);
  
    let p = document.createElement('p');
    p.textContent = user.username;
  
    userDiv.appendChild(userLink);
    userDiv.appendChild(p);
  
    tutorsDiv.appendChild(userDiv);
});