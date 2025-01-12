window.onload = function () 
{

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const img = new Image();
    img.src = 'img/schelete.png';

    img.onload = function () {
        ctx.drawImage(img, 140, 20, 200, 450);
    };

    const button = document.getElementById('generare-button');

    const images = [
        'img/craniu.png',
        'img/piciordr.png',
        'img/coloana.png',
        'img/bratdr.png',
        'img/coaste.png',
        'img/pelvis.png',
        'img/bratst.png',
        'img/piciorst.png'
    ];

    let imageCounter = 0;
    const draggableImages = [];

    function getRandomPosition(imgWidth, imgHeight) {
        const x = Math.random() * (canvas.width - imgWidth);
        const y = Math.random() * (canvas.height - imgHeight);
        return { x, y };
    }

    function generateRandomImage() {
        if (imageCounter >= images.length) 
            {
            button.remove();
            const newButton = document.createElement('button');
            newButton.innerText = "Verifică-te";
            newButton.id = "new-generare-button";
    
            const container = document.getElementById('joc');
            container.appendChild(newButton);
            
            newButton.style.right = "10px";
            newButton.style.bottom = "10px";
            newButton.style.padding = "10px 20px";
            newButton.style.fontSize = "16px";
            newButton.style.backgroundColor = "#0056b3";
            newButton.style.color = "white";
            newButton.style.border = "none";
            newButton.style.borderRadius = "5px";
            newButton.style.cursor = "pointer";
    
            newButton.addEventListener('click', () => {
                const popup = document.createElement('div');
                popup.style.position = 'fixed';
                popup.style.top = '50%';
                popup.style.left = '50%';
                popup.style.transform = 'translate(-50%, -50%)';
                popup.style.backgroundColor = '#fff';
                popup.style.padding = '20px';
                popup.style.border = '2px solid #000';
                popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                popup.style.zIndex = '1000';
                popup.style.textAlign = 'center';
    
                const imgElement = document.createElement('img');
                imgElement.src = 'img/scheletecompletat.png';
                imgElement.alt = 'Imagine completată';
                imgElement.style.width = '200px';
                imgElement.style.height = '200px';
                popup.appendChild(imgElement);
    
                const closeButton = document.createElement('button');
                closeButton.innerText = 'Închide';
                closeButton.style.marginTop = '10px';
                closeButton.style.padding = '5px 10px';
                closeButton.style.fontSize = '14px';
                closeButton.style.backgroundColor = '#0056b3';
                closeButton.style.color = 'white';
                closeButton.style.border = 'none';
                closeButton.style.borderRadius = '5px';
                closeButton.style.cursor = 'pointer';
    
                closeButton.addEventListener('click', () => {
                    popup.remove();
                });
                popup.appendChild(closeButton);
    
                document.body.appendChild(popup);
            });
    
            return;
        }
    
        const img = new Image();
        img.src = images[imageCounter];
    
        img.onload = function () {
            const newWidth = 90;
            const newHeight = 180;
    
            const position = getRandomPosition(newWidth, newHeight);
            ctx.drawImage(img, position.x, position.y, newWidth, newHeight);
    
            draggableImages.push({
                img: img,
                x: position.x,
                y: position.y,
                width: newWidth,
                height: newHeight,
                isDragging: false
            });
    
            imageCounter++;
        };
    }
    
    button.addEventListener('click', generateRandomImage);

    let isDragging = false;
    let currentImage = null;
    let offsetX = 0;
    let offsetY = 0;

    canvas.addEventListener('mousedown', (e) => {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        draggableImages.forEach((img) => {
            if (
                mouseX > img.x &&
                mouseX < img.x + img.width &&
                mouseY > img.y &&
                mouseY < img.y + img.height
            ) {
                isDragging = true;
                currentImage = img;
                offsetX = mouseX - img.x;
                offsetY = mouseY - img.y;
                img.isDragging = true;

                console.log("Image selected:", img);
            }
        });
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDragging && currentImage) {
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            currentImage.x = mouseX - offsetX;
            currentImage.y = mouseY - offsetY;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 140, 20, 200, 450);

            draggableImages.forEach((img) => {
                ctx.drawImage(img.img, img.x, img.y, img.width, img.height);
            });

            console.log("Dragging image:", currentImage);
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (currentImage) {
            console.log("Dropped image:", currentImage);
            currentImage.isDragging = false;
        }
        isDragging = false;
        currentImage = null;
    });

    canvas.addEventListener('mouseout', () => {
        if (currentImage) {
            currentImage.isDragging = false;
        }
        isDragging = false;
        currentImage = null;
    });
 
};
