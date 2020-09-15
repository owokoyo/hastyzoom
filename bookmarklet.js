(function() {
    //put the links for your zoom meetings inside the periods, the first link will become monday and thursday, the second will become tuesday and friday, the third will become wednesday
    let Periods = {
        0: [
        ],
        1: [
        ],
        2: [
        ],
        3: [
        ],
        4: [
        ],
        5: [
        ],
        6: [
        ]
    }

    let Schedule = {
        0: [
            {
            TimeStart: "7:00am",
            TimeEnd: "8:20am",
            PeriodNumber: 7,
            },
            {
                TimeStart: "8:25am",
                TimeEnd: "9:45am",
                PeriodNumber: 1,
            },
            {
                TimeStart: "9:55am",
                TimeEnd: "11:15am",
                PeriodNumber: 3,
            },
            {
                TimeStart: "11:20am",
                TimeEnd: "12:40pm",
                PeriodNumber: 5,
            },
            {
                TimeStart: "1:15pm",
                TimeEnd: "1:45pm",
                PeriodNumber: 2,
            },
            {
                TimeStart: "1:50pm",
                TimeEnd: "2:20pm",
                PeriodNumber: 4,
            },
            {
                TimeStart: "2:25pm",
                TimeEnd: "2:55pm",
                PeriodNumber: 6,
            },  
            {
                TimeStart: "3:00pm",
                TimeEnd: "3:30pm",
                PeriodNumber: 0,
            },
        ],
        1: [
            {
            TimeStart: "7:00am",
            TimeEnd: "8:20am",
            PeriodNumber: 0,
            },
            {
                TimeStart: "8:25am",
                TimeEnd: "9:45am",
                PeriodNumber: 2,
            },
            {
                TimeStart: "9:55am",
                TimeEnd: "11:15am",
                PeriodNumber: 4,
            },
            {
                TimeStart: "11:20am",
                TimeEnd: "12:40pm",
                PeriodNumber: 6,
            },
            {
                TimeStart: "1:15pm",
                TimeEnd: "1:45pm",
                PeriodNumber: 1,
            },
            {
                TimeStart: "1:50pm",
                TimeEnd: "2:20pm",
                PeriodNumber: 3,
            },
            {
                TimeStart: "2:25pm",
                TimeEnd: "2:55pm",
                PeriodNumber: 5,
            },  
            {
                TimeStart: "3:00pm",
                TimeEnd: "3:30pm",
                PeriodNumber: 7,
            },
        ],
        2: [
            {
                TimeStart: "9:55am",
                TimeEnd: "11:00am",
                PeriodNumber: 3,
            }
        ]
    }
    function validateDay(day) {
        console.log(day, (day-1)%3)
        if (day>0 && day<6) {
            return day%3-1
        } else {
            alert("It's the weekend, you do not have any zoom meetings.")
            return false;
        }
    }
    function parseTime(time) {
        var result = time.match(/(\d\d?)\:(\d\d)(am|pm)/);
        if (result[1] === "12") {
            result[1] = "0";
        }
        return result[1]*60+parseInt(result[2])+(result[3]==="pm"?720:0)
    }

    let date = new Date();
    if (window.customHastyZoomDate) {
        date = window.customHastyZoomDate
    }
    let sindex = validateDay(date.getDay());
    if (sindex!==false) {
        let minutes = date.getHours()*60+date.getMinutes()
        let wasFound = false;
        for (o of Schedule[sindex]) {
            let start =  parseTime(o.TimeStart)
            let end =  parseTime(o.TimeEnd)
            let period = o.PeriodNumber
            if (!Periods[period]) {
                continue;
            }
            if (end>minutes) {
                let num = Math.min(sindex, Periods[period].length-1)
                let link = Periods[period][num]
                let selected = true
                if (start-minutes>2) {
                    selected = selected&&confirm(`You are ${start-minutes} minutes early to class! Are you sure you want to do this?`)
                }
                if (selected) {
                    if (minutes-start>2 ) {
                        if (!confirm(`You are ${minutes-start} minutes late to class! Press Cancel if it has already ended.`)) {
                            continue
                        }
                    }
                    if (confirm(`You are attending Period ${period}. Confirm this is correct.`)) {
                        open(link, "_parent")
                    }
                }
                wasFound = true
                break;
            }
        }
        if (!wasFound) {
            alert("You do not have any more zoom meetings for today.")
        }
    } else {
    }
})()
