export const csvDecoder = async (csvPath: string) => {
  const res = await fetch(csvPath);
  const reader = res.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  if (!reader) {
    throw new Error("Unable to get reader from response body.");
  }

  let csvData = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      csvData += chunk;
    }
  }

  return csvData;
};

interface DatePoints {
  [date: string]: string;
}

interface DateAverages {
  [date: string]: number;
}

export function calculateDateAverages(data: DatePoints[]): DateAverages {
  const dateAverages: DateAverages = {};
  for (const obj of data) {
    const sortedDates = Object.keys(obj).sort();
    for (const date of sortedDates) {
      const value = parseFloat(obj[date]);
      if (!isNaN(value) && obj[date] !== undefined) {
        if (dateAverages[date] === undefined) {
          dateAverages[date] = value;
        } else {
          dateAverages[date] += value;
        }
      }
    }
  }
  for (const date in dateAverages) {
    const count = data.filter((obj) => obj[date] !== undefined).length;
    dateAverages[date] /= count;
  }
  return dateAverages;
}
