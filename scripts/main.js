document.addEventListener('DOMContentLoaded', () => {
    initializeBubbles();
    initializeText();
    initializeModals();
    createMobileHeaderBubbles();
    document.addEventListener('click', handleClickOutside);
    handleResize(); // Call on initial load
});

function handleClickOutside(event) {
    const modalContainer = document.getElementById('modal-container');
    // Only handle clicks outside when no modal is open
    if (modalContainer.style.display !== 'block') {
        if (!event.target.closest('#side-panel') && !event.target.closest('.bubble') && !event.target.closest('#mobile-header-content')) {
            if (selectedField !== null) {
                selectedField = null;
                updateBubbleDisplay();
                updateMobileHeaderDisplay();
                updateText(portfolioData.defaultText, portfolioData.defaultStylingRules);
            }
        }
    }
}

function initializeModals() {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    modalContainer.className = 'modal';
    document.body.appendChild(modalContainer);
}

function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const bubbleContainer = document.getElementById('bubble-container');
    const centralBubble = document.getElementById('central-bubble');
    const sidePanel = document.getElementById('side-panel');
    
    if (isMobile) {
        createMobileHeaderBubbles();
        if (bubbleContainer) bubbleContainer.style.display = 'none';
        if (centralBubble) centralBubble.style.display = 'none';
        if (sidePanel) sidePanel.style.width = '100%';
    } else {
        initializeBubbles();
        bubbleContainer.style.display = 'flex';
        if (isTablet) {
            if (centralBubble) centralBubble.style.display = 'none';
            if (sidePanel) sidePanel.style.width = '60%';
            if (bubbleContainer) bubbleContainer.style.width = '40%';
        } else {
            if (centralBubble) centralBubble.style.display = 'block';
            if (sidePanel) sidePanel.style.width = '33.33%';
            if (bubbleContainer) bubbleContainer.style.width = '66.67%';
        }
    }
    
    updateBubbleDisplay();
}

window.addEventListener('resize', handleResize);