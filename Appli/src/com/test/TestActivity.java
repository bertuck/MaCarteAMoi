package com.test;

//import android.app.Activity;
import android.os.Bundle;
import com.phonegap.*;

public class TestActivity extends DroidGap {
    /** Called when the activity is first created. 
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // setContentView(R.layout.main);
        super.loadUrl("file:///asset/www/index.html");
    }*/
    
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/test.html");
    }
}



