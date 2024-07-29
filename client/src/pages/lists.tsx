import { DataTableDemo } from "../components/data-table";
import Filterbar from "../components/filterbar";

export default function Lists() {
  return (
    <div className="p-3 w-full px-2 overflow-hidden">
      <p className="text-lg">Lists</p>
      <Filterbar />
      <DataTableDemo />
    </div>
  );
}
