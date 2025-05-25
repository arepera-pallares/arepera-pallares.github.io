// PWA Functionality for Arepera Los Pallares
// Service Worker Registration and Install Prompt

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// PWA Install Prompt
let deferredPrompt;
let installButton;

// Initialize PWA install functionality
function initPWAInstall() {
    // Create install button if it doesn't exist
    if (!document.getElementById('installButton')) {
        installButton = document.createElement('button');
        installButton.id = 'installButton';
        installButton.className = 'install-prompt';
        installButton.innerHTML = '📱 Instalar App';
        document.body.appendChild(installButton);
    } else {
        installButton = document.getElementById('installButton');
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = 'block';
    });

    // Handle install button click
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) {
            return;
        }
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('PWA installed');
        }
        
        deferredPrompt = null;
        installButton.style.display = 'none';
    });

    // Hide install button if already installed
    window.addEventListener('appinstalled', () => {
        installButton.style.display = 'none';
        console.log('PWA was installed');
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPWAInstall);

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPWAInstall);
} else {
    initPWAInstall();
} 