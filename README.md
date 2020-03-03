# easy-rank
🔃 An easy way to check your WaterlooWorks rankings and matches!

## Overview
A Node.js app will automatically alert you when WaterlooWorks job rankings come out. Powered by Puppeteer. 

+ `index.js` contains the main puppeteer script
+ `mailer.js` contains functions to send emails using SMTP

## Usage  
1. Fill in `config.json` with your credentials
  + `config.email` and `config.password` is your WatID
  + `config.mailer.auth` is the email server credentials
  + `config.mailer.options` contain options such as to and from email  
  + `config.delay` is how often in milliseconds to check rankings
2. Run `npm start`  
3. You will receive an email when rankings come out. 

## Debug
1. Run `npm run dev`
  + This will run Puppeteer in non-headless mode.
  + This will also print out the scraped text. 

## Legal
Software is provided as-is, use at your own risk. 
