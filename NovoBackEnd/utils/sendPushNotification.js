export default async function sendPushNotification(expoPushToken, message) {
  const payload = {
    to: expoPushToken,
    sound: "default",
    title: "Nova notificação",
    body: message,
    data: { screen: "Notifications" },
  };
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },body: JSON.stringify(payload)
  })

  const data = await response.json()
  return data
}
