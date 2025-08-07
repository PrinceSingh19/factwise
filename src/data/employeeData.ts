// Employee data types and interfaces for the FactWise Employee Dashboard
// This file contains TypeScript interfaces and the sample employee data

// Represents an employees performance status in the organization

export type EmployeeStatus = "active" | "inactive" | "onLeave" | "probation";

// Represents different departments in the supply chain organization

export type Department =
	| "Engineering"
	| "Marketing"
	| "Sales"
	| "HR"
	| "Finance"
	| "Operations"
	| "Logistics"
	| "Procurement";

// Core employee interface representing all employee data fields
export interface Employee {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	department: Department;
	position: string;
	salary: number;
	hireDate: string;
	age: number;
	location: string;
	performanceRating: number;
	projectsCompleted: number;
	isActive: boolean;
	skills: string[];
	manager: string | null;
}

// Extended employee interface with computed fields for dashboard display
export interface EmployeeWithComputedFields extends Employee {
	fullName: string;
	status: EmployeeStatus;
	tenure: number; // Years of service
	salaryFormatted: string;
	performanceLevel: "Excellent" | "Good" | "Average" | "Needs Improvement";
}

// Department statistics interface for dashboard metrics
export interface DepartmentStats {
	department: Department;
	totalEmployees: number;
	averageSalary: number;
	averagePerformance: number;
	activeEmployees: number;
}

