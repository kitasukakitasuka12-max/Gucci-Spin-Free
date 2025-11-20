export interface Segment {
  label: string;
  color: string;
  value: string; // The text sent to WA
  textColor: string;
}

// REPLACE THIS WITH YOUR ACTUAL WHATSAPP NUMBER (International format without +)
export const WA_NUMBER = "6281234567890"; 

export const WHEEL_SEGMENTS: Segment[] = [
  { label: "Rp10.000", color: "#ef4444", value: "Rp 10.000", textColor: "#ffffff" }, // Red
  { label: "Rp20.000", color: "#f97316", value: "Rp 20.000", textColor: "#ffffff" }, // Orange
  { label: "Rp50.000", color: "#eab308", value: "Rp 50.000", textColor: "#ffffff" }, // Yellow
  { label: "Rp75.000", color: "#84cc16", value: "Rp 75.000", textColor: "#ffffff" }, // Lime
  { label: "Rp100.000", color: "#22c55e", value: "Rp 100.000", textColor: "#ffffff" }, // Green
  { label: "Rp150.000", color: "#3b82f6", value: "Rp 150.000", textColor: "#ffffff" }, // Blue
  { label: "Rp200.000", color: "#a855f7", value: "Rp 200.000", textColor: "#ffffff" }, // Purple
  { label: "ZONK", color: "#64748b", value: "Hadiah Hiburan", textColor: "#ffffff" }, // Slate
];

export const STORAGE_KEY = "gucci_lucky_spin_status_v1";
