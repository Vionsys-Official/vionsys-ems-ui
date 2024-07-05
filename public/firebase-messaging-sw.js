importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBo3stE-8aVO0uMbpNBaRxCcatwgWijb8c",
  authDomain: "vionsys-ems-notify.firebaseapp.com",
  projectId: "vionsys-ems-notify",
  storageBucket: "vionsys-ems-notify.appspot.com",
  messagingSenderId: "444222697746",
  appId: "1:444222697746:web:729f37b1d8de2cb83e03cb",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/public/assets/vionsys_logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Foreground message handler (for messages received while the app is in the foreground)
messaging.onMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received foreground message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/public/assets/vionsys_logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
