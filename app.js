// ArenaKali Main Application Logic
const QUESTIONS_PER_ROUND = 10;
const XP_PER_LEVEL = 250;
const DEFAULT_SETUP = { mode: "classic", count: 10, time: 0, topic: "all" };
const DEBUG_DEFAULT_SETUP = { level: "beginner", mode: "classic", count: 10, time: 0 };
const VALID_COUNTS = [5, 10, 15, "all"];
const VALID_TIMES = [0, 120, 300, 600];
const ORDER = ["beginner", "intermediate", "advanced", "expert"];
const CARD_KEYS = ["beginner", "intermediate", "advanced", "expert", "mixed"];
const BADGE_ORDER = [
  "first_step", "sharp_eye", "expert_ace", "century", "five_hundred",
  "streak_3", "streak_7", "timed_hero", "exam_master", "daily_done",
  "mistake_fixer", "debug_first", "debug_perfect", "debug_expert", "level_5"
];
const LETTERS = ["A", "B", "C", "D"];
const RING_CIRC = 2 * Math.PI * 86;

const I18N = {
  tr: {
    documentTitle: "ArenaKali · Linux & Siber Güvenlik Mantık Testi",
    brandTag: "kali · linux · cyber quiz",
    heroTitleA: "Komutun çıktısını ",
    heroTitleB: "tahmin edebilir misin?",
    heroText: "Temel Linux komutlarından siber güvenlik, keşif, adli bilişim ve yetki yükseltme (privesc) mantığına interaktif pratik yap.",
    heroMetaPool: "<b>{n}</b> soruluk havuz",
    heroMetaPerRound: "Test başına <b>{n}</b> soru",
    heroMetaKbd: "A–D klavye desteği",
    homeSectionTitle: "Zorluk seviyesi seç",
    homeSectionSub: "Sorular her seferinde karıştırılır, her deneme farklı bir siber antrenmandır.",
    quizTabTitle: "Terminal Quiz",
    debugTabTitle: "Bug & Exploit Hunter",
    quizBack: "← Seviye Seç",
    quizBadge: "Terminal Quiz",
    debugBadge: "Bug Hunter",
    debugDesc: "Komuttaki ölümcül syntax veya yetki hatasını bul!",
    debugSetupTitle: "Bug & Exploit Hunter Ayarla",
    debugSectionTitle: "Bug & Exploit Hunter Seviyesi Seç",
    setupLevel: "Seviye",
    lvlBeginner: "Başlangıç",
    lvlIntermediate: "Orta",
    lvlAdvanced: "İleri",
    lvlExpert: "Uzman",
    qDebug: "Bu komuttaki ölümcül hata, syntax kusuru veya güvenlik riski nedir?",
    quizTabSub: "Linux komut çıktısı & siber güvenlik soruları",
    debugTabSub: "Komutlardaki sözdizimi ve güvenlik tuzaklarını bul",
    confirmExitTitle: "Testi sonlandır?",
    confirmExitText: "Mevcut ilerlemen ve puanın kaydedilmeyecektir.",
    confirmStay: "Devam Et",
    confirmExit: "Çık",
    helpTitle: "Nasıl oynanır?",
    helpIntro: "ArenaKali, siber güvenlik öğrenenler için Linux komutlarını, filtreleri ve yetki yükseltme mantığını test eden bir pratik aracıdır.",
    helpQuizTitle: "TERMINAL QUIZ",
    helpQuizDesc: "Ekranda görünen Linux komutunun, pipe zincirinin veya script'inin sonucunu tahmin et.",
    helpDebugTitle: "BUG & EXPLOIT HUNTER",
    helpDebugDesc: "Komuttaki ölümcül syntax hatalarını, tırnak eksikliklerini ve yetki zafiyetlerini dedektif gibi bul.",
    helpTermTitle: "KALI WEB TERMINAL",
    helpTermDesc: "Üst bardaki terminal simgesiyle interaktif kabuğu aç. /etc/shadow, /var/log/auth.log ve /root/root.txt dosyalarını içeren sanal dosya sisteminde pratik yap!",
    footerText: "ArenaKali — Siber Güvenlik Öğrencileri & Linux Meraklıları İçin Etkileşimli Pratik Platformu",
    settingsTitle: "Ayarlar",
    settingsTheme: "Tema",
    settingsThemeDesc: "Koyu Kali veya açık tema",
    themeDark: "Koyu",
    themeLight: "Açık",
    settingsLanguage: "Dil",
    settingsLanguageDesc: "Türkçe veya English",
    settingsReset: "Skorları Sıfırla",
    settingsResetDesc: "Tüm XP ve rekorları temizle",
    resetBtn: "Sıfırla",
    settingsResetDone: "Tüm skorlar ve ilerleme başarıyla sıfırlandı.",
    fullscreenEnter: "Tam ekrana geç",
    fullscreenExit: "Tam ekrandan çık",
    setupTitle: "Testi Ayarla",
    setupMode: "Mod",
    modeClassic: "Klasik",
    modeExam: "Sınav",
    modeClassicDesc: "Her sorudan sonra doğru cevabı ve siber güvenlik açıklamasını görürsün.",
    modeExamDesc: "Açıklamalar gizlenir, tüm sonuçları test bitiminde analiz edersin.",
    setupTopic: "Konu",
    topicAll: "Tüm Konular",
    setupCount: "Soru Sayısı",
    countAll: "Tümü",
    setupTime: "Süre",
    timeOff: "Kapalı",
    time2: "2 dk",
    time5: "5 dk",
    time10: "10 dk",
    startTest: "Başla",
    statLevelLabel: "Seviye",
    statStreakLabel: "Seri (Gün)",
    statsTitle: "İstatistikler",
    statsAnswered: "Çözülen Soru",
    statsAccuracy: "Doğruluk",
    statsByLevel: "Seviyeye göre",
    statsWeakTopics: "Geliştirilmesi Gereken Konular",
    statsBadges: "Kazanılan Rozetler",
    statsNoData: "Henüz veri yok. Birkaç test çöz!",
    statCorrect: "Doğru",
    statWrong: "Yanlış",
    statLevel: "Seviye",
    retry: "Tekrar Dene",
    chooseLevel: "Seviye Seç",
    mistakesTest: "Yanlışlarımı Çalış",
    mistakesChip: "Yanlışlarım",
    newBadges: "Yeni rozet!",
    terminalTitle: "Kali Web Terminal",
    termClear: "Temizle",
    termSample: "Örnek Komutlar",
    termWelcome: "ArenaKali Linux Web Terminal v2026.1\nSiber güvenlik öğrencileri için etkileşimli istemci tarafı Linux kabuğu.\nDesteklenen komutlar için 'help' yazabilirsin. CTF Flag /root/root.txt içinde gizli!\n",
    debugPoolSuffix: "debug sorusu",
    debugBugsLabel: "hata",
    debugBtnText: "Dedektif Başlat →",
    startQuizBtn: "Başla →",
    qOutput: "Bu komut çalıştırıldığında ne olur?",
    diff: {
      beginner: { label: "Başlangıç", desc: "Temel Linux komutları, dosya sistemi, gezinme ve temel izinler" },
      intermediate: { label: "Orta", desc: "Pipe zincirleri, filtreler (grep/awk/sed), süreçler ve ağ komutları" },
      advanced: { label: "İleri", desc: "Siber güvenlik keşfi, Nmap, Gobuster, log analizi ve SSH" },
      expert: { label: "Uzman (Red & Blue Team)", desc: "Yetki yükseltme (privesc), SUID, GTFOBins, reverse shell ve sıkılaştırma" },
      mixed: { label: "Karışık", desc: "Tüm seviyelerden harmanlanmış siber güvenlik soruları" }
    },
    debugDiff: {
      beginner: { label: "Başlangıç", desc: "Komut satırında ölümcül boşluklar, yazım ve sözdizimi hataları" },
      intermediate: { label: "Orta", desc: "Filtreleme, tırnaklama ve pipe zincirlerindeki mantık tuzakları" },
      advanced: { label: "İleri", desc: "Ağ araçları, izinler ve komut bayraklarındaki riskli hatalar" },
      expert: { label: "Uzman (Red & Blue)", desc: "Yetki yükseltme ve siber güvenlik betiklerindeki açıklar" }
    },
    questionCount: "{n} soru",
    best: "En iyi: {a}/{b}",
    notAttempted: "Henüz denenmedi",
    progressQuestion: "Soru {a} / {b}",
    progressCorrect: "Doğru: {n}",
    correctTitle: "Doğru!",
    wrongTitle: "Yanlış",
    yourAnswer: "Senin Cevabın:",
    correctAnswer: "Doğru Cevap:",
    nextQuestion: "Sonraki Soru",
    finishTest: "Testi Bitir",
    newRecord: "Yeni Rekor!",
    reviewTitle: "Yanlışlarını incele",
    reviewSub: "Doğru cevaplar ve siber güvenlik açıklamaları burada.",
    dailyChallenge: "Günün Testi",
    installApp: "Uygulamayı Yükle",
    installIntro: "ArenaKali'yi ana ekranına uygulama gibi ekleyebilirsin; çevrimdışı da çalışır.",
    installAndroidTitle: "Android / Desktop (Chrome & Edge)",
    installAndroidDesc: "Adres çubuğundaki 'Yükle' simgesine veya tarayıcı menüsünden 'Uygulamayı yükle'ye dokun.",
    installIosTitle: "iPhone / iPad (Safari)",
    installIosDesc: "Paylaş düğmesine dokun ve 'Ana Ekrana Ekle' seçeneğini seç.",
    installNote: "İpucu: Sayfayı doğrudan tarayıcıda açtığında PWA olarak tam ekran kurulabilir.",
    badges: {
      first_step: { name: "İlk Komut", desc: "İlk testini tamamla" },
      sharp_eye: { name: "Keskin Göz", desc: "Bir testte %100 yap" },
      expert_ace: { name: "Linux Ustası", desc: "Uzman seviyesinde %100 yap" },
      century: { name: "Yüzbaşı", desc: "100 soru çöz" },
      five_hundred: { name: "Siber Muhafız", desc: "500 soru çöz" },
      streak_3: { name: "İstikrarlı", desc: "3 gün üst üste pratik yap" },
      streak_7: { name: "Demir İrade", desc: "7 gün üst üste pratik yap" },
      timed_hero: { name: "Hızlı Hacker", desc: "Süreli modda %80+ skor yap" },
      exam_master: { name: "Sınav Şampiyonu", desc: "Sınav modunda %90+ skor yap" },
      daily_done: { name: "Günlük Görev", desc: "Günün testini tamamla" },
      mistake_fixer: { name: "Hata Avcısı", desc: "Yanlışlarım testini %80+ ile tamamla" },
      debug_first: { name: "Hata Avı", desc: "İlk Bug Hunter testini tamamla" },
      debug_perfect: { name: "Sıfır Hata", desc: "Bug Hunter testinde %100 yap" },
      debug_expert: { name: "Güvenlik Dedektifi", desc: "Uzman Bug Hunter testini %100 yap" },
      level_5: { name: "Kıdemli Hacker", desc: "5. Seviyeye ulaş" }
    },
    result: [
      { title: "Kök Yetki (Root) Alındı! 🏆", sub: "Mükemmel sonuç! Tüm komutları ve siber mantığı eksiksiz kavradın." },
      { title: "Süper Kullanıcı (Sudoer)! ⭐", sub: "Çok güçlü bir performans. Birkaç küçük detay dışında harikasın." },
      { title: "Yetkili Kullanıcı 🛡️", sub: "İyi gidiyorsun! Komut filtrelerini ve parametreleri tekrar ederek kusursuzlaşabilirsin." },
      { title: "Standart Kullanıcı 🔍", sub: "Temel mantık oturuyor, açıklamaları dikkatlice inceleyerek pratik yapmaya devam et." },
      { title: "Misafir Oturumu (Guest) 💡", sub: "Linux ve siber dünyasında her hata yeni bir tecrübedir. Açıklamaları oku ve tekrar dene!" }
    ]
  },
  en: {
    documentTitle: "ArenaKali · Linux & Cybersecurity Logic Quiz",
    brandTag: "kali · linux · cyber quiz",
    heroTitleA: "Can you predict the ",
    heroTitleB: "output of this command?",
    heroText: "Practice interactively from basic Linux commands to cybersecurity, reconnaissance, forensics, and privilege escalation (privesc).",
    heroMetaPool: "<b>{n}</b> questions pool",
    heroMetaPerRound: "<b>{n}</b> questions per round",
    heroMetaKbd: "A–D keyboard support",
    homeSectionTitle: "Select difficulty level",
    homeSectionSub: "Questions are shuffled every round; each attempt is a new cybersecurity workout.",
    quizTabTitle: "Terminal Quiz",
    debugTabTitle: "Bug & Exploit Hunter",
    quizBack: "← Select Level",
    quizBadge: "Terminal Quiz",
    debugBadge: "Bug Hunter",
    debugDesc: "Spot the fatal syntax mistake or privilege vulnerability!",
    debugSetupTitle: "Configure Bug & Exploit Hunter",
    debugSectionTitle: "Select Bug & Exploit Hunter Level",
    setupLevel: "Level",
    lvlBeginner: "Beginner",
    lvlIntermediate: "Intermediate",
    lvlAdvanced: "Advanced",
    lvlExpert: "Expert",
    qDebug: "What is the fatal bug, syntax error, or security risk in this command?",
    quizTabSub: "Linux command outputs & cybersecurity quiz",
    debugTabSub: "Find syntax pitfalls and security vulnerabilities in commands",
    confirmExitTitle: "Leave Quiz?",
    confirmExitText: "Your current progress and points will not be saved.",
    confirmStay: "Continue",
    confirmExit: "Exit",
    helpTitle: "How to Play?",
    helpIntro: "ArenaKali is an interactive practice platform for cybersecurity learners to test Linux commands, pipes, and privilege escalation logic.",
    helpQuizTitle: "TERMINAL QUIZ",
    helpQuizDesc: "Predict the output or behavior of the displayed Linux command, pipeline, or script.",
    helpDebugTitle: "BUG & EXPLOIT HUNTER",
    helpDebugDesc: "Detect fatal syntax errors, missing quotes, and privilege vulnerabilities like a forensic investigator.",
    helpTermTitle: "KALI WEB TERMINAL",
    helpTermDesc: "Open the interactive shell with the terminal icon in the topbar. Practice in a virtual filesystem featuring /etc/shadow, /var/log/auth.log, and /root/root.txt!",
    footerText: "ArenaKali — Interactive Practice Platform for Cybersecurity Students & Linux Enthusiasts",
    settingsTitle: "Settings",
    settingsTheme: "Theme",
    settingsThemeDesc: "Dark Kali or light theme",
    themeDark: "Dark",
    themeLight: "Light",
    settingsLanguage: "Language",
    settingsLanguageDesc: "Turkish or English",
    settingsReset: "Reset Scores",
    settingsResetDesc: "Clear all XP and records",
    resetBtn: "Reset",
    settingsResetDone: "All scores and progress successfully reset.",
    fullscreenEnter: "Enter fullscreen",
    fullscreenExit: "Exit fullscreen",
    setupTitle: "Configure Quiz",
    setupMode: "Mode",
    modeClassic: "Classic",
    modeExam: "Exam",
    modeClassicDesc: "See the correct answer and cybersecurity explanation after each question.",
    modeExamDesc: "Explanations hidden; analyze full results at the end of the round.",
    setupTopic: "Topic",
    topicAll: "All Topics",
    setupCount: "Question Count",
    countAll: "All",
    setupTime: "Timer",
    timeOff: "Off",
    time2: "2 min",
    time5: "5 min",
    time10: "10 min",
    startTest: "Start",
    statLevelLabel: "Level",
    statStreakLabel: "Streak (Days)",
    statsTitle: "Statistics",
    statsAnswered: "Solved Questions",
    statsAccuracy: "Accuracy",
    statsByLevel: "By Level",
    statsWeakTopics: "Areas for Improvement",
    statsBadges: "Unlocked Badges",
    statsNoData: "No data yet. Solve a few quizzes!",
    statCorrect: "Correct",
    statWrong: "Wrong",
    statLevel: "Level",
    retry: "Try Again",
    chooseLevel: "Select Level",
    mistakesTest: "Practice Mistakes",
    mistakesChip: "My Mistakes",
    newBadges: "New badge unlocked!",
    terminalTitle: "Kali Web Terminal",
    termClear: "Clear",
    termSample: "Sample Commands",
    termWelcome: "ArenaKali Linux Web Terminal v2026.1\nInteractive client-side Linux shell for cybersecurity learners.\nType 'help' for supported commands. CTF Flag hidden in /root/root.txt!\n",
    debugPoolSuffix: "debug questions",
    debugBugsLabel: "bugs",
    debugBtnText: "Start Detective →",
    startQuizBtn: "Start →",
    qOutput: "What happens when this command is executed?",
    diff: {
      beginner: { label: "Beginner", desc: "Basic Linux commands, filesystem navigation, and standard permissions" },
      intermediate: { label: "Intermediate", desc: "Pipelines, filters (grep/awk/sed), process management, and networking" },
      advanced: { label: "Advanced", desc: "Cybersecurity reconnaissance, Nmap, Gobuster, log forensics, and SSH" },
      expert: { label: "Expert (Red & Blue Team)", desc: "Privilege escalation (privesc), SUID, GTFOBins, reverse shells, and hardening" },
      mixed: { label: "Mixed", desc: "Blended cybersecurity questions across all difficulty tiers" }
    },
    debugDiff: {
      beginner: { label: "Beginner", desc: "Deadly spaces, typos and syntax pitfalls in bash commands" },
      intermediate: { label: "Intermediate", desc: "Logic traps in filtering, quoting and pipe pipelines" },
      advanced: { label: "Advanced", desc: "Risky misconfigurations in network tools, flags and permissions" },
      expert: { label: "Expert (Red & Blue)", desc: "Critical flaws in privilege escalation and security scripts" }
    },
    questionCount: "{n} questions",
    best: "Best: {a}/{b}",
    notAttempted: "Not attempted yet",
    progressQuestion: "Question {a} / {b}",
    progressCorrect: "Correct: {n}",
    correctTitle: "Correct!",
    wrongTitle: "Incorrect",
    yourAnswer: "Your Answer:",
    correctAnswer: "Correct Answer:",
    nextQuestion: "Next Question",
    finishTest: "Finish Quiz",
    newRecord: "New Record!",
    reviewTitle: "Review your mistakes",
    reviewSub: "Detailed explanations and correct answers are below.",
    dailyChallenge: "Daily Challenge",
    installApp: "Install App",
    installIntro: "You can add ArenaKali to your home screen as an app; works offline too.",
    installAndroidTitle: "Android / Desktop (Chrome & Edge)",
    installAndroidDesc: "Tap the 'Install' icon in the address bar or 'Install app' in browser menu.",
    installIosTitle: "iPhone / iPad (Safari)",
    installIosDesc: "Tap Share button and choose 'Add to Home Screen'.",
    installNote: "Tip: Opening the URL directly in your browser allows clean fullscreen PWA installation.",
    badges: {
      first_step: { name: "First Command", desc: "Complete your first quiz" },
      sharp_eye: { name: "Sharp Eye", desc: "Score 100% on any quiz" },
      expert_ace: { name: "Linux Ace", desc: "Score 100% on Expert level" },
      century: { name: "Centurion", desc: "Solve 100 questions" },
      five_hundred: { name: "Cyber Guardian", desc: "Solve 500 questions" },
      streak_3: { name: "Consistent", desc: "Practice 3 days in a row" },
      streak_7: { name: "Iron Will", desc: "Practice 7 days in a row" },
      timed_hero: { name: "Speed Demon", desc: "Score 80%+ in timed mode" },
      exam_master: { name: "Exam Champion", desc: "Score 90%+ in exam mode" },
      daily_done: { name: "Daily Mission", desc: "Complete the daily challenge" },
      mistake_fixer: { name: "Mistake Hunter", desc: "Score 80%+ on your mistakes test" },
      debug_first: { name: "Bug Tracker", desc: "Complete your first Bug Hunter quiz" },
      debug_perfect: { name: "Zero Vulnerability", desc: "Score 100% on a Bug Hunter quiz" },
      debug_expert: { name: "Security Detective", desc: "Score 100% on Expert Bug Hunter" },
      level_5: { name: "Veteran Hacker", desc: "Reach Level 5" }
    },
    result: [
      { title: "Root Privilege Obtained! 🏆", sub: "Flawless score! You mastered all commands and cybersecurity logic." },
      { title: "Sudoer Confirmed! ⭐", sub: "Impressive skills! Aside from tiny nuances, you were exceptional." },
      { title: "Privileged User 🛡️", sub: "Solid work! Reviewing pipeline filters and flags will make you unstoppable." },
      { title: "Standard User 🔍", sub: "Core logic is taking shape. Study explanations carefully and keep grinding." },
      { title: "Guest Session 💡", sub: "Every error in cybersecurity is a valuable lesson. Read explanations and retry!" }
    ]
  }
};

