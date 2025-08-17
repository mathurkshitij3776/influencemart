"use client";
export default function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {note.title || "Untitled"}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-3 line-clamp-3">
        {note.content || "No content"}
      </p>
      <p className="text-xs text-gray-400">
        {note.updatedAt ? `Updated: ${formatDate(note.updatedAt)}` : 
         note.createdAt ? `Created: ${formatDate(note.createdAt)}` : ''}
      </p>
    </div>
  );
}