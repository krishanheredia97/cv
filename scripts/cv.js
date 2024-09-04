document.addEventListener('DOMContentLoaded', () => {
    const cvButtonContainer = document.createElement('div');
    cvButtonContainer.className = 'cv-button-container';

    const cvButton = document.createElement('button');
    cvButton.className = 'cv-download-button';
    cvButton.textContent = 'Download my Resume';

    cvButton.addEventListener('click', () => {
        window.open('https://krishanheredia.com/wp-content/uploads/2024/09/CV-Krishan-Heredia.pdf', '_blank');
    });

    cvButtonContainer.appendChild(cvButton);
    document.querySelector('.section-3').appendChild(cvButtonContainer);
});