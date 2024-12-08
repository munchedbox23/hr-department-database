export type { Employee, EmployeePosition } from "./model/types/types";
export { employeesApi } from "./api/employeesApi";
export {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useGetEmployeePositionQuery,
  useUpdateEmployeeMutation,
  useGetFreeJobTitleQuery,
} from "./api/employeesApi";
