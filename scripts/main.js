document.addEventListener('DOMContentLoaded', () => {
    initializeBubbles();
    initializeText();
    initializeModals();
    createMobileHeaderBubbles();
    document.addEventListener('click', handleClickOutside);
});

function handleClickOutside(event) {
    const modalContainer = document.getElementById('modal-container');
    // Only handle clicks outside when no modal is open
    if (modalContainer.style.display !== 'block') {
        if (!event.target.closest('#side-panel') && !event.target.closest('.bubble') && !event.target.closest('#mobile-header-content')) {
            if (selectedField !== null) {
                selectedField = null;
                updateMobileHeaderDisplay(); // Change this line
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