/**
 * PlayNewApps Gemini Shopping & Customer Support Chatbot Widget
 * Multi-turn AI product finder with Amazon affiliate link integration & customer support.
 */

(function () {
  'use strict';

  // Prevent duplicate initialization
  if (window.PlayNewAppsChatbotInitialized) return;
  window.PlayNewAppsChatbotInitialized = true;

  const STORAGE_KEY = 'pna_chat_history_v1';
  const ASSOCIATE_TAG = 'playnewapps-20';

  const DEFAULT_GREETING = {
    role: 'model',
    text: "👋 Hi there! I'm your **PlayNewApps Smart Shopping & Support Assistant**.\n\nI can help you find any tech gear, gadgets, or software deals on **Amazon** with verified discounts, or help you with promo codes and store guides. What are you looking for today?",
    time: formatTime(new Date())
  };

  const SUGGESTIONS = [
    { label: '🎧 Best Wireless Headphones', query: 'What are the best wireless headphones deals on Amazon?' },
    { label: '💻 Budget Laptops Under $500', query: 'Can you recommend the best budget laptops under $500 on Amazon?' },
    { label: '⌨️ Mechanical Keyboards', query: 'Show me top rated mechanical keyboards for gaming and typing on Amazon' },
    { label: '🎟️ How do I use coupons?', query: 'How do I use promo codes on PlayNewApps to get discounts?' },
    { label: '🛡️ Best VPN Deals', query: 'Which VPN deals and coupons do you recommend right now?' }
  ];

  let state = {
    isOpen: false,
    isTyping: false,
    messages: loadSavedMessages(),
    geminiHistory: []
  };

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function loadSavedMessages() {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[CHATBOT] Could not load saved messages:', e);
    }
    return [DEFAULT_GREETING];
  }

  function saveMessages() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages));
    } catch (e) {
      // ignore quota errors
    }
  }

  // Parse basic Markdown into safe HTML with styled Amazon affiliate links
  function renderMarkdown(rawText) {
    if (!rawText) return '';
    let text = rawText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headers
    text = text.replace(/^### (.*$)/gim, '<h4>$1</h4>');
    text = text.replace(/^## (.*$)/gim, '<h3>$1</h3>');

    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Markdown Links [Label](URL)
    text = text.replace(/\[(.*?)\]\((https?:\/\/[^\s\)]+)\)/g, (match, label, url) => {
      // Decode HTML entities in url
      const rawUrl = url.replace(/&amp;/g, '&');
      const isAmz = rawUrl.includes('amazon.com') || rawUrl.includes('amzn.to');
      if (isAmz) {
        return `<a href="${rawUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored" class="pna-affiliate-btn-link"><span class="material-icons-round" style="font-size:16px;">shopping_cart</span> ${label}</a>`;
      }
      return `<a href="${rawUrl}" target="_blank" rel="noopener noreferrer nofollow">${label}</a>`;
    });

    // Lists
    const lines = text.split('\n');
    let inList = false;
    let formattedLines = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        if (!inList) {
          formattedLines.push('<ul>');
          inList = true;
        }
        formattedLines.push(`<li>${trimmed.substring(2)}</li>`);
      } else {
        if (inList) {
          formattedLines.push('</ul>');
          inList = false;
        }
        if (trimmed) {
          if (!trimmed.startsWith('<h') && !trimmed.startsWith('<ul') && !trimmed.startsWith('</ul')) {
            formattedLines.push(`<p>${line}</p>`);
          } else {
            formattedLines.push(line);
          }
        }
      }
    }
    if (inList) formattedLines.push('</ul>');

    return formattedLines.join('');
  }

  // Build and inject UI elements
  function initUI() {
    // Check if stylesheet is loaded
    if (!document.getElementById('pna-chatbot-css')) {
      const link = document.createElement('link');
      link.id = 'pna-chatbot-css';
      link.rel = 'stylesheet';
      link.href = '/assets/css/chatbot.css';
      document.head.appendChild(link);
    }

    // Material Icons if not already present
    if (!document.querySelector('link[href*="icon?family=Material+Icons"]')) {
      const iconLink = document.createElement('link');
      iconLink.rel = 'stylesheet';
      iconLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Round';
      document.head.appendChild(iconLink);
    }

    // Floating Launcher Button
    const launcher = document.createElement('div');
    launcher.className = 'pna-chat-launcher';
    launcher.id = 'pna-chat-launcher';
    launcher.setAttribute('aria-label', 'Open Shopping Assistant Chat');
    launcher.innerHTML = `
      <div class="pna-launcher-tooltip" id="pna-launcher-tooltip">
        <span>Need a product or deal? Ask AI!</span> ✨
      </div>
      <button class="pna-launcher-btn" id="pna-launcher-btn" title="Ask AI Shopping & Support Assistant">
        <span class="material-icons-round pna-launcher-icon pna-launcher-icon-chat">smart_toy</span>
        <span class="material-icons-round pna-launcher-icon pna-launcher-icon-close">close</span>
        <span class="pna-launcher-status" title="Online"></span>
      </button>
    `;

    // Chat Window
    const chatWindow = document.createElement('div');
    chatWindow.className = 'pna-chat-window';
    chatWindow.id = 'pna-chat-window';
    chatWindow.setAttribute('role', 'dialog');
    chatWindow.setAttribute('aria-label', 'PlayNewApps AI Shopping Assistant');
    chatWindow.innerHTML = `
      <div class="pna-chat-header">
        <div class="pna-header-info">
          <div class="pna-header-avatar">
            <span class="material-icons-round" style="font-size: 22px;">smart_toy</span>
          </div>
          <div>
            <h3 class="pna-header-title">PlayNewApps Assistant</h3>
            <div class="pna-header-status">
              <span class="pna-status-indicator"></span>
              <span>Gemini 3.8 AI • Shopping &amp; Support</span>
            </div>
          </div>
        </div>
        <div class="pna-header-actions">
          <button class="pna-header-btn" id="pna-chat-clear" title="Clear Chat History">
            <span class="material-icons-round">delete_outline</span>
          </button>
          <button class="pna-header-btn" id="pna-chat-close" title="Close Chat">
            <span class="material-icons-round">expand_more</span>
          </button>
        </div>
      </div>

      <div class="pna-chat-suggestions" id="pna-chat-suggestions"></div>

      <div class="pna-chat-messages" id="pna-chat-messages"></div>

      <div class="pna-chat-footer">
        <div class="pna-input-wrapper">
          <textarea
            class="pna-chat-input"
            id="pna-chat-input"
            rows="1"
            placeholder="Ask about any product, deal, or store..."
            aria-label="Ask AI Assistant"
          ></textarea>
          <button class="pna-send-btn" id="pna-send-btn" aria-label="Send message" disabled>
            <span class="material-icons-round">arrow_upward</span>
          </button>
        </div>
        <p class="pna-chat-disclaimer">Verified deals &amp; affiliate links with Amazon &amp; partner stores.</p>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(chatWindow);

    bindEvents();
    renderSuggestions();
    renderMessages();
  }

  function bindEvents() {
    const launcherBtn = document.getElementById('pna-launcher-btn');
    const closeBtn = document.getElementById('pna-chat-close');
    const clearBtn = document.getElementById('pna-chat-clear');
    const input = document.getElementById('pna-chat-input');
    const sendBtn = document.getElementById('pna-send-btn');

    launcherBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', closeChat);

    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your conversation history?')) {
        state.messages = [DEFAULT_GREETING];
        state.geminiHistory = [];
        saveMessages();
        renderMessages();
      }
    });

    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
      sendBtn.disabled = !input.value.trim() || state.isTyping;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (input.value.trim() && !state.isTyping) {
          sendMessage(input.value.trim());
        }
      }
    });

    sendBtn.addEventListener('click', () => {
      if (input.value.trim() && !state.isTyping) {
        sendMessage(input.value.trim());
      }
    });
  }

  function toggleChat() {
    state.isOpen ? closeChat() : openChat();
  }

  function openChat() {
    state.isOpen = true;
    document.body.classList.add('pna-chat-open');
    const win = document.getElementById('pna-chat-window');
    win.classList.add('pna-visible');
    
    // Hide launcher tooltip permanently for this session
    const tooltip = document.getElementById('pna-launcher-tooltip');
    if (tooltip) tooltip.style.display = 'none';

    setTimeout(() => {
      const input = document.getElementById('pna-chat-input');
      if (input && window.innerWidth > 480) input.focus();
      scrollToBottom();
    }, 150);
  }

  function closeChat() {
    state.isOpen = false;
    document.body.classList.remove('pna-chat-open');
    const win = document.getElementById('pna-chat-window');
    win.classList.remove('pna-visible');
  }

  function renderSuggestions() {
    const container = document.getElementById('pna-chat-suggestions');
    if (!container) return;
    container.innerHTML = '';
    SUGGESTIONS.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'pna-suggestion-pill';
      btn.textContent = item.label;
      btn.addEventListener('click', () => {
        if (!state.isTyping) {
          sendMessage(item.query);
        }
      });
      container.appendChild(btn);
    });
  }

  function renderMessages() {
    const container = document.getElementById('pna-chat-messages');
    if (!container) return;
    container.innerHTML = '';

    state.messages.forEach(msg => {
      const wrapper = document.createElement('div');
      wrapper.className = `pna-message ${msg.role === 'user' ? 'pna-user-msg' : 'pna-bot-msg'}`;

      const bubble = document.createElement('div');
      bubble.className = 'pna-msg-bubble';
      bubble.innerHTML = renderMarkdown(msg.text);

      // Render product cards if available
      if (msg.products && Array.isArray(msg.products) && msg.products.length > 0) {
        const cardsWrap = document.createElement('div');
        cardsWrap.className = 'pna-product-cards-list';
        msg.products.forEach(p => {
          const card = document.createElement('div');
          card.className = 'pna-product-card-preview';
          const imgSrc = p.image || '/assets/images/brands/amazon.svg';
          const buyUrl = p.affiliateUrl || `https://www.amazon.com/s?k=${encodeURIComponent(p.title)}&tag=${ASSOCIATE_TAG}`;
          card.innerHTML = `
            <img src="${imgSrc}" alt="${p.title}" class="pna-product-thumb" loading="lazy" onerror="this.src='/assets/images/brands/amazon.svg';">
            <div class="pna-product-info">
              <h5 class="pna-product-title">${p.title}</h5>
              <div class="pna-product-bottom">
                <span class="pna-product-price">${p.salePrice || p.price || 'Check Deal'}</span>
                <a href="${buyUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored" class="pna-product-cta">
                  <span>View on Amazon</span>
                  <span class="material-icons-round" style="font-size: 13px;">open_in_new</span>
                </a>
              </div>
            </div>
          `;
          cardsWrap.appendChild(card);
        });
        bubble.appendChild(cardsWrap);
      }

      const time = document.createElement('div');
      time.className = 'pna-msg-time';
      time.textContent = msg.time || '';

      wrapper.appendChild(bubble);
      wrapper.appendChild(time);
      container.appendChild(wrapper);
    });

    if (state.isTyping) {
      const typingWrap = document.createElement('div');
      typingWrap.className = 'pna-message pna-bot-msg';
      typingWrap.id = 'pna-typing-msg';
      typingWrap.innerHTML = `
        <div class="pna-typing-indicator">
          <div class="pna-typing-dot"></div>
          <div class="pna-typing-dot"></div>
          <div class="pna-typing-dot"></div>
        </div>
      `;
      container.appendChild(typingWrap);
    }

    scrollToBottom();
  }

  function scrollToBottom() {
    const container = document.getElementById('pna-chat-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  async function sendMessage(text) {
    if (!text || state.isTyping) return;

    // Reset input
    const input = document.getElementById('pna-chat-input');
    const sendBtn = document.getElementById('pna-send-btn');
    if (input) {
      input.value = '';
      input.style.height = 'auto';
    }
    if (sendBtn) sendBtn.disabled = true;

    // Add user message to state
    const userMsg = {
      role: 'user',
      text: text,
      time: formatTime(new Date())
    };
    state.messages.push(userMsg);
    saveMessages();

    // Set typing state
    state.isTyping = true;
    renderMessages();

    // Prepare Gemini History payload
    const historyPayload = state.messages
      .filter(m => m !== DEFAULT_GREETING && m !== userMsg)
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }))
      .slice(-8); // Keep last 8 turns for balanced latency

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      const data = await res.json();

      if (data && data.success) {
        state.messages.push({
          role: 'model',
          text: data.reply,
          products: data.recommendedProducts || [],
          time: formatTime(new Date())
        });
      } else {
        state.messages.push({
          role: 'model',
          text: `⚠️ **Note:** ${data.error || 'Could not retrieve product recommendations at this time. Please try again!'}`,
          time: formatTime(new Date())
        });
      }
    } catch (err) {
      console.error('[CHATBOT] Network error:', err);
      state.messages.push({
        role: 'model',
        text: "⚠️ Sorry, I had trouble connecting to the assistant. Please check your internet connection and try again.",
        time: formatTime(new Date())
      });
    } finally {
      state.isTyping = false;
      saveMessages();
      renderMessages();
      if (input && window.innerWidth > 480) input.focus();
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUI);
  } else {
    initUI();
  }

  // Expose global controller
  window.PlayNewAppsChatbot = {
    open: openChat,
    close: closeChat,
    toggle: toggleChat,
    ask: (q) => {
      openChat();
      sendMessage(q);
    }
  };
})();