const els = {
  themeDarkBtn: document.getElementById("themeDarkBtn"),
  themeLightBtn: document.getElementById("themeLightBtn"),
  langTrBtn: document.getElementById("langTrBtn"),
  langEnBtn: document.getElementById("langEnBtn"),
  helpBtn: document.getElementById("helpBtn"),
  helpModal: document.getElementById("helpModal"),
  helpClose: document.getElementById("helpClose"),
  settingsBtn: document.getElementById("settingsBtn"),
  settingsModal: document.getElementById("settingsModal"),
  settingsClose: document.getElementById("settingsClose"),
  resetBestBtn: document.getElementById("resetBestBtn"),
  settingsFeedback: document.getElementById("settingsFeedback"),
  fullscreenBtn: document.getElementById("fullscreenBtn"),
  playgroundBtn: document.getElementById("playgroundBtn"),
  statsBtn: document.getElementById("statsBtn"),
  statsModal: document.getElementById("statsModal"),
  statsClose: document.getElementById("statsClose"),
  statsContent: document.getElementById("statsContent"),
  modeTabQuiz: document.getElementById("modeTabQuiz"),
  modeTabDebug: document.getElementById("modeTabDebug"),
  quizSection: document.getElementById("quizSection"),
  debugSection: document.getElementById("debugSection"),
  diffGrid: document.getElementById("diffGrid"),
  debugGrid: document.getElementById("debugGrid"),
  screenHome: document.getElementById("screenHome"),
  screenQuiz: document.getElementById("screenQuiz"),
  screenResult: document.getElementById("screenResult"),
  screenPlay: document.getElementById("screenPlay"),
  levelValue: document.getElementById("levelValue"),
  xpValue: document.getElementById("xpValue"),
  streakValue: document.getElementById("streakValue"),
  xpFill: document.getElementById("xpFill"),
  setupModal: document.getElementById("setupModal"),
  setupClose: document.getElementById("setupClose"),
  setupDiffLabel: document.getElementById("setupDiffLabel"),
  modeClassicBtn: document.getElementById("modeClassicBtn"),
  modeExamBtn: document.getElementById("modeExamBtn"),
  setupModeDesc: document.getElementById("setupModeDesc"),
  topicSelect: document.getElementById("topicSelect"),
  count5Btn: document.getElementById("count5Btn"),
  count10Btn: document.getElementById("count10Btn"),
  count15Btn: document.getElementById("count15Btn"),
  countAllBtn: document.getElementById("countAllBtn"),
  timeOffBtn: document.getElementById("timeOffBtn"),
  time2Btn: document.getElementById("time2Btn"),
  time5Btn: document.getElementById("time5Btn"),
  time10Btn: document.getElementById("time10Btn"),
  setupStartBtn: document.getElementById("setupStartBtn"),
  debugModal: document.getElementById("debugModal"),
  debugClose: document.getElementById("debugClose"),
  debugPoolLabel: document.getElementById("debugPoolLabel"),
  debugLvlBeginner: document.getElementById("debugLvlBeginner"),
  debugLvlIntermediate: document.getElementById("debugLvlIntermediate"),
  debugLvlAdvanced: document.getElementById("debugLvlAdvanced"),
  debugLvlExpert: document.getElementById("debugLvlExpert"),
  debugModeClassicBtn: document.getElementById("debugModeClassicBtn"),
  debugModeExamBtn: document.getElementById("debugModeExamBtn"),
  debugCount5Btn: document.getElementById("debugCount5Btn"),
  debugCount10Btn: document.getElementById("debugCount10Btn"),
  debugCountAllBtn: document.getElementById("debugCountAllBtn"),
  debugStartBtn: document.getElementById("debugStartBtn"),
  quizBackBtn: document.getElementById("quizBackBtn"),
  quizDiffChip: document.getElementById("quizDiffChip"),
  progressQuestion: document.getElementById("progressQuestion"),
  timerChip: document.getElementById("timerChip"),
  progressScore: document.getElementById("progressScore"),
  progressFill: document.getElementById("progressFill"),
  questionText: document.getElementById("questionText"),
  codeBlock: document.getElementById("codeBlock"),
  optionsGrid: document.getElementById("optionsGrid"),
  feedback: document.getElementById("feedback"),
  feedbackIcon: document.getElementById("feedbackIcon"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackExplain: document.getElementById("feedbackExplain"),
  nextBtn: document.getElementById("nextBtn"),
  confirmModal: document.getElementById("confirmModal"),
  confirmStayBtn: document.getElementById("confirmStayBtn"),
  confirmExitBtn: document.getElementById("confirmExitBtn"),
  ringPercent: document.getElementById("ringPercent"),
  ringScore: document.getElementById("ringScore"),
  ringFill: document.getElementById("ringFill"),
  resultTitle: document.getElementById("resultTitle"),
  resultSubtitle: document.getElementById("resultSubtitle"),
  statCorrect: document.getElementById("statCorrect"),
  statWrong: document.getElementById("statWrong"),
  statDiff: document.getElementById("statDiff"),
  retryBtn: document.getElementById("retryBtn"),
  homeBtn: document.getElementById("homeBtn"),
  review: document.getElementById("review"),
  reviewList: document.getElementById("reviewList"),
  playBackBtn: document.getElementById("playBackBtn"),
  terminalBody: document.getElementById("terminalBody"),
  terminalOutput: document.getElementById("terminalOutput"),
  terminalPrompt: document.getElementById("terminalPrompt"),
  terminalInput: document.getElementById("terminalInput"),
  termClearBtn: document.getElementById("termClearBtn"),
  termSampleBtn: document.getElementById("termSampleBtn"),
  installBtn: document.getElementById("installBtn"),
  installModal: document.getElementById("installModal"),
  installClose: document.getElementById("installClose")
};

const state = {
  lang: localStorage.getItem("arenakali_lang") || "tr",
  theme: localStorage.getItem("arenakali_theme") || "dark",
  setup: { ...DEFAULT_SETUP },
  debugSetup: { ...DEBUG_DEFAULT_SETUP },
  homeMode: "quiz",
  pendingDifficulty: "beginner",
  isDebug: false,
  debugLevel: "beginner",
  difficulty: null,
  isDaily: false,
  isMistakes: false,
  config: { ...DEFAULT_SETUP },
  queue: [],
  index: 0,
  correctCount: 0,
  answers: [],
  answered: false,
  selectedIndex: null,
  timeLeft: 0,
  timerId: null,
  progress: null
};

let currentScreen = "home";
let terminal = null;

function dict() {
  return I18N[state.lang] || I18N.tr;
}

function fmt(tmpl, vars) {
  if (!tmpl) return "";
  return tmpl.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ""));
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function span(cls, text) {
  return `<span class="${cls}">${esc(text)}</span>`;
}

