#include "postgres.h"
#include "../ui/view.h"

#include <pqxx/zview.hxx>
#include <pqxx/pqxx>

#include <stdexcept>
#include <iostream>

namespace postgres {
using namespace std::literals;
using pqxx::operator"" _zv;

std::string DepartmentRepositoryImpl::GetDep(int id) const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM Отдел ORDER BY КодОтдела;"s;

    auto resp = tr.query<int, std::string, std::string>(query);

    for (const auto& [dep_id, dep_name, number] : resp) {
        if (dep_id == id) {
            return dep_name;
        }
    }

    return ""s;
}

int DepartmentRepositoryImpl::GetDepId(const std::string& dep) const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM Отдел ORDER BY КодОтдела;"s;

    auto resp = tr.query<int, std::string, std::string>(query);

    for (const auto& [dep_id, dep_name, number] : resp) {
        if (dep_name == dep) {
            return dep_id;
        }
    }

    return -1;
}

std::vector<ui::detail::DepartmentInfo> DepartmentRepositoryImpl::Get() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM Отдел ORDER BY КодОтдела;"s;

    auto resp = tr.query<int, std::string, std::string>(query);

    std::vector<ui::detail::DepartmentInfo> result;

    for (const auto& [id, dep_name, number] : resp) {
        ui::detail::DepartmentInfo department{id, dep_name, number};
        result.push_back(department);
    }

    return result;
}

int DepartmentRepositoryImpl::GetCount() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT COUNT(*) FROM Отдел;"s;

    auto count = tr.query_value<int>(query);

    return count;
}

std::unordered_set<std::string> EmployeeRepositoryImpl::GetNumbers() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT КонтактныйТелефон FROM Сотрудник ORDER BY IdСотрудника;"s;

    pqxx::result resp = tr.exec(query);

    std::unordered_set<std::string> numbers;

    for (const auto& row : resp) {
        std::string number = row["КонтактныйТелефон"].as<std::string>();
        numbers.insert(number);
    }

    return numbers;
}

int EmployeeRepositoryImpl::GetPersonnelNumberForPhoneNumber(const std::string& number) const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT IdСотрудника FROM Сотрудник WHERE КонтактныйТелефон = '" + number + "'" + ";"s;

    auto id = tr.query_value<int>(query);

    return id;
}

std::vector<ui::detail::EmployeeInfo> EmployeeRepositoryImpl::Get() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    DepartmentRepositoryImpl deps(pool_);

    std::string query = "SELECT * FROM Сотрудник ORDER BY IdСотрудника;"s;

    auto resp = tr.query<int, int, std::string, std::string, std::optional<int>,
                         std::string, double, std::string>(query);

    std::vector<ui::detail::EmployeeInfo> result;

    for (auto& [personnel_number, department_id, full_name, job_title,
                experience, number, salary, education] : resp) {
        ui::detail::EmployeeInfo employee{personnel_number, deps.GetDep(department_id), full_name, job_title,
                                          experience, number, static_cast<int>(salary), education};
        result.push_back(employee);
    }

    return result;
}

std::vector<ui::detail::EmployeeInfo> EmployeeRepositoryImpl::GetForPerson(int personnel_number) const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    DepartmentRepositoryImpl deps(pool_);

    std::string query = "SELECT * FROM Сотрудник ORDER BY IdСотрудника;"s;

    auto resp = tr.query<int, int, std::string, std::string, std::optional<int>,
                         std::string, double, std::string>(query);

    std::vector<ui::detail::EmployeeInfo> result;

    for (const auto& [personnel_num, department_id, full_name, job_title,
                experience, number, salary, education] : resp) {
        if (personnel_number != personnel_num) {
            continue;
        }
        ui::detail::EmployeeInfo employee{personnel_number, deps.GetDep(department_id), full_name, job_title,
                                          experience, number, static_cast<int>(salary), education};
        result.push_back(employee);
    }

    return result;
}

int EmployeeRepositoryImpl::GetCount() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT COUNT(*) FROM Сотрудник;"s;

    auto count = tr.query_value<int>(query);

    return count;
}

