import { generatePayrollReport } from "../../api/api";
import { useLoaderData } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  console.log(">>> LOADER STARTED");
  try {
    const data = await generatePayrollReport();
    console.log(data.payrollReport);
    return data;
  } catch (error) {
    console.error(">>> LOADER ERROR:", error);
    throw error;
  }
}
clientLoader.hydrate = true;

export function HydrateFallback() {
  return (
    <div className="bg-black p-1 w-150 h-100">
      <div className="border-2 border-[#00ff00] bg-[#0a0a0a] p-4 font-mono">
        <div className="text-[#00ff00] text-xl font-bold">
          WAVE_PAYROLL_SYSTEM_VICTOR_MEDEIROS_2025
        </div>
        <div className="w-full h-px bg-[#00ff00] my-4 opacity-50"></div>
        <div className="text-[#00ff00] animate-pulse">
          &gt; GENERATING PAYROLL REPORT_
        </div>
        <div className="text-[#00ff00] opacity-50 text-sm mt-2">
          &gt; CALCULATING EMPLOYEE PAYMENTS...
        </div>
      </div>
    </div>
  );
}

export default function PayrollReports() {
  const loaderData = useLoaderData();
  if (!loaderData) {
    return <HydrateFallback />;
  }

  const { payrollReport } = loaderData;

  return (
    <div className="bg-black p-1">
      <div className="p-4 font-mono w-full h-full uppercase">
        <div className="text-[#00ff00] text-lg font-bold mb-4">
          PAYROLL REPORT
        </div>

        {/* Employee Reports Table */}
        {payrollReport?.employeeReports?.length > 0 ? (
          <table className="w-full text-[#00ff00] text-sm border border-[#00ff00] font-bold">
            <thead>
              <tr className="border-b border-[#00ff00]">
                <th className=" p-2 border border-[#00ff00] text-center">
                  Employee
                </th>
                <th className=" p-2 border border-[#00ff00] text-center">
                  Period
                </th>
                <th className="text-right p-2 border border-[#00ff00]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {payrollReport.employeeReports.map((report, index) => (
                <tr key={index} className="border-b border-[#00ff00]">
                  <td className="p-2 border border-[#00ff00]">
                    {report.employeeId}
                  </td>
                  <td className="p-2 border border-[#00ff00]">
                    {report.payPeriod.startDate} - {report.payPeriod.endDate}
                  </td>
                  <td className="p-2 text-right border border-[#00ff00]">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    }).format(report.amountPaid)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-[#00ff00] opacity-50">
            &gt; NO PAYROLL DATA AVAILABLE
          </div>
        )}

        <div className="text-[#00ff00] animate-pulse mt-4">_</div>
      </div>
    </div>
  );
}
