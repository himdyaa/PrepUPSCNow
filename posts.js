/* PrepUPSCNow — Content Database
   Nayi post add karne ke liye: CATEGORIES me category add karo,
   phir POSTS me us category key ke andar post object daalo.
   Post object: { id, title, date, excerpt, body (HTML string) }
*/
const CATEGORIES = [
  { key: "current-affairs", name: "📰 Daily Current Affairs", desc: "Roz ki taaza khabrein — UPSC ke liye" },
  { key: "reasoning",       name: "🧠 Reasoning",             desc: "Logical reasoning aur aptitude practice" },
  { key: "polity",          name: "🏛️ Polity",                desc: "Bharatiya samvidhan aur raajvyavastha" },
  { key: "history",         name: "📜 History",               desc: "Prachin, madhyakalin aur aadhunik itihas" },
  { key: "geography",       name: "🌍 Geography",             desc: "Bharat aur vishwa bhugol" },
  { key: "economy",         name: "💰 Economy",               desc: "Bharatiya arthavyavastha" },
  { key: "science",         name: "🔬 Science & Tech",        desc: "Vigyan aur praudyogiki" },
  { key: "environment",     name: "🌱 Environment",           desc: "Paryavaran aur paristhitiki" },
  { key: "account",           name: "👤 Mera Account",          desc: "Roz sign-in karo, streak banao" },
];