std::vector<ui::detail::PayrollSheetInfo> PayrollSheetRepositoryImpl::Get() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM ТабельУчетаЗарплаты ORDER BY НомерЗаписи;"s;

    auto resp = tr.query<int, int, std::string, double, std::string>(query);

    std::vector<ui::detail::PayrollSheetInfo> result;

    for (auto& [payroll_sheet_id, personnel_number, payment_date,
                sum, payment_type] : resp) {
        ui::detail::PayrollSheetInfo payroll_sheet{payroll_sheet_id, personnel_number,
                                                   payment_date, static_cast<int>(sum), payment_type};
        result.push_back(payroll_sheet);
    }

    return result;
}

std::vector<ui::detail::PayrollSheetInfo> PayrollSheetRepositoryImpl::GetForPerson(int personnel_number) const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM ТабельУчетаЗарплаты ORDER BY НомерЗаписи;"s;

    auto resp = tr.query<int, int, std::string, double, std::string>(query);

    std::vector<ui::detail::PayrollSheetInfo> result;

    for (const auto& [payroll_sheet_id, personnel_num, payment_date,
                sum, payment_type] : resp) {
        if (personnel_number != personnel_num) {
            continue;
        }
        ui::detail::PayrollSheetInfo payroll_sheet{payroll_sheet_id, personnel_number,
                                                   payment_date, static_cast<int>(sum), payment_type};
        result.push_back(payroll_sheet);
    }

    return result;
}

int PayrollSheetRepositoryImpl::GetCount() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT COUNT(*) FROM ТабельУчетаЗарплаты;"s;

    auto count = tr.query_value<int>(query);

    return count;
}

std::vector<ui::detail::PersonnelEventInfo> PersonnelEventRepositoryImpl::Get() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM КадровоеСобытие ORDER BY НомерСобытия;"s;

    auto resp = tr.query<int, int, std::string, std::string, std::optional<std::string>>(query);

    std::vector<ui::detail::PersonnelEventInfo> result;

    for (auto& [personnel_event_id, personnel_number, event_date,
                event_type, comment] : resp) {
        ui::detail::PersonnelEventInfo personnel_event{personnel_event_id, personnel_number,
                                                       event_date, event_type, comment};
        result.push_back(personnel_event);
    }

    return result;
}

std::vector<ui::detail::PersonnelEventInfo> PersonnelEventRepositoryImpl::GetForPerson(int personnel_number) const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM КадровоеСобытие ORDER BY НомерСобытия;"s;

    auto resp = tr.query<int, int, std::string, std::string, std::optional<std::string>>(query);

    std::vector<ui::detail::PersonnelEventInfo> result;

    for (const auto& [personnel_event_id, personnel_num, event_date,
                event_type, comment] : resp) {
        if (personnel_number != personnel_num) {
            continue;
        }
        ui::detail::PersonnelEventInfo personnel_event{personnel_event_id, personnel_number,
                                                       event_date, event_type, comment};
        result.push_back(personnel_event);
    }

    return result;
}

int PersonnelEventRepositoryImpl::GetCount() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT COUNT(*) FROM КадровоеСобытие;"s;

    auto count = tr.query_value<int>(query);

    return count;
}

std::vector<ui::detail::StaffingTableInfo> StaffingTableRepositoryImpl::Get() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    DepartmentRepositoryImpl deps(pool_);

    std::string query = "SELECT * FROM ШтатноеРасписание ORDER BY IdРасписания;"s;

    auto resp = tr.query<int, int, std::string, int, double>(query);

    std::vector<ui::detail::StaffingTableInfo> result;

    for (auto& [staffing_table_id, department_id, job_title, time_job, salary] : resp) {
        ui::detail::StaffingTableInfo staffing_table{staffing_table_id, deps.GetDep(department_id), job_title, time_job, static_cast<int>(salary)};
        result.push_back(staffing_table);
    }

    return result;
}

int StaffingTableRepositoryImpl::GetCount() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT COUNT(*) FROM ШтатноеРасписание;"s;

    auto count = tr.query_value<int>(query);

    return count;
}

