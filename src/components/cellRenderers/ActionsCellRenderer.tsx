import React from "react";
import type { ICellRendererParams } from "ag-grid-community";
import { Eye, Edit, Mail, UserCheck } from "lucide-react";
import type { Employee } from "../../data/employeeData";

//Custom cell renderer for action buttons for the employee table.

interface ActionsCellRendererProps extends ICellRendererParams {
	data: Employee;
}

export const ActionsCellRenderer: React.FC<ActionsCellRendererProps> = ({ data }) => {
	// hanlde view employee action
	const handleViewDetails = () => {
		console.log("View details for employee:", data);
		// In a real application, this would open a modal or navigate to a detail page
		alert(`View details for ${data.firstName} ${data.lastName}`);
	};

	// handle edit employee action
	const handleEditEmployee = () => {
		console.log("Edit employee:", data);
		// In a real application, this would open an edit form
		alert(`Edit ${data.firstName} ${data.lastName}`);
	};

	// handle send email action
	const handleSendEmail = () => {
		console.log("Send email to:", data.email);
		// In a real application, this would open email client or modal
		window.open(`mailto:${data.email}`, "_blank");
	};

	// handle performance review action
	const handlePerformanceReview = () => {
		console.log("Performance review for:", data);
		alert(`Start performance review for ${data.firstName} ${data.lastName}`);
	};

	return (
		<div className="flex items-center h-full space-x-1">
			{/* View Details Button */}
			<button
				onClick={handleViewDetails}
				className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
				title="View Details"
			>
				<Eye size={16} />
			</button>

			{/* Edit Employee Button */}
			<button
				onClick={handleEditEmployee}
				className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
				title="Edit Employee"
			>
				<Edit size={16} />
			</button>

			{/* Send Email Button */}
			<button
				onClick={handleSendEmail}
				className="p-1.5 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors"
				title="Send Email"
			>
				<Mail size={16} />
			</button>

			{/* Performance Review Button */}
			<button
				onClick={handlePerformanceReview}
				className="p-1.5 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-md transition-colors"
				title="Performance Review"
			>
				<UserCheck size={16} />
			</button>
		</div>
	);
};