function highlightBash(code) {
  if (!code) return "";
  const lines = code.split("\n");
  const highlighted = lines.map(line => {
    if (/^\s*#/.test(line)) {
      return span("c-comment", line);
    }
    return esc(line)
      .replace(/\b(sudo|chmod|chown|chgrp|useradd|usermod|groupadd|passwd|su)\b/g, m => span("c-priv", m))
      .replace(/\b(grep|awk|sed|cut|sort|uniq|wc|tr|head|tail|cat|strings|base64|xargs|tee)\b/g, m => span("c-pipe", m))
      .replace(/\b(nmap|nc|netcat|curl|wget|ssh|scp|tcpdump|wireshark|ss|netstat|ping|dig|nslookup|traceroute)\b/g, m => span("c-net", m))
      .replace(/\b(cd|ls|pwd|mkdir|rmdir|rm|cp|mv|touch|find|locate|which|whereis|file|ln|tar|gzip|gunzip|zip|unzip)\b/g, m => span("c-cmd", m))
      .replace(/\b(if|then|else|elif|fi|for|while|do|done|case|esac|in|function|return|exit)\b/g, m => span("c-kw", m))
      .replace(/(--?[a-zA-Z0-9_\-]+)/g, m => span("c-flag", m))
      .replace(/(\$[a-zA-Z0-9_\?]+|\$\{[^}]+\})/g, m => span("c-var", m))
      .replace(/(\|{1,2}|&{1,2}|;|>|>>|<|<<)/g, m => span("c-op", m));
  });
  return highlighted.join("\n");
}

