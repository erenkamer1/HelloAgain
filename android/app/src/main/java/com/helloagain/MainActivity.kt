package com.helloagain

import android.os.Build
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "HelloAgain"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onWindowFocusChanged(hasFocus: Boolean) {
    if (hasFocus) {
      val decorView = window?.decorView
      if (decorView != null) {
        decorView.post {
          if (shouldPropagateFocusCallback()) {
            super.onWindowFocusChanged(true)
          }
        }
        return
      }
    }
    super.onWindowFocusChanged(hasFocus)
  }

  private fun shouldPropagateFocusCallback(): Boolean {
    if (isFinishing) {
      return false
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1 && isDestroyed) {
      return false
    }
    return true
  }
}
