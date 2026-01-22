document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const hasOnboarded = localStorage.getItem('soniq_onboarding_complete') === 'true';

    // Session logic: Show splash only once per session
    const isSessionActive = sessionStorage.getItem('soniq_session_active') === 'true';

    if (splashScreen) {
        if (isSessionActive && hasOnboarded) {
            // SKIP SPLASH: Immediately show content
            splashScreen.style.display = 'none';
            if (mainContent) {
                mainContent.classList.remove('hidden');
                // Optional: No animation on nav
                mainContent.style.opacity = '1';
            }
        } else {
            // SHOW SPLASH: First time or Onboarding needed
            let transitionTimeout;

            const hideSplash = () => {
                if (splashScreen.classList.contains('fade-out')) return;

                clearTimeout(transitionTimeout);
                splashScreen.classList.add('fade-out');

                // Wait for transition to finish
                setTimeout(() => {
                    const latestOnboardingStatus = localStorage.getItem('soniq_onboarding_complete') === 'true';
                    console.log('Checking onboarding status:', latestOnboardingStatus);

                    if (!latestOnboardingStatus) {
                        console.log('User not onboarded, redirecting to discover...');
                        // Keep splash visible while redirecting to avoid flash of content
                        window.location.href = 'onboarding-discover.html';
                        return;
                    }

                    console.log('User onboarded, showing home page.');
                    splashScreen.style.display = 'none';
                    // Set session active so it doesn't show again this session
                    sessionStorage.setItem('soniq_session_active', 'true');

                    if (mainContent) {
                        mainContent.classList.remove('hidden');
                        mainContent.classList.add('animate-entry');
                    }
                }, 800);
            };

            // Auto-transition
            transitionTimeout = setTimeout(() => {
                hideSplash();
            }, 3000);
        }
    }

    // Player Card Expand/Collapse Logic
    const playerCard = document.querySelector('.player-card');
    if (playerCard) {
        playerCard.addEventListener('click', (e) => {
            // Prevent collapse if clicking specific interactive elements IF needed. 
            // For now, let's allow toggling by clicking anywhere on the card container, 
            // BUT if it's already expanded, maybe we want clicking controls to NOT collapse it.

            // Check if user clicked a button or control
            if (e.target.closest('.control-btn') || e.target.closest('.progress-bar')) {
                // If expanded, don't collapse when using controls
                if (playerCard.classList.contains('expanded')) {
                    e.stopPropagation();
                    return;
                }
            }

            playerCard.classList.toggle('expanded');
        });
    }
});
