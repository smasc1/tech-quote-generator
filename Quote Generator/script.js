/**
 * Quote Generator Application
 * Demonstrating Arrays, Objects, Random Selection, DOM Manipulation, and Event Handling.
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // State Management
  // ---------------------------------------------------------------------------
  let currentCategory = 'Developer';
  let currentQuote = null;
  let lastQuoteIndex = -1;

  // ---------------------------------------------------------------------------
  // DOM Elements Selection
  // ---------------------------------------------------------------------------
  const quoteTextEl = document.getElementById('quote-text');
  const quoteAuthorEl = document.getElementById('quote-author');
  const quoteCategoryTagEl = document.getElementById('quote-category-tag');
  const quoteNumberTagEl = document.getElementById('quote-number-tag');
  const quoteTagsEl = document.getElementById('quote-tags');
  const charCountEl = document.getElementById('char-count');
  const segmentBtns = document.querySelectorAll('.segment-btn');
  
  // Action Buttons
  const newQuoteBtn = document.getElementById('new-quote-btn');
  const refreshIcon = document.getElementById('refresh-icon');
  const copyQuoteBtn = document.getElementById('copy-quote-btn');
  const shareQuoteBtn = document.getElementById('share-quote-btn');

  // Share Modal Elements
  const shareModal = document.getElementById('share-modal');
  const closeShareModalBtn = document.getElementById('close-share-modal-btn');
  const modalPreviewText = document.getElementById('modal-preview-text');
  const modalPreviewAuthor = document.getElementById('modal-preview-author');
  const shareWhatsapp = document.getElementById('share-whatsapp');
  const shareTwitter = document.getElementById('share-twitter');
  const shareLinkedin = document.getElementById('share-linkedin');
  const shareTelegram = document.getElementById('share-telegram');
  const shareFacebook = document.getElementById('share-facebook');
  const shareEmail = document.getElementById('share-email');
  const nativeShareContainer = document.getElementById('native-share-container');
  const nativeShareBtn = document.getElementById('native-share-btn');
  const modalCopyBtn = document.getElementById('modal-copy-btn');
  const modalCopyLabel = document.getElementById('modal-copy-label');
  
  // Header Utility Controls
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  const toastContainer = document.getElementById('toast-container');

  // ---------------------------------------------------------------------------
  // Toast Notifications
  // ---------------------------------------------------------------------------
  function showToast(message, iconSvg = '') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2500);
  }

  // ---------------------------------------------------------------------------
  // Quote Filtering & Random Selection Logic
  // ---------------------------------------------------------------------------
  function getFilteredQuotes() {
    if (!currentCategory || currentCategory === 'All') {
      return QUOTES_DATA;
    }
    return QUOTES_DATA.filter((item) => item.category === currentCategory);
  }

  function getRandomQuote() {
    const pool = getFilteredQuotes();
    if (!pool || pool.length === 0) {
      return {
        quote: "Keep writing code and building things.",
        author: "Developer Mindset",
        category: "Developer",
        tags: ["programming", "mindset"]
      };
    }

    if (pool.length === 1) {
      return pool[0];
    }

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * pool.length);
    } while (nextIndex === lastQuoteIndex && pool.length > 1);

    lastQuoteIndex = nextIndex;
    return pool[nextIndex];
  }

  // ---------------------------------------------------------------------------
  // Display Quote with Smooth Micro-Animation
  // ---------------------------------------------------------------------------
  function displayQuote(quoteObj) {
    if (!quoteObj) return;
    currentQuote = quoteObj;

    // Trigger spin animation on refresh icon
    refreshIcon.classList.remove('spinning');
    void refreshIcon.offsetWidth; // Force reflow
    refreshIcon.classList.add('spinning');

    // Smooth exit animation
    quoteTextEl.classList.remove('animate-in');
    quoteTextEl.classList.add('animate-out');

    setTimeout(() => {
      // Update DOM content
      quoteTextEl.textContent = quoteObj.quote;
      quoteAuthorEl.textContent = quoteObj.author;
      quoteCategoryTagEl.textContent = quoteObj.category;

      const pool = getFilteredQuotes();
      const currentIndexInPool = pool.findIndex(q => q.quote === quoteObj.quote) + 1;
      const currentNum = currentIndexInPool > 0 ? currentIndexInPool : 1;
      quoteNumberTagEl.innerHTML = `<span class="qn-prefix">Quote </span>#${currentNum} of ${pool.length}`;

      // Update tags
      quoteTagsEl.innerHTML = '';
      if (quoteObj.tags && quoteObj.tags.length > 0) {
        quoteObj.tags.forEach(tag => {
          const tagSpan = document.createElement('span');
          tagSpan.className = 'quote-tag';
          tagSpan.textContent = `#${tag}`;
          quoteTagsEl.appendChild(tagSpan);
        });
      }

      // Update statistics (character count)
      const textLength = quoteObj.quote.length;
      charCountEl.textContent = `${textLength} chars`;

      // Smooth enter animation
      quoteTextEl.classList.remove('animate-out');
      quoteTextEl.classList.add('animate-in');
    }, 150);
  }

  // ---------------------------------------------------------------------------
  // Action Handlers
  // ---------------------------------------------------------------------------

  // 1. Next Quote
  function nextQuote() {
    const newQuote = getRandomQuote();
    displayQuote(newQuote);
  }

  let copyFeedbackTimeout = null;

  function triggerCopyConfirmation() {
    // 1. Inline button feedback: checkmark + "Copied!" tooltip
    if (copyQuoteBtn) {
      copyQuoteBtn.classList.add('copied');
      if (copyFeedbackTimeout) clearTimeout(copyFeedbackTimeout);
      copyFeedbackTimeout = setTimeout(() => {
        copyQuoteBtn.classList.remove('copied');
      }, 2000);
    }

    // 2. Prominent top toast notification
    showToast('Quote copied to clipboard!', `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `);
  }

  // 2. Copy Quote to Clipboard
  async function copyQuote() {
    if (!currentQuote) return;
    const textToCopy = `"${currentQuote.quote}" — ${currentQuote.author}`;

    let success = false;

    // Modern Clipboard API
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    // Universal Fallback using clean textarea selection
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        textArea.style.fontSize = '12pt';
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (e) {
        // Fallback execution
      }
    }

    // Display confirmation message and button feedback
    triggerCopyConfirmation();
  }

  // 3. Share Applications Modal Logic
  function updateShareLinks() {
    if (!currentQuote) return;
    const quoteFormatted = `"${currentQuote.quote}" — ${currentQuote.author}`;
    const encodedQuote = encodeURIComponent(quoteFormatted);
    const currentUrl = encodeURIComponent(window.location.href.startsWith('http') ? window.location.href : 'https://developer.mozilla.org');

    if (modalPreviewText) modalPreviewText.textContent = `"${currentQuote.quote}"`;
    if (modalPreviewAuthor) modalPreviewAuthor.textContent = `— ${currentQuote.author}`;

    // 1. WhatsApp
    if (shareWhatsapp) shareWhatsapp.href = `https://api.whatsapp.com/send?text=${encodedQuote}`;

    // 2. X / Twitter
    if (shareTwitter) shareTwitter.href = `https://twitter.com/intent/tweet?text=${encodedQuote}`;

    // 3. LinkedIn
    if (shareLinkedin) shareLinkedin.href = `https://www.linkedin.com/feed/?shareActive=true&text=${encodedQuote}`;

    // 4. Telegram
    if (shareTelegram) shareTelegram.href = `https://t.me/share/url?url=${currentUrl}&text=${encodedQuote}`;

    // 5. Facebook
    if (shareFacebook) shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?quote=${encodedQuote}&u=${currentUrl}`;

    // 6. Email
    const subject = encodeURIComponent(`Inspiring Quote: ${currentQuote.category} Mindset`);
    const body = encodeURIComponent(`${quoteFormatted}\n\nShared via Quote Generator`);
    if (shareEmail) shareEmail.href = `mailto:?subject=${subject}&body=${body}`;

    // Native Web Share button visibility
    if (nativeShareContainer) {
      nativeShareContainer.style.display = (navigator.share) ? 'block' : 'none';
    }
  }

  function openShareModal() {
    updateShareLinks();
    if (shareModal) {
      shareModal.classList.add('active');
      shareModal.setAttribute('aria-hidden', 'false');
      if (closeShareModalBtn) closeShareModalBtn.focus();
    }
  }

  function closeShareModal() {
    if (shareModal) {
      shareModal.classList.remove('active');
      shareModal.setAttribute('aria-hidden', 'true');
      if (shareQuoteBtn) shareQuoteBtn.focus();
    }
  }

  function shareQuote() {
    if (!currentQuote) return;
    openShareModal();
  }

  function triggerNativeShare() {
    if (!currentQuote || !navigator.share) return;
    const shareText = `"${currentQuote.quote}" — ${currentQuote.author}`;
    navigator.share({
      title: 'Quote of the Day',
      text: shareText,
      url: window.location.href
    }).catch(() => {});
  }

  // ---------------------------------------------------------------------------
  // Theme & Layout Preferences
  // ---------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('quote_gen_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
  }

  function toggleTheme() {
    const current = document.body.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('quote_gen_theme', next);

    const themeIcon = next === 'dark'
      ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
      : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    showToast(`Switched to ${next} mode`, themeIcon);
  }

  // ---------------------------------------------------------------------------
  // Event Listeners Registration
  // ---------------------------------------------------------------------------
  function setupEventListeners() {
    // Buttons
    newQuoteBtn.addEventListener('click', nextQuote);
    copyQuoteBtn.addEventListener('click', copyQuote);
    shareQuoteBtn.addEventListener('click', shareQuote);
    
    // Segmented Category Filter Pills
    segmentBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-category');
        currentCategory = cat;
        lastQuoteIndex = -1;

        segmentBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        e.currentTarget.classList.add('active');
        e.currentTarget.setAttribute('aria-selected', 'true');

        nextQuote();
      });
    });

    // Header Controls
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Global Keyboard Shortcuts (Space or N for next quote)
    window.addEventListener('keydown', (e) => {
      // Do not intercept if modifier keys are pressed (Ctrl, Cmd, Alt)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Don't intercept when focusing input or form fields
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.key === 'Escape' && shareModal && shareModal.classList.contains('active')) {
        closeShareModal();
        return;
      }

      if (e.code === 'Space' || e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        nextQuote();
      }
    });

    // Share Modal Event Handlers
    if (closeShareModalBtn) {
      closeShareModalBtn.addEventListener('click', closeShareModal);
    }

    if (shareModal) {
      shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
          closeShareModal();
        }
      });
    }

    if (nativeShareBtn) {
      nativeShareBtn.addEventListener('click', triggerNativeShare);
    }

    if (modalCopyBtn) {
      modalCopyBtn.addEventListener('click', () => {
        copyQuote();
        modalCopyBtn.classList.add('copied');
        if (modalCopyLabel) modalCopyLabel.textContent = 'Copied to Clipboard!';
        setTimeout(() => {
          modalCopyBtn.classList.remove('copied');
          if (modalCopyLabel) modalCopyLabel.textContent = 'Copy Quote Text';
        }, 2000);
      });
    }

    // Mobile Touch Swipe Gesture (Swipe left or right on the card for next quote)
    const quoteCardEl = document.getElementById('quote-card');
    if (quoteCardEl) {
      let touchStartX = 0;
      let touchStartY = 0;

      quoteCardEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      quoteCardEl.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Horizontal swipe of 45px+ triggers next quote
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
          nextQuote();
        }
      }, { passive: true });
    }
  }

  // ---------------------------------------------------------------------------
  // Application Bootstrap
  // ---------------------------------------------------------------------------
  function init() {
    initTheme();
    setupEventListeners();

    // Initial quote matching the hero mockup screenshot
    const initialQuote = QUOTES_DATA.find(q => q.quote === "Code is simple when logic is clear.") || QUOTES_DATA[0];
    displayQuote(initialQuote);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
