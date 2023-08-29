import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import userService from '../services/users';

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserListData = async () => {
      const data = await userService.getAll();
      setUserList(data);
    };

    fetchUserListData();
  }, []);

  const renderUserList = () => {
    return userList.map((user) => (
      <tr key={user.id}>
        <td>
          <Link to={`/users/${user.username}`}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>{renderUserList()}</tbody>
      </table>
    </div>
  );
};

export default UserList;
