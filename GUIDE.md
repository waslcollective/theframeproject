# FRAME website: setup guide (about 20 minutes, once)

You need a free GitHub account and a free Netlify account. Netlify may change its menus over time; if a name below differs slightly, look for the closest match.

## 1. Put the files on GitHub
1. On github.com click **New repository**. Name it e.g. `frame-website`. Keep it public (or private, see note below) and create it.
2. Click **uploading an existing file**, drag in everything inside this folder (the contents, not the folder), and click **Commit changes**.
3. Open `admin/config.yml` on GitHub, click the pencil, and replace `YOUR-GITHUB-USERNAME/YOUR-REPOSITORY-NAME` with your own, e.g. `nada/frame-website`. Commit.

## 2. Publish on Netlify
1. On app.netlify.com choose **Add new site → Import an existing project → GitHub** and pick your repository.
2. Leave the settings as they are (the file `netlify.toml` sets them) and click **Deploy**. You get a link like `https://something.netlify.app`.

## 3. Let yourself log in to /admin
1. On GitHub go to **Settings → Developer settings → OAuth Apps → New OAuth App**. Homepage URL: your Netlify link. Authorization callback URL: `https://api.netlify.com/auth/done`. Register it, then generate a **client secret**.
2. In Netlify open your site, go to **Site configuration → Access & security → OAuth → Install provider → GitHub**, and paste in the Client ID and secret.
3. Visit `your-site/admin` and choose **Login with GitHub**. Anyone you add as a collaborator on the GitHub repository can log in the same way.

## 4. Get submissions by email
In Netlify: **Forms** shows every submission (mentor and student applications, route suggestions, blog submissions). Under **Site configuration → Forms → Form notifications** add an email notification so you hear about each one. You can export submissions as CSV from the Forms page.

## Everyday use
- **Edit text, logos, timeline, outcomes, artists, routes, team:** go to `/admin`, open the section, change it, press **Publish**. The live site updates in about a minute.
- **Add a blog post:** `/admin → Blog posts → New`, write it, Publish. For a participant submission, copy the text from the Netlify Forms page into a new post.
- **Replace a logo:** `/admin → Main pages → Logos and footer`.
- **Guzur route points:** upload the floor plan, then for each stop enter its position as two numbers from 0 to 100 (across and down).
- **ExplorEA QR codes:** each artist page lives at `your-site/#/artist/<short-name>`. Paste that address into any free QR code generator and print it for the museum label.

## Good to know
- The forum is not included. A live forum needs moderation tools; add one later (for example a ready-made service) once you decide how it will be moderated.
- Text that is only in the design (form labels, button names like "Explore the three interventions") is not editable in /admin; ask for a change or edit `index.html`.
- Test locally: run `python3 -m http.server` in this folder and open http://localhost:8000. Forms and /admin only work once it is on Netlify.
- Everything in the repository is public if the repository is public. Never put private information in it. Form submissions are stored in Netlify, not in GitHub.
