import { useState } from "react";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/useAuthStore";
import { SiHey } from "react-icons/si";

export default function Dashboard() {
  const { user } = useAuthStore();
  const [tableData, setTableData] = useState([
    {
      id: 21,
      user: {
        name: "Arun",
        phone_number: "9876543210",
      },
      order: {
        id: "ORD001",
        amount: 1200,
      },
    },
    {
      id: 22,
      user: {
        name: "Balu",
        phone_number: "9886543789",
      },
      order: {
        id: "ORD002",
        amount: 1399,
      },
    },
  ]);
  const [tableMeta, setTableMeta] = useState({
    columns: {
      user__name: "Name",
      user__phone_number: "Phone Number",
      order__amount: "Order Amount",
      order__id: "Order ID",
    },
    status_code: 200,
  });
  const getValueByPath = (obj, path) => {
    return path.split("__").reduce((acc, key) => acc?.[key], obj);
  };

  return (
    <section className="w-screen ">
      <Navbar />
      <main className="m-4">
        <h1 className="text-2xl font-bold flex">
          Hi {user?.username} <SiHey className="hover:text-yellow-300" />,
        </h1>
        <div>
          <h2>Here is your table</h2>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {Object.entries(tableMeta.columns).map(([key, label]) => (
                  <th key={key} className="border px-4 py-2 text-left">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  {Object.keys(tableMeta.columns).map((colKey) => (
                    <td key={colKey} className="border px-4 py-2">
                      {getValueByPath(row, colKey)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
}
