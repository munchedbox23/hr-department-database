#include "api_handler.h"

#include <algorithm>

#include <iostream>

namespace {

std::string CleanErrorMessage(const std::string& message) {
    std::string cleaned_message = message;

    size_t detail_pos = message.find("DETAIL:");
    if (detail_pos != std::string::npos) {
        cleaned_message = message.substr(detail_pos + 9);
    }

    cleaned_message.erase(std::remove(cleaned_message.begin(), cleaned_message.end(), '\"'), cleaned_message.end());
    cleaned_message.erase(std::remove(cleaned_message.begin(), cleaned_message.end(), '\n'), cleaned_message.end());

    return cleaned_message;
}

std::string GetCurrentDate() {
    const auto now = std::chrono::system_clock::now();
    const auto t_c = std::chrono::system_clock::to_time_t(now);
    std::ostringstream oss;
    oss << std::put_time(std::gmtime(&t_c), "%Y-%m-%d");
    return oss.str();
}

} // namespace

namespace api_handler {

bool ApiHandler::CheckEndPath() {
    return req_info_.target == "/"sv || req_info_.target.empty();
}

std::string ApiHandler::FindAndCutTarget(RequestInfo& req) {
    std::string res;

    size_t q_pos = req.target.find_last_of('?');

    size_t pos = req.target.find_first_of('/', 1);

    if (pos != req.target.npos) {
        res = req.target.substr(0, pos);
        req.target = req.target.substr(res.size());
        return res;
    }

    res = req.target;
    req.target = "";
    return res;
}

void ApiHandler::HandleApiResponse() {
    std::string path_part = FindAndCutTarget(req_info_);

    if (path_part == "/add"s) {
        HandleAdd();
    }
    else if (path_part == "/get"s) {
        HandleGet();
    }
    else if (path_part == "/get-personal-info"s) {
        HandleGetPersonalInfo();
    }
    /*
    else if (path_part == "/update"s) {
        HandleUpdate();
    }
    */
    else if (path_part == "/register"s) {
        HandleRegister();
    }
    else if (path_part == "/login"s) {
        HandleLogin();
    }
    else if (path_part == "/logout"s) {
        HandleLogout();
    }
    else if (path_part == "/token"s) {
        HandleToken();
    }
    else if (path_part == "/user"s) {
        HandleUser();
    }
    else {
        SendBadRequestResponseDefault();
    }
}

void ApiHandler::HandleAdd() {
    std::string path_part = FindAndCutTarget(req_info_);

    if (path_part == "/department"s) {
        HandleAddDepartment();
    }
    else if (path_part == "/employee"s) {
        HandleAddEmployee();
    }
    else if (path_part == "/payroll-sheet"s) {
        HandleAddPayrollSheet();
    }
    else if (path_part == "/personnel-event"s) {
        HandleAddPersonnelEvent();
    }
    else if (path_part == "/staffing-table"s) {
        HandleAddStaffingTable();
    }
    else if (path_part == "/time-sheet"s) {
        HandleAddTimeSheet();
    }
    else if (path_part == "/vacation"s) {
        HandleAddVacation();
    }
    else {
        SendNotFoundResponse();
    }
}

void ApiHandler::HandleAddDepartment() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value jv = json::parse(req_info_.body);
    jv.as_object()["КодОтдела"] = json::value(application_.GetUseCases().GetCountDepartments() + 1);

    ui::detail::DepartmentInfo dep = json::value_to<ui::detail::DepartmentInfo>(jv);

    try {
        application_.GetUseCases().AddDepartment(dep);
        return SendOkResponse({});
    }
    catch (const std::exception& e) {
        return SendBadRequestResponse(CleanErrorMessage(e.what()));
    }

    SendBadRequestResponseDefault();
}

