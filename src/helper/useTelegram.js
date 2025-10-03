const tg = window.Telegram?.WebApp;

export function useTelegram() {
  if (!tg) {
    console.error('Telegram WebApp SDK is not available');
    return {
      onClose: () => {},
      onToggleButton: () => {},
      tg: null,
      user: null,
      queryId: null,
    };
  }

  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user ?? null,
    queryId: tg.initDataUnsafe?.query_id ?? null,
  };
}
