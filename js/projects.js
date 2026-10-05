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
    const mobileQuery = window.matchMedia('(max-width: 900px)');

    const PER_PAGE = 3;                          // tarjetas visibles a la vez
    const visibleCount = Math.min(PER_PAGE, PROJECTS.length);
    let active = 0;
    let start = 0;                               // primera tarjeta visible
    let collapsedWidth = 0;
    let gap = 0;

    // Calcula el tamaño de las tarjetas para que entren justo 3 en pantalla
    const sizeGallery = () => {
        if (mobileQuery.matches) {
            gallery.style.removeProperty('--c');
            gallery.style.removeProperty('--a');
            gallery.style.transform = '';
            return;
        }
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

        // Si la tarjeta está fuera de las 3 visibles, pasamos al grupo que la contiene
        const previousStart = start;
        if (active < start || active >= start + visibleCount) {
            const page = Math.floor(active / PER_PAGE);
            start = Math.min(page * PER_PAGE, PROJECTS.length - visibleCount);
        }

        panels.forEach((panel, i) => {
            const isActive = i === active;
            const isVisible = i >= start && i < start + visibleCount;
            panel.classList.toggle('active', isActive);
            panel.classList.toggle('is-off', !isVisible);
            panel.setAttribute('aria-current', isActive ? 'true' : 'false');
            panel.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
            panel.tabIndex = isVisible ? 0 : -1;
            panel.querySelector('.project-link').tabIndex = isActive ? 0 : -1;
        });

        sizeGallery();

        // En el celular el cambio de grupo entra con un fade desde abajo
        if (mobileQuery.matches && previousStart !== start && !reduceMotion) {
            panels.filter(p => !p.classList.contains('is-off')).forEach((panel, i) => {
                panel.animate?.(
                    [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }],
                    { duration: 500, delay: i * 70, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }
                );
            });
        }

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
    mobileQuery.addEventListener?.('change', sizeGallery);

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
    gallery.addEventListener('mouseenter', () => section.classList.add('is-hovered'));
    gallery.addEventListener('mouseleave', () => section.classList.remove('is-hovered'));

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
