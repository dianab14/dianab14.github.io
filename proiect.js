window.onload = function()
{
    var meniulogo = document.getElementById("meniulogo");
    var meniu = document.getElementById("meniu");

    meniu.style.right = "-250px";
    meniulogo.onclick = function()
        {
            if(meniu.style.right == "-250px")
                meniu.style.right = "0";
            else
            {
                meniu.style.right = "-250px";
            }
        }

        const savedColor = localStorage.getItem("backgroundColor");
        if (savedColor) {
            const sistemeSection = document.getElementById("sisteme");
            sistemeSection.style.backgroundColor = savedColor;
            document.getElementById("color").value = savedColor;
        }
        
        document.getElementById("color").addEventListener("input", function () {
            const newColor = this.value;
            const sistemeSection = document.getElementById("sisteme");
            sistemeSection.style.backgroundColor = newColor;
            localStorage.setItem("backgroundColor", newColor);
        });
        
      
        document.getElementById('loginForm').addEventListener('submit', (event) => {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
        
            const usernameRegex = /^[a-zA-Z0-9]{5,}$/; // Min. 5 litere și/sau cifre
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Min. 8 caractere, 1 literă mare, 1 cifră
        
            if (!usernameRegex.test(username)) {
                document.getElementById('error').textContent = 'Nume de utilizator invalid! (minim 5 caractere)';
                return;
            }
        
            if (!passwordRegex.test(password)) {
                document.getElementById('error').textContent = 'Parola trebuie să aibă min. 8 caractere, 1 literă mare, 1 cifră!';
                return;
            }
        
            document.getElementById('error').textContent = '';
        
            const loggedUser = localStorage.getItem('user');
            if (loggedUser) {
                alert('Ești deja autentificat!');
                window.location.href = 'sistem_osos.html#joc';
                return;
            }
            localStorage.setItem('user', JSON.stringify({ username }));
            alert('Autentificare reușită!');
            window.location.href = 'sistem_osos.html#joc';
        });
        
        
        
        
        document.getElementById('logoutButton').addEventListener('click', function () 
        {
           
            localStorage.removeItem('username');
            alert('Te-ai deconectat!');
            window.location.href = 'Proiect_Bejan_Diana.html#introducere'; 
        });
        
}

/*Corpul uman sectiune */
document.addEventListener("DOMContentLoaded", () => {
    const sisteme = document.querySelectorAll(".sistem");
    const infoSistem = document.getElementById("info-sistem");
    const imgSistem = document.getElementById("img-sistem");
  
    const detaliiSisteme = {
      osos: "Sistemul osos oferă suport structural corpului și protejează organele interne.",
      digestiv: "Sistemul digestiv este responsabil pentru procesarea alimentelor și absorbția nutrienților.",
      circulator: "Sistemul circulator transportă sângele, oxigenul și substanțele nutritive în corp.",
      muscular: "Sistemul muscular permite mișcarea și menține postura corpului.",
    };
  
    const imaginiSisteme = {
      osos: "img/osos.png",
      digestiv: "img/digestiv.png",
      circulator: "img/circulator.png",
      muscular: "img/muscular.png",
    };
  
    sisteme.forEach((sistem) => {
      sistem.addEventListener("click", (event) => {
        sisteme.forEach((s) => s.classList.remove("active"));
  
        const elementClicat = event.currentTarget;
        elementClicat.classList.add("active");
  
        const sistemSelectat = elementClicat.dataset.sistem;
        infoSistem.textContent = detaliiSisteme[sistemSelectat];
  
        imgSistem.src = imaginiSisteme[sistemSelectat];
        imgSistem.alt = `Imagine pentru ${sistemSelectat}`;
        imgSistem.style.display = "block";
      });
    });


});





    
  