import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridReadyEvent, GridApi, CellStyle } from "ag-grid-community";
import { Search, Download, Filter, Users, TrendingUp, DollarSign, Award } from "lucide-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
	employeeData,
	getEmployeesWithComputedFields,
	getDepartmentStats,
} from "../data/employeeData";
import {
	StatusCellRenderer,
	PerformanceCellRenderer,
	SkillsCellRenderer,
	SalaryCellRenderer,
	ActionsCellRenderer,
	EmployeeCellRenderer,
} from "./cellRenderers";

//Main Employee Dashboard Component which provides the view of employee data with filtering, searching, and analytics
export const EmployeeDashboard: React.FC = () => {
	const gridRef = useRef<AgGridReact>(null);
	const [gridApi, setGridApi] = useState<GridApi | null>(null);

	const [quickFilterText, setQuickFilterText] = useState<string>("");
	const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
	const [isGridReady, setIsGridReady] = useState<boolean>(false);

	// Processing employee data with computed fields
	const processedEmployees = useMemo(() => {
		return getEmployeesWithComputedFields(employeeData);
	}, []);

	// Calculate dashboard statistics
	const dashboardStats = useMemo(() => {
		const stats = getDepartmentStats(employeeData);
		const totalEmployees = employeeData.length;
		const activeEmployees = employeeData.filter((emp) => emp.isActive).length;
		const averageSalary = Math.round(
			employeeData.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees
		);
		const averagePerformance =
			Math.round(
				(employeeData.reduce((sum, emp) => sum + emp.performanceRating, 0) / totalEmployees) * 10
			) / 10;

		return {
			totalEmployees,
			activeEmployees,
			averageSalary,
			averagePerformance,
			departmentStats: stats,
		};
	}, []);

	// Column definitions for AG Grid
	const columnDefs: ColDef[] = useMemo(
		() => [
			{
				field: "employee",
				headerName: "Employee",
				cellRenderer: EmployeeCellRenderer,
				minWidth: 250,
				flex: 1,
				pinned: "left",
				sortable: true,
				filter: true,
			},
			{
				field: "department",
				headerName: "Department",
				minWidth: 130,
				sortable: true,
				filter: true,
				cellStyle: { fontWeight: "500" } as CellStyle,
			},
			{
				field: "position",
				headerName: "Position",
				minWidth: 180,
				flex: 1,
				sortable: true,
				filter: true,
			},
			{
				field: "location",
				headerName: "Location",
				minWidth: 120,
				sortable: true,
				filter: true,
			},
			{
				field: "performanceRating",
				headerName: "Performance",
				cellRenderer: PerformanceCellRenderer,
				minWidth: 180,
				sortable: true,
				filter: "agNumberColumnFilter",
			},
			{
				field: "salary",
				headerName: "Salary",
				cellRenderer: SalaryCellRenderer,
				minWidth: 200,
				sortable: true,
				filter: "agNumberColumnFilter",
			},
			{
				field: "skills",
				headerName: "Skills",
				cellRenderer: SkillsCellRenderer,
				minWidth: 300,
				flex: 1,
				sortable: false,
				filter: false,
			},
			{
				field: "status",
				headerName: "Status",
				cellRenderer: StatusCellRenderer,
				minWidth: 120,
				sortable: true,
				filter: true,
			},
			{
				field: "tenure",
				headerName: "Tenure (Years)",
				minWidth: 130,
				sortable: true,
				filter: "agNumberColumnFilter",
				cellStyle: { textAlign: "center" } as CellStyle,
			},
			{
				field: "projectsCompleted",
				headerName: "Projects",
				minWidth: 100,
				sortable: true,
				filter: "agNumberColumnFilter",
				cellStyle: { textAlign: "center" } as CellStyle,
			},
			{
				field: "actions",
				headerName: "Actions",
				cellRenderer: ActionsCellRenderer,
				minWidth: 160,
				sortable: false,
				filter: false,
				pinned: "right",
			},
		],
		[]
	);

	// Default column configuration
	const defaultColDef = useMemo(
		() => ({
			resizable: true,
			sortable: true,
			filter: true,
		}),
		[]
	);

	// Grid ready event handler
	const onGridReady = useCallback((params: GridReadyEvent) => {
		setGridApi(params.api);
		setIsGridReady(true);

		// Auto-size columns to fit content
		setTimeout(() => {
			params.api.sizeColumnsToFit();
		}, 100);
	}, []);

	// Handle window resize to adjust grid
	useEffect(() => {
		const handleResize = () => {
			if (gridApi) {
				setTimeout(() => {
					gridApi.sizeColumnsToFit();
				}, 100);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [gridApi]);

	// Suppress ResizeObserver errors
	useEffect(() => {
		const originalError = console.error;
		console.error = (...args) => {
			if (typeof args[0] === "string" && args[0].includes("ResizeObserver loop limit exceeded")) {
				// Suppress ResizeObserver errors
				return;
			}
			originalError.apply(console, args);
		};

		return () => {
			console.error = originalError;
		};
	}, []);

	// Quick filter handler
	const onQuickFilterChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuickFilterText(value);
	}, []);

	// Department filter handler
	const onDepartmentFilterChanged = useCallback(
		(department: string) => {
			setSelectedDepartment(department);
			if (gridApi) {
				if (department === "all") {
					gridApi.setFilterModel(null);
				} else {
					gridApi.setFilterModel({
						department: {
							type: "equals",
							filter: department,
						},
					});
				}
			}
		},
		[gridApi]
	);

	// Export to CSV
	const exportToCsv = useCallback(() => {
		if (!gridApi) return;
		console.log("Exporting to CSV...");
	}, [gridApi]);

	// Get unique departments for filter dropdown
	const departments = useMemo(() => {
		return [...new Set(employeeData.map((emp) => emp.department))];
	}, []);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
							<p className="mt-1 text-sm text-gray-500">
								FactWise Supply Chain Management • Employee Directory & Analytics
							</p>
						</div>
						<div className="flex items-center space-x-4">
							<button
								onClick={exportToCsv}
								className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								<Download className="mr-2 h-4 w-4" />
								Export CSV
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Dashboard Stats */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
					{/* Total Employees */}
					<div className="bg-white overflow-hidden shadow rounded-lg">
						<div className="p-5">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<Users className="h-6 w-6 text-blue-600" />
								</div>
								<div className="ml-5 w-0 flex-1">
									<dl>
										<dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
										<dd className="text-lg font-medium text-gray-900">
											{dashboardStats.totalEmployees}
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					{/* Active Employees */}
					<div className="bg-white overflow-hidden shadow rounded-lg">
						<div className="p-5">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<TrendingUp className="h-6 w-6 text-green-600" />
								</div>
								<div className="ml-5 w-0 flex-1">
									<dl>
										<dt className="text-sm font-medium text-gray-500 truncate">Active Employees</dt>
										<dd className="text-lg font-medium text-gray-900">
											{dashboardStats.activeEmployees}
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					{/* Average Salary */}
					<div className="bg-white overflow-hidden shadow rounded-lg">
						<div className="p-5">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<DollarSign className="h-6 w-6 text-purple-600" />
								</div>
								<div className="ml-5 w-0 flex-1">
									<dl>
										<dt className="text-sm font-medium text-gray-500 truncate">Average Salary</dt>
										<dd className="text-lg font-medium text-gray-900">
											${dashboardStats.averageSalary.toLocaleString()}
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					{/* Average Performance */}
					<div className="bg-white overflow-hidden shadow rounded-lg">
						<div className="p-5">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<Award className="h-6 w-6 text-yellow-600" />
								</div>
								<div className="ml-5 w-0 flex-1">
									<dl>
										<dt className="text-sm font-medium text-gray-500 truncate">Avg Performance</dt>
										<dd className="text-lg font-medium text-gray-900">
											{dashboardStats.averagePerformance}/5.0
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Filters and Search */}
				<div className="bg-white shadow rounded-lg mb-6">
					<div className="px-6 py-4">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
							{/* Search */}
							<div className="flex-1 max-w-lg">
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Search className="h-5 w-5 text-gray-400" />
									</div>
									<input
										type="text"
										className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										placeholder="Search employees..."
										value={quickFilterText}
										onChange={onQuickFilterChanged}
									/>
								</div>
							</div>

							{/* Department Filter */}
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<Filter className="h-5 w-5 text-gray-400" />
									<select
										value={selectedDepartment}
										onChange={(e) => onDepartmentFilterChanged(e.target.value)}
										className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
									>
										<option value="all">All Departments</option>
										{departments.map((dept) => (
											<option key={dept} value={dept}>
												{dept}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Employee Grid */}
				<div className="bg-white shadow rounded-lg">
					<div className="px-6 py-4 border-b border-gray-200">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Employee Directory</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Comprehensive view of all employees with advanced filtering and search capabilities.
						</p>
					</div>

					<div className="p-6">
						<div className="relative">
							{!isGridReady && (
								<div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
									<div className="flex flex-col items-center">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
										<p className="mt-2 text-sm text-gray-600">Loading employee data...</p>
									</div>
								</div>
							)}
							<div
								className="ag-theme-quartz w-full"
								style={{
									height: "600px",
									minHeight: "400px",
									maxHeight: "800px",
								}}
							>
								<AgGridReact
									ref={gridRef}
									rowData={processedEmployees}
									columnDefs={columnDefs}
									defaultColDef={defaultColDef}
									onGridReady={onGridReady}
									pagination={true}
									paginationPageSize={20}
									paginationPageSizeSelector={[10, 20, 50, 100]}
									suppressRowClickSelection={true}
									rowSelection="multiple"
									animateRows={true}
									enableRangeSelection={true}
									suppressMenuHide={true}
									suppressMovableColumns={false}
									enableCellTextSelection={true}
									quickFilterText={quickFilterText}
									getRowId={(params) => params.data.id.toString()}
									rowHeight={60}
									headerHeight={50}
									suppressRowHoverHighlight={false}
									rowClass="hover:bg-gray-50"
									suppressBrowserResizeObserver={true}
									maintainColumnOrder={true}
									suppressColumnMoveAnimation={true}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Department Statistics */}
				<div className="mt-6 bg-white shadow rounded-lg">
					<div className="px-6 py-4 border-b border-gray-200">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Department Analytics</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Key metrics and statistics by department for strategic workforce planning.
						</p>
					</div>

					<div className="p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{dashboardStats.departmentStats.map((dept) => (
								<div key={dept.department} className="border border-gray-200 rounded-lg p-4">
									<div className="flex items-center justify-between mb-3">
										<h4 className="text-sm font-medium text-gray-900">{dept.department}</h4>
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											{dept.totalEmployees} employees
										</span>
									</div>

									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span className="text-gray-500">Active:</span>
											<span className="font-medium text-green-600">{dept.activeEmployees}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-gray-500">Avg Salary:</span>
											<span className="font-medium">${dept.averageSalary.toLocaleString()}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-gray-500">Avg Performance:</span>
											<span className="font-medium text-yellow-600">
												{dept.averagePerformance}/5.0
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
