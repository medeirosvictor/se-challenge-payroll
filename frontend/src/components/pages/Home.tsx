import { Link } from "react-router";
import CSVUploadForm from "../CSVUploadForm";

function Home() {
  return (
    <>
      <CSVUploadForm />
      <Link
        to="/payroll-reports"
        className="w-70 p-3 font-bold text-white bg-[#14cc14e5] border-none cursor-pointer hover:bg-[#00cc00] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
      >
        Generate Payroll Report
      </Link>
    </>
  );
}

export default Home;
