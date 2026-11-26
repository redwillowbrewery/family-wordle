# Family Word

A tiny ad-free daily five-letter word game for family/internal use.

## Features
- Same daily word for everyone
- Six guesses with correct duplicate-letter scoring
- Physical and on-screen keyboard
- Local streak and win statistics
- Shareable emoji result
- No accounts, tracking, adverts, database or dependencies
- Mobile-first

## Change the daily words
Edit `words.js` and add five-letter words to `window.FAMILY_WORDS`.
The first word corresponds to 5 September 2026 and the list advances once per calendar day.

## Deploy to Vercel
1. Put these files in a GitHub repository.
2. In Vercel choose **Add New → Project** and import that repository.
3. Framework preset: **Other**. No build command is required.
4. Deploy.

Any push to the GitHub repository will redeploy automatically once the project is linked.

## Daily maths
Open the Maths tab for a daily problem aimed at the transition from Further Maths
to university. Each includes an optional hint, worked solution and proof or
generalisation to explore. Everyone sees the same problem on the same local
calendar date. Maths progress is stored separately on each browser.
The calendar starts on 26 November 2026. Edit the generators in `challenges.js`
to change the problem bank.
