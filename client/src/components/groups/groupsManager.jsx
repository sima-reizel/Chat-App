import { useState, useEffect } from 'react';

export default function GroupsManager({ socket }) {
  console.log(socket)
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  const BASE_URL = 'http://localhost:5000'

  useEffect(() => {
    fetch(`${BASE_URL}/api/groups`)
      .then(res => res.json())
      .then(setGroups)
      .catch(() => setError('Failed to load groups'));
  }, []);

  const createGroup = async () => {
    setError('');
    const res = await fetch(`${BASE_URL}/api/groups/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.message);
    } else {
      setGroups([...groups, groupName]);
      joinGroup(groupName);
    }
  };

  const joinGroup = (name) => {
    console.log(socket)
    if (socket) {
      socket.emit('join-room', name);
      // Navigate to group room page if needed
    } else {
      setError('Socket not connected');
    }
  };

  return (
    <div>
      
      <input value={groupName} onChange={e => setGroupName(e.target.value)} placeholder="שם קבוצה" />
      <button onClick={createGroup}>צור קבוצה</button>
      <button onClick={joinGroup}>הצטרף לקבוצה</button>
      {error && <div>{error}</div>}
      <ul>
        {groups.map(g => <li key={g}>{g}</li>)}
      </ul>
    </div>
  );
}