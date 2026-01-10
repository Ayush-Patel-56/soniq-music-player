document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    let transitionTimeout;

    const hideSplash = () => {
        if (splashScreen.classList.contains('fade-out')) return; // Already hiding

        clearTimeout(transitionTimeout);
        splashScreen.classList.add('fade-out');

        // Wait for transition to finish before redirecting
        setTimeout(() => {
            // Redirect to the first onboarding page (using remix as step 2 for demo, but usually step 1)
            // For this specific task, we'll redirect to the newly created onboarding-remix.html
            window.location.href = 'onboarding-remix.html';
        }, 800); // Matches CSS transition time
    };

    // Auto-transition (3 seconds)
    transitionTimeout = setTimeout(() => {
        hideSplash();
    }, 3000);
});
