# ArenaKali

Linux Command Line and Cybersecurity Logic Training Platform

ArenaKali is an interactive, browser-based training and assessment application designed for cybersecurity practitioners, penetration testers, and system administrators. It tests and reinforces command line logic, pipeline mastery, system diagnostics, and privilege escalation techniques.

## Overview

The application operates entirely on the client side with zero server dependencies, allowing safe, isolated, and offline training directly within modern web browsers.

### Core Modules

- Terminal Quiz: Over 100 categorized questions testing command output, pipeline chaining, regular expressions, and security reconnaissance logic across four difficulty tiers (Beginner, Intermediate, Advanced, Expert).
- Bug & Exploit Hunter: 40 detective challenges focused on identifying syntax traps, argument misordering, quoting pitfalls, wildcard injections, and security misconfigurations.
- Interactive Web Terminal: An integrated in-memory virtual shell environment simulating Kali Linux with a virtual file system (VFS), pipeline support, and CTF challenges.
- Gamified Progression: Experience points (XP), leveling system, day streaks, daily challenges with deterministic seeds, mistake reviews, and milestone badges.
- Bilingual Interface: Complete support for Turkish and English language switching.
- Progressive Web App (PWA): Installable on desktop and mobile operating systems with full offline capability via Service Worker caching.

## Technical Architecture and Security

ArenaKali is designed with strict security controls suitable for hosting on static delivery platforms such as GitHub Pages:

- Zero Server-Side Execution: All terminal operations and question evaluations run in-memory within the user's browser sandbox. No backend servers, databases, or execution APIs are utilized.
- Content Security Policy (CSP): Enforces a strict policy restricting scripts, styles, objects, and framing to prevent cross-site scripting (XSS), clickjacking, and unauthorized network connections.
- Mocked Network Utilities: Tools such as nmap, netcat, curl, and ping simulate output behavior without emitting real network packets, eliminating any risk of Server-Side Request Forgery (SSRF) or unauthorized scanning.

## Difficulty Breakdown

1. Beginner: Core directory navigation, basic file permissions (chmod/chown), standard I/O redirection, user context (whoami, id), and file inspection.
2. Intermediate: Advanced pipelines (grep, awk, sed, cut, sort, uniq), process monitoring (ps, kill, top), socket inspection (ss, netstat), archive handling, and environment variables.
3. Advanced: Reconnaissance and port scanning (nmap), directory fuzzing (gobuster), forensic log analysis (auth.log, dmesg, lastb), SSH tunneling, SUID identification, and hash extraction.
4. Expert: Privilege escalation patterns, GTFOBins exploitation, Linux Capabilities, reverse shell construction, shadow file architecture, cron manipulation, and system hardening.

## Deployment

### GitHub Pages

1. Push this repository to GitHub.
2. Navigate to Repository Settings -> Pages.
3. Under Build and deployment, set Source to 'Deploy from a branch'.
4. Select the 'main' branch and the '/ (root)' folder, then click Save.
5. The application will be deployed and accessible via your GitHub Pages URL.

### Local Execution

ArenaKali requires no build steps or package managers. You can run it locally with any static web server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Alternatively, opening 'index.html' directly in any modern browser provides access to quiz and practice modules.

## License

This project is licensed under the MIT License.