std::vector<ui::detail::TimeSheetInfo> TimeSheetRepositoryImpl::Get() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM ТабельУчетаРабочегоВремени ORDER BY НомерЗаписи;"s;

    auto resp = tr.query<int, int, std::string, std::optional<int>>(query);

    std::vector<ui::detail::TimeSheetInfo> result;

    for (auto& [time_sheet_id, personnel_number, date, time_worked] : resp) {
        ui::detail::TimeSheetInfo time_sheet{time_sheet_id, personnel_number, date, time_worked};
        result.push_back(time_sheet);
    }

    return result;
}

std::vector<ui::detail::TimeSheetInfo> TimeSheetRepositoryImpl::GetForPerson(int personnel_number) const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM ТабельУчетаРабочегоВремени ORDER BY НомерЗаписи;"s;

    auto resp = tr.query<int, int, std::string, std::optional<int>>(query);

    std::vector<ui::detail::TimeSheetInfo> result;

    for (const auto& [time_sheet_id, personnel_num, date, time_worked] : resp) {
        if (personnel_number != personnel_num) {
            continue;
        }
        ui::detail::TimeSheetInfo time_sheet{time_sheet_id, personnel_number, date, time_worked};
        result.push_back(time_sheet);
    }

    return result;
}

int TimeSheetRepositoryImpl::GetCount() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT COUNT(*) FROM ТабельУчетаРабочегоВремени;"s;

    auto count = tr.query_value<int>(query);

    return count;
}

std::vector<ui::detail::VacationInfo> VacationRepositoryImpl::Get() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM Отпуск ORDER BY НомерЗаписи;"s;

    auto resp = tr.query<int, int, std::string, std::string, std::string>(query);

    std::vector<ui::detail::VacationInfo> result;

    for (auto& [vacation_id, personnel_number, from_date, to_date, type] : resp) {
        ui::detail::VacationInfo vacation{vacation_id, personnel_number, from_date,
                                          to_date, type};
        result.push_back(vacation);
    }

    return result;
}

std::vector<ui::detail::VacationInfo> VacationRepositoryImpl::GetForPerson(int personnel_number) const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT * FROM Отпуск ORDER BY НомерЗаписи;"s;

    auto resp = tr.query<int, int, std::string, std::string, std::string>(query);

    std::vector<ui::detail::VacationInfo> result;

    for (const auto& [vacation_id, personnel_num, from_date, to_date, type] : resp) {
        if (personnel_number != personnel_num) {
            continue;
        }
        ui::detail::VacationInfo time_sheet{vacation_id, personnel_number, from_date,
                                            to_date, type};
        result.push_back(time_sheet);
    }

    return result;
}

int VacationRepositoryImpl::GetCount() const {
    auto conn = pool_.GetConnection();
    pqxx::read_transaction tr(*conn);

    std::string query = "SELECT COUNT(*) FROM Отпуск;"s;

    auto count = tr.query_value<int>(query);

    return count;
}

DataBase::DataBase(const std::string& db_url)
    : pool_{std::thread::hardware_concurrency(),
  [&db_url](){ return std::make_shared<pqxx::connection>(db_url); } }
    , deps_{pool_}
    , employees_{pool_}
    , payroll_sheet_{pool_}
    , personnel_events_{pool_}
    , staffing_table_{pool_}
    , time_sheet_{pool_}
    , vacations_{pool_} {}

WorkerImpl::WorkerImpl(pqxx::connection& conn) : conn_(conn), nontr_(conn) {}

void WorkerImpl::AddDepartment(const domain::Department& dep) {
    nontr_.exec_params(
        R"(
    INSERT INTO Отдел (КодОтдела, НазваниеОтдела, КонтактныйТелефон) VALUES ($1, $2, $3);
    )"_zv,
        dep.GetDepartmentId(), dep.GetDepName(), dep.GetNumber());
}

void WorkerImpl::UpdateDepartment(const domain::Department& dep) {
    nontr_.exec_params(
        R"(
    UPDATE Отдел SET НазваниеОтдела=$2, КонтактныйТелефон=$3 WHERE КодОтдела=$1;
    )"_zv,
        dep.GetDepartmentId(), dep.GetDepName(), dep.GetNumber());
}

