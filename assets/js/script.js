/**
 * FAQ Accordion Component
 * 
 * This script enables accordion functionality for FAQ sections.
 *
 */

document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('show');
                }
            });
            
            // Toggle current accordion
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                content.classList.add('show');
                // Set maxHeight for smooth transition
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.classList.remove('show');
                content.style.maxHeight = '0';
            }
        });
    });
});