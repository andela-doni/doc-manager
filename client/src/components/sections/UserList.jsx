import React, { PropTypes } from 'react';//eslint-disable-line
import UserListTable from './UserListTable.jsx';//eslint-disable-line

const UserList = ({ users, onClick }) =>
     <div>
       <h5>Users</h5>
       <table className="bordered responsive-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
        <UserListTable key={user.id} user ={user} handleClick= {onClick}/>
        )}
      </tbody>
    </table>
     </div>
  ;
UserList.prototype = {
  users: PropTypes.array.isRequired
};
export default UserList;
