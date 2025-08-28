document.addEventListener('DOMContentLoaded', () => {
    const shortenBtn = document.getElementById('shortenBtn');
    const originalUrlInput = document.getElementById('originalUrl');
    const resultDiv = document.getElementById('result');
    const shortUrlText = document.getElementById('shortUrlText');
    const copyBtn = document.getElementById('copyBtn');
    const successMessage = document.getElementById('successMessage');

    // Loading state handling
    function setLoading(isLoading) {
        if (isLoading) {
            shortenBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            shortenBtn.disabled = true;
        } else {
            shortenBtn.innerHTML = '<i class="fas fa-cut"></i> Shorten URL';
            shortenBtn.disabled = false;
        }
    }

    // Copy to clipboard functionality
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    // URL validation
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.marginTop = '1rem';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // Remove any existing error message
        const existingError = document.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        errorDiv.className = 'error-message';
        originalUrlInput.parentNode.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // Event Listeners
    shortenBtn.addEventListener('click', async () => {
        const originalUrl = originalUrlInput.value.trim();
        
        if (!originalUrl) {
            showError('Please enter a URL');
            return;
        }
        
        if (!isValidUrl(originalUrl)) {
            showError('Please enter a valid URL');
            return;
        }

        setLoading(true);
        
        try {
            const response = await fetch('/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ originalUrl })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const shortUrl = `${window.location.origin}/${data.shortUrl}`;
            
            resultDiv.style.display = 'block';
            shortUrlText.textContent = shortUrl;
            
            // Clear input
            originalUrlInput.value = '';
            
        } catch (err) {
            console.error('Error shortening the URL: ', err);
            showError('Error shortening the URL. Please try again.');
        } finally {
            setLoading(false);
        }
    });

    // Copy button click handler
    copyBtn.addEventListener('click', () => {
        const shortUrl = shortUrlText.textContent;
        copyToClipboard(shortUrl);
    });

    // Enter key handler
    originalUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            shortenBtn.click();
        }
    });
});