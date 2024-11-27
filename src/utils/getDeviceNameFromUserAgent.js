const getDeviceNameFromUserAgent = (userAgent) => {
  // Match the string inside parentheses
  const match = userAgent.match(/\(([^)]+)\)/);

  if (match && match[1]) {
    // Split the matched string into parts by ';'
    const details = match[1].split(";").map((str) => str.trim());

    // Find and return the part that does not start with "Linux" or "Android"
    const deviceName = details.find(
      (detail) => !detail.startsWith("Linux") && !detail.startsWith("Android")
    );

    return deviceName || "Unknown";
  }

  return "Unknown";
};

export default getDeviceNameFromUserAgent;
