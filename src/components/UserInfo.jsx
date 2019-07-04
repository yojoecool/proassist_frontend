import React from 'react';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { useToken } from '../hooks';
import { toast } from '../modules';

function UserInfo(props) {
  const { userType, userId } = useToken();
  const [token] = useLocalStorage('proAssistToken');

  const [userData, setUserData] = React.useState({ });

  React.useEffect(() => {
    const getUserInfo = async () => {
      const { REACT_APP_BACKEND_URL } = process.env;
      const propsUserId = props.userId;

      let user = userId;
      if (propsUserId) {
        user = propsUserId;
      }

      try {
        const { data } = await axios.get(
          `${REACT_APP_BACKEND_URL}/users/userInfo`,
          {
            params: { user },
            headers: { authorization: `Bearer ${token}` }
          }
        );

        setUserData(data);
      } catch (err) {
        if (err.response.status === 404) {
          toast('User not found', 'error');
          return;
        } else if (err.response.status === 403) {
          toast('You are not authorized to view this user\'s info', 'error');
          return;
        }

        toast('Error loading user', 'error');
      }
    };

    getUserInfo();
  }, [props.userId, userId, token]);

  const normalUserDiv = userData.email
    ? (
      <div>
        Email: {userData.email}
      </div>
      ) :
    <div />;

  switch (userType) {
    case 'Admin':
      break;
    case 'JobSeeker':
      break;
    case 'Company':
      break;
    default:
      break;
  }

  return (
    <>
      {normalUserDiv}
    </>
  );
}

export default UserInfo;
