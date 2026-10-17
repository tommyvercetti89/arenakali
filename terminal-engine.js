// ArenaKali Interactive Terminal Engine & Virtual Filesystem
(function (global) {
  'use strict';

  function createVFS() {
    return {
      '/': { type: 'dir', perms: 'rwxr-xr-x', owner: 'root', group: 'root' },
      '/bin': { type: 'dir', perms: 'rwxr-xr-x', owner: 'root', group: 'root' },
      '/etc': { type: 'dir', perms: 'rwxr-xr-x', owner: 'root', group: 'root' },
      '/home': { type: 'dir', perms: 'rwxr-xr-x', owner: 'root', group: 'root' },
      '/home/kali': { type: 'dir', perms: 'rwxr-xr-x', owner: 'kali', group: 'kali' },
      '/home/kali/Desktop': { type: 'dir', perms: 'rwxr-xr-x', owner: 'kali', group: 'kali' },
      '/home/kali/tools': { type: 'dir', perms: 'rwxr-xr-x', owner: 'kali', group: 'kali' },
      '/home/kali/notes.txt': {
        type: 'file',
        perms: 'rw-r--r--',
        owner: 'kali',
        group: 'kali',
        content: "[Pentest Hedefleri]\n1. Hedef IP: 10.10.10.45\n2. SSH anahtari ~/.ssh/id_rsa kontrol et.\n3. SUID dosyalarini tara: find / -perm -4000 -type f 2>/dev/null\n4. CTF Flag /root/root.txt icinde gizli!\n"
      },
      '/home/kali/creds.txt': {
        type: 'file',
        perms: 'rw-------',
        owner: 'kali',
        group: 'kali',
        content: "admin:supersecretP@ssw0rd!\nsupport:Summer2026!\n"
      },
      '/etc/issue': {
        type: 'file',
        perms: 'rw-r--r--',
        owner: 'root',
        group: 'root',
        content: "Kali GNU/Linux Rolling \\n \\l\n"
      },
      '/etc/os-release': {
        type: 'file',
        perms: 'rw-r--r--',
        owner: 'root',
        group: 'root',
        content: 'PRETTY_NAME="Kali GNU/Linux Rolling"\nNAME="Kali GNU/Linux"\nID=kali\nVERSION="2026.1"\nHOME_URL="https://www.kali.org/"\n'
      },
      '/etc/passwd': {
        type: 'file',
        perms: 'rw-r--r--',
        owner: 'root',
        group: 'root',
        content: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsshd:x:105:65534::/run/sshd:/usr/sbin/nologin\nkali:x:1000:1000:Kali Live User,,,:/home/kali:/bin/bash\n"
      },
      '/etc/shadow': {
        type: 'file',
        perms: 'rw-r-----',
        owner: 'root',
        group: 'shadow',
        content: "root:$6$rounds=5000$saltsalt$vH9jH8zY8O54u9uX4p1g3tM:18900:0:99999:7:::\nkali:$6$kali$encryptedhashhashhash:18900:0:99999:7:::\n"
      },
      '/etc/hosts': {
        type: 'file',
        perms: 'rw-r--r--',
        owner: 'root',
        group: 'root',
        content: "127.0.0.1\tlocalhost arenakali\n127.0.1.1\tarenakali\n10.10.10.45\tvictim.local\n"
      },
      '/etc/crontab': {
        type: 'file',
        perms: 'rw-r--r--',
        owner: 'root',
        group: 'root',
        content: "# /etc/crontab: system-wide crontab\nSHELL=/bin/sh\nPATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin\n\n# m h dom mon dow user  command\n*/5 * * * * root /tmp/cleanup.sh >/dev/null 2>&1\n"
      },
      '/var': { type: 'dir', perms: 'rwxr-xr-x', owner: 'root', group: 'root' },
      '/var/log': { type: 'dir', perms: 'rwxr-xr-x', owner: 'root', group: 'root' },
      '/var/log/auth.log': {
        type: 'file',
        perms: 'rw-r-----',
        owner: 'root',
        group: 'adm',
        content: "Oct 17 04:12:01 arenakali sshd[1337]: Failed password for invalid user admin from 192.168.1.105 port 42812 ssh2\nOct 17 04:12:04 arenakali sshd[1339]: Failed password for invalid user root from 192.168.1.105 port 42814 ssh2\nOct 17 04:12:07 arenakali sshd[1342]: Failed password for invalid user test from 192.168.1.105 port 42816 ssh2\nOct 17 04:15:22 arenakali sshd[1401]: Accepted password for kali from 192.168.1.20 port 51230 ssh2\n"
      },
      '/tmp': { type: 'dir', perms: 'rwxrwxrwt', owner: 'root', group: 'root' },
      '/tmp/cleanup.sh': {
        type: 'file',
        perms: 'rwxrwxrwx',
        owner: 'root',
        group: 'root',
        content: "#!/bin/bash\n# World-writable cron cleanup script! (Hint: Privesc vector)\nrm -f /tmp/*.tmp\n"
      },
      '/root': { type: 'dir', perms: 'rwx------', owner: 'root', group: 'root' },
      '/root/root.txt': {
        type: 'file',
        perms: 'rw-------',
        owner: 'root',
        group: 'root',
        content: "FLAG{4r3n4_k4l1_l1nux_cyp3r_m4st3r_2026}\nTebrikler! Root yetkisine ulastin ve CTF bayragini ele gecirdin!"
      }
    };
  }

  function TerminalEngine() {
    this.vfs = createVFS();
    this.cwd = '/home/kali';
    this.user = 'kali';
    this.hostname = 'arenakali';
    this.isRoot = false;
    this.history = [];
    this.historyIndex = -1;
    this.env = {
      USER: 'kali',
      HOME: '/home/kali',
      PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      SHELL: '/bin/bash',
      TERM: 'xterm-256color'
    };
    this.lastExitCode = 0;
  }

  TerminalEngine.prototype.getPrompt = function() {
    var u = this.user;
    var h = this.hostname;
    var pathStr = this.cwd;
    if (this.user !== 'root' && pathStr.indexOf('/home/' + this.user) === 0) {
      pathStr = '~' + pathStr.slice(('/home/' + this.user).length);
    } else if (this.user === 'root' && pathStr === '/root') {
      pathStr = '~';
    }
    var ch = this.user === 'root' ? '#' : '$';
    return { user: u, host: h, path: pathStr || '/', char: ch };
  };

  TerminalEngine.prototype.resolvePath = function(p) {
    if (!p) return this.cwd;
    var target = p;
    if (target === '~' || target.indexOf('~/') === 0) {
      var home = this.user === 'root' ? '/root' : '/home/' + this.user;
      target = home + target.slice(1);
    }
    if (target.indexOf('/') !== 0) {
      target = (this.cwd === '/' ? '' : this.cwd) + '/' + target;
    }
    var parts = target.split('/').filter(Boolean);
    var stack = [];
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === '.') continue;
      if (parts[i] === '..') {
        if (stack.length > 0) stack.pop();
      } else {
        stack.push(parts[i]);
      }
    }
    return '/' + stack.join('/');
  };

  TerminalEngine.prototype.execute = function(rawInput) {
    var trimmed = (rawInput || '').trim();
    if (!trimmed) return '';
    this.history.push(trimmed);
    this.historyIndex = this.history.length;

    var pipeParts = this.splitPipes(trimmed);
    if (pipeParts.length > 1) {
      return this.executePipeline(pipeParts);
    }
    return this.executeSingle(trimmed);
  };

  TerminalEngine.prototype.splitPipes = function(line) {
    var parts = [];
    var current = '';
    var inSingle = false;
    var inDouble = false;
    for (var i = 0; i < line.length; i++) {
      var c = line[i];
      if (c === "'" && !inDouble) inSingle = !inSingle;
      else if (c === '"' && !inSingle) inDouble = !inDouble;
      else if (c === '|' && !inSingle && !inDouble) {
        parts.push(current.trim());
        current = '';
        continue;
      }
      current += c;
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
  };

  TerminalEngine.prototype.executePipeline = function(stages) {
    var curIn = '';
    for (var i = 0; i < stages.length; i++) {
      curIn = this.executeSingle(stages[i], curIn);
    }
    return curIn;
  };

  TerminalEngine.prototype.executeSingle = function(cmdLine, pipeIn) {
    if (pipeIn === undefined) pipeIn = '';
    var line = cmdLine;
    var redirectFile = null;
    var append = false;

    var appendMatch = line.match(/(>>)\s*([^\s|]+)$/);
    var overwriteMatch = line.match(/(>)\s*([^\s|]+)$/);

    if (appendMatch) {
      append = true;
      redirectFile = appendMatch[2];
      line = line.slice(0, appendMatch.index).trim();
    } else if (overwriteMatch) {
      append = false;
      redirectFile = overwriteMatch[2];
      line = line.slice(0, overwriteMatch.index).trim();
    }

    var tokens = this.tokenize(line);
    if (tokens.length === 0) return '';

    var cmd = tokens[0];
    var args = tokens.slice(1);

    var output = '';
    try {
      output = this.runCommand(cmd, args, pipeIn);
      this.lastExitCode = 0;
    } catch (err) {
      output = err.message || String(err);
      this.lastExitCode = 1;
    }

    if (redirectFile) {
      var abs = this.resolvePath(redirectFile);
      if (this.vfs[abs] && this.vfs[abs].type === 'dir') {
        return 'bash: ' + redirectFile + ': Is a directory';
      }
      if (append && this.vfs[abs]) {
        this.vfs[abs].content += output + '\n';
      } else {
        this.vfs[abs] = {
          type: 'file',
          perms: 'rw-r--r--',
          owner: this.user,
          group: this.user,
          content: output.endsWith('\n') ? output : output + '\n'
        };
      }
      return '';
    }

    return output;
  };

  TerminalEngine.prototype.tokenize = function(str) {
    var tokens = [];
    var cur = '';
    var inSingle = false;
    var inDouble = false;

    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      if (c === "'" && !inDouble) {
        inSingle = !inSingle;
      } else if (c === '"' && !inSingle) {
        inDouble = !inDouble;
      } else if ((c === ' ' || c === '\t') && !inSingle && !inDouble) {
        if (cur.length > 0) {
          tokens.push(cur);
          cur = '';
        }
      } else {
        cur += c;
      }
    }
    if (cur.length > 0) tokens.push(cur);
    return tokens;
  };

  TerminalEngine.prototype.runCommand = function(cmd, args, stdin) {
    if (stdin === undefined) stdin = '';
    var self = this;

    switch (cmd) {
      case 'help':
        return [
          "ArenaKali Terminal - Desteklenen Linux & Siber Güvenlik Komutları:",
          "  Dosya & Dizin: ls, pwd, cd, cat, head, tail, touch, mkdir, rm, cp, mv, file",
          "  Filtreleme & Pipe: grep, wc, awk, cut, sort, uniq, sed, echo",
          "  Kullanıcı & İzin: whoami, id, uname, chmod, chown, sudo, su",
          "  Ağ & Keşif: nmap, nc (netcat), curl, ss, netstat, ping",
          "  Kripto & Adli Bilişim: base64, sha256sum, md5sum, strings, history, clear",
          "  İpucu: '|', '>', '>>' operatörleri aktiftir. Gizli CTF bayrağını bul!"
        ].join('\n');

      case 'clear':
        return '__CLEAR_SCREEN__';

      case 'pwd':
        return this.cwd;

      case 'whoami':
        return this.user;

      case 'id':
        if (this.user === 'root') {
          return "uid=0(root) gid=0(root) groups=0(root)";
        }
        return "uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo),105(docker)";

      case 'hostname':
        return this.hostname;

      case 'uname':
        if (args.indexOf('-a') !== -1) {
          return "Linux arenakali 6.6.9-kali1-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.9-1 (2026-01-15) x86_64 GNU/Linux";
        }
        if (args.indexOf('-r') !== -1) {
          return "6.6.9-kali1-amd64";
        }
        return "Linux";

      case 'cd': {
        var dest = args[0] || '~';
        var resolved = this.resolvePath(dest);
        if (resolved === '/root' && this.user !== 'root') {
          throw new Error("bash: cd: /root: Permission denied");
        }
        if (!this.vfs[resolved] || this.vfs[resolved].type !== 'dir') {
          throw new Error('bash: cd: ' + dest + ': No such file or directory');
        }
        this.cwd = resolved;
        return '';
      }

      case 'ls': {
        var showAll = args.some(function(a) { return a.indexOf('-') === 0 && a.indexOf('a') !== -1; });
        var showLong = args.some(function(a) { return a.indexOf('-') === 0 && a.indexOf('l') !== -1; });
        var targetArg = args.find(function(a) { return a.indexOf('-') !== 0; }) || '.';
        var resolvedTarget = this.resolvePath(targetArg);

        if (resolvedTarget === '/root' && this.user !== 'root') {
          throw new Error("ls: cannot open directory '/root': Permission denied");
        }

        var targetEntry = this.vfs[resolvedTarget];
        if (!targetEntry) {
          throw new Error("ls: cannot access '" + targetArg + "': No such file or directory");
        }

        if (targetEntry.type === 'file') {
          return showLong ? ('-rw-r--r-- 1 ' + targetEntry.owner + ' ' + targetEntry.group + ' ' + targetEntry.content.length + ' ' + targetArg) : targetArg;
        }

        var items = [];
        var prefix = resolvedTarget === '/' ? '/' : resolvedTarget + '/';
        for (var k in this.vfs) {
          if (k !== resolvedTarget && k.indexOf(prefix) === 0) {
            var sub = k.slice(prefix.length);
            if (sub.indexOf('/') === -1) {
              if (!showAll && sub.indexOf('.') === 0) continue;
              items.push({ name: sub, entry: this.vfs[k] });
            }
          }
        }

        if (showLong) {
          return items.map(function(it) {
            var d = it.entry.type === 'dir' ? 'd' : '-';
            var p = it.entry.perms || 'rwxr-xr-x';
            var size = it.entry.type === 'dir' ? 4096 : (it.entry.content || '').length;
            return d + p + ' 1 ' + it.entry.owner + ' ' + it.entry.group + ' ' + String(size).padStart(6) + ' ' + it.name;
          }).join('\n');
        }
        return items.map(function(it) { return it.name; }).join('  ');
      }

      case 'cat': {
        if (args.length === 0) return stdin;
        var combined = '';
        for (var fi = 0; fi < args.length; fi++) {
          var f = args[fi];
          var resF = this.resolvePath(f);
          if (resF === '/etc/shadow' && this.user !== 'root') {
            throw new Error("cat: /etc/shadow: Permission denied");
          }
          if (resF === '/root/root.txt' && this.user !== 'root') {
            throw new Error("cat: /root/root.txt: Permission denied");
          }
          var ent = this.vfs[resF];
          if (!ent) throw new Error('cat: ' + f + ': No such file or directory');
          if (ent.type === 'dir') throw new Error('cat: ' + f + ': Is a directory');
          combined += ent.content || '';
        }
        return combined.trimEnd();
      }

      case 'echo': {
        var text = args.join(' ');
        if (text === '$?' || text === '"$?"') return String(this.lastExitCode);
        if (text === '$USER' || text === '"$USER"') return this.user;
        if (text === '$HOME' || text === '"$HOME"') return this.env.HOME;
        if (text === '$PATH' || text === '"$PATH"') return this.env.PATH;
        return text.replace(/^["'](.*)["']$/, '$1');
      }

      case 'head': {
        var nHead = 10;
        var fHead = null;
        for (var hi = 0; hi < args.length; hi++) {
          if (args[hi] === '-n' && args[hi+1]) {
            nHead = parseInt(args[hi+1], 10) || 10;
            hi++;
          } else if (args[hi].indexOf('-') !== 0) {
            fHead = args[hi];
          }
        }
        var textHead = fHead ? this.runCommand('cat', [fHead]) : stdin;
        return textHead.split('\n').slice(0, nHead).join('\n');
      }

      case 'tail': {
        var nTail = 10;
        var fTail = null;
        for (var ti = 0; ti < args.length; ti++) {
          if (args[ti] === '-n' && args[ti+1]) {
            nTail = parseInt(args[ti+1], 10) || 10;
            ti++;
          } else if (args[ti].indexOf('-') !== 0) {
            fTail = args[ti];
          }
        }
        var textTail = fTail ? this.runCommand('cat', [fTail]) : stdin;
        var lTail = textTail.split('\n');
        return lTail.slice(Math.max(0, lTail.length - nTail)).join('\n');
      }

      case 'grep': {
        var ignoreCase = false;
        var invert = false;
        var pattern = null;
        var fGrep = null;

        for (var gi = 0; gi < args.length; gi++) {
          var a = args[gi];
          if (a.indexOf('-') === 0) {
            if (a.indexOf('i') !== -1) ignoreCase = true;
            if (a.indexOf('v') !== -1) invert = true;
          } else if (!pattern) {
            pattern = a.replace(/^["'](.*)["']$/, '$1');
          } else {
            fGrep = a;
          }
        }

        if (!pattern) return '';
        var contentGrep = fGrep ? this.runCommand('cat', [fGrep]) : stdin;
        var linesGrep = contentGrep.split('\n');
        var regex = new RegExp(pattern, ignoreCase ? 'i' : '');
        return linesGrep.filter(function(l) {
          var m = regex.test(l);
          return invert ? !m : m;
        }).join('\n');
      }

      case 'wc': {
        var cL = args.indexOf('-l') !== -1;
        var cW = args.indexOf('-w') !== -1;
        var cB = args.indexOf('-c') !== -1;
        var fWc = args.find(function(a) { return a.indexOf('-') !== 0; });
        var textWc = fWc ? this.runCommand('cat', [fWc]) : stdin;

        var lNum = textWc ? textWc.split('\n').filter(Boolean).length : 0;
        var wNum = textWc ? textWc.trim().split(/\s+/).filter(Boolean).length : 0;
        var bNum = textWc.length;

        if (cL) return String(lNum);
        if (cW) return String(wNum);
        if (cB) return String(bNum);
        return lNum + ' ' + wNum + ' ' + bNum + (fWc ? ' ' + fWc : '');
      }

      case 'cut': {
        var delim = '\t';
        var flds = [1];
        for (var ci = 0; ci < args.length; ci++) {
          if (args[ci].indexOf('-d') === 0) {
            delim = args[ci].slice(2) || (args[++ci] || '\t');
          } else if (args[ci].indexOf('-f') === 0) {
            var rawF = args[ci].slice(2) || (args[++ci] || '1');
            flds = rawF.split(',').map(function(n) { return parseInt(n, 10); });
          }
        }
        var fCut = args.find(function(a) { return a.indexOf('-') !== 0 && a !== delim; });
        var textCut = fCut ? this.runCommand('cat', [fCut]) : stdin;
        return textCut.split('\n').map(function(l) {
          var p = l.split(delim);
          return flds.map(function(idx) { return p[idx - 1] || ''; }).join(delim);
        }).join('\n');
      }

      case 'sort': {
        var num = args.indexOf('-n') !== -1;
        var rev = args.indexOf('-r') !== -1;
        var fSort = args.find(function(a) { return a.indexOf('-') !== 0; });
        var textSort = fSort ? this.runCommand('cat', [fSort]) : stdin;
        var lSort = textSort.split('\n').filter(Boolean);

        lSort.sort(function(a, b) {
          if (num) {
            var na = parseFloat(a) || 0;
            var nb = parseFloat(b) || 0;
            return rev ? nb - na : na - nb;
          }
          return rev ? b.localeCompare(a) : a.localeCompare(b);
        });
        return lSort.join('\n');
      }

      case 'uniq': {
        var countU = args.indexOf('-c') !== -1;
        var fUniq = args.find(function(a) { return a.indexOf('-') !== 0; });
        var textUniq = fUniq ? this.runCommand('cat', [fUniq]) : stdin;
        var lUniq = textUniq.split('\n');

        var outU = [];
        var prevU = null;
        var ctrU = 0;

        for (var ui = 0; ui < lUniq.length; ui++) {
          var lineU = lUniq[ui];
          if (lineU === prevU) {
            ctrU++;
          } else {
            if (prevU !== null) {
              outU.push(countU ? ('   ' + ctrU + ' ' + prevU) : prevU);
            }
            prevU = lineU;
            ctrU = 1;
          }
        }
        if (prevU !== null) {
          outU.push(countU ? ('   ' + ctrU + ' ' + prevU) : prevU);
        }
        return outU.join('\n');
      }

      case 'base64': {
        var dec = args.indexOf('-d') !== -1;
        var fB64 = args.find(function(a) { return a.indexOf('-') !== 0; });
        var textB64 = fB64 ? this.runCommand('cat', [fB64]) : stdin;
        var cleanB64 = textB64.trim();

        if (dec) {
          try {
            return atob(cleanB64);
          } catch (e) {
            throw new Error("base64: invalid input");
          }
        } else {
          return btoa(cleanB64);
        }
      }

      case 'nmap': {
        var target = args.find(function(a) { return a.indexOf('-') !== 0; }) || '10.10.10.45';
        return [
          "Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-17 13:30 UTC",
          "Nmap scan report for " + target,
          "Host is up (0.012s latency).",
          "Not shown: 996 closed tcp ports (reset)",
          "PORT     STATE SERVICE VERSION",
          "22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.6",
          "80/tcp   open  http    Apache httpd 2.4.52",
          "443/tcp  open  ssl/ssl OpenSSL 3.0.2",
          "8080/tcp open  http    Node.js Express",
          "Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel"
        ].join('\n');
      }

      case 'nc':
      case 'netcat': {
        if (args.indexOf('-zv') !== -1) {
          var host = args[args.length - 2] || '127.0.0.1';
          var port = args[args.length - 1] || '80';
          return "Connection to " + host + " " + port + " port [tcp/*] succeeded!";
        }
        if (args.indexOf('-lvnp') !== -1) {
          return "listening on [any] 4444 ...\n[+] Connection received from 10.10.14.2:48912!\n[+] Welcome to ArenaKali Web Reverse Shell Simulator!";
        }
        return "Netcat connected. Type data or Ctrl+C to close.";
      }

      case 'curl': {
        if (args.indexOf('-I') !== -1 || args.indexOf('-i') !== -1) {
          return [
            "HTTP/1.1 200 OK",
            "Date: Sat, 17 Oct 2026 13:30:00 GMT",
            "Server: Apache/2.4.52 (Ubuntu)",
            "X-Powered-By: PHP/8.1.2",
            "Content-Type: text/html; charset=UTF-8",
            "Connection: keep-alive"
          ].join('\n');
        }
        return "<!DOCTYPE html><html><head><title>Victim Web Portal</title></head><body><h1>Under Maintenance</h1></body></html>";
      }

      case 'ss':
      case 'netstat': {
        return [
          "Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process",
          "tcp    LISTEN  0       128      0.0.0.0:22           0.0.0.0:*          users:(sshd,pid=105,fd=3)",
          "tcp    LISTEN  0       511      0.0.0.0:80           0.0.0.0:*          users:(apache2,pid=842,fd=4)",
          "tcp    LISTEN  0       128      127.0.0.1:3306       0.0.0.0:*          users:(mysqld,pid=920,fd=21)",
          "tcp    LISTEN  0       128      0.0.0.0:4444         0.0.0.0:*          users:(nc,pid=1337,fd=3)"
        ].join('\n');
      }

      case 'sudo': {
        if (args.indexOf('-l') !== -1) {
          return [
            "Matching Defaults entries for kali on arenakali:",
            "    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin",
            "",
            "User kali may run the following commands on arenakali:",
            "    (ALL : ALL) ALL",
            "    (root) NOPASSWD: /usr/bin/find, /usr/bin/awk, /usr/bin/python3"
          ].join('\n');
        }
        if (args.length === 0 || args[0] === 'su' || args[0] === '-i' || args[0] === 'bash') {
          this.user = 'root';
          this.cwd = '/root';
          this.isRoot = true;
          return "[+] Root yetkisine yukseltildi! (uid=0 root)";
        }
        var prevUser = this.user;
        this.user = 'root';
        var subOut = this.runCommand(args[0], args.slice(1), stdin);
        this.user = prevUser;
        return subOut;
      }

      case 'su': {
        var targetUser = args[0] || 'root';
        if (targetUser === 'root') {
          this.user = 'root';
          this.cwd = '/root';
          this.isRoot = true;
          return "[+] Switched to root account.";
        }
        this.user = targetUser;
        return "[+] Switched to user " + targetUser + ".";
      }

      case 'history': {
        return this.history.map(function(h, idx) { return '  ' + (idx + 1) + '  ' + h; }).join('\n');
      }

      case 'touch': {
        for (var tci = 0; tci < args.length; tci++) {
          var pt = this.resolvePath(args[tci]);
          if (!this.vfs[pt]) {
            this.vfs[pt] = { type: 'file', perms: 'rw-r--r--', owner: this.user, group: this.user, content: '' };
          }
        }
        return '';
      }

      case 'mkdir': {
        for (var mi = 0; mi < args.length; mi++) {
          if (args[mi].indexOf('-') === 0) continue;
          var pm = this.resolvePath(args[mi]);
          this.vfs[pm] = { type: 'dir', perms: 'rwxr-xr-x', owner: this.user, group: this.user };
        }
        return '';
      }

      case 'rm': {
        for (var ri = 0; ri < args.length; ri++) {
          if (args[ri].indexOf('-') === 0) continue;
          var pr = this.resolvePath(args[ri]);
          if (pr === '/' && args.some(function(a) { return a.indexOf('r') !== -1; })) {
            return "rm: it is dangerous to operate recursively on '/'\nrm: use --no-preserve-root to override this failsafe";
          }
          delete this.vfs[pr];
        }
        return '';
      }

      default:
        throw new Error('bash: ' + cmd + ': command not found');
    }
  };

  global.ArenaKaliTerminal = TerminalEngine;
})(window);