void WorkerImpl::AddEmployee(const domain::Employee& employee) {
    if (employee.GetExperience().has_value()) {
        nontr_.exec_params(
            R"(
        INSERT INTO Сотрудник (IdСотрудника, КодОтдела, ФИО, Должность, Стаж,
                               КонтактныйТелефон, ЗаработнаяПлата, УровеньОбразования)
                               VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        )"_zv,
            employee.GetPersonnelNumber(), employee.GetDepartmentId(), employee.GetFullName(),
            employee.GetJobTitle(), *employee.GetExperience(), employee.GetNumber(),
            static_cast<double>(employee.GetSalary()), employee.GetEducation());
    }
    else {
        nontr_.exec_params(
            R"(
        INSERT INTO Сотрудник (IdСотрудника, КодОтдела, ФИО, Должность,
                               КонтактныйТелефон, ЗаработнаяПлата, УровеньОбразования)
                               VALUES ($1, $2, $3, $4, $5, $6, $7);
        )"_zv,
            employee.GetPersonnelNumber(), employee.GetDepartmentId(), employee.GetFullName(),
            employee.GetJobTitle(), employee.GetNumber(), static_cast<double>(employee.GetSalary()),
            employee.GetEducation());
    }
}

void WorkerImpl::UpdateEmployee(const domain::Employee& employee) {
    nontr_.exec_params(
        R"(
    UPDATE Сотрудник SET КодОтдела=$2, ФИО=$3, Должность=$4, Стаж=$5,
                               КонтактныйТелефон=$6, ЗаработнаяПлата=$7, УровеньОбразования=$8 WHERE IdСотрудника=$1;
    )"_zv,
        employee.GetPersonnelNumber(), employee.GetDepartmentId(), employee.GetFullName(),
            employee.GetJobTitle(), *employee.GetExperience(), employee.GetNumber(),
            static_cast<double>(employee.GetSalary()), employee.GetEducation());
}

void WorkerImpl::AddPayrollSheet(const domain::PayrollSheet& payroll_sheet) {
    nontr_.exec_params(
        R"(
    INSERT INTO ТабельУчетаЗарплаты (НомерЗаписи, IdСотрудника, ДатаВыплаты,
           Сумма, ТипВыплаты) VALUES ($1, $2, $3, $4, $5);
    )"_zv,
        payroll_sheet.GetPayrollSheetId(), payroll_sheet.GetPersonnelNumber(),
        payroll_sheet.GetPaymentDate(), static_cast<double>(payroll_sheet.GetSum()), payroll_sheet.GetPaymentType());
}

void WorkerImpl::UpdatePayrollSheet(const domain::PayrollSheet& payroll_sheet) {
    nontr_.exec_params(
        R"(
    UPDATE ТабельУчетаЗарплаты SET IdСотрудника=$2, ДатаВыплаты=$3,
           Сумма=$4, ТипВыплаты=$5 WHERE НомерЗаписи=$1;
    )"_zv,
        payroll_sheet.GetPayrollSheetId(), payroll_sheet.GetPersonnelNumber(),
        payroll_sheet.GetPaymentDate(), static_cast<double>(payroll_sheet.GetSum()), payroll_sheet.GetPaymentType());
}

void WorkerImpl::AddPersonnelEvent(const domain::PersonnelEvent& personnel_event) {
    if (personnel_event.GetComment().has_value()) {
        nontr_.exec_params(
            R"(
        INSERT INTO КадровоеСобытие (НомерСобытия, IdСотрудника, ДатаСобытия,
               ТипСобытия, Комментарий) VALUES ($1, $2, $3, $4, $5);
        )"_zv,
            personnel_event.GetPersonnelEventId(), personnel_event.GetPersonnelNumber(),
            personnel_event.GetEventDate(), personnel_event.GetEventType(), personnel_event.GetComment());
    }
    else {
        nontr_.exec_params(
            R"(
        INSERT INTO КадровоеСобытие (НомерСобытия, IdСотрудника, ДатаСобытия,
               ТипСобытия) VALUES ($1, $2, $3, $4);
        )"_zv,
            personnel_event.GetPersonnelEventId(), personnel_event.GetPersonnelNumber(),
            personnel_event.GetEventDate(), personnel_event.GetEventType());
    }
}