// sample employee data
export const employeeData: Employee[] = [
	{
		id: 1,
		firstName: "John",
		lastName: "Smith",
		email: "john.smith@factwise.com",
		department: "Engineering",
		position: "Senior Developer",
		salary: 95000,
		hireDate: "2021-03-15",
		age: 32,
		location: "New York",
		performanceRating: 4.2,
		projectsCompleted: 12,
		isActive: true,
		skills: ["JavaScript", "React", "Node.js"],
		manager: "Sarah Johnson",
	},
	{
		id: 2,
		firstName: "Emily",
		lastName: "Davis",
		email: "emily.davis@factwise.com",
		department: "Marketing",
		position: "Marketing Manager",
		salary: 78000,
		hireDate: "2020-07-22",
		age: 29,
		location: "Los Angeles",
		performanceRating: 4.5,
		projectsCompleted: 8,
		isActive: true,
		skills: ["Digital Marketing", "SEO", "Analytics"],
		manager: "Michael Brown",
	},
	{
		id: 3,
		firstName: "Michael",
		lastName: "Brown",
		email: "michael.brown@factwise.com",
		department: "Marketing",
		position: "VP Marketing",
		salary: 125000,
		hireDate: "2019-01-10",
		age: 38,
		location: "Los Angeles",
		performanceRating: 4.7,
		projectsCompleted: 15,
		isActive: true,
		skills: ["Strategy", "Leadership", "Brand Management"],
		manager: null,
	},
	{
		id: 4,
		firstName: "Sarah",
		lastName: "Johnson",
		email: "sarah.johnson@factwise.com",
		department: "Engineering",
		position: "Engineering Manager",
		salary: 115000,
		hireDate: "2018-11-05",
		age: 35,
		location: "New York",
		performanceRating: 4.6,
		projectsCompleted: 18,
		isActive: true,
		skills: ["Team Leadership", "Architecture", "Python"],
		manager: "David Wilson",
	},
	{
		id: 5,
		firstName: "David",
		lastName: "Wilson",
		email: "david.wilson@factwise.com",
		department: "Engineering",
		position: "CTO",
		salary: 180000,
		hireDate: "2017-05-12",
		age: 42,
		location: "New York",
		performanceRating: 4.8,
		projectsCompleted: 25,
		isActive: true,
		skills: ["Technical Strategy", "Leadership", "Cloud Architecture"],
		manager: null,
	},
	{
		id: 6,
		firstName: "Lisa",
		lastName: "Garcia",
		email: "lisa.garcia@factwise.com",
		department: "Sales",
		position: "Sales Representative",
		salary: 65000,
		hireDate: "2022-02-28",
		age: 26,
		location: "Chicago",
		performanceRating: 3.9,
		projectsCompleted: 6,
		isActive: true,
		skills: ["CRM", "Negotiation", "Customer Relations"],
		manager: "Robert Martinez",
	},
	{
		id: 7,
		firstName: "Robert",
		lastName: "Martinez",
		email: "robert.martinez@factwise.com",
		department: "Sales",
		position: "Sales Manager",
		salary: 92000,
		hireDate: "2020-09-14",
		age: 34,
		location: "Chicago",
		performanceRating: 4.3,
		projectsCompleted: 11,
		isActive: true,
		skills: ["Sales Strategy", "Team Management", "B2B Sales"],
		manager: "Jennifer Lee",
	},
	{
		id: 8,
		firstName: "Jennifer",
		lastName: "Lee",
		email: "jennifer.lee@factwise.com",
		department: "Sales",
		position: "VP Sales",
		salary: 135000,
		hireDate: "2019-06-18",
		age: 40,
		location: "Chicago",
		performanceRating: 4.6,
		projectsCompleted: 16,
		isActive: true,
		skills: ["Strategic Sales", "Leadership", "Market Analysis"],
		manager: null,
	},
	{
		id: 9,
		firstName: "James",
		lastName: "Anderson",
		email: "james.anderson@factwise.com",
		department: "HR",
		position: "HR Specialist",
		salary: 58000,
		hireDate: "2021-08-30",
		age: 28,
		location: "Austin",
		performanceRating: 4.0,
		projectsCompleted: 7,
		isActive: true,
		skills: ["Recruitment", "Employee Relations", "HRIS"],
		manager: "Karen White",
	},
	{
		id: 10,
		firstName: "Karen",
		lastName: "White",
		email: "karen.white@factwise.com",
		department: "HR",
		position: "HR Manager",
		salary: 85000,
		hireDate: "2019-12-02",
		age: 36,
		location: "Austin",
		performanceRating: 4.4,
		projectsCompleted: 13,
		isActive: true,
		skills: ["HR Strategy", "Policy Development", "Leadership"],
		manager: null,
	},
	{
		id: 11,
		firstName: "Alex",
		lastName: "Thompson",
		email: "alex.thompson@factwise.com",
		department: "Engineering",
		position: "Junior Developer",
		salary: 72000,
		hireDate: "2023-01-16",
		age: 24,
		location: "New York",
		performanceRating: 3.8,
		projectsCompleted: 4,
		isActive: true,
		skills: ["Java", "Spring Boot", "MySQL"],
		manager: "Sarah Johnson",
	},
	{
		id: 12,
		firstName: "Maria",
		lastName: "Rodriguez",
		email: "maria.rodriguez@factwise.com",
		department: "Finance",
		position: "Financial Analyst",
		salary: 68000,
		hireDate: "2021-11-08",
		age: 30,
		location: "Miami",
		performanceRating: 4.1,
		projectsCompleted: 9,
		isActive: true,
		skills: ["Financial Modeling", "Excel", "SAP"],
		manager: "Thomas Clark",
	},
	{
		id: 13,
		firstName: "Thomas",
		lastName: "Clark",
		email: "thomas.clark@factwise.com",
		department: "Finance",
		position: "Finance Manager",
		salary: 98000,
		hireDate: "2018-04-25",
		age: 37,
		location: "Miami",
		performanceRating: 4.5,
		projectsCompleted: 14,
		isActive: true,
		skills: ["Financial Planning", "Budget Management", "Leadership"],
		manager: null,
	},
	{
		id: 14,
		firstName: "Amanda",
		lastName: "Taylor",
		email: "amanda.taylor@factwise.com",
		department: "Marketing",
		position: "Content Specialist",
		salary: 55000,
		hireDate: "2022-06-12",
		age: 25,
		location: "Los Angeles",
		performanceRating: 3.7,
		projectsCompleted: 5,
		isActive: true,
		skills: ["Content Writing", "Social Media", "Adobe Creative"],
		manager: "Michael Brown",
	},
	{
		id: 15,
		firstName: "Ryan",
		lastName: "Miller",
		email: "ryan.miller@factwise.com",
		department: "Operations",
		position: "Operations Manager",
		salary: 88000,
		hireDate: "2020-10-19",
		age: 31,
		location: "Seattle",
		performanceRating: 4.3,
		projectsCompleted: 10,
		isActive: true,
		skills: ["Supply Chain", "Process Optimization", "Lean Six Sigma"],
		manager: "Sarah Johnson",
	},
	{
		id: 16,
		firstName: "Jessica",
		lastName: "Moore",
		email: "jessica.moore@factwise.com",
		department: "Sales",
		position: "Account Executive",
		salary: 75000,
		hireDate: "2021-04-03",
		age: 27,
		location: "Denver",
		performanceRating: 4.0,
		projectsCompleted: 8,
		isActive: false,
		skills: ["Account Management", "Salesforce", "Presentation"],
		manager: "Robert Martinez",
	},
	{
		id: 17,
		firstName: "Daniel",
		lastName: "Harris",
		email: "daniel.harris@factwise.com",
		department: "Finance",
		position: "Senior Accountant",
		salary: 73000,
		hireDate: "2019-08-14",
		age: 33,
		location: "Miami",
		performanceRating: 4.2,
		projectsCompleted: 12,
		isActive: true,
		skills: ["Accounting", "Tax Preparation", "QuickBooks"],
		manager: "Thomas Clark",
	},
	{
		id: 18,
		firstName: "Nicole",
		lastName: "Jackson",
		email: "nicole.jackson@factwise.com",
		department: "HR",
		position: "Recruiter",
		salary: 62000,
		hireDate: "2022-09-05",
		age: 29,
		location: "Austin",
		performanceRating: 3.9,
		projectsCompleted: 6,
		isActive: true,
		skills: ["Talent Acquisition", "LinkedIn Recruiter", "Interviewing"],
		manager: "Karen White",
	},
	{
		id: 19,
		firstName: "Kevin",
		lastName: "Wright",
		email: "kevin.wright@factwise.com",
		department: "Logistics",
		position: "Logistics Coordinator",
		salary: 76000,
		hireDate: "2020-12-07",
		age: 30,
		location: "Seattle",
		performanceRating: 4.1,
		projectsCompleted: 11,
		isActive: true,
		skills: ["Warehouse Management", "Transportation", "Inventory Control"],
		manager: "Ryan Miller",
	},
	{
		id: 20,
		firstName: "Stephanie",
		lastName: "Lopez",
		email: "stephanie.lopez@factwise.com",
		department: "Procurement",
		position: "Procurement Specialist",
		salary: 64000,
		hireDate: "2021-12-20",
		age: 26,
		location: "Phoenix",
		performanceRating: 3.8,
		projectsCompleted: 7,
		isActive: true,
		skills: ["Vendor Management", "Contract Negotiation", "Cost Analysis"],
		manager: "Michael Brown",
	},
];

