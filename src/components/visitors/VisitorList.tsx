import type React from "react";
import type { VisitorInfo } from "@/types/visitors";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils";
import {
  UserCheck,
  Package,
  PenToolIcon as Tool,
  Home,
  AlertTriangle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VisitorListProps {
  visitors: VisitorInfo[];
  onCheckOut: (visitorId: string) => void;
}

export const VisitorList: React.FC<VisitorListProps> = ({
  visitors,
  onCheckOut,
}) => {
  const getVisitorIcon = (type: string) => {
    switch (type) {
      case "guest":
        return <UserCheck className="h-6 w-6 text-blue-500" />;
      case "delivery":
        return <Package className="h-6 w-6 text-green-500" />;
      case "maintenance":
        return <Tool className="h-6 w-6 text-orange-500" />;
      case "tour":
        return <Home className="h-6 w-6 text-purple-500" />;
      default:
        return null;
    }
  };

  const getOverstayInfo = (visitor: VisitorInfo) => {
    const checkInTime = new Date(visitor.checkInTime);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - checkInTime.getTime()) / 60000
    );

    if (diffInMinutes > 45) {
      return { overstayed: true, duration: diffInMinutes };
    }

    return { overstayed: false, duration: diffInMinutes };
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        Active Visitors
      </h2>
      {visitors.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No visitors currently checked in.
        </p>
      ) : (
        <ul className="space-y-4">
          {visitors.map((visitor) => {
            const { overstayed, duration } = getOverstayInfo(visitor);
            return (
              <li
                key={visitor.id}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {getVisitorIcon(visitor.type)}
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {visitor.firstName} {visitor.lastName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {visitor.type.charAt(0).toUpperCase() +
                          visitor.type.slice(1)}{" "}
                        -{" "}
                        {visitor.type === "guest"
                          ? `Apt ${visitor.apartmentNumber}`
                          : visitor.type === "delivery"
                          ? `Delivery to Apt ${visitor.apartmentNumber}`
                          : visitor.type === "maintenance"
                          ? "Maintenance"
                          : "Tour"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Check-in: {formatTime(visitor.checkInTime)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Duration: {duration} minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {overstayed && (
                      <Alert variant="destructive" className="p-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Overstayed by {duration - 45} minutes
                        </AlertDescription>
                      </Alert>
                    )}
                    <Button
                      onClick={() => onCheckOut(visitor.id)}
                      className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600"
                    >
                      Check Out
                    </Button>
                  </div>
                </div>
                {visitor.luggage && visitor.luggage.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                      Luggage:
                    </h4>
                    <ul className="list-disc list-inside">
                      {visitor.luggage.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
