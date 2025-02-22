export function normalizePersianText(text) {
  return text
    .replace(/ي/g, 'ی') // Convert Arabic 'ي' to Persian 'ی'
    .replace(/ك/g, 'ک') // Convert Arabic 'ك' to Persian 'ک'
    .replace(/\s+/g, ' ') // Remove extra spaces
    .trim();
}

export function parsePersianDigits(text) {
  const persianNumbers = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };
  return text.replace(/[۰-۹]/g, (d) => persianNumbers[d]);
}

export function parseTime(text) {
  //because fomatters removed quotes betweeen object keys
  const shanbe = 'شنبه';
  const yek_shanbe = 'یکشنبه';
  const do_shanbe = 'دوشنبه';
  const se_shanbe = 'سهشنبه';
  const char_shanbe = 'چهارشنبه';
  const panj_shanbe = 'پنجشنبه';
  const jome = 'جمعه';
  const daysOfWeek = {
    [shanbe]: 0,
    [yek_shanbe]: 1,
    [do_shanbe]: 2,
    [se_shanbe]: 3,
    [char_shanbe]: 4,
    [panj_shanbe]: 5,
    [jome]: 6,
  };

  text = normalizePersianText(parsePersianDigits(text));

  const match = text.match(
    /([\u0600-\u06FF\s]+)\s+از\s+(\d{2}:\d{2})\s+تا\s+(\d{2}:\d{2})/
  );

  if (!match) return null;

  let [, day, startHour, startMin] = match;
  day = day.replace(/\s+/g, '');
  const result = {
    dayIndex: daysOfWeek[day],
    startTime: parseInt(startHour) * 60 + parseInt(startMin),
  };
  console.log(text);
  console.log('day', day);
  console.log('days of week', daysOfWeek[day]);
  console.log('hour and min', startHour, startMin);
  console.log(parseInt(startHour) * 60 + parseInt(startMin));

  return result;
}
