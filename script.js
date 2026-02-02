// Envelope opening functionality
const envelopeWrapper = document.querySelector('.envelope-wrapper');
let isOpened = false;

// Open envelope on click
envelopeWrapper.addEventListener('click', function(e) {
    if (!isOpened) {
        this.classList.add('opened');
        isOpened = true;
        createSparkle(e.clientX, e.clientY);
        
        // Create multiple sparkles around the envelope
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const rect = this.getBoundingClientRect();
                const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 200;
                const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 200;
                createSparkle(x, y);
            }, i * 100);
        }
    }
});

// Envelope only opens on click - no auto-open

function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.position = 'fixed';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add subtle letter hover effect (only after opened)
document.addEventListener('mousemove', function(e) {
    if (isOpened) {
        const letter = document.querySelector('.letter');
        const rect = letter.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - letterCenterX;
        const mouseY = e.clientY - letterCenterY;
        
        const rotateX = (mouseY / rect.height) * -5;
        const rotateY = (mouseX / rect.width) * 5;
        
        letter.style.transform = `translate(-50%, -50%) translateY(-50px) scale(1) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});

// Add parallax effect on mouse move for hearts
document.addEventListener('mousemove', function(e) {
    const hearts = document.querySelectorAll('.heart');
    const kisses = document.querySelectorAll('.kiss');
    const pulseHearts = document.querySelectorAll('.pulse-heart');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    hearts.forEach((heart, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        heart.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    kisses.forEach((kiss, index) => {
        const speed = (index % 3 + 1) * 0.3;
        const x = (mouseX - 0.5) * speed * 15;
        const y = (mouseY - 0.5) * speed * 15;
        kiss.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    pulseHearts.forEach((heart, index) => {
        const speed = (index % 2 + 1) * 0.4;
        const x = (mouseX - 0.5) * speed * 25;
        const y = (mouseY - 0.5) * speed * 25;
        heart.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Create floating hearts dynamically
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (10 + Math.random() * 10) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (15 + Math.random() * 15) + 'px';
    document.querySelector('.hearts-container').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 25000);
}

// Create floating kisses dynamically
function createFloatingKiss() {
    const kiss = document.createElement('div');
    kiss.className = 'kiss';
    kiss.textContent = '💋';
    kiss.style.left = Math.random() * 100 + '%';
    kiss.style.animationDuration = (15 + Math.random() * 10) + 's';
    kiss.style.animationDelay = Math.random() * 5 + 's';
    kiss.style.fontSize = (20 + Math.random() * 20) + 'px';
    document.querySelector('.kisses-container').appendChild(kiss);
    
    setTimeout(() => {
        kiss.remove();
    }, 30000);
}

// Periodically create new floating hearts and kisses
setInterval(() => {
    if (Math.random() > 0.5) {
        createFloatingHeart();
    } else {
        createFloatingKiss();
    }
}, 3000);

// Add random sparkles periodically
setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createSparkle(x, y);
}, 3000);
