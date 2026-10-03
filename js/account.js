/* PrepUPSCNow — Sign-in & Streak System
   Data browser ke localStorage me save hota hai (har device par alag).
   Register: naam, umar, gaon, 4-digit password
   Roz "Sign In" dabao → streak badhta hai
*/
(function(){
  const LS_USERS = 'prepupscnow_users';
  const LS_SESSION = 'prepupscnow_session';

  function getUsers(){ try{ return JSON.parse(localStorage.getItem(LS_USERS)) || {}; }catch(e){ return {}; } }
  function saveUsers(u){ localStorage.setItem(LS_USERS, JSON.stringify(u)); }
  function getSession(){ return localStorage.getItem(LS_SESSION); }
  function setSession(k){ if(k) localStorage.setItem(LS_SESSION, k); else localStorage.removeItem(LS_SESSION); }

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
      // ---- FORGOT PASSWORD (security question: favourite person) ----
      document.getElementById('forgotLink').onclick = function(){
        box.innerHTML =
          '<div class="acc-card"><h3>🔑 पासवर्ड रीसेट</h3>' +
          '<p class="acc-note">सुरक्षा प्रश्न का उत्तर दो</p>' +
          '<input id="fpName" placeholder="Username (पूरा नाम) *" class="acc-input">' +
          '<p class="acc-note" style="margin:4px 0 8px">🔒 <b>आपके पसंदीदा व्यक्ति का नाम क्या है?</b></p>' +
          '<input id="fpFav" placeholder="पसंदीदा व्यक्ति का नाम *" class="acc-input">' +
          '<input id="fpNew" type="password" inputmode="numeric" maxlength="4" placeholder="नया 4 अंकों का पासवर्ड *" class="acc-input">' +
          '<button class="acc-btn" id="doReset">पासवर्ड बदलो →</button>' +
          '<button class="acc-link" id="fpBack" style="margin-top:10px">← वापस</button>' +
          '<p class="acc-msg" id="accMsg"></p></div>';
        const msg2 = function(t, ok){ const m=document.getElementById('accMsg'); m.textContent=t; m.style.color = ok ? '#0a7d2c' : '#cc0000'; };
        document.getElementById('fpBack').onclick = renderAccount;
        document.getElementById('doReset').onclick = function(){
          const name = document.getElementById('fpName').value.trim().toLowerCase();
          const fav = document.getElementById('fpFav').value.trim().toLowerCase();
          const npass = document.getElementById('fpNew').value.trim();
          const u = getUsers();
          if(!u[name]){ msg2('इस नाम से कोई account नहीं मिला'); return; }
          if(u[name].security){
            if(u[name].security !== fav){ msg2('सुरक्षा प्रश्न का उत्तर गलत है'); return; }
          } else {
            // purane accounts (security question nahi tha) — age+village fallback
            msg2('पुराना account है — नया account बनाओ या age+village se verify karo'); return;
          }
          if(!/^\d{4}$/.test(npass)){ msg2('नया पासवर्ड ठीक 4 अंक का होना चाहिए'); return; }
          u[name].pass = npass; saveUsers(u); setSession(name);
          msg2('पासवर्ड बदल गया! ✅', true);
          setTimeout(function(){ if(window.PUN_closeAccountModal) window.PUN_closeAccountModal(); }, 1000);
        };
      };
      return;
    }

    // ---- DASHBOARD ----
    const signedToday = me.signins.includes(todayStr());
    const streak = calcStreak(me.signins);
    const total = me.signins.length;
    const last5 = me.signins.slice(-5).reverse().map(fmtDate).join(', ') || '—';

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

    box.innerHTML =
      '<div class="acc-card"><h3>👤 नमस्ते, ' + escapeHtml(me.name) + '</h3>' +
      '<p class="acc-today">📅 आज: <b>' + fmtDate(todayStr()) + '</b></p>' +
      '<div class="streak-row">' +
        '<div class="streak-box"><div class="streak-num">🔥 ' + streak + '</div><div class="streak-label">दिन का स्ट्रीक</div></div>' +
        '<div class="streak-box"><div class="streak-num">✅ ' + total + '</div><div class="streak-label">कुल sign-in</div></div>' +
      '</div>' +
      (signedToday
        ? '<p class="acc-done">✅ आज का sign-in हो गया! कल फिर आना।</p>'
        : '<button class="acc-btn big" id="doSignin">📝 आज Sign In करो</button>') +
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
  }

  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // expose for app.js tab switching
  window.PUN_renderAccount = renderAccount;
})();
