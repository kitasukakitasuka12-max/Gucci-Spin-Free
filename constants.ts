export interface Segment {
  label: string;
  color: string;
  value: string; // The text sent to WA
  textColor: string;
  isZonk?: boolean;
}

// GANTI NOMOR WA DI SINI (Format internasional tanpa +)
// Contoh: 6281234567890
export const WA_NUMBER = "6281325620735"; 

// Gucci Colors: 
// Dark Green: #115740
// Red: #db1f26
// Gold: #c5a059
// Black/Dark Grey: #1f2937

export const WHEEL_SEGMENTS: Segment[] = [
  { label: "IPHONE 15", color: "#c5a059", value: "iPhone 15 Pro Max", textColor: "#ffffff" }, // Gold
  { label: "Rp 50.000", color: "#115740", value: "Uang Tunai Rp 50.000", textColor: "#ffffff" }, // Green
  { label: "ZONK", color: "#374151", value: "ZONK (Coba Lagi)", textColor: "#ffffff", isZonk: true }, // Dark Grey
  { label: "Rp 100.000", color: "#db1f26", value: "Uang Tunai Rp 100.000", textColor: "#ffffff" }, // Red
  { label: "EMAS 1g", color: "#c5a059", value: "Logam Mulia 1 Gram", textColor: "#ffffff" }, // Gold
  { label: "Rp 20.000", color: "#115740", value: "Uang Tunai Rp 20.000", textColor: "#ffffff" }, // Green
  { label: "ZONK", color: "#374151", value: "ZONK (Coba Lagi)", textColor: "#ffffff", isZonk: true }, // Dark Grey
  { label: "Rp 2 JUTA", color: "#db1f26", value: "Jackpot Rp 2.000.000", textColor: "#ffffff" }, // Red
];

export const STORAGE_KEY = "gucci_event_spin_v2";
