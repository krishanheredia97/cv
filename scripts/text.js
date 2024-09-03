let currentText = "Default text";
let currentStylingRules = []
let typewriterInterval;

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
    const textContainer = document.getElementById('text-container');
    if (index < text.length) {
        let nextIndex = index + 1;
        let currentSubstring = text.substring(0, nextIndex);
        
        textContainer.innerHTML = generateStyledText(currentSubstring, currentStylingRules);
        
        const totalDuration = 500; // 1 seconds in milliseconds
        const intervalDuration = totalDuration / text.length;
        typewriterInterval = setTimeout(() => typeWriter(text, nextIndex), intervalDuration);
    } else {
        clearTimeout(typewriterInterval);
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
}

document.addEventListener('DOMContentLoaded', initializeText);