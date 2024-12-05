'use client';

import { useState } from 'react';
import CommentInput from './CommentInput';

interface Comment {
    text: string;
    date: string;
}

interface CommentSectionProps {
    initialComments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ initialComments }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [isCommenting, setIsCommenting] = useState(false);

    const addComment = (commentText: string) => {
        setIsCommenting(true);
        const newComment: Comment = {
        text: commentText,
        date: new Date().toLocaleString(),
        };

    setTimeout(() => {
        setComments([newComment, ...comments]); // Añade el nuevo comentario al inicio
        setIsCommenting(false);
    }, 1000); // Simula el tiempo de publicación
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#772E3F] dark:text-[#FA8B5F] mb-6">COMMENTS</h2>

            {/* Input para añadir comentarios */}
            <CommentInput onAddComment={addComment} isCommenting={isCommenting} />

            {/* Lista de comentarios */}
            <div className="mt-8 space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                <div
                    key={index}
                    className="bg-white border border-[#141414] dark:bg-[#0e0f14] dark:border-gray-200 p-4 shadow-sm flex flex-col"
                >
                <p className="text-[#141414] dark:text-gray-200">{comment.text}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{comment.date}</span>
                </div>
            ))
        ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">No comments yet. Be the first to share your opinion!</p>
        )}
        </div>
    </div>
    );
};

export default CommentSection;
