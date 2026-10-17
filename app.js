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
    quizBack: "← Seviye Seç",
    quizBadge: "TERMINAL QUIZ",
    debugBadge: "BUG HUNTER",
    debugDesc: "Komutlardaki tehlikeli hataları ve güvenlik açıklarını dedektif gibi bul",
    debugSetupTitle: "Bug Hunter Ayarla",
    setupLevel: "Seviye",
    qDebug: "Bu koddaki veya komuttaki hata/tuzak nedir?",
    quizTabSub: "Linux komut çıktısı & siber güvenlik soruları",
    debugTabSub: "Komutlardaki sözdizimi ve güvenlik tuzaklarını bul",
    debugSectionTitle: "Debug seviyesi seç",
    confirmExitTitle: "Testten çıkılsın mı?",
    confirmExitText: "Test ilerlemen kaydedilmeyecek. Emin misin?",
    confirmStay: "Devam Et",
    confirmExit: "Çık",
    helpTitle: "Nasıl oynanır?",
    helpIntro: "ArenaKali, siber güvenlik öğrenenler için Linux komutlarını, filtreleri ve yetki yükseltme mantığını test eden bir pratik aracıdır.",
    footerText: "ArenaKali · Siber güvenlik odaklı Linux terminal pratiği.",
    installApp: "Uygulamayı Yükle",
    installIntro: "ArenaKali'yi ana ekranına uygulama gibi ekleyebilirsin; çevrimdışı da çalışır.",
    installAndroidTitle: "Android / Desktop (Chrome & Edge)",
    installAndroidDesc: "Adres çubuğundaki 'Yükle' simgesine veya tarayıcı menüsünden 'Uygulamayı yükle'ye dokun.",
    installIosTitle: "iPhone / iPad (Safari)",
    installIosDesc: "Paylaş düğmesine dokun ve 'Ana Ekrana Ekle' seçeneğini seç.",
    installNote: "İpucu: Sayfayı doğrudan tarayıcıda açmalısın.",

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
    settingsResetDone: "Tüm ilerleme ve skorlar sıfırlandı.",
    fullscreenEnter: "Tam ekran",
    fullscreenExit: "Tam ekrandan çık",
    setupTitle: "Testi Ayarla",
    setupMode: "Mod",
    modeClassic: "Klasik",
    modeExam: "Sınav",
    modeClassicDesc: "Her sorudan sonra doğru cevabı ve siber güvenlik açıklamasını görürsün.",
    modeExamDesc: "Sonuçları ve açıklamaları testin sonunda görürsün.",
    setupTopic: "Konu",
    topicAll: "Tüm konular",
    setupCount: "Soru Sayısı",
    countAll: "Tümü",
    setupTime: "Süre",
    timeOff: "Kapalı",
    startTest: "Teste Başla",
    statLevelLabel: "Seviye",
    statStreakLabel: "Gün Serisi",
    statsTitle: "İstatistikler",
    statsAnswered: "Çözülen",
    statsAccuracy: "Doğruluk",
    statsByLevel: "Seviyeye göre",
    statsWeakTopics: "En çok zorlandığın konular",
    statsBadges: "Rozetler",
    statsNoData: "Henüz veri yok, birkaç test çöz!",
    mistakesTest: "Yanlışlarımı Çalış",
    mistakesChip: "Yanlışlarım",
    newBadges: "Yeni rozet:",
    terminalTitle: "Kali Web Terminal",
    qOutput: "Bu komut çalıştırıldığında ne olur?",
    diff: {
      beginner: { label: "Başlangıç", desc: "Temel Linux komutları, dosya sistemi, gezinme ve temel izinler" },
      intermediate: { label: "Orta", desc: "Pipe zincirleri, filtreler (grep/awk/sed), süreçler ve ağ komutları" },
      advanced: { label: "İleri", desc: "Siber güvenlik keşfi, Nmap, Gobuster, log analizi ve SSH" },
      expert: { label: "Uzman (Red & Blue Team)", desc: "Yetki yükseltme (privesc), SUID, GTFOBins, reverse shell ve sıkılaştırma" },
      mixed: { label: "Karışık", desc: "Tüm seviyelerden harmanlanmış siber güvenlik soruları" }
    },
    questionCount: "{n} soru",
    best: "En iyi: {a}/{b}",
    notAttempted: "Henüz denenmedi",
    progressQuestion: "Soru {a} / {b}",
    progressCorrect: "Doğru: {n}",
    correctTitle: "Doğru!",
    wrongTitle: "Yanlış",
    yourAnswer: "Senin cevabın:",
    correctAnswer: "Doğru cevap:",
    nextQuestion: "Sonraki Soru",
    finishTest: "Testi Bitir",
    newRecord: "Yeni rekor! ",
    result: [
      { title: "Kusursuz Root!", sub: "Tüm soruları doğru bildin. Linux ve terminal yeteneklerin olağanüstü." },
      { title: "Kıdemli Pentester!", sub: "Komutlara ve güvenlik mantığına gayet hâkimsin. Bir üst seviyede sınırlarını zorla." },
      { title: "Sağlam Temel!", sub: "Linux mantığını kavramışsın. Aşağıdaki siber güvenlik açıklamalarını okuyarak eksikleri kapat." },
      { title: "Gelişmeye Açık", sub: "Birkaç kritik hatan var. Yanlışların açıklamalarını incele ve tekrar dene." },
      { title: "Öğrenme Aşaması", sub: "Linux öğrenmek sabır ister. Açıklamaları oku, komutları terminalde dene ve tekrar çöz!" }
    ],
    statCorrect: "Doğru",
    statWrong: "Yanlış",
    statLevel: "Seviye",
    retry: "Tekrar Dene",
    chooseLevel: "Seviye Seç",
    dailyChallenge: "Günlük Görev",
    badges: {
      first_step: { name: "İlk Komut", desc: "İlk Linux testini tamamla" },
      sharp_eye: { name: "Terminal Kurdu", desc: "Bir testi %100 doğrulukla bitir" },
      expert_ace: { name: "Root Ustası", desc: "Uzman seviyesinde %100 yap" },
      century: { name: "Yüz Komut", desc: "Toplam 100 soru çöz" },
      five_hundred: { name: "Siber Uzman", desc: "Toplam 500 soru çöz" },
      streak_3: { name: "Alev Serisi", desc: "3 gün üst üste pratik yap" },
      streak_7: { name: "Haftalık Operasyon", desc: "7 gün kesintisiz oyna" },
      timed_hero: { name: "Hızlı Hacker", desc: "Süreli testte %80+ başarı sağla" },
      exam_master: { name: "Sınav Lideri", desc: "Sınav modunda %80+ yap" },
      daily_done: { name: "Günlük Görev", desc: "Günlük meydan okumayı bitir" },
      mistake_fixer: { name: "Hata Avcısı", desc: "Yanlışlarım testini %80+ ile tamamla" },
      debug_first: { name: "İlk Bug", desc: "İlk Bug Hunter testini bitir" },
      debug_perfect: { name: "Kusursuz Dedektif", desc: "Bir debug testini %100 ile bitir" },
      debug_expert: { name: "Kıdemli Güvenlikçi", desc: "Uzman debug testinde %100 yap" },
      level_5: { name: "Cyber Titan", desc: "5. seviyeye ulaş" }
    }
  },
  en: {
    documentTitle: "ArenaKali · Linux & Cybersecurity Logic Quiz",
    brandTag: "kali · linux · cyber quiz",
    heroTitleA: "Can you predict the ",
    heroTitleB: "command output?",
    heroText: "Practice interactive Linux commands, pipelines, recon, digital forensics, and privilege escalation logic.",
    heroMetaPool: "<b>{n}</b> questions in pool",
    heroMetaPerRound: "<b>{n}</b> questions per test",
    heroMetaKbd: "A–D keyboard support",
    homeSectionTitle: "Choose difficulty",
    homeSectionSub: "Questions are randomized every round, each attempt is a new cyber training session.",
    quizBack: "← Choose Level",
    quizBadge: "TERMINAL QUIZ",
    debugBadge: "BUG HUNTER",
    debugDesc: "Spot dangerous command syntax flaws and security vulnerabilities",
    debugSetupTitle: "Configure Bug Hunter",
    setupLevel: "Level",
    qDebug: "What is the bug or vulnerability in this command?",
    quizTabSub: "Linux command outputs & security logic",
    debugTabSub: "Detect command syntax traps and flaws",
    debugSectionTitle: "Choose debug level",
    confirmExitTitle: "Quit the test?",
    confirmExitText: "Your test progress will not be saved. Are you sure?",
    confirmStay: "Keep Going",
    confirmExit: "Quit",
    helpTitle: "How to play",
    helpIntro: "ArenaKali is a specialized training platform testing Linux commands, pipelines, and cybersecurity privilege escalation logic.",
    footerText: "ArenaKali · Cybersecurity-oriented Linux terminal practice.",
    installApp: "Install App",
    installIntro: "Add ArenaKali to your home screen as an app; works completely offline.",
    installAndroidTitle: "Android / Desktop (Chrome & Edge)",
    installAndroidDesc: "Click the 'Install' icon in the address bar or choose 'Install app' from browser menu.",
    installIosTitle: "iPhone / iPad (Safari)",
    installIosDesc: "Tap the Share button and select 'Add to Home Screen'.",
    installNote: "Tip: Open page directly in browser to enable full PWA features.",

    settingsTitle: "Settings",
    settingsTheme: "Theme",
    settingsThemeDesc: "Dark Kali or light theme",
    themeDark: "Dark",
    themeLight: "Light",
    settingsLanguage: "Language",
    settingsLanguageDesc: "Türkçe or English",
    settingsReset: "Reset Scores",
    settingsResetDesc: "Clear all XP and high scores",
    resetBtn: "Reset",
    settingsResetDone: "All progress and scores have been reset.",
    fullscreenEnter: "Fullscreen",
    fullscreenExit: "Exit fullscreen",
    setupTitle: "Set Up Test",
    setupMode: "Mode",
    modeClassic: "Classic",
    modeExam: "Exam",
    modeClassicDesc: "See the correct answer and cyber explanation after each question.",
    modeExamDesc: "Review all results and explanations at the end of the test.",
    setupTopic: "Topic",
    topicAll: "All topics",
    setupCount: "Questions",
    countAll: "All",
    setupTime: "Time Limit",
    timeOff: "Off",
    startTest: "Start Test",
    statLevelLabel: "Level",
    statStreakLabel: "Day Streak",
    statsTitle: "Statistics",
    statsAnswered: "Solved",
    statsAccuracy: "Accuracy",
    statsByLevel: "By Level",
    statsWeakTopics: "Most Challenging Topics",
    statsBadges: "Badges",
    statsNoData: "No data yet, solve a few tests!",
    mistakesTest: "Practice Mistakes",
    mistakesChip: "Mistakes",
    newBadges: "New badge:",
    terminalTitle: "Kali Web Terminal",
    qOutput: "What happens when this command runs?",
    diff: {
      beginner: { label: "Beginner", desc: "Basic Linux commands, filesystem navigation, and core permissions" },
      intermediate: { label: "Intermediate", desc: "Pipes, filters (grep/awk/sed), processes, and networking" },
      advanced: { label: "Advanced", desc: "Cybersecurity recon, Nmap, Gobuster, log forensics, and SSH" },
      expert: { label: "Expert (Red & Blue Team)", desc: "Privilege escalation (privesc), SUID, GTFOBins, reverse shells, and hardening" },
      mixed: { label: "Mixed", desc: "Curated randomized questions from all difficulty levels" }
    },
    questionCount: "{n} questions",
    best: "Best: {a}/{b}",
    notAttempted: "Not attempted yet",
    progressQuestion: "Question {a} / {b}",
    progressCorrect: "Correct: {n}",
    correctTitle: "Correct!",
    wrongTitle: "Wrong",
    yourAnswer: "Your answer:",
    correctAnswer: "Correct answer:",
    nextQuestion: "Next Question",
    finishTest: "Finish Test",
    newRecord: "New record! ",
    result: [
      { title: "Flawless Root!", sub: "You answered every question correctly. Exceptional Linux mastery." },
      { title: "Senior Pentester!", sub: "Great command of Linux and security logic. Try an even higher level." },
      { title: "Solid Foundation!", sub: "Good understanding of core mechanics. Read the explanations below to seal any gaps." },
      { title: "Room for Growth", sub: "A few missteps. Review the security explanations below and test again." },
      { title: "Learning Journey", sub: "Linux mastery takes time. Read the notes, run commands in the terminal, and retry!" }
    ],
    statCorrect: "Correct",
    statWrong: "Wrong",
    statLevel: "Level",
    retry: "Try Again",
    chooseLevel: "Choose Level",
    dailyChallenge: "Daily Mission",
    badges: {
      first_step: { name: "First Command", desc: "Complete your first Linux quiz" },
      sharp_eye: { name: "Terminal Ace", desc: "Finish a test with 100% accuracy" },
      expert_ace: { name: "Root Master", desc: "Score 100% in Expert level" },
      century: { name: "Century Club", desc: "Solve 100 questions" },
      five_hundred: { name: "Cyber Veteran", desc: "Solve 500 questions" },
      streak_3: { name: "Fire Streak", desc: "Practice 3 days in a row" },
      streak_7: { name: "Weekly Op", desc: "Maintain a 7-day streak" },
      timed_hero: { name: "Speed Hacker", desc: "Score 80%+ on a timed test" },
      exam_master: { name: "Exam Leader", desc: "Score 80%+ in Exam mode" },
      daily_done: { name: "Daily Mission", desc: "Complete a daily challenge" },
      mistake_fixer: { name: "Mistake Fixer", desc: "Score 80%+ on mistakes practice" },
      debug_first: { name: "First Bug", desc: "Complete your first Bug Hunter test" },
      debug_perfect: { name: "Flawless Hunter", desc: "Finish a debug test with 100%" },
      debug_expert: { name: "Senior Pentester", desc: "Score 100% on Expert debug" },
      level_5: { name: "Cyber Titan", desc: "Reach Level 5" }
    }
  }
};

