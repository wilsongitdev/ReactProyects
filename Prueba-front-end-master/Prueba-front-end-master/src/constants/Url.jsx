import axios from "axios";
export const instanceGuards = axios.create({
  baseURL: "https://opembpo.emeal.nttdata.com/admin/guardias/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instanceLoggin = axios.create({
  baseURL: "https://opembpo.emeal.nttdata.com/pre/",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});
