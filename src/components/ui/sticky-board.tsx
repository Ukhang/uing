"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/animations/magnetic-button';

type Note = {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
};

type StickyNoteProps = {
  note: Note;
  updateText: (text: string) => void;
  updatePosition: (x: number, y: number) => void;
  onDelete: () => void;
};

const StickyBoard = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: 'Drag me around!', x: 50, y: 50, color: 'bg-yellow-200' },
    { id: 2, text: 'Click to edit', x: 100, y: 130, color: 'bg-green-200' },
  ]);
  const [nextId, setNextId] = useState<number>(3);
  const colors = ['bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-pink-200', 'bg-purple-200'];

  const addNote = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote: Note = {
      id: nextId,
      text: 'New note',
      x: Math.random() * 100 + 50,
      y: Math.random() * 100 + 50,
      color: randomColor,
    };
    setNotes([...notes, newNote]);
    setNextId(nextId + 1);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNoteText = (id: number, newText: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, text: newText } : note
    ));
  };

  const updateNotePosition = (id: number, x: number, y: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, x, y } : note
    ));
  };

  return (
    <div className="w-full h-[500px] p-6 relative overflow-hidden">
      <Button
        onClick={addNote}
        className='absolute bottom-4 mx-auto rounded-full'
        variant={"outline"}
        size={"icon"}
        magnetic
      >
        <Plus size={24} />
      </Button>

      {notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          updateText={(text) => updateNoteText(note.id, text)}
          updatePosition={(x, y) => updateNotePosition(note.id, x, y)}
          onDelete={() => deleteNote(note.id)}
        />
      ))}
    </div>
  );
}

export default StickyBoard;

function StickyNote({ note, updateText, updatePosition, onDelete }: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(note.text);

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    updatePosition(note.x + info.offset.x, note.y + info.offset.y);
  };

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateText(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
      updateText(text);
    }
  };

  return (
    <motion.div
      className={`absolute shadow-lg rounded-md ${note.color} p-4 w-54 min-h-32 cursor-move flex flex-col text-sm`}
      style={{ x: note.x, y: note.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <motion.button
        className="absolute top-1 right-1 text-gray-600 hover:text-gray-800 p-1 rounded-full"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <X size={16} />
      </motion.button>

      {isEditing ? (
        <textarea
          className="bg-transparent border-none outline-none resize-none flex-grow w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="whitespace-pre-wrap break-words flex-grow">
          {note.text}
        </div>
      )}
    </motion.div>
  );
}