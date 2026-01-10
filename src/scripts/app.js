document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    let transitionTimeout;

    const hideSplash = () => {
        if (splashScreen.classList.contains('fade-out')) return; // Already hiding

        clearTimeout(transitionTimeout);
        splashScreen.classList.add('fade-out');

        // Wait for transition to finish before removing from DOM flow or showing main content
        setTimeout(() => {
            splashScreen.style.display = 'none';
            if (mainContent) {
                mainContent.classList.remove('hidden');
                mainContent.classList.add('animate-entry');
            }
        }, 800); // Matches CSS transition time
    };

    // Auto-transition (3 seconds)
    transitionTimeout = setTimeout(() => {
        hideSplash();
    }, 3000);
});
