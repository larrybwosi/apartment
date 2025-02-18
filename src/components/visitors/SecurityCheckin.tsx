"use client";

import type React from "react";
import { useState } from "react";
import type { VisitorInfo } from "@/types/visitors";
import { CheckInForm } from "./CheckInForm";
import { VisitorList } from "./VisitorList";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { checkOutVisitor, handleLuggage, invalidateAppointment } from "@/app/actions/visitors";

const SecurityCheckIn: React.FC = () => {
  const [visitors, setVisitors] = useState<VisitorInfo[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkoutDialog, setCheckoutDialog] = useState<{
    open: boolean;
    visitor: VisitorInfo | null;
  }>({
    open: false,
    visitor: null,
  });

  const handleCheckIn = (visitorInfo: VisitorInfo) => {
    setVisitors([...visitors, visitorInfo]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCheckOut = async (visitorId: string) => {
    const visitor = visitors.find((v) => v.id === visitorId);
    if (visitor) {
      setCheckoutDialog({ open: true, visitor });
    }
  };

  const confirmCheckOut = async () => {
    if (checkoutDialog.visitor) {
      const result = await checkOutVisitor(checkoutDialog.visitor.id);
      if (result.success) {
        // Handle luggage check-out
        if (checkoutDialog.visitor.luggage) {
          for (const item of checkoutDialog.visitor.luggage) {
            await handleLuggage(checkoutDialog.visitor.id, item.id, true);
          }
        }

        // Invalidate appointment if necessary
        if (checkoutDialog.visitor.type !== "GUEST") {
          await invalidateAppointment(checkoutDialog.visitor.id);
        }

        setVisitors(
          visitors.filter((v) => v.id !== checkoutDialog.visitor!.id)
        );
      }
      setCheckoutDialog({ open: false, visitor: null });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 p-8">
      <Card className="max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader className="space-y-1 bg-blue-500 text-white dark:bg-blue-800 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <CardTitle className="text-3xl font-bold">
                Visitor Security Check-in
              </CardTitle>
            </div>
          </div>
          <CardDescription className="text-blue-100 dark:text-blue-200">
            Welcome to our secure visitor management system. For the safety of
            our residents, all visitors must complete this registration process.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="check-in" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="check-in">Check-in</TabsTrigger>
              <TabsTrigger value="active-visitors">Active Visitors</TabsTrigger>
            </TabsList>
            <TabsContent value="check-in">
              <div className="max-w-5xl">
                <div>
                  <CheckInForm onCheckIn={handleCheckIn} />
                  {showSuccess && (
                    <Alert className="mt-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <AlertDescription className="text-green-600 dark:text-green-400">
                        Check-in successful! Please wait for security personnel
                        to verify your information.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="active-visitors">
              <VisitorList visitors={visitors} onCheckOut={handleCheckOut} />
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
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

      <Dialog
        open={checkoutDialog.open}
        onOpenChange={(open) => setCheckoutDialog({ ...checkoutDialog, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Check-out</DialogTitle>
            <DialogDescription>
              Are you sure you want to check out this visitor?
            </DialogDescription>
          </DialogHeader>
          {checkoutDialog.visitor && (
            <div>
              <p>
                <strong>Name:</strong> {checkoutDialog.visitor.firstName}{" "}
                {checkoutDialog.visitor.lastName}
              </p>
              <p>
                <strong>Type:</strong> {checkoutDialog.visitor.type}
              </p>
              {checkoutDialog.visitor.luggage &&
                checkoutDialog.visitor.luggage.length > 0 && (
                  <div>
                    <p>
                      <strong>Luggage:</strong>
                    </p>
                    <ul>
                      {checkoutDialog.visitor.luggage.map((item, index) => (
                        <li key={index}>{item.description}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCheckoutDialog({ open: false, visitor: null })}
            >
              Cancel
            </Button>
            <Button onClick={confirmCheckOut}>Confirm Check-out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityCheckIn;
