import React from "react";
import type { ICellRendererParams } from "ag-grid-community";

// Cell renderer for displaying performance rating in the performance column in employee table.
interface PerformanceCellRendererProps extends ICellRendererParams {
	value: number;
}

export const PerformanceCellRenderer: React.FC<PerformanceCellRendererProps> = ({ value }) => {
	//function to generate star rating display based on numeric rating
	const renderStars = (rating: number) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;

		// Full stars
		for (let i = 0; i < fullStars; i++) {
			stars.push(
				<span key={`full-${i}`} className="text-yellow-400">
					★
				</span>
			);
		}

		// Half star
		if (hasHalfStar) {
			stars.push(
				<span key="half" className="text-yellow-400">
					☆
				</span>
			);
		}

		// Empty stars
		const remainingStars = 5 - Math.ceil(rating);
		for (let i = 0; i < remainingStars; i++) {
			stars.push(
				<span key={`empty-${i}`} className="text-gray-300">
					☆
				</span>
			);
		}

		return stars;
	};

	//function to get color based on numeric rating
	const getRatingColor = (rating: number): string => {
		if (rating >= 4.5) return "text-green-600";
		if (rating >= 4.0) return "text-blue-600";
		if (rating >= 3.5) return "text-yellow-600";
		return "text-red-600";
	};

	//function to get performance level based on numeric rating
	const getPerformanceLevel = (rating: number): string => {
		if (rating >= 4.5) return "Excellent";
		if (rating >= 4.0) return "Good";
		if (rating >= 3.5) return "Average";
		return "Needs Improvement";
	};

	return (
		<div className="flex items-center h-full space-x-2">
			{/* Star rating */}
			<div className="flex items-center text-sm">{renderStars(value)}</div>

			{/* Numeric rating */}
			<span className={`text-sm font-medium ${getRatingColor(value)}`}>{value.toFixed(1)}</span>

			{/* Performance level badge */}
			<span className="text-xs text-gray-500 hidden lg:inline">({getPerformanceLevel(value)})</span>
		</div>
	);
};
