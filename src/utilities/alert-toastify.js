import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const types = ["info", "success", "warning", "error"];

/**
 * @param  {string} type - The type of the notification
 * @param  {string} message - The content of the notification
 * @returns {void}
 * */
export default function notify(massage, type = "") {
  if (!types.includes(type))
    throw new Error(`Invalid notification type "${type}"`);

  toast[type](massage, options);
}
