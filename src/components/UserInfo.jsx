import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { useToken } from '../hooks';

function UserInfo(props) {
  const { userType, userId } = useToken();
  const [token, setToken] = useLocalStorage('proAssistToken');

  const [userData, setUserData] = React.useState({ });

  React.useEffect(() => {
    const getUserInfo = async () => {
      const { REACT_APP_BACKEND_URL } = process.env;

      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/users/userInfo`,
        {
          params: { user: userId },
          headers: { authorization: `Bearer ${token}` }
        }
      );

      setUserData(data);
    };

    getUserInfo();
  }, []);

  return (
    <div />
  );
}

export default UserInfo;
