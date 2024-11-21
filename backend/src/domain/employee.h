#pragma once

#include "../ui/view.h"

#include <memory>

namespace domain {

class Worker;

class Employee {
  public:
    Employee(int personnel_number, int department_id, std::string full_name,
             std::string job_title, std::optional<int> experience,
             std::string number, int salary, std::string education) : personnel_number_(personnel_number)
                                                                       , department_id_(department_id)
                                                                       , full_name_(std::move(full_name))
                                                                       , job_title_(std::move(job_title))
                                                                       , experience_(experience)
                                                                       , number_(std::move(number))
                                                                       , salary_(salary)
                                                                       , education_(std::move(education)) {}

    int GetPersonnelNumber() const noexcept {
        return personnel_number_;
    }

    int GetDepartmentId() const noexcept {
        return department_id_;
    }

    const std::string& GetFullName() const noexcept {
        return full_name_;
    }

    const std::string& GetJobTitle() const noexcept {
        return job_title_;
    }

    std::optional<int> GetExperience() const noexcept {
        return experience_;
    }

    const std::string& GetNumber() const noexcept {
        return number_;
    }

    int GetSalary() const noexcept {
        return salary_;
    }

    const std::string& GetEducation() const noexcept {
        return education_;
    }

  private:
    int personnel_number_;
    int department_id_;
    std::string full_name_;
    std::string job_title_;
    std::optional<int> experience_;
    std::string number_;
    int salary_;
    std::string education_;
};

class EmployeeRepository {
  public:
    virtual std::vector<ui::detail::EmployeeInfo> Get() const = 0;

    virtual std::shared_ptr<domain::Worker> GetWorker() const = 0;

    virtual int GetCount() const = 0;

  protected:
    ~EmployeeRepository() = default;
};

} // namespace domain