// PROGRESS PERSISTENCE
function loadProgress() {
  const raw = localStorage.getItem("arenakali_progress");
  if (raw) {
    try {
      state.progress = JSON.parse(raw);
    } catch (e) {
      console.warn("Resetting corrupt progress:", e);
    }
  }
  if (!state.progress) {
    state.progress = {
      xp: 0,
      level: 1,
      streak: 0,
      lastActive: null,
      solvedTotal: 0,
      solvedCorrect: 0,
      best: {},
      badges: [],
      mistakes: [],
      dailyDate: null
    };
  }
  if (!state.progress.mistakes) state.progress.mistakes = [];
  if (!state.progress.best) state.progress.best = {};
  if (!state.progress.badges) state.progress.badges = [];
}

function saveProgress() {
  localStorage.setItem("arenakali_progress", JSON.stringify(state.progress));
}

function addXP(amount) {
  state.progress.xp += amount;
  const newLevel = Math.floor(state.progress.xp / XP_PER_LEVEL) + 1;
  if (newLevel > state.progress.level) {
    state.progress.level = newLevel;
    if (newLevel >= 5) unlock("level_5");
  }
  saveProgress();
  updateProgressUI();
}

function checkStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last = state.progress.lastActive;
  if (!last) {
    state.progress.streak = 1;
  } else if (last === today) {
    // already counted
  } else {
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    const yest = prevDate.toISOString().slice(0, 10);
    if (last === yest) {
      state.progress.streak++;
    } else {
      state.progress.streak = 1;
    }
  }
  state.progress.lastActive = today;
  if (state.progress.streak >= 3) unlock("streak_3");
  if (state.progress.streak >= 7) unlock("streak_7");
  saveProgress();
  updateProgressUI();
}

function checkBadges() {
  const p = state.progress;
  if (p.solvedTotal >= 1) unlock("first_step");
  if (p.solvedTotal >= 100) unlock("century");
  if (p.solvedTotal >= 500) unlock("five_hundred");
  if (state.correctCount === state.queue.length && state.queue.length >= 10) {
    unlock("sharp_eye");
    if (state.pendingDifficulty === "expert") unlock("expert_ace");
    if (state.isDebug) {
      unlock("debug_perfect");
      if (state.debugLevel === "expert") unlock("debug_expert");
    }
  }
  if (state.isDebug && p.solvedTotal >= 1) unlock("debug_first");
}

function unlock(badgeId) {
  if (!state.progress.badges.includes(badgeId)) {
    state.progress.badges.push(badgeId);
    saveProgress();
  }
}

