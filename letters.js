// وحدة الحروف — منطق عرض وتدريب فقط. البيانات في content/tigre-letters.js
(function () {
  "use strict";
  if (!window.TIGRE_LETTERS || !Array.isArray(window.TIGRE_LETTERS)) return;

  var letters = window.TIGRE_LETTERS;
  var seen = {};
  try {
    var raw = sessionStorage.getItem('tigre-letters-seen');
    if (raw) seen = JSON.parse(raw) || {};
  } catch (e) { seen = {}; }

  var idx = 0;
  var quizAnswer = null;
  var quizLocked = false;

  var els = {
    base: document.getElementById('letterBase'),
    name: document.getElementById('letterName'),
    arabic: document.getElementById('letterArabic'),
    number: document.getElementById('letterNumber'),
    latin: null,
    source: null,
    counter: document.getElementById('letterCounter'),
    badge: document.getElementById('reviewBadge'),
    forms: document.getElementById('formsGrid'),
    prev: document.getElementById('prevBtn'),
    next: document.getElementById('nextBtn'),
    progress: document.getElementById('progressText'),
    prompt: document.getElementById('quizPrompt'),
    options: document.getElementById('quizOptions'),
    feedback: document.getElementById('quizFeedback'),
    qnext: document.getElementById('quizNext'),
    index: document.getElementById('lettersIndex'),
    indexCount: document.getElementById('indexCount')
  };

  var groupTitles = {
    stops: 'توقفات (Plosives)',
    fricatives: 'احتكاكات (Fricatives)',
    affricates: 'افريكات (Affricates)',
    nasals: 'أنفية (Nasals)',
    liquids: 'سائلة/تقريبية (Liquids/Approximants)'
  };

  function markSeen(i) { seen[i] = true; try { sessionStorage.setItem('tigre-letters-seen', JSON.stringify(seen)); } catch (e) {} }

  function buildIndex() {
    if (!els.index) return;
    // عرض جميع الحروف متتابعة بالترتيب المعتمد (من اليمين إلى اليسار عبر dir="rtl")
    els.index.innerHTML = '<div class="index-grid">' + letters.map(function (L, i) {
      return '<button type="button" class="index-btn" data-idx="' + i + '" aria-label="' + L.name + ' / ' + (L.arabicApprox || '') + '"><span class="index-base">' + L.base + '</span><span class="index-ar">' + (L.arabicApprox || '') + '</span></button>';
    }).join('') + '</div>';
    els.index.querySelectorAll('.index-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = parseInt(btn.getAttribute('data-idx'), 10);
        renderLetter(i);
        var target = document.getElementById('letterSection');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    if (els.indexCount) {
      els.indexCount.textContent = letters.length + ' حرفًا أساسيًا — ' + (letters.reduce(function (a, L) { return a + (L.forms || []).length; }, 0)) + ' شكلًا (بما في ذلك الحركات السبع). بانتظار مراجعة المختص.';
    }
  }

  function updateIndexHighlight(i) {
    if (!els.index) return;
    els.index.querySelectorAll('.index-btn').forEach(function (btn) {
      var idx = parseInt(btn.getAttribute('data-idx'), 10);
      btn.classList.toggle('is-current', idx === i);
    });
  }

  function renderLetter(i) {
    idx = Math.max(0, Math.min(letters.length - 1, i));
    var L = letters[idx];
    if (els.base) els.base.textContent = L.base;
    if (els.number) els.number.textContent = idx + 1;
    if (els.name) els.name.textContent = L.name;
    if (els.arabic) els.arabic.textContent = L.arabicApprox;
    if (els.counter) els.counter.textContent = (idx + 1) + ' / ' + letters.length;
    if (els.badge) {
      els.badge.textContent = (L.reviewStatus === 'verified') ? 'تم التحقق' : 'بانتظار مراجعة المختص';
      els.badge.className = 'badge ' + (L.reviewStatus === 'verified' ? 'badge-available' : 'badge-pending');
    }
    if (els.forms) {
      els.forms.innerHTML = (L.forms || []).map(function (f, k) {
        var labels = ['ä','u','i','a','e','ə','o'];
        return '<div class="form-cell"><span class="ethiopic">' + f + '</span><small>' + (labels[k] || '') + '</small></div>';
      }).join('');
    }
    markSeen(idx);
    updateProgress();
    updateIndexHighlight(idx);
    if (els.prev) els.prev.disabled = (idx === 0);
    if (els.next) els.next.disabled = (idx === letters.length - 1);
  }

  function updateProgress() {
    var count = Object.keys(seen).length;
    if (els.progress) els.progress.textContent = count + ' من ' + letters.length + ' حرفًا شاهدته في هذه الجلسة';
  }

  function buildQuiz() {
    quizLocked = false;
    if (els.feedback) { els.feedback.textContent = ''; els.feedback.className = 'quiz-feedback'; }
    // pick a random letter as answer
    var answerIdx = Math.floor(Math.random() * letters.length);
    quizAnswer = answerIdx;
    var L = letters[answerIdx];
    if (els.prompt) els.prompt.textContent = L.arabicApprox;
    // 4 options: answer + 3 distractors
    var opts = [answerIdx];
    while (opts.length < 4) {
      var r = Math.floor(Math.random() * letters.length);
      if (opts.indexOf(r) === -1) opts.push(r);
    }
    // shuffle
    for (var i = opts.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = opts[i]; opts[i] = opts[j]; opts[j] = t;
    }
    if (els.options) {
      els.options.innerHTML = opts.map(function (o) {
        return '<button type="button" class="quiz-btn ethiopic" data-idx="' + o + '">' + letters[o].base + '</button>';
      }).join('');
      els.options.querySelectorAll('button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (quizLocked) return;
          quizLocked = true;
          var chosen = parseInt(btn.getAttribute('data-idx'), 10);
          var correct = (chosen === quizAnswer);
          els.options.querySelectorAll('button').forEach(function (b) {
            var bi = parseInt(b.getAttribute('data-idx'), 10);
            if (bi === quizAnswer) b.classList.add('correct');
            else if (b === btn && !correct) b.classList.add('wrong');
          });
          if (els.feedback) {
            els.feedback.textContent = correct ? 'إجابة صحيحة ✔' : 'إجابة غير صحيحة ✖ — الحرف الصحيح: ' + letters[quizAnswer].base;
            els.feedback.className = 'quiz-feedback ' + (correct ? 'ok' : 'bad');
          }
        });
      });
    }
  }

  if (els.prev) els.prev.addEventListener('click', function () { renderLetter(idx - 1); });
  if (els.next) els.next.addEventListener('click', function () { renderLetter(idx + 1); });
  if (els.qnext) els.qnext.addEventListener('click', buildQuiz);

  buildIndex();
  renderLetter(0);
  buildQuiz();
})();
