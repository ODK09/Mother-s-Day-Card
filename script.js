document.addEventListener("DOMContentLoaded", () => {
    const landingPage = document.getElementById('landing-page');
    const setupScreen = document.getElementById('setup-screen');
    const cardScreen = document.getElementById('card-screen');
    const startBtn = document.getElementById('start-btn');
    const generateBtn = document.getElementById('generate-btn');

    // Input elements
    const nameInput = document.getElementById('mom-name-input');
    const msgInput = document.getElementById('message-input');
    const photoInput = document.getElementById('photo-upload');
    const fileStatus = document.getElementById('file-status'); // The text inside the upload box

    // Display elements
    const finalName = document.getElementById('final-name');
    const finalMsg = document.getElementById('final-message');
    const finalPhoto = document.getElementById('final-photo');

    // --- 1. LIVE UPLOAD FEEDBACK ---
    // This part fixes the issue of it looking like nothing was uploaded
    photoInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            // Change the text to show it worked!
            fileStatus.innerHTML = `✅ <span style="color: #db2777; font-weight: bold;">Photo Ready:</span> ${fileName}`;
            // Optional: Change the border color to pink to show success
            this.parentElement.style.borderColor = "#db2777";
            this.parentElement.style.background = "#fdf2f8";
        }
    });

    // --- 2. TRANSITION TO FORM ---
    startBtn.addEventListener('click', () => {
        landingPage.classList.add('hidden');
        setupScreen.classList.remove('hidden');
    });

    // --- 3. GENERATE CARD ---
    generateBtn.addEventListener('click', () => {
        const nameVal = nameInput.value.trim();
        const msgVal = msgInput.value.trim();
        const file = photoInput.files[0];

        if (!nameVal || !msgVal || !file) {
            alert("Please provide a name, message, and a photo!");
            return;
        }

        // Push text to card
        finalName.innerText = `Dear ${nameVal},`;
        finalMsg.innerText = msgVal;

        // Process image and switch screens
        const reader = new FileReader();
        reader.onload = function(e) {
            finalPhoto.src = e.target.result;
            setupScreen.classList.add('hidden');
            cardScreen.classList.remove('hidden');
            window.scrollTo(0, 0);
        };
        reader.readAsDataURL(file);
    });
});