function updateProgressUI() {
  const p = state.progress;
  if (!p) return;
  els.levelValue.textContent = p.level;
  const currentXP = p.xp % XP_PER_LEVEL;
  els.xpValue.textContent = `${currentXP} / ${XP_PER_LEVEL} XP`;
  els.streakValue.textContent = p.streak;
  const pct = Math.min(100, Math.round((currentXP / XP_PER_LEVEL) * 100));
  els.xpFill.style.width = pct + '%';
}

// BILINGUAL & I18N
function applyLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("arenakali_lang", lang);
  document.documentElement.setAttribute("lang", lang);

  const d = dict();
  document.title = d.documentTitle;

  // 1. All data-i18n elements in DOM
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (d[key] !== undefined) {
      if (node.tagName.toLowerCase() === "input" && node.placeholder) {
        node.placeholder = d[key];
      } else {
        node.textContent = d[key];
      }
    }
  });

  // 2. Active buttons toggling in settings
  if (els.langTrBtn) els.langTrBtn.classList.toggle("active", lang === "tr");
  if (els.langEnBtn) els.langEnBtn.classList.toggle("active", lang === "en");

  // 3. Tooltips and aria-labels
  if (els.helpBtn) {
    els.helpBtn.setAttribute("title", d.helpTitle);
    els.helpBtn.setAttribute("aria-label", d.helpTitle);
  }
  if (els.playgroundBtn) {
    els.playgroundBtn.setAttribute("title", d.terminalTitle);
    els.playgroundBtn.setAttribute("aria-label", d.terminalTitle);
  }
  if (els.settingsBtn) {
    els.settingsBtn.setAttribute("title", d.settingsTitle);
    els.settingsBtn.setAttribute("aria-label", d.settingsTitle);
  }
  if (els.fullscreenBtn) {
    els.fullscreenBtn.setAttribute("title", d.fullscreenEnter);
    els.fullscreenBtn.setAttribute("aria-label", d.fullscreenEnter);
  }

  // 4. Update home panel & cards
  updateProgressUI();
  renderHomeCards();

  // 5. Update setup modals
  if (els.setupModeDesc) {
    els.setupModeDesc.textContent = state.setup.mode === "classic" ? d.modeClassicDesc : d.modeExamDesc;
  }
  if (els.setupDiffLabel && state.pendingDifficulty) {
    const countNum = state.pendingDifficulty === 'mixed' ? 100 : (QUESTIONS[state.pendingDifficulty] ? QUESTIONS[state.pendingDifficulty].length : 0);
    els.setupDiffLabel.textContent = `${d.diff[state.pendingDifficulty].label} · ${fmt(d.questionCount, { n: countNum })}`;
  }
  if (els.debugPoolLabel && state.debugLevel) {
    const countNum = DEBUG_QUESTIONS[state.debugLevel] ? DEBUG_QUESTIONS[state.debugLevel].length : 0;
    els.debugPoolLabel.textContent = `${d.diff[state.debugLevel].label} · ${countNum} ${d.debugPoolSuffix}`;
  }
  updateTopicSelectOptions();

  // 6. Update terminal engine & buttons
  if (terminal) {
    terminal.lang = lang;
  }
  if (els.termClearBtn) els.termClearBtn.textContent = d.termClear;
  if (els.termSampleBtn) els.termSampleBtn.textContent = d.termSample;
  if (els.terminalOutput && (!terminal || terminal.history.length === 0)) {
    els.terminalOutput.textContent = d.termWelcome;
  }

  // 7. If currently on quiz screen, dynamically update active question/options/feedback
  if (currentScreen === "quiz" && state.queue && state.queue[state.index]) {
    const q = state.queue[state.index];
    els.quizDiffChip.textContent = state.isDebug ? `Debug · ${d.diff[state.debugLevel].label}` : (state.isDaily ? d.dailyChallenge : (state.isMistakes ? d.mistakesChip : d.diff[state.pendingDifficulty].label));
    els.progressQuestion.textContent = fmt(d.progressQuestion, { a: state.index + 1, b: state.queue.length });
    els.progressScore.textContent = fmt(d.progressCorrect, { n: state.correctCount });
    els.questionText.textContent = state.isDebug ? d.qDebug : d.qOutput;

    const btns = els.optionsGrid.querySelectorAll(".option-btn");
    if (btns.length === q.options.length) {
      btns.forEach((btn, idx) => {
        const opt = q.options[idx];
        const text = typeof opt === "object" ? (opt[state.lang] || opt.tr || opt.en) : opt;
        const optTextSpan = btn.querySelector(".option-text");
        if (optTextSpan) optTextSpan.textContent = text;
      });
    }

    if (state.answered) {
      const isCorrect = state.selectedIndex === q.answer;
      els.feedbackTitle.textContent = isCorrect ? d.correctTitle : d.wrongTitle;
      const expStr = q.explanation ? (q.explanation[state.lang] || q.explanation.tr || q.explanation.en) : "";
      els.feedbackExplain.textContent = expStr;
      els.nextBtn.textContent = state.index === state.queue.length - 1 ? d.finishTest : d.nextQuestion;
    }
  }

  // 8. If currently on result screen, re-render review list & update score text
  if (currentScreen === "result") {
    renderReviewList();
    if (els.retryBtn) els.retryBtn.textContent = d.retry;
    if (els.homeBtn) els.homeBtn.textContent = d.chooseLevel;
    const total = state.queue.length;
    const correct = state.correctCount;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    let resIdx = 4;
    if (pct === 100) resIdx = 0;
    else if (pct >= 80) resIdx = 1;
    else if (pct >= 60) resIdx = 2;
    else if (pct >= 40) resIdx = 3;
    if (els.resultTitle) els.resultTitle.textContent = d.result[resIdx].title;
    if (els.resultSubtitle) els.resultSubtitle.textContent = d.result[resIdx].sub;
    if (els.statDiff) {
      els.statDiff.textContent = state.isDebug ? `Debug ${d.diff[state.debugLevel].label}` : (state.isDaily ? d.dailyChallenge : d.diff[state.pendingDifficulty || 'beginner'].label);
    }
  }

  // 9. If stats modal is open, re-render it
  if (els.statsModal && !els.statsModal.classList.contains("hidden")) {
    openStatsModal();
  }
}

// SCREEN SWITCHING
function switchScreen(screen) {
  currentScreen = screen;
  els.screenHome.classList.remove("active");
  els.screenQuiz.classList.remove("active");
  els.screenResult.classList.remove("active");
  els.screenPlay.classList.remove("active");

  if (screen === "home") els.screenHome.classList.add("active");
  else if (screen === "quiz") els.screenQuiz.classList.add("active");
  else if (screen === "result") els.screenResult.classList.add("active");
  else if (screen === "play") {
    els.screenPlay.classList.add("active");
    if (!terminal) initTerminal();
    setTimeout(() => els.terminalInput.focus(), 80);
  }
}