void ApiHandler::HandleAddEmployee() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value jv = json::parse(req_info_.body);
    jv.as_object()["IdСотрудника"] = json::value(application_.GetUseCases().GetCountEmployees() + 1);

    std::string department;
    department = jv.at("КодОтдела").as_string();
    jv.as_object()["КодОтдела"] = application_.GetUseCases().GetDepartmentId(department);
    if (jv.at("КодОтдела").as_int64() == -1) {
        return SendBadRequestResponse("Ошибка Отдел не существует"s);
    }

    if (jv.as_object().if_contains("Стаж")) {
        int experience = std::stoi((jv.at("Стаж").as_string()).c_str());
        if (experience < 0) {
            return SendBadRequestResponse("Ошибка Стаж < 0"s);
        }
    }

    int salary = jv.at("ЗаработнаяПлата").as_int64();
    if (salary <= 0) {
        return SendBadRequestResponse("Ошибка ЗаработнаяПлата <= 0"s);
    }

    std::string education;
    education = jv.at("УровеньОбразования").as_string();
    if (!(education == "среднее"s || education == "высшее"s)) {
        return SendBadRequestResponse("Ошибка УровеньОбразования != среднее или высшее"s);
    }

    ui::detail::EmployeeInfo employee = json::value_to<ui::detail::EmployeeInfo>(jv);

    try {
        application_.GetUseCases().AddEmployee(employee);
        return SendOkResponse({});
    }
    catch (const std::exception& e) {
        return SendBadRequestResponse(CleanErrorMessage(e.what()));
    }

    SendBadRequestResponseDefault();
}

void ApiHandler::HandleAddPayrollSheet() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value jv = json::parse(req_info_.body);
    jv.as_object()["НомерЗаписи"] = json::value(application_.GetUseCases().GetCountPayrollSheet() + 1);

    std::string date;
    date = jv.at("ДатаВыплаты").as_string();
    if (date > GetCurrentDate()) {
        return SendBadRequestResponse("Ошибка ДатаВыплаты > текущей даты"s);
    }

    int sum = jv.at("Сумма").as_int64();
    if (sum <= 0) {
        return SendBadRequestResponse("Ошибка Сумма <= 0"s);
    }

    ui::detail::PayrollSheetInfo payroll_sheet = json::value_to<ui::detail::PayrollSheetInfo>(jv);

    try {
        application_.GetUseCases().AddPayrollSheet(payroll_sheet);
        return SendOkResponse({});
    }
    catch (const std::exception& e) {
        return SendBadRequestResponse(CleanErrorMessage(e.what()));
    }

    SendBadRequestResponseDefault();
}

void ApiHandler::HandleAddPersonnelEvent() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value jv = json::parse(req_info_.body);
    jv.as_object()["НомерСобытия"] = json::value(application_.GetUseCases().GetCountPersonnelEvents() + 1);

    ui::detail::PersonnelEventInfo pers_event = json::value_to<ui::detail::PersonnelEventInfo>(jv);

    try {
        application_.GetUseCases().AddPersonnelEvent(pers_event);
        return SendOkResponse({});
    }
    catch (const std::exception& e) {
        return SendBadRequestResponse(CleanErrorMessage(e.what()));
    }

    SendBadRequestResponseDefault();
}

void ApiHandler::HandleAddStaffingTable() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value jv = json::parse(req_info_.body);
    jv.as_object()["IdРасписания"] = json::value(application_.GetUseCases().GetCountStaffingTable() + 1);

    std::string department;
    department = jv.at("КодОтдела").as_string();
    jv.as_object()["КодОтдела"] = application_.GetUseCases().GetDepartmentId(department);
    if (jv.at("КодОтдела").as_int64() == -1) {
        return SendBadRequestResponse("Ошибка Отдел не существует"s);
    }

    int salary = jv.at("Оклад").as_int64();
    if (salary <= 0) {
        return SendBadRequestResponse("Ошибка Оклад <= 0"s);
    }

    ui::detail::StaffingTableInfo staffing_table = json::value_to<ui::detail::StaffingTableInfo>(jv);

    try {
        application_.GetUseCases().AddStaffingTable(staffing_table);
        return SendOkResponse({});
    }
    catch (const std::exception& e) {
        return SendBadRequestResponse(CleanErrorMessage(e.what()));
    }

    SendBadRequestResponseDefault();
}

