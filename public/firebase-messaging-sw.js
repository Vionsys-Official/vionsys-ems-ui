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

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = "Vionsys Software Solutions India PVT. LTD";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/assets/icons/vionsys_logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
