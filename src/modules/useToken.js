import { useEffect, useState } from 'react';
import decodeToken from './decodeToken';
import history from './history';

function useToken() {
  const [token, setToken] = useState(decodeToken() || { userType: 'Visitor' });

  useEffect(() => {
    function something() {
      if (!decodeToken()) {
        setToken({ userType: 'Visitor' });
        return;
      }

      const { userType, email, userId } = decodeToken();
      setToken({ userType, email, userId });
    }

    const unlisten = history.listen(something);

    return () => unlisten();
  }, []);

  return token;
}

export default useToken;
