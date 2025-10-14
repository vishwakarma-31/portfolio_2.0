import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;