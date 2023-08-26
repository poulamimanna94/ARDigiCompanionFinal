/*
 * @author : Poulami Manna
 * @description : utcDateToLocale for Localization
*/

export const LocaleDate = (utcDate) => {
    let utcDateToLocale = new Date(utcDate);
    // console.log(utcDateToLocale, utcDate, "utcDates coming")
    const dateFormatArr = utcDateToLocale.toLocaleString().replace('  ', ' ').split(' ');
    // console.log(utcDateToLocale.toLocaleString(), "utcDateToLocale.toLocaleString()")
    const monthObject = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    }
    // console.log(dateFormatArr,  dateFormatArr[dateFormatArr.length -1] + "-" + monthObject[dateFormatArr[1]] + "-" + dateFormatArr[2], "dateFormatArr")
    return  dateFormatArr[dateFormatArr.length -1] + "-" + monthObject[dateFormatArr[1]] + "-" + dateFormatArr[2];

}
 