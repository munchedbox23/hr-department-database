#pragma once

#include "../ui/view.h"

#include <memory>

namespace domain {

class Worker;

class PersonnelEvent {
  public:
    PersonnelEvent(int personnel_event_id, int personnel_number, std::string event_date,
                   std::string event_type, std::optional<std::string> comment) : personnel_event_id_(personnel_event_id)
                                                                               , personnel_number_(personnel_number)
                                                                               , event_date_(std::move(event_date))
                                                                               , event_type_(std::move(event_type))
                                                                               , comment_(std::move(comment)) {}

    int GetPersonnelEventId() const noexcept {
        return personnel_event_id_;
    }

    int GetPersonnelNumber() const noexcept {
        return personnel_number_;
    }

    const std::string& GetEventDate() const noexcept {
        return event_date_;
    }

    const std::string& GetEventType() const noexcept {
        return event_type_;
    }

    const std::optional<std::string>& GetComment() const noexcept {
        return comment_;
    }

  private:
    int personnel_event_id_;
    int personnel_number_;
    std::string event_date_;
    std::string event_type_;
    std::optional<std::string> comment_;
};

class PersonnelEventRepository {
  public:
    virtual std::vector<ui::detail::PersonnelEventInfo> Get() const = 0;
    virtual std::vector<ui::detail::PersonnelEventInfo> GetForPerson(int personnel_number) const = 0;

    virtual std::shared_ptr<domain::Worker> GetWorker() const = 0;

    virtual int GetCount() const = 0;

  protected:
    ~PersonnelEventRepository() = default;
};

} // namespace domain
