/**
 * Chatbot Widget - FAQ-based with keyword matching
 * Answers questions about skills, experience, projects, contact, resume
 */

(function () {
  'use strict';

  const chatToggle = document.getElementById('chat-toggle');
  const chatClose = document.getElementById('chat-close');
  const chatWindow = document.getElementById('chat-window');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  const GREETING = "Hi! I'm Sudais. Ask me about my skills, experience, education, projects, or how to contact me.";

  const FAQ_RULES = [
    { keywords: ['skill', 'technology', 'programming', 'python', 'java', 'c++', 'windows', 'linux', 'networking', 'cybersecurity', 'nmap', 'nessus', 'wireshark', 'tcp', 'dns', 'dhcp', 'vlan', 'what can you do'], response: "My technical skills include: Windows 10/11, Linux, Windows Server; TCP/IP, DNS, DHCP, VLANs, subnetting; Python, Java, C++; Nmap, Nessus, Wireshark for cybersecurity; VirtualBox, Hyper-V; troubleshooting and technical support." },
    { keywords: ['experience', 'job', 'work', 'instructor', 'mentor', 'internship'], response: "I'm a Python Instructor at Alpha Digital IT Academy, IT Mentor at Bowie State University, and IT Team Member at Solve X. I've also done technology volunteering. I'm seeking an IT Support, Systems, Networking, or Cybersecurity internship and am eligible for CPT/OPT." },
    { keywords: ['education', 'degree', 'school', 'university', 'college', 'bowie', 'montgomery'], response: "I'm a Computer Technology student at Bowie State University (B.S., expected May 2026, Network Infrastructure Track) and have an A.S. in Information Systems from Montgomery College (2023). I made Dean's List 7 times and am a Phi Theta Kappa member." },
    { keywords: ['project', 'github', 'portfolio', 'work'], response: "Check out my Projects section on this site for links to my GitHub repositories. I'm building out my project portfolio with school work and personal projects." },
    { keywords: ['contact', 'email', 'reach', 'phone', 'linkedin', 'hire'], response: "You can reach me at sudaiskedir@gmail.com or (240) 428-9099. I'm based in Silver Spring, MD. Feel free to use the Contact form on this site!" },
    { keywords: ['resume', 'cv', 'download'], response: "You can view or download my resume from the Resume section on this page. It has my latest skills, experience, and education." },
    { keywords: ['who are you', 'about you', 'tell me about'], response: "I'm Sudais Mohamed, a Computer Technology student specializing in IT support, networking, and cybersecurity. I teach Python, mentor students in IT, and enjoy hands-on labs with Windows Server, VLANs, and security tools." },
    { keywords: ['hello', 'hi', 'hey'], response: "Hi there! How can I help you today? Ask about my skills, experience, or projects." },
    { keywords: ['thank', 'thanks'], response: "You're welcome! Anything else you'd like to know?" },
    { keywords: ['bye', 'goodbye'], response: "Thanks for visiting! Feel free to reach out via the Contact form. Goodbye!" }
  ];

  const FALLBACK = "I'm not sure about that. Try asking about my skills, experience, education, projects, or how to contact me.";

  function addMessage(text, isUser) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.className = isUser ? 'chat-msg user' : 'chat-msg bot';
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(userText) {
    const lower = userText.toLowerCase().trim();
    for (let i = 0; i < FAQ_RULES.length; i++) {
      const rule = FAQ_RULES[i];
      for (let j = 0; j < rule.keywords.length; j++) {
        if (lower.includes(rule.keywords[j])) {
          return rule.response;
        }
      }
    }
    return FALLBACK;
  }

  function openChat() {
    if (chatWindow) {
      chatWindow.classList.remove('hidden');
      if (chatMessages && chatMessages.children.length === 0) {
        addMessage(GREETING, false);
      }
    }
  }

  function closeChat() {
    if (chatWindow) chatWindow.classList.add('hidden');
  }

  function sendMessage() {
    const text = chatInput ? chatInput.value.trim() : '';
    if (!text) return;
    addMessage(text, true);
    if (chatInput) chatInput.value = '';
    setTimeout(function () {
      addMessage(getBotResponse(text), false);
    }, 300);
  }

  if (chatToggle) chatToggle.addEventListener('click', openChat);
  if (chatClose) chatClose.addEventListener('click', closeChat);

  if (chatSend && chatInput) {
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
})();
