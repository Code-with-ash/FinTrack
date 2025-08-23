"use client"
import { ResponsivePie } from '@nivo/pie'

const sampleData = [
    {
    id: "Rent",
    label: "Rent",
    value: 1200,
    color: "hsl(210, 70%, 50%)"
  },
  {
    id: "Groceries",
    label: "Groceries",
    value: 450,
    color: "hsl(120, 70%, 50%)"
  },
  {
    id: "Transportation",
    label: "Transportation",
    value: 300,
    color: "hsl(45, 70%, 50%)"
  },
  {
    id: "Entertainment",
    label: "Entertainment",
    value: 200,
    color: "hsl(300, 70%, 50%)"
  },
  {
    id: "Savings",
    label: "Savings",
    value: 850,
    color: "hsl(15, 70%, 50%)"
  }
]

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
  arcLinkLabelsColor={{ from: 'color' }}
  arcLabelsSkipAngle={10}
  arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
  tooltip={({ datum }) => (
    <div
      style={{
        padding: '6px 12px',
        background: '#fff',
        color: 'black', // <-- change this to your desired text color
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      <strong>{datum.id}</strong>: {datum.value}
    </div>
  )}
/>

)

export default MyPie