void ApiHandler::HandleAddTimeSheet() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value jv = json::parse(req_info_.body);
    jv.as_object()["НомерЗаписи"] = json::value(application_.GetUseCases().GetCountTimeSheet() + 1);

    if (jv.as_object().if_contains("КоличествоОтработанныхЧасов")) {
        int time_worked = jv.at("КоличествоОтработанныхЧасов").as_int64();
        if (time_worked < 0) {
            return SendBadRequestResponse("Ошибка КоличествоОтработанныхЧасов < 0"s);
        }
    }

    std::string date;
    date = jv.at("Дата").as_string();
    if (date > GetCurrentDate()) {
        return SendBadRequestResponse("Ошибка Дата > текущей даты"s);
    }

    ui::detail::TimeSheetInfo time_sheet = json::value_to<ui::detail::TimeSheetInfo>(jv);

    try {
        application_.GetUseCases().AddTimeSheet(time_sheet);
        return SendOkResponse({});
    }
    catch (const std::exception& e) {
        return SendBadRequestResponse(CleanErrorMessage(e.what()));
    }

    SendBadRequestResponseDefault();
}

void ApiHandler::HandleAddVacation() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value jv = json::parse(req_info_.body);
    jv.as_object()["НомерЗаписи"] = json::value(application_.GetUseCases().GetCountVacations() + 1);

    std::string from_date;
    std::string to_date;
    from_date = jv.at("ДатаНачала").as_string();
    to_date = jv.at("ДатаОкончания").as_string();
    if (from_date > to_date) {
        return SendBadRequestResponse("Ошибка ДатаНачала > ДатаОкончания"s);
    }

    ui::detail::VacationInfo vacation = json::value_to<ui::detail::VacationInfo>(jv);

    try {
        application_.GetUseCases().AddVacation(vacation);
        return SendOkResponse({});
    }
    catch (const std::exception& e) {
        return SendBadRequestResponse(CleanErrorMessage(e.what()));
    }

    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGet() {
    std::string path_part = FindAndCutTarget(req_info_);

    if (path_part == "/department"s) {
        HandleGetDepartments();
    }
    else if (path_part == "/employee"s) {
        HandleGetEmployees();
    }
    else if (path_part == "/payroll-sheet"s) {
        HandleGetPayrollSheet();
    }
    else if (path_part == "/personnel-event"s) {
        HandleGetPersonnelEvents();
    }
    else if (path_part == "/staffing-table"s) {
        HandleGetStaffingTable();
    }
    else if (path_part == "/time-sheet"s) {
        HandleGetTimeSheet();
    }
    else if (path_part == "/vacation"s) {
        HandleGetVacations();
    }
    else {
        SendNotFoundResponse();
    }
}

void ApiHandler::HandleGetDepartments() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetDepartments());
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetEmployees() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetEmployees());
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetStaffingTable() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetStaffingTable());
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetPayrollSheet() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetPayrollSheet());
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetPersonnelEvents() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetPersonnelEvents());
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetTimeSheet() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetTimeSheet());
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetVacations() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetVacations());
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetPersonalInfo() {
    std::string path_part = FindAndCutTarget(req_info_);

    if (path_part == "/department"s) {
        HandleGetDepartmentsForPerson();
    }
    else if (path_part == "/employee"s) {
        HandleGetEmployeeForPerson();
    }
    else if (path_part == "/payroll-sheet"s) {
        HandleGetPayrollSheetForPerson();
    }
    else if (path_part == "/personnel-event"s) {
        HandleGetPersonnelEventsForPerson();
    }
    else if (path_part == "/staffing-table"s) {
        HandleGetStaffingTableForPerson();
    }
    else if (path_part == "/time-sheet"s) {
        HandleGetTimeSheetForPerson();
    }
    else if (path_part == "/vacation"s) {
        HandleGetVacationForPerson();
    }
    else {
        SendNotFoundResponse();
    }
}

