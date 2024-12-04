'use client';

import { useState } from 'react';

interface CommentInputProps {
  onAddComment: (comment: string) => void;
  isCommenting: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({ onAddComment, isCommenting }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Add a Comment</h3>
      <textarea
        placeholder="Write your thoughts here..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={4}
        className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FA8B5F] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 resize-none"
      ></textarea>
      <button
        onClick={handleAddComment}
        disabled={isCommenting || !newComment.trim()}
        className={`mt-3 px-4 py-2 bg-[#FA8B5F] text-white rounded-lg font-semibold text-sm shadow-md hover:bg-[#FA705F] transition-all ${
          isCommenting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isCommenting ? 'Posting...' : 'Post Comment'}
      </button>
    </div>
  );
};

export default CommentInput;