const BASH_COMMANDS = new Set([
  "ls", "cd", "pwd", "cat", "echo", "grep", "awk", "sed", "chmod", "chown",
  "nmap", "nc", "netcat", "curl", "wget", "base64", "sha256sum", "md5sum",
  "find", "sudo", "su", "bash", "sh", "ssh", "scp", "ssh-keygen", "whoami",
  "id", "uname", "cut", "sort", "uniq", "wc", "ps", "kill", "ss", "netstat",
  "ping", "tar", "mkdir", "rm", "cp", "mv", "touch", "head", "tail", "xargs",
  "strings", "lastb", "last", "dmesg", "dig", "gobuster", "nikto", "masscan",
  "iptables", "docker", "socat", "whatweb", "dnsrecon", "file", "history",
  "clear", "which", "whereis", "chroot", "getcap", "setcap", "shred", "umask",
  "pgrep", "pkill", "lsof", "crontab", "export", "alias", "date", "df", "du"
]);

// ELEMENTS
const els = {
  diffGrid: document.getElementById("diffGrid"),
  debugGrid: document.getElementById("debugGrid"),
  quizSection: document.getElementById("quizSection"),
  debugSection: document.getElementById("debugSection"),
  modeTabQuiz: document.getElementById("modeTabQuiz"),
  modeTabDebug: document.getElementById("modeTabDebug"),
  screenHome: document.getElementById("screenHome"),
  screenQuiz: document.getElementById("screenQuiz"),
  screenResult: document.getElementById("screenResult"),
  screenPlay: document.getElementById("screenPlay"),
  brandHome: document.getElementById("brandHome"),
  helpBtn: document.getElementById("helpBtn"),
  helpModal: document.getElementById("helpModal"),
  helpClose: document.getElementById("helpClose"),
  playgroundBtn: document.getElementById("playgroundBtn"),
  playBackBtn: document.getElementById("playBackBtn"),
  quizBackBtn: document.getElementById("quizBackBtn"),
  quizDiffChip: document.getElementById("quizDiffChip"),
  progressFill: document.getElementById("progressFill"),
  progressQuestion: document.getElementById("progressQuestion"),
  progressScore: document.getElementById("progressScore"),
  timerChip: document.getElementById("timerChip"),
  codeBlock: document.getElementById("codeBlock"),
  questionText: document.getElementById("questionText"),
  optionsGrid: document.getElementById("optionsGrid"),
  feedback: document.getElementById("feedback"),
  feedbackIcon: document.getElementById("feedbackIcon"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackAnswer: document.getElementById("feedbackAnswer"),
  feedbackText: document.getElementById("feedbackText"),
  nextBtn: document.getElementById("nextBtn"),
  ringFill: document.getElementById("ringFill"),
  ringPercent: document.getElementById("ringPercent"),
  ringScore: document.getElementById("ringScore"),
  resultTitle: document.getElementById("resultTitle"),
  resultSubtitle: document.getElementById("resultSubtitle"),
  resultBadges: document.getElementById("resultBadges"),
  statCorrect: document.getElementById("statCorrect"),
  statWrong: document.getElementById("statWrong"),
  statDiff: document.getElementById("statDiff"),
  retryBtn: document.getElementById("retryBtn"),
  homeBtn: document.getElementById("homeBtn"),
  review: document.getElementById("review"),
  reviewList: document.getElementById("reviewList"),
  fullscreenBtn: document.getElementById("fullscreenBtn"),
  fsIconEnter: document.getElementById("fsIconEnter"),
  fsIconExit: document.getElementById("fsIconExit"),
  settingsBtn: document.getElementById("settingsBtn"),
  settingsModal: document.getElementById("settingsModal"),
  settingsClose: document.getElementById("settingsClose"),
  themeDarkBtn: document.getElementById("themeDarkBtn"),
  themeLightBtn: document.getElementById("themeLightBtn"),
  langTrBtn: document.getElementById("langTrBtn"),
  langEnBtn: document.getElementById("langEnBtn"),
  resetBestBtn: document.getElementById("resetBestBtn"),
  settingsFeedback: document.getElementById("settingsFeedback"),
  setupModal: document.getElementById("setupModal"),
  setupClose: document.getElementById("setupClose"),
  setupDiffLabel: document.getElementById("setupDiffLabel"),
  setupModeDesc: document.getElementById("setupModeDesc"),
  modeClassicBtn: document.getElementById("modeClassicBtn"),
  modeExamBtn: document.getElementById("modeExamBtn"),
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
  confirmModal: document.getElementById("confirmModal"),
  confirmStayBtn: document.getElementById("confirmStayBtn"),
  confirmExitBtn: document.getElementById("confirmExitBtn"),
  levelValue: document.getElementById("levelValue"),
  xpValue: document.getElementById("xpValue"),
  xpFill: document.getElementById("xpFill"),
  streakValue: document.getElementById("streakValue"),
  dailyBtn: document.getElementById("dailyBtn"),
  statsBtn: document.getElementById("statsBtn"),
  mistakesBtn: document.getElementById("mistakesBtn"),
  statsModal: document.getElementById("statsModal"),
  statsClose: document.getElementById("statsClose"),
  installBtn: document.getElementById("installBtn"),
  installModal: document.getElementById("installModal"),
  installClose: document.getElementById("installClose"),
  statsContent: document.getElementById("statsContent"),
  terminalPrompt: document.getElementById("terminalPrompt"),
  terminalInput: document.getElementById("terminalInput"),
  terminalOutput: document.getElementById("terminalOutput"),
  terminalBody: document.getElementById("terminalBody"),
  termClearBtn: document.getElementById("termClearBtn"),
  termSampleBtn: document.getElementById("termSampleBtn")
};

const state = {
  lang: localStorage.getItem("arenakali_lang") || "tr",
  theme: localStorage.getItem("arenakali_theme") || "dark",
  setup: { ...DEFAULT_SETUP },
  debugSetup: { ...DEBUG_DEFAULT_SETUP },
  homeMode: "quiz",
  pendingDifficulty: null,
  isDebug: false,
  debugLevel: null,
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

function fmt(tmpl, vals) {
  return tmpl.replace(/\{(\w+)\}/g, (_, k) => (vals[k] !== undefined ? vals[k] : _));
}

function esc(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function span(cls, txt) {
  return `<span class="${cls}">${esc(txt)}</span>`;
}

// BASH SYNTAX HIGHLIGHTER
function highlightBash(code) {
  let out = "";
  const lines = code.split('\n');

  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) out += "\n";
    let i = 0;

    while (i < line.length) {
      const rest = line.slice(i);

      // Comments
      if (rest.startsWith('#')) {
        out += span("tok-comment", rest);
        break;
      }

      // Strings single quote
      if (rest.startsWith("'")) {
        const end = rest.indexOf("'", 1);
        const chunk = end !== -1 ? rest.slice(0, end + 1) : rest;
        out += span("tok-str", chunk);
        i += chunk.length;
        continue;
      }

      // Strings double quote
      if (rest.startsWith('"')) {
        const end = rest.indexOf('"', 1);
        const chunk = end !== -1 ? rest.slice(0, end + 1) : rest;
        out += span("tok-str", chunk);
        i += chunk.length;
        continue;
      }

      // Variables ($VAR, $?, $1, etc.)
      const varMatch = /^\$[a-zA-Z0-9_?#@*!]+/.exec(rest);
      if (varMatch) {
        out += span("tok-var", varMatch[0]);
        i += varMatch[0].length;
        continue;
      }

      // Pipes & Redirections (| > >> && || ; 2>&1)
      const pipeMatch = /^(2>&1|>>|&&|\|\||>|\||;|0>&1)/.exec(rest);
      if (pipeMatch) {
        out += span("tok-pipe", pipeMatch[0]);
        i += pipeMatch[0].length;
        continue;
      }

      // Flags (-la, -sS, --help, -exec)
      const flagMatch = /^--?[a-zA-Z0-9_-]+/.exec(rest);
      if (flagMatch) {
        out += span("tok-flag", flagMatch[0]);
        i += flagMatch[0].length;
        continue;
      }

      // Numbers & IPs
      const numMatch = /^\b\d+(\.\d+)*\b/.exec(rest);
      if (numMatch) {
        out += span("tok-num", numMatch[0]);
        i += numMatch[0].length;
        continue;
      }

      // Words & Commands
      const wordMatch = /^[a-zA-Z0-9_./-]+/.exec(rest);
      if (wordMatch) {
        const word = wordMatch[0];
        const base = word.split('/').pop();
        if (BASH_COMMANDS.has(base) || BASH_COMMANDS.has(word)) {
          out += span("tok-cmd", word);
        } else {
          out += esc(word);
        }
        i += word.length;
        continue;
      }

      // Whitespace and other characters
      out += esc(line[i]);
      i++;
    }
  });

  return out;
}

// STORAGE & PROGRESS
function loadProgress() {
  const raw = localStorage.getItem("arenakali_progress");
  if (raw) {
    try { return JSON.parse(raw); } catch (e) {}
  }
  return {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    dailyDate: null,
    best: {},
    mistakes: [],
    badges: [],
    solvedTotal: 0,
    solvedCorrect: 0,
    topicsSolved: {}
  };
}

function saveProgress() {
  localStorage.setItem("arenakali_progress", JSON.stringify(state.progress));
}

function addXP(amount) {
  state.progress.xp += amount;
  while (state.progress.xp >= state.progress.level * XP_PER_LEVEL) {
    state.progress.xp -= state.progress.level * XP_PER_LEVEL;
    state.progress.level++;
    checkBadges();
  }
  saveProgress();
  updateProgressUI();
}

function checkStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last = state.progress.lastActiveDate;
  if (!last) {
    state.progress.streak = 1;
  } else if (last === today) {
    // already active today
  } else {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (last === yesterday) {
      state.progress.streak++;
    } else {
      state.progress.streak = 1;
    }
  }
  state.progress.lastActiveDate = today;
  saveProgress();
  checkBadges();
}