void ApiHandler::HandleGetDepartmentsForPerson() {
    HandleGetDepartments();
}

void ApiHandler::HandleGetEmployeeForPerson() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetEmployeeForPerson(personnel_number_));
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetPayrollSheetForPerson() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetPayrollSheetForPerson(personnel_number_));
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetPersonnelEventsForPerson() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetPersonnelEventsForPerson(personnel_number_));
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetStaffingTableForPerson() {
    HandleGetStaffingTable();
}

void ApiHandler::HandleGetTimeSheetForPerson() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetTimeSheetForPerson(personnel_number_));
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleGetVacationForPerson() {
    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }
    if (CheckEndPath()) {
        json::value jv = json::value_from(application_.GetUseCases().GetVacationForPerson(personnel_number_));
        return SendOkResponse(json::serialize(jv));
    }
    SendBadRequestResponseDefault();
}

void ApiHandler::HandleRegister() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value person = json::parse(req_info_.body);

    if (person.as_object().contains("email"s) && person.as_object().contains("password"s) && person.as_object().contains("name"s) && person.as_object().contains("role")) {
        if (person.at("role").as_string() == "admin"s && person.as_object().contains("number")) {
            return SendBadRequestResponse("Invalid register format"s, "invalidRegister"s);
        }
        else if (person.at("role").as_string() == "employee"s && !person.as_object().contains("number")) {
            return SendBadRequestResponse("Invalid register format"s, "invalidRegister"s);
        }
    }
    else {
        return SendBadRequestResponse("Invalid register format"s, "invalidRegister"s);
    }

    std::string email;
    std::string password;
    std::string name;
    std::string role;
    std::string number;

    email = person.at("email").as_string();
    password = person.at("password").as_string();
    name = person.at("name").as_string();
    role = person.at("role").as_string();
    last_role_ = role;
    if (role == "employee") {
        number = person.at("number").as_string();

        std::unordered_set<std::string> numbers = application_.GetUseCases().GetNumbers();
        try {
            personnel_number_ = application_.GetUseCases().GetPersonnelNumberForPhoneNumber(number);
        }
        catch (...) {
            return SendBadRequestResponse("Неправильный номер"s);
        }

        if (!numbers.contains(number)) {
            return SendBadRequestResponse("Сотрудник не найден"s);
        }
    }

    std::string access_token = GetUniqueToken();
    std::string refresh_token = GetUniqueToken();

    Person p{email, password, role};
    PersonInfo p_info{email, password, name, role};

    persons_.insert({p, name});
    tokens_[p_info] = {access_token, refresh_token, TimeTracker{}};
    auth_to_person_[access_token] = p_info;

    json::value jv {
        {"success"s, true},
        {"user"s, {
                {"email"s, email},
                {"name"s, name},
                {"role"s, role}
            }},
        {"accessToken"s, "Bearer "s + access_token},
        {"refreshToken"s, refresh_token}
    };

    refresh_tokens_.push_back(refresh_token);
    refresh_token_to_person_[refresh_token] = p_info;

    SendOkResponse(json::serialize(jv));
}

