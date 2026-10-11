// ==========================================================
// Galería de proyectos (Lógica)
// ==========================================================

(() => {
    const gallery = document.querySelector('.projects-gallery');
    if (!gallery || typeof PROJECTS === 'undefined') return;

    const dotsEl = document.querySelector('.projects-dots');
    const currentEl = document.querySelector('.projects-current');
    const totalEl = document.querySelector('.projects-total');
    const section = document.querySelector('.projects');
    const AUTOPLAY_MS = 6000;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const pad = n => String(n).padStart(2, '0');
    const lang = () => (typeof currentLang !== 'undefined' ? currentLang : 'es');
    const t = key => (typeof translations !== 'undefined' && translations[lang()][key]) || key;

    // Registramos los textos de cada proyecto en el sistema de traducciones,
    // así también se animan al cambiar de idioma.
    if (typeof translations !== 'undefined') {
        PROJECTS.forEach((project, i) => {
            Object.keys(translations).forEach(code => {
                translations[code][`project${i}Type`] = project.type[code] || project.type.es;
                translations[code][`project${i}Desc`] = project.description[code] || project.description.es;
            });
        });
    }

    const arrowIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 7l-10 10" /><path d="M8 7l9 0l0 9" /></svg>';

    gallery.innerHTML = PROJECTS.map((project, i) => `
        <article class="project" data-index="${i}" tabindex="0" aria-label="${project.name}">
            <img class="project-img" src="${project.image}" alt="" loading="lazy">
            <div class="project-shade"></div>

            <span class="project-number">${pad(i + 1)}</span>
            <span class="project-type"><span data-i18n="project${i}Type">${t(`project${i}Type`)}</span></span>
            <h3 class="project-vertical-name">${project.name}</h3>

            <div class="project-content">
                <h3 class="project-name">${project.name}</h3>
                <p class="project-desc" data-i18n="project${i}Desc">${t(`project${i}Desc`)}</p>
                <ul class="project-stack">
                    ${project.stack.map(tech => `
                        <li><span style="background:${TECH_COLORS[tech] || '#a855f7'}"></span>${tech}</li>
                    `).join('')}
                </ul>
                <a href="${project.url}" target="_blank" rel="noopener" class="btn-primary project-link" tabindex="-1">
                    <span data-i18n="projectsCta">${t('projectsCta')}</span> ${arrowIcon}
                </a>
            </div>
        </article>
    `).join('');

    dotsEl.innerHTML = PROJECTS.map((p, i) =>
        `<button type="button" class="projects-dot" data-index="${i}" aria-label="${p.name}"><span></span></button>`
    ).join('');

    totalEl.textContent = pad(PROJECTS.length);

    const panels = [...gallery.querySelectorAll('.project')];
    const dots = [...dotsEl.querySelectorAll('.projects-dot')];
    const viewport = document.querySelector('.projects-viewport');
    // Mobile: carrusel de a una tarjeta (mismo corte que mobile.css).
    // Tablet y desktop usan el acordeón de 3.
    const carouselQuery = window.matchMedia('(max-width: 767px)');
    const isCarousel = () => carouselQuery.matches;

    const PER_PAGE = 3;                          // tarjetas visibles a la vez
    const visibleCount = Math.min(PER_PAGE, PROJECTS.length);
    let active = 0;
    let start = 0;                               // primera tarjeta visible
    let collapsedWidth = 0;
    let gap = 0;

    // Desktop: calcula el tamaño de las tarjetas para que entren justo 3.
    // Carrusel: solo indica qué tarjeta mostrar; el desplazamiento lo hace el CSS.
    const sizeGallery = () => {
        if (isCarousel()) {
            gallery.style.removeProperty('--c');
            gallery.style.removeProperty('--a');
            gallery.style.transform = '';
            gallery.style.setProperty('--index', active);
            return;
        }
        gallery.style.removeProperty('--index');
        const width = viewport.clientWidth;
        gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
        collapsedWidth = visibleCount > 1 ? Math.max(80, Math.round(width * 0.16)) : 0;
        const activeWidth = width - (visibleCount - 1) * (collapsedWidth + gap);
        gallery.style.setProperty('--c', `${collapsedWidth}px`);
        gallery.style.setProperty('--a', `${activeWidth}px`);
        gallery.style.transform = `translateX(${-start * (collapsedWidth + gap)}px)`;
    };

    const goTo = (index) => {
        active = (index + PROJECTS.length) % PROJECTS.length;

        // Desktop: si la tarjeta está fuera de las 3 visibles, pasamos al grupo que la contiene
        if (active < start || active >= start + visibleCount) {
            const page = Math.floor(active / PER_PAGE);
            start = Math.min(page * PER_PAGE, PROJECTS.length - visibleCount);
        }

        const carousel = isCarousel();
        panels.forEach((panel, i) => {
            const isActive = i === active;
            const isVisible = carousel ? isActive : i >= start && i < start + visibleCount;
            panel.classList.toggle('active', isActive);
            panel.classList.toggle('is-off', !isVisible);
            panel.setAttribute('aria-current', isActive ? 'true' : 'false');
            panel.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
            panel.tabIndex = isVisible ? 0 : -1;
            panel.querySelector('.project-link').tabIndex = isActive ? 0 : -1;
        });

        sizeGallery();

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === active) {
                void dot.offsetWidth;          // reinicia la barra de progreso
                dot.classList.add('active');
            }
        });

        currentEl.textContent = pad(active + 1);
        currentEl.animate?.(
            [{ opacity: 0, transform: 'translateY(60%)' }, { opacity: 1, transform: 'none' }],
            { duration: 400, easing: 'cubic-bezier(.2,.8,.2,1)' }
        );
    };

    window.addEventListener('resize', sizeGallery);
    // Al cruzar el corte desktop <-> tablet recalculamos qué tarjetas se ven
    carouselQuery.addEventListener?.('change', () => goTo(active));

    // Swipe en el carrusel: la tarjeta sigue al dedo y al soltar pasa a la siguiente/anterior
    let touchX = 0, touchY = 0, dragX = 0, dragging = null;
    gallery.addEventListener('touchstart', (e) => {
        if (!isCarousel()) return;
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
        dragX = 0;
        dragging = null;                  // todavía no sabemos si es horizontal o vertical
        section.classList.add('is-hovered');
    }, { passive: true });

    gallery.addEventListener('touchmove', (e) => {
        if (!isCarousel()) return;
        const dx = e.touches[0].clientX - touchX;
        const dy = e.touches[0].clientY - touchY;
        if (dragging === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
            dragging = Math.abs(dx) > Math.abs(dy);
            if (dragging) {
                gallery.classList.add('is-dragging');
                // Evita que fullPage cambie de sección mientras se desliza el carrusel
                window.fullpage_api?.setAllowScrolling(false);
            }
        }
        if (!dragging) return;
        // Resistencia en los extremos
        const atEdge = (active === 0 && dx > 0) || (active === PROJECTS.length - 1 && dx < 0);
        dragX = atEdge ? dx * 0.3 : dx;
        gallery.style.setProperty('--drag', `${dragX}px`);
    }, { passive: true });

    const endDrag = () => {
        if (!isCarousel()) return;
        section.classList.remove('is-hovered');
        if (!dragging) return;
        gallery.classList.remove('is-dragging');
        gallery.style.removeProperty('--drag');
        window.fullpage_api?.setAllowScrolling(true);
        const threshold = Math.min(80, viewport.clientWidth * 0.2);
        if (dragX < -threshold && active < PROJECTS.length - 1) goTo(active + 1);
        else if (dragX > threshold && active > 0) goTo(active - 1);
        dragging = null;
    };
    gallery.addEventListener('touchend', endDrag);
    gallery.addEventListener('touchcancel', endDrag);

    // Clicks
    panels.forEach((panel, i) => {
        panel.addEventListener('click', (e) => {
            if (i !== active) {
                e.preventDefault();
                goTo(i);
            }
        });
        panel.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && i !== active) {
                e.preventDefault();
                goTo(i);
            }
        });
    });

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    document.querySelector('.projects-prev').addEventListener('click', () => goTo(active - 1));
    document.querySelector('.projects-next').addEventListener('click', () => goTo(active + 1));

    // Autoplay: la barra del punto activo marca el tiempo. Al terminar, pasa al siguiente.
    section.style.setProperty('--autoplay', `${AUTOPLAY_MS}ms`);
    dotsEl.addEventListener('animationend', (e) => {
        if (e.target.matches('.projects-dot.active span')) goTo(active + 1);
    });

    // Pausa al pasar el mouse o cuando la sección no está a la vista
    // (solo con mouse: en touch el "hover" queda pegado y frenaría el autoplay)
    gallery.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse') section.classList.add('is-hovered');
    });
    gallery.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'mouse') section.classList.remove('is-hovered');
    });

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => {
            section.classList.toggle('is-visible', entry.isIntersecting);
        }, { threshold: 0.4 }).observe(section);
    } else {
        section.classList.add('is-visible');
    }

    if (reduceMotion) section.classList.add('no-autoplay');

    goTo(0);
})();
