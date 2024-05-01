import Colors from "./Colors";

export const CalendarTheme = {
  backgroundColor: Colors.white,
  calendarBackground: Colors.white,
  selectedDayTextColor: Colors.white,

  todayTextColor: Colors.grey,
  dayTextColor: Colors.grey,
  //   textDayFontFamily: FONT_TYPE.regular,
  selectedDayBackgroundColor: Colors.grape,

  textDisabledColor: Colors.sky_blue,
  dotColor: "#00adf5",
  selectedDotColor: "#ffffff",
  arrowColor: "orange",

  monthTextColor: Colors.sky_blue,
  textMonthFontSize: 17,
  //   textMonthFontFamily: FONT_TYPE.medium,

  textSectionTitleColor: Colors.sky_blue,
  indicatorColor: "blue",
  textDayFontWeight: "300",
  textDayFontSize: 16,

  "stylesheet.calendar.header": {
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: Colors.red,
      borderRadius: 9,
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      textAlign: "center",
      fontSize: 12,
      //   fontFamily: FONT_TYPE.regular,
      color: Colors.sky_blue,
    },
    week: {
      marginTop: 7,
      flexDirection: "row",
      justifyContent: "space-around",
    },
  },
  "stylesheet.day.period": {
    base: {
      alignItems: "center",
      justifyContent: "center",
      height: 34,
      overflow: "hidden",
      width: 38,
    },
    text: {
      fontFamily: 14,
      fontSize: 16,
      color: Colors.charcoal,
    },
    fillers: {
      position: "absolute",
      height: 34,
      flexDirection: "row",
      left: 0,
      right: 0,
    },
  },
  "stylesheet.day.multiDot": {
    base: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 5,
      paddingVertical: 5,
    },
    text: {
      fontFamily: 14,
      fontSize: 16,
      color: Colors.charcoal,
    },
    selected: {
      backgroundColor: Colors.grape,
      width: 31,
      height: 31,
      borderRadius: 31 / 2,
    },
  },
};
