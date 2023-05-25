import React, { useState, useEffect } from "react";
import "./Friends.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

interface Friend {
  id: number;
  name: string;
  avatar: string;
  rating: number;
}

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [users, setUsers] = useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3001/friends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setFriends(data);
        setUsers([]);
      } else {
        console.error("Failed to fetch friends:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    }
  };

  const searchUsers = async (name: string): Promise<void> => {
    try {
      if (name.length === 0) return fetchFriends();
      const response = await fetch("http://localhost:3001/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFriends(data.friends);
        setUsers(data.users);
      } else if (response.status === 404) {
        setErrorMsg("Friend not found. Please check the username.");
        setFriends([]);
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      } else {
        console.error("Failed to add friend:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to add friend:", error);
    }
  };

  const addFriend = async (friendId: number): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3001/friends/${friendId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        searchUsers(newFriendName);
        // setNewFriendName('');
        // fetchFriends();
      } else if (response.status === 404) {
        setErrorMsg("Friend not found. Please check the username.");

        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      } else {
        console.error("Failed to add friend:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to add friend:", error);
    }
  };

  const deleteFriend = async (friendId: number): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3001/friends/${friendId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        searchUsers(newFriendName);
      } else {
        console.error("Failed to delete friend:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete friend:", error);
    }
  };

  const handleButtonClick = () => {
    searchUsers(newFriendName);
    // setNewFriendName('');
  };

  return (
    <div className="friend-container">
      <h2 className="title-friend">Friends</h2>
      <div className="puzzle-content-wrapper">
        <div className="add-friend">
          <h3>Add friends</h3>
          <input
            type="text"
            value={newFriendName}
            onChange={(e) => {
              setNewFriendName(e.target.value);
              searchUsers(e.target.value);
            }}
            placeholder="Enter name"
            className="friend-input"
          />
          <button onClick={handleButtonClick} className="add-button">
            Search
          </button>
        </div>
      </div>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      {friends.length === 0 ? (
        <>
          <p className="no-friend-list">Friends no added</p>
          <div className="line-up"></div>
        </>
      ) : (
        <div className="friend-cards">
          {friends.map((friend) => (
            <div className="inside-card">
              <Card key={friend.id} className="friend-card">
                <div className="avatar-name">
                  <Link to={`/profile/${friend.id}`} className="friend-name">
                    <Card.Img
                      variant="top"
                      src={friend.avatar}
                      alt={friend.name}
                      className="avatar"
                    />
                  </Link>
                  <Card.Body>
                    <Link to={`/profile/${friend.id}`} className="friend-name">
                      <Card.Title>
                        {friend.name}
                        <br />
                        {friend.rating}
                      </Card.Title>
                    </Link>
                  </Card.Body>
                </div>
                <Button
                  variant="danger"
                  onClick={() => deleteFriend(friend.id)}
                  className="custom-button1"
                >
                  DELETE
                </Button>
              </Card>
            </div>
          ))}
        </div>
      )}
      {
        <div className="friend-cards">
          {users.map((user) => (
            <div className="inside-card">
              <Card key={user.id} className="friend-card">
                <Link to={`/profile/${user.id}`} className="friend-name">
                  <Card.Img
                    variant="top"
                    src={user.avatar}
                    alt={user.name}
                    className="avatar"
                  />
                </Link>
                <Card.Body>
                  <Link to={`/profile/${user.id}`} className="friend-name">
                    <Card.Title>
                      {user.name}
                      <br />
                      {user.rating}
                    </Card.Title>
                  </Link>
                </Card.Body>
                <Button
                  variant="danger"
                  onClick={() => addFriend(user.id)}
                  className="custom-button2"
                >
                  ADD
                </Button>
              </Card>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Friends;
