import React, { useState, useEffect } from 'react';
import "./Friends.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface Friend {
  id: number;
  name: string;
  avatar: string;
}

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>("");

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
      } else if (response.status === 404) {
       setErrorMsg('Friend not found. Please check the username.');
       
       setTimeout(() => {
        setErrorMsg('');
      }, 3000);
      }
      else {
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

  const handleButtonClick = () => {
    addFriend();
    setNewFriendName('');
  };

  return (
    <div className="friends-container">
      <h2 className='title-friend'>Friends</h2>
      <div className="puzzle-content-wrapper">
        <div className="add-friend">
          <h3>Add friends</h3>
          <input
            type="text"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            placeholder="Enter your friend name"
            className="friend-input"
          />
          <button onClick={handleButtonClick} className="add-button">Add</button>
        </div>
      </div>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      {friends.length === 0 ? (
        <p className='no-friend-list'>Friends list is empty, add a friend by nickname</p>
      ) : (
        <div className="friend-cards">
          {friends.map((friend) => (
            <Card key={friend.id} className="friend-card">
              <a href={`/profile/${friend.id}`} className="friend-name"><Card.Img variant="top" src={friend.avatar} alt={friend.name} className='avatar' /></a>
              <Card.Body>
                <a href={`/profile/${friend.id}`} className="friend-name"><Card.Title>{friend.name}</Card.Title></a>
                <Button variant="danger" onClick={() => deleteFriend(friend.id)} className="custom-button">Delete</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;