// RENDER HOME CARDS
function renderHomeCards() {
  const d = dict();

  // Quiz cards
  els.diffGrid.innerHTML = "";
  CARD_KEYS.forEach(key => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "diff-card";
    const info = d.diff[key];
    const poolCount = key === "mixed" ? 100 : (QUESTIONS[key] ? QUESTIONS[key].length : 0);
    const bestKey = `quiz_${key}`;
    const bestScoreText = state.progress.best[bestKey] !== undefined ? fmt(d.best, { a: state.progress.best[bestKey], b: 10 }) : d.notAttempted;

    card.innerHTML = `
      <div class="diff-head">
        <span class="diff-title">${info.label}</span>
        <span class="diff-badge">${fmt(d.questionCount, { n: poolCount })}</span>
      </div>
      <p class="diff-desc">${info.desc}</p>
      <div class="diff-meta">
        <span>${bestScoreText}</span>
        <span style="color:var(--accent);">${d.startQuizBtn}</span>
      </div>
    `;
    card.addEventListener("click", () => openSetupModal(key, false));
    els.diffGrid.appendChild(card);
  });

  // Debug cards
  els.debugGrid.innerHTML = "";
  ORDER.forEach(key => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "diff-card";
    card.style.setProperty("--card-accent", "var(--amber)");
    card.style.setProperty("--card-glow", "rgba(251, 191, 36, 0.2)");
    const info = (d.debugDiff && d.debugDiff[key]) || d.diff[key];
    const poolCount = DEBUG_QUESTIONS[key] ? DEBUG_QUESTIONS[key].length : 0;
    const bestKey = `debug_${key}`;
    const bestScoreText = state.progress.best[bestKey] !== undefined ? fmt(d.best, { a: state.progress.best[bestKey], b: 10 }) : d.notAttempted;

    card.innerHTML = `
      <div class="diff-head">
        <span class="diff-title">${info.label}</span>
        <span class="diff-badge" style="color:var(--amber); background:rgba(251,191,36,0.15);">${poolCount} ${d.debugBugsLabel}</span>
      </div>
      <p class="diff-desc">${info.desc}</p>
      <div class="diff-meta">
        <span>${bestScoreText}</span>
        <span style="color:var(--amber);">${d.debugBtnText}</span>
      </div>
    `;
    card.addEventListener("click", () => openDebugModal(key));
    els.debugGrid.appendChild(card);
  });
}

function updateTopicSelectOptions() {
  const d = dict();
  const diff = state.pendingDifficulty;
  if (!els.topicSelect) return;

  const currentVal = els.topicSelect.value || "all";
  els.topicSelect.innerHTML = `<option value="all">${d.topicAll}</option>`;

  if (diff && diff !== "mixed" && QUESTIONS[diff]) {
    const topicSet = new Set(QUESTIONS[diff].map(q => q.topic));
    topicSet.forEach(top => {
      if (TOPICS[top]) {
        const opt = document.createElement("option");
        opt.value = top;
        opt.textContent = TOPICS[top][state.lang] || TOPICS[top].tr;
        els.topicSelect.appendChild(opt);
      }
    });
  }
  els.topicSelect.value = currentVal;
}

// SETUP MODALS
function openSetupModal(difficulty, isDirect = false) {
  state.pendingDifficulty = difficulty;
  state.isDebug = false;
  const d = dict();

  const countNum = difficulty === 'mixed' ? 100 : (QUESTIONS[difficulty] ? QUESTIONS[difficulty].length : 0);
  els.setupDiffLabel.textContent = `${d.diff[difficulty].label} · ${fmt(d.questionCount, { n: countNum })}`;

  updateTopicSelectOptions();

  els.setupModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function openDebugModal(level) {
  state.debugLevel = level;
  state.isDebug = true;
  const d = dict();
  const countNum = DEBUG_QUESTIONS[level] ? DEBUG_QUESTIONS[level].length : 0;
  els.debugPoolLabel.textContent = `${d.diff[level].label} · ${countNum} ${d.debugPoolSuffix}`;
  els.debugModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModals() {
  document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.add("hidden"));
  document.body.classList.remove("modal-open");
}

// START TEST
function startTest(cfg) {
  state.config = cfg;
  state.isDaily = !!cfg.isDaily;
  state.isMistakes = !!cfg.isMistakes;
  state.index = 0;
  state.correctCount = 0;
  state.answers = [];
  state.answered = false;
  state.selectedIndex = null;

  let pool = [];
  if (state.isDebug) {
    pool = (DEBUG_QUESTIONS[state.debugLevel] || []).slice();
  } else if (state.isDaily) {
    const all = [].concat(...Object.values(QUESTIONS));
    const seed = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''), 10);
    pool = seededShuffle(all, seed);
  } else if (state.isMistakes) {
    pool = state.progress.mistakes.slice();
  } else if (state.pendingDifficulty === "mixed") {
    pool = [].concat(...Object.values(QUESTIONS));
  } else {
    pool = (QUESTIONS[state.pendingDifficulty] || []).slice();
    if (cfg.topic && cfg.topic !== "all") {
      pool = pool.filter(q => q.topic === cfg.topic);
    }
  }

  if (pool.length === 0) {
    alert(state.lang === 'tr' ? "Bu kriterlere uygun soru bulunamadı." : "No questions found matching criteria.");
    return;
  }

  const count = cfg.count === "all" ? pool.length : Math.min(cfg.count, pool.length);
  if (!state.isDaily) {
    shuffle(pool);
  }
  state.queue = pool.slice(0, count);

  closeModals();
  switchScreen("quiz");
  checkStreak();
  renderQuestion();
}

function renderQuestion() {
  state.answered = false;
  state.selectedIndex = null;
  els.feedback.classList.add("hidden");

  const q = state.queue[state.index];
  const d = dict();

  // Header meta
  els.quizDiffChip.textContent = state.isDebug ? `Debug · ${d.diff[state.debugLevel].label}` : (state.isDaily ? d.dailyChallenge : (state.isMistakes ? d.mistakesChip : d.diff[state.pendingDifficulty].label));
  els.progressQuestion.textContent = fmt(d.progressQuestion, { a: state.index + 1, b: state.queue.length });
  els.progressScore.textContent = fmt(d.progressCorrect, { n: state.correctCount });
  els.progressFill.style.width = Math.round((state.index / state.queue.length) * 100) + '%';

  // Question prompt & Code
  els.questionText.textContent = state.isDebug ? d.qDebug : d.qOutput;
  els.codeBlock.innerHTML = highlightBash(q.code);

  // Options rendered in active language
  els.optionsGrid.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    const text = typeof opt === "object" ? (opt[state.lang] || opt.tr || opt.en) : opt;
    btn.innerHTML = `<span class="option-key">${LETTERS[idx]}</span> <span class="option-text">${esc(text)}</span>`;
    btn.addEventListener("click", () => handleAnswer(idx));
    els.optionsGrid.appendChild(btn);
  });
}

function handleAnswer(idx) {
  if (state.answered) return;
  state.answered = true;
  state.selectedIndex = idx;

  const q = state.queue[state.index];
  const isCorrect = idx === q.answer;
  const d = dict();

  if (isCorrect) {
    state.correctCount++;
    addXP(15);
    state.progress.solvedCorrect++;
  } else {
    if (!state.progress.mistakes.some(m => m.code === q.code)) {
      state.progress.mistakes.push(q);
    }
  }
  state.progress.solvedTotal++;
  saveProgress();

  state.answers.push({
    question: q,
    selected: idx,
    isCorrect: isCorrect
  });

  // UI Reveal
  const btns = els.optionsGrid.querySelectorAll(".option-btn");
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    if (i === idx && !isCorrect) btn.classList.add("wrong");
  });

  if (state.config.mode === "classic") {
    els.feedback.classList.remove("hidden", "correct", "wrong");
    els.feedback.classList.add(isCorrect ? "correct" : "wrong");
    els.feedbackIcon.textContent = isCorrect ? "✓" : "✗";
    els.feedbackTitle.textContent = isCorrect ? d.correctTitle : d.wrongTitle;
    const expStr = q.explanation ? (q.explanation[state.lang] || q.explanation.tr || q.explanation.en) : "";
    els.feedbackExplain.textContent = expStr;
    els.nextBtn.textContent = state.index === state.queue.length - 1 ? d.finishTest : d.nextQuestion;
  } else {
    // Exam mode auto advance
    setTimeout(nextStep, 250);
  }
}

function nextStep() {
  if (state.index < state.queue.length - 1) {
    state.index++;
    renderQuestion();
  } else {
    finishTest();
  }
}

