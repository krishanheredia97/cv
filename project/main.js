document.addEventListener('DOMContentLoaded', () => {
    initializeBubbles();
    initializeText();
    initializeModals();
    document.addEventListener('click', handleClickOutside);
});

function handleClickOutside(event) {
    if (!event.target.closest('#side-panel') && !event.target.closest('.bubble') && !event.target.closest('#lorem-ipsum-container')) {
        if (selectedField !== null) {
            selectedField = null;
            updateBubbleDisplay();
            updateText(portfolioData.defaultText, portfolioData.defaultStylingRules);
        }
    }
}

function initializeModals() {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    modalContainer.className = 'modal';
    document.body.appendChild(modalContainer);
}