"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import { useUser } from "../../Context/UserContext";
import NoteForm from "../../components/NoteForm";
import NoteCard from "../../components/NoteCard";

export default function Dashboard() {
  const { user, logoutUser, loading } = useUser();
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [notesLoading, setNotesLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchNotes();
    }
  }, [user, loading, router]);

  const fetchNotes = async () => {
    try {
      setNotesLoading(true);
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        logoutUser();
        router.push("/login");
      }
    } finally {
      setNotesLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes(); // refresh notes
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600">Manage your notes and ideas</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NoteForm 
          refreshNotes={fetchNotes} 
          editingNote={editingNote} 
          onCancel={handleCancelEdit} 
        />

        {/* Notes Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Notes</h2>
            <span className="text-gray-500">{notes.length} notes</span>
          </div>

          {notesLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading notes...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
              <p className="text-gray-600">Create your first note to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}