void ApiHandler::HandleLogin() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value person = json::parse(req_info_.body);

    if (!person.as_object().contains("email"s) || !person.as_object().contains("password"s)) {
        return SendNoAuthResponse("Invalid login format"s, "invalidLogin"s);
    }

    std::string email;
    std::string password;
    std::string role = last_role_;

    email = person.at("email").as_string();
    password = person.at("password").as_string();
    Person p{email, password, role};

    if (persons_.contains(p)) {
        PersonInfo p_info{email, password, persons_[p], role};
        if (tokens_.contains(p_info)) {
            json::value jv {
                {"success"s, true},
                {"accessToken"s, "Bearer "s + tokens_[p_info].access_token},
                {"refreshToken"s, tokens_[p_info].refresh_token},
                {"user"s, {
                        {"email"s, p_info.email},
                        {"name"s, p_info.name},
                        {"role"s, p_info.role}
                    }}
            };
            return SendOkResponse(json::serialize(jv));
        }
    }
    SendNoAuthResponse("Invalid login format"s, "invalidLogin"s);
}

void ApiHandler::HandleLogout() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value token = json::parse(req_info_.body);

    if (!token.as_object().contains("token")) {
        return SendBadRequestResponse("Invalid token"s, "invalidToken"s);
    }

    std::string tok;
    tok = token.at("token").as_string();

    if (refresh_tokens_.empty()) {
        return SendBadRequestResponse("Invalid token"s, "invalidToken"s);
    }
    if (refresh_tokens_.back() == tok) {
        json::value jv {
            {"success"s, true},
            {"message"s, "Successful logout"s}
        };
        return SendOkResponse(json::serialize(jv));
    }
    else {
        return SendBadRequestResponse("Invalid logout"s, "invalidLogout"s);
    }

    SendBadRequestResponseDefault();
}

void ApiHandler::HandleToken() {
    if (req_info_.method != http::verb::post) {
        return SendWrongMethodResponseAllowedPost("Wrong method"s, true);
    }

    json::value token = json::parse(req_info_.body);

    if (!token.as_object().contains("token")) {
        return SendBadRequestResponse("Invalid token"s, "invalidToken"s);
    }

    std::string tok;
    tok = token.at("token").as_string();

    try {
        PersonInfo p_info = refresh_token_to_person_.at(tok);
        std::string access_token = GetUniqueToken();
        std::string refresh_token = GetUniqueToken();
        json::value jv {
            {"success"s, true},
            {"accessToken"s, "Bearer "s + access_token},
            {"refreshToken"s, refresh_token}
        };

        tokens_[p_info].access_token = access_token;
        tokens_[p_info].refresh_token = refresh_token;
        tokens_[p_info].tracker.reset_timer();
        auth_to_person_[access_token] = p_info;
        refresh_token_to_person_[refresh_token] = p_info;
        refresh_tokens_.push_back(refresh_token);

        return SendOkResponse(json::serialize(jv));
    }
    catch (...) {
        return SendBadRequestResponse("Invalid token"s, "invalidToken"s);
    }

    SendBadRequestResponseDefault();
}

void ApiHandler::HandleOptions() {
    ResponseInfo result = MakeResponse(http::status::ok, true);
    SendOkResponse({});
}

void ApiHandler::HandleUser() {
    static size_t token_size = 32;

    if (req_info_.method != http::verb::get && req_info_.method != http::verb::head && req_info_.method != http::verb::options) {
        return SendWrongMethodResponseAllowedGetHead("Wrong method"s, true);
    }

    if (req_info_.method == http::verb::options) {
        return HandleOptions();
    }

    if (req_info_.auth.empty()) {
        return SendNoAuthResponse("Invalid token"s, "invalidToken"s);
    }

    std::string token_str{req_info_.auth};

    try {
        std::string email = auth_to_person_.at(token_str.substr(7)).email;
        std::string password = auth_to_person_.at(token_str.substr(7)).password;
        std::string name = auth_to_person_.at(token_str.substr(7)).name;
        std::string role = auth_to_person_.at(token_str.substr(7)).role;
        Person p{email, password, role};
        PersonInfo p_info{email, password, persons_[p], role};
        if (!tokens_[p_info].tracker.Has20MinutesPassed()) {
            json::value jv = {
                {"success"s, true},
                {"user"s, {
                        {"email"s, email},
                        {"name"s, name},
                        {"role"s, role}
                    }}
            };
            return SendOkResponse(json::serialize(jv));
        }
        else {
            return SendBadRequestResponse("Token is expired"s, "tokenIsExpired"s);
        }
    }
    catch (...) {
        return SendBadRequestResponse("Invalid token"s, "invalidToken"s);
    }

    SendBadRequestResponseDefault();
}

