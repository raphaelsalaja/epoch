import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #888888 0%, #434343 100%)",
        borderRadius: "100%",
        padding: "4px",
      }}
    />,
    {
      ...size,
    },
  );
}
