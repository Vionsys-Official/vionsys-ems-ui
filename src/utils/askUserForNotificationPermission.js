// askUserForNotificationPermission.js
import toast from "react-hot-toast";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const askUserForNotificationPermission = async (sendNotificationToken) => {
  try {
    let permission = Notification.permission;

    // Check if permission is already granted
    if (permission === "granted") {
      const NotificationToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });
      return { NotificationToken };
    }

    // Request permission if it is in default state
    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    // Handle permission granted
    if (permission === "granted") {
      const NotificationToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });
      await sendNotificationToken(NotificationToken);
      return { NotificationToken };
    }

    // Handle permission denied
    if (permission === "denied") {
      toast(
        "Please enable notification permissions so you don't miss any updates.",
        {
          icon: "⚠️",
        }
      );

      // Ask for permission again
      permission = await Notification.requestPermission();
      if (permission === "granted") {
        const NotificationToken = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_VAPID_KEY,
        });
        await sendNotificationToken(NotificationToken);
        return { NotificationToken };
      }
    }

    return null;
  } catch (error) {
    console.error("Error obtaining notification permission or token:", error);
    return null;
  }
};

export default askUserForNotificationPermission;
