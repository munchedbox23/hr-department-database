#pragma once

#include "../ui/view.h"

#include <memory>

namespace domain {

class Worker;

class TimeSheet {
  public:
    TimeSheet(int time_sheet_id, int personnel_number,
              std::string date, std::optional<int> time_worked) : time_sheet_id_(time_sheet_id)
                                                                , personnel_number_(personnel_number)
                                                                , date_(std::move(date))
                                                                , time_worked_(time_worked) {}

    int GetTimeSheetId() const noexcept {
        return time_sheet_id_;
    }

    int GetPersonnelNumber() const noexcept {
        return personnel_number_;
    }

    const std::string& GetDate() const noexcept {
        return date_;
    }

    std::optional<int> GetTimeWorked() const noexcept {
        return time_worked_;
    }

  private:
    int time_sheet_id_;
    int personnel_number_;
    std::string date_;
    std::optional<int> time_worked_;
};

class TimeSheetRepository {
  public:
    virtual std::vector<ui::detail::TimeSheetInfo> Get() const = 0;
    virtual std::vector<ui::detail::TimeSheetInfo> GetForPerson(int personnel_number) const = 0;

    virtual std::shared_ptr<domain::Worker> GetWorker() const = 0;

    virtual int GetCount() const = 0;

  protected:
    ~TimeSheetRepository() = default;
};

}; // namespace domain
