"use client";

import { useState } from "react";
import { VisitorWithLuggageSchema, type VisitorInfo } from "@/types/visitors";
import {
  checkInVisitor,
  searchResidents,
  verifyAppointment,
} from "@/app/actions/visitors";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building,
  UserCheck,
  AlertCircle,
  PlusCircle,
  MinusCircle,
  UserPlus,
  Pen,
  Package,
  Clock,
} from "lucide-react";
import { generateUniqueId } from "@/utils";
import { Appointment } from "@prisma/client";

interface CheckInFormProps {
  onCheckIn: (visitorInfo: VisitorInfo) => void;
}

export const CheckInForm: React.FC<CheckInFormProps> = ({ onCheckIn }) => {
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo>({
    id: "",
    firstName: "",
    lastName: "",
    idType: "STATE_ID",
    idNumber: "",
    type: "GUEST",
    apartmentNumber: "",
    residentName: "",
    email: "",
    phone: "",
    checkInTime: new Date().toISOString(),
    checkOutTime: null,
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [residentSuggestions, setResidentSuggestions] = useState<
    { number: string; tenantName: string }[]
  >([]);
  const [appointmentInfo, setAppointmentInfo] = useState<Appointment | undefined>();
  const [luggage, setLuggage] = useState<{ id: string; description: string }[]>(
    []
  );

  const visitorTypes = {
    GUEST: { icon: UserPlus, color: "text-blue-500" },
    MAINTENANCE: { icon: Pen, color: "text-orange-500" },
    DELIVERY: { icon: Package, color: "text-green-500" },
    TOUR: { icon: Clock, color: "text-purple-500" },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setVisitorInfo({
      ...visitorInfo,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "residentName") {
      searchResidents(e.target.value).then(setResidentSuggestions);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const visitorInfoWithLuggage = {
      ...visitorInfo,
      luggage: luggage.length > 0 ? luggage : undefined,
    };
    const result = await checkInVisitor(VisitorWithLuggageSchema.parse(visitorInfoWithLuggage));
    if (result.success) {
      onCheckIn(result.data);
      // Reset form
      setVisitorInfo({
        id: "",
        firstName: "",
        lastName: "",
        idType: "STATE_ID",
        idNumber: "",
        type: "GUEST",
        apartmentNumber: "",
        residentName: "",
        email: "",
        phone: "",
        checkInTime: new Date().toISOString(),
        checkOutTime: null,
      });
      setErrors({});
      setAppointmentInfo(undefined);
      setLuggage([]);
    } else {
      setErrors(result.errors || {});
    }
  };

  const handleAppointmentVerification = async () => {
    let appointmentId = "";
    if (visitorInfo.type === "MAINTENANCE") {
      appointmentId = (visitorInfo).workOrderNumber;
    } else if (visitorInfo.type === "DELIVERY") {
      appointmentId = (visitorInfo).trackingNumber;
    } else if (visitorInfo.type === "TOUR") {
      appointmentId = (visitorInfo).appointmentId;
    }

    if (appointmentId) {
      const result = await verifyAppointment(appointmentId);
      if (result.success) {
        setAppointmentInfo(result.data);
      } else {
        setErrors({
          appointment: [result.message || "Appointment verification failed"],
        });
      }
    }
  };

  const addLuggage = () => {
    setLuggage([...luggage, { id: generateUniqueId(), description: "" }]);
  };

  const removeLuggage = (id: string) => {
    setLuggage(luggage.filter((item) => item.id !== id));
  };

  const updateLuggageDescription = (id: string, description: string) => {
    setLuggage(
      luggage.map((item) => (item.id === id ? { ...item, description } : item))
    );
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion type="single" collapsible className="mb-6">
          <AccordionItem value="guidelines">
            <AccordionTrigger className="text-blue-600 dark:text-blue-400">
              Visitor Guidelines & Building Policies
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All visitors must present a valid government-issued photo ID
                </li>
                <li>Visitors are only permitted in designated areas</li>
                <li>Building quiet hours are from 10 PM to 7 AM</li>
                <li>
                  Emergency exits and contact information are posted in all
                  common areas
                </li>
                <li>
                  Please respect other residents&apos; privacy and property
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Tabs
          defaultValue="guest"
          className="w-full"
          onValueChange={(value) =>
            setVisitorInfo({
              ...visitorInfo,
              type: value as VisitorInfo["type"],
            })
          }
        >
          <TabsList className="grid w-full grid-cols-4">
            {Object.entries(visitorTypes).map(
              ([type, { icon: Icon, color }]) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  className="flex items-center gap-2 capitalize"
                >
                  <Icon className={`h-4 w-4 ${color}`} />
                  {type.toWellFormed()}
                </TabsTrigger>
              )
            )}
          </TabsList>
          <TabsContent value="guest">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Welcome! Please fill out the form below for your visit.
            </p>
          </TabsContent>
          <TabsContent value="maintenance">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Maintenance personnel, please provide your work order details.
            </p>
          </TabsContent>
          <TabsContent value="delivery">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Delivery personnel, please specify the recipient and package
              details.
            </p>
          </TabsContent>
          <TabsContent value="tour">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Welcome! Please provide your tour reservation details.
            </p>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="dark:text-gray-200">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={visitorInfo.firstName}
                onChange={handleInputChange}
                className="dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="dark:text-gray-200">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={visitorInfo.lastName}
                onChange={handleInputChange}
                className="dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName[0]}</p>
              )}
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
                value={visitorInfo.idType}
                onChange={handleInputChange}
              >
                <option value="state_id">State ID </option>
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver&apos;s License</option>
                <option value="military_id">Military ID</option>
              </select>
              {errors.idType && (
                <p className="text-red-500 text-sm">{errors.idType[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber" className="dark:text-gray-200">
                ID Number
              </Label>
              <Input
                id="idNumber"
                name="idNumber"
                placeholder="Enter ID number"
                value={visitorInfo.idNumber}
                onChange={handleInputChange}
                className="dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.idNumber && (
                <p className="text-red-500 text-sm">{errors.idNumber[0]}</p>
              )}
            </div>
          </div>

          {visitorInfo.type === "GUEST" && (
            <>
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
                    value={visitorInfo.apartmentNumber}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-gray-200"
                  />
                  {errors.apartmentNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.apartmentNumber[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residentName" className="dark:text-gray-200">
                    <UserCheck className="h-4 w-4 inline mr-1" />
                    Resident Name
                  </Label>
                  <Input
                    id="residentName"
                    name="residentName"
                    placeholder="Enter resident name"
                    value={visitorInfo.residentName}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-gray-200"
                  />
                  {errors.residentName && (
                    <p className="text-red-500 text-sm">
                      {errors.residentName[0]}
                    </p>
                  )}
                  {residentSuggestions.length > 0 && (
                    <ul className="mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                      {residentSuggestions.map((resident, index) => (
                        <li
                          key={index}
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                          onClick={() => {
                            setVisitorInfo({
                              ...visitorInfo,
                              residentName: resident.tenantName,
                              apartmentNumber: resident.number,
                            });
                            setResidentSuggestions([]);
                          }}
                        >
                          {resident.tenantName} - Apt {resident.number}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}

          {visitorInfo.type === "MAINTENANCE" && (
            <div className="space-y-2">
              <Label htmlFor="workOrderNumber" className="dark:text-gray-200">
                Work Order Number
              </Label>
              <Input
                id="workOrderNumber"
                name="workOrderNumber"
                placeholder="Enter work order number"
                value={visitorInfo.workOrderNumber || ""}
                onChange={handleInputChange}
                className="dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.workOrderNumber && (
                <p className="text-red-500 text-sm">
                  {errors.workOrderNumber[0]}
                </p>
              )}
              <Button type="button" onClick={handleAppointmentVerification}>
                Verify Work Order
              </Button>
            </div>
          )}

          {visitorInfo.type === "DELIVERY" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="trackingNumber" className="dark:text-gray-200">
                  Tracking Number
                </Label>
                <Input
                  id="trackingNumber"
                  name="trackingNumber"
                  placeholder="Enter tracking number"
                  value={visitorInfo.trackingNumber || ""}
                  onChange={handleInputChange}
                  className="dark:bg-gray-700 dark:text-gray-200"
                />
                {errors.trackingNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.trackingNumber[0]}
                  </p>
                )}
                <Button type="button" onClick={handleAppointmentVerification}>
                  Verify Delivery
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="apartmentNumber" className="dark:text-gray-200">
                  <Building className="h-4 w-4 inline mr-1" />
                  Apartment Number
                </Label>
                <Input
                  id="apartmentNumber"
                  name="apartmentNumber"
                  placeholder="e.g., 4B"
                  value={visitorInfo.apartmentNumber}
                  onChange={handleInputChange}
                  className="dark:bg-gray-700 dark:text-gray-200"
                />
                {errors.apartmentNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.apartmentNumber[0]}
                  </p>
                )}
              </div>
            </>
          )}

          {visitorInfo.type === "TOUR" && (
            <div className="space-y-2">
              <Label htmlFor="appointmentId" className="dark:text-gray-200">
                Appointment ID
              </Label>
              <Input
                id="appointmentId"
                name="appointmentId"
                placeholder="Enter appointment ID"
                value={visitorInfo.appointmentId || ""}
                onChange={handleInputChange}
                className="dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.appointmentId && (
                <p className="text-red-500 text-sm">
                  {errors.appointmentId[0]}
                </p>
              )}
              <Button type="button" onClick={handleAppointmentVerification}>
                Verify Appointment
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-200">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="visitor@example.com"
                value={visitorInfo.email}
                onChange={handleInputChange}
                className="dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="dark:text-gray-200">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(123) 456-7890"
                value={visitorInfo.phone}
                onChange={handleInputChange}
                className="dark:bg-gray-700 dark:text-gray-200"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone[0]}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="luggage" className="dark:text-gray-200">
              Luggage
            </Label>
            {luggage.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Input
                  id={`luggage-${index}`}
                  value={item.description}
                  onChange={(e) =>
                    updateLuggageDescription(item.id, e.target.value)
                  }
                  placeholder="Luggage description"
                  className="dark:bg-gray-700 dark:text-gray-200"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeLuggage(item.id)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addLuggage}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Luggage
            </Button>
          </div>

          {appointmentInfo && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 dark:text-green-400">
                Appointment Verified
              </h3>
              <p className="text-sm text-green-600 dark:text-green-300">
                Type: {appointmentInfo?.type}
              </p>
              <p className="text-sm text-green-600 dark:text-green-300">
                Time:{" "}
                {new Date(appointmentInfo?.appointmentTime).toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-300">
                Duration: {appointmentInfo?.duration}
              </p>
              <p className="text-sm text-green-600 dark:text-green-300">
                Description: {appointmentInfo?.description}
              </p>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Please ensure all information is accurate. Your ID will be
                verified by security personnel. By submitting this form, you
                agree to comply with building policies and security procedures.
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            className="dark:text-gray-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Submit Check-in
          </Button>
        </div>
      </form>
    </div>
  );
};
