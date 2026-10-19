// بيانات حروف اللغة التغرية (الخط الجancellable) — ملف مستقل قابل للتعديل.
// كل حرف: base, name, latin, arabicApprox, forms, reviewStatus.
// reviewStatus: "pending" = بانتظار مراجعة المختص, "verified" = تم التحقق.
// الأشكال (forms) هي أشكال الحرف مع الحركات السبع (ä,u,i,a,e,ə,o).

var TIGRE_LETTER_SOURCES = [
  { key: "everyalphabet", label: "EveryAlphabet — Tigre", url: "https://www.everyalphabet.com/tigre" },
  { key: "omniglot", label: "Omniglot — Tigre (أرشيف Wayback)", url: "https://web.archive.org/web/2024/https://www.omniglot.com/writing/tigre.htm" },
  { key: "speaktigre", label: "Speak Tigre — أرشيف مصادر", url: "https://www.speaktigre.com/" },
  { key: "unicode", label: "Unicode — Ethiopic Chart (U+1200)", url: "https://www.unicode.org/charts/PDF/U1200.pdf" }
];

var TIGRE_LETTERS = [
  { base: "ሀ", name: "Ha", latin: "h", arabicApprox: "هـ", forms: ["ሀ","ሁ","ሂ","ሃ","ሄ","ህ","ሆ"], reviewStatus: "pending" },
  { base: "ለ", name: "La", latin: "l", arabicApprox: "ل", forms: ["ለ","ሉ","ሊ","ላ","ሌ","ል","ሎ"], reviewStatus: "pending" },
  { base: "ሐ", name: "Ḥa", latin: "ḥ", arabicApprox: "ح", forms: ["ሐ","ሑ","ሒ","ሓ","ሔ","ሕ","ሖ"], reviewStatus: "pending" },
  { base: "መ", name: "Ma", latin: "m", arabicApprox: "م", forms: ["መ","ሙ","ሚ","ማ","ሜ","ም","ሞ"], reviewStatus: "pending" },
  { base: "ሠ", name: "Śa", latin: "ś", arabicApprox: "س", forms: ["ሠ","ሡ","ሢ","ሣ","ሤ","ሥ","ሦ"], reviewStatus: "pending" },
  { base: "ረ", name: "Ra", latin: "r", arabicApprox: "ر", forms: ["ረ","ሩ","ሪ","ራ","ሬ","ር","ሮ"], reviewStatus: "pending" },
  { base: "ሰ", name: "Sa", latin: "s", arabicApprox: "س", forms: ["ሰ","ሱ","ሲ","ሳ","ሴ","ስ","ሶ"], reviewStatus: "pending" },
  { base: "ሸ", name: "Ša", latin: "š", arabicApprox: "ش", forms: ["ሸ","ሹ","ሺ","ሻ","ሼ","ሽ","ሾ"], reviewStatus: "pending" },
  { base: "ቀ", name: "Ḳa", latin: "ḳ", arabicApprox: "ق", forms: ["ቀ","ቁ","ቂ","ቃ","ቄ","ቅ","ቆ"], reviewStatus: "pending" },
  { base: "ቐ", name: "Q'a", latin: "q'", arabicApprox: "ق", forms: ["ቐ","ቑ","ቒ","ቓ","ቔ","ቕ","ቖ"], reviewStatus: "pending" },
  { base: "በ", name: "Ba", latin: "b", arabicApprox: "ب", forms: ["በ","ቡ","ቢ","ባ","ቤ","ብ","ቦ"], reviewStatus: "pending" },
  { base: "ተ", name: "Ta", latin: "t", arabicApprox: "ت", forms: ["ተ","ቱ","ቲ","ታ","ቴ","ት","ቶ"], reviewStatus: "pending" },
  { base: "ቸ", name: "Ča", latin: "č", arabicApprox: "تش", forms: ["ቸ","ቹ","ቺ","ቻ","ቼ","ች","ቾ"], reviewStatus: "pending" },
  { base: "ኀ", name: "Ḫa", latin: "ḫ", arabicApprox: "ح", forms: ["ኀ","ኁ","ኂ","ኃ","ኄ","ኅ","ኆ"], reviewStatus: "pending" },
  { base: "ነ", name: "Na", latin: "n", arabicApprox: "ن", forms: ["ነ","ኑ","ኒ","ና","ኔ","ን","ኖ"], reviewStatus: "pending" },
  { base: "ኘ", name: "Ña", latin: "ñ", arabicApprox: "ن", forms: ["ኘ","ኙ","ኚ","ኛ","ኜ","ኝ","ኞ"], reviewStatus: "pending" },
  { base: "ወ", name: "Wa", latin: "w", arabicApprox: "و", forms: ["ወ","ዉ","ዊ","ዋ","ዌ","ው","ዎ"], reviewStatus: "pending" },
  { base: "ዐ", name: "ʿA", latin: "ʿ", arabicApprox: "ع", forms: ["ዐ","ዑ","ዒ","ዓ","ዔ","ዕ","ዖ"], reviewStatus: "pending" },
  { base: "ዘ", name: "Za", latin: "z", arabicApprox: "ز", forms: ["ዘ","ዙ","ዚ","ዛ","ዜ","ዝ","ዞ"], reviewStatus: "pending" },
  { base: "የ", name: "Ya", latin: "y", arabicApprox: "ي", forms: ["የ","ዩ","ዪ","ያ","ዬ","ይ","ዮ"], reviewStatus: "pending" },
  { base: "ደ", name: "Da", latin: "d", arabicApprox: "د", forms: ["ደ","ዱ","ዲ","ዳ","ዴ","ድ","ዶ"], reviewStatus: "pending" },
  { base: "ጀ", name: "Ǧa", latin: "ǧ", arabicApprox: "ج", forms: ["ጀ","ጁ","ጂ","ጃ","ጄ","ጅ","ጆ"], reviewStatus: "pending" },
  { base: "ገ", name: "Ga", latin: "g", arabicApprox: "گ", forms: ["ገ","ጉ","ጊ","ጋ","ጌ","ግ","ጎ"], reviewStatus: "pending" },
  { base: "ጠ", name: "Ṭa", latin: "ṭ", arabicApprox: "ط", forms: ["ጠ","ጡ","ጢ","ጣ","ጤ","ጥ","ጦ"], reviewStatus: "pending" },
  { base: "ጨ", name: "Č̣a", latin: "č̣", arabicApprox: "تش", forms: ["ጨ","ጩ","ጪ","ጫ","ጬ","ጭ","ጮ"], reviewStatus: "pending" },
  { base: "ጰ", name: "P̣a", latin: "p̣", arabicApprox: "پ", forms: ["ጰ","ጱ","ጲ","ጳ","ጴ","ጵ","ጶ"], reviewStatus: "pending" },
  { base: "ጸ", name: "Ṣa", latin: "ṣ", arabicApprox: "ص", forms: ["ጸ","ጹ","ጺ","ጻ","ጼ","ጽ","ጾ"], reviewStatus: "pending" },
  { base: "ፀ", name: "Ṣ̄a", latin: "ṣ̄", arabicApprox: "ص", forms: ["ፀ","ፁ","ፂ","ፃ","ፄ","ፅ","ፆ"], reviewStatus: "pending" },
  { base: "ፈ", name: "Fa", latin: "f", arabicApprox: "ف", forms: ["ፈ","ፉ","ፊ","ፋ","ፌ","ፍ","ፎ"], reviewStatus: "pending" },
  { base: "ፐ", name: "Pa", latin: "p", arabicApprox: "پ", forms: ["ፐ","ፑ","ፒ","ፓ","ፔ","ፕ","ፖ"], reviewStatus: "pending" },
  { base: "ከ", name: "Ka", latin: "k", arabicApprox: "ك", forms: ["ከ","ኩ","ኪ","ካ","ኬ","ክ","ኮ"], reviewStatus: "pending" },
  { base: "ኸ", name: "Xa", latin: "x", arabicApprox: "خ", forms: ["ኸ","ኹ","ኺ","ኻ","ኼ","ኽ","ኾ"], reviewStatus: "pending" }
];
