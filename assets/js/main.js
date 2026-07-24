/**
 * NorthPeak Digital - Main JavaScript
 * Optimized for performance, accessibility, and contact form validation.
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Preloader Cleanup
    document.body.classList.remove('is-preload');

    // 2. Smooth Scrolling with Accessible Focus Handling
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    // 3. Contact Form Validation Logic
    var form = document.getElementById('contact-form');
    if (!form) return;

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(fieldId, message) {
        var errorEl = document.getElementById('error-' + fieldId);
        var inputEl = document.getElementById('contact-' + fieldId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
        if (inputEl) {
            inputEl.setAttribute('aria-invalid', 'true');
            inputEl.classList.add('input-error');
        }
    }

    function clearError(fieldId) {
        var errorEl = document.getElementById('error-' + fieldId);
        var inputEl = document.getElementById('contact-' + fieldId);
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        }
        if (inputEl) {
            inputEl.removeAttribute('aria-invalid');
            inputEl.classList.remove('input-error');
        }
    }

    function validateField(field) {
        var input = document.getElementById('contact-' + field);
        if (!input) return true;
        var value = input.value.trim();
        clearError(field);

        if (field === 'name') {
            if (value === '') {
                showError('name', 'Name is required.');
                return false;
            }
        } else if (field === 'email') {
            if (value === '' || !validateEmail(value)) {
                showError('email', 'Enter a valid email address.');
                return false;
            }
        } else if (field === 'message') {
            if (value.length < 20) {
                showError('message', 'Message must contain at least 20 characters.');
                return false;
            }
        }
        // Company is optional
        return true;
    }

    // Real-time validation on blur & input
    ['name', 'email', 'message'].forEach(function (field) {
        var input = document.getElementById('contact-' + field);
        if (input) {
            input.addEventListener('blur', function () {
                validateField(field);
            });
            input.addEventListener('input', function () {
                clearError(field);
            });
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearError('name');
        clearError('email');
        clearError('company');
        clearError('message');

        var isNameValid = validateField('name');
        var isEmailValid = validateField('email');
        var isMessageValid = validateField('message');

        if (isNameValid && isEmailValid && isMessageValid) {
            form.style.display = 'none';
            var successEl = document.getElementById('form-success');
            if (successEl) {
                successEl.style.display = 'block';
                successEl.setAttribute('tabindex', '-1');
                successEl.focus();
            }
        } else {
            var firstError = form.querySelector('.input-error');
            if (firstError) {
                firstError.focus();
            }
        }
    });
});
