document.addEventListener('DOMContentLoaded', () => {
    const cvButtonContainer = document.createElement('div');
    cvButtonContainer.className = 'cv-button-container';

    const cvButton = document.createElement('button');
    cvButton.className = 'cv-download-button';
    cvButton.textContent = 'Download my CV';

    cvButton.addEventListener('click', () => {
        // Replace this with the actual download link when you have it
        console.log('CV download button clicked');
        // window.open('path/to/your/cv.pdf', '_blank');
    });

    cvButtonContainer.appendChild(cvButton);
    document.querySelector('.section-3').appendChild(cvButtonContainer);
});