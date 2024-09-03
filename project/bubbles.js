let selectedField = null;
let bubblePositions = [];

function createBubble(data) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.width = `${data.size}px`;
    bubble.style.height = `${data.size}px`;
    bubble.style.backgroundColor = data.color;

    const content = document.createElement('div');
    content.className = 'bubble-content';

    const icon = document.createElement('i');
    icon.className = `bubble-icon fas ${data.icon}`;
    content.appendChild(icon);

    const title = document.createElement('div');
    title.className = 'bubble-title';
    title.textContent = data.name;
    content.appendChild(title);

    bubble.appendChild(content);

    bubble.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleBubble(bubble, data);
    });

    return bubble;
}

function toggleBubble(bubble, data) {
    if (selectedField === data.name) {
        selectedField = null;
        updateText(portfolioData.defaultText, portfolioData.defaultStylingRules);
    } else {
        selectedField = data.name;
        updateText(data.text, data.stylingRules);
    }
    updateBubbleDisplay();
}

function updateBubbleDisplay() {
    document.querySelectorAll('.bubble').forEach(b => {
        const fieldName = b.querySelector('.bubble-title').textContent;
        if (selectedField === null || fieldName === selectedField) {
            b.style.filter = 'none';
        } else {
            b.style.filter = 'grayscale(100%)';
        }
    });
}

function positionBubble(bubble, angle, distance) {
    const portfolioRect = document.getElementById('bubble-container').getBoundingClientRect();
    const centerX = portfolioRect.width / 2;
    const centerY = portfolioRect.height / 2;
    const position = calculatePosition(angle, distance, centerX, centerY, bubble.offsetWidth, bubble.offsetHeight);
    bubble.style.left = `${position.x}px`;
    bubble.style.top = `${position.y}px`;
}

function animateBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        const angle = calculateAngle(index, bubbles.length);
        const distance = calculateDistance(250, Date.now(), index);
        positionBubble(bubble, angle, distance);
        bubblePositions[index] = { angle, distance };
    });
    
    requestAnimationFrame(animateBubbles);
}

function initializeBubbles() {
    const bubbleContainer = document.getElementById('bubble-container');
    portfolioData.fields.forEach(data => {
        const bubble = createBubble(data);
        bubbleContainer.appendChild(bubble);
    });
    animateBubbles();
}