// Smooth navigation scrolling + subtle highlight on target
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!navLinks.length) return;

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (!hash || hash === '#') return;
            const target = document.querySelector(hash);
            if (!target) return;
            e.preventDefault();

            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) {
                target.scrollIntoView(true);
                try { history.pushState(null, '', hash); } catch (err) {}
                return;
            }

            // Use smooth native scrolling and add a brief highlight
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            try { history.pushState(null, '', hash); } catch (err) {}

            // Add visual highlight (non-intrusive) then remove
            target.classList.add('target-highlight');
            window.setTimeout(() => target.classList.remove('target-highlight'), 1200);
        });
    });
});



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



/**
 * Emergency Assistance Lead Capture Form
 * 
 * This script handles the submission of the emergency assistance request form:
 * - Validates required fields (name, email, phone)
 * - Stores leads in localStorage and sessionStorage
 * - Displays confirmation messages using SweetAlert2
 *
 */

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const name = this.querySelector('input[name="full_name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const phone = this.querySelector('input[name="phone"]').value.trim();
    
    if (!name || !email || !phone) {
        Swal.fire({
            title: '⚠️ Missing Information',
            text: 'Please fill in all required fields',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#f39c12'
        });
        return;
    }
    
    const formData = {
        full_name: name,
        email: email,
        phone: phone,
        situation: this.querySelector('textarea[name="situation"]').value,
        timestamp: new Date().toISOString(),
        source: 'emergency_form'
    };
    
    let leads = JSON.parse(localStorage.getItem('captured_leads') || '[]');
    leads.push(formData);
    localStorage.setItem('captured_leads', JSON.stringify(leads));
    
    Swal.fire({
        title: '<strong>Request Submitted!</strong>',
        icon: 'success',
        html: `
            <div style="text-align: left; padding: 10px;">
                <p><b>✅ Thank you, ${name}!</b></p>
                <p>Your emergency assistance request has been received.</p>
                <hr style="margin: 15px 0;">
                <p><b>What happens next:</b></p>
                <ul style="text-align: left; margin-left: 20px;">
                    <li>Our legal team will review your case</li>
                    <li>You'll receive a call within <b>15-30 minutes</b></li>
                    <li>Check your email for confirmation</li>
                </ul>
                <p style="margin-top: 15px; font-size: 0.9em; color: #666;">
                    <i>Case ID: LEAD-${Date.now().toString().slice(-6)}</i>
                </p>
            </div>
        `,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#1abc9c',
        width: '500px',
        customClass: {
            popup: 'custom-swal-popup'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            this.reset();
            console.log('📋 LEAD CAPTURED:', formData);
            console.log('📊 Total leads captured:', leads.length);
        }
    });
});