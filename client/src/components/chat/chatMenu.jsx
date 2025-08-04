import { useEffect, useState } from 'react';
import GroupsManager from '../groups/groupsManager';

export default function ChatMenu({ socket }) {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BASE_URL}/api/groups`)
      .then(res => res.json())
      .then(setGroups)
      .catch(() => setError('Failed to load groups'));
  }, []);

  return (
    <>
      <h1>hi {user?.userName}</h1>
      {error && <div>{error}</div>}
      <GroupsManager socket={socket} />
    </>
  );
}