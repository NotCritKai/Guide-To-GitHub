function applyExternalLinks() {
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');

        // Ignore internal links, anchors, and blank links
        if (!href || href.startsWith('#') || href.startsWith('/') || href.startsWith('.')) {
            return;
        }

        // Target external links
        if (link.hostname && link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');

            // Override Dreamweaver's preview click interceptor
            link.addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
    });
}

// Safely run after Dreamweaver injects its code
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyExternalLinks);
} else {
    applyExternalLinks();
}