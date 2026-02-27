/**
 * Chatbot Widget - Phase 1 Foundation
 * Toggle open/close, greeting. Full FAQ logic in Phase 3.
 */

(function () {
  'use strict';

  const chatToggle = document.getElementById('chat-toggle');
  const chatClose = document.getElementById('chat-close');
  const chatWindow = document.getElementById('chat-window');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  function addMessage(text, isUser) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.className = isUser ? 'chat-msg user' : 'chat-msg bot';
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function openChat() {
    if (chatWindow) {
      chatWindow.classList.remove('hidden');
      if (chatMessages && chatMessages.children.length === 0) {
        addMessage('Hi! Ask me about my skills, experience, or projects. (Full FAQ in Phase 3)', false);
      }
    }
  }

  function closeChat() {
    if (chatWindow) chatWindow.classList.add('hidden');
  }

  if (chatToggle) chatToggle.addEventListener('click', openChat);
  if (chatClose) chatClose.addEventListener('click', closeChat);

  if (chatSend && chatInput) {
    chatSend.addEventListener('click', function () {
      const text = chatInput.value.trim();
      if (!text) return;
      addMessage(text, true);
      chatInput.value = '';
      addMessage('Full chatbot responses coming in Phase 3!', false);
    });

    chatInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        chatSend.click();
      }
    });
  }
})();
