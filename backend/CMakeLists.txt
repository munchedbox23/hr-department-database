cmake_minimum_required(VERSION 3.11)

project(run_server CXX)
set(CMAKE_CXX_STANDARD 20)

include(${CMAKE_BINARY_DIR}/conanbuildinfo_multi.cmake)
conan_basic_setup(TARGETS)

add_executable(run_server src/app/use_cases.h src/app/use_cases_impl.h src/app/use_cases_impl.cpp
               src/connection_pool.h src/application.h src/application.cpp src/sdk.h
               src/request_handler.h src/resp_maker.h src/main.cpp src/boost_json.cpp
               src/api/api_handler.h src/api/api_handler.cpp src/ui/view.h
               src/body_types/body_types.h src/body_types/body_types.cpp
               src/http_server/http_server.h src/http_server/http_server.cpp
               src/postgres/postgres.h src/postgres/postgres.cpp
               src/domain/worker.h
               src/domain/department_fwd.h src/domain/department.h
               src/domain/employee_fwd.h src/domain/employee.h
               src/domain/payroll_sheet_fwd.h src/domain/payroll_sheet.h
               src/domain/personnel_event_fwd.h src/domain/personnel_event.h
               src/domain/staffing_table_fwd.h src/domain/staffing_table.h
               src/domain/time_sheet_fwd.h src/domain/time_sheet.h
               src/domain/vacation_fwd.h src/domain/vacation.h
)

set(THREAD_PREFER_PTHREAD_FLAG_ON)
find_package(Threads REQUIRED)

if (CMAKE_SYSTEM_NAME MATCHES "^MINGW")
  set(SYSTEM_LIBS -lstdc++)
else()
  set(SYSTEM_LIBS)
endif()

target_include_directories(run_server PRIVATE CONAN_PKG::boost CONAN_PKG:libpqxx)
target_link_libraries(run_server PRIVATE Threads::Threads CONAN_PKG::boost CONAN_PKG::libpqxx)

target_link_libraries(run_server ${SYSTEM_LIBS})
