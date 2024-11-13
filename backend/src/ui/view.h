#pragma once

#include <boost/json.hpp>
#include <chrono>
#include <iosfwd>
#include <optional>
#include <sstream>
#include <string>
#include <variant>
#include <vector>

namespace app {
class UseCases;
} // namespace app

namespace ui {

namespace detail {
namespace json = boost::json;
using namespace std::literals;

struct DepartmentInfo {
    int department_id;
    std::string dep_name;
    std::string number;

    friend void tag_invoke (json::value_from_tag, json::value& jv,
                            const ui::detail::DepartmentInfo& department) {
        jv = {
            {"КодОтдела"s, department.department_id},
            {"НазваниеОтдела"s, department.dep_name},
            {"КонтактныйТелефон"s, department.number}
        };
    }

    friend ui::detail::DepartmentInfo
    tag_invoke(json::value_to_tag<ui::detail::DepartmentInfo>&, const
               json::value& department) {
        ui::detail::DepartmentInfo dep;

        dep.department_id = department.at("КодОтдела").as_int64();
        dep.dep_name = department.at("НазваниеОтдела").as_string();
        dep.number = department.at("КонтактныйТелефон").as_string();

        return dep;
    }
};

struct EmployeeInfo {
    int personnel_number;
    std::variant<std::string, int> department;
    std::string full_name;
    std::string job_title;
    std::optional<int> experience;
    std::string number;
    double salary;
    std::string education;

    friend void tag_invoke(json::value_from_tag, json::value& jv,
                           const ui::detail::EmployeeInfo& employee) {
        jv = {
            {"IdСотрудника"s, employee.personnel_number},
            {"КодОтдела"s, std::get<std::string>(employee.department)},
            {"ФИО"s, employee.full_name},
            {"Должность"s, employee.job_title},
            {"Стаж"s, employee.experience ? std::to_string(*employee.experience)
: "NULL"s},
            {"КонтактныйТелефон"s, employee.number},
            {"ЗаработнаяПлата"s, employee.salary},
            {"УровеньОбразования"s, employee.education}
        };
    }

    friend ui::detail::EmployeeInfo
    tag_invoke(json::value_to_tag<ui::detail::EmployeeInfo>&, const json::value&
               employee) {
        ui::detail::EmployeeInfo emp;

        emp.personnel_number = employee.at("IdСотрудника").as_int64();
        emp.department = static_cast<int>(employee.at("КодОтдела").as_int64());
        emp.full_name = employee.at("ФИО").as_string();
        emp.job_title = employee.at("Должность").as_string();
        if (employee.as_object().if_contains("Стаж")) {
            if (employee.at("Стаж").is_int64()) {
                emp.experience = employee.at("Стаж").as_int64();
            }
            if (employee.at("Стаж").is_string()) {
                emp.experience = std::stoi(employee.at("Стаж").as_string().c_str());
            }
        }
        emp.number = employee.at("КонтактныйТелефон").as_string();
        emp.salary = employee.at("ЗаработнаяПлата").as_double();
        emp.education = employee.at("УровеньОбразования").as_string();

        return emp;
    }
};

struct PayrollSheetInfo {
    int payroll_sheet_id;
    int personnel_number;
    std::string payment_date;
    double sum;
    std::string payment_type;

    friend void tag_invoke(json::value_from_tag, json::value& jv, const
                           ui::detail::PayrollSheetInfo& payroll_sheet) {
        jv = {
            {"НомерЗаписи"s, payroll_sheet.payroll_sheet_id},
            {"IdСотрудника"s, payroll_sheet.personnel_number},
            {"ДатаВыплаты"s, payroll_sheet.payment_date},
            {"Сумма"s, payroll_sheet.sum},
            {"ТипВыплаты"s, payroll_sheet.payment_type}
        };
    }

    friend ui::detail::PayrollSheetInfo
tag_invoke(json::value_to_tag<ui::detail::PayrollSheetInfo>&, const json::value&
payroll_sheet) { ui::detail::PayrollSheetInfo p_sheet;

        p_sheet.payroll_sheet_id = payroll_sheet.at("НомерЗаписи").as_int64();
        p_sheet.personnel_number = payroll_sheet.at("IdСотрудника").as_int64();
        p_sheet.payment_date = payroll_sheet.at("ДатаВыплаты").as_string();
        p_sheet.sum = payroll_sheet.at("Сумма").as_double();
        p_sheet.payment_type = payroll_sheet.at("ТипВыплаты").as_string();

        return p_sheet;
    }
};

struct PersonnelEventInfo {
    int personnel_event_id;
    int personnel_number;
    std::string event_date;
    std::string event_type;
    std::optional<std::string> comment;

