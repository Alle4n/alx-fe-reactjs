import { useContext } from 'react';
import { UserContext } from '../UserContext';

function UserInfo() {
  const userData = useContext(UserContext);

  return (
    <div>
      <p>Age: {userData.age}</p>
      <p>Bio: {userData.bio}</p>
    </div>
  );
}

export default UserInfo;