void WorkerImpl::UpdatePersonnelEvent(const domain::PersonnelEvent& personnel_event) {
    nontr_.exec_params(
        R"(
    UPDATE КадровоеСобытие SET IdСотрудника=$2, ДатаСобытия=$3,
               ТипСобытия=$4, Комментарий=$5 WHERE НомерСобытия=$1;
    )"_zv,
        personnel_event.GetPersonnelEventId(), personnel_event.GetPersonnelNumber(),
            personnel_event.GetEventDate(), personnel_event.GetEventType(), personnel_event.GetComment());
}

void WorkerImpl::AddStaffingTable(const domain::StaffingTable& staffing_table) {
    nontr_.exec_params(
        R"(
    INSERT INTO ШтатноеРасписание (IdРасписания, КодОтдела, Должность, КоличествоЕдиниц, Оклад)
                                   VALUES ($1, $2, $3, $4, $5);
    )"_zv,
        staffing_table.GetStaffingTableId(), staffing_table.GetDepartmentId(), staffing_table.GetJobTitle(),
        staffing_table.GetTimeJob(), static_cast<double>(staffing_table.GetSalary()));
}

void WorkerImpl::UpdateStaffingTable(const domain::StaffingTable& staffing_table) {
    nontr_.exec_params(
        R"(
    UPDATE ШтатноеРасписание SET КодОтдела=$2, Должность=$3, КоличествоЕдиниц=$4, Оклад=$5 WHERE IdРасписания=$1;
    )"_zv,
        staffing_table.GetStaffingTableId(), staffing_table.GetDepartmentId(), staffing_table.GetJobTitle(),
        staffing_table.GetTimeJob(), static_cast<double>(staffing_table.GetSalary()));
}

void WorkerImpl::AddTimeSheet(const domain::TimeSheet& time_sheet) {
    nontr_.exec_params(
        R"(
    INSERT INTO ТабельУчетаРабочегоВремени (НомерЗаписи, IdСотрудника, КоличествоОтработанныхЧасов, Дата) VALUES ($1, $2, $3, $4);
    )"_zv,
        time_sheet.GetTimeSheetId(), time_sheet.GetPersonnelNumber(), time_sheet.GetTimeWorked(), time_sheet.GetDate());
}

void WorkerImpl::UpdateTimeSheet(const domain::TimeSheet& time_sheet) {
    nontr_.exec_params(
        R"(
    UPDATE ТабельУчетаРабочегоВремени SET IdСотрудника=$2, КоличествоОтработанныхЧасов=$3, Дата=$4 WHERE НомерЗаписи=$1;
    )"_zv,
        time_sheet.GetTimeSheetId(), time_sheet.GetPersonnelNumber(), time_sheet.GetTimeWorked(), time_sheet.GetDate());
}

void WorkerImpl::AddVacation(const domain::Vacation& vacation) {
    nontr_.exec_params(
        R"(
    INSERT INTO Отпуск (НомерЗаписи, IdСотрудника, ДатаНачала,
                        ДатаОкончания, Тип)
                        VALUES ($1, $2, $3, $4, $5);
    )"_zv,
        vacation.GetVacationId(), vacation.GetPersonnelNumber(),
        vacation.GetFromDate(), vacation.GetToDate(), vacation.GetType());
}

void WorkerImpl::UpdateVacation(const domain::Vacation& vacation) {
    nontr_.exec_params(
        R"(
    UPDATE Отпуск SET IdСотрудника=$2, ДатаНачала=$3,
                      ДатаОкончания=$4, Тип=$5 WHERE НомерЗаписи=$1;
    )"_zv,
        vacation.GetVacationId(), vacation.GetPersonnelNumber(),
        vacation.GetFromDate(), vacation.GetToDate(), vacation.GetType());
}

WorkerImpl::~WorkerImpl() = default;

} // namespace postgres
