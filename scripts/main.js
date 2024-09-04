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
    const mobileHeader = document.getElementById('mobile-header');
    
    if (isMobile) {
        createMobileHeaderBubbles();
        if (bubbleContainer) bubbleContainer.style.display = 'none';
        if (centralBubble) centralBubble.style.display = 'none';
        if (sidePanel) {
            sidePanel.style.width = '100%';
            sidePanel.style.height = 'auto';
            sidePanel.style.minHeight = 'calc(100vh - 60px)'; // Adjust based on header height
            sidePanel.style.overflowY = 'visible';
        }
        if (mobileHeader) {
            mobileHeader.style.display = 'block';
            // Ensure the portfolio content is pushed down
            document.getElementById('portfolio').style.paddingTop = '60px'; // Adjust based on header height
        }
    } else {
        initializeBubbles();
        if (bubbleContainer) bubbleContainer.style.display = 'flex';
        if (mobileHeader) mobileHeader.style.display = 'none';
        document.getElementById('portfolio').style.paddingTop = '0';
        // ... rest of the desktop/tablet layout logic ...
    }
    
    updateBubbleDisplay();
}

window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);
