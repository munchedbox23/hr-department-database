#pragma once

#include "use_cases.h"
#include "../domain/department_fwd.h"
#include "../domain/employee_fwd.h"
#include "../domain/payroll_sheet_fwd.h"
#include "../domain/personnel_event_fwd.h"
#include "../domain/staffing_table_fwd.h"
#include "../domain/time_sheet_fwd.h"
#include "../domain/vacation_fwd.h"

namespace app {

class UseCasesImpl : public UseCases {
  public:
    explicit UseCasesImpl(domain::DepartmentRepository& deps,
                          domain::EmployeeRepository& employees,
                          domain::PayrollSheetRepository& payroll_sheet,
                          domain::PersonnelEventRepository& personnel_event,
                          domain::StaffingTableRepository& staffing_table,
                          domain::TimeSheetRepository& time_sheet,
                          domain::VacationRepository& vacation);

    void AddDepartment(const ui::detail::DepartmentInfo& dep) override;
    void UpdateDepartment(const ui::detail::DepartmentInfo& dep) override;
    std::vector<ui::detail::DepartmentInfo> GetDepartments() const override;

    void AddEmployee(const ui::detail::EmployeeInfo& employee) override;
    void UpdateEmployee(const ui::detail::EmployeeInfo& employee) override;
    std::vector<ui::detail::EmployeeInfo> GetEmployees() const override;

    void AddPayrollSheet(const ui::detail::PayrollSheetInfo& payroll_sheet) override;
    void UpdatePayrollSheet(const ui::detail::PayrollSheetInfo& payroll_sheet) override;
    std::vector<ui::detail::PayrollSheetInfo> GetPayrollSheet() const override;

    void AddPersonnelEvent(const ui::detail::PersonnelEventInfo& personnel_event) override;
    void UpdatePersonnelEvent(const ui::detail::PersonnelEventInfo& personnel_event) override;
    std::vector<ui::detail::PersonnelEventInfo> GetPersonnelEvents() const override;

    void AddStaffingTable(const ui::detail::StaffingTableInfo& staffing_table) override;
    void UpdateStaffingTable(const ui::detail::StaffingTableInfo& staffing_table) override;
    std::vector<ui::detail::StaffingTableInfo> GetStaffingTable() const override;

    void AddTimeSheet(const ui::detail::TimeSheetInfo& time_sheet) override;
    void UpdateTimeSheet(const ui::detail::TimeSheetInfo& time_sheet) override;
    std::vector<ui::detail::TimeSheetInfo> GetTimeSheet() const override;

    void AddVacation(const ui::detail::VacationInfo& vacation) override;
    void UpdateVacation(const ui::detail::VacationInfo& vacation) override;
    std::vector<ui::detail::VacationInfo> GetVacations() const override;

    int GetCountDepartments() const override;
    int GetCountEmployees() const override;
    int GetCountPayrollSheet() const override;
    int GetCountPersonnelEvents() const override;
    int GetCountStaffingTable() const override;
    int GetCountTimeSheet() const override;
    int GetCountVacations() const override;

    std::string GetDepartment(int id) const override;
    int GetDepartmentId(const std::string& dep) const override;

  private:
    domain::DepartmentRepository& deps_;
    domain::EmployeeRepository& employees_;
    domain::PayrollSheetRepository& payroll_sheet_;
    domain::PersonnelEventRepository& personnel_events_;
    domain::StaffingTableRepository& staffing_table_;
    domain::TimeSheetRepository& time_sheet_;
    domain::VacationRepository& vacations_;
};

} // namespace app
