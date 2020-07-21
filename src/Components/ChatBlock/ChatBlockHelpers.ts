import addNotification from 'react-push-notification';

export const getShortTime = (date: number) => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const getFaviconEl = (): HTMLLinkElement | null => {
  const el = document.getElementById('favicon');
  if (el instanceof HTMLLinkElement) {
    return el;
  }
  return null;
};

export const getTitleEl = (): HTMLTitleElement | null => {
  const el = document.getElementById('title-app');
  if (el instanceof HTMLTitleElement) {
    return el;
  }
  return null;
};

export const handleNewMessageFavicon = () => {
  const favicon = getFaviconEl();
  if (favicon) favicon.href = './favicon-new-message.png';
};

export const handleNewMessageTitle = () => {
  const title = getTitleEl();
  if (title) title.innerHTML = 'New Message';
};

export const handleFavicon = () => {
  const favicon = getFaviconEl();
  if (favicon) favicon.href = './favicon.png';
};

export const handleTitle = () => {
  const title = getTitleEl();
  if (title) title.innerHTML = 'Simple Chat';
};

export const playSound = (audioFile: HTMLAudioElement) => {
  audioFile.play();
};

export const newMessagePush = (from: string, text: string) => {
  addNotification({
    title: `new message from ${from}`,
    message: text,
    theme: 'darkblue',
    duration: 3000,
    native: true,
  });
};
