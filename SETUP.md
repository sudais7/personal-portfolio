# Portfolio Setup Guide

Quick steps to complete your portfolio before deployment.

---

## 1. Contact Form (Formspree)

The contact form uses Formspree. To enable it:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and add your email
3. Copy the form ID (e.g., `xyzabcde`)
4. In `index.html`, replace `YOUR_FORM_ID` in the form action:
   ```html
   action="https://formspree.io/f/xyzabcde"
   ```

---

## 2. Resume

- Place your resume PDF at `assets/resume/resume.pdf`
- The View and Download buttons will work once the file is there
- Add the QR code to your resume PDF for bonus points (use your live portfolio URL after deployment)

---

## 3. Projects Section

Update the project cards in `index.html` with your real projects:

- Replace placeholder names and descriptions
- Add your GitHub repository URLs to each "View on GitHub" link
- Add LinkedIn/GitHub profile links in the footer if desired

---

## 4. Deployment

- Push to GitHub and deploy via GitHub Pages, Netlify, or Vercel
- The QR code in the footer updates automatically based on the current page URL
- After deployment, update the form action and test all links
