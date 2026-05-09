document.addEventListener("DOMContentLoaded", () => {
    const landingPage = document.getElementById('landing-page');
    const setupScreen = document.getElementById('setup-screen');
    const cardScreen = document.getElementById('card-screen');
    const startBtn = document.getElementById('start-btn');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');

    const nameInput = document.getElementById('mom-name-input');
    const msgInput = document.getElementById('message-input');
    const photoInput = document.getElementById('photo-upload');
    const fileStatus = document.getElementById('file-status');

    const finalName = document.getElementById('final-name');
    const finalMsg = document.getElementById('final-message');
    const finalPhoto = document.getElementById('final-photo');

    // 1. Live Upload Feedback (Fixes the "no photo showing" issue)
    photoInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileStatus.innerHTML = `✅ <span style="color: #db2777; font-weight: bold;">Photo Ready:</span> ${this.files[0].name}`;
            this.parentElement.style.borderColor = "#db2777";
            this.parentElement.style.background = "#fdf2f8";
        }
    });

    // 2. Start Button
    startBtn.addEventListener('click', () => {
        landingPage.classList.add('hidden');
        setupScreen.classList.remove('hidden');
    });

    // 3. Generate Card
    generateBtn.addEventListener('click', () => {
        const nameVal = nameInput.value.trim();
        const msgVal = msgInput.value.trim();
        const file = photoInput.files[0];

        if (!nameVal || !msgVal || !file) {
            alert("Please fill in all fields and upload a photo!");
            return;
        }

        finalName.innerText = `Dear ${nameVal},`;
        finalMsg.innerText = msgVal;

        const reader = new FileReader();
        reader.onload = function(e) {
            finalPhoto.src = e.target.result;
            setupScreen.classList.add('hidden');
            cardScreen.classList.remove('hidden');
            window.scrollTo(0, 0);
        };
        reader.readAsDataURL(file);
    });

    // 4. Download as JPEG (New Update)
    downloadBtn.addEventListener('click', () => {
        const card = document.querySelector('.style-book');
        
        // Temporarily remove the slight rotation for a cleaner crop
        card.style.transform = "none";

        html2canvas(card, {
            useCORS: true,
            scale: 3, // High quality
            backgroundColor: "#fffef0"
        }).then(canvas => {
            const image = canvas.toDataURL("image/jpeg", 0.9);
            const link = document.createElement('a');
            link.download = `Mothers_Day_Card.jpg`;
            link.href = image;
            link.click();
            
            // Put the rotation back
            card.style.transform = "rotate(-1deg)";
        });
    });
});
