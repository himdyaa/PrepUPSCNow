/* PrepUPSCNow — App Logic */
(function(){
  const tabsNav = document.getElementById('tabsNav');
  const postListView = document.getElementById('postListView');
  const postView = document.getElementById('postView');
  const accountView = document.getElementById('accountView');
  const postGrid = document.getElementById('postGrid');
  const categoryTitle = document.getElementById('categoryTitle');
  const backBtn = document.getElementById('backBtn');

  let activeCategory = CATEGORIES[0].key;
  let activeDate = ''; // '' = सभी दिन

  // Today's date in Hindi
  const days = ['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'];
  const months = ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'];
  const now = new Date();
  document.getElementById('todayDate').textContent =
    days[now.getDay()] + ', ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

  // Build tabs
  CATEGORIES.forEach(function(cat, idx){
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (idx === 0 ? ' active' : '');
    btn.textContent = cat.name;
    btn.dataset.key = cat.key;
    btn.addEventListener('click', function(){
      if(cat.key === 'account'){ openAccountModal(); return; }
      switchCategory(cat.key);
    });
    tabsNav.appendChild(btn);
  });

  // ---- PDF Download ----
  const pdfModal = document.getElementById('pdfModal');
  const pdfDateSelect = document.getElementById('pdfDateSelect');
  const pdfMsg = document.getElementById('pdfMsg');
  let pdfIndex = [];

  function openPdfModal(){
    pdfModal.classList.remove('hidden');
    pdfMsg.textContent = '';
    if(pdfIndex.length === 0){
      pdfMsg.textContent = 'PDF list load ho rahi hai...';
      fetch('pdfs/index.json').then(function(r){ return r.json(); }).then(function(idx){
        pdfIndex = idx;
        fillPdfDates();
      }).catch(function(){ pdfMsg.textContent = 'PDF list nahi mili — baad me try karo'; });
    } else {
      fillPdfDates();
    }
  }
  function fillPdfDates(){
    pdfDateSelect.innerHTML = '';
    pdfIndex.forEach(function(e){
      const o = document.createElement('option');
      o.value = e.date;
      o.textContent = e.label + ' (' + e.posts + ' posts)';
      pdfDateSelect.appendChild(o);
    });
    pdfMsg.textContent = pdfIndex.length ? '' : 'Abhi koi PDF available nahi';
  }
  function closePdfModal(){ pdfModal.classList.add('hidden'); }
  document.getElementById('headerDlBtn').addEventListener('click', openPdfModal);
  document.getElementById('pdfModalClose').addEventListener('click', closePdfModal);
  pdfModal.addEventListener('click', function(e){ if(e.target === pdfModal) closePdfModal(); });
  function downloadPdf(kind){
    const d = pdfDateSelect.value;
    if(!d){ pdfMsg.textContent = 'Pehle taarikh chuno'; return; }
    const entry = pdfIndex.find(function(e){ return e.date === d; });
    if(!entry){ pdfMsg.textContent = 'PDF nahi mila'; return; }
    const file = kind === 'full' ? entry.full : entry.ca;
    const a = document.createElement('a');
    a.href = 'pdfs/' + file;
    a.download = file;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  document.getElementById('dlFullPdf').addEventListener('click', function(){ downloadPdf('full'); });
  document.getElementById('dlCaPdf').addEventListener('click', function(){ downloadPdf('ca'); });
  const accountModal = document.getElementById('accountModal');
  function openAccountModal(){
    accountModal.classList.remove('hidden');
    if(window.PUN_renderAccount) window.PUN_renderAccount();
  }
  function closeAccountModal(){ accountModal.classList.add('hidden'); }
  window.PUN_openAccountModal = openAccountModal;
  window.PUN_closeAccountModal = closeAccountModal;
  document.getElementById('accountModalClose').addEventListener('click', closeAccountModal);
  accountModal.addEventListener('click', function(e){ if(e.target === accountModal) closeAccountModal(); });

  // Site khulne par hi login popup (agar logged in nahi)
  setTimeout(function(){
    try{
      if(!localStorage.getItem('prepupscnow_session')) openAccountModal();
    }catch(e){}
  }, 1000);

  function switchCategory(key){
    activeCategory = key;
    activeDate = ''; // nayi category par filter reset
    document.querySelectorAll('.tab-btn').forEach(function(b){
      b.classList.toggle('active', b.dataset.key === key);
    });
    accountView.classList.add('hidden');
    showPostList();
  }

  function showPostList(){
    postView.classList.add('hidden');
    postListView.classList.remove('hidden');
    const cat = CATEGORIES.find(function(c){ return c.key === activeCategory; });
    categoryTitle.textContent = cat.name;
    const posts = POSTS[activeCategory] || [];
    const dateFilter = document.getElementById('dateFilter');

    // Date-wise filter: unique taarikhein + "सभी दिन"
    const dates = [];
    posts.forEach(function(p){ if(dates.indexOf(p.date) === -1) dates.push(p.date); });
    if(dates.length > 1){
      let fh = '<button class="date-pill' + (activeDate === '' ? ' active' : '') + '" data-date="">📅 सभी दिन</button>';
      dates.forEach(function(d){
        fh += '<button class="date-pill' + (activeDate === d ? ' active' : '') + '" data-date="' + escapeHtml(d) + '">🗓️ ' + escapeHtml(d) + '</button>';
      });
      // Current Affairs me "Download Today's CA" button
      if(activeCategory === 'current-affairs'){
        fh += '<button class="date-pill dl-pill" id="dlTodayCa">📥 Download Today\'s Current Affairs</button>';
      }
      dateFilter.innerHTML = fh;
      dateFilter.style.display = 'flex';
      const pills = dateFilter.querySelectorAll('.date-pill');
      pills.forEach(function(pill){
        if(pill.id === 'dlTodayCa'){
          pill.addEventListener('click', function(){
            fetch('pdfs/index.json').then(function(r){ return r.json(); }).then(function(idx){
              if(!idx.length){ alert('PDF abhi taiyaar ho raha hai — thodi der me try karo'); return; }
              const latest = idx[0];
              const a = document.createElement('a');
              a.href = 'pdfs/' + latest.ca;
              a.download = latest.ca;
              a.target = '_blank';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }).catch(function(){ alert('PDF abhi taiyaar ho raha hai — thodi der me try karo'); });
          });
          return;
        }
        pill.addEventListener('click', function(){
          activeDate = pill.getAttribute('data-date');
          showPostList();
        });
      });
    } else {
      dateFilter.innerHTML = '';
      dateFilter.style.display = 'none';
    }

    const filtered = activeDate ? posts.filter(function(p){ return p.date === activeDate; }) : posts;
    postGrid.innerHTML = '';
    if(filtered.length === 0){
      postGrid.innerHTML = '<p style="color:#888">इस तारीख में कोई पोस्ट नहीं है।</p>';
      return;
    }
    filtered.forEach(function(p){
      const card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML =
        '<div class="post-card-body">' +
          '<h3>' + escapeHtml(p.title) + '</h3>' +
          '<p class="excerpt">' + escapeHtml(p.excerpt) + '</p>' +
          '<div class="meta"><span>' + escapeHtml(p.date) + '</span><span class="read-more">पढ़ें →</span></div>' +
        '</div>';
      card.addEventListener('click', function(){ openPost(p.id); });
      postGrid.appendChild(card);
    });
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function openPost(id){
    const posts = POSTS[activeCategory] || [];
    const p = posts.find(function(x){ return x.id === id; });
    if(!p) return;
    const cat = CATEGORIES.find(function(c){ return c.key === activeCategory; });
    document.getElementById('postTitle').textContent = p.title;
    document.getElementById('postCategory').textContent = cat.name;
    document.getElementById('postDate').textContent = p.date;
    document.getElementById('postBody').innerHTML = p.body; // trusted local content
    postListView.classList.add('hidden');
    postView.classList.remove('hidden');
    window.scrollTo({top:0, behavior:'smooth'});
    // post padha — read count me jodo (target progress ke liye)
    if(window.PUN_markPostRead) window.PUN_markPostRead(p.id);
  }

  backBtn.addEventListener('click', showPostList);

  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Breaking marquee: latest post titles
  const latest = [];
  CATEGORIES.forEach(function(c){
    (POSTS[c.key]||[]).slice(0,1).forEach(function(p){ latest.push(p.title); });
  });
  if(latest.length){
    document.getElementById('breakingMarquee').textContent = latest.join('  •  ');
  }

  // ---- UPSC Countdown (CSE Prelims 2027 — 23 May 2027) ----
  const UPSC_DATE = new Date('2027-05-23T09:30:00+05:30').getTime();
  const cdEl = document.getElementById('upscCountdown');
  function updateCountdown(){
    if(!cdEl) return;
    const now = Date.now();
    let diff = UPSC_DATE - now;
    if(diff <= 0){ cdEl.textContent = '🎉 All the best!'; return; }
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor(diff % 86400000 / 3600000);
    const mins = Math.floor(diff % 3600000 / 60000);
    const secs = Math.floor(diff % 60000 / 1000);
    const pad = function(n){ return String(n).padStart(2, '0'); };
    cdEl.textContent = days + ' din ' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Init
  showPostList();
})();
