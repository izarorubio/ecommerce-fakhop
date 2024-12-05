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
        <div className="bg-[#fbf6ff] border border-[#141414] dark:bg-[#171921] dark:border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-black dark:text-gray-100 mb-2">Add a Comment</h3>
            <textarea
                placeholder="Write your thoughts here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="w-full p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3f57ba] dark:border-gray-600 dark:bg-[#323545] dark:text-gray-200 resize-none">
                </textarea>
            <button
                onClick={handleAddComment}
                disabled={isCommenting || !newComment.trim()}
                className={`mt-3 px-4 py-2 bg-[#3f57ba] text-white font-semibold text-sm hover:bg-[#FA705F] transition-all ${
                    isCommenting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                >
                {isCommenting ? 'Posting...' : 'Post Comment'}
            </button>
        </div>
    );
};

export default CommentInput;