function checkBadges() {
  const p = state.progress;
  const newBadges = [];

  function unlock(id) {
    if (!p.badges.includes(id)) {
      p.badges.push(id);
      newBadges.push(id);
    }
  }

  if (p.solvedTotal >= 1) unlock("first_step");
  if (p.solvedTotal >= 100) unlock("century");
  if (p.solvedTotal >= 500) unlock("five_hundred");
  if (p.streak >= 3) unlock("streak_3");
  if (p.streak >= 7) unlock("streak_7");
  if (p.level >= 5) unlock("level_5");

  saveProgress();
  return newBadges;
}

function updateProgressUI() {
  const p = state.progress;
  els.levelValue.textContent = p.level;
  const targetXP = p.level * XP_PER_LEVEL;
  els.xpValue.textContent = `${p.xp} / ${targetXP} XP`;
  els.xpFill.style.width = Math.min(100, Math.floor((p.xp / targetXP) * 100)) + '%';
  els.streakValue.textContent = p.streak;

  const today = new Date().toISOString().slice(0, 10);
  if (p.dailyDate === today) {
    els.dailyBtn.textContent = "✓ " + dict().dailyChallenge;
    els.dailyBtn.classList.remove("btn-primary");
    els.dailyBtn.classList.add("btn-ghost");
  } else {
    els.dailyBtn.textContent = dict().dailyChallenge;
    els.dailyBtn.classList.add("btn-primary");
    els.dailyBtn.classList.remove("btn-ghost");
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
    setTimeout(() => els.terminalInput.focus(), 100);
  }
  window.scrollTo(0, 0);
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
    const bestScore = state.progress.best[bestKey] !== undefined ? `${state.progress.best[bestKey]}/10` : d.notAttempted;

    card.innerHTML = `
      <div class="diff-head">
        <span class="diff-title">${info.label}</span>
        <span class="diff-badge">${poolCount} soru</span>
      </div>
      <p class="diff-desc">${info.desc}</p>
      <div class="diff-meta">
        <span>${fmt(d.best, { a: state.progress.best[bestKey] || 0, b: 10 })}</span>
        <span style="color:var(--accent);">Başla →</span>
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
    const info = d.diff[key];
    const poolCount = DEBUG_QUESTIONS[key] ? DEBUG_QUESTIONS[key].length : 0;
    const bestKey = `debug_${key}`;

    card.innerHTML = `
      <div class="diff-head">
        <span class="diff-title">${info.label}</span>
        <span class="diff-badge" style="color:var(--amber); background:rgba(251,191,36,0.15);">${poolCount} bug</span>
      </div>
      <p class="diff-desc">${info.desc}</p>
      <div class="diff-meta">
        <span>${fmt(d.best, { a: state.progress.best[bestKey] || 0, b: 10 })}</span>
        <span style="color:var(--amber);">Dedektif Başlat →</span>
      </div>
    `;
    card.addEventListener("click", () => openDebugModal(key));
    els.debugGrid.appendChild(card);
  });
}

function openSetupModal(difficulty, isDirect = false) {
  state.pendingDifficulty = difficulty;
  state.isDebug = false;
  const d = dict();

  els.setupDiffLabel.textContent = `${d.diff[difficulty].label} · ${difficulty === 'mixed' ? 100 : QUESTIONS[difficulty].length} ${d.questionCount.replace('{n}', '')}`;

  // Populate topics
  els.topicSelect.innerHTML = `<option value="all">${d.topicAll}</option>`;
  if (difficulty !== "mixed") {
    const topicSet = new Set(QUESTIONS[difficulty].map(q => q.topic));
    topicSet.forEach(top => {
      if (TOPICS[top]) {
        const opt = document.createElement("option");
        opt.value = top;
        opt.textContent = TOPICS[top][state.lang] || TOPICS[top].tr;
        els.topicSelect.appendChild(opt);
      }
    });
  }

  els.setupModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function openDebugModal(level) {
  state.debugLevel = level;
  state.isDebug = true;
  const d = dict();
  els.debugPoolLabel.textContent = `${d.diff[level].label} · ${DEBUG_QUESTIONS[level].length} debug sorusu`;
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

  // Build queue
  let pool = [];
  if (state.isDebug) {
    pool = (DEBUG_QUESTIONS[state.debugLevel] || []).slice();
  } else if (state.isDaily) {
    // Seeded random 10 questions across all pools
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
    alert("Bu kriterlere uygun soru bulunamadı.");
    return;
  }

  // Shuffle and limit
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

  // Question & Code
  els.questionText.textContent = state.isDebug ? d.qDebug : d.qOutput;
  els.codeBlock.innerHTML = highlightBash(q.code);

  // Options
  els.optionsGrid.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    const text = typeof opt === "object" ? (opt[state.lang] || opt.tr) : opt;
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
    // Record mistake
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
    // Show feedback immediately
    els.feedback.classList.remove("hidden", "correct", "wrong");
    els.feedback.classList.add(isCorrect ? "correct" : "wrong");
    els.feedbackIcon.textContent = isCorrect ? "✓" : "✗";
    els.feedbackTitle.textContent = isCorrect ? d.correctTitle : d.wrongTitle;

    const optCorrect = q.options[q.answer];
    const correctStr = typeof optCorrect === "object" ? (optCorrect[state.lang] || optCorrect.tr) : optCorrect;
    els.feedbackAnswer.textContent = `${d.correctAnswer} ${correctStr}`;

    const exp = q.explanation ? (q.explanation[state.lang] || q.explanation.tr) : "";
    els.feedbackText.textContent = exp;

    els.nextBtn.textContent = state.index === state.queue.length - 1 ? d.finishTest : d.nextQuestion;
  } else {
    // Exam mode auto advance or quick delay
    setTimeout(() => nextStep(), 400);
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

  // Animate Gauge
  els.ringPercent.textContent = pct + '%';
  els.ringScore.textContent = `${correct} / ${total}`;
  const offset = RING_CIRC - (pct / 100) * RING_CIRC;
  setTimeout(() => {
    els.ringFill.style.strokeDashoffset = offset;
  }, 100);

  // Title based on performance
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

  // Best score record
  const scoreKey = state.isDebug ? `debug_${state.debugLevel}` : `quiz_${state.pendingDifficulty}`;
  if (!state.progress.best[scoreKey] || correct > state.progress.best[scoreKey]) {
    state.progress.best[scoreKey] = correct;
  }

  // Daily completion
  if (state.isDaily) {
    state.progress.dailyDate = new Date().toISOString().slice(0, 10);
    addXP(100); // Daily bonus
  }

  if (pct === 100) checkBadges();
  saveProgress();
  updateProgressUI();

  // Review List
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
    const userStr = typeof userOpt === "object" ? (userOpt[state.lang] || userOpt.tr) : userOpt;
    const correctOpt = q.options[q.answer];
    const correctStr = typeof correctOpt === "object" ? (correctOpt[state.lang] || correctOpt.tr) : correctOpt;
    const expStr = q.explanation ? (q.explanation[state.lang] || q.explanation.tr) : "";

    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <strong style="color:var(--text); font-family:var(--font-display);">Soru ${idx + 1}</strong>
        <span style="font-weight:700; color:${ans.isCorrect ? 'var(--green)' : 'var(--red)'};">${ans.isCorrect ? '✓ Doğru' : '✗ Yanlış'}</span>
      </div>
      <pre class="code" style="padding:10px; border-radius:8px; margin-bottom:10px;"><code>${highlightBash(q.code)}</code></pre>
      <div style="font-size:0.88rem; margin-bottom:4px;"><b>${d.yourAnswer}</b> <span style="color:${ans.isCorrect ? 'var(--green)' : 'var(--red)'};">${esc(userStr || 'Boş')}</span></div>
      ${!ans.isCorrect ? `<div style="font-size:0.88rem; margin-bottom:8px; color:var(--green);"><b>${d.correctAnswer}</b> ${esc(correctStr)}</div>` : ''}
      <p style="font-size:0.88rem; color:var(--text-muted); margin:6px 0 0; line-height:1.5;">${esc(expStr)}</p>
    `;
    els.reviewList.appendChild(item);
  });
}

