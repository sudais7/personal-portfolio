/**
 * Chatbot Widget - NLP-powered with Compromise.js
 * Premium UI with avatars, timestamps, and quick replies
 */

(function () {
  'use strict';

  const chatToggle = document.getElementById('chat-toggle');
  const chatClose = document.getElementById('chat-close');
  const chatMinimize = document.getElementById('chat-minimize');
  const chatWindow = document.getElementById('chat-window');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');

  const GREETING = "Hi there! I'm Sudais's digital assistant. How can I help you today?";
  
  let isSending = false;

  const INTENTS = [
    {
      id: 'skills',
      keywords: ['skill', 'technology', 'programming', 'python', 'java', 'c++', 'windows', 'linux', 'networking', 'cybersecurity', 'nmap', 'nessus', 'wireshark', 'tcp', 'dns', 'dhcp', 'vlan', 'hyper-v', 'virtualbox'],
      synonyms: ['ability', 'abilities', 'expertise', 'tech', 'tools', 'know', 'knowledge', 'capable'],
      response: "My technical skills include: Windows 10/11, Linux, Windows Server; TCP/IP, DNS, DHCP, VLANs, subnetting; Python, Java, C++; Nmap, Nessus, Wireshark for cybersecurity; VirtualBox, Hyper-V; troubleshooting and technical support."
    },
    {
      id: 'experience',
      keywords: ['experience', 'job', 'work', 'instructor', 'mentor', 'internship', 'alpha', 'bowie', 'solve', 'sincerity'],
      synonyms: ['career', 'history', 'position', 'role', 'employed', 'teaching'],
      response: "I'm a Python Instructor at Alpha Digital IT Academy, IT Mentor at Bowie State University, and IT Team Member at Solve X. I've also done technology volunteering with Sincerity Group. I'm seeking an IT Support, Systems, Networking, or Cybersecurity internship and am eligible for CPT/OPT."
    },
    {
      id: 'education',
      keywords: ['education', 'degree', 'school', 'university', 'college', 'bowie', 'montgomery', 'graduate', 'studying'],
      synonyms: ['study', 'learn', 'graduated', 'studied'],
      response: "I'm a Computer Technology student at Bowie State University (B.S., expected May 2026, Network Infrastructure Track) and have an A.S. in Information Systems from Montgomery College (2023). I made Dean's List 7 times and am a Phi Theta Kappa member."
    },
    {
      id: 'projects',
      keywords: ['project', 'github', 'portfolio', 'lab', 'labs', 'devsecops', 'firewall', 'iptables', 'hyper-v', 'docker', 'wireshark', 'nmap', 'virtualization', 'built'],
      synonyms: ['built', 'made', 'work', 'experiment'],
      response: "I have 26 home labs in DevSecOps, iptables firewall engineering, Hyper-V virtualization, Docker containers, network analysis with Wireshark and Nmap, and more. Check the Projects section for details. GitHub: github.com/sudais7"
    },
    {
      id: 'contact',
      keywords: ['contact', 'email', 'reach', 'phone', 'hire', 'linkedin', 'message', 'connect'],
      synonyms: ['get in touch', 'talk', 'call', 'write'],
      response: "You can reach me at sudaiskedir@gmail.com or (240) 428-9099. I'm based in Silver Spring, MD. Feel free to use the Contact form on this site!"
    },
    {
      id: 'resume',
      keywords: ['resume', 'cv', 'download', 'document', 'pdf'],
      synonyms: ['get your resume', 'see your resume'],
      response: "You can view or download my resume from the Resume button in the navigation. It has my latest skills, experience, and education."
    },
    {
      id: 'about',
      keywords: ['who', 'about', 'you', 'tell me'],
      synonyms: ['yourself', 'intro', 'introduce'],
      response: "I'm Sudais Mohamed, a Computer Technology student specializing in IT support, networking, and cybersecurity. I teach Python, mentor students in IT, and enjoy hands-on labs with Windows Server, VLANs, and security tools. I love solving problems and making technology accessible."
    },
    {
      id: 'greeting',
      keywords: ['hello', 'hi', 'hey', 'greetings', 'howdy'],
      synonyms: ['sup', 'yo'],
      response: "Hi there! How can I help you today? Ask about my skills, experience, or projects."
    },
    {
      id: 'thanks',
      keywords: ['thank', 'thanks', 'appreciate'],
      synonyms: ['ty', 'thx'],
      response: "You're welcome! Anything else you'd like to know?"
    },
    {
      id: 'goodbye',
      keywords: ['bye', 'goodbye', 'later'],
      synonyms: ['see you', 'goodnight'],
      response: "Thanks for visiting! Feel free to reach out via the Contact form. Goodbye!"
    }
  ];

  const FALLBACK = "I'm not sure about that. Try asking about my skills, experience, education, projects, or how to contact me.";

  function getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  function addMessage(text, isUser) {
    if (!chatMessages) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-msg-wrapper ' + (isUser ? 'user' : 'bot');
    
    const avatar = document.createElement('div');
    avatar.className = 'chat-msg-avatar ' + (isUser ? 'user' : 'bot');
    avatar.innerHTML = '<span class="material-symbols-outlined">' + (isUser ? 'person' : 'smart_toy') + '</span>';
    
    const content = document.createElement('div');
    content.className = 'chat-msg-content';
    
    const msg = document.createElement('div');
    msg.className = 'chat-msg ' + (isUser ? 'user' : 'bot');
    msg.textContent = text;
    
    const time = document.createElement('span');
    time.className = 'chat-msg-time';
    time.textContent = getTimeString();
    
    content.appendChild(msg);
    content.appendChild(time);
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(content);
    
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function detectIntent(text) {
    if (!text || !text.trim()) return null;
    var input = text.trim();
    if (input.length < 2) return null;

    try {
      if (typeof nlp !== 'undefined') {
        var doc = nlp(input);
        doc.contractions().expand();
        doc.normalize();
        var normalized = doc.text().toLowerCase();
        var nouns = doc.nouns().out('array').map(function (s) { return s.toLowerCase(); });
        var verbs = doc.verbs().out('array').map(function (s) { return s.toLowerCase(); });
        var words = normalized.split(/\s+/).filter(Boolean);
        var allTerms = [].concat(nouns, verbs, words);
        var uniqueTerms = [];
        for (var i = 0; i < allTerms.length; i++) {
          if (uniqueTerms.indexOf(allTerms[i]) === -1) uniqueTerms.push(allTerms[i]);
        }

        var bestIntent = null;
        var bestScore = 0;

        for (var j = 0; j < INTENTS.length; j++) {
          var intent = INTENTS[j];
          var score = 0;
          for (var k = 0; k < intent.keywords.length; k++) {
            var kw = intent.keywords[k];
            if (normalized.indexOf(kw) !== -1 || uniqueTerms.indexOf(kw) !== -1) score += 2;
          }
          if (intent.synonyms) {
            for (var s = 0; s < intent.synonyms.length; s++) {
              var syn = intent.synonyms[s];
              if (normalized.indexOf(syn) !== -1 || uniqueTerms.indexOf(syn) !== -1) score += 1;
            }
          }
          if (score > bestScore) {
            bestScore = score;
            bestIntent = intent;
          }
        }

        if (bestIntent && bestScore >= 1) return bestIntent;
      }
    } catch (e) {
      console.warn('NLP fallback to keyword match', e);
    }

    var lower = input.toLowerCase();
    for (var i = 0; i < INTENTS.length; i++) {
      var intent = INTENTS[i];
      for (var k = 0; k < intent.keywords.length; k++) {
        if (lower.indexOf(intent.keywords[k]) !== -1) return intent;
      }
    }
    return null;
  }

  function getBotResponse(userText) {
    var intent = detectIntent(userText);
    return intent ? intent.response : FALLBACK;
  }

  function openChat() {
    if (chatWindow) {
      chatWindow.classList.remove('hidden');
      if (chatMessages && chatMessages.children.length === 0) {
        addMessage(GREETING, false);
      }
      if (chatInput) chatInput.focus();
    }
  }

  function closeChat() {
    if (chatWindow) chatWindow.classList.add('hidden');
  }

  function sendMessage(text) {
    if (isSending) return;
    
    var messageText = text || (chatInput ? chatInput.value.trim() : '');
    if (!messageText) return;
    
    isSending = true;
    addMessage(messageText, true);
    if (chatInput) chatInput.value = '';
    
    setTimeout(function () {
      addMessage(getBotResponse(messageText), false);
      isSending = false;
    }, 400);
  }

  if (chatToggle) chatToggle.addEventListener('click', openChat);
  if (chatClose) chatClose.addEventListener('click', closeChat);
  if (chatMinimize) chatMinimize.addEventListener('click', closeChat);

  if (chatSend && chatInput) {
    chatSend.addEventListener('click', function() { sendMessage(); });
    chatInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Quick reply buttons
  if (quickReplyBtns.length) {
    quickReplyBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var message = btn.getAttribute('data-message');
        if (message) {
          sendMessage(message);
        }
      }, { once: false });
    });
  }
})();
