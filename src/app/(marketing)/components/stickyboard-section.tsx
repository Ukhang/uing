"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import { Button } from "@/components/animations/magnetic-button";
import StickyBoard from "@/components/ui/sticky-board";
import CodeBlock from "@/components/ui/code-block";

const StickyBoardSection = () => {
  const [activeTab, setActiveTab] = useState("preview");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Sticky Board
          </h3>
          <p className="text-custom-muted">
            An interactive board where you can create, drag, edit, and delete
            colorful sticky notes — perfect for organizing ideas with a playful
            and intuitive experience.
          </p>
        </div>
        <div className="min-w-[60px] flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            magnetic
            className="cursor-pointer"
            onClick={toggleTab}
          >
            {activeTab === "preview" ? "Code" : "Preview"}
          </Button>
        </div>
      </div>

      {activeTab === "preview" && (
        <div className="grid grid-cols-1 sm:px-4">
          <Viewport>
            <div className="flex flex-col items-center justify-center min-h-full">
              <StickyBoard />
            </div>
          </Viewport>
        </div>
      )}

      {activeTab === "code" && (
        <div className="px-4">
          <h2 className="text-lg">Installation</h2>
          <p className="mt-4">Install the following dependencies:</p>
          <CodeBlock pageName="Terminal" code="pnpm i framer-motion" />

          <p className="mt-4">
            Copy and paste the following code into your project.
          </p>
          <CodeBlock
            pageName="sticky-board.tsx"
            code={`
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/animations/magnetic-button";
import { cn } from "@/lib/utils";

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
    { id: 1, text: "Drag me around!", x: 50, y: 50, color: "bg-yellow-200 dark:bg-yellow-300" },
    { id: 2, text: "Click to edit", x: 100, y: 130, color: "bg-green-200 dark:bg-green-300" },
  ]);
  const [nextId, setNextId] = useState<number>(3);
  const colors = [
    "bg-yellow-200 dark:bg-yellow-300",
    "bg-green-200 dark:bg-green-300",
    "bg-blue-200 dark:bg-blue-300",
    "bg-pink-200 dark:bg-pink-300",
    "bg-purple-200 dark:bg-purple-300",
  ];
  

  const addNote = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote: Note = {
      id: nextId,
      text: "New note",
      x: Math.random() * 70 + 20,
      y: Math.random() * 100 + 50,
      color: randomColor,
    };
    setNotes([...notes, newNote]);
    setNextId(nextId + 1);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNoteText = (id: number, newText: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const updateNotePosition = (id: number, x: number, y: number) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, x, y } : note)));
  };

  return (
    <div className="w-full h-[420px] p-6 relative overflow-hidden">
      <Button
        onClick={addNote}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full cursor-pointer"
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
};

export default StickyBoard;

function StickyNote({
  note,
  updateText,
  updatePosition,
  onDelete,
}: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(note.text);

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number; y: number } }
  ) => {
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
      updateText(text);
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute shadow-lg rounded-md p-4 w-54 min-h-32 cursor-move flex flex-col text-sm text-black",
        note.color
      )}
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
            `}
          />
        </div>
      )}
    </section>
  );
};

export default StickyBoardSection;
