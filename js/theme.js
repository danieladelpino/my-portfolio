// ==========================================================
// Tema claro / oscuro
// ==========================================================

// Guarda preferencias (tema e idioma) sin romper si el navegador bloquea localStorage
const storage = {
    get: key => { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set: (key, value) => { try { localStorage.setItem(key, value); } catch (e) { } }
};

// El tema guardado se aplica en el <head> (index.html) para evitar el parpadeo.
document.querySelector('.theme-toggle').addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    storage.set('theme', next);
    if (typeof initParticles === 'function') initParticles();
});
