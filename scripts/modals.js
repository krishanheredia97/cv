// modals.js
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close');
    const seeMoreButton = document.querySelector('.see-more');

    closeButton.addEventListener('click', closeModal);
    seeMoreButton.addEventListener('click', toggleAbstract);

    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('modal-container')) {
            closeModal();
        }
    });
});

function fetchModalData(modalId) {
    fetch(`./assets/modals/${modalId}.json`)
        .then(response => response.json())
        .then(data => {
            populateModal(data);
            openModal();
        })
        .catch(error => console.error('Error:', error));
}

function populateModal(data) {
    const modal = document.getElementById('modal-container');
    
    modal.querySelector('.modal-title').textContent = data.modalTitle;
    
    const categoryTag = modal.querySelector('.category-tag');
    categoryTag.textContent = data.category.name;
    categoryTag.style.backgroundColor = data.category.color;

    const statusElement = modal.querySelector('.status');
    statusElement.textContent = data.status.text;
    statusElement.className = `status ${data.status.code}`;
    
    modal.querySelector('.featured-indicator').style.display = data.featured ? 'inline-block' : 'none';
    
    modal.querySelector('.content-title').textContent = data.content.title;
    
    const abstractPreview = modal.querySelector('.abstract-preview');
    const abstractFull = modal.querySelector('.abstract-full');
    abstractPreview.textContent = data.content.description.slice(0, 250) + '...';
    abstractFull.textContent = data.content.description;
    abstractFull.style.display = 'none';
    
    const ctaButton = modal.querySelector('.cta-button');
    ctaButton.textContent = data.cta.text;
    ctaButton.href = data.cta.link;
    ctaButton.style.backgroundColor = data.category.color;
    
    const infoBoxesContainer = modal.querySelector('.info-boxes');
    infoBoxesContainer.innerHTML = '';
    data.infoBoxes.forEach(box => {
        infoBoxesContainer.innerHTML += `
            <div class="info-box">
                <i class="${box.icon}" style="color: ${data.category.color};"></i>
                <h5>${box.title}</h5>
                <p>${box.content}</p>
            </div>
        `;
    });
    
    const seeMoreButton = modal.querySelector('.see-more');
    seeMoreButton.style.backgroundColor = data.category.color;
    
    if (data.media && data.media.hasMedia) {
        populateMedia(modal, data.media.items);
    }

    modal.style.setProperty('--category-color', data.category.color);
}

function populateMedia(modal, mediaItems) {
    const mediaContainer = modal.querySelector('.media-container');
    mediaContainer.innerHTML = '';
    
    mediaItems.forEach(item => {
        let mediaElement = '';
        if (item.type === 'image') {
            mediaElement = `
                <div class="media-item">
                    <img src="${item.src}" alt="${item.alt}" onerror="this.onerror=null; this.src='./assets/fallback-image.png';">
                    <p>${item.text}</p>
                </div>
            `;
        } else if (item.type === 'video') {
            mediaElement = `
                <div class="media-item">
                    <video src="${item.src}" poster="${item.poster}" controls>
                        <p>${item.title}</p>
                    </video>
                    <p>${item.text}</p>
                </div>
            `;
        }
        mediaContainer.innerHTML += mediaElement;
    });
}

function openModal() {
    const modal = document.getElementById('modal-container');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal-container');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function toggleAbstract() {
    const modal = document.getElementById('modal-container');
    const abstractPreview = modal.querySelector('.abstract-preview');
    const abstractFull = modal.querySelector('.abstract-full');
    const seeMoreButton = modal.querySelector('.see-more');

    if (abstractFull.style.display === 'none') {
        abstractFull.style.display = 'block';
        abstractPreview.style.display = 'none';
        seeMoreButton.textContent = 'See less';
    } else {
        abstractFull.style.display = 'none';
        abstractPreview.style.display = 'block';
        seeMoreButton.textContent = 'See more';
    }
}