"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  UserCheck,
  Building,
  Shield,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  LogOut,
  Search,
  Users,
  FileText,
  Clipboard,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Types
type VisitorType = "maintenance" | "delivery" | "guest" | "tour";

interface GuestInfo {
  id: string;
  firstName: string;
  lastName: string;
  idType: string;
  idNumber: string;
  visitorType: VisitorType;
  appointmentId?: string;
  visitPurpose: string;
  apartmentNumber: string;
  residentName: string;
  expectedDuration: string;
  email: string;
  phone: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: "active" | "checked-out";
}

interface AppointmentInfo {
  id: string;
  visitorType: VisitorType;
  appointmentDate: string;
  duration: string;
  visitorName: string;
  purpose: string;
}

const SecurityCheckIn = () => {
  const [activeVisitors, setActiveVisitors] = useState<GuestInfo[]>([]);
  const [appointments, setAppointments] = useState<AppointmentInfo[]>([]);
  const [appointmentSearchId, setAppointmentSearchId] = useState("");
  const [searchResults, setSearchResults] = useState<AppointmentInfo | null>(
    null
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("check-in");

  const [guestInfo, setGuestInfo] = useState<Partial<GuestInfo>>({
    firstName: "",
    lastName: "",
    idType: "",
    idNumber: "",
    visitorType: "guest",
    visitPurpose: "",
    apartmentNumber: "",
    residentName: "",
    expectedDuration: "",
    email: "",
    phone: "",
    status: "active",
  });

  // Mock appointment data
  useEffect(() => {
    setAppointments([
      {
        id: "APT001",
        visitorType: "tour",
        appointmentDate: new Date().toISOString(),
        duration: "1 hour",
        visitorName: "John Doe",
        purpose: "Property Tour",
      },
      {
        id: "APT002",
        visitorType: "maintenance",
        appointmentDate: new Date().toISOString(),
        duration: "2 hours",
        visitorName: "Mike Smith",
        purpose: "AC Repair",
      },
    ]);
  }, []);

  const generateVisitorId = () => {
    return `VIS-${Math.random().toString(36).substr(2, 9)}`.toUpperCase();
  };

  const handleAppointmentSearch = () => {
    const appointment = appointments.find(
      (apt) => apt.id === appointmentSearchId
    );
    setSearchResults(appointment || null);
  };

  const handleVisitorCheckIn = (appointment?: AppointmentInfo) => {
    const newVisitor: GuestInfo = {
      ...(guestInfo as GuestInfo),
      id: generateVisitorId(),
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
      status: "active",
      appointmentId: appointment?.id,
    };

    setActiveVisitors((prev) => [...prev, newVisitor]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    resetForm();
  };

  const handleVisitorCheckOut = (visitorId: string) => {
    setActiveVisitors((prev) =>
      prev.map((visitor) =>
        visitor.id === visitorId
          ? {
              ...visitor,
              checkOutTime: new Date().toISOString(),
              status: "checked-out",
            }
          : visitor
      )
    );
  };

  const resetForm = () => {
    setGuestInfo({
      firstName: "",
      lastName: "",
      idType: "",
      idNumber: "",
      visitorType: "guest",
      visitPurpose: "",
      apartmentNumber: "",
      residentName: "",
      expectedDuration: "",
      email: "",
      phone: "",
      status: "active",
    });
    setAppointmentSearchId("");
    setSearchResults(null);
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active" ? "bg-green-500" : "bg-red-500";
  };

    const handleInputChange = (e) => {
      setGuestInfo({
        ...guestInfo,
        [e.target.name]: e.target.value,
      });
    };



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <Card className="max-w-7xl mx-auto backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 shadow-xl">
        <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <CardTitle className="text-3xl font-bold">
              Visitor Security Check-in
            </CardTitle>
          </div>
          <CardDescription className="text-gray-100">
            Welcome to our secure visitor management system
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="check-in" className="w-1/3">
                <UserCheck className="mr-2" />
                New Check-in
              </TabsTrigger>
              <TabsTrigger value="appointment" className="w-1/3">
                <Calendar className="mr-2" />
                Appointment Check-in
              </TabsTrigger>
              <TabsTrigger value="active" className="w-1/3">
                <Users className="mr-2" />
                Active Visitors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="check-in">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVisitorCheckIn();
                }}
                className="space-y-6"
              >
                {/* Existing form fields with enhanced styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Visitor Type</Label>
                    <select
                      className="w-full p-2 rounded-md border dark:bg-gray-700"
                      value={guestInfo.visitorType}
                      onChange={(e) =>
                        setGuestInfo((prev) => ({
                          ...prev,
                          visitorType: e.target.value as VisitorType,
                        }))
                      }
                    >
                      <option value="guest">Guest</option>
                      <option value="delivery">Delivery</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="tour">Tour</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="dark:text-gray-200">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter first name"
                      value={guestInfo.firstName}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="dark:text-gray-200">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter last name"
                      value={guestInfo.lastName}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                </div>

                <Separator className="dark:bg-gray-600" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="idType" className="dark:text-gray-200">
                      ID Type
                    </Label>
                    <select
                      id="idType"
                      name="idType"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                      value={guestInfo.idType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select ID Type</option>
                      <option value="drivers_license">
                        Driver&apos;s License
                      </option>
                      <option value="passport">Passport</option>
                      <option value="state_id">State ID</option>
                      <option value="military_id">Military ID</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber" className="dark:text-gray-200">
                      ID Number
                    </Label>
                    <Input
                      id="idNumber"
                      name="idNumber"
                      placeholder="Enter ID number"
                      value={guestInfo.idNumber}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitPurpose" className="dark:text-gray-200">
                    Purpose of Visit
                  </Label>
                  <Input
                    id="visitPurpose"
                    name="visitPurpose"
                    placeholder="e.g., Meeting with resident, Maintenance, Delivery"
                    value={guestInfo.visitPurpose}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-gray-700 dark:text-gray-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="apartmentNumber"
                      className="dark:text-gray-200"
                    >
                      <Building className="h-4 w-4 inline mr-1" />
                      Apartment Number
                    </Label>
                    <Input
                      id="apartmentNumber"
                      name="apartmentNumber"
                      placeholder="e.g., 4B"
                      value={guestInfo.apartmentNumber}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="residentName"
                      className="dark:text-gray-200"
                    >
                      <UserCheck className="h-4 w-4 inline mr-1" />
                      Resident Name
                    </Label>
                    <Input
                      id="residentName"
                      name="residentName"
                      placeholder="Enter resident name"
                      value={guestInfo.residentName}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-200">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="visitor@example.com"
                      value={guestInfo.email}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="dark:text-gray-200">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={guestInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="expectedDuration"
                      className="dark:text-gray-200"
                    >
                      <Clock className="h-4 w-4 inline mr-1" />
                      Expected Duration
                    </Label>
                    <Input
                      id="expectedDuration"
                      name="expectedDuration"
                      placeholder="e.g., 2 hours"
                      value={guestInfo.expectedDuration}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="dark:text-gray-200">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Check-in Time
                    </Label>
                    <div className="p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200">
                      {/* {formatTime(guestInfo?.checkInTime)} */}
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Submit Check-in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="appointment">
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <Input
                    placeholder="Enter Appointment ID"
                    value={appointmentSearchId}
                    onChange={(e) => setAppointmentSearchId(e.target.value)}
                  />
                  <Button onClick={handleAppointmentSearch}>
                    <Search className="mr-2" />
                    Search
                  </Button>
                </div>

                {searchResults && (
                  <Card className="border-2 border-blue-500">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">
                            Appointment Details
                          </h3>
                          <Badge>{searchResults.visitorType}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Visitor Name</Label>
                            <p className="text-gray-600 dark:text-gray-300">
                              {searchResults.visitorName}
                            </p>
                          </div>
                          <div>
                            <Label>Purpose</Label>
                            <p className="text-gray-600 dark:text-gray-300">
                              {searchResults.purpose}
                            </p>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => handleVisitorCheckIn(searchResults)}
                        >
                          Confirm Check-in
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="space-y-4">
                {activeVisitors
                  .filter((visitor) => visitor.status === "active")
                  .map((visitor) => (
                    <Card
                      key={visitor.id}
                      className="border-l-4 border-l-blue-500"
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {visitor.firstName} {visitor.lastName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              ID: {visitor.id}
                            </p>
                          </div>
                          <Badge
                            className={getStatusBadgeColor(visitor.status)}
                          >
                            {visitor.status}
                          </Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <Label>Check-in Time</Label>
                            <p>{formatTime(visitor.checkInTime)}</p>
                          </div>
                          <div>
                            <Label>Expected Duration</Label>
                            <p>{visitor.expectedDuration}</p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          className="mt-4"
                          onClick={() => handleVisitorCheckOut(visitor.id)}
                        >
                          <LogOut className="mr-2" />
                          Check Out
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                {activeVisitors.filter((v) => v.status === "active").length ===
                  0 && (
                  <div className="text-center py-8 text-gray-500">
                    No active visitors
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {showSuccess && (
            <Alert className="mt-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <AlertDescription className="text-green-600 dark:text-green-400">
                Check-in successful! Please wait for security personnel to
                verify your information.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="border-t dark:border-gray-700">
          <div className="w-full text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <p>
                  <strong>Building Security:</strong> (555) 123-4567
                </p>
                <p>
                  <strong>Emergency:</strong> 911
                </p>
              </div>
              <div>
                <p>
                  <strong>Management Office:</strong> (555) 987-6543
                </p>
                <p>
                  <strong>Hours:</strong> 9 AM - 5 PM Mon-Fri
                </p>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecurityCheckIn;
