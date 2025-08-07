import React from "react";
import type { ICellRendererParams } from "ag-grid-community";
import type { Employee } from "../../data/employeeData";

//Custom cell renderer for employee name and basic info in AG Grid table for employee information

interface EmployeeCellRendererProps extends ICellRendererParams {
	data: Employee;
}

export const EmployeeCellRenderer: React.FC<EmployeeCellRendererProps> = ({ data }) => {
	if (!data) return null;

	// Helper function to generate initials from first and last name
	const getInitials = (firstName: string, lastName: string): string => {
		return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
	};

	// Helper function to generate avatar color based on full name
	const getAvatarColor = (name: string): string => {
		const colors = [
			"bg-blue-500",
			"bg-green-500",
			"bg-purple-500",
			"bg-pink-500",
			"bg-indigo-500",
			"bg-yellow-500",
			"bg-red-500",
			"bg-teal-500",
		];

		// Simple hash function to get consistent color
		let hash = 0;
		for (let i = 0; i < name.length; i++) {
			hash = name.charCodeAt(i) + ((hash << 5) - hash);
		}

		return colors[Math.abs(hash) % colors.length];
	};

	const fullName = `${data.firstName} ${data.lastName}`;
	const initials = getInitials(data.firstName, data.lastName);
	const avatarColor = getAvatarColor(fullName);

	return (
		<div className="flex items-center h-full space-x-3">
			{/* Avatar */}
			<div
				className={`flex-shrink-0 w-8 h-8 ${avatarColor} rounded-full flex items-center justify-center`}
			>
				<span className="text-white text-xs font-medium">{initials}</span>
			</div>

			{/* Employee Info */}
			<div className="flex-1 min-w-0">
				<div className="text-sm font-medium text-gray-900 truncate">{fullName}</div>

				{/* Position and Department */}
				<div className="text-xs text-gray-500 truncate">
					{data.position} • {data.department}
				</div>
			</div>

			{/* Status Indicator */}
			<div className="flex-shrink-0">
				{data.isActive ? (
					<div className="w-2 h-2 bg-green-400 rounded-full" title="Active Employee" />
				) : (
					<div className="w-2 h-2 bg-red-400 rounded-full" title="Inactive Employee" />
				)}
			</div>
		</div>
	);
};