// STATS MODAL
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
      if (terminal.history.length > 0 && terminal.historyIndex > 0) {
        terminal.historyIndex--;
        els.terminalInput.value = terminal.history[terminal.historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (terminal.historyIndex < terminal.history.length - 1) {
        terminal.historyIndex++;
        els.terminalInput.value = terminal.history[terminal.historyIndex] || "";
      } else {
        terminal.historyIndex = terminal.history.length;
        els.terminalInput.value = "";
      }
    }
  });

  els.termClearBtn.addEventListener("click", () => {
    els.terminalOutput.textContent = "";
  });

  els.termSampleBtn.addEventListener("click", () => {
    els.terminalOutput.textContent += "\n[+] Örnek Komutlar:\n  1. cat /etc/passwd | cut -d: -f1\n  2. nmap -sS -p 22,80 10.10.10.45\n  3. ss -tulpn\n  4. sudo -l\n  5. sudo su\n  6. cat /root/root.txt\n";
    els.terminalBody.scrollTop = els.terminalBody.scrollHeight;
  });
}

function updateTerminalPrompt() {
  if (!terminal) return;
  const p = terminal.getPrompt();
  els.terminalPrompt.textContent = `${p.user}@${p.host}:${p.path}${p.char} `;
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
    const j = Math.floor((s / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// KEYBOARD NAVIGATION
window.addEventListener("keydown", (e) => {
  if (currentScreen !== "quiz" || document.body.classList.contains("modal-open")) return;
  const key = e.key.toUpperCase();

  if (["A", "B", "C", "D", "1", "2", "3", "4"].includes(key)) {
    const map = { "A": 0, "B": 1, "C": 2, "D": 3, "1": 0, "2": 1, "3": 2, "4": 3 };
    handleAnswer(map[key]);
  } else if (e.key === "Enter" && state.answered) {
    nextStep();
  } else if (e.key === "Escape") {
    els.confirmModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  }
});

// INITIALIZATION
function init() {
  state.progress = loadProgress();
  document.documentElement.setAttribute("data-theme", state.theme);
  document.documentElement.setAttribute("lang", state.lang);

  renderHomeCards();
  updateProgressUI();

  // Mode Tabs
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

  // Topbar
  els.brandHome.addEventListener("click", () => switchScreen("home"));
  els.helpBtn.addEventListener("click", () => {
    els.helpModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  });
  els.helpClose.addEventListener("click", closeModals);
  els.playgroundBtn.addEventListener("click", () => switchScreen("play"));
  els.playBackBtn.addEventListener("click", () => switchScreen("home"));
  els.quizBackBtn.addEventListener("click", () => {
    els.confirmModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  });
  els.confirmStayBtn.addEventListener("click", closeModals);
  els.confirmExitBtn.addEventListener("click", () => {
    closeModals();
    switchScreen("home");
  });

  // Next Question
  els.nextBtn.addEventListener("click", nextStep);
  els.retryBtn.addEventListener("click", () => startTest(state.config));
  els.homeBtn.addEventListener("click", () => switchScreen("home"));

  // Daily Challenge
  els.dailyBtn.addEventListener("click", () => {
    startTest({ count: 10, mode: "classic", isDaily: true });
  });

  // Mistakes Test
  els.mistakesBtn.addEventListener("click", () => {
    if (state.progress.mistakes.length === 0) {
      alert("Harika! Henüz kaydedilmiş yanlışın yok.");
      return;
    }
    startTest({ count: 10, mode: "classic", isMistakes: true });
  });

  // Stats Modal
  els.statsBtn.addEventListener("click", openStatsModal);
  els.statsClose.addEventListener("click", closeModals);

  // Setup Modals
  els.setupClose.addEventListener("click", closeModals);
  els.setupStartBtn.addEventListener("click", () => {
    startTest({
      count: state.setup.count,
      mode: state.setup.mode,
      topic: els.topicSelect.value,
      time: state.setup.time
    });
  });

  // Setup Segments
  els.modeClassicBtn.addEventListener("click", () => {
    state.setup.mode = "classic";
    els.modeClassicBtn.classList.add("active");
    els.modeExamBtn.classList.remove("active");
  });
  els.modeExamBtn.addEventListener("click", () => {
    state.setup.mode = "exam";
    els.modeExamBtn.classList.add("active");
    els.modeClassicBtn.classList.remove("active");
  });

  [els.count5Btn, els.count10Btn, els.count15Btn, els.countAllBtn].forEach((btn, i) => {
    btn.addEventListener("click", () => {
      [els.count5Btn, els.count10Btn, els.count15Btn, els.countAllBtn].forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.setup.count = VALID_COUNTS[i];
    });
  });

  // Debug Modal Setup
  els.debugClose.addEventListener("click", closeModals);
  els.debugStartBtn.addEventListener("click", () => {
    startTest({
      count: state.debugSetup.count,
      mode: state.debugSetup.mode,
      time: 0
    });
  });

  // Settings Modal
  els.settingsBtn.addEventListener("click", () => {
    els.settingsModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  });
  els.settingsClose.addEventListener("click", closeModals);

  els.themeDarkBtn.addEventListener("click", () => {
    state.theme = "dark";
    localStorage.setItem("arenakali_theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    els.themeDarkBtn.classList.add("active");
    els.themeLightBtn.classList.remove("active");
  });
  els.themeLightBtn.addEventListener("click", () => {
    state.theme = "light";
    localStorage.setItem("arenakali_theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    els.themeLightBtn.classList.add("active");
    els.themeDarkBtn.classList.remove("active");
  });

  els.langTrBtn.addEventListener("click", () => {
    state.lang = "tr";
    localStorage.setItem("arenakali_lang", "tr");
    document.documentElement.setAttribute("lang", "tr");
    els.langTrBtn.classList.add("active");
    els.langEnBtn.classList.remove("active");
    renderHomeCards();
  });
  els.langEnBtn.addEventListener("click", () => {
    state.lang = "en";
    localStorage.setItem("arenakali_lang", "en");
    document.documentElement.setAttribute("lang", "en");
    els.langEnBtn.classList.add("active");
    els.langTrBtn.classList.remove("active");
    renderHomeCards();
  });

  els.resetBestBtn.addEventListener("click", () => {
    if (confirm("Tüm XP, rekorlar ve rozetler sıfırlanacak. Emin misin?")) {
      localStorage.removeItem("arenakali_progress");
      state.progress = loadProgress();
      renderHomeCards();
      updateProgressUI();
      els.settingsFeedback.textContent = dict().settingsResetDone;
      els.settingsFeedback.classList.remove("hidden");
    }
  });

  // Fullscreen toggle
  els.fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      els.fsIconEnter.classList.add("hidden");
      els.fsIconExit.classList.remove("hidden");
    } else {
      document.exitFullscreen().catch(() => {});
      els.fsIconEnter.classList.remove("hidden");
      els.fsIconExit.classList.add("hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", init);

// PWA INSTALL & SERVICE WORKER
let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (els.installBtn) {
    els.installBtn.classList.remove("btn-ghost");
    els.installBtn.classList.add("btn-primary");
  }
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  if (els.installBtn) {
    els.installBtn.textContent = "✓ Yüklendi";
    els.installBtn.disabled = true;
  }
});

if (els.installBtn) {
  els.installBtn.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } catch (err) {}
      deferredInstallPrompt = null;
      return;
    }
    if (els.installModal) {
      els.installModal.classList.remove("hidden");
      document.body.classList.add("modal-open");
    }
  });
}

if (els.installClose) {
  els.installClose.addEventListener("click", closeModals);
}

if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then((registration) => {
      registration.addEventListener("updatefound", () => {
        const installing = registration.installing;
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
  });
}
