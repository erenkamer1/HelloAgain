package com.helloagain.devsupport

import android.os.Build
import com.facebook.common.logging.FLog
import com.facebook.react.common.ReactConstants
import com.facebook.react.devsupport.DefaultDevLoadingViewImplementation
import com.facebook.react.devsupport.ReactInstanceDevHelper
import com.facebook.react.devsupport.interfaces.DevLoadingViewManager

class SafeDevLoadingViewImplementation(
    private val reactInstanceDevHelper: ReactInstanceDevHelper
) : DevLoadingViewManager {

  private val delegate = DefaultDevLoadingViewImplementation(reactInstanceDevHelper)

  override fun showMessage(message: String) {
    if (canShowPopup()) {
      delegate.showMessage(message)
    } else {
      logSkipped("showMessage", message)
    }
  }

  override fun updateProgress(status: String?, done: Int?, total: Int?) {
    if (canShowPopup()) {
      delegate.updateProgress(status, done, total)
    } else {
      logSkipped("updateProgress", status)
    }
  }

  override fun hide() {
    delegate.hide()
  }

  private fun canShowPopup(): Boolean {
    val activity = reactInstanceDevHelper.currentActivity ?: return false
    if (activity.isFinishing) {
      return false
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1 && activity.isDestroyed) {
      return false
    }
    val window = activity.window ?: return false
    val hasFocus = try {
      activity.hasWindowFocus()
    } catch (_: Throwable) {
      false
    }
    if (!hasFocus) {
      return false
    }
    val decorView = window.decorView ?: return false
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT && !decorView.isAttachedToWindow) {
      return false
    }
    return decorView.windowToken != null
  }

  private fun logSkipped(call: String, message: String?) {
    FLog.w(
        ReactConstants.TAG,
        "SafeDevLoadingViewImplementation.$call skipped; activity not ready. message=$message",
    )
  }
}

