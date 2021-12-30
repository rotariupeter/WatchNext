package com.petru.WatchNext.buisness.logic.helpers;

import java.text.SimpleDateFormat;
import java.util.Date;

public class MyDateUtils {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    public static String dateToString(Date date){

        if(date == null)
            return null;

        return DATE_FORMAT.format(date);
    }

}