function finishTest() {
  switchScreen("result");
  const total = state.queue.length;
  const correct = state.correctCount;
  const pct = Math.round((correct / total) * 100);
  const d = dict();

  els.ringPercent.textContent = pct + '%';
  els.ringScore.textContent = `${correct} / ${total}`;
  const offset = RING_CIRC - (pct / 100) * RING_CIRC;
  setTimeout(() => {
    els.ringFill.style.strokeDashoffset = offset;
  }, 100);

  let resIdx = 4;
  if (pct === 100) resIdx = 0;
  else if (pct >= 80) resIdx = 1;
  else if (pct >= 60) resIdx = 2;
  else if (pct >= 40) resIdx = 3;

  els.resultTitle.textContent = d.result[resIdx].title;
  els.resultSubtitle.textContent = d.result[resIdx].sub;

  els.statCorrect.textContent = correct;
  els.statWrong.textContent = total - correct;
  els.statDiff.textContent = state.isDebug ? `Debug ${d.diff[state.debugLevel].label}` : (state.isDaily ? d.dailyChallenge : d.diff[state.pendingDifficulty || 'beginner'].label);

  const scoreKey = state.isDebug ? `debug_${state.debugLevel}` : `quiz_${state.pendingDifficulty}`;
  if (!state.progress.best[scoreKey] || correct > state.progress.best[scoreKey]) {
    state.progress.best[scoreKey] = correct;
  }

  if (state.isDaily) {
    state.progress.dailyDate = new Date().toISOString().slice(0, 10);
    addXP(100);
  }

  if (pct === 100) checkBadges();
  saveProgress();
  updateProgressUI();

  renderReviewList();
}

