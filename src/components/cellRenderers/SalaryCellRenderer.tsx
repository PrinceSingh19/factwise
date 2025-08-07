import React from "react";
import type { ICellRendererParams } from "ag-grid-community";

// Custom cell renderer for salary display in the salary column in employee table.

interface SalaryCellRendererProps extends ICellRendererParams {
	value: number;
}

export const SalaryCellRenderer: React.FC<SalaryCellRendererProps> = ({ value }) => {
	// Formats salary to USD with 0 decimal places
	const formatSalary = (salary: number): string => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(salary);
	};
	// Returns salary range based on salary value
	const getSalaryRange = (salary: number): "entry" | "mid" | "senior" | "executive" => {
		if (salary >= 150000) return "executive";
		if (salary >= 100000) return "senior";
		if (salary >= 70000) return "mid";
		return "entry";
	};
	// Returns CSS class for salary range
	const getSalaryStyle = (range: string): string => {
		switch (range) {
			case "executive":
				return "text-purple-700 font-semibold";
			case "senior":
				return "text-blue-700 font-medium";
			case "mid":
				return "text-green-700 font-medium";
			case "entry":
				return "text-gray-700";
			default:
				return "text-gray-700";
		}
	};

	/**
	 * Returns salary range indicator
	 */
	const getSalaryIndicator = (range: string): string => {
		switch (range) {
			case "executive":
				return "💎";
			case "senior":
				return "🔷";
			case "mid":
				return "🔹";
			case "entry":
				return "⚪";
			default:
				return "";
		}
	};

	const salaryRange = getSalaryRange(value);
	const formattedSalary = formatSalary(value);
	const salaryStyle = getSalaryStyle(salaryRange);
	const indicator = getSalaryIndicator(salaryRange);

	return (
		<div className="flex items-center h-full space-x-2">
			{/* Salary indicator */}
			<span className="text-sm" title={`${salaryRange} level`}>
				{indicator}
			</span>

			{/* Formatted salary */}
			<span className={`text-sm ${salaryStyle}`}>{formattedSalary}</span>

			{/* Range label (hidden on small screens) */}
			<span className="text-xs text-gray-500 capitalize hidden xl:inline">({salaryRange})</span>
		</div>
	);
};
