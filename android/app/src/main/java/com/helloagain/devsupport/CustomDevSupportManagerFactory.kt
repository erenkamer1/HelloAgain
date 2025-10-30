package com.helloagain.devsupport

import android.content.Context
import com.facebook.react.common.SurfaceDelegateFactory
import com.facebook.react.common.build.ReactBuildConfig
import com.facebook.react.devsupport.DevSupportManagerFactory
import com.facebook.react.devsupport.ReactInstanceDevHelper
import com.facebook.react.devsupport.ReleaseDevSupportManager
import com.facebook.react.devsupport.interfaces.DevBundleDownloadListener
import com.facebook.react.devsupport.interfaces.DevLoadingViewManager
import com.facebook.react.devsupport.interfaces.DevSupportManager
import com.facebook.react.devsupport.interfaces.PausedInDebuggerOverlayManager
import com.facebook.react.devsupport.interfaces.RedBoxHandler
import com.facebook.react.packagerconnection.RequestHandler

class CustomDevSupportManagerFactory : DevSupportManagerFactory {

  override fun create(
      applicationContext: Context,
      reactInstanceManagerHelper: ReactInstanceDevHelper,
      packagerPathForJSBundleName: String?,
      enableOnCreate: Boolean,
      redBoxHandler: RedBoxHandler?,
      devBundleDownloadListener: DevBundleDownloadListener?,
      minNumShakes: Int,
      customPackagerCommandHandlers: Map<String, RequestHandler>?,
      surfaceDelegateFactory: SurfaceDelegateFactory?,
      devLoadingViewManager: DevLoadingViewManager?,
      pausedInDebuggerOverlayManager: PausedInDebuggerOverlayManager?,
  ): DevSupportManager {
    if (!enableOnCreate) {
      return ReleaseDevSupportManager()
    }

    return instantiateDevManager(
        className = BRIDGE_DEV_SUPPORT_MANAGER,
        parameterTypes = BRIDGE_PARAMETER_TYPES,
        args = arrayOf(
            applicationContext,
            reactInstanceManagerHelper,
            packagerPathForJSBundleName,
            true,
            redBoxHandler,
            devBundleDownloadListener,
            minNumShakes,
            customPackagerCommandHandlers,
            surfaceDelegateFactory,
            devLoadingViewManager ?: SafeDevLoadingViewImplementation(reactInstanceManagerHelper),
            pausedInDebuggerOverlayManager,
        ),
        applicationContext = applicationContext,
    )
  }

  override fun create(
      applicationContext: Context,
      reactInstanceManagerHelper: ReactInstanceDevHelper,
      packagerPathForJSBundleName: String?,
      enableOnCreate: Boolean,
      redBoxHandler: RedBoxHandler?,
      devBundleDownloadListener: DevBundleDownloadListener?,
      minNumShakes: Int,
      customPackagerCommandHandlers: Map<String, RequestHandler>?,
      surfaceDelegateFactory: SurfaceDelegateFactory?,
      devLoadingViewManager: DevLoadingViewManager?,
      pausedInDebuggerOverlayManager: PausedInDebuggerOverlayManager?,
      useDevSupport: Boolean,
  ): DevSupportManager {
    if (ReactBuildConfig.UNSTABLE_ENABLE_FUSEBOX_RELEASE) {
      return instantiatePerftest(applicationContext)
    }

    if (!useDevSupport) {
      return ReleaseDevSupportManager()
    }

    return instantiateDevManager(
        className = BRIDGELESS_DEV_SUPPORT_MANAGER,
        parameterTypes = BRIDGELESS_PARAMETER_TYPES,
        args = arrayOf(
            applicationContext,
            reactInstanceManagerHelper,
            packagerPathForJSBundleName,
            enableOnCreate,
            redBoxHandler,
            devBundleDownloadListener,
            minNumShakes,
            customPackagerCommandHandlers,
            surfaceDelegateFactory,
            devLoadingViewManager ?: SafeDevLoadingViewImplementation(reactInstanceManagerHelper),
            pausedInDebuggerOverlayManager,
        ),
        applicationContext = applicationContext,
    )
  }

  private fun instantiateDevManager(
      className: String,
      parameterTypes: Array<Class<*>>,
      args: Array<Any?>,
      applicationContext: Context,
  ): DevSupportManager {
    return try {
      val clazz = Class.forName(className)
      val constructor = clazz.getConstructor(*parameterTypes)
      constructor.newInstance(*args) as DevSupportManager
    } catch (_: Throwable) {
      instantiatePerftest(applicationContext)
    }
  }

  private fun instantiatePerftest(applicationContext: Context): DevSupportManager {
    return try {
      val clazz = Class.forName(PERFTEST_DEV_SUPPORT_MANAGER)
      val constructor = clazz.getConstructor(Context::class.java)
      constructor.newInstance(applicationContext) as DevSupportManager
    } catch (_: Throwable) {
      ReleaseDevSupportManager()
    }
  }

  private companion object {
    private const val BRIDGE_DEV_SUPPORT_MANAGER =
        "com.facebook.react.devsupport.BridgeDevSupportManager"
    private const val BRIDGELESS_DEV_SUPPORT_MANAGER =
        "com.facebook.react.devsupport.BridgelessDevSupportManager"
    private const val PERFTEST_DEV_SUPPORT_MANAGER =
        "com.facebook.react.devsupport.PerftestDevSupportManager"

    private val BRIDGE_PARAMETER_TYPES: Array<Class<*>> =
        arrayOf(
            Context::class.java,
            ReactInstanceDevHelper::class.java,
            String::class.java,
            Boolean::class.javaPrimitiveType!!,
            RedBoxHandler::class.java,
            DevBundleDownloadListener::class.java,
            Int::class.javaPrimitiveType!!,
            MutableMap::class.java as Class<*>,
            SurfaceDelegateFactory::class.java,
            DevLoadingViewManager::class.java,
            PausedInDebuggerOverlayManager::class.java,
        )

    private val BRIDGELESS_PARAMETER_TYPES: Array<Class<*>> = BRIDGE_PARAMETER_TYPES
  }
}

