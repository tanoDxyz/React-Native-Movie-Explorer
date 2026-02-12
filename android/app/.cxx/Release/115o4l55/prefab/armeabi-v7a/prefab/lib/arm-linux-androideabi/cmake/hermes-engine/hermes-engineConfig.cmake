if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "/Users/tanveer1807/.gradle/caches/9.0.0/transforms/a732945da21da9ff51191d6df63f6aa7/transformed/hermes-android-0.82.1-debugOptimized/prefab/modules/hermesvm/libs/android.armeabi-v7a/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/tanveer1807/.gradle/caches/9.0.0/transforms/a732945da21da9ff51191d6df63f6aa7/transformed/hermes-android-0.82.1-debugOptimized/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

