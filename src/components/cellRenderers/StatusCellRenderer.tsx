import React from "react";
import type { ICellRendererParams } from "ag-grid-community";
import type { EmployeeStatus } from "../../data/employeeData";

// Custom cell renderer for employee status display in the status column in employee table.
interface StatusCellRendererProps extends ICellRendererParams {
	value: EmployeeStatus;
}

export const StatusCellRenderer: React.FC<StatusCellRendererProps> = ({ value }) => {
	// Function to get the configuration for the status icon based on the employee status.
	const getStatusConfig = (status: EmployeeStatus) => {
		switch (status) {
			case "active":
				return {
					className: "bg-green-100 text-green-800 border-green-200",
					icon: "●",
					text: "Active",
				};
			case "inactive":
				return {
					className: "bg-red-100 text-red-800 border-red-200",
					icon: "●",
					text: "Inactive",
				};
			case "onLeave":
				return {
					className: "bg-yellow-100 text-yellow-800 border-yellow-200",
					icon: "●",
					text: "On Leave",
				};
			case "probation":
				return {
					className: "bg-orange-100 text-orange-800 border-orange-200",
					icon: "●",
					text: "Probation",
				};
			default:
				return {
					className: "bg-gray-100 text-gray-800 border-gray-200",
					icon: "●",
					text: "Unknown",
				};
		}
	};

	const config = getStatusConfig(value);

	return (
		<div className="flex items-center h-full">
			<span
				className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
			>
				<span className="mr-1 text-xs">{config.icon}</span>
				{config.text}
			</span>
		</div>
	);
};