const POSTS = {

/* ============ DAILY CURRENT AFFAIRS ============ */
"current-affairs": [
{
id: "ca-2026-10-03",
title: "Daily Current Affairs Bulletin — 3 October 2026",
date: "3 October 2026",
excerpt: "Aaj ki mukhya khabrein: arthavyavastha, vigyan, paryavaran aur antarrashtriya sambandh — UPSC Prelims + Mains ke liye.",
body: `
<h2>🇮🇳 राष्ट्रीय</h2>
<h3>1. डिजिटल अर्थव्यवस्था</h3>
<p>भारत की डिजिटल अर्थव्यवस्था तेज़ी से बढ़ रही है। UPI लेनदेन ने नए रिकॉर्ड बनाए हैं। <b>Prelims point:</b> NPCI (National Payments Corporation of India) 2008 में स्थापित, मुख्यालय मुंबई।</p>
<h3>2. जलवायु कार्य योजना</h3>
<p>भारत ने COP सम्मेलन में अपने Net Zero 2070 लक्ष्य की पुष्टि की। <b>Mains point:</b> Panchamrit संकल्प — 2030 तक 500 GW गैर-जीवाश्म ऊर्जा क्षमता।</p>
<h2>🌍 अंतर्राष्ट्रीय</h2>
<h3>3. वैश्विक व्यापार</h3>
<p>WTO की नवीनतम रिपोर्ट में विकासशील देशों के व्यापार पर चर्चा। <b>Prelims point:</b> WTO मुख्यालय जिनेवा, स्थापित 1995।</p>
<h2>🔬 विज्ञान</h2>
<h3>4. अंतरिक्ष</h3>
<p>ISRO के आगामी मिशनों पर नज़र। <b>Prelims point:</b> ISRO स्थापित 1969, मुख्यालय बेंगलुरु, संस्थापक विक्रम साराभाई।</p>
<blockquote><b>💡 UPSC Tip:</b> Har khabar se ek Prelims fact aur ek Mains angle nikalo. Wahi asli taiyaari hai.</blockquote>
`
},
{
id: "ca-2026-10-02",
title: "Daily Current Affairs Bulletin — 2 October 2026",
date: "2 October 2026",
excerpt: "Gandhi Jayanti vishesh: Swachh Bharat, ahimsa aur aaj ki pramukh khabrein.",
body: `
<h2>🇮🇳 गांधी जयंती विशेष</h2>
<p>2 अक्टूबर — महात्मा गांधी की जयंती। इस अवसर पर स्वच्छता अभियान और अहिंसा के संदेश पर विशेष कार्यक्रम।</p>
<h3>प्रमुख तथ्य (Prelims)</h3>
<ul>
<li>गांधी जी का जन्म: 2 अक्टूबर 1869, पोरबंदर (गुजरात)</li>
<li>दक्षिण अफ्रीका से वापसी: 1915</li>
<li>चंपारण सत्याग्रह: 1917 — भारत में पहला सत्याग्रह</li>
<li>दांडी मार्च: 12 मार्च 1930</li>
<li>भारत छोड़ो आंदोलन: 1942</li>
</ul>
<h2>🌱 पर्यावरण</h2>
<h3>स्वच्छ भारत मिशन</h3>
<p>स्वच्छ भारत मिशन के तहत ग्रामीण स्वच्छता कवरेज में वृद्धि। <b>Mains angle:</b> व्यवहार परिवर्तन (behavioral change) विकास योजनाओं की सफलता की कुंजी है।</p>
`
},
{
id: "ca-quiz-oct",
title: "Current Affairs Quiz — October Week 1",
date: "3 October 2026",
excerpt: "Hafte bhar ki current affairs par aadharit 5 mahatvapurna MCQ — khud ko test karo.",
body: `
<div class="quiz-q"><p>Q1. NPCI का मुख्यालय कहाँ है?</p>
<ul class="quiz-opts"><li>A) नई दिल्ली</li><li>B) मुंबई</li><li>C) बेंगलुरु</li><li>D) हैदराबाद</li></ul>
<p class="quiz-ans">✅ उत्तर: B) मुंबई</p></div>
<div class="quiz-q"><p>Q2. भारत का Net Zero लक्ष्य किस वर्ष का है?</p>
<ul class="quiz-opts"><li>A) 2050</li><li>B) 2060</li><li>C) 2070</li><li>D) 2080</li></ul>
<p class="quiz-ans">✅ उत्तर: C) 2070</p></div>
<div class="quiz-q"><p>Q3. WTO की स्थापना किस वर्ष हुई?</p>
<ul class="quiz-opts"><li>A) 1990</li><li>B) 1995</li><li>C) 2000</li><li>D) 1985</li></ul>
<p class="quiz-ans">✅ उत्तर: B) 1995</p></div>
<div class="quiz-q"><p>Q4. ISRO की स्थापना किस वर्ष हुई?</p>
<ul class="quiz-opts"><li>A) 1962</li><li>B) 1969</li><li>C) 1975</li><li>D) 1980</li></ul>
<p class="quiz-ans">✅ उत्तर: B) 1969</p></div>
<div class="quiz-q"><p>Q5. चंपारण सत्याग्रह किस वर्ष हुआ?</p>
<ul class="quiz-opts"><li>A) 1915</li><li>B) 1917</li><li>C) 1919</li><li>D) 1920</li></ul>
<p class="quiz-ans">✅ उत्तर: B) 1917</p></div>
`
}
],

/* ============ REASONING ============ */
"reasoning": [
{
id: "rsn-number-series",
title: "Number Series — Tricks aur Practice Set",
date: "1 October 2026",
excerpt: "Number series ke sabhi patterns: difference, multiplication, squares, cubes — tricks ke saath.",
body: `
<h2>Pattern 1: सामान्य अंतर (Common Difference)</h2>
<p>उदाहरण: 5, 10, 15, 20, ? → उत्तर: 25 (प्रत्येक पद में 5 जुड़ रहा है)</p>
<h2>Pattern 2: गुणा श्रेणी</h2>
<p>उदाहरण: 2, 6, 18, 54, ? → उत्तर: 162 (प्रत्येक पद ×3)</p>
<h2>Pattern 3: वर्ग/घन</h2>
<p>उदाहरण: 1, 4, 9, 16, 25, ? → उत्तर: 36 (n² श्रेणी)</p>
<p>उदाहरण: 1, 8, 27, 64, ? → उत्तर: 125 (n³ श्रेणी)</p>
<h2>Pattern 4: मिश्रित</h2>
<p>उदाहरण: 3, 5, 9, 17, 33, ? → अंतर: 2, 4, 8, 16 → अगला अंतर 32 → उत्तर: 65</p>
<blockquote><b>💡 Trick:</b> Pehle antar (difference) dekho. Antar me pattern na mile to anupaat (ratio) check karo. Phir squares/cubes socho.</blockquote>
<h2>Practice Questions</h2>
<div class="quiz-q"><p>Q1. 7, 14, 28, 56, ?</p><p class="quiz-ans">✅ उत्तर: 112 (×2)</p></div>
<div class="quiz-q"><p>Q2. 2, 5, 10, 17, 26, ?</p><p class="quiz-ans">✅ उत्तर: 37 (n²+1: 1²+1, 2²+1, 3²+1...)</p></div>
<div class="quiz-q"><p>Q3. 1, 2, 6, 24, 120, ?</p><p class="quiz-ans">✅ उत्तर: 720 (factorial: 1!, 2!, 3!, 4!, 5!, 6!)</p></div>
`
},
{
id: "rsn-coding-decoding",
title: "Coding-Decoding — Complete Guide",
date: "28 September 2026",
excerpt: "Letter coding, number coding, substitution — sabhi types ek jagah.",
body: `
<h2>Type 1: Letter Shifting</h2>
<p>यदि CAT = DBU, तो DOG = ?</p>
<p>हल: प्रत्येक अक्षर +1 → D→E, O→P, G→H → <b>EPH</b></p>
<h2>Type 2: Reverse Order</h2>
<p>यदि RAM = MAR, तो SIT = ?</p>
<p>हल: अक्षर उल्टे → <b>TIS</b></p>
<h2>Type 3: Number Coding (A=1, B=2...)</h2>
<p>यदि BAD = 2+1+4 = 7, तो GOOD = ?</p>
<p>हल: 7+15+15+4 = <b>41</b></p>
<h2>Type 4: Opposite Letters (A↔Z, B↔Y...)</h2>
<p>यदि A = Z, B = Y, तो C = ?</p>
<p>हल: <b>X</b> (A=1, Z=26; योग हमेशा 27)</p>
<blockquote><b>💡 Trick:</b> Opposite pairs yaad rakho: A-Z, B-Y, C-X, D-W, E-V... (sum = 27)</blockquote>
<div class="quiz-q"><p>Q1. यदि MANGO = NBOHP, तो APPLE = ?</p><p class="quiz-ans">✅ उत्तर: BQQMF (हर अक्षर +1)</p></div>
<div class="quiz-q"><p>Q2. यदि WATER = 67, तो FIRE = ? (A=1...Z=26)</p><p class="quiz-ans">✅ उत्तर: 23+1+20+5+18 = 67... wait: F=6,I=9,R=18,E=5 → 6+9+18+5 = 38</p></div>
`
},
{
id: "rsn-blood-relation",
title: "Blood Relations — Family Tree Shortcuts",
date: "25 September 2026",
excerpt: "Rishton wale sawal chutkiyon me — family tree banane ki shortcut technique.",
body: `
<h2>Basic Relations</h2>
<table>
<tr><th>कथन</th><th>अर्थ</th></tr>
<tr><td>A, B का भाई है</td><td>A (पुरुष), B का sibling</td></tr>
<tr><td>A, B की माँ है</td><td>A (महिला), B से एक पीढ़ी ऊपर</td></tr>
<tr><td>A, B का ससुर है</td><td>A, B के जीवनसाथी का पिता</td></tr>
</table>
<h2>Shortcut Technique</h2>
<ul>
<li><b>पुरुष</b> के लिए + चिह्न, <b>महिला</b> के लिए − चिह्न</li>
<li>एक ही horizontal line = एक ही पीढ़ी</li>
<li>ऊपर से नीचे = पीढ़ी नीचे जाती है</li>
</ul>
<h2>उदाहरण</h2>
<p>"राम की माँ श्याम की पत्नी की सास है। श्याम से राम का क्या संबंध है?"</p>
<p>हल: श्याम की पत्नी की सास = श्याम की माँ = राम की माँ → राम और श्याम <b>भाई</b> हैं।</p>
<div class="quiz-q"><p>Q1. "वह लड़की मेरे पिता की इकलौती बेटी की बेटी है।" वह लड़की कौन है?</p><p class="quiz-ans">✅ उत्तर: मेरी बेटी (पिता की इकलौती बेटी = मैं/मेरी बहन; उसकी बेटी = मेरी भांजी या बेटी — इकलौती होने से = मेरी बेटी)</p></div>
`
}
],

/* ============ POLITY ============ */
"polity": [
{
id: "pol-fundamental-rights",
title: "मौलिक अधिकार (Fundamental Rights) — Articles 12-35",
date: "30 September 2026",
excerpt: "6 मौलिक अधिकार, अनुच्छेद 12-35 — table aur tricks ke saath yaad karo.",
body: `
<h2>6 मौलिक अधिकार</h2>
<table>
<tr><th>अधिकार</th><th>अनुच्छेद</th></tr>
<tr><td>समानता का अधिकार</td><td>14–18</td></tr>
<tr><td>स्वतंत्रता का अधिकार</td><td>19–22</td></tr>
<tr><td>शोषण के विरुद्ध अधिकार</td><td>23–24</td></tr>
<tr><td>धार्मिक स्वतंत्रता</td><td>25–28</td></tr>
<tr><td>सांस्कृतिक व शैक्षिक अधिकार</td><td>29–30</td></tr>
<tr><td>संवैधानिक उपचारों का अधिकार</td><td>32</td></tr>
</table>
<h2>मुख्य अनुच्छेद</h2>
<ul>
<li><b>अनु. 14:</b> विधि के समक्ष समानता</li>
<li><b>अनु. 15:</b> धर्म, जाति, लिंग आदि के आधार पर भेदभाव निषेध</li>
<li><b>अनु. 16:</b> लोक नियोजन में अवसर की समानता</li>
<li><b>अनु. 19(1):</b> 6 स्वतंत्रताएँ (वाक्, सभा, संघ, विचरण, निवास, व्यवसाय)</li>
<li><b>अनु. 21:</b> प्राण और दैहिक स्वतंत्रता</li>
<li><b>अनु. 32:</b> संवैधानिक उपचार — "संविधान की आत्मा" (अंबेडकर)</li>
</ul>
<h2>Writs (अनु. 32 / 226)</h2>
<ul>
<li><b>Habeas Corpus:</b> अवैध हिरासत से मुक्ति</li>
<li><b>Mandamus:</b> कर्तव्य पालन का आदेश</li>
<li><b>Prohibition:</b> निचली अदालत को रोकना</li>
<li><b>Certiorari:</b> मामला ऊपर मंगवाना</li>
<li><b>Quo Warranto:</b> पद के अधिकार पर प्रश्न</li>
</ul>
<div class="quiz-q"><p>Q1. "संविधान की आत्मा" किस अनुच्छेद को कहा गया?</p><p class="quiz-ans">✅ उत्तर: अनुच्छेद 32 (डॉ. अंबेडकर द्वारा)</p></div>
<div class="quiz-q"><p>Q2. शिक्षा का अधिकार किस अनुच्छेद में है?</p><p class="quiz-ans">✅ उत्तर: अनुच्छेद 21A (86वां संशोधन, 2002)</p></div>
`
},
{
id: "pol-preamble",
title: "उद्देशिका (Preamble) — Complete Notes",
date: "27 September 2026",
excerpt: "Preamble ka har shabd, 42nd amendment, Berubari aur Kesavananda case.",
body: `
<h2>उद्देशिका का पाठ</h2>
<blockquote>"हम भारत के लोग... संपूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य..."</blockquote>
<h2>मुख्य शब्द</h2>
<ul>
<li><b>संप्रभु (Sovereign):</b> बाहरी नियंत्रण से मुक्त</li>
<li><b>समाजवादी (Socialist):</b> 42वें संशोधन (1976) द्वारा जोड़ा गया</li>
<li><b>पंथनिरपेक्ष (Secular):</b> 42वें संशोधन द्वारा जोड़ा गया</li>
<li><b>लोकतंत्रात्मक:</b> जनता का शासन</li>
<li><b>गणराज्य:</b> प्रमुख निर्वाचित (वंशानुगत नहीं)</li>
</ul>
<h2>महत्वपूर्ण वाद</h2>
<ul>
<li><b>बेरुबारी वाद (1960):</b> उद्देशिका संविधान का भाग नहीं</li>
<li><b>केशवानंद भारती (1973):</b> उद्देशिका संविधान का भाग है; मूल ढांचा सिद्धांत</li>
<li><b>LIC बनाम कंज्यूमर (1995):</b> उद्देशिका संविधान का अभिन्न अंग</li>
</ul>
<div class="quiz-q"><p>Q1. 42वें संशोधन द्वारा कौन-से शब्द जोड़े गए?</p><p class="quiz-ans">✅ उत्तर: समाजवादी, पंथनिरपेक्ष, अखंडता</p></div>
`
}
],

/* ============ HISTORY ============ */
"history": [
{
id: "his-indus-valley",
title: "सिंधु घाटी सभ्यता — Complete Notes",
date: "29 September 2026",
excerpt: "Harappa, Mohenjodaro, Lothal — khoj, visheshtaen, patan ke siddhant.",
body: `
<h2>खोज</h2>
<ul>
<li><b>हड़प्पा:</b> 1921, दयाराम साहनी, रावी नदी (पंजाब, पाकिस्तान)</li>
<li><b>मोहनजोदड़ो:</b> 1922, आर.डी. बनर्जी, सिंधु नदी (सिंध, पाकिस्तान)</li>
<li>समय: लगभग 2600–1900 ई.पू. (परिपक्व अवस्था)</li>
</ul>
<h2>प्रमुख स्थल</h2>
<table>
<tr><th>स्थल</th><th>नदी</th><th>विशेषता</th></tr>
<tr><td>लोथल (गुजरात)</td><td>भोगवा</td><td>गोदीवाड़ा (dockyard)</td></tr>
<tr><td>धोलावीरा (गुजरात)</td><td>—</td><td>जल प्रबंधन, 3 भागों में विभाजित</td></tr>
<tr><td>कालीबंगन (राजस्थान)</td><td>घग्गर</td><td>जुते हुए खेत के साक्ष्य</td></tr>
<tr><td>चन्हूदड़ो</td><td>सिंधु</td><td>मनका बनाने का कारखाना</td></tr>
<tr><td>बनावली (हरियाणा)</td><td>रंगोई</td><td>मिट्टी का हल</td></tr>
</table>
<h2>विशेषताएँ</h2>
<ul>
<li>नगर नियोजन: ग्रिड पद्धति, ढकी नालियाँ</li>
<li>मोहनजोदड़ो का विशाल स्नानागार (Great Bath)</li>
<li>मानकीकृत बाट-माप (16 के गुणज)</li>
<li>लिपि: चित्रात्मक, अभी तक अपठित; दाईं से बाईं ओर</li>
</ul>
<div class="quiz-q"><p>Q1. लोथल किसलिए प्रसिद्ध है?</p><p class="quiz-ans">✅ उत्तर: गोदीवाड़ा (प्राचीन बंदरगाह)</p></div>
<div class="quiz-q"><p>Q2. हड़प्पा की खोज किसने की?</p><p class="quiz-ans">✅ उत्तर: दयाराम साहनी (1921)</p></div>
`
},
{
id: "his-maurya",
title: "मौर्य साम्राज्य — Chandragupta se Ashoka tak",
date: "26 September 2026",
excerpt: "Chandragupta Maurya, Chanakya, Ashoka ke shilalekh — sab kuch.",
body: `
<h2>चंद्रगुप्त मौर्य (321–297 ई.पू.)</h2>
<ul>
<li>चाणक्य (कौटिल्य) की सहायता से नंद वंश का अंत</li>
<li>अर्थशास्त्र — चाणक्य की रचना (राजनीति + अर्थशास्त्र)</li>
<li>सेल्यूकस से युद्ध; 500 हाथियों के बदले विशाल भूभाग</li>
<li>अंतिम समय में जैन धर्म अपनाकर श्रवणबेलगोला गए</li>
</ul>
<h2>अशोक (268–232 ई.पू.)</h2>
<ul>
<li><b>कलिंग युद्ध (261 ई.पू.):</b> हृदय परिवर्तन, धम्म की ओर</li>
<li>शिलालेख: ब्राह्मी लिपि, प्राकृत भाषा</li>
<li>13वां शिलालेख: कलिंग युद्ध का वर्णन</li>
<li>स्तंभ: सारनाथ (राष्ट्रीय प्रतीक — अशोक चक्र)</li>
<li>तीसरी बौद्ध संगीति: पाटलिपुत्र, मोग्गलिपुत्त तिस्स की अध्यक्षता</li>
</ul>
<div class="quiz-q"><p>Q1. अर्थशास्त्र के लेखक कौन हैं?</p><p class="quiz-ans">✅ उत्तर: चाणक्य (कौटिल्य/विष्णुगुप्त)</p></div>
<div class="quiz-q"><p>Q2. कलिंग युद्ध किस वर्ष हुआ?</p><p class="quiz-ans">✅ उत्तर: 261 ई.पू.</p></div>
`
}
],

/* ============ GEOGRAPHY ============ */
"geography": [
{
id: "geo-indian-rivers",
title: "भारत की नदियाँ — Himalayan vs Peninsular",
date: "28 September 2026",
excerpt: "Sindu, Ganga, Brahmaputra tantra aur prayadveepiya nadiyan — map tricks.",
body: `
<h2>हिमालयी नदी तंत्र</h2>
<h3>सिंधु तंत्र</h3>
<ul>
<li>उद्गम: मानसरोवर (तिब्बत)</li>
<li>सहायक: झेलम, चिनाब, रावी, ब्यास, सतलज (पंजाब की 5 नदियाँ)</li>
<li><b>Trick:</b> "झे चि रा ब्या स" — पश्चिम से पूर्व</li>
</ul>
<h3>गंगा तंत्र</h3>
<ul>
<li>उद्गम: गंगोत्री (उत्तराखंड)</li>
<li>सहायक (बाएँ): गोमती, घाघरा, गंडक, कोसी</li>
<li>सहायक (दाएँ): यमुना, सोन</li>
<li>सबसे लंबी सहायक: यमुना</li>
</ul>
<h3>ब्रह्मपुत्र</h3>
<ul>
<li>उद्गम: चेमायुंगडुंग (तिब्बत) — तिब्बत में "सांगपो"</li>
<li>अरुणाचल में "दिहांग", असम में "ब्रह्मपुत्र"</li>
<li>माजुली — विश्व का सबसे बड़ा नदी द्वीप (असम)</li>
</ul>
<h2>प्रायद्वीपीय नदियाँ</h2>
<ul>
<li><b>पूर्व की ओर:</b> महानदी, गोदावरी, कृष्णा, कावेरी (डेल्टा बनाती हैं)</li>
<li><b>पश्चिम की ओर:</b> नर्मदा, ताप्ती (एस्चुअरी बनाती हैं, डेल्टा नहीं)</li>
<li>गोदावरी: "दक्षिण की गंगा", सबसे लंबी प्रायद्वीपीय नदी</li>
</ul>
<div class="quiz-q"><p>Q1. माजुली द्वीप किस नदी में है?</p><p class="quiz-ans">✅ उत्तर: ब्रह्मपुत्र (असम)</p></div>
<div class="quiz-q"><p>Q2. "दक्षिण की गंगा" किसे कहते हैं?</p><p class="quiz-ans">✅ उत्तर: गोदावरी</p></div>
`
}
],

/* ============ ECONOMY ============ */
"economy": [
{
id: "eco-budget",
title: "केंद्रीय बजट — Concepts for UPSC",
date: "27 September 2026",
excerpt: "Revenue vs capital, fiscal deficit, FRBM — budget ke sabhi concepts.",
body: `
<h2>बजट के प्रकार</h2>
<ul>
<li><b>राजस्व प्राप्तियाँ:</b> कर + गैर-कर (वापस नहीं करना पड़ता)</li>
<li><b>पूंजीगत प्राप्तियाँ:</b> ऋण, विनिवेश (देयता बढ़ती है)</li>
<li><b>राजस्व व्यय:</b> वेतन, सब्सिडी, ब्याज (संपत्ति नहीं बनती)</li>
<li><b>पूंजीगत व्यय:</b> सड़क, पुल, मशीनरी (संपत्ति बनती है)</li>
</ul>
<h2>घाटे के प्रकार</h2>
<table>
<tr><th>घाटा</th><th>सूत्र</th></tr>
<tr><td>राजस्व घाटा</td><td>राजस्व व्यय − राजस्व प्राप्तियाँ</td></tr>
<tr><td>राजकोषीय घाटा</td><td>कुल व्यय − (राजस्व प्राप्ति + गैर-ऋण पूंजी प्राप्ति)</td></tr>
<tr><td>प्राथमिक घाटा</td><td>राजकोषीय घाटा − ब्याज भुगतान</td></tr>
</table>
<h2>FRBM Act, 2003</h2>
<p>राजकोषीय उत्तरदायित्व और बजट प्रबंधन अधिनियम — घाटा सीमित करने का कानून। लक्ष्य: राजकोषीय घाटा GDP का 3%।</p>
<div class="quiz-q"><p>Q1. प्राथमिक घाटा = ?</p><p class="quiz-ans">✅ उत्तर: राजकोषीय घाटा − ब्याज भुगतान</p></div>
`
}
],

/* ============ SCIENCE & TECH ============ */
"science": [
{
id: "sci-space",
title: "ISRO Missions — Prelims Ready Notes",
date: "26 September 2026",
excerpt: "Chandrayaan, Mangalyaan, Gaganyaan, Aditya-L1 — sabhi missions ek jagah.",
body: `
<h2>चंद्रयान</h2>
<ul>
<li><b>चंद्रयान-1 (2008):</b> चंद्रमा पर पानी की खोज</li>
<li><b>चंद्रयान-2 (2019):</b> ऑर्बिटर सफल, लैंडर (विक्रम) असफल</li>
<li><b>चंद्रयान-3 (2023):</b> दक्षिणी ध्रुव पर सफल लैंडिंग — भारत पहला देश</li>
<li>लैंडर: विक्रम, रोवर: प्रज्ञान</li>
</ul>
<h2>अन्य मिशन</h2>
<ul>
<li><b>मंगलयान (2013):</b> पहले प्रयास में मंगल कक्षा — विश्व रिकॉर्ड</li>
<li><b>आदित्य-L1 (2023):</b> सूर्य का अध्ययन, L1 बिंदु</li>
<li><b>गगनयान:</b> भारत का पहला मानव अंतरिक्ष मिशन (आगामी)</li>
</ul>
<div class="quiz-q"><p>Q1. चंद्रयान-3 की लैंडिंग कहाँ हुई?</p><p class="quiz-ans">✅ उत्तर: चंद्रमा के दक्षिणी ध्रुव पर</p></div>
`
}
],

/* ============ ENVIRONMENT ============ */
"environment": [
{
id: "env-biodiversity",
title: "जैव विविधता — Hotspots, Conventions",
date: "25 September 2026",
excerpt: "Biodiversity hotspots, CBD, Ramsar, Red Data Book — environment ke core topics.",
body: `
<h2>जैव विविधता हॉटस्पॉट</h2>
<ul>
<li>विश्व में 36 हॉटस्पॉट; भारत में <b>4</b>: हिमालय, पश्चिमी घाट, इंडो-बर्मा, सुंडालैंड (निकोबार)</li>
<li>अवधारणा: नॉर्मन मायर्स (1988)</li>
</ul>
<h2>प्रमुख सम्मेलन</h2>
<ul>
<li><b>CBD (1992):</b> जैव विविधता अभिसमय, रियो पृथ्वी शिखर सम्मेलन</li>
<li><b>रामसर (1971):</b> आर्द्रभूमि संरक्षण; भारत में 75+ रामसर स्थल</li>
<li><b>CITES (1973):</b> वन्यजीव व्यापार नियंत्रण</li>
<li><b>क्योटो प्रोटोकॉल (1997), पेरिस समझौता (2015):</b> जलवायु परिवर्तन</li>
</ul>
<h2>Red Data Book</h2>
<p>IUCN द्वारा प्रकाशित — संकटग्रस्त प्रजातियों की सूची। IUCN मुख्यालय: ग्लैंड (स्विट्जरलैंड)।</p>
<div class="quiz-q"><p>Q1. भारत में कितने biodiversity hotspot हैं?</p><p class="quiz-ans">✅ उत्तर: 4</p></div>
`
}
]

};
