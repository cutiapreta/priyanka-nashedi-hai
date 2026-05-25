# Priyanka Cute Fun Website ❤️

Ye ek fully static, GitHub Pages ready website hai jo apology style me nahi hai. Isme cute romantic vibe, multiple fun pages, **"Do you love me?"** section, **Yes-only interaction**, bhaagta hua **No** button, confetti, floating hearts aur playful notes included hain.

## Project structure

```text
priyanka-love-playful-site/
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── favicon.svg
├── README.md
└── .nojekyll
```

## GitHub Pages par host kaise karein

### Direct upload

1. GitHub par new repository banao, jaise `for-priyanka`.
2. Is folder ke **andar ke files** repository ke root me upload karo.
3. Repository me **Settings → Pages** open karo.
4. Source: **Deploy from a branch** select karo.
5. Branch `main` aur folder `/root` choose karo.
6. Save kar do.
7. Kuch der baad website URL mil jayega.

### Git commands

```bash
git init
git add .
git commit -m "Create cute Priyanka website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/for-priyanka.git
git push -u origin main
```

Phir **Settings → Pages → Deploy from branch → main → /root → Save**.

## Personalization

Default name already **Priyanka** hai. URL me query parameters use karke naam change kar sakte ho:

```text
?to=Priyanka&from=Rahul
```

Example:

```text
https://your-username.github.io/for-priyanka/?to=Priyanka&from=Rahul
```

## Notes

- Koi backend required nahi.
- Koi external library use nahi hui.
- Mobile responsive hai.
- `script.js` me tease lines ya secret notes ko tum apne hisaab se aur personalize kar sakte ho.
