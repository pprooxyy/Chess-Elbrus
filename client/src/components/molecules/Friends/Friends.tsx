import React, { useState, useEffect } from 'react';
import "./Friends.css";

interface Friend {
  id: number;
  name: string;
}

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = useState<string>('');

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/friends', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        setFriends(data);
      } else {
        console.error('Failed to fetch friends:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch friends:', error);
    }
  };

  const addFriend = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newFriendName }),
        credentials: "include"
      });

      if (response.ok) {
        setNewFriendName('');
        fetchFriends();
      } else {
        console.error('Failed to add friend:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add friend:', error);
    }
  };

  const deleteFriend = async (friendId: number): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/friends/${friendId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });

      if (response.ok) {
        fetchFriends();
      } else {
        console.error('Failed to delete friend:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete friend:', error);
    }
  };

  return (
    <div className="friends-container">
      <h2 className='title-friend'>Friends</h2>
      {friends.length === 0 ? (
        <p className='no-friend-list'>Список друзей пуст, добавьте друга по нику</p>
      ) : (
      <ul className="friend-list">
        {friends.map((friend) => (
          <li key={friend.id} className="friend-item">
            <a href={`/profile/${friend.id}`} className="friend-name">{friend.name}</a>
            <button onClick={() => deleteFriend(friend.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
      )}
      <div className="puzzle-content-wrapper">
        <div className="add-friend">
          <h3>Добавить друга</h3>
          <input
            type="text"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            placeholder="Введите имя друга"
            className="friend-input"
          />
          <button onClick={addFriend} className="add-button">Add</button>
        </div>
      </div>
    </div>
  );
};

export default Friends;
