const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Are you really realy sure???",
        "Think again?",
        "Don't believe in second chances?",
        "Why are you being so cold?",
        "Maybe we can talk about it?",
        "I am not going to ask again!",
        "Ok now this is hurting my feelings!",
        "You are now just being mean!",
        "Why are you doing this to me?",
        "Please give me a chance!",
        "I am begging you to stop!",
        "Ok, Let's just start over.."
    ],
    french: [
        "Non",
        "Tu es sûr ?",
        "Tu es vraiment sûr ??",
        "Tu es vraiment vraiment sûr ???",
        "Réfléchis encore?",
        "Tu ne crois pas aux deuxièmes chances ?",
        "Pourquoi tu es si froid?",
        "Peut-être, on peut en parler ?",
        "Je ne vais pas demander encore une fois!",
        "D'accord, maintenant ca me fait mal!",
        "Tu es juste méchant!",
        "Pourquoi tu me fais ça?",
        "Donnez-moi une chance plz!",
        "Je te supplie d'arrêter!",
        "D'accord, recommençons.."
    ],
    thai: [
        "ไม่อ่ะ",
        "แน่ใจจริงๆหรอคะ?",
        "แน่ใจจริงๆ จริงๆนะคะ?",
        "อย่าบอกนะว่านี่แน่ใจสุดๆแล้วจริงๆ ?",
        "ลองคิดดูอีกทีหน่อยสิคะ..",
        "ขอโอกาศที่สองทีค่ะ..",
        "อย่าเย็นชาสิคะ กระซิกๆ",
        "ขอร้องนะคะ",
        "น้าาาๆๆๆๆๆ",
        "เราจะร้องไห้เอานะ กระซิกๆ",
        "จะเอางี้ๆจริงหรอคะ",
        "ฮือออออ",
        "ขอโอกาศครั้งที่สองที่ค่ะ!",
        "ขอร้องละค่าาา",
        "โอเคค่ะ.. งั้นเริ่มใหม่ !"
    ]
};

answers_yes = {
    "english": "Yes",
    "french": "Oui",
    "Thailand": "เย่ คืนดีกันแล้วน้า"
}

let language = "english"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

// Login functionality
const CORRECT_USERNAME = "shilip";
const CORRECT_PASSWORD = "i love you";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const mainContainer = document.getElementById('main-container');
    const errorMessage = document.getElementById('error-message');

    // Check if user is already logged in
    if (sessionStorage.getItem('loggedIn') === 'true') {
        loginContainer.style.display = 'none';
        mainContainer.style.display = 'flex';
        updateLoveLetter();
        return;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
            // Successful login
            sessionStorage.setItem('loggedIn', 'true');
            loginContainer.style.display = 'none';
            mainContainer.style.display = 'flex';
            errorMessage.textContent = '';
            updateLoveLetter();
        } else {
            // Failed login
            errorMessage.textContent = 'Invalid username or password. Please try again.';
            document.getElementById('password').value = '';
        }
    });
});

// Initialize love letter on page load (only if logged in)
if (sessionStorage.getItem('loggedIn') === 'true') {
    updateLoveLetter();
}

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        no_button.innerHTML = answers_no[language][0];
        yes_button.innerHTML = answers_yes[language];
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }
});

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "public/images/yes.gif";
    refreshBanner();
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
});

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    // Update question heading
    const questionHeading = document.getElementById("question-heading");
    if (language === "french") {
        questionHeading.textContent = "Veux-tu m'épouser?";
    } else if (language === "thai") {
        questionHeading.textContent = "แต่งงานกับฉันได้ไหม?";
    } else {
        questionHeading.textContent = "Will you marry me?";
    }

    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    if (clicks === 0) {
        no_button.innerHTML = answers_no[language][0];
    } else {
        no_button.innerHTML = answers_no[language][clicks];
    }

    // Update success message
    const successMessage = document.getElementById("success-message");
    if (language === "french") {
        successMessage.textContent = "Yepppie, je t'aime! :3";
    } else if (language === "thai") {
        successMessage.textContent = "เยี่ยมเลย! รักคุณมาก :3";
    } else {
        successMessage.textContent = "Yepppie, I love you! :3";
    }

    // Update love letter
    updateLoveLetter();
}

