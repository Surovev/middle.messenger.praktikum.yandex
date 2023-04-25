import parseDate from './parseDate';

interface ChatFromApi {
    [key: string]: unknown,
    last_message: {
        time: string
    }
}
export default function parseChats(arr: Array<ChatFromApi>) {
  return arr.map((item) => {
    if (!item.last_message) {
      return item;
    }
    return {
      ...item, last_message: { ...item.last_message, time: parseDate(item.last_message.time) },
    };
  });
}
