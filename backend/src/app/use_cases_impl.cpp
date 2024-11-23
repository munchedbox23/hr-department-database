#include "../domain/worker.h"
#include "use_cases_impl.h"

namespace app {

UseCasesImpl::UseCasesImpl(domain::DepartmentRepository& deps,
                           domain::EmployeeRepository& employees,
                           domain::PayrollSheetRepository& payroll_sheet,
                           domain::PersonnelEventRepository& personnel_events,
                           domain::StaffingTableRepository& staffing_table,
                           domain::TimeSheetRepository& time_sheet,
                           domain::VacationRepository& vacations) : deps_{deps}
                                                                  , employees_{employees}
                                                                  , payroll_sheet_{payroll_sheet}
                                                                  , personnel_events_{personnel_events}
                                                                  , staffing_table_{staffing_table}
                                                                  , time_sheet_{time_sheet}
                                                                  , vacations_{vacations} {}

void UseCasesImpl::AddDepartment(const ui::detail::DepartmentInfo& dep) {
    auto worker = deps_.GetWorker();
    worker->AddDepartment({dep.department_id, dep.dep_name, dep.number});
}

void UseCasesImpl::UpdateDepartment(const ui::detail::DepartmentInfo& dep, int id) {
    auto worker = deps_.GetWorker();
    worker->UpdateDepartment({dep.department_id, dep.dep_name, dep.number}, id);
}

std::vector<ui::detail::DepartmentInfo> UseCasesImpl::GetDepartments() const {
    return deps_.Get();
}

void UseCasesImpl::AddEmployee(const ui::detail::EmployeeInfo& employee) {
    auto worker = employees_.GetWorker();
    worker->AddEmployee({employee.personnel_number, std::get<int>(employee.department), employee.full_name,
                         employee.job_title, employee.experience, employee.number,
                         employee.salary, employee.education});
}

void UseCasesImpl::UpdateEmployee(const ui::detail::EmployeeInfo& employee, int id) {
    auto worker = employees_.GetWorker();
    worker->UpdateEmployee({employee.personnel_number, std::get<int>(employee.department), employee.full_name,
                            employee.job_title, employee.experience, employee.number,
                            employee.salary, employee.education}, id);
}

std::vector<ui::detail::EmployeeInfo> UseCasesImpl::GetEmployees() const {
    return employees_.Get();
}

std::vector<ui::detail::EmployeeInfo> UseCasesImpl::GetEmployeeForPerson(int personnel_number) const {
    return employees_.GetForPerson(personnel_number);
}

void UseCasesImpl::AddPayrollSheet(const ui::detail::PayrollSheetInfo& payroll_sheet) {
    auto worker = payroll_sheet_.GetWorker();
    worker->AddPayrollSheet({payroll_sheet.payroll_sheet_id, payroll_sheet.personnel_number,
                             payroll_sheet.payment_date, payroll_sheet.sum, payroll_sheet.payment_type});
}

void UseCasesImpl::UpdatePayrollSheet(const ui::detail::PayrollSheetInfo& payroll_sheet, int id) {
    auto worker = payroll_sheet_.GetWorker();
    worker->UpdatePayrollSheet({payroll_sheet.payroll_sheet_id, payroll_sheet.personnel_number,
          payroll_sheet.payment_date, payroll_sheet.sum, payroll_sheet.payment_type}, id);
}

std::vector<ui::detail::PayrollSheetInfo> UseCasesImpl::GetPayrollSheet() const {
    return payroll_sheet_.Get();
}

std::vector<ui::detail::PayrollSheetInfo> UseCasesImpl::GetPayrollSheetForPerson(int personnel_number) const {
    return payroll_sheet_.GetForPerson(personnel_number);
}

void UseCasesImpl::AddPersonnelEvent(const ui::detail::PersonnelEventInfo& personnel_event) {
    auto worker = personnel_events_.GetWorker();
    worker->AddPersonnelEvent({personnel_event.personnel_event_id, personnel_event.personnel_number,
                               personnel_event.event_date, personnel_event.event_type, personnel_event.comment});
}

void UseCasesImpl::UpdatePersonnelEvent(const ui::detail::PersonnelEventInfo& personnel_event, int id) {
    auto worker = personnel_events_.GetWorker();
    worker->UpdatePersonnelEvent({personnel_event.personnel_event_id, personnel_event.personnel_number,
          personnel_event.event_date, personnel_event.event_type, personnel_event.comment}, id);
}

std::vector<ui::detail::PersonnelEventInfo> UseCasesImpl::GetPersonnelEvents() const {
    return personnel_events_.Get();
}

std::vector<ui::detail::PersonnelEventInfo> UseCasesImpl::GetPersonnelEventsForPerson(int personnel_number) const {
    return personnel_events_.GetForPerson(personnel_number);
}

void UseCasesImpl::AddStaffingTable(const ui::detail::StaffingTableInfo& staffing_table) {
    auto worker = staffing_table_.GetWorker();
    worker->AddStaffingTable({staffing_table.staffing_table_id, std::get<int>(staffing_table.department),
                              staffing_table.job_title, staffing_table.time_job, staffing_table.salary});
}

void UseCasesImpl::UpdateStaffingTable(const ui::detail::StaffingTableInfo& staffing_table, int id) {
    auto worker = staffing_table_.GetWorker();
    worker->UpdateStaffingTable({staffing_table.staffing_table_id, std::get<int>(staffing_table.department),
          staffing_table.job_title, staffing_table.time_job, staffing_table.salary}, id);
}

std::vector<ui::detail::StaffingTableInfo> UseCasesImpl::GetStaffingTable() const {
    return staffing_table_.Get();
}

void UseCasesImpl::AddTimeSheet(const ui::detail::TimeSheetInfo& time_sheet) {
    auto worker = time_sheet_.GetWorker();
    worker->AddTimeSheet({time_sheet.time_sheet_id, time_sheet.personnel_number, time_sheet.date, time_sheet.time_worked});
}

void UseCasesImpl::UpdateTimeSheet(const ui::detail::TimeSheetInfo& time_sheet, int id) {
    auto worker = time_sheet_.GetWorker();
    worker->UpdateTimeSheet({time_sheet.time_sheet_id, time_sheet.personnel_number, time_sheet.date, time_sheet.time_worked}, id);
}

std::vector<ui::detail::TimeSheetInfo> UseCasesImpl::GetTimeSheet() const {
    return time_sheet_.Get();
}

std::vector<ui::detail::TimeSheetInfo> UseCasesImpl::GetTimeSheetForPerson(int personnel_number) const {
    return time_sheet_.GetForPerson(personnel_number);
}

void UseCasesImpl::AddVacation(const ui::detail::VacationInfo& vacation) {
    auto worker = vacations_.GetWorker();
    worker->AddVacation({vacation.vacation_id, vacation.personnel_number, vacation.from_date,
                         vacation.to_date, vacation.type});
}

void UseCasesImpl::UpdateVacation(const ui::detail::VacationInfo& vacation, int id) {
    auto worker = vacations_.GetWorker();
    worker->UpdateVacation({vacation.vacation_id, vacation.personnel_number, vacation.from_date,
          vacation.to_date, vacation.type}, id);
}

std::vector<ui::detail::VacationInfo> UseCasesImpl::GetVacations() const {
    return vacations_.Get();
}

std::vector<ui::detail::VacationInfo> UseCasesImpl::GetVacationForPerson(int personnel_number) const {
    return vacations_.GetForPerson(personnel_number);
}

int UseCasesImpl::GetCountDepartments() const { return deps_.GetCount(); }
int UseCasesImpl::GetCountEmployees() const { return employees_.GetCount(); }
int UseCasesImpl::GetCountPayrollSheet() const { return payroll_sheet_.GetCount(); }
int UseCasesImpl::GetCountPersonnelEvents() const { return personnel_events_.GetCount(); }
int UseCasesImpl::GetCountStaffingTable() const { return staffing_table_.GetCount(); }
int UseCasesImpl::GetCountTimeSheet() const { return time_sheet_.GetCount(); }
int UseCasesImpl::GetCountVacations() const { return vacations_.GetCount(); }

std::string UseCasesImpl::GetDepartment(int id) const { return deps_.GetDep(id); }
int UseCasesImpl::GetDepartmentId(const std::string& dep) const { return deps_.GetDepId(dep); }

std::unordered_set<std::string> UseCasesImpl::GetNumbers() const { return employees_.GetNumbers(); }
int UseCasesImpl::GetPersonnelNumberForPhoneNumber(const std::string& number) const {
    return employees_.GetPersonnelNumberForPhoneNumber(number);
}

} // namespace app
