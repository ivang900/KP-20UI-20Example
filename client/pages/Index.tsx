import { useState } from "react";
import { MapPin, Clock, Navigation, Search, Filter } from "lucide-react";

interface Location {
  id: string;
  name: string;
  type: "Urgent Care" | "Emergency Room" | "Walk-in Clinic";
  distance: number;
  waitTime: number;
  waitCategory: "low" | "medium" | "long";
  address: string;
  phone: string;
  isOpen: boolean;
}

// Mock data for demonstration
const mockLocations: Location[] = [
  {
    id: "1",
    name: "City Emergency Medical Center",
    type: "Emergency Room",
    distance: 0.8,
    waitTime: 15,
    waitCategory: "low",
    address: "123 Medical Drive, Downtown",
    phone: "(555) 123-4567",
    isOpen: true,
  },
  {
    id: "2",
    name: "QuickCare Urgent Center",
    type: "Urgent Care",
    distance: 1.2,
    waitTime: 45,
    waitCategory: "medium",
    address: "456 Health Street, Midtown",
    phone: "(555) 234-5678",
    isOpen: true,
  },
  {
    id: "3",
    name: "Metro General Hospital ER",
    type: "Emergency Room",
    distance: 2.1,
    waitTime: 120,
    waitCategory: "long",
    address: "789 Hospital Boulevard, Uptown",
    phone: "(555) 345-6789",
    isOpen: true,
  },
  {
    id: "4",
    name: "FastTrack Medical Clinic",
    type: "Walk-in Clinic",
    distance: 0.6,
    waitTime: 25,
    waitCategory: "low",
    address: "321 Wellness Avenue, Central",
    phone: "(555) 456-7890",
    isOpen: true,
  },
  {
    id: "5",
    name: "Northwest Emergency Care",
    type: "Urgent Care",
    distance: 3.4,
    waitTime: 75,
    waitCategory: "medium",
    address: "654 Care Circle, Northwest",
    phone: "(555) 567-8901",
    isOpen: false,
  },
];

function getWaitTimeColor(category: string): string {
  switch (category) {
    case "low":
      return "bg-wait-low text-wait-low-foreground";
    case "medium":
      return "bg-wait-medium text-wait-medium-foreground";
    case "long":
      return "bg-wait-long text-wait-long-foreground";
    default:
      return "bg-gray-500 text-white";
  }
}

function formatWaitTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

function LocationCard({ location }: { location: Location }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">
            {location.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{location.type}</p>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {location.distance} mi • {location.address}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div
            className={`px-3 py-1 rounded-full text-2xl font-medium ${getWaitTimeColor(location.waitCategory)}`}
          >
            {formatWaitTime(location.waitTime)}
          </div>
          {!location.isOpen && (
            <span className="text-xs text-red-600 font-medium">Closed</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>Wait time: {formatWaitTime(location.waitTime)}</span>
        </div>
        <button className="text-emergency font-medium text-sm hover:underline">
          Call Now
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredLocations = mockLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Kaiser Care Finder
              </h1>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Navigation className="h-4 w-4 mr-1" />
                <span>Harbor City, Ca</span>
              </div>
            </div>
            <div
              className="h-8 w-8"
              style={{
                backgroundImage:
                  "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5Z7xMWou0YpI3YE7d8C8oY8OpVPVC74Qw0WJlvgyb3zXeEhgmZuKspaLes5xP5Qgf5M&usqp=CAU)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search urgent care, ER, clinics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emergency focus:border-emergency outline-none"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Filter className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {filteredLocations.length}
              </div>
              <div className="text-xs text-gray-600">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wait-low">
                {
                  filteredLocations.filter((l) => l.waitCategory === "low")
                    .length
                }
              </div>
              <div className="text-xs text-gray-600">Low Wait</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.min(...filteredLocations.map((l) => l.distance)).toFixed(
                  1,
                )}{" "}
                mi
              </div>
              <div className="text-xs text-gray-600">Nearest</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            <button className="px-4 py-2 bg-emergency text-emergency-foreground rounded-full text-sm font-medium whitespace-nowrap">
              All Types
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">
              Emergency Room
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">
              Urgent Care
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">
              Walk-in Clinic
            </button>
          </div>
        </div>
      )}

      {/* Wait Time Legend */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Wait Times</span>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-wait-low rounded-full"></div>
              <span className="text-xs text-gray-600">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-wait-medium rounded-full"></div>
              <span className="text-xs text-gray-600">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-wait-long rounded-full"></div>
              <span className="text-xs text-gray-600">Long</span>
            </div>
          </div>
        </div>
      </div>

      {/* Locations List */}
      <div className="px-4 py-4 space-y-4">
        {filteredLocations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <MapPin className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No locations found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))
        )}
      </div>

      {/* Emergency Call Button */}
      <div className="fixed bottom-4 left-4">
        <button className="bg-emergency text-emergency-foreground px-4 py-2 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow">
          🚨 Call 911
        </button>
      </div>

      {/* Bottom padding for fixed button */}
      <div className="h-20"></div>
    </div>
  );
}
