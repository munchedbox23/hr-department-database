#pragma once

#include "../ui/view.h"

#include <memory>

namespace domain {

class Worker;

class StaffingTable {
  public:
    StaffingTable(int staffing_table_id, int department_id, std::string job_title,
                  int time_job, double salary) : staffing_table_id_(staffing_table_id)
                                            , department_id_(department_id)
                                            , job_title_(std::move(job_title))
                                            , time_job_(time_job)
                                            , salary_(salary) {}

    int GetStaffingTableId() const noexcept {
        return staffing_table_id_;
    }

    int GetDepartmentId() const noexcept {
        return department_id_;
    }

    const std::string& GetJobTitle() const noexcept {
        return job_title_;
    }

    int GetTimeJob() const noexcept {
        return time_job_;
    }

    double GetSalary() const noexcept {
        return salary_;
    }

  private:
    int staffing_table_id_;
    int department_id_;
    std::string job_title_;
    int time_job_;
    double salary_;
};

class StaffingTableRepository {
  public:
    virtual std::vector<ui::detail::StaffingTableInfo> Get() const = 0;

    virtual std::shared_ptr<domain::Worker> GetWorker() const = 0;

    virtual int GetCount() const = 0;

  protected:
    ~StaffingTableRepository() = default;
};

} // namespace domain
