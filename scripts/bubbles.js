let selectedField = null;
let bubblePositions = [];
let lastClickedBubble = null;

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

function toggleBubble(element, data) {
    const isMobile = window.innerWidth <= 768;
    
    // Close the modal if it's open (for mobile)
    if (isMobile) {
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer.style.display === 'block') {
            closeModal();
        }
    }
  
    if (selectedField === data.name) {
        // Unselect the current bubble
        selectedField = null;
        updateText(portfolioData.defaultText, portfolioData.defaultStylingRules);
        lastClickedBubble = null;
    } else {
        // Select the new bubble
        selectedField = data.name;
        updateText(data.text, data.stylingRules);
        lastClickedBubble = element;
    }
    
    if (isMobile) {
        updateMobileHeaderDisplay();
    } else {
        updateBubbleDisplay();
    }
}

function updateMobileHeaderDisplay() {
    document.querySelectorAll('.mobile-bubble-title').forEach(b => {
        if (selectedField === null) {
            // If no bubble is selected, show all bubbles as active
            b.style.opacity = '1';
            b.classList.remove('active');
        } else if (b.textContent === selectedField) {
            // Highlight the selected bubble
            b.style.opacity = '1';
            b.classList.add('active');
        } else {
            // Fade out non-selected bubbles
            b.style.opacity = '0.5';
            b.classList.remove('active');
        }
    });
}

function updateBubbleDisplay() {
    document.querySelectorAll('.bubble').forEach(bubble => {
        const bubbleData = portfolioData.fields.find(field => field.name === bubble.querySelector('.bubble-title').textContent);
        if (selectedField === null || selectedField === bubbleData.name) {
            bubble.classList.remove('inactive');
        } else {
            bubble.classList.add('inactive');
        }
    });
}

function positionBubble(bubble, angle, distance) {
    const portfolioRect = document.getElementById('bubble-container').getBoundingClientRect();
    const centerX = portfolioRect.width / 2;
    const centerY = portfolioRect.height / 2;
    const bubbleRect = bubble.getBoundingClientRect();
    const position = calculatePosition(angle, distance, centerX, centerY, bubbleRect.width, bubbleRect.height);
    bubble.style.left = `${position.x}px`;
    bubble.style.top = `${position.y}px`;
}

function calculateDistance(baseDistance, time, index) {
    const portfolioRect = document.getElementById('bubble-container').getBoundingClientRect();
    const minDimension = Math.min(portfolioRect.width, portfolioRect.height);
    const dynamicBaseDistance = minDimension * 0.3; // Adjust this factor as needed
    return dynamicBaseDistance + Math.sin(time * 0.0002 + index) * (minDimension * 0.05);
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

function createMobileHeaderBubbles() {
    const mobileHeader = document.getElementById('mobile-header');
    mobileHeader.innerHTML = ''; // Clear existing content
    const mobileHeaderContent = document.createElement('div');
    mobileHeaderContent.id = 'mobile-header-content';
    mobileHeader.appendChild(mobileHeaderContent);

    // Create the set of bubbles
    portfolioData.fields.forEach(data => {
        const bubbleTitle = createMobileBubble(data);
        mobileHeaderContent.appendChild(bubbleTitle);
    });
}

function createMobileBubble(data) {
    const bubbleTitle = document.createElement('div');
    bubbleTitle.className = 'mobile-bubble-title';
    bubbleTitle.style.backgroundColor = data.color;
    bubbleTitle.textContent = data.name;
    bubbleTitle.addEventListener('click', () => toggleBubble(bubbleTitle, data));
    return bubbleTitle;
}

// Make sure these functions are available globally
window.toggleBubble = toggleBubble;
window.createMobileHeaderBubbles = createMobileHeaderBubbles;
window.updateMobileHeaderDisplay = updateMobileHeaderDisplay;
window.updateBubbleDisplay = updateBubbleDisplay;
window.initializeBubbles = initializeBubbles;