import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="mb-6">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-6">Page not found</p>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <a
          href="/"
          className="inline-block bg-emergency text-emergency-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Emergency Care
        </a>
      </div>
    </div>
  );
};

export default NotFound;
