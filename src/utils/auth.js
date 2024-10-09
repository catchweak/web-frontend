// ttl은 밀리초 단위로 지정 ex) 24시간 = 24 * 60 * 60 * 1000
export const setTokenWithExpiry = (key, value, ttl) => {
  const now = new Date();

  const item = {
    token: value,
    expiry: now.getTime() + ttl
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getTokenWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};
