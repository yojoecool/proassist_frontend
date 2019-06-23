import toast from './toast';
import history from './history';

const logout = () => {
  window.localStorage.removeItem('proAssistToken');
  toast('Successfully logged out.', 'success');
  history.push('/login');
};

export default logout;
