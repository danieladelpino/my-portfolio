(() => {
    const section = document.querySelector('.contact');
    if (!section) return;

    const t = key => {
        const lang = typeof currentLang !== 'undefined' ? currentLang : 'es';
        return (typeof translations !== 'undefined' && translations[lang][key]) || '';
    };

    // ---------- Año del footer ----------
    const year = section.querySelector('.footer-year');
    if (year) year.textContent = new Date().getFullYear();

    // ---------- Botón "Escribime" ----------
    const nameInput = section.querySelector('#contact-name');
    section.querySelector('.contact-write').addEventListener('click', () => {
        if (!card.classList.contains('is-sent')) nameInput.focus({ preventScroll: true });
    });

    // ---------- Copiar mail ----------
    const copyBtn = section.querySelector('.contact-copy');
    const email = section.querySelector('.contact-email').textContent.trim();
    let copyTimer;

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(email);
        } catch (e) {
            // Respaldo para navegadores sin permiso al portapapeles
            const tmp = document.createElement('textarea');
            tmp.value = email;
            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand('copy');
            tmp.remove();
        }
        const label = copyBtn.querySelector('span');
        label.textContent = t('copied');
        copyBtn.classList.add('is-copied');
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => {
            label.textContent = t('copy');
            copyBtn.classList.remove('is-copied');
        }, 1800);
    });

    // ---------- Formulario ----------
    const form = section.querySelector('.contact-form');
    const card = section.querySelector('.contact-card');
    const success = section.querySelector('.contact-success');
    const errorEl = section.querySelector('.contact-error');
    const submitBtn = section.querySelector('.contact-submit');
    const submitText = section.querySelector('.contact-submit-text');

    const showPanel = (panel) => {
        panel.hidden = false;
        panel.animate?.(
            [{ opacity: 0, transform: 'translateY(16px) scale(.98)' }, { opacity: 1, transform: 'none' }],
            { duration: 500, easing: 'cubic-bezier(.2,.8,.2,1)' }
        );
    };

    // Marca los campos inválidos recién después de que la persona los toca
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => field.classList.add('touched'));
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.hidden = true;

        if (!form.checkValidity()) {
            form.querySelectorAll('input, textarea').forEach(f => f.classList.add('touched'));
            form.querySelector(':invalid')?.focus();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitText.textContent = t('formSending');

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });
            if (!res.ok) throw new Error('Formspree error');

            form.reset();
            form.querySelectorAll('.touched').forEach(f => f.classList.remove('touched'));
            card.classList.add('is-sent');   // el form queda invisible pero conserva el alto
            showPanel(success);
        } catch (err) {
            errorEl.hidden = false;
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('is-loading');
            submitText.textContent = t('formSend');
        }
    });

    section.querySelector('.contact-again').addEventListener('click', () => {
        success.hidden = true;
        card.classList.remove('is-sent');
        showPanel(form);
        nameInput.focus({ preventScroll: true });
    });
})();
