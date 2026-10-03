const chatBody = document.getElementById('chatBody');
const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');
const suggestions = document.getElementById('suggestions');

const knowledge = [
  { keys:['course','courses','program','department','degree'], answer:'For the current list of programmes, please check your college prospectus or department office. You can customise this answer in <b>script.js</b> with your college’s approved course list.' },
  { keys:['admission','apply','application','join','eligibility'], answer:'For admission details, eligibility and application dates, contact the college admission office or visit the official college website. Add your current admission procedure to <b>script.js</b> before publishing.' },
  { keys:['fee','fees','payment','scholarship','scholarships'], answer:'Fee amounts and scholarship rules can change by programme and academic year. Please confirm the latest details with the accounts office or scholarship section.' },
  { keys:['exam','exam date','timetable','hall ticket','result','results'], answer:'For exam timetables, hall tickets and results, please refer to the official examination cell notice board or student portal.' },
  { keys:['facility','facilities','library','lab','laboratory','hostel','transport','canteen','wifi'], answer:'Campus facilities may include learning spaces, labs and student services. For availability and timings, contact the relevant campus office. Update this response with your verified facilities.' },
  { keys:['contact','phone','email','address','location','office'], answer:'Please use the contact details published on your college’s official website or notice board. Add the verified phone number, email and address to the Contact answer in <b>script.js</b>.' },
  { keys:['principal','principal office','management'], answer:'For messages to the principal or college management, please contact the college office and follow the official appointment procedure.' },
  { keys:['placement','career','internship','job'], answer:'For placement drives, internships and career guidance, please contact your college placement and training cell.' },
  { keys:['attendance','leave','onduty','od'], answer:'For attendance, leave or on-duty requests, please follow your department’s current procedure and speak with your class advisor.' },
  { keys:['hello','hi','hey','good morning','good afternoon'], answer:'Hello! 👋 Welcome to MZ CHATBOX. What would you like to know about your college?' },
  { keys:['thank','thanks'], answer:'You’re welcome! ✨ Ask me anything else about campus life.' }
];

function addMessage(text, who='bot', html=false) {
  const row = document.createElement('div');
  row.className = `message-row ${who === 'user' ? 'user-row' : 'bot-row'}`;
  if (who !== 'user') {
    const avatar = document.createElement('div');
    avatar.className = 'mini-avatar';
    avatar.textContent = '✦';
    row.appendChild(avatar);
  }
  const wrap = document.createElement('div');
  wrap.className = 'bubble-wrap';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  if (html) bubble.innerHTML = text;
  else bubble.textContent = text;
  const time = document.createElement('time');
  time.textContent = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}).toUpperCase();
  wrap.append(bubble, time);
  row.appendChild(wrap);
  chatBody.appendChild(row);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getReply(message) {
  const q = message.toLowerCase().replace(/[^\w\s]/g, ' ');
  const match = knowledge.find(item => item.keys.some(key => q.includes(key)));
  return match ? match.answer : 'I’m still learning about your campus. Try asking about <b>courses, admissions, fees, exams, facilities, placements</b> or <b>contact details</b>. For an accurate answer, the college team can add verified information in <b>script.js</b>.';
}
function sendMessage(message) {
  const clean = message.trim();
  if (!clean) return;
  addMessage(clean, 'user');
  input.value = '';
  const typingRow = document.createElement('div');
  typingRow.className = 'message-row bot-row';
  typingRow.id = 'typingIndicator';
  typingRow.innerHTML = '<div class="mini-avatar">✦</div><div class="bubble-wrap"><div class="bubble typing"><span></span><span></span><span></span></div></div>';
  chatBody.appendChild(typingRow);
  chatBody.scrollTop = chatBody.scrollHeight;
  window.setTimeout(() => {
    typingRow.remove();
    addMessage(getReply(clean), 'bot', true);
  }, 550);
}
form.addEventListener('submit', e => { e.preventDefault(); sendMessage(input.value); });
suggestions.addEventListener('click', e => {
  const button = e.target.closest('button[data-question]');
  if (button) sendMessage(button.dataset.question);
});
document.getElementById('clearChat').addEventListener('click', () => {
  chatBody.innerHTML = '';
  addMessage('Chat cleared. Welcome back to MZ CHATBOX! How can I help you?', 'bot');
});
