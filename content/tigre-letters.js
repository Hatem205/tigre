// بيانات حروف اللغة التغرية (الخط الجعزي) — ملف مستقل قابل للتعديل.
// كل حرف: base, name, latin, arabicApprox, forms ( verified shapes only ), group, sources, source, reviewStatus.
// reviewStatus: "pending" = بانتظار مراجعة المختص, "verified" = تم التحقق.
// ملاحظة: تقريب النطق بالعربية مساعد فقط، وليس بديلًا عن النطق الأصلي.
// الأشكال (forms) هي أشكال الحرف مع الحركات السبع (ä,u,i,a,e,ə,o) كما في الجداول المرجعية للتغرية.
// المصادر (sources): مفاتيح في TIGRE_LETTER_SOURCES (أسفل). لا تُعتبر any مجموعة كاملة إلا بعد مقارنة المصادر.

var TIGRE_LETTER_SOURCES = [
  { key: "everyalphabet", label: "EveryAlphabet — Tigre", url: "https://www.everyalphabet.com/tigre" },
  { key: "omniglot", label: "Omniglot — Tigre (أرشيف Wayback)", url: "https://web.archive.org/web/2024/https://www.omniglot.com/writing/tigre.htm" },
  { key: "speaktigre", label: "Speak Tigre — أرشيف مصادر", url: "https://www.speaktigre.com/" },
  { key: "unicode", label: "Unicode — Ethiopic Chart (U+1200)", url: "https://www.unicode.org/charts/PDF/U1200.pdf" }
];

var TIGRE_LETTERS = [
  { base: "ሀ", name: "Ha", latin: "h", arabicApprox: "هـ", forms: ["ሀ","ሁ","ሂ","ሃ","ሄ","ህ","ሆ"], group: "fricatives", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ለ", name: "La", latin: "l", arabicApprox: "ل", forms: ["ለ","ሉ","ሊ","ላ","ሌ","ል","ሎ"], group: "liquids", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ሐ", name: "Ḥa", latin: "ḥ", arabicApprox: "ح", forms: ["ሐ","ሑ","ሒ","ሓ","ሔ","ሕ","ሖ"], group: "fricatives", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "መ", name: "Ma", latin: "m", arabicApprox: "م", forms: ["መ","ሙ","ሚ","ማ","ሜ","ም","ሞ"], group: "nasals", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ረ", name: "Ra", latin: "r", arabicApprox: "ر", forms: ["ረ","ሩ","ሪ","ራ","ሬ","ር","ሮ"], group: "liquids", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ሰ", name: "Sa", latin: "s", arabicApprox: "س", forms: ["ሰ","ሱ","ሲ","ሳ","ሴ","ስ","ሶ"], group: "fricatives", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ሸ", name: "Ša", latin: "š", arabicApprox: "ش", forms: ["ሸ","ሹ","ሺ","ሻ","ሼ","ሽ","ሾ"], group: "fricatives", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ቀ", name: "Ḳa", latin: "ḳ", arabicApprox: "ق (أعماق)", forms: ["ቀ","ቁ","ቂ","ቃ","ቄ","ቅ","ቆ"], group: "stops", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "በ", name: "Ba", latin: "b", arabicApprox: "ب", forms: ["በ","ቡ","ቢ","ባ","ቤ","ብ","ቦ"], group: "stops", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ተ", name: "Ta", latin: "t", arabicApprox: "ت", forms: ["ተ","ቱ","ቲ","ታ","ቴ","ት","ቶ"], group: "stops", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ቸ", name: "Ča", latin: "č", arabicApprox: "تش", forms: ["ቸ","ቹ","ቺ","ቻ","ቼ","ች","ቾ"], group: "affricates", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ነ", name: "Na", latin: "n", arabicApprox: "ن", forms: ["ነ","ኑ","ኒ","ና","ኔ","ን","ኖ"], group: "nasals", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ወ", name: "Wa", latin: "w", arabicApprox: "و", forms: ["ወ","ዉ","ዊ","ዋ","ዌ","ው","ዎ"], group: "liquids", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ዐ", name: "ʿA", latin: "ʿ", arabicApprox: "ع", forms: ["ዐ","ዑ","ዒ","ዓ","ዔ","ዕ","ዖ"], group: "fricatives", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ዘ", name: "Za", latin: "z", arabicApprox: "ز", forms: ["ዘ","ዙ","ዚ","ዛ","ዜ","ዝ","ዞ"], group: "fricatives", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "የ", name: "Ya", latin: "y", arabicApprox: "ي", forms: ["የ","ዩ","ዪ","ያ","ዬ","ይ","ዮ"], group: "liquids", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ደ", name: "Da", latin: "d", arabicApprox: "د", forms: ["ደ","ዱ","ዲ","ዳ","ዴ","ድ","ዶ"], group: "stops", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ገ", name: "Ga", latin: "g", arabicApprox: "گ", forms: ["ገ","ጉ","ጊ","ጋ","ጌ","ግ","ጎ"], group: "stops", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ጠ", name: "Ṭa", latin: "ṭ", arabicApprox: "ط", forms: ["ጠ","ጡ","ጢ","ጣ","ጤ","ጥ","ጦ"], group: "stops", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ጨ", name: "Č̣a", latin: "č̣", arabicApprox: "تش (مقذوف)", forms: ["ጨ","ጩ","ጪ","ጫ","ጬ","ጭ","ጮ"], group: "affricates", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ጰ", name: "P̣a", latin: "p̣", arabicApprox: "پ (مقذوف)", forms: ["ጰ","ጱ","ጲ","ጳ","ጴ","ጵ","ጶ"], group: "stops", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ጸ", name: "Ṣa", latin: "ṣ", arabicApprox: "ص (مقذوف)", forms: ["ጸ","ጹ","ጺ","ጻ","ጼ","ጽ","ጾ"], group: "affricates", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ፈ", name: "Fa", latin: "f", arabicApprox: "ف", forms: ["ፈ","ፉ","ፊ","ፋ","ፌ","ፍ","ፎ"], group: "fricatives", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" },
  { base: "ከ", name: "Ka", latin: "k", arabicApprox: "ك", forms: ["ከ","ኩ","ኪ","ካ","ኬ","ክ","ኮ"], group: "stops", sources: ["everyalphabet","omniglot","unicode"], source: "Omniglot (Tigre) + Wikipedia (Tigre Ge'ez script)", reviewStatus: "pending" }
];
