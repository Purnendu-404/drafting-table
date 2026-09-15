// --- Floating Hearts Background Canvas ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let hearts = [];
const numHearts = 25;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FloatingHeart {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 16 + 8;
        this.speed = Math.random() * 1.2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.02;
    }
    update() {
        this.y -= this.speed;
        this.angle += this.spin;
        if (this.y < -50) {
            this.reset();
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ff3366';
        
        ctx.beginPath();
        let d = this.size;
        ctx.moveTo(0, d / 4);
        ctx.bezierCurveTo(d / 2, -d / 2, d, d / 3, 0, d);
        ctx.bezierCurveTo(-d, d / 3, -d / 2, -d / 2, 0, d / 4);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < numHearts; i++) {
    hearts.push(new FloatingHeart());
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
        h.update();
        h.draw();
    });
    requestAnimationFrame(animateHearts);
}
animateHearts();

// --- Mobile Navigation Drawer ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const closeDrawer = document.getElementById('closeDrawer');

mobileMenuBtn.addEventListener('click', () => {
    mobileDrawer.classList.add('active');
});

closeDrawer.addEventListener('click', () => {
    mobileDrawer.classList.remove('active');
});

function closeMobileDrawer() {
    mobileDrawer.classList.remove('active');
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- AI Matchmaker Compatibility Calculator ---
function calculateCompatibility() {
    const name1 = document.getElementById('name1').value.trim() || 'You';
    const name2 = document.getElementById('name2').value.trim() || 'Your Crush';
    const sign1 = document.getElementById('sign1').value;
    const sign2 = document.getElementById('sign2').value;
    const loveLang1 = document.getElementById('loveLang1').value;
    const loveLang2 = document.getElementById('loveLang2').value;

    const inputBox = document.getElementById('matchInputBox');
    const resultBox = document.getElementById('matchResultBox');
    const loading = document.getElementById('matchLoading');
    const content = document.getElementById('matchResultContent');

    inputBox.style.display = 'none';
    resultBox.style.display = 'block';
    loading.style.display = 'block';
    content.style.display = 'none';

    // Simulate AI thinking time
    setTimeout(() => {
        loading.style.display = 'none';
        content.style.display = 'block';

        // Generate score based on input lengths or zodiac synergy simulation
        let baseScore = 88;
        if (sign1 === sign2) baseScore += 7;
        if (loveLang1 === loveLang2) baseScore += 5;
        let score = Math.min(Math.floor(baseScore + Math.random() * 8), 99);

        document.getElementById('resultCoupleTitle').innerText = `${name1} & ${name2}`;
        document.getElementById('compatibilityScoreNum').innerText = `${score}%`;
        
        // Animate progress bar
        setTimeout(() => {
            document.getElementById('compatibilityBar').style.width = `${score}%`;
        }, 100);

        // Customize feedback based on signs
        document.getElementById('elementResult').innerText = `${sign1} (${getElement(sign1)}) & ${sign2} (${getElement(sign2)}) create a magnetic field of emotional resonance.`;
        document.getElementById('commResult').innerText = loveLang1 === loveLang2 ? `Matching love languages (${loveLang1}) make emotional translation effortless.` : `Complementary love languages (${loveLang1} & ${loveLang2}) encourage mutual discovery and growth.`;
        document.getElementById('longTermResult').innerText = score > 92 ? `Rare legendary synergy! Destined for deep harmony and enduring passion.` : `Strong foundation with tremendous potential through open communication.`;

        document.getElementById('oracleAdviceText').innerText = `For ${name1} and ${name2}: Plan a cozy weekend getaway or a sunset walk. Your cosmic alignment thrives in tranquil, beautiful environments.`;
    }, 2000);
}

function getElement(sign) {
    const elements = {
        'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
        'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
        'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
        'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
    };
    return elements[sign] || 'Fire';
}

function resetMatchmaker() {
    document.getElementById('matchResultBox').style.display = 'none';
    document.getElementById('matchInputBox').style.display = 'block';
    document.getElementById('compatibilityBar').style.width = '0%';
}

// --- Love Note AI Generator ---
const loveTemplates = {
    "Deep Soulmate & Forever": (name, tone, detail) => `Dearest ${name},\n\nIn a universe of infinite possibilities and shifting stars, finding you was the only certainty my heart ever needed.${detail ? ` Every time I think of ${detail},` : ''} I am reminded that true love isn't just a feeling—it is a homecoming.\n\nWith you, every silence is comfortable, every laugh is profound, and every tomorrow is a blessing. I am yours, completely and eternally.\n\nForever & Always,`,
    "Flirty & Playful Text": (name, tone, detail) => `Hey ${name},\n\nJust a quick reminder that you've been taking up 100% of my thoughts all day.${detail ? ` Especially after ${detail},` : ''} I haven't been able to wipe this silly grin off my face.\n\nAre you always this enchanting, or is it just my lucky day? See you soon! ❤️`,
    "Apology & Making Up": (name, tone, detail) => `My dearest ${name},\n\nMy heart has felt so heavy knowing I caused a shadow between us.${detail ? ` Thinking about ${detail} breaks my heart, because` : ''} your happiness means everything to me.\n\nI am sorry for my missteps. Let's close the distance between us with a warm embrace and leave the rest behind. You are my world.`,
    "Missing You Badly": (name, tone, detail) => `My sweet ${name},\n\nThe space where you should be feels far too quiet today.${detail ? ` I keep remembering ${detail} and` : ''} wishing I could hold your hand right this second.\n\nCounting down the hours until I can look into your eyes again. You are on my mind and in my soul.`,
    "Anniversary & Celebration": (name, tone, detail) => `To my beloved ${name},\n\nAnother chapter of our incredible love story written in gold.${detail ? ` From ${detail} to today,` : ''} every single day with you has been an absolute adventure.\n\nThank you for loving me, challenging me, and making life so gloriously vibrant. Here's to a lifetime more. Happy Anniversary!`,
    "Good Morning Sweetheart": (name, tone, detail) => `Good morning, ${name}!\n\nI opened my eyes this morning and smiled instantly knowing you exist in my world.${detail ? ` Today makes me think of ${detail} and` : ''} how lucky I am to share this journey with you.\n\nHope your day is as radiant and beautiful as your smile. ✨`
};

function generateLoveNote() {
    const occasion = document.getElementById('noteOccasion').value;
    const recipient = document.getElementById('noteRecipient').value.trim() || 'My Love';
    const tone = document.getElementById('noteTone').value;
    const detail = document.getElementById('noteDetail').value.trim();
    const outputBox = document.getElementById('loveNoteOutput');

    const templateFn = loveTemplates[occasion] || loveTemplates["Deep Soulmate & Forever"];
    const generatedText = templateFn(recipient, tone, detail);

    outputBox.innerHTML = `<p>${generatedText}</p>`;
    showToast('Love note crafted successfully!');
}

function copyLoveNote() {
    const text = document.getElementById('loveNoteOutput').innerText;
    navigator.clipboard.writeText(text);
    showToast('Love note copied to clipboard!');
}

function favoriteLoveNote() {
    showToast('Love note saved to your favorites!');
}

// --- Bespoke Date Night Planner ---
const dateIdeas = [
    { title: "Stargazing & Midnight Picnic", category: "cozy", desc: "Pack a thermos of hot cocoa, comfortable blankets, and drive out to a quiet hilltop to gaze at the constellations.", cost: "Free / Low Cost", time: "2-3 Hours" },
    { title: "Artisan Pottery & Clay Workshop", category: "cozy", desc: "Get your hands messy together while creating custom ceramic mugs or bowls. A wonderfully tactile and bonding experience.", cost: "$$", time: "2 Hours" },
    { title: "Sunset Kayaking & Waterfront Dinner", category: "adventure", desc: "Rent a tandem kayak or paddleboard for two, watch the sunset over the water, followed by fresh seafood tacos.", cost: "$$", time: "4 Hours" },
    { title: "Mystery Road Trip", category: "adventure", desc: "Flip a coin at every major intersection or use a random number generator for directions. Discover a hidden diner in a neighboring town.", cost: "$", time: "Half Day" },
    { title: "Chef's Table Rooftop Tasting", category: "luxury", desc: "Book an intimate rooftop table with skyline views, savoring a 5-course artisanal tasting menu paired with fine wine.", cost: "$$$$", time: "3 Hours" },
    { title: "Couples Spa & Aromatherapy", category: "luxury", desc: "Indulge in side-by-side massages, steam rooms, and mineral baths designed to melt away stress and deepen intimacy.", cost: "$$$", time: "3 Hours" },
    { title: "Living Room Fort & Childhood Movie Marathon", category: "budget", desc: "Build an epic blanket fort with fairy lights, order your favorite takeout, and binge nostalgic childhood movies.", cost: "$", time: "All Evening" },
    { title: "DIY Master Chef Competition", category: "budget", desc: "Go to the grocery store with a $20 budget, buy secret ingredients, and cook a 3-course meal together at home.", cost: "$", time: "3 Hours" }
];

function renderDateCards(filter = 'all') {
    const grid = document.getElementById('dateCardsGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? dateIdeas : dateIdeas.filter(d => d.category === filter);

    filtered.forEach(date => {
        const card = document.createElement('div');
        card.className = 'date-card';
        card.innerHTML = `
            <div class="date-card-header">
                <h3>${date.title}</h3>
                <span class="date-badge">${date.category.toUpperCase()}</span>
            </div>
            <div class="date-card-body">
                <p>${date.desc}</p>
                <div class="date-meta">
                    <span><i class="fa-solid fa-tag"></i> ${date.cost}</span>
                    <span><i class="fa-solid fa-clock"></i> ${date.time}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterDates(category) {
    document.querySelectorAll('.date-filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderDateCards(category);
}

renderDateCards('all');

// --- Couples Connection Flashcard Deck ---
const connectionQuestions = [
    { category: "Deep Intimacy", q: "What was the exact moment you realized you were falling in love with me?" },
    { category: "Future Dreams", q: "If we could pack our bags tomorrow and live anywhere in the world for a year, where would we go?" },
    { category: "Vulnerability & Trust", q: "What is one fear or insecurity you've rarely shared with anyone else, but feel safe telling me?" },
    { category: "Playful Spark", q: "What is your favorite memory of us laughing uncontrollably together until it hurt?" },
    { category: "Romance & Appreciation", q: "What is one small thing I do every day that makes you feel deeply loved and cherished?" },
    { category: "Wild Imagination", q: "If we won a million dollars tomorrow, what is the very first extravagant or silly thing we would buy?" },
    { category: "Soul Connection", q: "In what areas of life do you feel I bring out the absolute best version of you?" }
];

let currentCardIndex = 0;

function flipCard() {
    const card = document.getElementById('connectionCard');
    card.classList.toggle('flipped');
}

function nextCard(event) {
    event.stopPropagation();
    const card = document.getElementById('connectionCard');
    card.classList.remove('flipped');

    setTimeout(() => {
        currentCardIndex = (currentCardIndex + 1) % connectionQuestions.length;
        const item = connectionQuestions[currentCardIndex];
        document.getElementById('cardCategory').innerText = item.category;
        document.getElementById('cardQuestionText').innerText = item.q;
        card.classList.add('flipped');
    }, 300);
}

// Preload first card question
document.getElementById('cardCategory').innerText = connectionQuestions[0].category;
document.getElementById('cardQuestionText').innerText = connectionQuestions[0].q;

// --- Modals & Toast Handling ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function switchModal(closeId, openId) {
    closeModal(closeId);
    openModal(openId);
}

function handleAuthSuccess(msg) {
    closeModal('loginModal');
    closeModal('registerModal');
    showToast(msg);
}

function saveMatchCard() {
    const email = document.getElementById('saveMatchEmail').value.trim();
    if (!email) {
        showToast('Please enter a valid email address.');
        return;
    }
    closeModal('saveMatchModal');
    showToast('Compatibility report saved & emailed successfully!');
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email) {
        showToast('Please enter your email address.');
        return;
    }
    document.getElementById('newsletterEmail').value = '';
    showToast('Subscribed to CupidSync love notes successfully!');
}

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    document.getElementById('toastMessage').innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