/**
 * Utility functions for processing employee data
 * These functions transform raw employee data into display-ready formats
 */

/**
 * Calculates tenure in years from hire date
 * @param hireDate - Employee hire date in YYYY-MM-DD format
 * @returns Number of years since hire date
 */
export const calculateTenure = (hireDate: string): number => {
	const hire = new Date(hireDate);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - hire.getTime());
	const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
	return diffYears;
};

/**
 * Determines performance level based on rating
 * @param rating - Performance rating (0-5 scale)
 * @returns Performance level category
 */
export const getPerformanceLevel = (
	rating: number
): "Excellent" | "Good" | "Average" | "Needs Improvement" => {
	if (rating >= 4.5) return "Excellent";
	if (rating >= 4.0) return "Good";
	if (rating >= 3.5) return "Average";
	return "Needs Improvement";
};

/**
 * Determines employee status based on isActive flag and other factors
 * @param employee - Employee object
 * @returns Employee status
 */
export const getEmployeeStatus = (employee: Employee): EmployeeStatus => {
	if (!employee.isActive) return "inactive";
	if (employee.performanceRating < 3.0) return "probation";
	return "active";
};

/**
 * Formats salary as currency string
 * @param salary - Salary amount
 * @returns Formatted salary string
 */
export const formatSalary = (salary: number): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(salary);
};

/**
 * Transforms employee data with computed fields for dashboard display
 * @param employees - Array of employee objects
 * @returns Array of employees with computed fields
 */
export const getEmployeesWithComputedFields = (
	employees: Employee[]
): EmployeeWithComputedFields[] => {
	return employees.map((employee) => ({
		...employee,
		fullName: `${employee.firstName} ${employee.lastName}`,
		status: getEmployeeStatus(employee),
		tenure: calculateTenure(employee.hireDate),
		salaryFormatted: formatSalary(employee.salary),
		performanceLevel: getPerformanceLevel(employee.performanceRating),
	}));
};

/**
 * Calculates department statistics
 * @param employees - Array of employee objects
 * @returns Array of department statistics
 */
export const getDepartmentStats = (employees: Employee[]): DepartmentStats[] => {
	const departments = [...new Set(employees.map((emp) => emp.department))];

	return departments.map((department) => {
		const deptEmployees = employees.filter((emp) => emp.department === department);
		const activeEmployees = deptEmployees.filter((emp) => emp.isActive);

		return {
			department,
			totalEmployees: deptEmployees.length,
			averageSalary: Math.round(
				deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) / deptEmployees.length
			),
			averagePerformance:
				Math.round(
					(deptEmployees.reduce((sum, emp) => sum + emp.performanceRating, 0) /
						deptEmployees.length) *
						10
				) / 10,
			activeEmployees: activeEmployees.length,
		};
	});
};
