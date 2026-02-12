if(NOT TARGET ReactAndroid::hermestooling)
add_library(ReactAndroid::hermestooling SHARED IMPORTED)
set_target_properties(ReactAndroid::hermestooling PROPERTIES
    IMPORTED_LOCATION "/Users/tanveer1807/.gradle/caches/9.0.0/transforms/0755776400c752994b2d99c84f8e13e2/transformed/react-android-0.82.1-debugOptimized/prefab/modules/hermestooling/libs/android.arm64-v8a/libhermestooling.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/tanveer1807/.gradle/caches/9.0.0/transforms/0755776400c752994b2d99c84f8e13e2/transformed/react-android-0.82.1-debugOptimized/prefab/modules/hermestooling/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

if(NOT TARGET ReactAndroid::jsi)
add_library(ReactAndroid::jsi SHARED IMPORTED)
set_target_properties(ReactAndroid::jsi PROPERTIES
    IMPORTED_LOCATION "/Users/tanveer1807/.gradle/caches/9.0.0/transforms/0755776400c752994b2d99c84f8e13e2/transformed/react-android-0.82.1-debugOptimized/prefab/modules/jsi/libs/android.arm64-v8a/libjsi.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/tanveer1807/.gradle/caches/9.0.0/transforms/0755776400c752994b2d99c84f8e13e2/transformed/react-android-0.82.1-debugOptimized/prefab/modules/jsi/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

if(NOT TARGET ReactAndroid::reactnative)
add_library(ReactAndroid::reactnative SHARED IMPORTED)
set_target_properties(ReactAndroid::reactnative PROPERTIES
    IMPORTED_LOCATION "/Users/tanveer1807/.gradle/caches/9.0.0/transforms/0755776400c752994b2d99c84f8e13e2/transformed/react-android-0.82.1-debugOptimized/prefab/modules/reactnative/libs/android.arm64-v8a/libreactnative.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/tanveer1807/.gradle/caches/9.0.0/transforms/0755776400c752994b2d99c84f8e13e2/transformed/react-android-0.82.1-debugOptimized/prefab/modules/reactnative/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

