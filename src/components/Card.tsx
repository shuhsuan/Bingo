import React, { useState, useEffect } from 'react';
import './Card.css';

interface CardProps {
    prompt: string;
    onSave: (newText: string) => void;
    onClose: () => void;
}

const Card: React.FC<CardProps> = ({ prompt, onSave, onClose }) => {
    const [text, setText] = useState<string>(prompt);

    useEffect(() => {
        setText(prompt);
    }, [prompt]);

    const handleSave = () => {
        onSave(text);
        onClose();
    };

    return (
        <div className="card-overlay">
            <div className="card">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Card;