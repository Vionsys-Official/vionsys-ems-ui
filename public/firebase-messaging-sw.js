// Import Firebase scripts required for Firebase app and Firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBo3stE-8aVO0uMbpNBaRxCcatwgWijb8c",
  authDomain: "vionsys-ems-notify.firebaseapp.com",
  projectId: "vionsys-ems-notify",
  storageBucket: "vionsys-ems-notify.appspot.com",
  messagingSenderId: "444222697746",
  appId: "1:444222697746:web:729f37b1d8de2cb83e03cb",
};

// Initialize Firebase app with the configuration
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging to handle background messages
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/public/assets/vionsys_logo.png",
  };

  // Show notification to the user
  self.registration.showNotification(notificationTitle, notificationOptions);
});
