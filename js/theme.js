// ==========================================================
// Tema claro / oscuro
// ==========================================================

// Guarda preferencias (tema e idioma) sin romper si el navegador bloquea localStorage
const storage = {
    get: key => { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set: (key, value) => { try { localStorage.setItem(key, value); } catch (e) { } }
};

// El tema inicial se aplica en el <head> (index.html) para evitar el parpadeo:
// primero el que eligió el usuario con el botón; si no eligió ninguno, el del sistema.
const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    if (typeof initParticles === 'function') initParticles();
};

// Botón: la elección manual se guarda y pasa a tener prioridad sobre el sistema
document.querySelector('.theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    storage.set('theme', next);
    applyTheme(next);
});

// Si el usuario cambia el tema del sistema con la página abierta, se actualiza en vivo
// (solo mientras no haya elegido un tema manualmente con el botón)
if (window.matchMedia) {
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
    const onSystemChange = e => {
        const saved = storage.get('theme');
        if (saved === 'light' || saved === 'dark') return;
        applyTheme(e.matches ? 'light' : 'dark');
    };
    if (lightQuery.addEventListener) lightQuery.addEventListener('change', onSystemChange);
    else if (lightQuery.addListener) lightQuery.addListener(onSystemChange); // Safari antiguo
}
