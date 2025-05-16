import { useQuasar } from 'quasar';

export const useFcm = () => {
  const q = useQuasar();
  if (!q.platform.is.android) {
    return {
      init: () => {},
    };
  }
  const PushNotifications = q.capacitor.Plugins.PushNotifications;

  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration', (token: any) => {
    localStorage.setItem('fcmToken', token.value);
  });

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError', (error: any) => {
    console.log({ error });
  });

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived', (notification: any) => {
    console.log('pushNotificationReceived', { notification });
  });

  // Method called when tapping on a notification
  PushNotifications.addListener('pushNotificationActionPerformed', (notification: any) => {
    console.log('pushNotificationActionPerformed', { notification });
  });

  const init = () => {
    PushNotifications.requestPermissions().then((result: any) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
  };

  return { init };
};
