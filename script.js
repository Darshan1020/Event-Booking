// Event Booking Website JavaScript
// Main functionality for EventHub

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupThemeToggle();
    setupModals();
    setupFormHandlers();
    setupLocalStorage();
    addAnimations();
}

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Modal Functionality
function setupModals() {
    // Event details modal
    const eventModal = document.getElementById('event-modal');
    const bookingModal = document.getElementById('booking-modal');
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Close modals when clicking close button
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    });
}

// Event Details Modal
function showEventDetails(eventId) {
    const modal = document.getElementById('event-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Event data (in a real app, this would come from a database)
    const eventData = {
        'summer-music-festival': {
            title: 'Summer Music Festival',
            date: 'July 15, 2024',
            time: '2:00 PM - 10:00 PM',
            location: 'Central Park',
            price: '$45',
            description: 'Join us for an amazing day of live music, food, and fun! This year\'s festival features top artists and local bands performing across multiple stages. Enjoy delicious food from local vendors, interactive art installations, and a vibrant atmosphere perfect for music lovers of all ages.',
            highlights: [
                'Live performances from 10+ artists',
                'Food trucks and local vendors',
                'Interactive art installations',
                'Family-friendly activities',
                'VIP seating available'
            ],
            organizer: 'City Events Committee',
            capacity: '5000 attendees',
            category: 'Music & Entertainment'
        },
        'tech-workshop': {
            title: 'Tech Workshop',
            date: 'August 5, 2024',
            time: '9:00 AM - 5:00 PM',
            location: 'Innovation Center',
            price: '$75',
            description: 'Learn the latest in web development and AI technologies in this hands-on workshop. Perfect for developers looking to expand their skills or beginners wanting to start their tech journey.',
            highlights: [
                'Hands-on coding sessions',
                'Expert instructors',
                'Latest web development tools',
                'AI and machine learning basics',
                'Networking opportunities',
                'Certificate of completion'
            ],
            organizer: 'Tech Academy',
            capacity: '50 participants',
            category: 'Education & Technology'
        },
        'food-wine-festival': {
            title: 'Food & Wine Festival',
            date: 'September 20, 2024',
            time: '12:00 PM - 8:00 PM',
            location: 'Downtown Plaza',
            price: '$60',
            description: 'Taste the finest cuisines from around the world at our annual Food & Wine Festival. Experience culinary excellence with wine pairings and cooking demonstrations.',
            highlights: [
                'International cuisine sampling',
                'Wine tasting sessions',
                'Cooking demonstrations',
                'Chef meet & greet',
                'Live entertainment',
                'Gourmet food market'
            ],
            organizer: 'Culinary Arts Society',
            capacity: '2000 attendees',
            category: 'Food & Beverage'
        },
        'art-exhibition': {
            title: 'Modern Art Exhibition',
            date: 'October 10, 2024',
            time: '10:00 AM - 6:00 PM',
            location: 'Art Gallery',
            price: '$25',
            description: 'Explore contemporary art from local and international artists. This exhibition showcases cutting-edge works across various mediums and styles.',
            highlights: [
                'Contemporary art displays',
                'Artist talks and Q&A',
                'Guided tours available',
                'Interactive installations',
                'Art workshops',
                'Gallery shop'
            ],
            organizer: 'Modern Art Collective',
            capacity: '300 visitors',
            category: 'Arts & Culture'
        },
        'fitness-bootcamp': {
            title: 'Fitness Bootcamp',
            date: 'November 5, 2024',
            time: '7:00 AM - 9:00 AM',
            location: 'Community Center',
            price: '$30',
            description: 'High-intensity workout session with professional trainers. All fitness levels welcome - modifications provided for beginners.',
            highlights: [
                'High-intensity interval training',
                'Professional trainers',
                'All fitness levels welcome',
                'Equipment provided',
                'Nutrition guidance',
                'Post-workout refreshments'
            ],
            organizer: 'FitLife Training',
            capacity: '100 participants',
            category: 'Health & Fitness'
        },
        'comedy-night': {
            title: 'Comedy Night',
            date: 'December 15, 2024',
            time: '8:00 PM - 11:00 PM',
            location: 'Comedy Club',
            price: '$35',
            description: 'An evening of laughter with top comedians from the local and national comedy scene. Food and drinks available throughout the show.',
            highlights: [
                'Stand-up comedy performances',
                'Multiple comedians',
                'Food and drinks available',
                'Intimate venue setting',
                'Meet & greet after show',
                'Age 18+ event'
            ],
            organizer: 'Laugh Factory',
            capacity: '200 attendees',
            category: 'Entertainment'
        }
    };
    
    const event = eventData[eventId];
    if (event && modalContent) {
        modalContent.innerHTML = `
            <div class="event-details">
                <h2>${event.title}</h2>
                <div class="event-meta">
                    <p><i class="fas fa-calendar"></i> ${event.date}</p>
                    <p><i class="fas fa-clock"></i> ${event.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p><i class="fas fa-ticket-alt"></i> ${event.price}</p>
                    <p><i class="fas fa-users"></i> ${event.capacity}</p>
                    <p><i class="fas fa-tag"></i> ${event.category}</p>
                </div>
                <div class="event-description">
                    <h3>About This Event</h3>
                    <p>${event.description}</p>
                </div>
                <div class="event-highlights">
                    <h3>Event Highlights</h3>
                    <ul>
                        ${event.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
                <div class="event-organizer">
                    <p><strong>Organized by:</strong> ${event.organizer}</p>
                </div>
                <div class="event-actions">
                    <button class="btn btn-primary" onclick="bookEvent('${event.title}', ${event.price.replace('$', '')})">Book Now</button>
                    <button class="btn btn-secondary" onclick="closeEventModal()">Close</button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

function closeEventModal() {
    const modal = document.getElementById('event-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Booking Modal
function bookEvent(eventName, eventPrice) {
    const modal = document.getElementById('booking-modal');
    const eventNameInput = document.getElementById('event-name');
    const eventPriceInput = document.getElementById('event-price');
    
    if (modal && eventNameInput && eventPriceInput) {
        eventNameInput.value = eventName;
        eventPriceInput.value = `$${eventPrice}`;
        
        // Reset form
        const form = document.getElementById('booking-form');
        if (form) {
            form.reset();
            updateTotalPrice();
        }
        
        modal.style.display = 'block';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Form Handlers
function setupFormHandlers() {
    // Booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
        
        // Ticket quantity change
        const ticketQuantity = document.getElementById('ticket-quantity');
        if (ticketQuantity) {
            ticketQuantity.addEventListener('change', updateTotalPrice);
        }
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function updateTotalPrice() {
    const eventPriceInput = document.getElementById('event-price');
    const ticketQuantitySelect = document.getElementById('ticket-quantity');
    const totalPriceInput = document.getElementById('total-price');
    
    if (eventPriceInput && ticketQuantitySelect && totalPriceInput) {
        const price = parseInt(eventPriceInput.value.replace('$', ''));
        const quantity = parseInt(ticketQuantitySelect.value) || 0;
        const total = price * quantity;
        
        totalPriceInput.value = total > 0 ? `$${total}` : '';
    }
}

function handleBookingSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const bookingData = {
        eventName: formData.get('eventName'),
        eventPrice: formData.get('eventPrice'),
        customerName: formData.get('customerName'),
        customerEmail: formData.get('customerEmail'),
        customerPhone: formData.get('customerPhone'),
        ticketQuantity: formData.get('ticketQuantity'),
        totalPrice: formData.get('totalPrice'),
        bookingDate: new Date().toISOString(),
        bookingId: generateBookingId()
    };
    
    // Validate form
    if (!validateBookingForm(bookingData)) {
        return;
    }
    
    // Save to localStorage
    saveBooking(bookingData);
    
    // Show success message
    showSuccessMessage('Booking confirmed! Check your email for confirmation details.');
    
    // Close modal
    closeBookingModal();
    
    // Reset form
    event.target.reset();
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        date: new Date().toISOString()
    };
    
    // Validate form
    if (!validateContactForm(contactData)) {
        return;
    }
    
    // Save to localStorage
    saveContactMessage(contactData);
    
    // Show success message
    showSuccessMessage('Message sent successfully! We\'ll get back to you soon.');
    
    // Reset form
    event.target.reset();
}

// Form Validation
function validateBookingForm(data) {
    const errors = [];
    
    if (!data.customerName || data.customerName.trim().length < 2) {
        errors.push('Please enter a valid name (minimum 2 characters)');
    }
    
    if (!data.customerEmail || !isValidEmail(data.customerEmail)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.customerPhone || data.customerPhone.trim().length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.ticketQuantity || data.ticketQuantity === '') {
        errors.push('Please select the number of tickets');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('<br>'));
        return false;
    }
    
    return true;
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name (minimum 2 characters)');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject === '') {
        errors.push('Please select a subject');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (minimum 10 characters)');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('<br>'));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Local Storage Functions
function setupLocalStorage() {
    // Initialize localStorage if empty
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([]));
    }
    if (!localStorage.getItem('contactMessages')) {
        localStorage.setItem('contactMessages', JSON.stringify([]));
    }
}

function saveBooking(bookingData) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

function saveContactMessage(contactData) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(contactData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

function getBookings() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
}

function getContactMessages() {
    return JSON.parse(localStorage.getItem('contactMessages') || '[]');
}

// Utility Functions
function generateBookingId() {
    return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(messageDiv);
    messageDiv.style.display = 'block';
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
        document.body.removeChild(messageDiv);
    }, 5000);
}

// Animation Functions
function addAnimations() {
    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.event-card, .feature-card, .faq-item, .contact-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Export functions for global access
window.showEventDetails = showEventDetails;
window.bookEvent = bookEvent;
window.closeEventModal = closeEventModal;
window.closeBookingModal = closeBookingModal;
window.updateTotalPrice = updateTotalPrice; 