const loveLetters = {
    english: {
        date: "Today",
        greeting: "My Dearest Shilpi,",
        body: [
            "I love you, my cutiee. I love you so much. From the moment you said yes, my heart has been overflowing with joy. I love you more than I can express, my chips. You are my sunshine, my everything, and I cannot wait to spend the rest of my life with you, my rasgula. I love you, I love you, I love you!",
            "I love you with all my heart, Shilpi. Every day with you feels like a dream come true. I love you so deeply, my cutiee. Your smile lights up my world, your laughter is my favorite sound, and your love is the greatest gift I've ever received, my chips. I love you, I love you, I love you, rasgula!",
            "I love you more than words can say, Shilpi. I promise to love you, cherish you, and stand by your side through all of life's adventures, my cutiee. I love you unconditionally, chips. Together, we can conquer anything, rasgula. I love you, I love you, I love you!",
            "I love you beyond measure, Shilpi. Thank you for making me the happiest person in the world, my cutiee. I love you more than the stars in the sky, more than the waves in the ocean, chips. I love you, I love you, I love you, rasgula! I will love you forever and always. I love you so much, my darling Shilpi, my cutiee, my chips, my rasgula. I love you! ❤️"
        ],
        signature: "Forever yours,\nWith all my love ❤️\nI love you, I love you, I love you!\n- To my Shilpi, cutiee, chips, and rasgula"
    },
    french: {
        date: "Aujourd'hui",
        greeting: "Ma très chère Shilpi,",
        body: [
            "Je t'aime, ma cutiee. Je t'aime tellement. Depuis le moment où tu as dit oui, mon cœur déborde de joie. Je t'aime plus que je ne peux l'exprimer, mon chips. Tu es mon soleil, mon tout, et je ne peux pas attendre de passer le reste de ma vie avec toi, ma rasgula. Je t'aime, je t'aime, je t'aime!",
            "Je t'aime de tout mon cœur, Shilpi. Chaque jour avec toi ressemble à un rêve devenu réalité. Je t'aime si profondément, ma cutiee. Ton sourire illumine mon monde, ton rire est mon son préféré, et ton amour est le plus beau cadeau que j'aie jamais reçu, mon chips. Je t'aime, je t'aime, je t'aime, rasgula!",
            "Je t'aime plus que les mots ne peuvent le dire, Shilpi. Je promets de t'aimer, de te chérir et de rester à tes côtés à travers toutes les aventures de la vie, ma cutiee. Je t'aime inconditionnellement, chips. Ensemble, nous pouvons tout conquérir, rasgula. Je t'aime, je t'aime, je t'aime!",
            "Je t'aime au-delà de toute mesure, Shilpi. Merci de faire de moi la personne la plus heureuse du monde, ma cutiee. Je t'aime plus que les étoiles dans le ciel, plus que les vagues dans l'océan, chips. Je t'aime, je t'aime, je t'aime, rasgula! Je t'aimerai pour toujours et toujours. Je t'aime tellement, ma chérie Shilpi, ma cutiee, mon chips, ma rasgula. Je t'aime! ❤️"
        ],
        signature: "Pour toujours à toi,\nAvec tout mon amour ❤️\nJe t'aime, je t'aime, je t'aime!\n- À ma Shilpi, cutiee, chips et rasgula"
    },
    thai: {
        date: "วันนี้",
        greeting: "ที่รักของฉัน Shilpi,",
        body: [
            "ฉันรักคุณ cutiee ของฉัน ฉันรักคุณมากๆ ตั้งแต่ที่คุณตอบตกลง หัวใจของฉันก็เต็มไปด้วยความสุข ฉันรักคุณมากกว่าที่จะบอกได้ chips ของฉัน คุณคือแสงแดดของฉัน ทุกสิ่งทุกอย่างของฉัน และฉันไม่สามารถรอที่จะใช้ชีวิตที่เหลืออยู่กับคุณ rasgula ของฉัน ฉันรักคุณ ฉันรักคุณ ฉันรักคุณ!",
            "ฉันรักคุณด้วยหัวใจทั้งหมดของฉัน Shilpi ทุกวันที่อยู่กับคุณรู้สึกเหมือนฝันที่เป็นจริง ฉันรักคุณอย่างลึกซึ้ง cutiee ของฉัน รอยยิ้มของคุณทำให้โลกของฉันสว่าง เสียงหัวเราะของคุณคือเสียงที่ฉันชอบที่สุด และความรักของคุณคือของขวัญที่ยิ่งใหญ่ที่สุดที่ฉันเคยได้รับ chips ฉันรักคุณ ฉันรักคุณ ฉันรักคุณ rasgula!",
            "ฉันรักคุณมากกว่าคำพูดใดๆ จะบอกได้ Shilpi ฉันสัญญาว่าจะรักคุณ หวงแหนคุณ และยืนเคียงข้างคุณผ่านการผจญภัยทั้งหมดของชีวิต cutiee ของฉัน ฉันรักคุณอย่างไม่มีเงื่อนไข chips ด้วยกัน เราสามารถเอาชนะอะไรก็ได้ rasgula ฉันรักคุณ ฉันรักคุณ ฉันรักคุณ!",
            "ฉันรักคุณเกินกว่าจะวัดได้ Shilpi ขอบคุณที่ทำให้ฉันเป็นคนที่มีความสุขที่สุดในโลก cutiee ของฉัน ฉันรักคุณมากกว่าดวงดาวในท้องฟ้า มากกว่าคลื่นในมหาสมุทร chips ฉันรักคุณ ฉันรักคุณ ฉันรักคุณ rasgula! ฉันจะรักคุณตลอดไปและตลอดกาล ฉันรักคุณมากๆ ที่รักของฉัน Shilpi, cutiee, chips และ rasgula ฉันรักคุณ! ❤️"
        ],
        signature: "ของคุณตลอดไป\nด้วยความรักทั้งหมด ❤️\nฉันรักคุณ ฉันรักคุณ ฉันรักคุณ!\n- ถึง Shilpi, cutiee, chips และ rasgula ของฉัน"
    }
};

function updateLoveLetter() {
    const letter = loveLetters[language] || loveLetters.english;
    const letterDate = document.getElementById("letter-date");
    const letterGreeting = document.getElementById("letter-greeting");
    const letterBody = document.getElementById("letter-body");
    const letterSignature = document.getElementById("letter-signature");

    if (letterDate) letterDate.textContent = letter.date;
    if (letterGreeting) letterGreeting.textContent = letter.greeting;
    if (letterBody) {
        letterBody.innerHTML = letter.body.map(paragraph => `<p>${paragraph}</p>`).join('');
    }
    if (letterSignature) letterSignature.innerHTML = letter.signature.replace(/\n/g, '<br>');
}