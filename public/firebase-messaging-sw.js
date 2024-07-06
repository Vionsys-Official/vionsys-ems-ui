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

// Track displayed notifications to prevent duplicates
const displayedNotifications = new Set();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Ensure payload.notification exists and has title and body properties
  if (
    payload.notification &&
    payload.notification.title &&
    payload.notification.body
  ) {
    const link = payload?.fcmOptions?.link || payload?.data?.link;

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image || "/assets/default-icon.png", // Use a default icon if not provided
      data: { url: link },
    };

    // Check if this notification has already been displayed
    if (!displayedNotifications.has(notificationTitle)) {
      // Show notification to the user
      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );

      // Add to the set of displayed notifications
      displayedNotifications.add(notificationTitle);
    }
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;

        if (!url) return;

        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        // If no matching client, open a new window with the URL
        if (clients.openWindow) {
          console.log("Opening window for URL: ", url);
          return clients.openWindow(url);
        }
      })
  );
});
