/* PrepUPSCNow — Sign-in & Streak System
   Data browser ke localStorage me save hota hai (har device par alag).
   Register: naam, umar, gaon, 4-digit password
   Roz "Sign In" dabao → streak badhta hai
*/
(function(){
  const LS_USERS = 'prepupscnow_users';
  const LS_SESSION = 'prepupscnow_session';
  const LS_ACTIVITY = 'prepupscnow_activity';   // {"2026-10-03": minutes}
  const LS_TARGETS = 'prepupscnow_targets';     // {"2026-10-03": {posts, minutes}}
  const LS_NOTES = 'prepupscnow_notes';         // {"2026-10-03": [{text, done}]}
  const LS_READ = 'prepupscnow_read';           // {"2026-10-03": [postId, ...]}

  function getUsers(){ try{ return JSON.parse(localStorage.getItem(LS_USERS)) || {}; }catch(e){ return {}; } }
  function saveUsers(u){ localStorage.setItem(LS_USERS, JSON.stringify(u)); }
  function getSession(){ return localStorage.getItem(LS_SESSION); }
  function setSession(k){ if(k) localStorage.setItem(LS_SESSION, k); else localStorage.removeItem(LS_SESSION); }
  function getJ(key){ try{ return JSON.parse(localStorage.getItem(key)) || {}; }catch(e){ return {}; } }
  function saveJ(key, v){ localStorage.setItem(key, JSON.stringify(v)); }

  // ---- Activity time tracking (har 30 sec heartbeat, sirf page visible ho to) ----
  let activeSecs = 0;
  function startActivityTracker(){
    setInterval(function(){
      if(document.hidden) return;
      activeSecs += 30;
      if(activeSecs >= 60){
        const mins = Math.floor(activeSecs / 60);
        activeSecs = activeSecs % 60;
        const a = getJ(LS_ACTIVITY);
        const t = todayStr();
        a[t] = (a[t] || 0) + mins;
        saveJ(LS_ACTIVITY, a);
        // dashboard khula ho to time update karo
        const el = document.getElementById('todayActive');
        if(el) el.textContent = fmtMins(a[t]);
      }
    }, 30000);
  }
  function fmtMins(m){
    m = m || 0;
    if(m < 60) return m + ' min';
    const h = Math.floor(m/60), mm = m % 60;
    return h + 'h' + (mm ? ' ' + mm + 'm' : '');
  }
  function totalActiveMins(){
    const a = getJ(LS_ACTIVITY);
    return Object.values(a).reduce(function(s,v){ return s + (v||0); }, 0);
  }
  // ---- Post read tracking ----
  function markPostRead(postId){
    const r = getJ(LS_READ);
    const t = todayStr();
    if(!r[t]) r[t] = [];
    if(r[t].indexOf(postId) === -1){ r[t].push(postId); saveJ(LS_READ, r); }
  }
  function todayReadCount(){
    const r = getJ(LS_READ);
    return (r[todayStr()] || []).length;
  }
  window.PUN_markPostRead = markPostRead;

  function todayStr(){
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function fmtDate(ds){
    const months = ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'];
    const p = ds.split('-');
    return parseInt(p[2]) + ' ' + months[parseInt(p[1])-1] + ' ' + p[0];
  }
  // consecutive-day streak ending today (or yesterday if today not signed yet)
  function calcStreak(signins){
    const set = new Set(signins);
    let streak = 0;
    let d = new Date();
    if(!set.has(todayStr())) d.setDate(d.getDate() - 1); // aaj sign nahi to kal se gino
    while(true){
      const ds = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
      if(set.has(ds)){ streak++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return streak;
  }

  function renderAccount(){
    const box = document.getElementById('accountBox');
    const users = getUsers();
    const sessKey = getSession();
    const me = sessKey && users[sessKey];

    if(!me){
      // ---- LOGIN / REGISTER ----
      box.innerHTML =
        '<div class="acc-card"><h3>👤 Mera Account</h3>' +
        '<p class="acc-note">Roz sign-in karo, apni taiyaari ka streak banao! 🔥</p>' +
        '<div class="acc-tabs">' +
          '<button class="acc-tab active" id="tabLogin">Sign In</button>' +
          '<button class="acc-tab" id="tabReg">Naya Account</button>' +
        '</div>' +
        '<div id="loginForm">' +
          '<input id="liName" placeholder="Username (पूरा नाम) *" class="acc-input">' +
          '<input id="liPass" type="password" inputmode="numeric" maxlength="4" placeholder="4 अंकों का पासवर्ड *" class="acc-input">' +
          '<button class="acc-btn" id="doLogin">Submit →</button>' +
          '<button class="acc-link" id="forgotLink" style="margin-top:10px">पासवर्ड भूल गए? (Forgot Password)</button>' +
        '</div>' +
        '<div id="regForm" style="display:none">' +
          '<input id="rgName" placeholder="Username (पूरा नाम) *" class="acc-input">' +
          '<input id="rgAge" type="number" min="10" max="99" placeholder="उम्र *" class="acc-input">' +
          '<input id="rgVillage" placeholder="गांव / शहर *" class="acc-input">' +
          '<input id="rgPass" type="password" inputmode="numeric" maxlength="4" placeholder="4 अंकों का पासवर्ड बनाओ *" class="acc-input">' +
          '<p class="acc-note" style="margin:4px 0 8px">🔒 सुरक्षा प्रश्न: <b>आपके पसंदीदा व्यक्ति का नाम क्या है?</b></p>' +
          '<input id="rgFav" placeholder="पसंदीदा व्यक्ति का नाम *" class="acc-input">' +
          '<button class="acc-btn" id="doReg">Account बनाओ →</button>' +
        '</div>' +
        '<p class="acc-msg" id="accMsg"></p></div>';

      document.getElementById('tabLogin').onclick = function(){
        this.classList.add('active'); document.getElementById('tabReg').classList.remove('active');
        document.getElementById('loginForm').style.display='block';
        document.getElementById('regForm').style.display='none';
      };
      document.getElementById('tabReg').onclick = function(){
        this.classList.add('active'); document.getElementById('tabLogin').classList.remove('active');
        document.getElementById('regForm').style.display='block';
        document.getElementById('loginForm').style.display='none';
      };
      const msg = function(t, ok){ const m=document.getElementById('accMsg'); m.textContent=t; m.style.color = ok ? '#0a7d2c' : '#cc0000'; };

      document.getElementById('doReg').onclick = function(){
        const name = document.getElementById('rgName').value.trim();
        const age = document.getElementById('rgAge').value.trim();
        const village = document.getElementById('rgVillage').value.trim();
        const pass = document.getElementById('rgPass').value.trim();
        const fav = document.getElementById('rgFav').value.trim();
        if(!name || !age || !village || !fav){ msg('सभी * वाले field भरो'); return; }
        if(!/^\d{4}$/.test(pass)){ msg('पासवर्ड ठीक 4 अंक का होना चाहिए'); return; }
        const key = name.toLowerCase();
        const u = getUsers();
        if(u[key]){ msg('इस नाम से account पहले से है — Sign In करो'); return; }
        u[key] = { name:name, age:age, village:village, pass:pass, security:fav.toLowerCase(), signins:[] };
        saveUsers(u); setSession(key);
        msg('Account बन गया! 🎉', true);
        setTimeout(function(){ if(window.PUN_closeAccountModal) window.PUN_closeAccountModal(); }, 900);
      };
      document.getElementById('doLogin').onclick = function(){
        const name = document.getElementById('liName').value.trim().toLowerCase();
        const pass = document.getElementById('liPass').value.trim();
        const u = getUsers();
        if(!name || !pass){ msg('Username aur 4-digit password dono भरो'); return; }
        if(!u[name]){ msg('Account नहीं मिला — पहले Naya Account बनाओ'); return; }
        if(u[name].pass !== pass){ msg('गलत पासवर्ड'); return; }
        setSession(name);
        msg('वापस स्वागत है, ' + u[name].name + '! 🎉', true);
        setTimeout(function(){ if(window.PUN_closeAccountModal) window.PUN_closeAccountModal(); }, 900);
      };
      // ---- FORGOT PASSWORD (2-step: pehle pehchan verify, phir naya password) ----
      document.getElementById('forgotLink').onclick = function(){
        // STEP 1: pehchan verify
        box.innerHTML =
          '<div class="acc-card"><h3>🔑 पासवर्ड भूल गए?</h3>' +
          '<p class="acc-note">Koi baat nahi! Pehle apni pehchan verify karo</p>' +
          '<input id="fpName" placeholder="Username (पूरा नाम) *" class="acc-input">' +
          '<p class="acc-note" style="margin:4px 0 8px">🔒 <b>आपके पसंदीदा व्यक्ति का नाम क्या है?</b></p>' +
          '<input id="fpFav" placeholder="पसंदीदा व्यक्ति का नाम *" class="acc-input">' +
          '<button class="acc-btn" id="doVerify">Verify Karo →</button>' +
          '<button class="acc-link" id="fpBack" style="margin-top:10px">← वापस</button>' +
          '<p class="acc-msg" id="accMsg"></p></div>';
        const msg2 = function(t, ok){ const m=document.getElementById('accMsg'); m.textContent=t; m.style.color = ok ? '#0a7d2c' : '#cc0000'; };
        document.getElementById('fpBack').onclick = renderAccount;
        document.getElementById('doVerify').onclick = function(){
          const name = document.getElementById('fpName').value.trim().toLowerCase();
          const fav = document.getElementById('fpFav').value.trim().toLowerCase();
          const u = getUsers();
          if(!u[name]){ msg2('इस नाम से कोई account नहीं मिला'); return; }
          if(u[name].security){
            if(u[name].security !== fav){ msg2('सुरक्षा प्रश्न का उत्तर गलत है'); return; }
          } else {
            msg2('पुराना account है — नया account बनाओ'); return;
          }
          // STEP 2: pehchan OK — ab naya password banao
          box.innerHTML =
            '<div class="acc-card"><h3>✅ Pehchan Verify Ho Gayi!</h3>' +
            '<p class="acc-note">Ab apna <b>naya</b> 4-digit password banao</p>' +
            '<input id="fpNew" type="password" inputmode="numeric" maxlength="4" placeholder="Naya 4 अंकों का पासवर्ड *" class="acc-input">' +
            '<button class="acc-btn" id="doReset">Login Karo →</button>' +
            '<p class="acc-msg" id="accMsg"></p></div>';
          const msg3 = function(t, ok){ const m=document.getElementById('accMsg'); m.textContent=t; m.style.color = ok ? '#0a7d2c' : '#cc0000'; };
          document.getElementById('doReset').onclick = function(){
            const npass = document.getElementById('fpNew').value.trim();
            if(!/^\d{4}$/.test(npass)){ msg3('4 अंक का password डालो (sirf numbers)'); return; }
            const uu = getUsers();
            uu[name].pass = npass; saveUsers(uu); setSession(name);
            msg3('Ho gaya! 🎉', true);
            setTimeout(function(){ if(window.PUN_closeAccountModal) window.PUN_closeAccountModal(); }, 1000);
          };
        };
      };
      return;
    }

    // ---- DASHBOARD ----
    const signedToday = me.signins.includes(todayStr());
    const streak = calcStreak(me.signins);
    const total = me.signins.length;
    const last5 = me.signins.slice(-5).reverse().map(fmtDate).join(', ') || '—';
    const activity = getJ(LS_ACTIVITY);
    const todayActive = activity[todayStr()] || 0;
    const totalActive = totalActiveMins();
    const targets = getJ(LS_TARGETS);
    const myTarget = targets[todayStr()] || {posts: 0, minutes: 0};
    const readCount = todayReadCount();
    const notes = getJ(LS_NOTES);
    const myNotes = notes[todayStr()] || [];
    const notesDone = myNotes.filter(function(n){ return n.done; }).length;

    // mini calendar: last 30 days
    let calHtml = '<div class="cal-grid">';
    const d = new Date();
    for(let i=29; i>=0; i--){
      const dd = new Date(); dd.setDate(d.getDate()-i);
      const ds = dd.getFullYear() + '-' + String(dd.getMonth()+1).padStart(2,'0') + '-' + String(dd.getDate()).padStart(2,'0');
      const on = me.signins.includes(ds);
      calHtml += '<div class="cal-day' + (on?' on':'') + (ds===todayStr()?' today':'') + '" title="' + fmtDate(ds) + '">' + dd.getDate() + '</div>';
    }
    calHtml += '</div>';

    // target progress
    let targetHtml = '';
    if(myTarget.posts > 0 || myTarget.minutes > 0){
      const postPct = myTarget.posts > 0 ? Math.min(100, Math.round(readCount / myTarget.posts * 100)) : 100;
      const minPct = myTarget.minutes > 0 ? Math.min(100, Math.round(todayActive / myTarget.minutes * 100)) : 100;
      targetHtml = '<div class="target-box"><h4>🎯 Aaj ka Target</h4>';
      if(myTarget.posts > 0){
        targetHtml += '<div class="tprog"><span>📚 ' + readCount + ' / ' + myTarget.posts + ' posts</span><div class="tbar"><div class="tfill" style="width:' + postPct + '%"></div></div></div>';
      }
      if(myTarget.minutes > 0){
        targetHtml += '<div class="tprog"><span>⏱️ <span id="todayActive">' + fmtMins(todayActive) + '</span> / ' + fmtMins(myTarget.minutes) + '</span><div class="tbar"><div class="tfill" style="width:' + minPct + '%"></div></div></div>';
      }
      targetHtml += '<button class="acc-link" id="editTarget">✏️ Target badlo</button></div>';
    } else {
      targetHtml = '<div class="target-box"><h4>🎯 Aaj ka Target</h4><p class="acc-note">Abhi koi target set nahi hai</p><button class="acc-btn" id="editTarget">+ Target Set Karo</button></div>';
    }

    // daily notes checklist
    let notesHtml = '<div class="notes-box"><h4>📝 Mere Daily Notes <span class="notes-count">(' + notesDone + '/' + myNotes.length + ')</span></h4>';
    notesHtml += '<div id="notesList">';
    myNotes.forEach(function(n, i){
      notesHtml += '<div class="note-item' + (n.done ? ' done' : '') + '">' +
        '<button class="note-tick" data-i="' + i + '">' + (n.done ? '✅' : '☐') + '</button>' +
        '<span class="note-text">' + escapeHtml(n.text) + '</span>' +
        '<button class="note-del" data-i="' + i + '">🗑️</button></div>';
    });
    notesHtml += '</div>';
    notesHtml += '<div class="note-add"><input id="newNoteText" placeholder="Aaj kya karna/padhna hai? ✍️" class="acc-input"><button class="acc-btn" id="addNote">+ Add</button></div></div>';

    box.innerHTML =
      '<div class="acc-card"><h3 class="acc-greet">👤 नमस्ते, ' + escapeHtml(me.name) + '</h3>' +
      '<p class="acc-today">📅 आज: <b>' + fmtDate(todayStr()) + '</b></p>' +
      '<div class="streak-row">' +
        '<div class="streak-box"><div class="streak-num">🔥 ' + streak + '</div><div class="streak-label">दिन का स्ट्रीक</div></div>' +
        '<div class="streak-box"><div class="streak-num">📅 ' + total + '</div><div class="streak-label">कुल visit दिन</div></div>' +
      '</div>' +
      '<div class="streak-row">' +
        '<div class="streak-box"><div class="streak-num">⏱️ ' + fmtMins(todayActive) + '</div><div class="streak-label">आज active</div></div>' +
        '<div class="streak-box"><div class="streak-num">⌛ ' + fmtMins(totalActive) + '</div><div class="streak-label">कुल active time</div></div>' +
      '</div>' +
      (signedToday
        ? '<p class="acc-done">✅ आज का sign-in हो गया! कल फिर आना।</p>'
        : '<button class="acc-btn big" id="doSignin">📝 आज Sign In करो</button>') +
      targetHtml + notesHtml +
      '<p class="acc-meta">उम्र: ' + escapeHtml(me.age) + ' • ' + escapeHtml(me.village) + '</p>' +
      '<h4 class="cal-title">पिछले 30 दिन</h4>' + calHtml +
      '<p class="acc-meta">हाल के sign-in: ' + escapeHtml(last5) + '</p>' +
      '<button class="acc-link" id="doLogout">Logout</button></div>';

    const siBtn = document.getElementById('doSignin');
    if(siBtn) siBtn.onclick = function(){
      const u = getUsers(); const k = getSession();
      if(!u[k].signins.includes(todayStr())){ u[k].signins.push(todayStr()); saveUsers(u); }
      renderAccount();
    };
    document.getElementById('doLogout').onclick = function(){ setSession(null); renderAccount(); };

    // ---- Target set/edit ----
    const etBtn = document.getElementById('editTarget');
    if(etBtn) etBtn.onclick = function(){
      const t = getJ(LS_TARGETS)[todayStr()] || {posts: 0, minutes: 0};
      box.innerHTML =
        '<div class="acc-card"><h3>🎯 Aaj ka Target Set Karo</h3>' +
        '<p class="acc-note">📅 ' + fmtDate(todayStr()) + '</p>' +
        '<label class="acc-lbl">कितने posts padhne hain?</label>' +
        '<input id="tgPosts" type="number" min="0" max="200" value="' + (t.posts||'') + '" placeholder="e.g. 20" class="acc-input">' +
        '<label class="acc-lbl">कितने minute active rehna hai?</label>' +
        '<input id="tgMins" type="number" min="0" max="1440" value="' + (t.minutes||'') + '" placeholder="e.g. 120" class="acc-input">' +
        '<button class="acc-btn" id="saveTarget">Target Save Karo →</button>' +
        '<button class="acc-link" id="tgBack" style="margin-top:10px">← वापस</button></div>';
      document.getElementById('tgBack').onclick = renderAccount;
      document.getElementById('saveTarget').onclick = function(){
        const p = parseInt(document.getElementById('tgPosts').value) || 0;
        const m = parseInt(document.getElementById('tgMins').value) || 0;
        const tg = getJ(LS_TARGETS);
        tg[todayStr()] = {posts: p, minutes: m};
        saveJ(LS_TARGETS, tg);
        renderAccount();
      };
    };

    // ---- Daily notes ----
    function saveNotes(list){
      const n = getJ(LS_NOTES);
      n[todayStr()] = list;
      saveJ(LS_NOTES, n);
    }
    function getNotes(){ return getJ(LS_NOTES)[todayStr()] || []; }
    const addBtn = document.getElementById('addNote');
    if(addBtn) addBtn.onclick = function(){
      const inp = document.getElementById('newNoteText');
      const txt = inp.value.trim();
      if(!txt) return;
      const list = getNotes();
      list.push({text: txt, done: false});
      saveNotes(list);
      renderAccount();
    };
    const newNoteInp = document.getElementById('newNoteText');
    if(newNoteInp) newNoteInp.addEventListener('keypress', function(e){
      if(e.key === 'Enter'){ e.preventDefault(); addBtn.click(); }
    });
    document.querySelectorAll('.note-tick').forEach(function(b){
      b.onclick = function(){
        const list = getNotes();
        const i = parseInt(b.getAttribute('data-i'));
        list[i].done = !list[i].done;
        saveNotes(list);
        renderAccount();
      };
    });
    document.querySelectorAll('.note-del').forEach(function(b){
      b.onclick = function(){
        const list = getNotes();
        const i = parseInt(b.getAttribute('data-i'));
        list.splice(i, 1);
        saveNotes(list);
        renderAccount();
      };
    });
  }

  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // expose for app.js tab switching
  window.PUN_renderAccount = renderAccount;

  // page load par activity tracker shuru
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', startActivityTracker);
  } else {
    startActivityTracker();
  }
})();