    friend void tag_invoke(json::value_from_tag, json::value& jv, const
                           ui::detail::PersonnelEventInfo& personnel_event) {
        jv = {
            {"НомерСобытия"s, personnel_event.personnel_event_id},
            {"IdСотрудника"s, personnel_event.personnel_number},
            {"ДатаСобытия"s, personnel_event.event_date},
            {"ТипСобытия"s, personnel_event.event_type},
            {"Комментарий"s, personnel_event.comment ? *personnel_event.comment : "NULL"s}
        };
    }

    friend ui::detail::PersonnelEventInfo
    tag_invoke(json::value_to_tag<ui::detail::PersonnelEventInfo>&, const
               json::value& personnel_event) {
        ui::detail::PersonnelEventInfo p_event;

        p_event.personnel_event_id = personnel_event.at("НомерСобытия").as_int64();
        p_event.personnel_number = personnel_event.at("IdСотрудника").as_int64();
        p_event.event_date = personnel_event.at("ДатаСобытия").as_string();
        p_event.event_type = personnel_event.at("ТипСобытия").as_string();
        if (personnel_event.as_object().if_contains("Комментарий")) {
            p_event.comment = personnel_event.at("Комментарий").as_string();
        }

        return p_event;
    }
};

struct StaffingTableInfo {
    int staffing_table_id;
    std::variant<std::string, int> department;
    std::string job_title;
    int time_job;
    double salary;

    friend void tag_invoke(json::value_from_tag, json::value& jv,
                           const ui::detail::StaffingTableInfo& staffing_table) {
        jv = {
            {"IdРасписания"s, staffing_table.staffing_table_id},
            {"КодОтдела"s, std::get<std::string>(staffing_table.department)},
            {"Должность"s, staffing_table.job_title},
            {"КоличествоЕдиниц"s, staffing_table.time_job},
            {"Оклад"s, staffing_table.salary}
        };
    }

    friend ui::detail::StaffingTableInfo
    tag_invoke(json::value_to_tag<ui::detail::StaffingTableInfo>&, const
               json::value& staffing_table) {
        ui::detail::StaffingTableInfo staf_t;

        staf_t.staffing_table_id = staffing_table.at("IdРасписания").as_int64();
        staf_t.department = static_cast<int>(staffing_table.at("КодОтдела").as_int64());
        staf_t.job_title = staffing_table.at("Должность").as_string();
        staf_t.time_job = staffing_table.at("КоличествоЕдиниц").as_int64();
        staf_t.salary = staffing_table.at("Оклад").as_double();

        return staf_t;
    }
};

struct TimeSheetInfo {
    int time_sheet_id;
    int personnel_number;
    std::string date;
    std::optional<int> time_worked;

    friend void tag_invoke(json::value_from_tag, json::value& jv,
                           const ui::detail::TimeSheetInfo& time_sheet) {
        jv = {
            {"НомерЗаписи"s, time_sheet.time_sheet_id},
            {"IdСотрудника"s, time_sheet.personnel_number},
            {"Дата"s, time_sheet.date},
            {"КоличествоОтработанныхЧасов"s, time_sheet.time_worked ? std::to_string(*time_sheet.time_worked) : "NULL"s}
        };
    }

    friend ui::detail::TimeSheetInfo
    tag_invoke(json::value_to_tag<ui::detail::TimeSheetInfo>&, const
               json::value& time_sheet) {
        ui::detail::TimeSheetInfo time_s;

        time_s.time_sheet_id = time_sheet.at("НомерЗаписи").as_int64();
        time_s.personnel_number = time_sheet.at("IdСотрудника").as_int64();
        time_s.date = time_sheet.at("Дата").as_string();
        if (time_sheet.as_object().if_contains("КоличествоОтработанныхЧасов")) {
            time_s.time_worked = time_sheet.at("КоличествоОтработанныхЧасов").as_int64();
        }

        return time_s;
    }
};

struct VacationInfo {
    int vacation_id;
    int personnel_number;
    std::string from_date;
    std::string to_date;
    std::string type;

    friend void tag_invoke(json::value_from_tag, json::value& jv,
                           const ui::detail::VacationInfo& vacation) {
        jv = {
            {"НомерЗаписи"s, vacation.vacation_id},
            {"IdСотрудника"s, vacation.personnel_number},
            {"ДатаНачала"s, vacation.from_date},
            {"ДатаОкончания"s, vacation.to_date},
            {"Тип"s, vacation.type}
        };
    }

    friend ui::detail::VacationInfo
    tag_invoke(json::value_to_tag<ui::detail::VacationInfo>&, const json::value&
               vacation) {
        ui::detail::VacationInfo vac;

        vac.vacation_id = vacation.at("НомерЗаписи").as_int64();
        vac.personnel_number = vacation.at("IdСотрудника").as_int64();
        vac.from_date = vacation.at("ДатаНачала").as_string();
        vac.to_date = vacation.at("ДатаОкончания").as_string();
        vac.type = vacation.at("Тип").as_string();

        return vac;
    }
};

} // namespace detail

} // namespace ui
