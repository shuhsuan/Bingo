import React, { useState, useEffect } from 'react';
import './Prompt.css';
import Card from '../components/Card';
import { prepareGridData } from './utils';

interface Prompt {
    id: number;
    text: string;
}

const GRID_SIZE = 5;
const EMPTY_INDEX = Math.floor(GRID_SIZE * GRID_SIZE / 2);

const Prompt: React.FC = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [input, setInput] = useState<string>('');
    const [nextId, setNextId] = useState<number>(1);
    const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
    const [grid, setGrid] = useState<(Prompt | null)[][]>([]);
    const [showList, setShowList] = useState<boolean>(false);

    useEffect(() => {
        if (prompts.length === 24) {
            setGrid(prepareGridData(prompts, GRID_SIZE, EMPTY_INDEX));
        }
    }, [prompts]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && prompts.length < 24) {
            const newPrompts = [...prompts, { id: nextId, text: input.trim() }];
            setPrompts(newPrompts);
            setInput('');
            setNextId(nextId + 1);
        }
    };

    const handleEdit = (prompt: Prompt) => {
        setEditingPrompt(prompt);
    };

    const handleSave = (id: number, newText: string) => {
        const updatedPrompts = prompts.map(prompt =>
            prompt.id === id ? { ...prompt, text: newText } : prompt
        );
        setPrompts(updatedPrompts);
        setGrid(prepareGridData(updatedPrompts, GRID_SIZE, EMPTY_INDEX));
    };

    const handleClose = () => {
        setEditingPrompt(null);
    };

    const handleListToggle = () => {
        setShowList(!showList);
    };

    const handleListSave = () => {
        setGrid(prepareGridData(prompts, GRID_SIZE, EMPTY_INDEX));
        setShowList(false);
    };

    const handleListClear = () => {
        setPrompts([]);
        setInput('');
        setNextId(1);
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a prompt"
                    disabled={prompts.length >= 24}
                />
                <button type="submit" disabled={prompts.length >= 24}>Submit</button>
            </form>
            <div className="controls">
                <button onClick={handleListToggle}>
                    {showList ? 'Hide List' : 'Show List'}
                </button>
                <button onClick={handleListSave} disabled={prompts.length !== 24}>
                    Shuffle into Grid
                </button>
                <button onClick={handleListClear} disabled={prompts.length === 0}>
                    Clear List
                </button>
            </div>
            <div className="prompt-list">
                {showList && (
                    <div className="prompt-list-container">
                        <h2>Prompt List:</h2>
                        <ul>
                            {prompts.map(prompt => (
                                <li key={prompt.id}>
                                    <p onClick={() => handleEdit(prompt)}>{prompt.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="bingo-grid">
                {grid.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="grid-cell">
                            {cell ? (
                                <p onClick={() => handleEdit(cell)}>{cell.text}</p>
                            ) : (
                                <div className="empty-cell"></div>
                            )}
                        </div>
                    ))
                ))}
            </div>
            {editingPrompt && (
                <Card
                    prompt={editingPrompt.text}
                    onSave={(newText) => handleSave(editingPrompt.id, newText)}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default Prompt;






