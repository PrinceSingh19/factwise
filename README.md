# FactWise Employee Dashboard

A comprehensive, professional employee management dashboard built with React, TypeScript, and AG Grid.

## 🚀 Features

### Core Functionality

- **Advanced Data Grid**: Powered by AG Grid with sorting, filtering, and pagination
- **Real-time Search**: Quick filter across all employee data
- **Department Filtering**: Filter employees by department
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Custom Cell Renderers

- **Employee Profile**: Avatar, name, position, and status indicator
- **Performance Rating**: Star-based rating system with color coding
- **Skills Display**: Expandable skill tags with color variety
- **Salary Visualization**: Currency formatting with range indicators
- **Status Badges**: Color-coded status indicators
- **Action Buttons**: Quick access to common employee actions

### Dashboard Analytics

- **Employee Statistics**: Total, active employees, average salary, and performance
- **Department Insights**: Per-department metrics and analytics
- **Visual Indicators**: Color-coded performance and status indicators

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Data Grid**: AG Grid Community Edition
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd factwise-employee-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── cellRenderers/          # Custom AG Grid cell renderers
│   │   ├── ActionsCellRenderer.tsx
│   │   ├── EmployeeCellRenderer.tsx
│   │   ├── PerformanceCellRenderer.tsx
│   │   ├── SalaryCellRenderer.tsx
│   │   ├── SkillsCellRenderer.tsx
│   │   ├── StatusCellRenderer.tsx
│   │   └── index.ts
│   ├── EmployeeDashboard.tsx   # Main dashboard component
│   ├── ErrorBoundary.tsx       # Error handling component
│   └── LoadingSpinner.tsx      # Loading indicator
├── data/
│   └── employeeData.ts         # Employee data and utilities
├── App.tsx                     # Root application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles and AG Grid theming
```

## 🎨 Design Features

### Professional Styling

- Clean, modern interface with supply chain industry colors
- Consistent spacing and typography
- Professional color scheme (blues, grays, whites)
- Responsive grid layout

### User Experience

- Intuitive navigation and filtering
- Quick search functionality
- Expandable skill tags to save space
- Hover effects and smooth transitions
- Loading states and error handling

## 📊 Data Management

### Employee Data Structure

```typescript
interface Employee {
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
```

### Computed Fields

- Full name concatenation
- Tenure calculation
- Performance level categorization
- Status determination
- Formatted salary display

## 🔧 Customization

### Adding New Departments

Update the `Department` type in `src/data/employeeData.ts`:

```typescript
export type Department =
	| "Engineering"
	| "Marketing"
	| "Sales"
	| "HR"
	| "Finance"
	| "Operations"
	| "Logistics"
	| "Procurement"
	| "YourNewDepartment";
```

### Custom Cell Renderers

Create new cell renderers in `src/components/cellRenderers/` following the existing patterns.

### Styling Modifications

Update `src/index.css` for AG Grid theme customization or modify Tailwind classes in components.

## 🚀 Performance Optimizations

- **Memoized Components**: React.memo and useMemo for expensive calculations
- **Virtual Scrolling**: AG Grid handles large datasets efficiently
- **Lazy Loading**: Components load only when needed
- **Optimized Renders**: Minimal re-renders with proper dependency arrays

## 📱 Responsive Design

- **Desktop**: Full feature set with all columns visible
- **Tablet**: Optimized column widths and responsive layouts
- **Mobile**: Condensed view with essential information

## 🔒 Error Handling

- **Error Boundaries**: Catch and handle React errors gracefully
- **Loading States**: Proper loading indicators
- **Fallback UI**: User-friendly error messages
- **Development Tools**: Detailed error information in development mode

## 📄 License

This project is licensed under the MIT License.
