'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const anoEl = document.getElementById('ano-atual');
    if (anoEl) {
        anoEl.textContent = new Date().getFullYear();
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const artItems = document.querySelectorAll('.art-item');

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterButtons.forEach((b) => {
                b.classList.remove('btn-dark', 'active');
                b.classList.add('btn-outline-dark');
            });
            btn.classList.remove('btn-outline-dark');
            btn.classList.add('btn-dark', 'active');

            const selectedCategory = btn.getAttribute('data-filter');

            artItems.forEach((item) => {
                const itemCategory = item.getAttribute('data-category');
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.classList.remove('d-none');
                } else {
                    item.classList.add('d-none');
                }
            });
        });
    });

    const obraModalEl = document.getElementById('obraModal');
    if (obraModalEl && typeof bootstrap !== 'undefined') {
        const obraModal = new bootstrap.Modal(obraModalEl);
        const modalTitle = document.getElementById('obraModalLabel');
        const modalTecnica = document.getElementById('modal-tecnica');
        const modalDescricao = document.getElementById('modal-descricao');
        const carouselInner = document.getElementById('modal-carousel-inner');
        const btnPrev = document.getElementById('btn-prev-slide');
        const btnNext = document.getElementById('btn-next-slide');

        const abrirModalObra = (card) => {
            const title = card.getAttribute('data-title') || '';
            const technique = card.getAttribute('data-technique') || '';
            const description = card.getAttribute('data-description') || '';
            const imagesRaw = card.getAttribute('data-images') || '';
            const imageList = imagesRaw
                .split(',')
                .map((path) => path.trim())
                .filter((path) => path.startsWith('assets/img/obras/'));

            modalTitle.textContent = title;
            modalTecnica.textContent = technique;
            modalDescricao.textContent = description;

            while (carouselInner.firstChild) {
                carouselInner.removeChild(carouselInner.firstChild);
            }

            imageList.forEach((src, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = index === 0 ? 'carousel-item active' : 'carousel-item';

                const img = document.createElement('img');
                img.src = src;
                img.alt = `${title} - Imagem ${index + 1}`;
                img.className = 'd-block w-100 protected-art';
                img.decoding = 'async';

                slideDiv.appendChild(img);
                carouselInner.appendChild(slideDiv);
            });

            const hasMultipleImages = imageList.length > 1;
            btnPrev.classList.toggle('d-none', !hasMultipleImages);
            btnNext.classList.toggle('d-none', !hasMultipleImages);

            obraModal.show();
        };

        const artCards = document.querySelectorAll('.art-card');
        artCards.forEach((card) => {
            card.addEventListener('click', () => abrirModalObra(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    abrirModalObra(card);
                }
            });
        });
    }

    document.addEventListener('contextmenu', (e) => {
        if (e.target.classList.contains('protected-art')) {
            e.preventDefault();
        }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('protected-art')) {
            e.preventDefault();
        }
    });
});