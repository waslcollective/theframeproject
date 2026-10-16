# FRAME website: setup on GitHub Pages

## A. Upload the files (repeat what you did before)
Upload everything in this folder to your repository, replacing the old files. The hidden folder `.github` may not upload by dragging; if it doesn't appear, create the file by hand (see B).

## B. Switch on publishing
1. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Check the repository has `.github/workflows/pages.yml`. If not: **Add file → Create new file**, type `.github/workflows/pages.yml` as the name (typing the slashes makes the folders), paste the contents of that file, and commit.
3. Open the **Actions** tab; a run called "Publish site" should appear and turn green within a couple of minutes. Your site is at `https://waslcollective.github.io/theframeproject/`.

## C. Log in to the admin page
Go to `your-site/admin/` and choose **Sign in with token**. Create the token on GitHub:
**Settings (your profile) → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.** Resource owner: `waslcollective` (an owner may need to approve it). Repository access: only `theframeproject`. Permissions: **Contents → Read and write**. Set an expiry, generate, copy the token (shown once) and paste it into the admin page. Keep it private like a password.

## D. Forms
The forms use Web3Forms (web3forms.com): enter your email, get a free access key, and paste it in `/admin → Main pages → Logos, colours and fonts → Web3Forms access key`. Submissions are emailed to you.

## E. Everyday use
Everything is in `/admin`: text on every page, logos, colours, fonts, timeline, outcomes, ExplorEA artists, Guzur routes, team, blog posts. Press **Save/Publish**; the live site updates in 1 to 2 minutes (watch the Actions tab).

Not editable in /admin: form field labels and a few fixed buttons. Edit `index.html` for those.
