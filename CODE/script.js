//  ============ DECISION TREE DATA STRUCTURE AND LOGIC ============ //
    const treeState = {
      currentScenario: null,
      currentNode: null
    };

    // --- The Logic Data: 3 Scenarios --- //
    const decisionData = {
      
      // --- SCENARIO 1: CONTRACEPTION --- //
      'contraception': {
        title: 'Contraception Finder',
        nodes: {
          'start': {
            q: "Do you want to prevent pregnancy right now?",
            yes: 'hormonal_check',
            no: 'sti_check_path'
          },
          'hormonal_check': {
            q: "Are you comfortable using hormones (like pill, patch, implant)?",
            yes: 'daily_routine',
            no: 'barrier_method'
          },
          'daily_routine': {
            q: "Are you good at remembering to take something every single day?",
            yes: 'res_pill',
            no: 'long_term'
          },
          'long_term': {
            q: "Do you want a method that lasts for years without maintenance?",
            yes: 'res_implant_iud',
            no: 'res_patch_ring'
          },
          'barrier_method': {
            q: "Do you also want protection against STIs?",
            yes: 'res_condoms',
            no: 'res_copper_iud'
          },
          'sti_check_path': {
             q: "Are you looking for protection solely against STIs?",
             yes: 'res_condoms',
             no: 'res_consult'
          },
          // --- Results (Leaf Nodes) --- //
          'res_pill': { result: true, title: "The Pill", text: "Oral contraceptives might be great for you. They are 99% effective if taken daily." },
          'res_implant_iud': { result: true, title: "Implant or Hormonal IUD", text: "These are 'set and forget' methods. The implant goes in your arm (3 years), the IUD in your uterus (3-7 years)." },
          'res_patch_ring': { result: true, title: "Patch or Ring", text: "Try the Patch (change weekly) or the Ring (change monthly) if you don't want a daily pill." },
          'res_condoms': { result: true, title: "External/Internal Condoms", text: "The only method that prevents both pregnancy and STIs. Keep using them!" },
          'res_copper_iud': { result: true, title: "Copper IUD", text: "A hormone-free device that lasts up to 10 years. Highly effective." },
          'res_consult': { result: true, title: "Consult a Specialist", text: "Your needs sound unique. It's best to visit a clinic to discuss fertility awareness or sterilization." }
        }
      },

      // --- SCENARIO 2: STI RISK --- //
      'sti': {
        title: 'STI Risk Check',
        nodes: {
          'start': {
            q: "Have you had unprotected sex recently?",
            yes: 'symptoms_check',
            no: 'routine_check'
          },
          'symptoms_check': {
            q: "Do you have any symptoms? (Bumps, itchiness, discharge, pain)?",
            yes: 'res_urgent',
            no: 'partner_check'
          },
          'partner_check': {
            q: "Did your partner mention they might have an STI?",
            yes: 'res_urgent',
            no: 'window_period'
          },
          'window_period': {
            q: "Was the unprotected sex less than 2 weeks ago?",
            yes: 'res_wait',
            no: 'res_test_now'
          },
          'routine_check': {
             q: "Has it been more than 6 months since your last test?",
             yes: 'res_routine',
             no: 'res_safe'
          },
          // --- Results --- //
          'res_urgent': { result: true, title: "Visit a Clinic ASAP", text: "Since you have symptoms or known exposure, please do not wait. STIs are treatable!" },
          'res_wait': { result: true, title: "Wait & Monitor", text: "Some tests cannot detect infections immediately. Use protection and test in 2 weeks, or visit a doctor for PEP if high risk." },
          'res_test_now': { result: true, title: "Get Tested Now", text: "You are outside the window period, so a test now will be accurate. It's good to be sure!" },
          'res_routine': { result: true, title: "Time for a Checkup", text: "We recommend testing every 6 months if you are sexually active, just to be safe." },
          'res_safe': { result: true, title: "You're Good!", text: "Keep using protection. You seem to be up to date with your health screenings." }
        }
      },

      // --- SCENARIO 3: CONSENT --- //
      'consent': {
        title: 'Consent Check-In',
        nodes: {
          'start': {
            q: "Did the other person say 'YES' clearly and enthusiastically?",
            yes: 'pressure_check',
            no: 'silence_check'
          },
          'pressure_check': {
            q: "Was there any pressure, guilt-tripping, or fear involved?",
            yes: 'res_bad',
            no: 'sobriety_check'
          },
          'silence_check': {
            q: "Did they stay silent, freeze up, or seem unsure?",
            yes: 'res_bad',
            no: 'body_language'
          },
          'body_language': {
            q: "Did they push you away or look uncomfortable?",
            yes: 'res_bad',
            no: 'res_communicate'
          },
          'sobriety_check': {
             q: "Was anyone incapacitated by drugs or alcohol?",
             yes: 'res_bad',
             no: 'res_good'
          },
          // --- Results --- //
          'res_good': { result: true, title: "Sounds Healthy!", icon: "fas fa-check-circle", text: "This sounds like a consensual, safe interaction. Communication is key!" },
          'res_bad': { result: true, title: "Red Flag", icon: "fas fa-exclamation-triangle", text: "Consent must be free, enthusiastic, and sober. If this happened to you, it is not your fault. Reach out for support." },
          'res_communicate': { result: true, title: "Unclear Territory", text: "Consent shouldn't be a guessing game. If you aren't sure, ASK. 'Are you okay with this?' is a sexy question." }
        }
      }
    };

    // ============ FUNCTIONS ============ //

    function startTree(scenarioId) {
      treeState.currentScenario = decisionData[scenarioId];
      treeState.currentNode = 'start';
    
      document.getElementById('assessment-selector').style.display = 'none';
      document.getElementById('tree-container').style.display = 'block';
      document.getElementById('tree-result').style.display = 'none';
      document.getElementById('tree-topic-badge').textContent = treeState.currentScenario.title;
      
      renderQuestion();
    }

    function renderQuestion() {
      const node = treeState.currentScenario.nodes[treeState.currentNode];
      
      // --- Update Progress Bar --- //
      const progress = Math.random() * 30 + 30; 
      document.getElementById('tree-progress').style.width = progress + '%';

      // --- Animate Question --- //
      const qEl = document.getElementById('tree-question');
      qEl.style.opacity = 0;
      setTimeout(() => {
        qEl.textContent = node.q;
        qEl.style.opacity = 1;
      }, 200);
    }

    function handleTreeAnswer(answer) {
      const node = treeState.currentScenario.nodes[treeState.currentNode];
      const nextNodeId = node[answer];
      
      // --- Check if the next node is a result (leaf node) --- //
      const nextNode = treeState.currentScenario.nodes[nextNodeId];

      if (nextNode.result) {
        showResult(nextNode);
      } else {
        treeState.currentNode = nextNodeId;
        renderQuestion();
      }
    }

    function showResult(resultNode) {
      document.getElementById('tree-container').style.display = 'none';
      const resDiv = document.getElementById('tree-result');
      resDiv.style.display = 'block';
      
      document.getElementById('result-title').textContent = resultNode.title;
      document.getElementById('result-body').innerHTML = `<p>${resultNode.text}</p>`;
      document.getElementById('result-icon').className = resultNode.icon || 'fas fa-heart';
      
      // --- 100% Progress --- //
      document.getElementById('tree-progress').style.width = '100%';
    }

    function resetAssessment() {
      document.getElementById('assessment-selector').style.display = 'block';
      document.getElementById('tree-container').style.display = 'none';
      document.getElementById('tree-result').style.display = 'none';
      document.getElementById('tree-progress').style.width = '0%';
    }

    // ============ MODAL / INFO DETAILS ============ //
  const modalBackdrop = document.getElementById('modalBackdrop');
  const infoModal = document.getElementById('infoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const infoDetails = {
    'safe-sex': {
      title: 'Safe Sex Practices',
      icon: 'fas fa-shield-heart',
      content: `
        <p>Safe sex is about protecting yourself and your partner while enjoying intimacy. Here are 10 essential practices:</p>
        <ul style="text-align: left; margin-top: 10px; line-height: 1.6;">
          <li><strong>1. Use Condoms Correctly:</strong> Check the expiration date and air bubble. Use a new one for every act.</li>
          <li><strong>2. Use Lubricant:</strong> Water-based lubes prevent condom breakage and increase comfort.</li>
          <li><strong>3. Dental Dams:</strong> Use these latex sheets for oral protection.</li>
          <li><strong>4. Wash Hands:</strong> Before and after intimacy to prevent bacterial transfer.</li>
          <li><strong>5. Clean Sex Toys:</strong> Wash them thoroughly with soap and water before sharing or reusing.</li>
          <li><strong>6. Regular Testing:</strong> Get tested at least once a year, or before every new partner.</li>
          <li><strong>7. Honest Communication:</strong> Talk about sexual history and status before clothes come off.</li>
          <li><strong>8. Avoid Intoxication:</strong> Alcohol and drugs can impair judgment regarding safety measures.</li>
          <li><strong>9. Check for Sores:</strong> distinct bumps or sores are signs to stop and consult a doctor.</li>
          <li><strong>10. PrEP/PEP:</strong> If you are high-risk for HIV, ask a doctor about Pre-Exposure or Post-Exposure Prophylaxis.</li>
        </ul>
      `
    },
    'contraception': {
      title: 'Contraception Options',
      icon: 'fas fa-pills',
      content: `
        <p>Finding the right birth control is a personal choice. Here are 10 common options to discuss with your doctor:</p>
        <ul style="text-align: left; margin-top: 10px; line-height: 1.6;">
          <li><strong>1. Male Condoms:</strong> 98% effective if used perfectly; also prevents STIs.</li>
          <li><strong>2. Oral Contraceptive Pills:</strong> Taken daily to prevent ovulation.</li>
          <li><strong>3. The Implant:</strong> A tiny rod inserted in the arm; lasts up to 3 years.</li>
          <li><strong>4. IUD (Copper):</strong> Hormone-free device placed in the uterus; lasts up to 10 years.</li>
          <li><strong>5. IUD (Hormonal):</strong> Lightens periods and prevents pregnancy for 3-5 years.</li>
          <li><strong>6. Injectables:</strong> A shot given every 3 months (e.g., Depo-Provera).</li>
          <li><strong>7. Emergency Contraception:</strong> "Plan B" or "Morning After" pill (take within 72 hours of unprotected sex).</li>
          <li><strong>8. Vaginal Ring:</strong> A flexible ring inserted monthly.</li>
          <li><strong>9. Patch:</strong> A sticky patch worn on the skin, changed weekly.</li>
          <li><strong>10. Fertility Awareness:</strong> Tracking your cycle (requires high discipline and regularity).</li>
        </ul>
      `
    },
    'sti': {
      title: 'STI Prevention & Testing',
      icon: 'fas fa-virus',
      content: `
        <p>STIs are common and most are treatable. Knowledge is your best defense. Here are 10 key facts:</p>
        <ul style="text-align: left; margin-top: 10px; line-height: 1.6;">
          <li><strong>1. Many are Asymptomatic:</strong> You can have an STI without showing any signs. Testing is the only way to know.</li>
          <li><strong>2. HPV Vaccine:</strong> Protects against warts and cervical cancer (available for all genders).</li>
          <li><strong>3. Hepatitis B Vaccine:</strong> A crucial shot to prevent serious liver infection.</li>
          <li><strong>4. Window Periods:</strong> Tests might not detect an infection immediately after exposure (ask your doctor).</li>
          <li><strong>5. Treatable vs. Curable:</strong> Bacterial STIs (Chlamydia, Gonorrhea) are curable; Viral ones (HIV, Herpes) are manageable.</li>
          <li><strong>6. Notify Partners:</strong> If you test positive, tell recent partners so they can get checked too.</li>
          <li><strong>7. Barrier Methods Work:</strong> Condoms significantly reduce risk for HIV, Gonorrhea, and Chlamydia.</li>
          <li><strong>8. Don't Share Sharps:</strong> Avoid sharing razors or needles.</li>
          <li><strong>9. Oral Sex Risks:</strong> You can get STIs in the throat; use protection.</li>
          <li><strong>10. Regular Screenings:</strong> Make it a part of your routine healthcare checkup.</li>
        </ul>
      `
    },

    'clinic': {
      title: 'Finding Clinics',
      icon: 'fas fa-location-dot',
      content: `
        <p>Here is a list of trusted, non-judgmental clinics and centers across the Philippines offering free or affordable HIV testing and sexual health services:</p>
        
        <div style="text-align: left; margin-top: 15px;">
          
          <h4 style="color: #764ba2; margin-bottom: 8px; border-bottom: 2px solid #eee; padding-bottom: 5px;">📍 LUZON</h4>
          <ul style="list-style: none; padding-left: 0; margin-bottom: 20px;">
            <li style="margin-bottom: 8px;"><strong>LoveYourself Anglo (Mandaluyong):</strong> <br><span style="font-size: 0.9em; color: #555;">Unit 5, 3/F, Anglo Bldg, #715-A Shaw Blvd.</span></li>
            <li style="margin-bottom: 8px;"><strong>Klinika Bernardo (Quezon City):</strong> <br><span style="font-size: 0.9em; color: #555;">Bernardo Park Compound, Kamuning Rd. (Open til 11PM)</span></li>
            <li style="margin-bottom: 8px;"><strong>LoveYourself Uni (Pasay):</strong> <br><span style="font-size: 0.9em; color: #555;">2028 Taft Avenue, near Gil Puyat LRT.</span></li>
            <li style="margin-bottom: 8px;"><strong>Batangas Medical Center (Batangas City):</strong> <br><span style="font-size: 0.9em; color: #555;">Kumintang Ibaba, Batangas City.</span></li>
            <li style="margin-bottom: 8px;"><strong>Baguio General Hospital (Baguio):</strong> <br><span style="font-size: 0.9em; color: #555;">Gov. Pack Road, Baguio City.</span></li>
          </ul>

          <h4 style="color: #764ba2; margin-bottom: 8px; border-bottom: 2px solid #eee; padding-bottom: 5px;">📍 VISAYAS</h4>
          <ul style="list-style: none; padding-left: 0; margin-bottom: 20px;">
            <li style="margin-bottom: 8px;"><strong>LoveYourself White House (Cebu City):</strong> <br><span style="font-size: 0.9em; color: #555;">6 J. Llorente St, Capitol Site, Cebu City.</span></li>
            <li style="margin-bottom: 8px;"><strong>Vicente Sotto Memorial Medical Center (Cebu):</strong> <br><span style="font-size: 0.9em; color: #555;">B. Rodriguez St, Cebu City.</span></li>
            <li style="margin-bottom: 8px;"><strong>Western Visayas Medical Center (Iloilo):</strong> <br><span style="font-size: 0.9em; color: #555;">Q. Abeto St, Mandurriao, Iloilo City.</span></li>
            <li style="margin-bottom: 8px;"><strong>FPOP Iloilo Chapter:</strong> <br><span style="font-size: 0.9em; color: #555;">Rizal Street, Iloilo City Proper.</span></li>
            <li style="margin-bottom: 8px;"><strong>Corazon Locsin Montelibano Hospital (Bacolod):</strong> <br><span style="font-size: 0.9em; color: #555;">Lacson St, Bacolod, Negros Occidental.</span></li>
          </ul>

          <h4 style="color: #764ba2; margin-bottom: 8px; border-bottom: 2px solid #eee; padding-bottom: 5px;">📍 MINDANAO</h4>
          <ul style="list-style: none; padding-left: 0; margin-bottom: 20px;">
            <li style="margin-bottom: 8px;"><strong>Southern Philippines Medical Center (Davao):</strong> <br><span style="font-size: 0.9em; color: #555;">J.P. Laurel Ave, Bajada, Davao City.</span></li>
            <li style="margin-bottom: 8px;"><strong>FPOP Davao Chapter:</strong> <br><span style="font-size: 0.9em; color: #555;">Doors 4 & 5, Jaltan Bldg, C.M. Recto Ave, Davao.</span></li>
            <li style="margin-bottom: 8px;"><strong>Zamboanga City Medical Center (Zamboanga):</strong> <br><span style="font-size: 0.9em; color: #555;">Dr. D. Evangelista St, Sta. Catalina.</span></li>
            <li style="margin-bottom: 8px;"><strong>Northern Mindanao Medical Center (CDO):</strong> <br><span style="font-size: 0.9em; color: #555;">Capitol Compound, Cagayan de Oro City.</span></li>
            <li style="margin-bottom: 8px;"><strong>Cotabato Regional and Medical Center:</strong> <br><span style="font-size: 0.9em; color: #555;">Sinsuat Avenue, Cotabato City.</span></li>
          </ul>

        </div>
      `
    },

    'education': {
      title: 'Sexual Health Education',
      icon: 'fas fa-book-medical',
      content: `
        <p>Understanding your body is the first step to wellness. Here are 10 educational pillars:</p>
        <ul style="text-align: left; margin-top: 10px; line-height: 1.6;">
          <li><strong>1. Anatomy Knowledge:</strong> Know the correct names and functions of reproductive organs.</li>
          <li><strong>2. Menstrual Health:</strong> Tracking cycles helps understand fertility and overall health.</li>
          <li><strong>3. Myth Busting:</strong> You cannot get pregnant from toilet seats or hugging.</li>
          <li><strong>4. Self-Exams:</strong> Check breasts/chest and testicles monthly for lumps.</li>
          <li><strong>5. Hygiene Balance:</strong> The vagina is self-cleaning; avoid douching which causes infections.</li>
          <li><strong>6. Puberty is Normal:</strong> Hair growth, voice changes, and discharge are natural.</li>
          <li><strong>7. Sexual Orientation:</strong> Who you are attracted to is a natural part of who you are.</li>
          <li><strong>8. Gender Identity:</strong> How you feel inside may or may not match your sex assigned at birth.</li>
          <li><strong>9. Media Literacy:</strong> Pornography is not a realistic depiction of sex.</li>
          <li><strong>10. Lifelong Learning:</strong> Sexual health needs change as you age; keep learning.</li>
        </ul>
      `
    },
    'consent': {
      title: 'Consent & Communication',
      icon: 'fas fa-handshake',
      content: `
        <p>Consent is mandatory. Communication makes sex better. Here are 10 rules of engagement:</p>
        <ul style="text-align: left; margin-top: 10px; line-height: 1.6;">
          <li><strong>1. Enthusiastic Yes:</strong> Consent shouldn't be "maybe"—it should be a clear YES.</li>
          <li><strong>2. Freely Given:</strong> No pressure, guilt-tripping, or coercion allowed.</li>
          <li><strong>3. Reversible:</strong> You can change your mind at ANY time, even during the act.</li>
          <li><strong>4. Specific:</strong> Saying yes to one thing (kissing) doesn't mean yes to everything.</li>
          <li><strong>5. Informed:</strong> Partners must know about STI status and birth control use.</li>
          <li><strong>6. Sobriety:</strong> If someone is too drunk or high, they cannot legally consent.</li>
          <li><strong>7. Non-Verbal Cues:</strong> If they aren't responding or look uncomfortable, STOP and ask.</li>
          <li><strong>8. Check-Ins:</strong> Ask "Is this okay?" or "Do you like this?" frequently.</li>
          <li><strong>9. Respect Boundaries:</strong> If they say no, accept it immediately and gracefully.</li>
          <li><strong>10. The "Tea" Analogy:</strong> If you make tea and they don't want it, don't force them to drink it. Same goes for sex.</li>
        </ul>
      `
    }
  };

    function openModal(key) {
      const info = infoDetails[key];
      if (!info) return;
      
      modalTitle.innerHTML = `<i class="${info.icon}"></i> ${info.title}`;
      modalContent.innerHTML = info.content;
      modalBackdrop.classList.add('show');
    }

    function closeModal() {
      modalBackdrop.classList.remove('show');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    // --- Wire Infor Cards to Open Modal --- //
    document.querySelectorAll('#info .card').forEach((card, idx) => {
      const keys = ['safe-sex', 'sti', 'contraception', 'clinic', 'education', 'consent'];
      
      if (keys[idx]) {
        card.addEventListener('click', () => openModal(keys[idx]));
      }
    });

    // --- Section Navigation --- //
    function showSection(sectionId) {
      document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
      const section = document.getElementById(sectionId);
      if (section) section.classList.add('active');
    }

    // ============ FORUM ============ //
    const postsKey = 'forum_posts_v1';
    const postForm = document.getElementById('postForm');
    const authorInput = document.getElementById('authorInput');
    const messageInput = document.getElementById('messageInput');
    const postsContainer = document.getElementById('postsContainer');
    const clearAllBtn = document.getElementById('clearAllBtn');
    let posts = [];

    function loadPosts() {
      try {
        posts = JSON.parse(localStorage.getItem(postsKey) || '[]');
      } catch (e) {
        posts = [];
      }
    }

    function savePosts() {
      localStorage.setItem(postsKey, JSON.stringify(posts));
    }

    function timeAgo(iso) {
      const delta = Math.floor((Date.now() - new Date(iso)) / 1000);
      if (delta < 60) return `${delta}s`;
      if (delta < 3600) return `${Math.floor(delta / 60)}m`;
      if (delta < 86400) return `${Math.floor(delta / 3600)}h`;
      return `${Math.floor(delta / 86400)}d`;
    }

    function escapeHtml(s) {
      if (!s) return '';
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function renderPosts() {
      if (!posts || posts.length === 0) {
        postsContainer.innerHTML = `<div class="empty-state"><i class="fas fa-comments"></i><p>No posts yet — be the first to share!</p></div>`;
        return;
      }

      postsContainer.innerHTML = '';
      // --- Sort posts by likes (most liked first), tie-breaker: newest first --- //
      const sorted = posts.slice().sort((a, b) => {
        const la = a.likes || 0;
        const lb = b.likes || 0;
        if (lb !== la) return lb - la;
        return new Date(b.time) - new Date(a.time);
      });

      // --- Display the top (most liked) post in the banner --- //
      const top = sorted[0];
      const topEl = document.getElementById('topPost');
      if (top) {
        topEl.style.display = 'block';
        topEl.innerHTML = `
          <div class="title">Most Liked Post</div>
          <div class="top-card">
            <div class="tp-content"><strong>${escapeHtml(top.author || 'Anonymous')}</strong>: ${escapeHtml(top.content)}</div>
            <div class="tp-meta">👍 ${top.likes || 0}<br/><small>${timeAgo(top.time)}</small></div>
          </div>
        `;
      } else {
        topEl.style.display = 'none';
        topEl.innerHTML = '';
      }

      sorted.forEach(post => {
        const el = document.createElement('div');
        el.className = 'post';
        el.innerHTML = `
          <div class="post-header">
            <div>
              <div class="post-author">${escapeHtml(post.author || 'Anonymous')}</div>
              <div class="post-time">${timeAgo(post.time)}</div>
            </div>
          </div>
          <div class="post-content">${escapeHtml(post.content)}</div>
          <div class="post-actions">
            <button class="post-action-btn" data-action="like" data-id="${post.id}"><i class="fas fa-thumbs-up"></i> ${post.likes || 0}</button>
            <button class="post-action-btn" data-action="delete" data-id="${post.id}"><i class="fas fa-trash"></i></button>
          </div>
        `;
        postsContainer.appendChild(el);
      });
    }

    postsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      if (action === 'like') {
        const p = posts.find(x => x.id === id);
        if (p) {
          p.likes = (p.likes || 0) + 1;
          savePosts();
          renderPosts();
        }
      } else if (action === 'delete') {
        if (!confirm('Delete this post?')) return;
        posts = posts.filter(x => x.id !== id);
        savePosts();
        renderPosts();
      }
    });

    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = authorInput.value;
      const content = messageInput.value;
      if (!content || !content.trim()) {
        alert('Please enter a message before posting.');
        return;
      }
      const post = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        author: author ? author.trim() : 'Anonymous',
        content: content.trim(),
        likes: 0,
        time: new Date().toISOString()
      };
      posts.push(post);
      savePosts();
      renderPosts();
      postForm.reset();
    });

    clearAllBtn.addEventListener('click', () => {
      if (!posts || posts.length === 0) return;
      if (!confirm('Clear all posts? This cannot be undone.')) return;
      posts = [];
      savePosts();
      renderPosts();
    });

    loadPosts();

    // --- Seed 45 sample posts (only once) and persist. Uses a flag in localStorage to avoid duplicating. --- //
    if (!localStorage.getItem('forum_seeded_v2')) {
      const seed = [];
      const snippets = [
        'Condoms are important — always use one when unsure.',
        'Just got tested and the clinic was friendly and confidential.',
        'Any tips for discussing contraception with a new partner?',
        'IUD experience: minimal pain, now I don\'t worry about pills.',
        'Remember emergency contraception works best the sooner you take it.',
        'Testing helped me feel more confident in my relationship.',
        'Where do you find low-cost STI testing near you?',
        'Has anyone tried the implant? How was recovery?',
        'Talking about consent is crucial — be direct and kind.',
        'Plan B was accessible at my local pharmacy, no questions asked.'
      ];

      for (let i = 0; i < 45; i++) {
        const id = 'sample-' + Date.now().toString(36) + '-' + i;
        const author = `User${100 + i}`;
        const content = snippets[i % snippets.length] + (i % 3 === 0 ? ' Sharing my experience.' : ' Asking for advice.');
        const likes = Math.floor(Math.random() * 120); // 0-119 likes
        const time = new Date(Date.now() - (i * 60 * 60 * 1000)).toISOString();
        seed.push({ id, author, content, likes, time });
      }

      posts = posts.concat(seed);
      savePosts();
      localStorage.setItem('forum_seeded_v2', '1');
    }

    renderPosts();
    const chatPanel = document.getElementById('chatPanel');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const minimizeChat = document.getElementById('minimizeChat');
    const quickReplies = document.getElementById('quickReplies');
    const chatBubble = document.getElementById('chatBubble');

    const chatKey = 'chat_history_v1';
    let chatHistory = [];

    const canned = [
      { pattern: /\bhello\b|\bhi\b|\bhey\b/, reply: "Hello! I'm HealthBot. I can answer questions about safe sex, contraception, clinics, and more." },
      { pattern: /\bhelp\b/, reply: 'Try: "safe sex", "contraception", "clinic", "STI", "emergency", or "self assessment".' },
      { pattern: /\bsafe sex\b|\bcondom(s)?\b/, reply: 'Safe sex means using protection (condoms), getting tested regularly, communicating with partners, and using contraception consistently.' },
      { pattern: /contraception|birth control|pill|iud|implant/, reply: "Options include pills, IUDs, implants, condoms, and more. Talk to a clinician to find what's right for you." },
      { pattern: /clinic|near me|where to (find|get)/, reply: "Search online for sexual health clinics near you. Many offer confidential and affordable services. If it's urgent, go to the ER." },
      { pattern: /sti|testing|test(ed)?/, reply: "STI testing is important if you're sexually active. Many STIs are treatable. Get tested annually or after unprotected contact." },
      { pattern: /emergency|urgent|help now/, reply: "If it's an emergency, call your local emergency number or go to the nearest hospital immediately." },
      { pattern: /self assessment|assessment|checklist/, reply: "Check out the Self-Assessment section in the navigation to use our checklists." },
      { pattern: /mental|therapy|counsel/, reply: "Sexual health includes mental well-being. Don't hesitate to seek therapy or counseling if needed." }
    ];

    const defaultReply = "I'm not sure about that. Try asking about safe sex, contraception, clinics, STI testing, or use a quick reply.";

    function saveChat() {
      try { localStorage.setItem(chatKey, JSON.stringify(chatHistory)); } catch (e) {}
    }

    function loadChat() {
      try { chatHistory = JSON.parse(localStorage.getItem(chatKey) || '[]'); } catch (e) { chatHistory = []; }
    }

    function renderHistory() {
      chatMessages.innerHTML = '';
      chatHistory.forEach(m => {
        const el = document.createElement('div');
        el.className = `message ${m.who}`;
        el.textContent = m.text;
        chatMessages.appendChild(el);
      });
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addMessage(text, who = 'bot', save = true) {
      const el = document.createElement('div');
      el.className = `message ${who}`;
      el.textContent = text;
      chatMessages.appendChild(el);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      if (save) {
        chatHistory.push({ who, text, time: new Date().toISOString() });
        saveChat();
      }
    }

    function showTyping(on = true) {
      let typingEl = chatMessages.querySelector('.typing');
      if (on) {
        if (!typingEl) {
          typingEl = document.createElement('div');
          typingEl.className = 'message bot typing';
          typingEl.textContent = 'HealthBot is typing...';
          chatMessages.appendChild(typingEl);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      } else {
        if (typingEl) typingEl.remove();
      }
    }

    function respondTo(text) {
      const t = text.toLowerCase();
      for (const item of canned) {
        if (item.pattern.test(t)) return item.reply;
      }
      return defaultReply;
    }

    function openChat() {
      chatPanel.classList.remove('hidden');
      loadChat();
      renderHistory();
      if (chatHistory.length === 0) {
        addMessage("Hi! I'm HealthBot. I can answer questions about sexual health, contraception, clinics, and more. What can I help with?", 'bot');
      }
      renderQuickReplies();
      chatInput.focus();
    }

    function closeChat() {
      chatPanel.classList.add('hidden');
    }

    function handleSend() {
      const txt = chatInput.value && chatInput.value.trim();
      if (!txt) return;
      addMessage(txt, 'user');
      chatInput.value = '';
      showTyping(true);

      // --- Simulate Thinking Time --- //
      setTimeout(() => {
        const reply = respondTo(txt);
        showTyping(false);
        addMessage(reply, 'bot');
      }, 600 + Math.random() * 600);
    }

    function renderQuickReplies() {
      const quickList = [
        { label: '👋 Hello', value: 'hello' },
        { label: '🛡️ Safe Sex', value: 'safe sex' },
        { label: '💊 Contraception', value: 'contraception' },
        { label: '🏥 Find Clinics', value: 'clinic' },
        { label: '🦠 STI Info', value: 'sti' }
      ];

      quickReplies.innerHTML = '';
      quickList.forEach(q => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = q.label;
        b.addEventListener('click', () => {
          addMessage(q.label, 'user');
          showTyping(true);
          setTimeout(() => { showTyping(false); addMessage(respondTo(q.value), 'bot'); }, 300 + Math.random() * 400);
        });
        quickReplies.appendChild(b);
      });
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    });

    minimizeChat.addEventListener('click', closeChat);

    chatBubble.addEventListener('click', () => {
      if (chatPanel.classList.contains('hidden')) openChat();
      else closeChat();
    });
