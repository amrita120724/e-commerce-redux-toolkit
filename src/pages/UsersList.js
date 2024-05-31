import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// omit other imports
import { selectAllUsers, fetchUsers } from '../features/user/usersSlice';

export const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const userStatus = useSelector(state => state.users.status)

  useEffect(() => {
      dispatch(fetchUsers())
  }, [dispatch])

  return (
    <ul>
        {users.length>0 && users.map(user=> (
            <li key={user.id}>{user.username}</li>
        ))}

    </ul>
  )
}