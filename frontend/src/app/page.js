"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../Context/UserContext';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Notes App</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Organize your thoughts, capture your ideas, and keep track of everything important.
          </p>
          
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link
              href="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold mb-2">Create Notes</h3>
              <p className="text-gray-600">Easily create and organize your thoughts with our simple note-taking interface.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your notes are protected with secure authentication and personal access.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">📱</div>
              <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600">Access your notes from any device with our mobile-friendly design.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
