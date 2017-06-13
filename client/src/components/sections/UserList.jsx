import React, { PropTypes } from 'react';
import UserListTable from './UserListTable.jsx';

const UserList = ({ users, onClick }) =>
   (
    <table className="bordered responsive-table">
      <thead>
        <tr>
          <th>Role ID</th>
          <th>Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => <UserListTable key={user.id} user ={user} handleClick= {onClick}/>)}
      </tbody>
    </table>
  );
UserList.prototype = {
  users: PropTypes.array.isRequired
};
export default UserList;

