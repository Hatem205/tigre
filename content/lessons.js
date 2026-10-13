/* =====================================================================
 * بنية المحتوى اللغوي لمنصة تعلّم التغرية — ملف بيانات مستقل.
 *
 * - هذا الملف منفصل عن كود العرض (curriculum.js يعرض البطاقات فقط).
 * - الربط مستقبلًا عبر المعرّف الثابت لكل درس: "lesson-{المرحلة}-{الدرس}"
 *   وهو يطابق رقم "الدرس س.د" المعروض على البطاقات (مثال: lesson-3-1).
 * - القاعدة الصارمة: تبقى حقول الأمثلة والنطق فارغة حتى التحقق من مصدر
 *   موثوق وفق CONTENT_GUIDELINES.md. يُمنع ملؤها باجتهادات أو تخمينات.
 * ===================================================================== */

// حالات المراجعة المعتمدة (لا تُستخدم أي حالة أخرى):
//   "draft"        → مسودة
//   "needs-review" → يحتاج إلى تحقق
//   "reviewed"     → تمت مراجعته
//   "approved"     → معتمد للنشر (وحدها تتيح وسم الدرس "متاح" في الواجهة)
var REVIEW_STATUS_LABELS = {
  "draft": "مسودة",
  "needs-review": "يحتاج إلى تحقق",
  "reviewed": "تمت مراجعته",
  "approved": "معتمد للنشر"
};

// قالب الدرس (للتوثيق — كل درس أدناه يلتزم بهذا الشكل):
// {
//   id: "lesson-1-1",        // معرّف ثابت لا يتغير
//   stage: 1,                // رقم المرحلة (1-6)
//   lesson: 1,               // رقم الدرس داخل المرحلة
//   titleAr: "",             // العنوان العربي
//   goalAr: "",              // الهدف التعليمي بالعربية
//   bodyAr: "",              // المحتوى العربي التوضيحي (فارغ حتى الإعداد)
//   examples: [],            // أمثلة { tigre, arabic, note } — فارغة حتى التحقق
//   audio: null,             // مسار التسجيل الصوتي عند توفره (null حاليًا)
//   sources: [],             // مصادر { reference, dialect, script } — فارغة حاليًا
//   reviewStatus: "draft"    // حالة المراجعة (الكل "draft" الآن)
// }

var LESSON_CONTENT = {
  "lesson-1-1": { id: "lesson-1-1", stage: 1, lesson: 1, titleAr: "لماذا تتعلم التغرية؟", goalAr: "تحديد هدفك الشخصي وفهم خارطة الطريق.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-1-2": { id: "lesson-1-2", stage: 1, lesson: 2, titleAr: "التعرف إلى نظام الكتابة", goalAr: "التعرف إلى شكل الحروف واتجاه الكتابة.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-1-3": { id: "lesson-1-3", stage: 1, lesson: 3, titleAr: "كيف تستخدم المنصة؟", goalAr: "فهم طريقة الدروس والبطاقات والمراجعة.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },

  "lesson-2-1": { id: "lesson-2-1", stage: 2, lesson: 1, titleAr: "التمييز بين الأصوات", goalAr: "التدرب على سماع الفروق الصوتية الأساسية.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-2-2": { id: "lesson-2-2", stage: 2, lesson: 2, titleAr: "التدرب على النطق", goalAr: "تقليد النطق الصحيح بالتكرار الموجه.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-2-3": { id: "lesson-2-3", stage: 2, lesson: 3, titleAr: "القراءة الأولى بثقة", goalAr: "قراءة مقاطع قصيرة بنطق سليم.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },

  "lesson-3-1": { id: "lesson-3-1", stage: 3, lesson: 1, titleAr: "مفردات التحية والتعارف", goalAr: "التعبير عن التحية وتقديم النفس.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-3-2": { id: "lesson-3-2", stage: 3, lesson: 2, titleAr: "كلمات الحياة اليومية", goalAr: "تسمية الأشياء والأنشطة المعتادة.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-3-3": { id: "lesson-3-3", stage: 3, lesson: 3, titleAr: "العبارات الأكثر استعمالًا", goalAr: "حفظ عبارات جاهزة لمواقف متكررة.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },

  "lesson-4-1": { id: "lesson-4-1", stage: 4, lesson: 1, titleAr: "تركيب الجملة البسيطة", goalAr: "فهم ترتيب عناصر الجملة الأساسية.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-4-2": { id: "lesson-4-2", stage: 4, lesson: 2, titleAr: "السؤال والنفي", goalAr: "صياغة الأسئلة والجمل المنفية.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-4-3": { id: "lesson-4-3", stage: 4, lesson: 3, titleAr: "الوصف والأفعال اليومية", goalAr: "وصف الأشياء والتحدث عن الأفعال المعتادة.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },

  "lesson-5-1": { id: "lesson-5-1", stage: 5, lesson: 1, titleAr: "حوار التعارف", goalAr: "إجراء محادثة تعارف كاملة بثقة.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-5-2": { id: "lesson-5-2", stage: 5, lesson: 2, titleAr: "في السوق والمقهى", goalAr: "التعامل مع مواقف الشراء والطلب.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-5-3": { id: "lesson-5-3", stage: 5, lesson: 3, titleAr: "السؤال عن الاتجاهات والمواعيد", goalAr: "طلب المعلومات وفهم الإجابات.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },

  "lesson-6-1": { id: "lesson-6-1", stage: 6, lesson: 1, titleAr: "مراجعة شاملة للمراحل", goalAr: "استعادة أهم ما ورد في المراحل السابقة.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-6-2": { id: "lesson-6-2", stage: 6, lesson: 2, titleAr: "تقييم المستوى", goalAr: "اختبار تجريبي لقياس الفهم والتذكر.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" },
  "lesson-6-3": { id: "lesson-6-3", stage: 6, lesson: 3, titleAr: "خطة المواصلة", goalAr: "تحديد الخطوات التالية بعد إتمام الأساسيات.", bodyAr: "", examples: [], audio: null, sources: [], reviewStatus: "draft" }
};
