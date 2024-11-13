#pragma once

#include "../ui/view.h"

#include <memory>

namespace domain {

class Worker;

class Vacation {
  public:
    Vacation(int vacation_id, int personnel_number, std::string from_date,
             std::string to_date, std::string type) : vacation_id_(vacation_id)
                                                    , personnel_number_(personnel_number)
                                                    , from_date_(std::move(from_date))
                                                    , to_date_(std::move(to_date))
                                                    , type_(std::move(type)) {}

    int GetVacationId() const noexcept {
        return vacation_id_;
    }

    int GetPersonnelNumber() const noexcept {
        return personnel_number_;
    }

    const std::string& GetFromDate() const noexcept {
        return from_date_;
    }

    const std::string& GetToDate() const noexcept {
        return to_date_;
    }

    const std::string& GetType() const noexcept {
        return type_;
    }

  private:
    int vacation_id_;
    int personnel_number_;
    std::string from_date_;
    std::string to_date_;
    std::string type_;
};

class VacationRepository {
  public:
    virtual std::vector<ui::detail::VacationInfo> Get() const = 0;

    virtual std::shared_ptr<domain::Worker> GetWorker() const = 0;

    virtual int GetCount() const = 0;

  protected:
    ~VacationRepository() = default;
};

} // namespace domain
