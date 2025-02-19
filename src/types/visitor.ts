export enum IdType {
    PASSPORT = "PASSPORT",
    DRIVING_LICENSE = "DRIVING_LICENSE",
    NATIONAL_ID = "NATIONAL_ID",
    OTHER = "OTHER",
  }
  
  export enum VisitorType {
    GUEST = "GUEST",
    MAINTENANCE = "MAINTENANCE",
    DELIVERY = "DELIVERY",
    TOUR = "TOUR",
  }
  
  export type BaseLuggage = {
    id: string
    description: string
    checkedOut: boolean
  }
  
  export type BaseVisitor = {
    id: string
    firstName: string
    lastName: string
    idType: IdType
    idNumber: string
    email: string
    phone: string
    checkInTime: string
    checkOutTime: string | null
    luggage?: BaseLuggage[]
  }
  
  export type GuestVisitor = BaseVisitor & {
    type: VisitorType.GUEST
    apartmentNumber: string
    residentName: string
  }
  
  export type MaintenanceVisitor = BaseVisitor & {
    type: VisitorType.MAINTENANCE
    workOrderNumber: string
    description: string
  }
  
  export type DeliveryVisitor = BaseVisitor & {
    type: VisitorType.DELIVERY
    trackingNumber: string
    apartmentNumber: string
  }
  
  export type TourVisitor = BaseVisitor & {
    type: VisitorType.TOUR
    appointmentId: string
  }
  
  export type VisitorInfo = GuestVisitor | MaintenanceVisitor | DeliveryVisitor | TourVisitor
  
    // export const visitors: VisitorInfo[] = [
    //     {
    //     id: "V001",
    //     type: VisitorType.GUEST,
    //     firstName: "John",
    //     lastName: "Doe",
    //     idType: IdType.PASSPORT,
    //     idNumber: "P123456789",
    //     email: "aHt9F@example.com",
    //     phone: "123-456-7890",
    //     checkInTime: "2023-08-01T10:00:00Z",
    //     checkOutTime: "2023-08-01T12:00:00Z",
    //     luggage: [
    //         {
    //         id: "L1",
    //         description: "Black suitcase",
    //         checkedOut: true,
    //         },
    //         {
    //         id: "L2",
    //         description: "Laptop bag",
    //         checkedOut: true,
    //         },
    //     ],
    //     },
    //     {
    //     id: "V002",
    //     type: VisitorType.MAINTENANCE,
    //     firstName: "Jane",
    //     lastName: "Smith",
    //     idType: IdType.DRIVING_LICENSE,
    //     ]  