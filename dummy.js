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