ApiHandler::ResponseInfo ApiHandler::MakeResponse(http::status status, bool no_cache) {
    ResponseInfo result;

    result.status = status;
    result.version = req_info_.version;
    result.content_type = body_type::json;
    result.keep_alive = req_info_.keep_alive;
    result.no_cache = no_cache;
    result.additional_fields.emplace_back(http::field::access_control_allow_origin, "*"s);
    result.additional_fields.emplace_back(http::field::access_control_allow_methods, "GET, POST, PUT, DELETE, OPTIONS"s);
    result.additional_fields.emplace_back(http::field::access_control_allow_headers, "Content-Type, Authorization"s);

    return result;
}

void ApiHandler::SendOkResponse(const std::string& body, bool no_cache) {
    ResponseInfo result = MakeResponse(http::status::ok, no_cache);

    result.body = body;

    send_(result);
}

void ApiHandler::SendBadRequestResponse(std::string message, std::string code, bool no_cache) {
    ResponseInfo result = MakeResponse(http::status::bad_request, no_cache);

    json::value body = {
        {"code"s, code},
        {"message"s, message}
    };

    result.body = json::serialize(body);

    send_(result);
}

void ApiHandler::SendNotFoundResponse(const std::string& message, const std::string& key, bool no_cache) {
    ResponseInfo result = MakeResponse(http::status::not_found, no_cache);

    json::value body {
        {"code"s, key},
        {"message"s, message}
    };

    result.body = json::serialize(body);

    send_(result);
}

void ApiHandler::SendNoAuthResponse(const std::string& message, const std::string& key, bool no_cache) {
    ResponseInfo result = MakeResponse(http::status::unauthorized, no_cache);

    json::value body = {
        {"code"s, key},
        {"message"s, message}
    };

    result.body = json::serialize(body);

    send_(result);
}

void ApiHandler::SendWrongMethodResponseAllowedDelete(const std::string& message, bool no_cache) {
    ResponseInfo result = MakeResponse(http::status::method_not_allowed, no_cache);

    json::value body = {
        {"code"s, "invalidMethod"s},
        {"message"s, message}
    };

    result.body = json::serialize(body);

    result.additional_fields.emplace_back(http::field::allow, "DELETE"s);

    send_(result);
}

void ApiHandler::SendWrongMethodResponseAllowedGetHead(const std::string& message, bool no_cache) {
    ResponseInfo result = MakeResponse(http::status::method_not_allowed, no_cache);

    json::value body = {
        {"code"s, "invalidMethod"s},
        {"message"s, message}
    };

    result.body = json::serialize(body);

    result.additional_fields.emplace_back(http::field::allow, "GET, HEAD"s);

    send_(result);
}

void ApiHandler::SendWrongMethodResponseAllowedPost(const std::string& message, bool no_cache) {
    ResponseInfo result = MakeResponse(http::status::method_not_allowed, no_cache);

    json::value body = {
        {"code"s, "invalidMethod"s},
        {"message"s, message}
    };

    result.body = json::serialize(body);

    result.additional_fields.emplace_back(http::field::allow, "POST"s);

    send_(result);
}

void ApiHandler::SendWrongMethodResponseAllowedPut(const std::string& message, bool no_cache) {
    ResponseInfo result = MakeResponse(http::status::method_not_allowed, no_cache);

    json::value body = {
        {"code"s, "invalidMethod"s},
        {"message"s, message}
    };

    result.body = json::serialize(body);

    result.additional_fields.emplace_back(http::field::allow, "PUT"s);

    send_(result);
}

} // namespace api_handler
