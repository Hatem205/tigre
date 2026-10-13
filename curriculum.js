// بيانات المنهج التعليمي — تنظيم أولي قابل للمراجعة، وليس منهجًا لغويًا معتمدًا.
// لا يوجد أي محتوى لغوي بالتغرية هنا؛ كل الدروس "قيد الإعداد" حتى يُتحقق من محتواها.
var CURRICULUM = [
  {
    id: "stage-1",
    title: "التعرف إلى اللغة ونظام كتابتها",
    goal: "تكوين صورة عامة عن التغرية وأهداف المسار، والتعرف إلى نظام الكتابة وكيفية استخدام المنصة.",
    lessons: [
      { title: "لماذا تتعلم التغرية؟", goal: "تحديد هدفك الشخصي وفهم خارطة الطريق." },
      { title: "التعرف إلى نظام الكتابة", goal: "التعرف إلى شكل الحروف واتجاه الكتابة." },
      { title: "كيف تستخدم المنصة؟", goal: "فهم طريقة الدروس والبطاقات والمراجعة." }
    ]
  },
  {
    id: "stage-2",
    title: "الأصوات والنطق",
    goal: "التدرب على الاستماع والتمييز بين الأصوات والنطق الصحيح قبل حفظ المفردات.",
    lessons: [
      { title: "التمييز بين الأصوات", goal: "التدرب على سماع الفروق الصوتية الأساسية." },
      { title: "التدرب على النطق", goal: "تقليد النطق الصحيح بالتكرار الموجه." },
      { title: "القراءة الأولى بثقة", goal: "قراءة مقاطع قصيرة بنطق سليم." }
    ]
  },
  {
    id: "stage-3",
    title: "المفردات الأساسية",
    goal: "بناء حصيلة أولى من الكلمات والعبارات اليومية ضمن سياقات واضحة.",
    lessons: [
      { title: "مفردات التحية والتعارف", goal: "التعبير عن التحية وتقديم النفس." },
      { title: "كلمات الحياة اليومية", goal: "تسمية الأشياء والأنشطة المعتادة." },
      { title: "العبارات الأكثر استعمالًا", goal: "حفظ عبارات جاهزة لمواقف متكررة." }
    ]
  },
  {
    id: "stage-4",
    title: "تكوين الجمل والتراكيب",
    goal: "الانتقال من المفردات إلى بناء جمل بسيطة ثم تطويرها تدريجيًا.",
    lessons: [
      { title: "تركيب الجملة البسيطة", goal: "فهم ترتيب عناصر الجملة الأساسية." },
      { title: "السؤال والنفي", goal: "صياغة الأسئلة والجمل المنفية." },
      { title: "الوصف والأفعال اليومية", goal: "وصف الأشياء والتحدث عن الأفعال المعتادة." }
    ]
  },
  {
    id: "stage-5",
    title: "المحادثات والمواقف اليومية",
    goal: "التدرب على حوارات قصيرة لمواقف حقيقية: التعارف والسؤال والطلب.",
    lessons: [
      { title: "حوار التعارف", goal: "إجراء محادثة تعارف كاملة بثقة." },
      { title: "في السوق والمقهى", goal: "التعامل مع مواقف الشراء والطلب." },
      { title: "السؤال عن الاتجاهات والمواعيد", goal: "طلب المعلومات وفهم الإجابات." }
    ]
  },
  {
    id: "stage-6",
    title: "المراجعة والتطبيق",
    goal: "تثبيت ما تعلمته وقياس مستواك ورسم خطة المواصلة بعد الأساسيات.",
    lessons: [
      { title: "مراجعة شاملة للمراحل", goal: "استعادة أهم ما ورد في المراحل السابقة." },
      { title: "تقييم المستوى", goal: "اختبار تجريبي لقياس الفهم والتذكر." },
      { title: "خطة المواصلة", goal: "تحديد الخطوات التالية بعد إتمام الأساسيات." }
    ]
  }
];

// عرض البيانات — دون أي حفظ أو وظائف وهمية.
(function () {
  var root = document.getElementById("stagesRoot");
  var chips = document.getElementById("stageChips");
  if (!root || !window.CURRICULUM) return;

  var total = 0;

  CURRICULUM.forEach(function (stage, i) {
    total += stage.lessons.length;

    if (chips) {
      var chip = document.createElement("a");
      chip.className = "chip-link";
      chip.href = "#" + stage.id;
      chip.textContent = (i + 1) + ". " + stage.title;
      chips.appendChild(chip);
    }

    var section = document.createElement("section");
    section.className = "stage";
    section.id = stage.id;
    section.setAttribute("aria-labelledby", stage.id + "-title");

    var head = document.createElement("div");
    head.className = "stage-head";

    var num = document.createElement("span");
    num.className = "step";
    num.setAttribute("aria-hidden", "true");
    num.textContent = String(i + 1);

    var headText = document.createElement("div");
    headText.className = "stage-head-text";
    var kicker = document.createElement("p");
    kicker.className = "kicker";
    kicker.textContent = "المرحلة " + (i + 1) + " من " + CURRICULUM.length;
    var h = document.createElement("h2");
    h.id = stage.id + "-title";
    h.textContent = stage.title;
    var goal = document.createElement("p");
    goal.className = "stage-goal";
    goal.textContent = stage.goal;
    headText.appendChild(kicker);
    headText.appendChild(h);
    headText.appendChild(goal);

    var status = document.createElement("span");
    status.className = "badge badge-pending";
    status.textContent = "قيد الإعداد";

    head.appendChild(num);
    head.appendChild(headText);
    head.appendChild(status);
    section.appendChild(head);

    var grid = document.createElement("div");
    grid.className = "lessons";
    stage.lessons.forEach(function (lesson, j) {
      var card = document.createElement("article");
      card.className = "lesson lesson-pending";

      var t = document.createElement("h3");
      t.textContent = lesson.title;
      var g = document.createElement("p");
      g.textContent = lesson.goal;

      var meta = document.createElement("div");
      meta.className = "lesson-meta";
      var code = document.createElement("span");
      code.className = "lesson-code";
      code.textContent = "الدرس " + (i + 1) + "." + (j + 1);
      var b = document.createElement("span");
      b.className = "badge badge-pending";
      b.textContent = "قيد الإعداد";
      meta.appendChild(code);
      meta.appendChild(b);

      var btn = document.createElement("span");
      btn.className = "btn btn-ghost btn-sm";
      btn.setAttribute("aria-disabled", "true");
      btn.textContent = "سيتوفر لاحقًا";

      card.appendChild(t);
      card.appendChild(g);
      card.appendChild(meta);
      card.appendChild(btn);
      grid.appendChild(card);
    });
    section.appendChild(grid);
    root.appendChild(section);
  });

  // عدّادات صادقة: كل الدروس قيد الإعداد.
  var totalEl = document.getElementById("totalLessons");
  if (totalEl) totalEl.textContent = String(total);
  var totalEl2 = document.getElementById("totalLessons2");
  if (totalEl2) totalEl2.textContent = String(total);
})();
