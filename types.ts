export enum VehicleType {
  ETAN = 'อีแต๋น',
  SIX_WHEEL = 'หกล้อ',
  TEN_WHEEL = 'สิบล้อ',
  FULL_TRAILER = 'รถพ่วง',
  SEMI_TRAILER = 'รถเทเลอร์',
  OTHER = 'อื่นๆ'
}

export enum CheckStatus {
  PASS = 'pass',
  FAIL = 'fail'
}

export interface CheckItemResult {
  id: string; // Changed to string to support "1.1", "1.2"
  status: CheckStatus | null;
  remark: string;
}

export interface InspectionRecord {
  id: string;
  docNumber: string; // AC-FM-1100-006/r.01
  timestamp: number;
  dateStr: string;
  
  // Header Info
  vehicleType: VehicleType;
  vehicleTypeOther?: string;
  licensePlate: string;
  ownerName: string;
  quotaNumber: string;
  zone: string; // เขต

  // Checklist
  checkResults: CheckItemResult[];
  
  // Footer / Signatures
  overallPassed: boolean;
  finalRemarks: string; // Items to improve or notes
  reInspectDate?: string; // New field for re-inspection date
  
  inspectorName: string; // พนักงานผู้ตรวจสอบ
  driverName: string; // เจ้าของรถบรรทุก
  auditorName: string; // ผู้ตรวจสอบ (หัวหน้าเขต)
  approverName: string; // ผู้อนุมัติ (วิศวกร)

  // New Scan Feature
  scannedImages?: string[]; // Array of Base64 strings for multiple pages
}