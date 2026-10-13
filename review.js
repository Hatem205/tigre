// صفحة المراجعة اللغوية — أداة مشروع، وليست جزءًا من تجربة المتعلم.
// الحفظ محلي في المتصفح فقط (localStorage) ولا يُرسل أي شيء إلى أي خادم.
(function () {
  "use strict";

  var NOTES_KEY = "tigre-review-notes-v1";
  var CHECKS_KEY = "tigre-review-notes-checks-v1";

  var KINDS = ["خطأ لغوي", "كتابة وإملاء", "ترجمة", "نطق", "معلومة غير دقيقة", "اقتراح تعليمي"];
  var CONFIDENCE = ["متأكد", "يحتاج إلى تحقق"];
  var SCOPES = ["واجهة وتصميم", "محتوى تعليمي عام", "أخرى"];

  var counter = 0;
  var editingId = null;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadNotes() {
    try {
      var raw = localStorage.getItem(NOTES_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function storeNotes(notes) {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return true;
    } catch (e) { return false; }
  }

  function loadChecks() {
    try {
      var raw = localStorage.getItem(CHECKS_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function storeChecks(arr) {
    try { localStorage.setItem(CHECKS_KEY, JSON.stringify(arr)); } catch (e) {}
  }

  function fmtDate(iso) {
    try { return new Date(iso).toLocaleString("ar", { dateStyle: "medium", timeStyle: "short" }); }
    catch (e) { return ""; }
  }

  function lessonLabel(n) {
    if (n.scope === "general") return "ملاحظة عامة (" + n.topic + ")";
    return "الدرس " + n.code + " — " + n.lessonTitle;
  }

  // ---------- عرض المراحل والدروس ----------
  function renderStages() {
    var host = document.getElementById("reviewStages");
    if (!host || !window.CURRICULUM) return;
    var notes = loadNotes();
    var html = "";
    window.CURRICULUM.forEach(function (stage, i) {
      var lessonsHtml = "";
      stage.lessons.forEach(function (lesson, j) {
        var code = (i + 1) + "." + (j + 1);
        var lid = "lesson-" + (i + 1) + "-" + (j + 1);
        var count = notes.filter(function (n) { return n.lessonId === lid; }).length;
        lessonsHtml +=
          '<article class="lesson lesson-pending" data-lesson="' + lid + '">' +
            "<h3>" + esc(lesson.title) + "</h3>" +
            "<p>" + esc(lesson.goal) + "</p>" +
            '<div class="lesson-meta"><span class="lesson-code">الدرس ' + code + '</span>' +
            '<span class="badge badge-pending">قيد الإعداد</span>' +
            '<span class="badge notes-count" data-count-for="' + lid + '">' + count + " ملاحظات</span></div>" +
            '<button type="button" class="btn btn-secondary btn-sm toggle-form">أضف ملاحظة على هذا الدرس</button>' +
            '<form class="note-form" hidden>' +
              '<label>نوع الملاحظة<select name="kind">' + KINDS.map(function (k) { return "<option>" + k + "</option>"; }).join("") + "</select></label>" +
              '<label>النص أو العنصر محل الملاحظة<textarea name="target" rows="2" required placeholder="انسخ هنا النص أو حدد العنصر بدقة"></textarea></label>' +
              '<label>التصحيح أو الاقتراح<textarea name="correction" rows="2" required placeholder="اكتب الصياغة الصحيحة أو اقتراحك"></textarea></label>' +
              '<label>سبب التعديل أو الشرح<textarea name="reason" rows="2" placeholder="لماذا هذا التصحيح أصح؟ (اختياري)"></textarea></label>' +
              '<label>درجة الثقة<select name="confidence">' + CONFIDENCE.map(function (c) { return "<option>" + c + "</option>"; }).join("") + "</select></label>" +
              '<div class="form-actions"><button type="submit" class="btn btn-primary btn-sm">حفظ الملاحظة</button>' +
              '<button type="button" class="btn btn-secondary btn-sm cancel-form">إلغاء</button></div>' +
            "</form>" +
          "</article>";
      });
      html +=
        '<details class="review-stage"' + (i === 0 ? " open" : "") + ">" +
          "<summary><span class=\"step\" aria-hidden=\"true\">" + (i + 1) + "</span>" +
          "<span><strong>المرحلة " + (i + 1) + ": " + esc(stage.title) + "</strong>" +
          '<small class="stage-goal">' + esc(stage.goal) + "</small></span></summary>" +
          '<div class="lessons">' + lessonsHtml + "</div>" +
        "</details>";
    });
    host.innerHTML = html;
  }

  // ---------- عرض قائمة الملاحظات ----------
  function renderNotes() {
    var list = document.getElementById("notesList");
    var total = document.getElementById("notesTotal");
    if (!list) return;
    var notes = loadNotes();
    if (total) total.textContent = notes.length ? ("لديك " + notes.length + " ملاحظات محفوظة") : "لا توجد ملاحظات بعد";
    if (!notes.length) {
      list.innerHTML = '<p class="empty-notes">لا توجد ملاحظات محفوظة بعد. أضف ملاحظتك الأولى من الدروس أعلاه أو من النموذج العام.</p>';
      return;
    }
    var sorted = notes.slice().sort(function (a, b) { return (b.updatedAt || "").localeCompare(a.updatedAt || ""); });
    list.innerHTML = sorted.map(function (n) {
      var editor = (editingId === n.id)
        ? '<form class="note-form edit-form" data-edit="' + n.id + '">' +
          '<label>نوع الملاحظة / الموضوع<select name="kind">' +
            (n.scope === "general" ? SCOPES : KINDS).map(function (k) { return "<option" + (k === n.kind ? " selected" : "") + ">" + k + "</option>"; }).join("") + "</select></label>" +
          '<label>النص أو العنصر محل الملاحظة<textarea name="target" rows="2" required>' + esc(n.target) + "</textarea></label>" +
          '<label>التصحيح أو الاقتراح<textarea name="correction" rows="2" required>' + esc(n.correction) + "</textarea></label>" +
          '<label>سبب التعديل أو الشرح<textarea name="reason" rows="2">' + esc(n.reason) + "</textarea></label>" +
          '<label>درجة الثقة<select name="confidence">' + CONFIDENCE.map(function (c) { return "<option" + (c === n.confidence ? " selected" : "") + ">" + c + "</option>"; }).join("") + "</select></label>" +
          '<div class="form-actions"><button type="submit" class="btn btn-primary btn-sm">حفظ التعديل</button>' +
          '<button type="button" class="btn btn-secondary btn-sm cancel-edit">إلغاء</button></div></form>'
        : "";
      return (
        '<article class="note-card" data-note="' + n.id + '">' +
          '<div class="note-head"><span class="badge ' + (n.confidence === "متأكد" ? "badge-available" : "badge-pending") + '">' + esc(n.kind) + "</span>" +
          '<span class="note-where">' + esc(lessonLabel(n)) + "</span></div>" +
          "<p><strong>محل الملاحظة:</strong> " + esc(n.target) + "</p>" +
          "<p><strong>التصحيح/الاقتراح:</strong> " + esc(n.correction) + "</p>" +
          (n.reason ? "<p><strong>السبب:</strong> " + esc(n.reason) + "</p>" : "") +
          '<div class="note-foot"><span class="note-meta">' + esc(n.confidence) + " • " + esc(fmtDate(n.updatedAt)) + "</span>" +
          '<span class="note-actions"><button type="button" class="link edit-note">تعديل</button> • ' +
          '<button type="button" class="link link-danger delete-note">حذف</button></span></div>' +
          editor +
        "</article>"
      );
    }).join("");
  }

  function refreshCounts() {
    var notes = loadNotes();
    document.querySelectorAll("[data-count-for]").forEach(function (el) {
      var c = notes.filter(function (n) { return n.lessonId === el.getAttribute("data-count-for"); }).length;
      el.textContent = c + " ملاحظات";
    });
  }

  function refresh() { renderNotes(); refreshCounts(); }

  function addNote(note) {
    var notes = loadNotes();
    counter += 1;
    note.id = "n" + Date.now().toString(36) + "-" + counter;
    var now = new Date().toISOString();
    note.createdAt = now;
    note.updatedAt = now;
    notes.push(note);
    if (!storeNotes(notes)) alert("تعذّر الحفظ في هذا المتصفح (قد تكون مساحة التخزين ممتلئة).");
    refresh();
  }

  // ---------- التصدير ----------
  function download(filename, text, mime) {
    var blob = new Blob([text], { type: mime + ";charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function exportJSON() {
    var notes = loadNotes();
    if (!notes.length) { alert("لا توجد ملاحظات لتصديرها بعد."); return; }
    download("tigre-review-notes.json", JSON.stringify({ exportedAt: new Date().toISOString(), count: notes.length, notes: notes }, null, 2), "application/json");
  }

  function exportMarkdown() {
    var notes = loadNotes();
    if (!notes.length) { alert("لا توجد ملاحظات لتصديرها بعد."); return; }
    var lines = ["# تقرير مراجعة منصة التغرية", "", "عدد الملاحظات: " + notes.length, "تاريخ التصدير: " + fmtDate(new Date().toISOString()), ""];
    var general = notes.filter(function (n) { return n.scope === "general"; });
    var byLesson = notes.filter(function (n) { return n.scope !== "general"; });
    if (general.length) {
      lines.push("## ملاحظات عامة", "");
      general.forEach(function (n, i) {
        lines.push("### " + (i + 1) + ". " + n.kind + " — " + n.topic, "- محل الملاحظة: " + n.target, "- التصحيح/الاقتراح: " + n.correction);
        if (n.reason) lines.push("- السبب: " + n.reason);
        lines.push("- الثقة: " + n.confidence, "");
      });
    }
    if (byLesson.length && window.CURRICULUM) {
      lines.push("## ملاحظات الدروس", "");
      window.CURRICULUM.forEach(function (stage, i) {
        var stageNotes = byLesson.filter(function (n) { return n.stageTitle === stage.title; });
        if (!stageNotes.length) return;
        lines.push("### المرحلة " + (i + 1) + ": " + stage.title, "");
        stageNotes.forEach(function (n) {
          lines.push("- **" + n.lessonTitle + " (" + n.code + ")** — " + n.kind, "  - محل الملاحظة: " + n.target, "  - التصحيح/الاقتراح: " + n.correction);
          if (n.reason) lines.push("  - السبب: " + n.reason);
          lines.push("  - الثقة: " + n.confidence, "");
        });
      });
    }
    download("tigre-review-notes.md", lines.join("\n"), "text/markdown");
  }

  // ---------- التهيئة ----------
  function init() {
    renderStages();
    renderNotes();

    // قائمة التحقق (تُحفظ محليًا)
    var checks = loadChecks();
    document.querySelectorAll(".check-list input[type=checkbox]").forEach(function (box, i) {
      box.checked = checks.indexOf(i) !== -1;
      box.addEventListener("change", function () {
        var cur = loadChecks();
        var pos = cur.indexOf(i);
        if (box.checked && pos === -1) cur.push(i);
        if (!box.checked && pos !== -1) cur.splice(pos, 1);
        storeChecks(cur);
      });
    });

    // نماذج الدروس (تفويض الأحداث)
    var host = document.getElementById("reviewStages");
    if (host) {
      host.addEventListener("click", function (e) {
        var t = e.target;
        if (t.classList.contains("toggle-form")) {
          var form = t.parentElement.querySelector(".note-form");
          if (form) { form.hidden = !form.hidden; t.textContent = form.hidden ? "أضف ملاحظة على هذا الدرس" : "إخفاء النموذج"; }
        }
        if (t.classList.contains("cancel-form")) {
          var f = t.closest("form");
          if (f) { f.reset(); f.hidden = true; var btn = f.parentElement.querySelector(".toggle-form"); if (btn) btn.textContent = "أضف ملاحظة على هذا الدرس"; }
        }
      });
      host.addEventListener("submit", function (e) {
        var form = e.target;
        if (!form.classList.contains("note-form")) return;
        e.preventDefault();
        var card = form.closest("[data-lesson]");
        var h3 = card.querySelector("h3");
        var codeEl = card.querySelector(".lesson-code");
        var stageTitle = card.closest("details").querySelector("summary strong").textContent.replace(/^المرحلة \d+: /, "");
        addNote({
          scope: "lesson",
          lessonId: card.getAttribute("data-lesson"),
          code: codeEl ? codeEl.textContent.replace("الدرس ", "") : "",
          lessonTitle: h3 ? h3.textContent : "",
          stageTitle: stageTitle,
          topic: "",
          kind: form.kind.value,
          target: form.target.value.trim(),
          correction: form.correction.value.trim(),
          reason: form.reason.value.trim(),
          confidence: form.confidence.value
        });
        form.reset();
        form.hidden = true;
        var btn = card.querySelector(".toggle-form");
        if (btn) btn.textContent = "أضف ملاحظة على هذا الدرس";
      });
    }

    // النموذج العام
    var gform = document.getElementById("generalForm");
    if (gform) {
      gform.addEventListener("submit", function (e) {
        e.preventDefault();
        addNote({
          scope: "general", lessonId: "", code: "", lessonTitle: "", stageTitle: "",
          topic: gform.topic.value,
          kind: gform.topic.value,
          target: gform.target.value.trim(),
          correction: gform.correction.value.trim(),
          reason: gform.reason.value.trim(),
          confidence: gform.confidence.value
        });
        gform.reset();
      });
    }

    // قائمة الملاحظات: تعديل وحذف
    var list = document.getElementById("notesList");
    if (list) {
      list.addEventListener("click", function (e) {
        var card = e.target.closest("[data-note]");
        if (!card) return;
        var id = card.getAttribute("data-note");
        if (e.target.classList.contains("delete-note")) {
          if (!confirm("حذف هذه الملاحظة نهائيًا؟")) return;
          storeNotes(loadNotes().filter(function (n) { return n.id !== id; }));
          if (editingId === id) editingId = null;
          refresh();
        }
        if (e.target.classList.contains("edit-note")) {
          editingId = (editingId === id) ? null : id;
          renderNotes();
        }
        if (e.target.classList.contains("cancel-edit")) { editingId = null; renderNotes(); }
      });
      list.addEventListener("submit", function (e) {
        var form = e.target;
        if (!form.classList.contains("edit-form")) return;
        e.preventDefault();
        var id = form.getAttribute("data-edit");
        var notes = loadNotes();
        var n = null;
        notes.forEach(function (x) { if (x.id === id) n = x; });
        if (!n) return;
        if (n.scope !== "general") n.kind = form.kind.value;
        else { n.topic = form.kind.value; n.kind = form.kind.value; }
        n.target = form.target.value.trim();
        n.correction = form.correction.value.trim();
        n.reason = form.reason.value.trim();
        n.confidence = form.confidence.value;
        n.updatedAt = new Date().toISOString();
        storeNotes(notes);
        editingId = null;
        refresh();
      });
    }

    var btnJson = document.getElementById("exportJson");
    if (btnJson) btnJson.addEventListener("click", exportJSON);
    var btnMd = document.getElementById("exportMd");
    if (btnMd) btnMd.addEventListener("click", exportMarkdown);
    var btnClear = document.getElementById("clearNotes");
    if (btnClear) btnClear.addEventListener("click", function () {
      if (!loadNotes().length) { alert("لا توجد ملاحظات لمسحها."); return; }
      if (!confirm("مسح جميع الملاحظات المحفوظة على هذا الجهاز؟ لا يمكن التراجع.")) return;
      storeNotes([]);
      editingId = null;
      refresh();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* =====================================================================
 * مساحة المراجعة متعددة الشاشات (ملحق — لا يحذف أي وظيفة سابقة أعلاه).
 * - نفس مفاتيح localStorage تمامًا: الملاحظات وقائمة التحقق متوافقة.
 * - كل كتلة تعمل فقط عند وجود عناصرها ( Guards ) فلا تتعارض مع الصفحات الأخرى.
 * ===================================================================== */
(function () {
  "use strict";

  var NOTES_KEY = "tigre-review-notes-v1";
  var KINDS = ["خطأ لغوي", "كتابة وإملاء", "ترجمة", "نطق", "معلومة غير دقيقة", "اقتراح تعليمي"];
  var CONFIDENCE = ["متأكد", "يحتاج إلى تحقق"];
  var counter = 0;
  var lessonEditingId = null;
  var currentLessonId = null;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function loadNotes() {
    try {
      var raw = localStorage.getItem(NOTES_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function storeNotes(notes) {
    try { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); return true; }
    catch (e) { return false; }
  }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleString("ar", { dateStyle: "medium", timeStyle: "short" }); }
    catch (e) { return ""; }
  }
  function findLesson(lid) {
    if (!window.CURRICULUM) return null;
    for (var i = 0; i < window.CURRICULUM.length; i++) {
      for (var j = 0; j < window.CURRICULUM[i].lessons.length; j++) {
        if ("lesson-" + (i + 1) + "-" + (j + 1) === lid) {
          return { stage: window.CURRICULUM[i], si: i, lesson: window.CURRICULUM[i].lessons[j], li: j, code: (i + 1) + "." + (j + 1) };
        }
      }
    }
    return null;
  }
  function lessonNotes(notes, lid) {
    return notes.filter(function (n) { return n.lessonId === lid; });
  }

  // ---------- شارة عدد الملاحظات في التنقل الفرعي ----------
  function paintBadge() {
    var n = loadNotes().length;
    document.querySelectorAll("[data-notes-badge]").forEach(function (el) {
      el.textContent = n ? String(n) : "";
      el.hidden = !n;
    });
  }

  // ---------- المركز الرئيسي: إحصاءات ----------
  function renderHub() {
    var host = document.getElementById("hubStats");
    if (!host) return;
    var notes = loadNotes();
    var lessons = {};
    notes.forEach(function (n) { if (n.scope !== "general" && n.lessonId) lessons[n.lessonId] = true; });
    var totalEl = document.getElementById("statNotes");
    var lessonsEl = document.getElementById("statLessons");
    if (totalEl) totalEl.textContent = String(notes.length);
    if (lessonsEl) lessonsEl.textContent = String(Object.keys(lessons).length);
  }

  // ---------- متصفح الدروس (review-lessons.html) ----------
  function stageNotesCount(notes, si) {
    var prefix = "lesson-" + (si + 1) + "-";
    return notes.filter(function (n) { return (n.lessonId || "").indexOf(prefix) === 0; }).length;
  }

  function showView(id) {
    ["viewStages", "viewStage", "viewLesson"].forEach(function (v) {
      var el = document.getElementById(v);
      if (el) el.hidden = (v !== id);
    });
    window.scrollTo(0, 0);
  }

  function renderStagesHome() {
    var host = document.getElementById("stageCards");
    if (!host || !window.CURRICULUM) return;
    var notes = loadNotes();
    host.innerHTML = window.CURRICULUM.map(function (stage, i) {
      var c = stageNotesCount(notes, i);
      return (
        '<a class="stage-card" href="#stage-' + (i + 1) + '">' +
          '<span class="step" aria-hidden="true">' + (i + 1) + "</span>" +
          "<span class=\"stage-card-text\"><strong>" + esc(stage.title) + "</strong>" +
          "<small>" + stage.lessons.length + " دروس" + (c ? " • " + c + " ملاحظات" : "") + "</small></span>" +
          '<span class="go" aria-hidden="true">←</span>' +
        "</a>"
      );
    }).join("");
  }

  function renderStageView(si) {
    var host = document.getElementById("stageLessonRows");
    var title = document.getElementById("stageViewTitle");
    var goal = document.getElementById("stageViewGoal");
    if (!host || !window.CURRICULUM || !window.CURRICULUM[si]) return false;
    var stage = window.CURRICULUM[si];
    var notes = loadNotes();
    if (title) title.textContent = "المرحلة " + (si + 1) + ": " + stage.title;
    if (goal) goal.textContent = stage.goal;
    host.innerHTML = stage.lessons.map(function (lesson, j) {
      var lid = "lesson-" + (si + 1) + "-" + (j + 1);
      var c = lessonNotes(notes, lid).length;
      return (
        '<a class="lesson-row" href="#lesson-' + (si + 1) + "-" + (j + 1) + '">' +
          "<span class=\"lesson-row-text\"><strong>" + esc(lesson.title) + "</strong>" +
          "<small>" + esc(lesson.goal) + "</small></span>" +
          '<span class="lesson-row-meta"><span class="badge badge-pending">قيد الإعداد</span>' +
          (c ? '<span class="notes-count">' + c + " ملاحظات</span>" : "") +
          '<span class="go" aria-hidden="true">←</span></span>' +
        "</a>"
      );
    }).join("");
    return true;
  }

  function contentBlock(lid) {
    var data = (window.LESSON_CONTENT && window.LESSON_CONTENT[lid]) || null;
    var parts = [];
    if (data) {
      if (data.bodyAr) parts.push("<h3>الشرح التوضيحي</h3><p>" + esc(data.bodyAr) + "</p>");
      if (data.examples && data.examples.length) {
        parts.push("<h3>الأمثلة المعتمدة (" + data.examples.length + ")</h3>" + data.examples.map(function (ex) {
          return '<div class="example-row"><p class="tigre-text" dir="ltr">' + esc(ex.tigre || "") + "</p>" +
            "<p>" + esc(ex.arabic || "") + (ex.note ? " <small>(" + esc(ex.note) + ")</small>" : "") + "</p></div>";
        }).join(""));
      }
      if (data.audio) parts.push('<h3>التسجيل الصوتي</h3><audio controls src="' + esc(data.audio) + '">متصفحك لا يدعم تشغيل الصوت.</audio>');
      if (data.sources && data.sources.length) parts.push('<p class="mock-caption">المصادر الموثقة: ' + data.sources.length + "</p>");
    }
    if (!parts.length) {
      return '<div class="content-empty"><h3>لا يوجد محتوى لغوي بعد</h3>' +
        "<p>لم يُكتب محتوى هذا الدرس أو يُعتمد بعد — ولهذا تظهر حالته «قيد الإعداد». " +
        "إن كنت ترى ما ينبغي إضافته أو مراجعته هنا (موضوع، مفردات، أمثلة، نطق)، سجّله في نموذج الملاحظة أدناه.</p></div>";
    }
    return '<div class="content-real">' + parts.join("") + "</div>";
  }

  function noteCardHtml(n) {
    var editor = (lessonEditingId === n.id)
      ? '<form class="note-form edit-form" data-edit="' + n.id + '">' +
        '<label>نوع الملاحظة<select name="kind">' + KINDS.map(function (k) { return "<option" + (k === n.kind ? " selected" : "") + ">" + k + "</option>"; }).join("") + "</select></label>" +
        '<label>النص أو العنصر محل الملاحظة<textarea name="target" rows="2" required>' + esc(n.target) + "</textarea></label>" +
        '<label>التصحيح أو الاقتراح<textarea name="correction" rows="2" required>' + esc(n.correction) + "</textarea></label>" +
        '<label>سبب التعديل أو الشرح<textarea name="reason" rows="2">' + esc(n.reason) + "</textarea></label>" +
        '<label>درجة الثقة<select name="confidence">' + CONFIDENCE.map(function (c) { return "<option" + (c === n.confidence ? " selected" : "") + ">" + c + "</option>"; }).join("") + "</select></label>" +
        '<div class="form-actions"><button type="submit" class="btn btn-primary btn-sm">حفظ التعديل</button>' +
        '<button type="button" class="btn btn-secondary btn-sm cancel-edit">إلغاء</button></div></form>'
      : "";
    return (
      '<article class="note-card" data-note="' + n.id + '">' +
        '<div class="note-head"><span class="badge ' + (n.confidence === "متأكد" ? "badge-available" : "badge-pending") + '">' + esc(n.kind) + "</span></div>" +
        "<p><strong>محل الملاحظة:</strong> " + esc(n.target) + "</p>" +
        "<p><strong>التصحيح/الاقتراح:</strong> " + esc(n.correction) + "</p>" +
        (n.reason ? "<p><strong>السبب:</strong> " + esc(n.reason) + "</p>" : "") +
        '<div class="note-foot"><span class="note-meta">' + esc(n.confidence) + " • " + esc(fmtDate(n.updatedAt)) + "</span>" +
        '<span class="note-actions"><button type="button" class="link edit-note">تعديل</button> • ' +
        '<button type="button" class="link link-danger delete-note">حذف</button></span></div>' +
        editor +
      "</article>"
    );
  }

  function renderLessonNotes() {
    var host = document.getElementById("lessonNotesList");
    var count = document.getElementById("lessonNotesCount");
    if (!host || !currentLessonId) return;
    var list = lessonNotes(loadNotes(), currentLessonId)
      .sort(function (a, b) { return (b.updatedAt || "").localeCompare(a.updatedAt || ""); });
    if (count) count.textContent = list.length ? ("ملاحظات هذا الدرس: " + list.length) : "لا ملاحظات على هذا الدرس بعد";
    host.innerHTML = list.length ? list.map(noteCardHtml).join("")
      : '<p class="empty-notes">لا ملاحظات بعد — كن أول من يراجع هذا الدرس.</p>';
  }

  function renderLessonView(lid) {
    var found = findLesson(lid);
    if (!found) return false;
    currentLessonId = lid;
    lessonEditingId = null;
    var t = document.getElementById("lessonViewTitle");
    var g = document.getElementById("lessonViewGoal");
    var m = document.getElementById("lessonViewMeta");
    var c = document.getElementById("lessonContent");
    var back = document.getElementById("lessonBackLink");
    if (t) t.textContent = "الدرس " + found.code + ": " + found.lesson.title;
    if (g) g.textContent = found.lesson.goal;
    if (m) m.innerHTML = '<span class="lesson-code">الدرس ' + found.code + '</span> <span class="badge badge-pending">قيد الإعداد</span> <span class="muted-note">المرحلة ' + (found.si + 1) + ": " + esc(found.stage.title) + "</span>";
    if (c) c.innerHTML = contentBlock(lid);
    if (back) back.href = "#stage-" + (found.si + 1);
    var form = document.getElementById("lessonNoteForm");
    if (form) { form.reset(); }
    renderLessonNotes();
    return true;
  }

  function routeLessons() {
    if (!document.getElementById("viewStages")) return;
    var h = (location.hash || "").replace("#", "");
    var mStage = h.match(/^stage-(\d+)$/);
    var mLesson = h.match(/^lesson-(\d+)-(\d+)$/);
    if (mLesson) {
      var lid = "lesson-" + mLesson[1] + "-" + mLesson[2];
      if (renderLessonView(lid)) { showLessonView("viewLesson"); return; }
    } else if (mStage) {
      var si = parseInt(mStage[1], 10) - 1;
      if (renderStageView(si)) { showLessonView("viewStage"); return; }
    }
    renderStagesHome();
    showLessonView("viewStages");
  }

  function showLessonView(id) {
    ["viewStages", "viewStage", "viewLesson"].forEach(function (v) {
      var el = document.getElementById(v);
      if (el) el.hidden = (v !== id);
    });
    window.scrollTo(0, 0);
  }

  function initReviewPlus() {
    paintBadge();
    renderHub();
    renderStagesHome();
    routeLessons();
    window.addEventListener("hashchange", routeLessons);
    window.addEventListener("storage", function (e) {
      if (!e.key || e.key === NOTES_KEY) { paintBadge(); renderHub(); renderStagesHome(); routeLessons(); }
    });

    // نموذج ملاحظة شاشة الدرس
    var lform = document.getElementById("lessonNoteForm");
    if (lform) {
      lform.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!currentLessonId) return;
        var found = findLesson(currentLessonId);
        if (!found) return;
        var notes = loadNotes();
        counter += 1;
        var now = new Date().toISOString();
        notes.push({
          id: "n" + Date.now().toString(36) + "-" + counter,
          createdAt: now, updatedAt: now,
          scope: "lesson", lessonId: currentLessonId, code: found.code,
          lessonTitle: found.lesson.title, stageTitle: found.stage.title, topic: "",
          kind: lform.kind.value,
          target: lform.target.value.trim(),
          correction: lform.correction.value.trim(),
          reason: lform.reason.value.trim(),
          confidence: lform.confidence.value
        });
        if (!storeNotes(notes)) alert("تعذّر الحفظ في هذا المتصفح (قد تكون مساحة التخزين ممتلئة).");
        lform.reset();
        renderLessonNotes();
        renderStagesHome();
        paintBadge();
      });
    }

    // تعديل/حذف ملاحظات شاشة الدرس (نفس شكل البيانات دون تغيير)
    var llist = document.getElementById("lessonNotesList");
    if (llist) {
      llist.addEventListener("click", function (e) {
        var card = e.target.closest("[data-note]");
        if (!card) return;
        var id = card.getAttribute("data-note");
        if (e.target.classList.contains("delete-note")) {
          if (!confirm("حذف هذه الملاحظة نهائيًا؟")) return;
          storeNotes(loadNotes().filter(function (n) { return n.id !== id; }));
          if (lessonEditingId === id) lessonEditingId = null;
          renderLessonNotes();
          renderStagesHome();
          paintBadge();
        }
        if (e.target.classList.contains("edit-note")) {
          lessonEditingId = (lessonEditingId === id) ? null : id;
          renderLessonNotes();
        }
        if (e.target.classList.contains("cancel-edit")) { lessonEditingId = null; renderLessonNotes(); }
      });
      llist.addEventListener("submit", function (e) {
        var form = e.target;
        if (!form.classList.contains("edit-form")) return;
        e.preventDefault();
        var id = form.getAttribute("data-edit");
        var notes = loadNotes();
        var n = null;
        notes.forEach(function (x) { if (x.id === id) n = x; });
        if (!n) return;
        n.kind = form.kind.value;
        n.target = form.target.value.trim();
        n.correction = form.correction.value.trim();
        n.reason = form.reason.value.trim();
        n.confidence = form.confidence.value;
        n.updatedAt = new Date().toISOString();
        storeNotes(notes);
        lessonEditingId = null;
        renderLessonNotes();
        paintBadge();
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initReviewPlus);
  else initReviewPlus();
})();
