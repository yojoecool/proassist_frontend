import toast from './toast';

const logout = () => {
  window.localStorage.removeItem('proAssistToken');
  toast('Successfully logged out.', 'success');
};

export default logout;
