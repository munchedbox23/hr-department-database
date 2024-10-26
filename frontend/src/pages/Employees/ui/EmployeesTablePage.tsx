import { EmployeeTable } from "@/entities/employee/ui/EmployeeTable";
import { EmployeeActionsToolbar } from "@/features/employee-actions/ui/EmployeeActionsToolbar";
import { GlobalFilter } from "@/shared/ui/GlobalFilter";
import { Container } from "@mui/material";
import { useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";

export const data = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    jobTitle: "Software Engineer",
    salary: 80000,
    startDate: "2019-04-15",
    signatureCatchPhrase: "Keep it simple!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    jobTitle: "Project Manager",
    salary: 95000,
    startDate: "2021-01-10",
    signatureCatchPhrase: "Plan, execute, deliver.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    jobTitle: "Product Designer",
    salary: 75000,
    startDate: "2020-03-05",
    signatureCatchPhrase: "Design is intelligence made visible.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    jobTitle: "UX Researcher",
    salary: 72000,
    startDate: "2018-11-23",
    signatureCatchPhrase: "User experience is everything.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    firstName: "William",
    lastName: "Brown",
    email: "william.brown@example.com",
    jobTitle: "DevOps Engineer",
    salary: 85000,
    startDate: "2020-09-12",
    signatureCatchPhrase: "Automate all the things!",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    firstName: "Sophia",
    lastName: "Miller",
    email: "sophia.miller@example.com",
    jobTitle: "QA Engineer",
    salary: 69000,
    startDate: "2017-07-18",
    signatureCatchPhrase: "Quality is not an act, it is a habit.",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    firstName: "Daniel",
    lastName: "Wilson",
    email: "daniel.wilson@example.com",
    jobTitle: "Data Scientist",
    salary: 105000,
    startDate: "2019-08-25",
    signatureCatchPhrase: "Data is the new oil.",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    firstName: "Olivia",
    lastName: "Moore",
    email: "olivia.moore@example.com",
    jobTitle: "Frontend Developer",
    salary: 78000,
    startDate: "2021-02-14",
    signatureCatchPhrase: "Code is poetry.",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    firstName: "James",
    lastName: "Taylor",
    email: "james.taylor@example.com",
    jobTitle: "Backend Developer",
    salary: 87000,
    startDate: "2020-10-30",
    signatureCatchPhrase: "Building the backbone.",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    firstName: "Lily",
    lastName: "Anderson",
    email: "lily.anderson@example.com",
    jobTitle: "HR Manager",
    salary: 63000,
    startDate: "2016-06-22",
    signatureCatchPhrase: "People are our greatest asset.",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

const EmployeeTablePage = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "Имя",
      },
      {
        accessorKey: "lastName",
        header: "Фамилия",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "jobTitle",
        header: "Работа",
      },
      {
        accessorKey: "salary",
        header: "Зарплата",
      },
      {
        accessorKey: "startDate",
        header: "Дата начала",
        Cell: ({ cell }: { cell: { getValue: () => string } }) =>
          new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "signatureCatchPhrase",
        header: "Signature Catch Phrase",
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <Container sx={{ py: 5 }}>
      <GlobalFilter table={table} />
      <EmployeeActionsToolbar table={table} />
      <EmployeeTable data={data} />
    </Container>
  );
};

export default EmployeeTablePage;
