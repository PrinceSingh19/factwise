import React, { useState } from "react";
import type { ICellRendererParams } from "ag-grid-community";
// Custom cell renderer for skills display in the skills column in employee table.
interface SkillsCellRendererProps extends ICellRendererParams {
	value: string[];
}

export const SkillsCellRenderer: React.FC<SkillsCellRendererProps> = ({ value }) => {
	const [showAll, setShowAll] = useState(false);

	// Handle case where value might be undefined or not an array
	if (!value || !Array.isArray(value)) {
		return <div className="flex items-center h-full text-gray-400">No skills listed</div>;
	}

	const skills = value;
	const maxVisibleSkills = 2; // Number of skills to show initially
	const hasMoreSkills = skills.length > maxVisibleSkills;
	const visibleSkills = showAll ? skills : skills.slice(0, maxVisibleSkills);
	const remainingCount = skills.length - maxVisibleSkills;

	// Function to get color for each skill based on index
	const getSkillColor = (index: number): string => {
		const colors = [
			"bg-blue-100 text-blue-800 border-blue-200",
			"bg-green-100 text-green-800 border-green-200",
			"bg-purple-100 text-purple-800 border-purple-200",
			"bg-pink-100 text-pink-800 border-pink-200",
			"bg-indigo-100 text-indigo-800 border-indigo-200",
			"bg-yellow-100 text-yellow-800 border-yellow-200",
		];
		return colors[index % colors.length];
	};

	return (
		<div className="flex items-center h-full">
			<div className="flex flex-wrap items-center gap-1">
				{/* Render visible skills */}
				{visibleSkills.map((skill, index) => (
					<span
						key={skill}
						className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getSkillColor(
							index
						)}`}
						title={skill}
					>
						{skill}
					</span>
				))}

				{/* Show more/less button */}
				{hasMoreSkills && !showAll && (
					<button
						onClick={() => setShowAll(true)}
						className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors"
						title={`Show ${remainingCount} more skills`}
					>
						+{remainingCount}
					</button>
				)}

				{/* Show less button */}
				{showAll && hasMoreSkills && (
					<button
						onClick={() => setShowAll(false)}
						className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors"
						title="Show less"
					>
						Show less
					</button>
				)}
			</div>
		</div>
	);
};
