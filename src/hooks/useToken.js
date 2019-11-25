import { useEffect, useState } from 'react';
import { decodeToken, history } from '../modules';

function useToken() {
  const [token, setToken] = useState(decodeToken() || { userType: 'Visitor' });

  useEffect(() => {
    function something() {
      if (!decodeToken()) {
        setToken({ userType: 'Visitor' });
        return;
      }

      const { userType, email, userId, name, companyStatus } = decodeToken();
      setToken({ userType, email, userId, name, companyStatus });
    }

    const unlisten = history.listen(something);

    return () => unlisten();
  }, []);

  return token;
}

export default useToken;
