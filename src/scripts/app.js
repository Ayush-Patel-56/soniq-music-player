document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    // Only run splash logic if splash screen exists (i.e., on index.html)
    if (splashScreen) {
        let transitionTimeout;

        const hideSplash = () => {
            if (splashScreen.classList.contains('fade-out')) return; // Already hiding

            clearTimeout(transitionTimeout);
            splashScreen.classList.add('fade-out');

            // Wait for transition to finish
            setTimeout(() => {
                const hasOnboarded = localStorage.getItem('soniq_onboarding_complete') === 'true';
                console.log('Checking onboarding status:', hasOnboarded);

                if (!hasOnboarded) {
                    console.log('User not onboarded, redirecting to discover...');
                    // Redirect to onboarding if not complete
                    // Keep splash visible while redirecting to avoid flash of content
                    window.location.href = 'onboarding-discover.html';
                } else {
                    console.log('User onboarded, showing home page.');
                    // Only remove splash if we are staying here
                    splashScreen.style.display = 'none';

                    // Show main content if onboarded
                    if (mainContent) {
                        mainContent.classList.remove('hidden');
                        mainContent.classList.add('animate-entry');
                    }
                }
            }, 800); // Matches CSS transition time
        };

        // If already onboarded, shorter splash or immediate show? 
        // Let's keep the vibe but maybe shorter? Or just normal flow.
        // For now, normal flow.

        // Auto-transition (3 seconds)
        transitionTimeout = setTimeout(() => {
            hideSplash();
        }, 3000);
    }
});
