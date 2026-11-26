'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const anoEl = document.getElementById('ano-atual');
    if (anoEl) {
        anoEl.textContent = String(new Date().getFullYear());
    }

    const emailUser = 'vsarah974';
    const emailDomain = 'gmail.com';
    const artistEmail = `${emailUser}@${emailDomain}`;

    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.href = `mailto:${artistEmail}`;
        emailLink.textContent = artistEmail;
    }

    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyFeedback = document.getElementById('copy-feedback');
    if (copyEmailBtn && copyFeedback) {
        let feedbackTimer = null;
        copyEmailBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(artistEmail);
                copyFeedback.textContent = `E-mail ${artistEmail} copiado para a área de transferência.`;
            } catch {
                copyFeedback.textContent = `E-mail para contato: ${artistEmail}`;
            }

            if (feedbackTimer) {
                clearTimeout(feedbackTimer);
            }
            feedbackTimer = setTimeout(() => {
                copyFeedback.textContent = '';
            }, 4000);
        });
    }

    const navCollapseEl = document.getElementById('menuPrincipal');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    if (navCollapseEl && typeof bootstrap !== 'undefined') {
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (navCollapseEl.classList.contains('show')) {
                    const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
                    collapseInstance.hide();
                }
            });
        });
    }

    const trackedSections = document.querySelectorAll('section[id], footer[id]');
    if ('IntersectionObserver' in window && trackedSections.length > 0) {
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const activeId = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        const isMatch = link.getAttribute('href') === `#${activeId}`;
                        link.classList.toggle('active', isMatch);
                        if (isMatch) {
                            link.setAttribute('aria-current', 'true');
                        } else {
                            link.removeAttribute('aria-current');
                        }
                    });
                });
            },
            { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
        );

        trackedSections.forEach((sec) => navObserver.observe(sec));
    }

    const galeriaGrid = document.getElementById('galeria-grid');
    const obras = Array.isArray(window.PORTFOLIO_OBRAS) ? window.PORTFOLIO_OBRAS : [];

    const createObraCard = (obra) => {
        const article = document.createElement('article');
        article.className = 'col-12 col-sm-6 col-lg-4 art-item reveal-item';
        article.setAttribute('data-category', obra.category);

        const card = document.createElement('div');
        card.className = 'card h-100 border-0 shadow-sm rounded-4 overflow-hidden art-card';

        const thumbWrapper = document.createElement('div');
        thumbWrapper.className = obra.isCutout ? 'art-thumb-wrapper is-cutout' : 'art-thumb-wrapper';

        const img = document.createElement('img');
        img.src = obra.images[0];
        img.className = 'card-img-top protected-art';
        img.alt = `${obra.title} — ${obra.technique}`;
        img.width = obra.width;
        img.height = obra.height;
        img.loading = 'lazy';
        img.decoding = 'async';
        thumbWrapper.appendChild(img);

        if (obra.images.length > 1) {
            const badge = document.createElement('span');
            badge.className = 'badge bg-dark bg-opacity-75 position-absolute top-0 end-0 m-3 rounded-pill';
            badge.textContent = `${obra.images.length} fotos`;
            thumbWrapper.appendChild(badge);
        }

        const body = document.createElement('div');
        body.className = 'card-body p-4';

        const categorySpan = document.createElement('span');
        categorySpan.className = 'text-uppercase small text-muted-ink tracking-wider d-block mb-1';
        categorySpan.textContent = obra.categoryLabel;

        const heading = document.createElement('h3');
        heading.className = 'h5 font-serif fw-bold mb-1';

        const triggerBtn = document.createElement('button');
        triggerBtn.type = 'button';
        triggerBtn.className = 'art-card-trigger stretched-link';
        triggerBtn.textContent = obra.title;
        triggerBtn.setAttribute('aria-label', `Ampliar obra ${obra.title}`);
        triggerBtn.dataset.obraId = obra.id;

        heading.appendChild(triggerBtn);

        const techniqueP = document.createElement('p');
        techniqueP.className = 'small text-muted-ink mb-0';
        techniqueP.textContent = obra.technique;

        body.append(categorySpan, heading, techniqueP);
        card.append(thumbWrapper, body);
        article.appendChild(card);

        return article;
    };

    if (galeriaGrid && obras.length > 0) {
        const fragment = document.createDocumentFragment();
        obras.forEach((obra) => {
            fragment.appendChild(createObraCard(obra));
        });
        galeriaGrid.appendChild(fragment);
    }

    const revealItems = document.querySelectorAll('.reveal-item');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && 'IntersectionObserver' in window && revealItems.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: '0px 0px -40px 0px', threshold: 0.08 }
        );
        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const artItems = document.querySelectorAll('.art-item');
    const galeriaStatus = document.getElementById('galeria-status');

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterButtons.forEach((b) => {
                b.classList.remove('btn-dark', 'active');
                b.classList.add('btn-outline-dark');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.remove('btn-outline-dark');
            btn.classList.add('btn-dark', 'active');
            btn.setAttribute('aria-pressed', 'true');

            const selectedCategory = btn.getAttribute('data-filter');
            let visibleCount = 0;

            artItems.forEach((item) => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = selectedCategory === 'all' || itemCategory === selectedCategory;

                if (shouldShow) {
                    item.classList.remove('d-none', 'is-entering');
                    item.classList.add('is-visible');
                    if (!prefersReducedMotion) {
                        void item.offsetWidth;
                        item.classList.add('is-entering');
                    }
                    visibleCount += 1;
                } else {
                    item.classList.add('d-none');
                    item.classList.remove('is-entering');
                }
            });

            if (galeriaStatus) {
                galeriaStatus.textContent = `Exibindo ${visibleCount} ${visibleCount === 1 ? 'obra' : 'obras'} na categoria ${btn.textContent.trim()}.`;
            }
        });
    });

    const obraModalEl = document.getElementById('obraModal');
    const carouselEl = document.getElementById('carouselObra');
    if (obraModalEl && carouselEl && typeof bootstrap !== 'undefined') {
        const obraModal = new bootstrap.Modal(obraModalEl);
        let carouselInstance = null;

        const modalTitle = document.getElementById('obraModalLabel');
        const modalTecnica = document.getElementById('modal-tecnica');
        const modalDescricao = document.getElementById('modal-descricao');
        const modalCounter = document.getElementById('modal-slide-counter');
        const modalInteresseBtn = document.getElementById('modal-interesse-btn');
        const carouselInner = document.getElementById('modal-carousel-inner');
        const carouselIndicators = document.getElementById('modal-carousel-indicators');
        const btnPrev = document.getElementById('btn-prev-slide');
        const btnNext = document.getElementById('btn-next-slide');

        let currentTotalSlides = 0;

        const updateSlideCounter = (activeIndex) => {
            if (!modalCounter) return;
            if (currentTotalSlides > 1) {
                modalCounter.textContent = `${activeIndex + 1} / ${currentTotalSlides}`;
                modalCounter.classList.remove('d-none');
            } else {
                modalCounter.textContent = '';
                modalCounter.classList.add('d-none');
            }
        };

        carouselEl.addEventListener('slid.bs.carousel', (event) => {
            updateSlideCounter(event.to);
        });

        const abrirModalObra = (obra) => {
            if (!obra) return;

            const safeImages = obra.images.filter((path) => path.startsWith('assets/img/obras/'));
            currentTotalSlides = safeImages.length;

            modalTitle.textContent = obra.title;
            modalTecnica.textContent = obra.technique;
            modalDescricao.textContent = obra.description;

            if (modalInteresseBtn) {
                const subject = encodeURIComponent(`Interesse na obra: ${obra.title}`);
                modalInteresseBtn.href = `mailto:${artistEmail}?subject=${subject}`;
            }

            if (carouselInstance) {
                carouselInstance.dispose();
                carouselInstance = null;
            }

            while (carouselInner.firstChild) {
                carouselInner.removeChild(carouselInner.firstChild);
            }
            while (carouselIndicators.firstChild) {
                carouselIndicators.removeChild(carouselIndicators.firstChild);
            }

            const hasMultipleImages = safeImages.length > 1;

            safeImages.forEach((src, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = index === 0 ? 'carousel-item active' : 'carousel-item';

                const img = document.createElement('img');
                img.src = src;
                img.alt = `${obra.title} — Foto ${index + 1} de ${safeImages.length}`;
                img.className = 'd-block w-100 protected-art';
                img.width = obra.width;
                img.height = obra.height;
                img.decoding = 'async';

                slideDiv.appendChild(img);
                carouselInner.appendChild(slideDiv);

                if (hasMultipleImages) {
                    const indicatorBtn = document.createElement('button');
                    indicatorBtn.type = 'button';
                    indicatorBtn.setAttribute('data-bs-target', '#carouselObra');
                    indicatorBtn.setAttribute('data-bs-slide-to', String(index));
                    indicatorBtn.setAttribute('aria-label', `Foto ${index + 1}`);
                    if (index === 0) {
                        indicatorBtn.className = 'active';
                        indicatorBtn.setAttribute('aria-current', 'true');
                    }
                    carouselIndicators.appendChild(indicatorBtn);
                }
            });

            carouselIndicators.classList.toggle('d-none', !hasMultipleImages);
            btnPrev.classList.toggle('d-none', !hasMultipleImages);
            btnNext.classList.toggle('d-none', !hasMultipleImages);
            updateSlideCounter(0);

            carouselInstance = new bootstrap.Carousel(carouselEl, {
                interval: false,
                ride: false,
                wrap: true,
            });

            obraModal.show();
        };

        if (galeriaGrid) {
            galeriaGrid.addEventListener('click', (e) => {
                const trigger = e.target.closest('.art-card-trigger');
                if (!trigger) return;
                const obra = obras.find((item) => item.id === trigger.dataset.obraId);
                abrirModalObra(obra);
            });
        }

        obraModalEl.addEventListener('keydown', (e) => {
            if (!carouselInstance || currentTotalSlides <= 1) return;
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                carouselInstance.prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                carouselInstance.next();
            }
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