function renderReviewList() {
  const d = dict();
  els.reviewList.innerHTML = "";
  if (state.answers.length === 0) {
    els.review.classList.add("hidden");
    return;
  }
  els.review.classList.remove("hidden");

  state.answers.forEach((ans, idx) => {
    const item = document.createElement("div");
    item.className = `review-item ${ans.isCorrect ? 'correct' : 'wrong'}`;

    const q = ans.question;
    const userOpt = q.options[ans.selected];
    const userStr = typeof userOpt === "object" ? (userOpt[state.lang] || userOpt.tr || userOpt.en) : userOpt;
    const correctOpt = q.options[q.answer];
    const correctStr = typeof correctOpt === "object" ? (correctOpt[state.lang] || correctOpt.tr || correctOpt.en) : correctOpt;
    const expStr = q.explanation ? (q.explanation[state.lang] || q.explanation.tr || q.explanation.en) : "";

    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <strong style="color:var(--text); font-family:var(--font-display);">${state.lang === 'tr' ? 'Soru ' + (idx + 1) : 'Question ' + (idx + 1)}</strong>
        <span style="font-weight:700; color:${ans.isCorrect ? 'var(--green)' : 'var(--red)'};">${ans.isCorrect ? (state.lang === 'tr' ? '✓ Doğru' : '✓ Correct') : (state.lang === 'tr' ? '✗ Yanlış' : '✗ Wrong')}</span>
      </div>
      <pre class="code" style="padding:10px; border-radius:8px; margin-bottom:10px;"><code>${highlightBash(q.code)}</code></pre>
      <div style="font-size:0.88rem; margin-bottom:4px;"><b>${d.yourAnswer}</b> <span style="color:${ans.isCorrect ? 'var(--green)' : 'var(--red)'};">${esc(userStr)}</span></div>
      ${!ans.isCorrect ? `<div style="font-size:0.88rem; margin-bottom:6px;"><b>${d.correctAnswer}</b> <span style="color:var(--green);">${esc(correctStr)}</span></div>` : ''}
      ${expStr ? `<div style="font-size:0.85rem; color:var(--text-muted); background:var(--surface); padding:8px 12px; border-radius:6px; margin-top:8px; border-left:3px solid var(--accent);">${esc(expStr)}</div>` : ''}
    `;
    els.reviewList.appendChild(item);
  });
}

function openStatsModal() {
  const p = state.progress;
  const d = dict();
  const acc = p.solvedTotal > 0 ? Math.round((p.solvedCorrect / p.solvedTotal) * 100) : 0;

  let badgesHtml = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:8px;">';
  BADGE_ORDER.forEach(bId => {
    const isUnlocked = p.badges.includes(bId);
    const bInfo = d.badges[bId] || { name: bId, desc: "" };
    badgesHtml += `
      <div style="padding:10px; border-radius:10px; background:${isUnlocked ? 'var(--surface-hover)' : 'var(--surface)'}; border:1px solid ${isUnlocked ? 'var(--accent)' : 'var(--border)'}; opacity:${isUnlocked ? '1' : '0.45'};">
        <div style="font-weight:700; font-size:0.9rem; color:${isUnlocked ? 'var(--accent)' : 'var(--text-dim)'};">${isUnlocked ? '🏆 ' : '🔒 '}${bInfo.name}</div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">${bInfo.desc}</div>
      </div>
    `;
  });
  badgesHtml += '</div>';

  els.statsContent.innerHTML = `
    <div class="result-stats" style="margin-bottom:18px;">
      <div class="stat"><span class="stat-value">${p.solvedTotal}</span><span class="stat-label">${d.statsAnswered}</span></div>
      <div class="stat"><span class="stat-value">${acc}%</span><span class="stat-label">${d.statsAccuracy}</span></div>
      <div class="stat"><span class="stat-value">${p.streak}</span><span class="stat-label">${d.statStreakLabel}</span></div>
    </div>
    <h4 style="margin:16px 0 8px; font-family:var(--font-display);">${d.statsBadges}</h4>
    ${badgesHtml}
  `;

  els.statsModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

// TERMINAL PLAYGROUND
function initTerminal() {
  terminal = new ArenaKaliTerminal();
  terminal.lang = state.lang;
  updateTerminalPrompt();

  els.terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = els.terminalInput.value;
      els.terminalInput.value = "";
      if (!cmd.trim()) return;

      const p = terminal.getPrompt();
      const promptLine = `${p.user}@${p.host}:${p.path}${p.char} ${cmd}`;
      const out = terminal.execute(cmd);

      if (out === '__CLEAR_SCREEN__') {
        els.terminalOutput.textContent = "";
      } else {
        els.terminalOutput.textContent += promptLine + "\n" + (out ? out + "\n" : "");
      }

      updateTerminalPrompt();
      els.terminalBody.scrollTop = els.terminalBody.scrollHeight;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (terminal.historyIndex < terminal.history.length - 1) {
        terminal.historyIndex++;
        els.terminalInput.value = terminal.history[terminal.history.length - 1 - terminal.historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (terminal.historyIndex > 0) {
        terminal.historyIndex--;
        els.terminalInput.value = terminal.history[terminal.history.length - 1 - terminal.historyIndex] || "";
      } else if (terminal.historyIndex === 0) {
        terminal.historyIndex = -1;
        els.terminalInput.value = "";
      }
    }
  });

  els.terminalBody.addEventListener("click", () => els.terminalInput.focus());

  els.termClearBtn.addEventListener("click", () => {
    els.terminalOutput.textContent = "";
    els.terminalInput.focus();
  });

  els.termSampleBtn.addEventListener("click", () => {
    const sampleText = state.lang === 'tr' ?
      "\n[+] Örnek Komutlar:\n  1. cat /etc/passwd | cut -d: -f1\n  2. nmap -sS -p 22,80 10.10.10.45\n  3. ss -tulpn\n  4. sudo -l\n  5. sudo su\n  6. cat /root/root.txt\n" :
      "\n[+] Sample Commands:\n  1. cat /etc/passwd | cut -d: -f1\n  2. nmap -sS -p 22,80 10.10.10.45\n  3. ss -tulpn\n  4. sudo -l\n  5. sudo su\n  6. cat /root/root.txt\n";
    els.terminalOutput.textContent += sampleText;
    els.terminalBody.scrollTop = els.terminalBody.scrollHeight;
    els.terminalInput.focus();
  });
}

function updateTerminalPrompt() {
  if (!terminal) return;
  const p = terminal.getPrompt();
  els.terminalPrompt.textContent = `${p.user}@${p.host}:${p.path}${p.char}`;
}

// UTILS
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function seededShuffle(arr, seed) {
  const copy = arr.slice();
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280;
    const j = Math.floor(rnd * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// INIT & LISTENERS
function init() {
  loadProgress();

  // Apply Theme
  const savedTheme = localStorage.getItem("arenakali_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (els.themeDarkBtn) els.themeDarkBtn.classList.toggle("active", savedTheme === "dark");
  if (els.themeLightBtn) els.themeLightBtn.classList.toggle("active", savedTheme === "light");

  // Apply Language
  applyLanguage(state.lang);

  // Mode Tab Switcher (Quiz vs Debug)
  els.modeTabQuiz.addEventListener("click", () => {
    state.homeMode = "quiz";
    els.modeTabQuiz.classList.add("active");
    els.modeTabDebug.classList.remove("active");
    els.quizSection.classList.remove("hidden");
    els.debugSection.classList.add("hidden");
  });

  els.modeTabDebug.addEventListener("click", () => {
    state.homeMode = "debug";
    els.modeTabDebug.classList.add("active");
    els.modeTabQuiz.classList.remove("active");
    els.debugSection.classList.remove("hidden");
    els.quizSection.classList.add("hidden");
  });

  // Topbar Actions
  els.playgroundBtn.addEventListener("click", () => switchScreen("play"));
  els.playBackBtn.addEventListener("click", () => switchScreen("home"));

  els.helpBtn.addEventListener("click", () => {
    els.helpModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  });
  els.helpClose.addEventListener("click", closeModals);

  els.settingsBtn.addEventListener("click", () => {
    els.settingsModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  });
  els.settingsClose.addEventListener("click", closeModals);

  els.statsBtn.addEventListener("click", openStatsModal);
  els.statsClose.addEventListener("click", closeModals);

  els.fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Theme Toggles
  els.themeDarkBtn.addEventListener("click", () => {
    localStorage.setItem("arenakali_theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    els.themeDarkBtn.classList.add("active");
    els.themeLightBtn.classList.remove("active");
  });
  els.themeLightBtn.addEventListener("click", () => {
    localStorage.setItem("arenakali_theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    els.themeLightBtn.classList.add("active");
    els.themeDarkBtn.classList.remove("active");
  });

  // Language Toggles
  els.langTrBtn.addEventListener("click", () => applyLanguage("tr"));
  els.langEnBtn.addEventListener("click", () => applyLanguage("en"));

  // Reset Progress
  els.resetBestBtn.addEventListener("click", () => {
    localStorage.removeItem("arenakali_progress");
    loadProgress();
    updateProgressUI();
    renderHomeCards();
    const d = dict();
    els.settingsFeedback.textContent = d.settingsResetDone;
    els.settingsFeedback.classList.remove("hidden");
    setTimeout(() => els.settingsFeedback.classList.add("hidden"), 3000);
  });

  // Setup Modal Controls
  els.setupClose.addEventListener("click", closeModals);
  els.modeClassicBtn.addEventListener("click", () => {
    state.setup.mode = "classic";
    els.modeClassicBtn.classList.add("active");
    els.modeExamBtn.classList.remove("active");
    els.setupModeDesc.textContent = dict().modeClassicDesc;
  });
  els.modeExamBtn.addEventListener("click", () => {
    state.setup.mode = "exam";
    els.modeExamBtn.classList.add("active");
    els.modeClassicBtn.classList.remove("active");
    els.setupModeDesc.textContent = dict().modeExamDesc;
  });

  const countBtns = [
    { btn: els.count5Btn, val: 5 },
    { btn: els.count10Btn, val: 10 },
    { btn: els.count15Btn, val: 15 },
    { btn: els.countAllBtn, val: "all" }
  ];
  countBtns.forEach(({ btn, val }) => {
    btn.addEventListener("click", () => {
      state.setup.count = val;
      countBtns.forEach(b => b.btn.classList.toggle("active", b.val === val));
    });
  });

  const timeBtns = [
    { btn: els.timeOffBtn, val: 0 },
    { btn: els.time2Btn, val: 120 },
    { btn: els.time5Btn, val: 300 },
    { btn: els.time10Btn, val: 600 }
  ];
  timeBtns.forEach(({ btn, val }) => {
    btn.addEventListener("click", () => {
      state.setup.time = val;
      timeBtns.forEach(b => b.btn.classList.toggle("active", b.val === val));
    });
  });

  els.setupStartBtn.addEventListener("click", () => {
    startTest({
      difficulty: state.pendingDifficulty,
      mode: state.setup.mode,
      count: state.setup.count,
      time: state.setup.time,
      topic: els.topicSelect.value || "all"
    });
  });

  // Debug Modal Controls
  els.debugClose.addEventListener("click", closeModals);
  const debugLvlBtns = [
    { btn: els.debugLvlBeginner, lvl: "beginner" },
    { btn: els.debugLvlIntermediate, lvl: "intermediate" },
    { btn: els.debugLvlAdvanced, lvl: "advanced" },
    { btn: els.debugLvlExpert, lvl: "expert" }
  ];
  debugLvlBtns.forEach(({ btn, lvl }) => {
    btn.addEventListener("click", () => {
      state.debugLevel = lvl;
      debugLvlBtns.forEach(b => b.btn.classList.toggle("active", b.lvl === lvl));
      const countNum = DEBUG_QUESTIONS[lvl] ? DEBUG_QUESTIONS[lvl].length : 0;
      const d = dict();
      els.debugPoolLabel.textContent = `${d.diff[lvl].label} · ${countNum} ${d.debugPoolSuffix}`;
    });
  });

  els.debugModeClassicBtn.addEventListener("click", () => {
    state.debugSetup.mode = "classic";
    els.debugModeClassicBtn.classList.add("active");
    els.debugModeExamBtn.classList.remove("active");
  });
  els.debugModeExamBtn.addEventListener("click", () => {
    state.debugSetup.mode = "exam";
    els.debugModeExamBtn.classList.add("active");
    els.debugModeClassicBtn.classList.remove("active");
  });

  const debugCountBtns = [
    { btn: els.debugCount5Btn, val: 5 },
    { btn: els.debugCount10Btn, val: 10 },
    { btn: els.debugCountAllBtn, val: "all" }
  ];
  debugCountBtns.forEach(({ btn, val }) => {
    btn.addEventListener("click", () => {
      state.debugSetup.count = val;
      debugCountBtns.forEach(b => b.btn.classList.toggle("active", b.val === val));
    });
  });

  els.debugStartBtn.addEventListener("click", () => {
    startTest({
      difficulty: state.debugLevel,
      mode: state.debugSetup.mode,
      count: state.debugSetup.count,
      time: 0
    });
  });

  // Quiz Screen Controls
  els.nextBtn.addEventListener("click", nextStep);
  els.quizBackBtn.addEventListener("click", () => {
    els.confirmModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  });
  els.confirmStayBtn.addEventListener("click", closeModals);
  els.confirmExitBtn.addEventListener("click", () => {
    closeModals();
    switchScreen("home");
  });

  // Result Screen Controls
  els.retryBtn.addEventListener("click", () => {
    startTest(state.config);
  });
  els.homeBtn.addEventListener("click", () => {
    switchScreen("home");
  });

  // PWA Install Modal & Trigger
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  if (els.installBtn) {
    els.installBtn.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (outcome === 'accepted') {
          closeModals();
        }
      } else {
        closeModals();
        els.installModal.classList.remove("hidden");
        document.body.classList.add("modal-open");
      }
    });
  }

  if (els.installClose) {
    els.installClose.addEventListener("click", closeModals);
  }

  // Keyboard Navigation
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) {
      return;
    }

    if (e.key === "Escape") {
      closeModals();
      return;
    }

    if (currentScreen === "quiz") {
      const key = e.key.toUpperCase();
      const idx = LETTERS.indexOf(key);
      if (idx !== -1 && idx < els.optionsGrid.children.length && !state.answered) {
        handleAnswer(idx);
      } else if (e.key === "Enter" && state.answered) {
        nextStep();
      }
    }
  });

  // Service Worker Registration
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const installing = reg.installing;
        if (!installing) return;
        installing.addEventListener("statechange", () => {
          if (installing.state === "activated" && navigator.serviceWorker.controller) {
            console.log("ArenaKali updated to latest cache.");
          }
        });
      });
    }).catch((err) => {
      console.warn("SW registration note:", err);
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
