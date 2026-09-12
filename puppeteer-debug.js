const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Scroll down a bit to trigger any scroll animations
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Wait for animations
    await new Promise(r => setTimeout(r, 3000));
    
    const info = await page.evaluate(() => {
      const results = {};
      
      const phoneImg = document.querySelector('img[alt="Hand holding phone"]');
      if (phoneImg) {
        results.phoneImg = phoneImg.getBoundingClientRect().toJSON();
        results.phoneImgZIndex = window.getComputedStyle(phoneImg).zIndex;
      }
      
      const phoneMockup = document.querySelector('.absolute.z-30.overflow-hidden');
      if (phoneMockup) {
        results.phoneMockup = phoneMockup.getBoundingClientRect().toJSON();
        results.phoneMockupZIndex = window.getComputedStyle(phoneMockup).zIndex;
        results.phoneMockupHTML = phoneMockup.innerHTML;
      } else {
        results.phoneMockup = "Not found";
      }
      
      const notification = document.querySelector('.bg-white.p-4.pr-10');
      if (notification) {
        results.notification = notification.getBoundingClientRect().toJSON();
        results.notificationOpacity = window.getComputedStyle(notification).opacity;
        results.notificationDisplay = window.getComputedStyle(notification).display;
      } else {
        results.notification = "Not found";
      }
      
      return results;
    });
    
    console.log(JSON.stringify(info, null, 2));
    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
