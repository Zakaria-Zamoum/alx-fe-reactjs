import React from "react";

function UserCard({ user }) {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h2 className="font-bold">{user.login}</h2>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default UserCard;