1. prompt - Get current CRM environment

respomnse - Zoho CRM Client Scripts don’t expose a direct “get environment” API (like sandbox vs production) via ZDK or ZRC today.

expectation - $Crm.environment; will returns the current crm environment


2. prompt - get leads, deals all ZRC api

response - code - zrc.request with url tag result error in crm cscript exections


3. get all deals stages

respomnse - no code returns





try {

    var response = await zrc.request({
        path: "/crm/v8/settings/fields?module=Leads",
        method: "GET",
        params: {
            page: 1,
            per_page: 10
        },
        headers: {
            "Content-Type": "application/json"
        }
    });
    let fieldArr = [];
    response.data.forEach(function(field) {
        if(fieldArr.length == 50) return false; // break loop if we have 50 fields
        fieldArr.push(field.api_name);
    });
    var response = await zrc.request({
        path: "/crm/v8/Leads",
        method: "GET",
        params: {
            page: 1,
            per_page: 10,
            fields : fieldArr.join(",")
        },
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
} catch (error) {
    return { error: true, data: error.message };
}







how many leads created in last month ?



try {
    // Helper to get previous calendar month start and end in ISO 8601 with timezone offset
    function getPreviousMonthRange() {
        var now = new Date();
        var tzOffsetMinutes = now.getTimezoneOffset(); // minutes behind UTC

        // Start of current month in local time
        var startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
        // Start of previous month
        var startOfPrevMonth = new Date(startOfCurrentMonth.getFullYear(), startOfCurrentMonth.getMonth() - 1, 1, 0, 0, 0, 0);
        // End of previous month: day 0 of current month is last day of prev month
        var endOfPrevMonth = new Date(startOfCurrentMonth.getFullYear(), startOfCurrentMonth.getMonth(), 0, 23, 59, 59, 999);

        function toIsoWithOffset(d) {
            // Build YYYY-MM-DDTHH:mm:ss+TZ from local time and current offset
            function pad(n) {
                return n < 10 ? "0" + n : "" + n;
            }

            var year = d.getFullYear();
            var month = pad(d.getMonth() + 1);
            var day = pad(d.getDate());
            var hours = pad(d.getHours());
            var minutes = pad(d.getMinutes());
            var seconds = pad(d.getSeconds());

            var offsetTotalMinutes = -tzOffsetMinutes; // invert sign because getTimezoneOffset is minutes behind UTC
            var sign = offsetTotalMinutes >= 0 ? "+" : "-";
            var absMinutes = Math.abs(offsetTotalMinutes);
            var offsetHours = pad(Math.floor(absMinutes / 60));
            var offsetMins = pad(absMinutes % 60);

            return year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds + sign + offsetHours + ":" + offsetMins;
        }

        return {
            start: toIsoWithOffset(startOfPrevMonth),
            end: toIsoWithOffset(endOfPrevMonth)
        };
    }

    var range = getPreviousMonthRange();

    // Build criteria for Created_Time between previous month start and end
    // NOTE: Created_Time is a DateTime field and requires ISO 8601 with timezone
    var criteria = "(Created_Time:between:" + range.start + "," + range.end + ")";

    // Use Record Count API to get count of Leads matching the criteria
    var response = await zrc.request({
        path: "/crm/v8/Leads/actions/count",
        method: "GET",
        params: {
            criteria: criteria
        },
        headers: {
            "Content-Type": "application/json"
        }
    });

    // response should contain { count: <number> }
    return response;
} catch (error) {
    return { error: true, data: error.message };
}
output - { count: 123 }



{
    // Helper: get ISO 8601 datetime string with timezone offset for a JS Date
    function toZohoDateTime(dateObj) {
        function pad(n) { return n < 10 ? '0' + n : '' + n; }

        var year = dateObj.getFullYear();
        var month = pad(dateObj.getMonth() + 1);
        var day = pad(dateObj.getDate());
        var hours = pad(dateObj.getHours());
        var minutes = pad(dateObj.getMinutes());
        var seconds = pad(dateObj.getSeconds());

        var offsetMinutesTotal = dateObj.getTimezoneOffset(); // minutes behind UTC; e.g. 330 for +05:30
        var sign = offsetMinutesTotal <= 0 ? '+' : '-';
        var offsetMinutesAbs = Math.abs(offsetMinutesTotal);
        var offsetHours = pad(Math.floor(offsetMinutesAbs / 60));
        var offsetMinutes = pad(offsetMinutesAbs % 60);

        return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + sign + offsetHours + ':' + offsetMinutes;
    }

    // Step 1: Compute previous calendar month start and end in user's local time
    var now = new Date();
    var startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    var startOfLastMonth = new Date(startOfThisMonth.getFullYear(), startOfThisMonth.getMonth() - 1, 1, 0, 0, 0, 0);
    var endOfLastMonth = new Date(startOfThisMonth.getFullYear(), startOfThisMonth.getMonth(), 0, 23, 59, 59, 999);

    var fromDateTime = toZohoDateTime(startOfLastMonth);
    var toDateTime = toZohoDateTime(endOfLastMonth);

    // Step 2: Use COQL to count Leads created in this period
    // Note: COQL supports up to 200 records per query, but we only need the count using total_count
    var response = await zrc.request({
        path: '/crm/v8/coql',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            select_query: "select id from Leads where (Created_Time between '" + fromDateTime + "' and '" + toDateTime + "')"
        }
    });

    // The COQL response includes info.more_records and info.count/total_count depending on version.
    // For safety, use info.count if available, else data.length.
    var total = 0;
    if (response && response.data && response.data.info) {
        if (typeof response.data.info.count === 'number') {
            total = response.data.info.count;
        } else if (typeof response.data.info.total_count === 'number') {
            total = response.data.info.total_count;
        }
    }
    if (!total && response && response.data && response.data.data && response.data.data.length) {
        total = response.data.data.length;
    }

    return total;
} catch (error) {
    return { error: true, data: error.message };
}
final result 0

 try {
    // Step 1: Fetch field metadata for Leads module
    var fieldsResponse = await zrc.request({
        path: "/crm/v8/settings/fields?module=Leads",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    // Step 2: Collect up to 50 field API names (we need at least Created_Time)
    var fieldArr = [];
    var hasCreatedTime = false;

    fieldsResponse.data.fields.forEach(function(field) {
        if (fieldArr.length < 50) {
            fieldArr.push(field.api_name);
        }
        if (field.api_name === "Created_Time") {
            hasCreatedTime = true;
        }
    });

    // Ensure Created_Time is included in fields list
    if (!hasCreatedTime && fieldArr.length < 50) {
        fieldArr.push("Created_Time");
    }

    // Step 3: Compute previous calendar month date-time range in ISO 8601 with timezone offset
    // NOTE: Adjust timezone offset as needed; here we use +00:00 (UTC)
    var now = new Date();
    var year = now.getUTCFullYear();
    var month = now.getUTCMonth(); // 0-11

    // Previous month calculation
    var prevMonth = month - 1;
    var prevMonthYear = year;
    if (prevMonth < 0) {
        prevMonth = 11;
        prevMonthYear = year - 1;
    }

    // Start of previous month: YYYY-MM-01T00:00:00+00:00
    var startDate = new Date(Date.UTC(prevMonthYear, prevMonth, 1, 0, 0, 0));

    // End of previous month: last day 23:59:59
    var endDate = new Date(Date.UTC(prevMonthYear, prevMonth + 1, 0, 23, 59, 59));

    function toIsoWithOffset(dateObj) {
        // Build YYYY-MM-DDTHH:mm:ss+00:00 for UTC
        var yearStr = dateObj.getUTCFullYear();
        var monthStr = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
        var dayStr = dateObj.getUTCDate().toString().padStart(2, "0");
        var hourStr = dateObj.getUTCHours().toString().padStart(2, "0");
        var minStr = dateObj.getUTCMinutes().toString().padStart(2, "0");
        var secStr = dateObj.getUTCSeconds().toString().padStart(2, "0");
        return yearStr + "-" + monthStr + "-" + dayStr + "T" + hourStr + ":" + minStr + ":" + secStr + "+00:00";
    }

    var startIso = toIsoWithOffset(startDate);
    var endIso = toIsoWithOffset(endDate);

    // Step 4: Paginate through Leads created in last month using search with criteria on Created_Time
    var page = 1;
    var perPage = 200; // max allowed per_page
    var totalCount = 0;
    var hasMore = true;

    while (hasMore) {
        var response = await zrc.request({
            path: "/crm/v8/Leads/search",
            method: "GET",
            params: {
                criteria: "(Created_Time:between:" + startIso + "," + endIso + ")",
                page: page,
                per_page: perPage,
                fields: fieldArr.join(",")
            },
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
            var records = response.data.data;
            totalCount = totalCount + records.length;

            if (records.length < perPage) {
                hasMore = false;
            } else {
                page = page + 1;
            }
        } else {
            hasMore = false;
        }
    }

    // Return the total count of leads created in the previous calendar month
    return totalCount;
} catch (error) {
    return { error: true, data: error.message };
}
0