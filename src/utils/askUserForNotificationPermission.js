// askUserForNotificationPermission.js
import toast from "react-hot-toast";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const askUserForNotificationPermission = async (sendNotificationToken) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const NotificationToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });
      await sendNotificationToken(NotificationToken);
      return { NotificationToken };
    } else if (permission === "denied") {
      toast(
        "Please enable notification permissions so you don't miss any updates.",
        {
          icon: "⚠️",
        }
      );
      return null;
    } else if (permission === "default") {
      // User dismissed the permission request or has not made a choice yet
      console.log(
        "Notification permission request was dismissed or no choice made."
      );
      return null;
    }
  } catch (error) {
    console.error("Error obtaining notification permission or token:", error);
    return null;
  }
};

export default askUserForNotificationPermission;
