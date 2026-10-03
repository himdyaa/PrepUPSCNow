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
    btn.addEventListener('click', function(){ switchCategory(cat.key); });
    tabsNav.appendChild(btn);
  });

  function switchCategory(key){
    activeCategory = key;
    document.querySelectorAll('.tab-btn').forEach(function(b){
      b.classList.toggle('active', b.dataset.key === key);
    });
    if(key === 'account'){
      postListView.classList.add('hidden');
      postView.classList.add('hidden');
      accountView.classList.remove('hidden');
      categoryTitle.textContent = '';
      if(window.PUN_renderAccount) window.PUN_renderAccount();
      window.scrollTo({top:0, behavior:'smooth'});
      return;
    }
    accountView.classList.add('hidden');
    showPostList();
  }

  function showPostList(){
    postView.classList.add('hidden');
    postListView.classList.remove('hidden');
    const cat = CATEGORIES.find(function(c){ return c.key === activeCategory; });
    categoryTitle.textContent = cat.name;
    const posts = POSTS[activeCategory] || [];
    postGrid.innerHTML = '';
    if(posts.length === 0){
      postGrid.innerHTML = '<p style="color:#888">इस कैटेगरी में अभी कोई पोस्ट नहीं है। जल्द आ रही है!</p>';
      return;
    }
    posts.forEach(function(p){
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

  // Init
  showPostList();
})();
