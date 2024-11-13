#pragma once

#include "../ui/view.h"

#include <memory>

namespace domain {

class Worker;

class Department {
  public:
    Department(int department_id, std::string dep_name, std::string number) : department_id_(department_id)
                                                                            , dep_name_(std::move(dep_name))
                                                                            , number_(std::move(number)) {}

    int GetDepartmentId() const noexcept {
        return department_id_;
    }

    const std::string& GetDepName() const noexcept {
        return dep_name_;
    }

    const std::string& GetNumber() const noexcept {
        return number_;
    }

  private:
    int department_id_;
    std::string dep_name_;
    std::string number_;
};

class DepartmentRepository {
  public:
    virtual std::vector<ui::detail::DepartmentInfo> Get() const = 0;

    virtual std::shared_ptr<domain::Worker> GetWorker() const = 0;

    virtual int GetCount() const = 0;

    virtual std::string GetDep(int id) const = 0;
    virtual int GetDepId(const std::string& dep) const = 0;

  protected:
    ~DepartmentRepository() = default;
};

} // namespace domain
