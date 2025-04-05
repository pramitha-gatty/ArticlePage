import React from 'react';

function TagButton({ tag, onClick }) {
  return (
    <button
      className="tag-button"
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering parent click
        onClick(tag);
      }}
    >
      {tag}
    </button>
  );
}

export default TagButton;
