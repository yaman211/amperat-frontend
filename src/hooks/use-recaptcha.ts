import { ref } from 'vue';

export function useRecaptcha() {
  const siteKey = process.env.RECAPTCHA_SITE_KEY || '';
  const recaptchaLoaded = ref(false);

  const loadRecaptcha = () => {
    return new Promise((resolve) => {
      if (recaptchaLoaded.value) {
        resolve(void 0);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.addEventListener('load', () => {
        recaptchaLoaded.value = true;
        resolve(void 0);
      });
      document.head.appendChild(script);
    });
  };

  const executeRecaptcha = async (action = 'submit') => {
    await loadRecaptcha();
    return new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(siteKey, { action }).then(resolve).catch(reject);
      });
    });
  };

  return {
    executeRecaptcha,
    loadRecaptcha,
  };
}
