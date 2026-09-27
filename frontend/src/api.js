import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/messages';

export async function fetchMessages() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function postMessage(sender, text) {
  const res = await axios.post(API_URL, { sender, text });
  return res.data;
}
