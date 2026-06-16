"use client";
import { ResponsivePie } from "@nivo/pie";

const sampleData = [
  { id: "Rent", label: "Rent", value: 1200, color: "#2563eb" },
  { id: "Groceries", label: "Groceries", value: 450, color: "#3b82f6" },
  { id: "Transportation", label: "Transportation", value: 300, color: "#60a5fa" },
  { id: "Entertainment", label: "Entertainment", value: 200, color: "#93c5fd" },
  { id: "Savings", label: "Savings", value: 850, color: "#1d4ed8" },
];

const MyPie = ({ data = sampleData }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.6}
    cornerRadius={2}
    activeOuterRadiusOffset={8}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    tooltip={({ datum }) => (
      <div
        style={{
          padding: "6px 12px",
          background: "#fff",
          color: "#1e293b",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          fontSize: "13px",
        }}
      >
        <strong>{datum.id}</strong>: ${datum.value}
      </div>
    )}
  />
);

export default MyPie;
