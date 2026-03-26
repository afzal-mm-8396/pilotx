Lyte.Component.register("crux-create-comments-component", {
_template:"<template tag-name=\"crux-create-comments-component\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\">{{cxPropField[cxPropFieldKey]}}</div> </template></template> <div class=\"cxElementValue {{expHandlers(cxPropClass,'||','')}} {{expHandlers(cxPropDisabled,'?:','cxElementDisabled','')}} {{expHandlers(cxPropReadonly,'?:','cxElementReadOnly','')}}\"> <template items=\"{{commentsDetails}}\" item=\"comment\" index=\"index\" is=\"for\"> <div class=\"cx-comments-section\"> <pre class=\"cx-comments-info\" wrap=\"soft\">{{comment.commentInfo}}</pre> <div class=\"cx-commented-time\">{{comment.commented_time}}</div> </div> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]}],
_observedAttributes :["cxPropFieldData","cxPropValue","cxPropClass","cxPropLabelClass","cxPropDisabled","cxPropReadonly","cxPropFieldKey","cxPropTimeFormat","commentsDetails"],
_observedAttributesType :["object","array","string","string","boolean","boolean","string","string","array"],

    data: function () {
        return {
            cxPropFieldData: Lyte.attr('object', { default: {} }),//no i18n
            cxPropValue: Lyte.attr('array', { default: [] }),//no i18n
            cxPropClass: Lyte.attr("string", { default: '' }),//No I18n
            cxPropLabelClass: Lyte.attr("string", { default: "" }), //NO I18n
            cxPropDisabled: Lyte.attr("boolean", { default: false }),//No I18n
            cxPropReadonly: Lyte.attr("boolean", { default: false }),//No I18n
            cxPropFieldKey: Lyte.attr("string", { default: "" }),//No I18n
            cxPropTimeFormat: Lyte.attr("string", { default: typeof Crm !== 'undefined' && Crm.userDetails && Crm.userDetails.TIME_FORMAT }),//No I18n
            commentsDetails: Lyte.attr('array', { default: [] })//no i18n
        };
    },
    init: function () {
        this.setCommentsDetails();
    },
    setCommentsDetails: function () {
        let commentsDetails = [],
            cxPropValue = this.data.cxPropValue || [];
        if (cxPropValue && cxPropValue.length) {
            let is24HourFormat = this.data.cxPropTimeFormat && this.data.cxPropTimeFormat.indexOf('a') !== -1 ? false : true,
                outputFormat = !is24HourFormat ? "ddd, DD MMM YYYY hh:mm A" : "ddd, DD MMM YYYY HH:mm";//no i18n
            cxPropValue.forEach((comment) => {
                if (comment) {
                    let eachCommentDetails = {
                        commentInfo: comment.comment_content
                    };
                    let momentInfo = $L.moment(comment.commented_time);
                    if (momentInfo && momentInfo._isValid) {
                        let final_commented_time = momentInfo.i18N(outputFormat);
                        eachCommentDetails.commented_time = `${comment.commented_by} ${_cruxUtils.getI18n('on')} ${final_commented_time}`;
                    }
                    commentsDetails.push(eachCommentDetails);
                }
            });
            this.setData('commentsDetails', commentsDetails.reverse());
        }
    }
});