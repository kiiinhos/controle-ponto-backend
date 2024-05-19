export const getCurrentDateAndTimeInSaoPaulo = () => {
  const now = new Date();
  const localDateTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }),
  );

  const year = localDateTime.getFullYear();
  const month = String(localDateTime.getMonth() + 1).padStart(2, '0');
  const day = String(localDateTime.getDate()).padStart(2, '0');
  const hours = String(localDateTime.getHours()).padStart(2, '0');
  const minutes = String(localDateTime.getMinutes()).padStart(2, '0');
  const seconds = String(localDateTime.getSeconds()).padStart(2, '0');

  const currentDate = `${year}-${month}-${day}`;
  const currentTime = `${hours}:${minutes}:${seconds}`;

  return { currentDate, currentTime };
};
