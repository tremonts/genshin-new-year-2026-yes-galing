// --- LANTERN GENERATION ---
function createLantern(isUser = false, text = "", withPaimon = false) {
    const container = document.getElementById('lantern-container');
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');
    
    // Random start position
    const startPos = Math.random() * 80 + 10;
    lantern.style.left = startPos + 'vw';
    
    // Randomize size slightly
    const scale = 0.5 + Math.random() * 0.5;
    lantern.style.transform = `scale(${scale})`;
    
    // Randomize animation duration for depth
    const duration = 10 + Math.random() * 10;
    lantern.style.animationDuration = `${duration}s`;

    if (isUser) {
        lantern.style.width = '50px';
        lantern.style.height = '70px';
        lantern.style.background = 'radial-gradient(circle, #fff, #ffd700)';
        lantern.style.zIndex = '100';
        lantern.style.boxShadow = '0 0 40px #ffd700';
        
        lantern.title = text;
        
        if (withPaimon) {
            lantern.classList.add('user-lantern-with-paimon');
            
            // Create Paimon speech bubble
            const bubble = document.createElement('div');
            bubble.classList.add('paimon-bubble');
            bubble.innerHTML = `"<strong>Paimon:</strong> ${text}"`;
            
            // Create Paimon image (use excited Paimon for lantern)
            const paimon = document.createElement('div');
            paimon.classList.add('paimon-image');
            paimon.style.backgroundImage = "url('Images/PaimonLantern.png')";
            
            lantern.appendChild(bubble);
            lantern.appendChild(paimon);
            
            lantern.style.animationDuration = '20s';
            lantern.style.animationTimingFunction = 'ease-out';
            
            // Make Paimon and bubble fade out near the end
            setTimeout(() => {
                bubble.style.animation = 'fadeOut 2s forwards';
                paimon.style.animation = 'fadeOut 2s forwards, paimonFloat 1s infinite alternate ease-in-out';
            }, 16000);
        }
    }

    container.appendChild(lantern);

    // Cleanup lantern after animation
    setTimeout(() => {
        lantern.remove();
    }, duration * 1000);
}

// Start background lanterns
setInterval(() => createLantern(), 2000);

// --- CHARACTER INTERACTION ---
function revealWish(card, message) {
    // Toggle active class
    if (card.classList.contains('active')) {
        card.classList.remove('active');
        return;
    } else {
        document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
        
        const wishElement = card.querySelector('.char-wish');
        wishElement.innerText = `"${message}"`;
        card.classList.add('active');

        // Burst of lanterns
        for(let i=0; i<5; i++) {
            setTimeout(() => createLantern(), i * 200); 
        }

        // Show Paimon comment for specific characters
        const characterId = card.id;
        
        if (characterId === 'kaveh') {
            // Paimon comment for Kaveh
            setTimeout(() => {
                showPaimonNotification(
                    "Weh buh? Magbayad ka ng renta mo sa asawa muh!",
                    'kaveh'
                );
            }, 500);
        } 
        else if (characterId === 'alhatham') {
            // Paimon comment for Alhaitham
            setTimeout(() => {
                showPaimonNotification(
                    "Sana somarap ka puh anuh? Over naman sa pogi si oms!",
                    'alhaitham'
                );
            }, 500);
        }
    }
}

// --- USER WISH FUNCTION ---
function releaseUserLantern() {
    const input = document.getElementById('userWishInput');
    const wishText = input.value.trim();

    if (wishText) {
        // Create special lantern with Paimon
        createLantern(true, wishText, true);
        
        // Clear input
        input.value = '';
        
        // Show success notification with EXCITED Paimon
        showPaimonNotification(
            `Yes galing taena ang "${wishText}" na yan ay sana matupadstra!`,
            'excited'
        );
    } else {
        // Show error notification with WORRIED Paimon
        showPaimonNotification(
            "Wala kang wish, BA-HA-LA--KA--SA--BU-HAY--MO!",
            'worried'
        );
    }
}

// --- PAIMON NOTIFICATION (NOW WITH 5 EXPRESSIONS) ---
function showPaimonNotification(message, expression = 'happy') {
    // Remove existing notification if any
    const existingNotif = document.querySelector('.paimon-notification');
    if (existingNotif) existingNotif.remove();
    
    // Determine which expression class to use
    let expressionClass = 'paimon-happy';
    switch(expression) {
        case 'excited':
            expressionClass = 'paimon-excited';
            break;
        case 'worried':
            expressionClass = 'paimon-worried';
            break;
        case 'kaveh':
            expressionClass = 'paimon-kaveh';
            break;
        case 'alhaitham':
            expressionClass = 'paimon-alhaitham';
            break;
        default:
            expressionClass = 'paimon-happy';
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.classList.add('paimon-notification');
    notification.innerHTML = `
        <div class="paimon-notif-content">
            <div class="paimon-notif-img ${expressionClass}"></div>
            <div class="paimon-notif-text">${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Initial burst of lanterns on load
window.onload = () => {
    for(let i=0; i<10; i++) {
        setTimeout(() => createLantern(), i * 500);
    }
    
    // Welcome message from Paimon (HAPPY expression)
    setTimeout(() => {
        showPaimonNotification(
            "Hi Igitters! Pie-Moan is here para tulonganstra ka sa wishes mo! Kaya naman magwish na, ako bahala dalhin sa langestra niyan!",
            'happy'
        );
    }, 2000);
};