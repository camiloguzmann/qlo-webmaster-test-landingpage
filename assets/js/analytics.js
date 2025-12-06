// ============ MOCK ANALYTICS IMPLEMENTATION ============

console.log('Analytics: Mock GA4, Meta Pixel & CTA tracking loaded');

// GA4 MOCK
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
    console.log('GA4 Event:', arguments[0], arguments[1]);
}

gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', {
    debug_mode: true,
    page_title: document.title,
    page_location: window.location.href
});

// 2. META PIXEL MOCK
window.fbq = function() {
    console.log('Meta Pixel Event:', arguments[0], arguments[1]);
};

fbq('init', '123456789012345'); 
fbq('track', 'PageView');

// 3. CTA CLICK TRACKING 
document.addEventListener('DOMContentLoaded', () => {
    console.log('Tracking: CTA buttons initialized');
    
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('CTA Clicked:', button.textContent.trim());
            
            // Información adicional 
            console.log('Button clicked in section:', 
                button.closest('section')?.id || 'unknown');
            
            // MOCK GA4 EVENT
            gtag('event', 'click', { 
                event_category: 'CTA', 
                event_label: button.textContent.trim() 
            });
            
            // MOCK META PIXEL EVENT
            fbq('track', 'ButtonClick', { 
                label: button.textContent.trim() 
            });
        });
    });
    
    console.log(`Total CTA buttons found: ${buttons.length}`);
});