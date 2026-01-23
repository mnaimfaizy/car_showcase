import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Car Showcase - Premium Car Rental Platform";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #2B59FF 0%, #1E40AF 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "white",
            margin: 0,
            marginBottom: 20,
            textShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          🚗 Car Showcase
        </h1>
        <p
          style={{
            fontSize: 40,
            color: "rgba(255, 255, 255, 0.95)",
            margin: 0,
            marginBottom: 30,
            maxWidth: 900,
          }}
        >
          Discover Premium Cars for Rent
        </p>
        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            ✓ 69+ Vehicles
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            ✓ 20+ Brands
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            ✓ Advanced Filters
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
