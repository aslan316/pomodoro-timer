project(pomodoro C CXX)
cmake_minimum_required(VERSION 3.3.2)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

include(cmake/App.cmake)

set(SOURCES "src/MyApp.h"
            "src/MyApp.cpp"
            "src/main.cpp")

add_app("${SOURCES}")
