# Jürgensen & Hillesheim Carpentry Website

This is the official website for **Jürgensen & Hillesheim GmbH**, a carpentry company based in Düsseldorf, built with [Next.js](https://nextjs.org) and TypeScript.

## Features

- **Multilingual:** German & English, switchable in the menu
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Burger Menu:** Intuitive navigation on mobile devices
- **Dark Mode:** Toggleable, always readable navigation
- **Animated Headings:** Smooth animated lines on scroll
- **Gallery & References:** Image slideshows and project overview
- **Contact Form:** Easy contact, including Google Maps
- **Partners & Team:** Introduction of team members and partner companies
- **Optimized Images:** Uses Next.js `<Image />` component with built-in image optimization for fast loading

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at [http://localhost:3000](http://localhost:3000).

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

- `src/app/` – Main pages (Home, About, References, Contact)
- `src/app/components/` – Reusable components (Header, Footer, etc.)
- `src/app/content.json` – Texts and translations
- `public/` – Images and static files

## Image Optimization

- Images are automatically optimized by Next.js.
- Use the `<Image />` component and place your images in the `public/` folder.
- For best performance: images should be less than 300 KB and a maximum of 1920px wide.

## Deployment

The site is optimized for hosting on [Vercel](https://vercel.com/).  
Simply push to your Git repository for automatic deployment.

## Customization

- **Navigation:** Edit in `src/app/components/Header.tsx`
- **Texts & Translations:** Edit in `src/app/content.json`
- **Images:** Replace or add images in the `public/` folder

## Contact

Questions or feedback?  
Feel free to contact [juergensen_hillesheim@t-online.de](mailto:juergensen_hillesheim@t-online.de).

---

© Jürgensen & Hillesheim GmbH,
