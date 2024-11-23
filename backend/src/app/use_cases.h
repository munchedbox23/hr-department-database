#pragma once

#include <string>
#include <unordered_set>
#include <vector>

namespace ui {

namespace detail {

struct DepartmentInfo;
struct EmployeeInfo;
struct PayrollSheetInfo;
struct PersonnelEventInfo;
struct StaffingTableInfo;
struct TimeSheetInfo;
struct VacationInfo;

} // namespace detail

} // namespace ui

namespace app {

class UseCases {
  public:
    virtual void AddDepartment(const ui::detail::DepartmentInfo& dep) = 0;
    virtual void UpdateDepartment(const ui::detail::DepartmentInfo& dep) = 0;
    virtual std::vector<ui::detail::DepartmentInfo> GetDepartments() const = 0;

    virtual void AddEmployee(const ui::detail::EmployeeInfo& employee) = 0;
    virtual void UpdateEmployee(const ui::detail::EmployeeInfo& employee) = 0;
    virtual std::vector<ui::detail::EmployeeInfo> GetEmployees() const = 0;

    virtual void AddPayrollSheet(const ui::detail::PayrollSheetInfo& payroll_sheet) = 0;
    virtual void UpdatePayrollSheet(const ui::detail::PayrollSheetInfo& payroll_sheet) = 0;
    virtual std::vector<ui::detail::PayrollSheetInfo> GetPayrollSheet() const = 0;

    virtual void AddPersonnelEvent(const ui::detail::PersonnelEventInfo& personnel_event) = 0;
    virtual void UpdatePersonnelEvent(const ui::detail::PersonnelEventInfo& personnel_event) = 0;
    virtual std::vector<ui::detail::PersonnelEventInfo> GetPersonnelEvents() const = 0;

    virtual void AddStaffingTable(const ui::detail::StaffingTableInfo& staffing_table) = 0;
    virtual void UpdateStaffingTable(const ui::detail::StaffingTableInfo& staffing_table) = 0;
    virtual std::vector<ui::detail::StaffingTableInfo> GetStaffingTable() const = 0;

    virtual void AddTimeSheet(const ui::detail::TimeSheetInfo& time_sheet) = 0;
    virtual void UpdateTimeSheet(const ui::detail::TimeSheetInfo& time_sheet) = 0;
    virtual std::vector<ui::detail::TimeSheetInfo> GetTimeSheet() const = 0;

    virtual void AddVacation(const ui::detail::VacationInfo& vacation) = 0;
    virtual void UpdateVacation(const ui::detail::VacationInfo& vacation) = 0;
    virtual std::vector<ui::detail::VacationInfo> GetVacations() const = 0;

    virtual int GetCountDepartments() const = 0;
    virtual int GetCountEmployees() const = 0;
    virtual int GetCountPayrollSheet() const = 0;
    virtual int GetCountPersonnelEvents() const = 0;
    virtual int GetCountStaffingTable() const = 0;
    virtual int GetCountTimeSheet() const = 0;
    virtual int GetCountVacations() const = 0;

    virtual std::string GetDepartment(int id) const = 0;
    virtual int GetDepartmentId(const std::string& dep) const = 0;

    virtual std::unordered_set<std::string> GetNumbers() const = 0;
    virtual int GetPersonnelNumberForPhoneNumber(const std::string& number) const = 0;

  protected:
    ~UseCases() = default;
};

} // namespace app
