let currentText = "Default text";
let currentStylingRules = []
let typewriterInterval;
let isTyping = false;

function generateStyledText(text, stylingRules) {
    let styledText = text;

    stylingRules.forEach(rule => {
        const regex = new RegExp(rule.phrase, 'gi');
        styledText = styledText.replace(regex, match => {
            let classes = rule.class ? `class="${rule.class} clickable"` : 'class="clickable"';
            let modalAttr = rule.modal ? `data-modal="${rule.modal}"` : '';
            return `<span ${classes} ${modalAttr} onclick="handleWordClick(this, '${match}')">${match}</span>`;
        });
    });

    return styledText;
}

function handleWordClick(element, word) {
    console.log(`Clicked word or phrase: ${word}`);
    const modalId = element.getAttribute('data-modal');
    if (modalId) {
        fetchModalData(modalId);
    }
}

function typeWriter(text, index = 0) {
    isTyping = true;
    const textContainer = document.getElementById('text-container');
    if (index < text.length) {
        let nextIndex = index + 1;
        let currentSubstring = text.substring(0, nextIndex);
        
        textContainer.innerHTML = generateStyledText(currentSubstring, currentStylingRules);
        
        const totalDuration = 1000; // 1 second in milliseconds
        const intervalDuration = totalDuration / text.length;
        typewriterInterval = setTimeout(() => typeWriter(text, nextIndex), intervalDuration);
    } else {
        clearTimeout(typewriterInterval);
        isTyping = false;
    }
}

function completeTextAnimation() {
    if (isTyping) {
        clearTimeout(typewriterInterval);
        const textContainer = document.getElementById('text-container');
        textContainer.innerHTML = generateStyledText(currentText, currentStylingRules);
        isTyping = false;
    }
}

function updateText(newText, newStylingRules) {
    clearTimeout(typewriterInterval);
    currentText = newText;
    currentStylingRules = newStylingRules;
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    typeWriter(currentText);
}

function initializeText() {
    const textContainer = document.createElement('div');
    textContainer.id = 'text-container';
    document.querySelector('.section-2').appendChild(textContainer);
    updateText(portfolioData.defaultText, portfolioData.defaultStylingRules);

    // Add click event listener to the side panel
    const sidePanel = document.getElementById('side-panel');
    sidePanel.addEventListener('click', completeTextAnimation);
}

document.addEventListener('DOMContentLoaded', initializeText);