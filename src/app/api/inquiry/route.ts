import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface InquiryData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  propertyName: string;
  projectType: string;
  eventDate: string;
  guestCount?: string;
  budget?: string;
  vision: string;
  referralSource?: string;
  newsletter?: boolean;
  submittedAt?: string;
}

// Path to store inquiries (can be moved to cloud storage later)
const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

function ensureDataDir() {
  const dataDir = path.dirname(INQUIRIES_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadInquiries(): InquiryData[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      return JSON.parse(fs.readFileSync(INQUIRIES_FILE, "utf-8"));
    }
  } catch (error) {
    console.error("Error loading inquiries:", error);
  }
  return [];
}

function saveInquiry(inquiry: InquiryData): void {
  ensureDataDir();
  const inquiries = loadInquiries();
  inquiries.unshift(inquiry); // Add to beginning
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body: InquiryData = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "propertyName",
      "projectType",
      "eventDate",
      "vision",
    ];

    const missingFields = requiredFields.filter((field) => !body[field as keyof InquiryData]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Add timestamp
    const inquiry: InquiryData = {
      ...body,
      submittedAt: new Date().toISOString(),
    };

    // Save inquiry
    saveInquiry(inquiry);

    console.log("New inquiry saved:", inquiry.email);

    // TODO: Send confirmation email to client
    // TODO: Send notification to DMS team

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully",
    });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return sample structure for reference
  return NextResponse.json({
    message: "DMS Inquiry API",
    version: "1.0.0",
    methods: ["POST"],
    note: "Inquiries are stored locally in data/inquiries.json",
    fields: {
      required: ["firstName", "lastName", "email", "propertyName", "projectType", "eventDate", "vision"],
      optional: ["phone", "preferredContact", "guestCount", "budget", "referralSource", "newsletter"],
    },
  });
}
