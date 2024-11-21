#pragma once

#include "../ui/view.h"

#include <memory>

namespace domain {

class Worker;

class PayrollSheet {
  public:
    PayrollSheet(int payroll_sheet_id, int personnel_number,
                 std::string payment_date, int sum,
                 std::string payment_type) : payroll_sheet_id_(payroll_sheet_id)
                                           , personnel_number_(personnel_number)
                                           , payment_date_(std::move(payment_date))
                                           , sum_(sum)
                                           , payment_type_(std::move(payment_type)) {}

    int GetPayrollSheetId() const noexcept {
        return payroll_sheet_id_;
    }

    int GetPersonnelNumber() const noexcept {
        return personnel_number_;
    }

    const std::string& GetPaymentDate() const noexcept {
        return payment_date_;
    }

    int GetSum() const noexcept {
        return sum_;
    }

    const std::string& GetPaymentType() const noexcept {
        return payment_type_;
    }

  private:
    int payroll_sheet_id_;
    int personnel_number_;
    std::string payment_date_;
    int sum_;
    std::string payment_type_;
};

class PayrollSheetRepository {
  public:
    virtual std::vector<ui::detail::PayrollSheetInfo> Get() const = 0;

    virtual std::shared_ptr<domain::Worker> GetWorker() const = 0;

    virtual int GetCount() const = 0;

  protected:
    ~PayrollSheetRepository() = default;
};

} // namespace domain
