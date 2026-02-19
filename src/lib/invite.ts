export function generateInviteCode(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint8Array(12);
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for non-browser environments if needed during SSR
    for (let i = 0; i < 12; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (byte) => chars[byte % chars.length]).join("");
}

export function getInviteLink(inviteCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return `${baseUrl}/invite/${inviteCode}`;
}

export function shareViaWhatsApp(link: string, projectName: string) {
  const text = encodeURIComponent(
    `Join my project "${projectName}" on Gitpilot: ${link}`,
  );
  window.open(`https://wa.me/?text=${text}`, "_blank");
}

export function shareViaGmail(link: string, projectName: string) {
  const subject = encodeURIComponent(
    `Invitation to join project: ${projectName}`,
  );
  const body = encodeURIComponent(
    `Hi,\n\nI'd like to invite you to collaborate on my project "${projectName}" on Gitpilot.\n\nYou can join using this link: ${link}\n\nBest regards!`,
  );
  window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
}

export function shareViaDiscord(link: string) {
  navigator.clipboard.writeText(link);
  window.open("https://discord.com/channels/@me", "_blank");
}
