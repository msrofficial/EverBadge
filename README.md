# ReleaseDownload Tracker 🛡️

[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Have you ever replaced a release asset or deleted an old tag on GitHub, only to watch your hard-earned total download count on Shields.io drop back to zero? 

**ReleaseDownload Tracker** solves this problem permanently. It is a full-stack, serverless tracking dashboard that fetches the live download count across *all* your repository releases. If a file is replaced and the GitHub count resets, this system automatically detects the drop, "self-heals" by saving the lost downloads to a MongoDB database, and continues to serve the accurate, lifetime total via a dynamic [Shields.io](https://shields.io/) custom endpoint.

## ✨ Features
* **Automated Self-Healing:** Detects when a GitHub release asset is replaced/deleted and automatically preserves the lost download counts in the database.
* **Lifetime Tracking:** Sums up download counts from *all* releases in a repository.
* **Live Stats Dashboard:** A beautiful, responsive, glassmorphism UI built with Tailwind CSS to monitor the live stats of all your tracked repositories.
* **Secure Access:** Password-protected admin portal to prevent unauthorized generation.
* **Pro Formatting:** Automatically formats large numbers (e.g., `7242` becomes `7.2k`, `1500000` becomes `1.5M`).

## 🚀 One-Minute Deployment (Vercel)

This project is designed to be hosted on Vercel for free, utilizing MongoDB Atlas for data storage.

### Step 1: Prepare Database & Token
1. Get a free [MongoDB Atlas](https://www.mongodb.com/atlas/database) cluster and copy your connection string (URI).
2. Generate a [GitHub Personal Access Token](https://github.com/settings/tokens) (classic) with `public_repo` access to avoid GitHub API rate limits.

### Step 2: Deploy to Vercel
1. **Fork or Clone** this repository to your GitHub account.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
3. Import your forked repository.
4. **Crucial Step:** Before clicking Deploy, expand the **Environment Variables** section and add the following 3 variables:
   * `ADMIN_PASS` : *(Create a strong password for your dashboard login)*
   * `GITHUB_TOKEN` : *(Your GitHub Personal Access Token)*
   * `MONGODB_URI` : *(Your MongoDB Connection String)*
5. Click **Deploy**.

## 💻 How to Use

1. Visit your newly deployed Vercel URL.
2. Enter the `ADMIN_PASS` you set during deployment to unlock the dashboard.
3. Go to the **Add New Repo** tab.
4. Enter the **GitHub Username** and **Repository Name**.
5. *(Optional)* If you previously lost downloads before using this tool, enter that number in the **Lost Downloads** field.
6. Click **Generate Automated Link**.
7. Copy the generated Markdown code and paste it into your project's `README.md`.

### Example Output

```markdown
![Downloads](https://img.shields.io/endpoint?url=https://your-app.vercel.app/api/badge?user=torvalds&repo=linux)
