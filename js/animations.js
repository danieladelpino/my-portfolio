// ---------- Título del hero que se escribe solo ----------

const typedEl = document.querySelector('.hero-typed');
let typeTimer = null;

const typeLoop = (text) => {
    clearTimeout(typeTimer);
    let i = 0;
    let deleting = false;

    const tick = () => {
        typedEl.textContent = text.slice(0, i);

        if (!deleting && i < text.length) {
            i++;
            typeTimer = setTimeout(tick, 95);
        } else if (!deleting) {
            deleting = true;
            typeTimer = setTimeout(tick, 2200);   // pausa con el texto completo
        } else if (i > 0) {
            i--;
            typeTimer = setTimeout(tick, 45);
        } else {
            deleting = false;
            typeTimer = setTimeout(tick, 400);
        }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        typedEl.textContent = text;
        return;
    }
    tick();
};

// ---------- Cambio de texto al cambiar de idioma ----------

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let firstLoad = true;

// Cambia el texto con una animación: sale hacia arriba y entra desde abajo
const swapText = (el, text, delay) => {
    if (firstLoad || reduceMotion || !el.animate) {
        el.textContent = text;
        return;
    }
    const easing = 'cubic-bezier(.2, .8, .2, 1)';
    el.getAnimations().forEach(anim => anim.cancel());

    el.animate(
        [
            { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
            { opacity: 0, transform: 'translateY(-60%)', filter: 'blur(4px)' }
        ],
        { duration: 220, delay, easing: 'ease-in', fill: 'forwards' }
    ).onfinish = () => {
        el.textContent = text;
        el.animate(
            [
                { opacity: 0, transform: 'translateY(80%)', filter: 'blur(6px)' },
                { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }
            ],
            { duration: 500, easing, fill: 'forwards' }
        );
    };
};
