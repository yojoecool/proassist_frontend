import { toast } from 'react-toastify';

export default (message, type = 'default') => {
  toast[type](message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  });
};
