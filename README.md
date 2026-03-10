# EverBadge

[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Have you ever replaced a release asset or deleted an old tag on GitHub, only to watch your hard-earned total download count on Shields.io drop back to zero? 

**GitHub Download Preserver** solves this problem. It is a full-stack, serverless tracking dashboard that fetches the live download count across *all* your repository releases and allows you to add a "Base Count" to recover lost downloads. It outputs a dynamic [Shields.io](https://shields.io/) JSON endpoint so your badge always shows the accurate, lifetime total.

## Features
* **Lifetime Tracking:** Sums up download counts from *all* releases in a repository, not just the latest tag.
* **Count Recovery:** Input a "Base Count" to permanently add lost downloads (due to deleted tags or replaced assets) to your total.
* **Premium Dashboard:** A beautiful, responsive, glassmorphism UI built with Tailwind CSS to manage your repositories.
* **Secure Access:** Password-protected portal to prevent unauthorized generation.
* **Pro Formatting:** Automatically formats large numbers (e.g., `7242` becomes `7.2k`).

## One-Minute Deployment (Vercel)

This project is designed to be hosted on Vercel for free.

1. **Fork or Clone** this repository to your GitHub account.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
3. Import your forked repository.
4. **Crucial Step:** Before clicking Deploy, expand the **Environment Variables** section and add:
   * **Name:** `ADMIN_PASS`
   * **Value:** *(Create a strong password for your dashboard)*
5. Click **Deploy**.

## 💻 How to Use

1. Visit your newly deployed Vercel URL.
2. Enter the `ADMIN_PASS` you set during deployment to unlock the dashboard.
3. Enter the **GitHub Username** and **Repository Name**.
4. *(Optional)* If you previously lost downloads, enter that number in the **Lost Downloads (Base Count)** field.
5. Click **Generate Markdown Code**.
6. Copy the generated code and paste it into your project's `README.md`.

### Example Output

```markdown
![Downloads](https://img.shields.io/endpoint?url=https://your-app.vercel.app/api/badge?user=torvalds&repo=linux&base=5000)
