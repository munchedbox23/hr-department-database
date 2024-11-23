#pragma once

#include "../connection_pool.h"
#include "../domain/worker.h"
#include "../ui/view.h"

#include <pqxx/connection>
#include <pqxx/transaction>

#include <memory>
#include <vector>

namespace postgres {

class WorkerImpl : public domain::Worker {
  public:
    explicit WorkerImpl(pqxx::connection& conn);

    void AddDepartment(const domain::Department& dep) override;
    void UpdateDepartment(const domain::Department& dep) override;

    void AddEmployee(const domain::Employee& employee) override;
    void UpdateEmployee(const domain::Employee& employee) override;

    void AddPayrollSheet(const domain::PayrollSheet& payroll_sheet) override;
    void UpdatePayrollSheet(const domain::PayrollSheet& payroll_sheet) override;

    void AddPersonnelEvent(const domain::PersonnelEvent& personnel_event) override;
    void UpdatePersonnelEvent(const domain::PersonnelEvent& personnel_event) override;

    void AddStaffingTable(const domain::StaffingTable& staffing_table) override;
    void UpdateStaffingTable(const domain::StaffingTable& staffing_table) override;

    void AddTimeSheet(const domain::TimeSheet& time_sheet) override;
    void UpdateTimeSheet(const domain::TimeSheet& time_sheet) override;

    void AddVacation(const domain::Vacation& vacation) override;
    void UpdateVacation(const domain::Vacation& vacation) override;

    ~WorkerImpl() override;

  private:
    pqxx::connection& conn_;
    pqxx::nontransaction nontr_;
};

class DepartmentRepositoryImpl : public domain::DepartmentRepository {
  public:
    explicit DepartmentRepositoryImpl(connection_pool::ConnectionPool& pool) : pool_{pool} {}

    std::vector<ui::detail::DepartmentInfo> Get() const override;

    std::shared_ptr<domain::Worker> GetWorker() const override {
        auto conn = pool_.GetConnection();
        return std::make_shared<WorkerImpl>(*conn);
    }

    int GetCount() const override;

    std::string GetDep(int id) const override;
    int GetDepId(const std::string& dep) const override;

  private:
    connection_pool::ConnectionPool& pool_;
};

class EmployeeRepositoryImpl : public domain::EmployeeRepository {
  public:
    explicit EmployeeRepositoryImpl(connection_pool::ConnectionPool& pool) : pool_{pool} {}

    std::vector<ui::detail::EmployeeInfo> Get() const override;
    std::vector<ui::detail::EmployeeInfo> GetForPerson(int personnel_number) const override;

    std::shared_ptr<domain::Worker> GetWorker() const override {
        auto conn = pool_.GetConnection();
        return std::make_shared<WorkerImpl>(*conn);
    }

    int GetCount() const override;

    std::unordered_set<std::string> GetNumbers() const override;
    int GetPersonnelNumberForPhoneNumber(const std::string& number) const override;

  private:
    connection_pool::ConnectionPool& pool_;
};

class PayrollSheetRepositoryImpl : public domain::PayrollSheetRepository {
  public:
    explicit PayrollSheetRepositoryImpl(connection_pool::ConnectionPool& pool) : pool_{pool} {}

    std::vector<ui::detail::PayrollSheetInfo> Get() const override;
    std::vector<ui::detail::PayrollSheetInfo> GetForPerson(int personnel_number) const override;

    std::shared_ptr<domain::Worker> GetWorker() const override {
        auto conn = pool_.GetConnection();
        return std::make_shared<WorkerImpl>(*conn);
    }

    int GetCount() const override;

  private:
    connection_pool::ConnectionPool& pool_;
};

class PersonnelEventRepositoryImpl : public domain::PersonnelEventRepository {
  public:
    explicit PersonnelEventRepositoryImpl(connection_pool::ConnectionPool& pool) : pool_{pool} {}

    std::vector<ui::detail::PersonnelEventInfo> Get() const override;
    std::vector<ui::detail::PersonnelEventInfo> GetForPerson(int personnel_number) const override;

    std::shared_ptr<domain::Worker> GetWorker() const override {
        auto conn = pool_.GetConnection();
        return std::make_shared<WorkerImpl>(*conn);
    }

    int GetCount() const override;

  private:
    connection_pool::ConnectionPool& pool_;
};

class StaffingTableRepositoryImpl : public domain::StaffingTableRepository {
  public:
    explicit StaffingTableRepositoryImpl(connection_pool::ConnectionPool& pool) : pool_{pool} {}

    std::vector<ui::detail::StaffingTableInfo> Get() const override;

    std::shared_ptr<domain::Worker> GetWorker() const override {
        auto conn = pool_.GetConnection();
        return std::make_shared<WorkerImpl>(*conn);
    }

    int GetCount() const override;

  private:
    connection_pool::ConnectionPool& pool_;
};

class TimeSheetRepositoryImpl : public domain::TimeSheetRepository {
  public:
    explicit TimeSheetRepositoryImpl(connection_pool::ConnectionPool& pool) : pool_{pool} {}

    std::vector<ui::detail::TimeSheetInfo> Get() const override;
    std::vector<ui::detail::TimeSheetInfo> GetForPerson(int personnel_number) const override;

    std::shared_ptr<domain::Worker> GetWorker() const override {
        auto conn = pool_.GetConnection();
        return std::make_shared<WorkerImpl>(*conn);
    }

    int GetCount() const override;

  private:
    connection_pool::ConnectionPool& pool_;
};

class VacationRepositoryImpl : public domain::VacationRepository {
  public:
    explicit VacationRepositoryImpl(connection_pool::ConnectionPool& pool) : pool_{pool} {}

    std::vector<ui::detail::VacationInfo> Get() const override;
    std::vector<ui::detail::VacationInfo> GetForPerson(int personnel_number) const override;

    std::shared_ptr<domain::Worker> GetWorker() const override {
        auto conn = pool_.GetConnection();
        return std::make_shared<WorkerImpl>(*conn);
    }

    int GetCount() const override;

  private:
    connection_pool::ConnectionPool& pool_;
};

class DataBase {
  public:
    explicit DataBase(const std::string& db_url);

    DepartmentRepositoryImpl& GetDepartments() & {
        return deps_;
    }

    EmployeeRepositoryImpl& GetEmployees() & {
        return employees_;
    }

    PayrollSheetRepositoryImpl& GetPayrollSheet() & {
        return payroll_sheet_;
    }

    PersonnelEventRepositoryImpl& GetPersonnelEvents() & {
        return personnel_events_;
    }

    StaffingTableRepositoryImpl& GetStaffingTable() & {
        return staffing_table_;
    }

    TimeSheetRepositoryImpl& GetTimeSheet() & {
        return time_sheet_;
    }

    VacationRepositoryImpl& GetVacations() & {
        return vacations_;
    }

  private:
    connection_pool::ConnectionPool pool_;
    DepartmentRepositoryImpl deps_;
    EmployeeRepositoryImpl employees_;
    PayrollSheetRepositoryImpl payroll_sheet_;
    PersonnelEventRepositoryImpl personnel_events_;
    StaffingTableRepositoryImpl staffing_table_;
    TimeSheetRepositoryImpl time_sheet_;
    VacationRepositoryImpl vacations_;
};

}  // namespace postgres
