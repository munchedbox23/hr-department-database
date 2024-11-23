#pragma once

#include "department.h"
#include "employee.h"
#include "payroll_sheet.h"
#include "personnel_event.h"
#include "staffing_table.h"
#include "time_sheet.h"
#include "vacation.h"
#include "../ui/view.h"

namespace domain {

class Worker {
  public:
    virtual void AddDepartment(const domain::Department& dep) = 0;
    virtual void UpdateDepartment(const domain::Department& dep, int id) = 0;

    virtual void AddEmployee(const domain::Employee& employee) = 0;
    virtual void UpdateEmployee(const domain::Employee& employee, int id) = 0;

    virtual void AddPayrollSheet(const domain::PayrollSheet& payroll_sheet) = 0;
    virtual void UpdatePayrollSheet(const domain::PayrollSheet& payroll_sheet, int id) = 0;

    virtual void AddPersonnelEvent(const domain::PersonnelEvent& personnel_event) = 0;
    virtual void UpdatePersonnelEvent(const domain::PersonnelEvent& personnel_event, int id) = 0;

    virtual void AddStaffingTable(const domain::StaffingTable& staffing_table) = 0;
    virtual void UpdateStaffingTable(const domain::StaffingTable& staffing_table, int id) = 0;

    virtual void AddTimeSheet(const domain::TimeSheet& time_sheet) = 0;
    virtual void UpdateTimeSheet(const domain::TimeSheet& time_sheet, int id) = 0;

    virtual void AddVacation(const domain::Vacation& vacation) = 0;
    virtual void UpdateVacation(const domain::Vacation& vacation, int id) = 0;

  protected:
    virtual ~Worker() = default;
};

} // namespace domain
