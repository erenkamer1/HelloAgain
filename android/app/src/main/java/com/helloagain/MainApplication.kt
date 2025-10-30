package com.helloagain

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.bridge.JSBundleLoader
import com.facebook.react.common.build.ReactBuildConfig
import com.facebook.react.common.annotations.UnstableReactNativeAPI
import com.facebook.react.defaults.DefaultComponentsRegistry
import com.facebook.react.defaults.DefaultReactHostDelegate
import com.facebook.react.defaults.DefaultTurboModuleManagerDelegate
import com.facebook.react.fabric.ComponentFactory
import com.facebook.react.runtime.ReactHostImpl
import com.helloagain.devsupport.CustomDevSupportManagerFactory

class MainApplication : Application(), ReactApplication {

  @OptIn(UnstableReactNativeAPI::class)
  override val reactHost: ReactHost by lazy {
    val packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        }
    val bundleLoader =
        JSBundleLoader.createAssetLoader(applicationContext, "assets://index.android.bundle", true)
    val turboModuleManagerDelegateBuilder = DefaultTurboModuleManagerDelegate.Builder()
    val hostDelegate =
        DefaultReactHostDelegate(
            jsMainModulePath = "index",
            jsBundleLoader = bundleLoader,
            reactPackages = packageList,
            turboModuleManagerDelegateBuilder = turboModuleManagerDelegateBuilder,
        )
    val componentFactory = ComponentFactory()
    DefaultComponentsRegistry.register(componentFactory)

    ReactHostImpl(
        context = applicationContext,
        reactHostDelegate = hostDelegate,
        componentFactory = componentFactory,
        allowPackagerServerAccess = true,
        useDevSupport = ReactBuildConfig.DEBUG,
        devSupportManagerFactory = CustomDevSupportManagerFactory(),
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
}
