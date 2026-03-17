var _lyteSchedulerNavId = 0;
Lyte.Component.register("lyte-scheduler", {
_template:"<template tag-name=\"lyte-scheduler\"> <lyte-scheduler-header class=\"{{if(ltPropShowWeekNumber,'lyteSchedulerWeekNumberShown','')}}\"> <template is=\"if\" value=\"{{ltPropSchedulerHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"scheduler-header\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteSchedulerDefaultHeader\"> <lyte-scheduler-view> <lyte-button-group lt-prop-selected=\"{{ltPropSchedulerView}}\" lt-prop-type=\"radiobutton\" lt-prop-appearance=\"fill\" on-select=\"{{method(&quot;ChangeSchedulerView&quot;)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-button lt-prop-value=\"day\" class=\"lyteSchedulerDayViewButton\"> <template is=\"registerYield\" yield-name=\"text\"> {{lyteUiI18n(\"day\")}} </template> </lyte-button> <lyte-button lt-prop-value=\"week\" class=\"lyteSchedulerWeekViewButton\"> <template is=\"registerYield\" yield-name=\"text\"> {{lyteUiI18n(\"week\")}} </template> </lyte-button> <lyte-button lt-prop-value=\"month\" class=\"lyteSchedulerMonthViewButton\"> <template is=\"registerYield\" yield-name=\"text\"> {{lyteUiI18n(\"month\")}} </template> </lyte-button> </template> </lyte-button-group> </lyte-scheduler-view> <div class=\"lyteSchedulerDateNavigator\"> <lyte-scheduler-icon class=\"lyteSchedulerStartIcon\" onclick=\"{{action(&quot;hideandShowCalender&quot;,event)}}\" tabindex=\"0\" role=\"button\" lt-prop-aria-keydown=\"true\"> <template is=\"if\" value=\"{{ltPropyieldNav}}\"><template case=\"true\"> <lyte-yield yield-name=\"scheduler-nav-icon\"></lyte-yield> </template></template> </lyte-scheduler-icon> <scheduler-start-date class=\"lyteSchedulerStartDate\" tabindex=\"-1\" aria-hidden=\"true\"> {{ltCurrStartDate}} </scheduler-start-date> <template is=\"if\" value=\"{{expHandlers(ltPropSchedulerView,'==','week')}}\"><template case=\"true\"> <span class=\"lyteSchedulerTitleSeparator\" tabindex=\"-1\" aria-hidden=\"true\">To</span> <scheduler-end-date class=\"lyteSchedulerEndDate\" tabindex=\"-1\" aria-hidden=\"true\"> {{ltCurrEndDate}} </scheduler-end-date> </template></template> </div> <lyte-scheduler-title tabindex=\"0\"> <span class=\"lyteSchedulerTitleDate\">{{ltdisplayCurrDate}}</span> <span class=\"lyteSchedulerTitleDay\">{{lyteUiI18n(ltPropCurDay)}}</span> <template is=\"if\" value=\"{{expHandlers(ltPropSchedulerView,'==','day')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropShowWeekNumber}}\"><template case=\"true\"><span class=\"lyteSchedulerWeekNumber lyteSchedulerDayView\"> {{lyteSchedulerUiFindWeek(startDateOfView,ltPropSchedulerView)}} </span></template></template> </template></template> </lyte-scheduler-title> <lyte-scheduler-nav tabindex=\"-1\"> <span role=\"button\" class=\"lyteSchedulerNavLeft\" tabindex=\"0\" lt-prop-aria-keydown=\"true\" lt-prop-tooltip=\"Previous {{ltPropSchedulerView}}\"> <span class=\"lyteVisuallyHidden\"> Previous {{ltPropSchedulerView}} </span> </span> <lyte-button onclick=\"{{action('today',event)}}\" class=\"schedulerToday\"> <template is=\"registerYield\" yield-name=\"text\"> {{lyteUiI18n(todayButton)}} </template> </lyte-button> <span role=\"button\" class=\"lyteSchedulerNavRight\" tabindex=\"0\" lt-prop-aria-keydown=\"true\" lt-prop-tooltip=\"Next {{ltPropSchedulerView}}\"> <span class=\"lyteVisuallyHidden\"> Next {{ltPropSchedulerView}} </span> </span> </lyte-scheduler-nav> <lyte-yield yield-name=\"scheduler-selected-User\" class=\"lyteSchedulerSelectedUser\"></lyte-yield> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropMultiUserView,'&amp;&amp;',expHandlers(ltPropSchedulerSearchYield,'!'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(selectedUserArr.length,'>',0)}}\"><template case=\"true\"> <div> <div> <template is=\"for\" items=\"{{selectedUserArr}}\" item=\"userid\" index=\"index\"> <div> <lyte-yield yield-name=\"scheduler-user-icon\" scheduler-user=\"{{lyteUiSchedulerfindUser(ltPropSchedulerUser,userid)}}\"> </lyte-yield> </div> </template> </div> <div onclick=\"{{action('clearSelection')}}\"> clear </div> </div> </template></template> </template></template> </lyte-scheduler-header> <lyte-scheduler-body> <div class=\"lyteSchedulerWrapperClass\"><template value=\"{{ltPropSchedulerView}}\" is=\"switch\"><template case=\"month\"><lyte-scheduler-month> <div class=\"{{if(ltPropMultiUserView,'lyteSchedulerMultiUserView','lyteSchedulerSingleUserView')}} lyteSchedulerMonthViewWrapper lyteSchedulerViewWrapper\"> <table class=\"lyteSchedulerViewMainTable lyteSchedulerTableNav lyteSchedulerMonthView\"> <tbody is=\"if\" lyte-if=\"true\" value=\"{{expHandlers(ltPropMultiUserView,'!')}}\"></tbody> <tbody class=\"lyteSchedulerMonthViewBody\"> <tr is=\"for\" lyte-for=\"true\" items=\"{{ltPropDateArray}}\" item=\"week\" index=\"index\" depth=\"2\"></tr> </tbody> </table> </div> </lyte-scheduler-month></template><template case=\"week\"><lyte-scheduler-week> <template is=\"if\" value=\"{{ltPropMultiUserView}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropUserBasedView}}\"><template case=\"true\"><div class=\"lyteSchedulerMultiUserView lyteSchedulerWeekViewWrapper lyteSchedulerViewWrapper {{if(ltPropWorkingDayOnly,'lyteSchedulerBusinessDayOnly','')}} lyteSchedulerUserBasedView\" style=\"--lyte-scheduler-user-count:{{ltPropSchedulerUser.length}}\"> <table class=\"lyteSchedulerViewMainTable lyteSchedulerTableNav lyteSchedulerWeekView\"> <thead> <tr class=\"lyteSchedulerWeekViewHeader\"> <th class=\"lyteSchedulerFirstColHeader\"> <template is=\"if\" value=\"{{if(ltPropSchedulerSearchYield)}}\"><template case=\"true\"><lyte-yield yield-name=\"lyteSchedulerSearchYield\"> </lyte-yield></template></template> </th> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"3\"></td> </tr> </thead> <tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"2\"></tr> </tbody> </table> </div></template><template case=\"false\"><div class=\"lyteSchedulerMultiUserView lyteSchedulerWeekViewWrapper lyteSchedulerViewWrapper {{if(ltPropWorkingDayOnly,'lyteSchedulerBusinessDayOnly','')}}\"> <table class=\"lyteSchedulerViewMainTable lyteSchedulerTableNav lyteSchedulerWeekView\" tabindex=\"0\"> <thead tabindex=\"0\"> <tr class=\"lyteSchedulerWeekViewHeader\" tabindex=\"0\"> <th class=\"lyteSchedulerFirstColHeader\" tabindex=\"0\"> <template is=\"if\" value=\"{{ltPropSchedulerSearch}}\"><template case=\"true\"> <lyte-search lt-prop-query-selector=\"{&quot;scope&quot; : &quot;lyte-popover-content&quot;, &quot;search&quot; : &quot;.lyteSchedulerUserSearch&quot;}\" on-focus=\"{{method('openUserSearch')}}\"> </lyte-search> </template><template case=\"false\"><template is=\"if\" value=\"{{ltPropSchedulerSearchYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"lyteSchedulerSearchYield\"> </lyte-yield> </template></template></template></template> </th> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </thead> <tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"2\"></tr> </tbody> </table> </div></template></template> </template><template case=\"false\"> <div class=\"lyteSchedulerWeekViewWrapper lyteSchedulerViewWrapper {{if(ltPropWorkingDayOnly,'lyteSchedulerBusinessDayOnly','')}}\"> <div class=\"lyteSchedulerAllDayHighlight\"></div> <div class=\"lyteSchedularWeekViewInnerWrapper\"> <table class=\"lyteSchedulerViewMainTable lyteSchedulerTableNav lyteSchedulerWeekView \"> <thead> <tr class=\"lyteSchedulerWeekViewHeader\"> <th class=\"lyteSchedulerWeekTh lyteSchedulerTimelineColTh\" tabindex=\"0\"></th> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> <tr class=\"lyteSchedulerWeekViewAllDayRow\"> <td class=\"lyteSchedulerTimelineColAllDayTd\"> <div class=\"lyteSchedulerSingleUserAllDay\"> {{lyteUiI18n('all-day')}} ({{lyteUiSchedulerAllDayCount(ltPropProcessedData,hiddenObj,startDateOfView,ltPropSchedulerView,ltPropMultiUserView)}}) </div> </td> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </thead> <tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{timeLine}}\" item=\"time\" index=\"index\" depth=\"2\"></tr> </tbody> </table> <div class=\"lyteSchedulerOverlay\"> <table class=\"lyteSchedulerWeekOverlayTable\" cellpadding=\"0\"> <tbody> <tr> <td class=\"lyteSchedulerOverlayTimelineTd\"></td> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </tbody> </table> </div> <div class=\"lyteschedulerCurrentTimeLine\"> <div class=\"lyteschedulerLine\"></div> </div> </div> </div> </template></template> </lyte-scheduler-week></template><template case=\"day\"><lyte-scheduler-day> <template is=\"if\" value=\"{{ltPropMultiUserView}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropUserBasedView}}\"><template case=\"true\"> <div class=\"scrollContainer lyteSchedulerMultiUserView lyteSchedulerDayViewWrapper lyteSchedulerViewWrapper lyteSchedulerUserBasedView\" style=\"--lyte-scheduler-user-count:{{ltPropSchedulerUser.length}}\"> <table class=\"lyteSchedulerTableNav lyteSchedulerDayView lyteSchedulerViewMainTable\"> <thead> <tr> <th class=\"lyteSchedulerFirstColHeader lyteSchedulerFixedCol lyteSchedulerTimelineColTh\"> <template is=\"if\" value=\"{{ltPropSchedulerSearch}}\"><template case=\"true\"><lyte-search lt-prop-query-selector=\"{&quot;scope&quot; : &quot;lyte-popover-content&quot;, &quot;search&quot; : &quot;.lyteSchedulerUserSearch&quot;}\" on-focus=\"{{method('openUserSearch')}}\"> </lyte-search></template><template case=\"false\"><template is=\"if\" value=\"{{ltPropSchedulerSearchYield}}\"><template case=\"true\"><lyte-yield yield-name=\"lyteSchedulerSearchYield\"> </lyte-yield></template></template></template></template> </th> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"3\"></td> </tr> <tr class=\"lyteSchedulerDayViewAllDayRow lyteSchedulerAllDayTh\"> <td class=\"lyteSchedulerTimelineColAllDayTd\"> <div class=\"lyteSchedulerSingleUserAllDay\">{{lyteUiI18n('all-day')}} ({{lyteUiSchedulerAllDayCount(ltPropProcessedData,hiddenObj,startDateOfView,ltPropSchedulerView,ltPropMultiUserView)}}) </div> </td> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"3\"></td> </tr> </thead> <tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{timeLine}}\" item=\"time\" index=\"index\" depth=\"2\"></tr> </tbody> </table> <div class=\"lyteSchedulerOverlay\"> <table class=\"lyteSchedulerDayOverlayTable\"> <tbody> <tr> <td class=\"lyteSchedulerOverlayTimelineTd\"></td> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"3\"></td> </tr> </tbody> </table> </div> <div class=\"lyteschedulerCurrentTimeLine\"> <div class=\"lyteschedulerLine\"></div> </div> </div> <div class=\"lyteSchedulerAllDayHighlight\"></div> </template><template case=\"false\"> <div class=\"scrollContainer lyteSchedulerMultiUserView lyteSchedulerDayViewWrapper lyteSchedulerViewWrapper {{if(ltPropShowDayViewCurrentTime,'lyteSchedulerShowCurrentTime','')}}\"> <table class=\"lyteSchedulerTableNav\"> <thead> <tr class=\"lyteSchedulerMultiUserRow\"> <th class=\"lyteSchedulerFirstColHeader lyteSchedulerFixedCol\"> <template is=\"if\" value=\"{{ltPropSchedulerSearch}}\"><template case=\"true\"> <lyte-search lt-prop-query-selector=\"{&quot;scope&quot; : &quot;lyte-popover-content&quot;, &quot;search&quot; : &quot;.lyteSchedulerUserSearch&quot;}\" on-focus=\"{{method('openUserSearch')}}\"> </lyte-search> </template><template case=\"false\"><template is=\"if\" value=\"{{ltPropSchedulerSearchYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"lyteSchedulerSearchYield\"> </lyte-yield> </template></template></template></template> </th> <td is=\"if\" lyte-if=\"true\" value=\"{{expHandlers(ltPropHideAlldayEvent,'!')}}\"></td> <td is=\"for\" lyte-for=\"true\" items=\"{{timeLine}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </thead> <tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"2\"></tr> </tbody> </table> <template is=\"if\" value=\"{{ltPropShowDayViewCurrentTime}}\"><template case=\"true\"><div class=\"lyteschedulerCurrentTimeLine lyteSchedulerHorizontalLine\"> <div class=\"lyteschedulerLine\"></div> </div></template></template> </div> <template is=\"if\" value=\"{{expHandlers(ltPropHideAlldayEvent,'!')}}\"><template case=\"true\"><div class=\"lyteSchedulerAllDayHighlight\"></div></template></template> <scheduler-scroll-nav class=\"lyteSchedulerLeftNav\" onclick=\"{{action('scrollnav',event)}}\"></scheduler-scroll-nav> <scheduler-scroll-nav class=\"lyteSchedulerRightNav\" onclick=\"{{action('scrollnav',event)}}\"></scheduler-scroll-nav> </template></template> </template><template case=\"false\"> <div class=\"lyteSchedulerDayViewWrapper lyteSchedulerViewWrapper\"> <div class=\"lyteSchedularDayViewInnerWrapper\"> <table class=\"lyteSchedulerViewMainTable lyteSchedulerTableNav lyteSchedulerTableNav lyteSchedulerDayView\"> <thead> <tr class=\"lyteSchedulerDayViewAllDayRow\" style=\"--lyte-scheduler-td-height: 1px;\"> <td is=\"if\" lyte-if=\"true\" value=\"{{ltPropMultiUserView}}\"></td> <td class=\"lyteSchedulerDate lyteSchedulerMenuQuerySelector lyteSchedulerAllDayEvent\"> <div class=\"scheduler-event-div\" data-date=\"{{startDateOfView}}\"> <template is=\"for\" items=\"{{ltPropDateObj.allDay}}\" item=\"event\" index=\"index\"> <template is=\"if\" value=\"{{event.allDayEvent}}\"><template case=\"true\"> <template is=\"if\" value=\"{{lyteUiSchedulerEvent(event)}}\"><template case=\"true\"><lyte-scheduler-event-tag event-index=\"{{index}}\" class=\"{{event.class}} {{if(expHandlers(event.editable,'!'),'lyteSchedulerNoDrag','')}}\" lt-prop-event=\"{{event}}\" data-id=\"{{event.id}}\" id=\"u{{event.id}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{event}}\"> </lyte-yield> </lyte-scheduler-event-tag></template></template> </template></template> </template> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide \" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj.allDay,startDateOfView,undefined,undefined,ltPropSchedulerView,true)}}\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj.allDay,startDateOfView,undefined,undefined,ltPropSchedulerView,true)}}\" tabindex=\"0\"> {{lyteUiSchedulerhiddenEvent(hiddenObj.allDay,startDateOfView,this,user.id)}} </div> </div> </td> </tr> </thead> <tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{timeLine}}\" item=\"time\" index=\"index\" depth=\"2\"></tr> </tbody> </table> <div class=\"lyteSchedulerOverlay\"> <table class=\"lyteSchedulerDayOverlayTable\"> <thead> <tr class=\"lyteSchedulerDayViewAllDayRow\" style=\"--lyte-scheduler-td-height: 1px;\"> <td class=\"lyteSchedulerTimelineColAllDayTd\"> <div class=\"lyteSchedulerSingleUserAllDay\">{{lyteUiI18n('all-day')}}</div> </td> <td class=\"lyteSchedulerDate lyteSchedulerAllDayEvent\"> <div class=\"scheduler-event-div\"> <div></div> </div> </td> </tr> </thead> <tbody> <tr> <td class=\"lyteSchedulerOverlayTimelineTd\"></td> <td class=\"lyteSchedulerDate\"> <div class=\"scheduler-event-div\" data-date=\"{{startDateOfView}}\"> <template is=\"forIn\" object=\"{{ltPropDateObj}}\" value=\"column\" key=\"key\"> <template is=\"if\" value=\"{{expHandlers(key,'!==','allDay')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{column}}\" item=\"colArray\" index=\"index\"><template is=\"for\" items=\"{{colArray}}\" item=\"event\" index=\"rowindex\"> <lyte-scheduler-event-tag event-index=\"{{index}}\" class=\"{{event.event.class}} {{if(expHandlers(event.event.editable,'!'),'lyteSchedulerNoDrag','')}}\" lt-prop-event=\"{{event.event}}\" data-id=\"{{event.event.id}}\" id=\"u{{event.event.id}}\" lt-prop-col=\"{{event.col}}\" lt-prop-row=\"{{rowindex}}\" lt-prop-intersect=\"{{event.intersect}}\" lt-prop-prevelem=\"{{event.prevElem}}\" lt-prop-next-intersetcol=\"{{event.nextIntersetCol}}\" lt-prop-count=\"{{column.length}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{event.event}}\"> </lyte-yield> <template is=\"if\" value=\"{{expHandlers(event.event.editable,'&amp;&amp;',expHandlers(event.event._editable,'!'))}}\"><template case=\"true\"><span class=\"lyteSchedulerGrabResize\"></span></template></template> </lyte-scheduler-event-tag> </template> </template> </template></template> </template> </div> </td> </tr> </tbody> </table> </div> <div class=\"lyteschedulerCurrentTimeLine\"> <div class=\"lyteschedulerLine\"></div> </div> </div> <div class=\"lyteSchedulerAllDayHighlight\"></div> </div> </template></template> </lyte-scheduler-day></template></template></div> </lyte-scheduler-body> <lyte-beta-popover id=\"lyteSchedulerHiddenEvent\" lt-prop-allow-multiple=\"{{ltPropPopoverAllowMultiple}}\" lt-prop-focus-on-close=\"true\" lt-prop-origin-elem=\"#schedulerPopover\" lt-prop-header-padding=\"\" lt-prop-content-padding=\"\" lt-prop-freeze=\"{{ltPropHiddenEventPopoverFreeze}}\" lt-prop-wrapper-class=\"lyteSchedulerMoreEventsPopupWrapper {{if(ltPropUserHiddenEvent,'lyteSchedulerUsersMoreEventsPopupWrapper','')}} {{ltPropHiddenPopoverWrapper}}\" on-close=\"{{method(&quot;closeschedulerpopover&quot;)}}\" lt-prop-allow=\"\" lt-prop-scrollable=\"true\" on-show=\"{{method('onPopoverShow')}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-header> <div class=\"lyteSchedulerMoreEventsPopTitleMonthVal\"></div> <div class=\"lyteSchedulerMoreEventsPopTitleDayVal\"></div> <template is=\"if\" value=\"{{hiddenUser}}\"><template case=\"true\"><lyte-yield yield-name=\"scheduler-header-hidden-event\" scheduler-hidden-user=\"{{hiddenUser}}\"> </lyte-yield></template></template> </lyte-popover-header> <lyte-popover-content> <lyte-yield yield-name=\"scheduler-hidden-event\" scheduler-hidden-event=\"{{hiddenEvent}}\"> </lyte-yield> </lyte-popover-content> </template> </lyte-beta-popover> <lyte-beta-popover lt-prop-content-padding=\"0px\" lt-prop-allow-multiple=\"{{ltPropPopoverAllowMultiple}}\" lt-prop-focus-on-close=\"true\" lt-prop-freeze=\"{{ltPropCalendarPopoverFreeze}}\" lt-prop-type=\"box\" lt-prop-show-close-button=\"false\" id=\"calendarPopover\" lt-prop-bind-to-body=\"true\" lt-prop-placement=\"bottomLeft\" on-close=\"{{method(&quot;closeCalender&quot;)}}\" lt-prop-wrapper-class=\"{{ltPropCalendarPopoverWrapper}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <template is=\"if\" value=\"{{ltPropShowCalendar}}\"><template case=\"true\"><lyte-popover-content style=\"padding: 0px;\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropSchedulerView,'==','month'),'||',expHandlers(ltPropCalendarHeaderType,'!'))}}\"><template case=\"true\"> <lyte-calendar lt-prop-events=\"{{EventPresent}}\" lt-prop-time-zone=\"{{ltPropTimezone}}\" lt-prop-header-type=\"drilldown\" on-month-selected=\"{{method(&quot;monthSelected&quot;)}}\" on-week-selected=\"{{method(&quot;weekSelected&quot;)}}\" lt-prop-selection-type=\"{{selectionType}}\" on-date-selected=\"{{method(&quot;dateselect&quot;)}}\" lt-prop-format=\"DD-MM-YYYY\" lt-prop-start-week-day=\"{{if(ifEquals(ltPropWeekStart,undefined),0,ltPropWeekStart)}}\" class=\"lyteSchedulerCalendar\" on-navigate=\"{{method('onSchedulerNavToday')}}\"></lyte-calendar> </template><template case=\"false\"> <lyte-calendar lt-prop-events=\"{{EventPresent}}\" lt-prop-time-zone=\"{{ltPropTimezone}}\" lt-prop-header-type=\"dropdown\" on-month-selected=\"{{method(&quot;monthSelected&quot;)}}\" on-week-selected=\"{{method(&quot;weekSelected&quot;)}}\" lt-prop-selection-type=\"{{selectionType}}\" on-date-selected=\"{{method(&quot;dateselect&quot;)}}\" lt-prop-format=\"DD-MM-YYYY\" lt-prop-start-week-day=\"{{if(ifEquals(ltPropWeekStart,undefined),0,ltPropWeekStart)}}\" class=\"lyteSchedulerCalendar\" on-navigate=\"{{method('onSchedulerNavToday')}}\"></lyte-calendar> </template></template> </lyte-popover-content></template></template> </template> </lyte-beta-popover> <lyte-beta-popover id=\"usersreachPopover\" lt-prop-origin-elem=\".lyteSchedulerUserSearchActive\" lt-prop-focus-on-close=\"true\" lt-prop-allow-multiple=\"{{ltPropPopoverAllowMultiple}}\" lt-prop-close-on-body-click=\"false\" on-before-close=\"{{method('onUserSearchClose')}}\" lt-prop-freeze=\"false\" lt-prop-type=\"box\" lt-prop-show-close-button=\"false\" lt-prop-placement=\"bottom\" on-close=\"{{method('closeUserPopover')}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <template is=\"for\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\"> <div class=\"lyteSchedulerUserSearch\"> <lyte-checkbox lt-prop-name=\"checkbox\" lt-prop-val=\"{{user.id}}\" on-checked=\"{{method('boxChecked')}}\" on-unchecked=\"{{method('boxUnchecked')}}\"></lyte-checkbox> <lyte-yield yield-name=\"scheduler-user-search\" scheduler-user=\"{{user}}\"></lyte-yield> </div> </template> </lyte-popover-content> <lyte-popover-footer style=\"padding: 10px 25px 25px;\"> <lyte-button onclick=\"{{action('cancelUserSelect')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Cancel </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" onclick=\"{{action('SelectUserSelect')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Done </template> </lyte-button> </lyte-popover-footer> </template> </lyte-beta-popover> <template is=\"if\" value=\"{{ltPropSchedulerMenu}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropSchedulerMenuYeild}}\"><template case=\"true\"> <lyte-menu lt-prop-yield=\"{{ltPropSchedulerMenuYield}}\" lt-prop-event=\"click\" lt-prop-query=\".lyteSchedulerMenuQuerySelector\" lt-prop-user-value=\"{{ltPropSchedulerMenuUserValue}}\" lt-prop-content=\"{{ltPropSchedulerMenuContent}}\" lt-prop-system-value=\"{{ltPropSchedulerMenuSystemValue}}\" lt-prop-description=\"{{ltPropScheluerMenuDescription}}\" lt-prop-id=\"{{ltPropSchedulerMenuId}}\" lt-prop-class=\"{{ltPropSchedulerMenuClass}}\" lt-prop-position=\"{{ltPropSchedulerMenuPosition}}\" lt-prop-width=\"{{ltPropSchedulerMenuWidth}}\" lt-prop-height=\"{{ltPropSchedulerMenuHeight}}\" lt-prop-callout=\"{{ltPropSChedulerMenuCallout}}\" lt-prop-freeze=\"{{ltPropSchedulerMenuFreeze}}\" lt-prop-query-class=\"{{ltPropSchedulerMenuQueryClass}}\" lt-prop-animate=\"{{ltPropSchedulerMenuAnimate}}\" lt-prop-wrapper-class=\"{{ltPropSchedulerMenuWrapperClass}}\" lt-prop-bind-to-body=\"{{ltPropSchedulerMenuBindToBody}}\" on-before-open=\"{{method('menuonbeforeopen')}}\" on-open=\"{{method('menuonopen')}}\" on-before-close=\"{{method('menuonbeforeclose')}}\" on-close=\"{{method('menuonclose')}}\" on-menu-click=\"{{method('menuonclick')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"scheduler-menu\"></lyte-yield> </template> </lyte-menu> </template><template case=\"false\"> <lyte-menu lt-prop-yield=\"{{ltPropSchedulerMenuYield}}\" lt-prop-set-css=\"false\" lt-prop-event=\"click\" lt-prop-query=\".lyteSchedulerMenuQuerySelector\" lt-prop-user-value=\"{{ltPropSchedulerMenuUserValue}}\" lt-prop-content=\"{{ltPropSchedulerMenuContent}}\" lt-prop-system-value=\"{{ltPropSchedulerMenuSystemValue}}\" lt-prop-description=\"{{ltPropScheluerMenuDescription}}\" lt-prop-id=\"{{ltPropSchedulerMenuId}}\" lt-prop-class=\"{{ltPropSchedulerMenuClass}}\" lt-prop-position=\"{{ltPropSchedulerMenuPosition}}\" lt-prop-width=\"{{ltPropSchedulerMenuWidth}}\" lt-prop-height=\"{{ltPropSchedulerMenuHeight}}\" lt-prop-callout=\"{{ltPropSChedulerMenuCallout}}\" lt-prop-freeze=\"{{ltPropSchedulerMenuFreeze}}\" lt-prop-query-class=\"{{ltPropSchedulerMenuQueryClass}}\" lt-prop-animate=\"{{ltPropSchedulerMenuAnimate}}\" lt-prop-wrapper-class=\"{{ltPropSchedulerMenuWrapperClass}}\" lt-prop-bind-to-body=\"{{ltPropSchedulerMenuBindToBody}}\" on-before-open=\"{{method('menuonbeforeopen')}}\" on-open=\"{{method('menuonopen')}}\" on-before-close=\"{{method('menuonbeforeclose')}}\" on-close=\"{{method('menuonclose')}}\" on-menu-click=\"{{method('menuonclick')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"scheduler-menu\"></lyte-yield> </template> </lyte-menu> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"registerYield","position":[1,1,1,1],"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,3,1]},{"type":"text","position":[1,3,3,1]},{"type":"componentDynamic","position":[1,3,3]},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3,1]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"text","position":[1,5,1,0]},{"type":"text","position":[1,5,3,0]},{"type":"attr","position":[1,5,5]},{"type":"if","position":[1,5,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1,5]},{"type":"attr","position":[1,7,1]},{"type":"text","position":[1,7,1,1,1]},{"type":"attr","position":[1,7,3]},{"type":"registerYield","position":[1,7,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,7,3]},{"type":"attr","position":[1,7,5]},{"type":"text","position":[1,7,5,1,1]},{"type":"componentDynamic","position":[1,7]},{"type":"insertYield","position":[1,9]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]},{"type":"attr","position":[1,3]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,0]},{"type":"switch","position":[3,1,0],"cases":{"month":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1,1]},{"type":"if","position":[0,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropDateArray[0]}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <th class=\"lyteSchedulerMonthTh {{item.buisness}}\"> {{lyteUiI18n(lyteUiSchedulerLabelFormat('ddd',item.val))}} </th> </tr></tbody></table></template>","tagName":"TR"}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{expHandlers(ltPropMultiUserView,'!')}}\"><template case=\"true\" depth=\"1\"><table> <thead> <tr class=\"lyteSchedulerMonthViewHead\"> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropDateArray[0]}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </thead> </table></template></template>"},{"type":"attr","position":[0,1,1,3,1]},{"type":"for","position":[0,1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-scheduler-td-event-count:'","item.events.length"]}}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3]},{"type":"text","position":[3,1,0]},{"type":"text","position":[3,3,0]},{"type":"attr","position":[5]},{"type":"text","position":[5,1,0]},{"type":"text","position":[5,3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"insertYield","position":[1,1,5]},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"forIn","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"insertYield","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"text","position":[3,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"insertYield","position":[0,1]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"text","position":[3,1]}]}},"default":{}}]}},"default":{}}],"actualTemplate":"<template is=\"for\" items=\"{{week}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <td class=\"lyteSchedulerDate lyteSchedulerMenuQuerySelector {{if(ifEquals(item.current_month,true),&quot;lyteSchedulerCurrentMonthDate&quot;,&quot;lyteSchedulerOtherMonthDate&quot;)}} lyteSchedulerAllDayEvent {{item.buisness}} {{if(ifEquals(item.currentDate,true),&quot;lyteSchedulerCurrDate&quot;,&quot;&quot;)}}\"> <div class=\"lyteSchedulerMonthEventsWrap scheduler-event-div\" style=\"--lyte-scheduler-td-event-count:{{item.events.length}}\" data-date=\"{{lyteUiSchedulerGetDate(item.val)}}\"> <template is=\"if\" value=\"{{ltPropMultiUserView}}\"><template case=\"true\"> <template is=\"if\" value=\"{{item.currentDate}}\"><template case=\"true\"><div class=\"lyteSchedulerMonthTodayLabel\">Today</div></template></template> <div class=\"lyteSchedulerMonthYearLabel\" onkeydown=\"{{action('onDateClick',event,item.val)}}\" onclick=\"{{action('onDateClick',event,item.val)}}\"> <span>{{lyteUiSchedulerMonthshortForm(item.month)}}</span> <span>{{item.year}}</span> </div> <div class=\"lyteSchedulerMultiUserMonthViewDateDayLabel\" onkeydown=\"{{action('onDateClick',event,item.val)}}\" onclick=\"{{action('onDateClick',event,item.val)}}\"> <span class=\"lyteSchedulerMultiUserMonthViewDateLabel\">{{item.date}}</span> <span class=\"lyteSchedulerMultiUserMonthViewDayLabel\">{{lyteUiSchedulerLabelFormat('ddd',item.val)}}</span> </div> </template><template case=\"false\"> <span class=\"lyteSchedulerDayNumber\" onclick=\"{{action('onDateClick',event,item.val)}}\" tabindex=\"0\" onkeydown=\"{{action('onDateClick',event,item.val)}}\">{{item.date}}</span> </template></template> <template is=\"if\" value=\"{{expHandlers(index,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropShowWeekNumber}}\"><template case=\"true\"><div class=\"lyteSchedulerWeekNumber\"> {{lyteSchedulerUiFindWeek(item.val)}} </div></template></template> </template></template> <lyte-yield yield-name=\"scheduler-date\" scheduler-date=\"{{item.val}}\"></lyte-yield> <template is=\"if\" value=\"{{item.events}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropMultiUserView}}\"><template case=\"true\"> <template is=\"forIn\" object=\"{{item.events}}\" value=\"value\" key=\"key\"> <template is=\"if\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,key,Index)}}\"><template case=\"true\"><lyte-scheduler-event-tag class=\"{{value.class}} {{if(expHandlers(item.editable,'!'),'lyteSchedulerNoDrag','')}}\" lt-prop-event=\"{{value}}\" data-id=\"{{value.id}}\" id=\"u{{key}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',value,this,key)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this,value,key)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-user=\"{{lyteUiSchedulergetUserData(key,ltPropSchedulerUser)}}\" scheduler-event=\"{{value}}\"> </lyte-yield> <template is=\"if\" value=\"{{expHandlers(value.length,'>',1)}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"scheduler-event-badge\"> <div onclick=\"{{action(&quot;hiddenUserEvent&quot;,event,value,key)}}\" onkeydown=\"{{action(&quot;hiddenUserEvent&quot;,event,value,key)}}\" class=\"lyteSchedulerEventMoreBtn lyteSchedulerUserMoreBtn\" tabindex=\"0\"> {{value.length}} </div> </template> </template></template> </lyte-scheduler-event-tag></template></template> </template> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide\" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val)}}\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val)}}\" tabindex=\"0\"> {{lyteUiSchedulerhiddenEvent(hiddenObj,lyteUiSchedulerGetDate(item.val),this)}} </div> </template><template case=\"false\"> <template is=\"for\" items=\"{{item.events}}\" item=\"event\" index=\"index\"> <template is=\"if\" value=\"{{lyteUiSchedulerEvent(event)}}\"><template case=\"true\"><lyte-scheduler-event-tag class=\"{{event.class}} {{if(expHandlers(event.editable,'!'),'lyteSchedulerNoDrag','')}}\" lt-prop-event=\"{{event}}\" data-id=\"{{event.id}}\" id=\"u{{event.id}}\" event-index=\"{{index}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{event}}\"> </lyte-yield> </lyte-scheduler-event-tag></template><template case=\"false\"><template is=\"if\" value=\"{{ltPropAria}}\"><template case=\"true\"><lyte-scheduler-event-dummy-tag tabindex=\"0\" data-dummyid=\"{{event.dummy_id}}\"> </lyte-scheduler-event-dummy-tag></template></template></template></template> </template> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val)}}\" tabindex=\"0\" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val)}}\"> {{lyteUiSchedulerhiddenEvent(hiddenObj,lyteUiSchedulerGetDate(item.val),this)}} </div> </template></template> </template></template> </div> </td> </tr></tbody></table></template>","tagName":"TR"}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropDateArray}}\" item=\"week\" index=\"index\" depth=\"2\"><table><tbody> <tr> <td is=\"for\" lyte-for=\"true\" items=\"{{week}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </tbody></table></template>","tagName":"TBODY"},{"type":"componentDynamic","position":[0]}]},"week":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-scheduler-user-count:'","ltPropSchedulerUser.length"]}}}},{"type":"attr","position":[0,1,1,1,1,1]},{"type":"if","position":[0,1,1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[0,1,1,1,3]},{"type":"for","position":[0,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"insertYield","position":[0,1,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr><th class=\"lyteSchedulerUserCol\" data-userid=\"{{user.id}}\"> <lyte-scheduler-user lt-prop-userid=\"{{user.id}}\"> <lyte-yield yield-name=\"scheduler-user\" scheduler-user=\"{{user}}\" scheduler-event-count=\"{{lyteUiSchedulerEventCount(ltPropDateArray,user,hiddenObj)}}\"> </lyte-yield> </lyte-scheduler-user> </th></tr></tbody></table></template></template>"}],"actualTemplate":"<template items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" is=\"for\" depth=\"3\"><table><tbody><tr><td is=\"if\" lyte-if=\"true\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"></td></tr></tbody></table></template>","tagName":"TR"},{"type":"attr","position":[0,1,3,1]},{"type":"for","position":[0,1,3,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,1,3]},{"type":"if","position":[0,1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,1,0]},{"type":"text","position":[3,3,0]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"for","position":[0,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"for","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"insertYield","position":[0,1]},{"type":"componentDynamic","position":[0]}]},{"type":"attr","position":[0,1,3]},{"type":"text","position":[0,1,3,1]}],"actualTemplate":"<template items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" is=\"for\" depth=\"3\"><table><tbody><tr><td class=\"lyteSchedulerDate lyteSchedulerAllDayEvent lyteSchedulerMenuQuerySelector\" data-userid=\"{{user.id}}\"> <div class=\"scheduler-event-div\" data-date=\"{{lyteUiSchedulerGetDate(item.val)}}\"> <template items=\"{{lyteUiSchedulerGetProcessedData(ltPropProcessedData,lyteUiSchedulerGetDate(item.val),user.id)}}\" item=\"eventData\" index=\"index\" is=\"for\"><lyte-scheduler-event-tag class=\"{{eventData.class}} {{if(expHandlers(eventData.editable,'!'),'lyteSchedulerNoDrag','')}} lyteSchedulerAllDayEventTag\" lt-prop-event=\"{{eventData}}\" data-id=\"{{eventData.id}}\" id=\"u{{eventData.id}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',eventData,this,key)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this,eventData,key)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-user=\"{{lyteUiSchedulergetUserData(key,ltPropSchedulerUser)}}\" scheduler-event=\"{{eventData}}\"> </lyte-yield> </lyte-scheduler-event-tag></template> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide\" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val,user.id)}}\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val,user.id)}}\" tabindex=\"0\"> {{lyteUiSchedulerhiddenEvent(hiddenObj,lyteUiSchedulerGetDate(item.val),this,user.id)}} </div> </div> </td></tr></tbody></table></template>","tagName":"TR"}],"actualTemplate":"<template items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" is=\"for\" depth=\"2\"><table><tbody><tr> <td class=\"lyteSchedulerWeekTh {{item.buisness}} {{if(ifEquals(item.currentDate,true),&quot;lyteSchedulerCurrDate&quot;,&quot;&quot;)}}\"> <template is=\"if\" value=\"{{expHandlers(index,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropShowWeekNumber}}\"><template case=\"true\"><span class=\"lyteSchedulerWeekNumber\"> {{lyteSchedulerUiFindWeek(item.val)}} </span></template></template> </template></template> <template is=\"if\" value=\"{{ltPropSchedulerLabelFormat}}\"><template case=\"true\"> <div> {{lyteUiSchedulerLabelFormat(ltPropSchedulerLabelFormat,item.val)}} </div> </template><template case=\"false\"> <div class=\"lyteSchedulerMonthLabel\">{{lyteUiI18n(month[item.month])}} </div> <div> <span class=\"lyteSchedulerDateLabel\">{{lyteUiI18n(item.date)}}</span> <span class=\"lyteSchedulerDayLabel\">{{lyteUiI18n(label[index])}}</span> </div> </template></template> </td> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"3\"></td> </tr></tbody></table></template>","tagName":"TBODY"}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1,1,1,1,1]},{"type":"if","position":[0,1,1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,1,1,1,3]},{"type":"for","position":[0,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,1,0]},{"type":"text","position":[3,3,0]}]}},"default":{}}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <th class=\"lyteSchedulerWeekTh {{item.buisness}} {{if(ifEquals(item.currentDate,true),&quot;lyteSchedulerCurrDate&quot;,&quot;&quot;)}}\" onkeydown=\"{{action('onDateClick',event,item.val)}}\" onclick=\"{{action('onDateClick',event,item.val)}}\"> <template is=\"if\" value=\"{{expHandlers(index,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropShowWeekNumber}}\"><template case=\"true\"><span class=\"lyteSchedulerWeekNumber\"> {{lyteSchedulerUiFindWeek(item.val)}} </span></template></template> </template></template> <template is=\"if\" value=\"{{ltPropSchedulerLabelFormat}}\"><template case=\"true\"> <div> {{lyteUiSchedulerLabelFormat(ltPropSchedulerLabelFormat,item.val)}} </div> </template><template case=\"false\"> <div class=\"lyteSchedulerMonthLabel\">{{lyteUiI18n(month[item.month])}} </div> <div> <span class=\"lyteSchedulerDateLabel\">{{lyteUiI18n(item.date)}}</span> <span class=\"lyteSchedulerDayLabel\">{{lyteUiI18n(label[index])}}</span> </div> </template></template> </th> </tr></tbody></table></template>","tagName":"TR"},{"type":"attr","position":[0,1,3,1]},{"type":"for","position":[0,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"insertYield","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-scheduler-td-event-count: '","item.events[user.id].length"]}}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"insertYield","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,1]}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <td class=\"{{item.buisness}} {{if(ifEquals(item.currentDate,true),&quot;lyteSchedulerCurrDate&quot;,&quot;&quot;)}} lyteSchedulerDate lyteSchedulerMenuQuerySelector lyteSchedulerAllDayEvent\"> <div class=\"scheduler-event-div\" data-date=\"{{lyteUiSchedulerGetDate(item.val)}}\" style=\"--lyte-scheduler-td-event-count: {{item.events[user.id].length}}\"> <template is=\"if\" value=\"{{item.events}}\"><template case=\"true\"> <template is=\"for\" items=\"{{item.events[user.id]}}\" item=\"event\" index=\"index\"> <template is=\"if\" value=\"{{lyteUiSchedulerEvent(event)}}\"><template case=\"true\"><lyte-scheduler-event-tag event-index=\"{{index}}\" class=\"{{event.class}} {{if(expHandlers(event.editable,'!'),'lyteSchedulerNoDrag','')}}\" lt-prop-event=\"{{event}}\" data-id=\"{{event.id}}\" id=\"u{{event.id}}_{{user.id}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this,null,user.id)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{event}}\"> </lyte-yield> </lyte-scheduler-event-tag></template></template> </template> </template></template> </div> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val,user.id)}}\" tabindex=\"0\" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val,user.id)}}\"> {{lyteUiSchedulerhiddenEvent(hiddenObj,lyteUiSchedulerGetDate(item.val),this,user.id)}} </div> </td> </tr></tbody></table></template>","tagName":"TR"}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"><template case=\"true\" depth=\"2\"><table><tbody> <tr data-userid=\"{{user.id}}\" class=\"lyteSchedulerMultiUserRow\"> <td class=\"lyteSchedulerUserCol\"> <lyte-scheduler-user lt-prop-userid=\"{{user.id}}\"> <lyte-yield yield-name=\"scheduler-user\" scheduler-user=\"{{user}}\" scheduler-event-count=\"{{lyteUiSchedulerEventCount(ltPropDateArray,user,hiddenObj)}}\"> </lyte-yield> </lyte-scheduler-user> </td> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </tbody></table></template></template>"}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"2\"><table><tbody> <tr is=\"if\" lyte-if=\"true\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"></tr> </tbody></table></template>","tagName":"TBODY"}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,3,1,1,1,3]},{"type":"for","position":[1,3,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"text","position":[3,1,0]},{"type":"text","position":[3,3,0]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <th class=\"lyteSchedulerWeekTh {{if(ifEquals(item.currentDate,true),&quot;lyteSchedulerCurrDate&quot;,&quot;&quot;)}} {{item.buisness}}\" onkeydown=\"{{action('onDateClick',event,item.val)}}\" onclick=\"{{action('onDateClick',event,item.val)}}\" tabindex=\"0\"> <template is=\"if\" value=\"{{ltPropSchedulerLabelFormat}}\"><template case=\"true\"> <div> {{lyteUiSchedulerLabelFormat(ltPropSchedulerLabelFormat,item.val)}} </div> <template is=\"if\" value=\"{{expHandlers(index,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropShowWeekNumber}}\"><template case=\"true\"><span class=\"lyteSchedulerWeekNumber\"> {{lyteSchedulerUiFindWeek(item.val)}} </span></template></template> </template></template> </template><template case=\"false\"> <div class=\"lyteSchedulerMonthLabel\"> {{lyteUiI18n(month[item.month])}} </div> <div> <span class=\"lyteSchedulerDateLabel\">{{item.date}}</span> <span class=\"lyteSchedulerDayLabel\">{{lyteUiI18n(label[index])}}</span> </div> <template is=\"if\" value=\"{{expHandlers(index,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropShowWeekNumber}}\"><template case=\"true\"><span class=\"lyteSchedulerWeekNumber\"> {{lyteSchedulerUiFindWeek(item.val)}} </span></template></template> </template></template> </template></template> </th> </tr></tbody></table></template>","tagName":"TR"},{"type":"text","position":[1,3,1,1,3,1,1,1]},{"type":"text","position":[1,3,1,1,3,1,1,3]},{"type":"attr","position":[1,3,1,1,3,3]},{"type":"for","position":[1,3,1,1,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"insertYield","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"text","position":[3,1]}]}},"default":{}}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <td class=\"lyteSchedulerDate lyteSchedulerMenuQuerySelector lyteSchedulerAllDayEvent {{item.buisness}}\" data-index=\"{{index}}\"> <div class=\"scheduler-event-div\" data-date=\"{{lyteUiSchedulerGetDate(item.val)}}\"> <template is=\"if\" value=\"{{item.allDay}}\"><template case=\"true\"> <template is=\"for\" items=\"{{item.allDay}}\" item=\"event\" index=\"index\"> <template is=\"if\" value=\"{{event}}\"><template case=\"true\"> <template is=\"if\" value=\"{{lyteUiSchedulerEvent(event)}}\"><template case=\"true\"><lyte-scheduler-event-tag event-index=\"{{index}}\" class=\"{{event.class}} {{if(expHandlers(event.editable,'!'),'lyteSchedulerNoDrag','')}}\" data-group=\"{{key}}\" lt-prop-event=\"{{event}}\" data-id=\"{{event.id}}\" id=\"u{{event.id}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{event}}\"> </lyte-yield> </lyte-scheduler-event-tag></template></template> </template></template> </template> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj.allDay,item.val,undefined,undefined,ltPropSchedulerView,true)}}\" tabindex=\"0\" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj.allDay,item.val,undefined,undefined,ltPropSchedulerView,true)}}\"> {{lyteUiSchedulerhiddenEvent(hiddenObj.allDay,lyteUiSchedulerGetDate(item.val),this)}} </div> </template></template> </div> </td> </tr></tbody></table></template>","tagName":"TR"},{"type":"attr","position":[1,3,1,3,1]},{"type":"for","position":[1,3,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <td data-index=\"{{index}}\" class=\"lyteSchedulerMenuQuerySelector\" data-date=\"{{lyteUiSchedulerGetDate(item.val)}}\"></td> </tr></tbody></table></template>","tagName":"TR"}],"actualTemplate":"<template is=\"for\" items=\"{{timelineArray}}\" item=\"min\" index=\"index\" depth=\"2\"><table><tbody> <tr id=\"T{{lyteUiSchedulerTimeFormat(time,min,null,false,true)}}\" data-time=\"{{lyteUiSchedulerTimeFormat(time,min,null,false)}}\" class=\"lyteSchedulerDate lyteSchedulerTimeLineEvent {{lyteUiSchedulerBusinessHour(ltPropBusinessHour,this)}}\"> <td class=\"lyteSchedulerTimelineTd\"> <div class=\"lyteSchedulerHourLabel\"> {{lyteUiSchedulerTimeFormat(time,min,ltPropContinentalTimeFormat,true)}}</div> <div class=\"lyteSchedulerHourQuarterLine\"></div> <div class=\"lyteSchedulerHourHalfLine\"></div> <div class=\"lyteSchedulerHourQuarterLine\"></div> </td> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </tbody></table></template>","tagName":"TBODY"}],"actualTemplate":"<template is=\"for\" items=\"{{timeLine}}\" item=\"time\" index=\"index\" depth=\"2\"><table><tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{timelineArray}}\" item=\"min\" index=\"index\" depth=\"2\"></tr> </tbody></table></template>","tagName":"TBODY"},{"type":"attr","position":[1,3,3,1,1,1,3]},{"type":"for","position":[1,3,3,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"forIn","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]},{"type":"attr","position":[2]},{"type":"text","position":[2,1]}]}},"default":{}}]}]}},"default":{}}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropDateArray}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <td class=\"lyteSchedulerDate {{if(ifEquals(item.currentDate,true),&quot;lyteSchedulerCurrDate&quot;,&quot;&quot;)}} {{item.buisness}}\"> <div class=\"scheduler-event-div\" data-date=\"{{lyteUiSchedulerGetDate(item.val)}}\"> <template is=\"if\" value=\"{{item.events}}\"><template case=\"true\"> <template is=\"forIn\" object=\"{{item.events}}\" value=\"events\" key=\"key\"> <template is=\"if\" value=\"{{expHandlers(key,'!==','allDayEvent')}}\"><template case=\"true\"><template is=\"for\" items=\"{{events}}\" item=\"colArray\" index=\"colindex\"><template is=\"for\" items=\"{{colArray}}\" item=\"event\" index=\"rowIndex\"> <lyte-scheduler-event-tag class=\"{{event.event.class}} {{if(expHandlers(event.event.editable,'!'),'lyteSchedulerNoDrag','')}}\" data-group=\"{{key}}\" lt-prop-event=\"{{event.event}}\" data-id=\"{{event.event.id}}\" id=\"u{{event.event.id}}\" lt-prop-col=\"{{event.col}}\" lt-prop-row=\"{{rowIndex}}\" lt-prop-intersect=\"{{event.intersect}}\" lt-prop-prevelem=\"{{event.prevElem}}\" lt-prop-count=\"{{events.length}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\" lt-prop-islast=\"{{if(ifEquals(colindex,expHandlers(events.length,'-',1)),true,false)}}\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{event.event}}\"> </lyte-yield> <template is=\"if\" value=\"{{expHandlers(event.event.editable,'&amp;&amp;',expHandlers(event.event._editable,'!'))}}\"><template case=\"true\"><span class=\"lyteSchedulerGrabResize\"></span></template></template> </lyte-scheduler-event-tag> </template></template> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide\" data-group=\"{{key}}\" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val)}}\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj,item.val)}}\" tabindex=\"0\"> {{lyteUiSchedulerhiddenEvent(hiddenObj,lyteUiSchedulerGetDate(item.val),this,'',key)}} </div> </template></template> </template> </template></template> </div> </td> </tr></tbody></table></template>","tagName":"TR"}]}},"default":{}},{"type":"componentDynamic","position":[0]}]},"day":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-scheduler-user-count:'","ltPropSchedulerUser.length"]}}}},{"type":"attr","position":[1,1,1,1,1,1]},{"type":"if","position":[1,1,1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,1,1,3]},{"type":"for","position":[1,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"insertYield","position":[0,1,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr><th class=\"lyteSchedulerMultiUserRow lyteSchedulerUserCol\" data-userid=\"{{user.id}}\"> <lyte-scheduler-user lt-prop-userid=\"{{user.id}}\"> <lyte-yield yield-name=\"scheduler-user\" scheduler-user=\"{{user}}\" scheduler-event-count=\"{{lyteUiSchedulerEventCount(ltPropDateObj,user,hiddenObj,startDateOfView)}}\"> </lyte-yield> </lyte-scheduler-user> </th></tr></tbody></table></template></template>"}],"actualTemplate":"<template items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" is=\"for\" depth=\"3\"><table><tbody><tr><td is=\"if\" lyte-if=\"true\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"></td></tr></tbody></table></template>","tagName":"TR"},{"type":"text","position":[1,1,1,3,1,1,0]},{"type":"text","position":[1,1,1,3,1,1,2]},{"type":"attr","position":[1,1,1,3,3]},{"type":"for","position":[1,1,1,3,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3]},{"type":"text","position":[3,1]}]}},"default":{}}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr><td class=\"lyteSchedulerDate lyteSchedulerAllDayEvent\" data-userid=\"{{user.id}}\"> <div class=\"scheduler-event-div\" data-date=\"{{startDateOfView}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(ltPropProcessedData,'&amp;&amp;',startDateOfView),'&amp;&amp;',ltPropProcessedData.allDay),'&amp;&amp;',ltPropProcessedData.allDay[startDateOfView])}}\"><template case=\"true\"> <template is=\"for\" items=\"{{ltPropProcessedData.allDay[startDateOfView][user.id]}}\" item=\"events\" index=\"index\"> <lyte-scheduler-event-tag event-index=\"{{index}}\" class=\"{{events.class}} {{if(expHandlers(events.editable,'!'),'lyteSchedulerNoDrag','')}}\" lt-prop-event=\"{{events}}\" data-id=\"{{events.id}}\" id=\"u{{events.id}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{events}}\"> </lyte-yield> </lyte-scheduler-event-tag> </template> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj.allDay,startDateOfView,user.id,null,null,true)}}\" tabindex=\"0\" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj.allDay,startDateOfView,user.id,null,null,true)}}\"> {{lyteUiSchedulerhiddenEvent(hiddenObj.allDay,startDateOfView,this,user.id)}} </div> </template></template> </div> </td></tr></tbody></table></template></template>"}],"actualTemplate":"<template items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" is=\"for\" depth=\"3\"><table><tbody><tr><td is=\"if\" lyte-if=\"true\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"></td></tr></tbody></table></template>","tagName":"TR"},{"type":"attr","position":[1,1,3,1]},{"type":"for","position":[1,1,3,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1,1,1]},{"type":"attr","position":[0,3]},{"type":"for","position":[0,3],"dynamicNodes":[{"type":"attr","position":[0]}],"actualTemplate":"<template items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" is=\"for\" depth=\"3\"><table><tbody><tr><td class=\"lyteSchedulerMenuQuerySelector lyteSchedulerTimeLineEvent\" data-userid=\"{{user.id}}\"> </td></tr></tbody></table></template>","tagName":"TR"}],"actualTemplate":"<template items=\"{{timeLine}}\" item=\"time\" index=\"index\" is=\"for\" depth=\"2\"><table><tbody><tr id=\"T{{lyteUiSchedulerTimeFormat(time,min,null,false,true)}}\" data-time=\"{{lyteUiSchedulerTimeFormat(time,min,null,false)}}\" class=\"lyteSchedulerDate {{lyteUiSchedulerBusinessHour(ltPropBusinessHour,this)}}\"> <td class=\"lyteSchedulerTimelineTd\"> <div class=\"lyteSchedulerHourLabel\"> {{lyteUiSchedulerTimeFormat(time,null,ltPropContinentalTimeFormat,true)}} </div> <div class=\"lyteSchedulerHourQuarterLine\"></div> <div class=\"lyteSchedulerHourHalfLine\"></div> <div class=\"lyteSchedulerHourQuarterLine\"></div> </td> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"3\"></td> </tr></tbody></table></template>","tagName":"TBODY"},{"type":"attr","position":[1,3,1,1,1,3]},{"type":"for","position":[1,3,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"forIn","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]}]}]}},"default":{}}],"actualTemplate":"<template items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" is=\"for\" depth=\"3\"><table><tbody><tr><td class=\"lyteSchedulerDate\"> <div class=\"scheduler-event-div\" data-date=\"{{startDateOfView}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropProcessedData,'&amp;&amp;',ltPropProcessedData[startDateOfView]),'&amp;&amp;',ltPropProcessedData[startDateOfView][user.id])}}\"><template case=\"true\"> <template is=\"forIn\" object=\"{{ltPropProcessedData[startDateOfView][user.id]}}\" value=\"events\" key=\"key\"> <template is=\"for\" items=\"{{events}}\" item=\"colArray\" index=\"index\"><template is=\"for\" items=\"{{colArray}}\" item=\"event\" index=\"rowIndex\"> <lyte-scheduler-event-tag event-index=\"{{index}}\" class=\"{{event.event.class}} {{if(expHandlers(event.event.editable,'!'),'lyteSchedulerNoDrag','')}}\" lt-prop-event=\"{{event.event}}\" data-id=\"{{event.event.id}}\" id=\"u{{event.event.id}}\" lt-prop-col=\"{{event.col}}\" lt-prop-row=\"{{rowIndex}}\" lt-prop-intersect=\"{{event.intersect}}\" lt-prop-prevelem=\"{{event.prevElem}}\" lt-prop-count=\"{{events.length}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{event.event}}\"> </lyte-yield> <template is=\"if\" value=\"{{expHandlers(event.event.editable,'&amp;&amp;',expHandlers(event.event._editable,'!'))}}\"><template case=\"true\"><span class=\"lyteSchedulerGrabResize\"></span></template></template> </lyte-scheduler-event-tag> </template> </template> </template> </template></template> </div> </td></tr></tbody></table></template>","tagName":"TR"}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1,1,1]},{"type":"if","position":[1,1,1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,1,1,3]},{"type":"if","position":[1,1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,1,2]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{expHandlers(ltPropHideAlldayEvent,'!')}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr><th class=\"lyteSchedulerAllDayTh\"> <div class=\"lyteSchedulerMultiUserAllDay\">{{lyteUiI18n('all-day')}} ({{lyteUiSchedulerAllDayCount(ltPropProcessedData,hiddenObj,startDateOfView,ltPropSchedulerView,ltPropMultiUserView)}}) </div> </th></tr></tbody></table></template></template>"},{"type":"attr","position":[1,1,1,1,5]},{"type":"for","position":[1,1,1,1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}],"actualTemplate":"<template is=\"for\" items=\"{{daytimelineArray}}\" item=\"min\" index=\"index\" depth=\"3\"><table><tbody><tr> <th data-time=\"{{lyteUiSchedulerTimeFormat(item,min,ltPropContinentalTimeFormat,true)}}\"> {{lyteUiSchedulerTimeFormat(item,min,ltPropContinentalTimeFormat,true)}} <div class=\"lyteSchedulerHourSplitLineWrap\"> <span class=\"lyteSchedulerHourSplitLine\"></span> <span class=\"lyteSchedulerHourSplitLine\"></span> <span class=\"lyteSchedulerHourSplitLine\"></span> <span class=\"lyteSchedulerHourSplitLine\"></span> <span class=\"lyteSchedulerHourSplitLine\"></span> </div> <div class=\"lyteSchedulerHourSeparatorLine\"></div> </th> </tr></tbody></table></template>","tagName":"TR"}],"actualTemplate":"<template is=\"for\" items=\"{{timeLine}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <td is=\"for\" lyte-for=\"true\" items=\"{{daytimelineArray}}\" item=\"min\" index=\"index\" depth=\"3\"></td> </tr></tbody></table></template>","tagName":"TR"},{"type":"attr","position":[1,1,3,1]},{"type":"for","position":[1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"insertYield","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-scheduler-td-event-count: '","ltPropDateObj.allDay[user.id].length"]}}}},{"type":"attr","position":[0,1,1]},{"type":"for","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[0,1,3]},{"type":"text","position":[0,1,3,1]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{expHandlers(ltPropHideAlldayEvent,'!')}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr><td class=\"lyteSchedulerDate lyteSchedulerMenuQuerySelector lyteSchedulerAllDayEvent\"> <div class=\"scheduler-event-div \" data-date=\"{{startDateOfView}}\" style=\"--lyte-scheduler-td-event-count: {{ltPropDateObj.allDay[user.id].length}}\"> <template is=\"for\" items=\"{{ltPropDateObj.allDay[user.id]}}\" item=\"event\" index=\"index\"> <lyte-scheduler-event-tag event-index=\"{{index}}\" class=\"{{event.class}} {{if(expHandlers(event.editable,'!'),'lyteSchedulerNoDrag','')}}\" lt-prop-event=\"{{event}}\" data-id=\"{{event.id}}\" id=\"u{{event.id}}_{{user.id}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this,null,user.id)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{event}}\"> </lyte-yield> </lyte-scheduler-event-tag> </template> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide\" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj.allDay,startDateOfView,user.id,null,ltPropSchedulerView,true)}}\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj.allDay,startDateOfView,user.id,null,ltPropSchedulerView,true)}}\" tabindex=\"0\"> {{lyteUiSchedulerhiddenEvent(hiddenObj.allDay,startDateOfView,this,user.id)}} </div> </div> </td></tr></tbody></table></template></template>"},{"type":"attr","position":[1,5]},{"type":"for","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,1]}],"actualTemplate":"<template is=\"for\" items=\"{{daytimelineArray}}\" item=\"min\" index=\"index\" depth=\"3\"><table><tbody><tr> <td class=\"lyteSchedulerTimeLineEvent lyteSchedulerDate lyteSchedulerMenuQuerySelector {{lyteUiSchedulerUserBusinessHour(user.businessHour,lyteUiSchedulerTimeFormat(time,min,null,false),&quot;lyteSchedulerUserBusinessHour&quot;)}}\"> <div id=\"T{{lyteUiSchedulerTimeFormat(time,null,null,false,true)}}\" data-time=\"{{lyteUiSchedulerTimeFormat(time,min,null,false)}}\" class=\"lyteSchedulerMultiUserViewEventElem scheduler-event-div\"> <template is=\"if\" value=\"{{lyteUiSchedulerCombineTimeMinutes(ltPropDateObj,user.id,time,min)}}\"><template case=\"true\"> <template is=\"for\" items=\"{{lyteUiSchedulerCombineTimeMinutes(ltPropDateObj,user.id,time,min)}}\" item=\"eventRow\" index=\"rowIndex\"><template is=\"for\" items=\"{{eventRow}}\" item=\"event\" index=\"index\"><template is=\"if\" value=\"{{expHandlers(expHandlers(lyteUiIsEmptyObject(event),'!'),'&amp;&amp;',expHandlers(event.hiddenid,'!'))}}\"><template case=\"true\"> <lyte-scheduler-event-tag class=\"{{event.class}} {{if(expHandlers(event.editable,'!'),'lyteSchedulerNoDrag','')}}\" lt-prop-event=\"{{event}}\" event-index=\"{{rowIndex}}\" data-group=\"{{schedulerGroup}}\" data-id=\"{{event.id}}\" id=\"u{{event.id}}_{{user.id}}\" event-render=\"{{method('eventRender')}}\" onclick=\"{{action('onSchedulerEventClick',event,this)}}\" onmouseover=\"{{action('onSchedulerEventHover',event,this,null,user.id)}}\" onmousedown=\"{{action('onSchedulerEventMouseDown',event,this)}}\" tabindex=\"0\"> <lyte-yield yield-name=\"scheduler-event\" scheduler-event=\"{{event}}\"> </lyte-yield> <template is=\"if\" value=\"{{event.editable}}\"><template case=\"true\"><span class=\"lyteSchedulerHorizontalResizeIcon lyteSchedulerHorizontalLeftResize\"></span></template></template> <template is=\"if\" value=\"{{event.editable}}\"><template case=\"true\"><span class=\"lyteSchedulerHorizontalResizeIcon lyteSchedulerHorizontalRightResize\"></span></template></template> </lyte-scheduler-event-tag> </template></template> </template></template> </template></template> </div> <div class=\"lyteSchedulerEventMoreBtn lyteSchedulerEventMoreBtnHide\" onkeydown=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj[startDateOfView][user.id],startDateOfView,user,time,ltPropSchedulerView)}}\" onclick=\"{{action(&quot;hiddenEvent&quot;,event,hiddenObj[startDateOfView][user.id],startDateOfView,user,time,ltPropSchedulerView)}}\" tabindex=\"0\"> {{lyteUiSchedulerhiddenEvent(hiddenObj,startDateOfView,this,user.id,null,time,ltPropSchedulerView)}} </div> </td> </tr></tbody></table></template>","tagName":"TR"}],"actualTemplate":"<template is=\"for\" items=\"{{timeLine}}\" item=\"time\" index=\"index\" depth=\"3\"><table><tbody><tr> <td is=\"for\" lyte-for=\"true\" items=\"{{daytimelineArray}}\" item=\"min\" index=\"index\" depth=\"3\"></td> </tr></tbody></table></template>","tagName":"TR"}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"><template case=\"true\" depth=\"2\"><table><tbody> <tr class=\"lyteSchedulerMultiUserRow\" data-userid=\"{{user.id}}\"> <td class=\"lyteSchedulerUserCol lyteSchedulerFixedCol\"> <lyte-scheduler-user lt-prop-user=\"{{user.id}}\"> <lyte-yield yield-name=\"scheduler-user\" scheduler-user=\"{{user}}\" scheduler-event-count=\"{{lyteUiSchedulerEventCount(ltPropDateObj,user,hiddenObj,startDateOfView)}}\"> </lyte-yield> </lyte-scheduler-user> </td> <td is=\"if\" lyte-if=\"true\" value=\"{{expHandlers(ltPropHideAlldayEvent,'!')}}\"></td> <td is=\"for\" lyte-for=\"true\" items=\"{{timeLine}}\" item=\"time\" index=\"index\" depth=\"3\"></td> </tr> </tbody></table></template></template>"}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropSchedulerUser}}\" item=\"user\" index=\"index\" depth=\"2\"><table><tbody> <tr is=\"if\" lyte-if=\"true\" value=\"{{lyteUiSchedulerisSearch(selectedUserArr,user.id)}}\"></tr> </tbody></table></template>","tagName":"TBODY"},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[5]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"componentDynamic","position":[7]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1,1,1,1]},{"type":"if","position":[1,1,1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,1,1]},{"type":"text","position":[0,1,3]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{ltPropMultiUserView}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr><td>{{lyteUiI18n('all-day')}}</td></tr></tbody></table></template><template case=\"false\" depth=\"3\"><table><tbody><tr><td class=\"lyteSchedulerTimelineColAllDayTd\"> <div class=\"lyteSchedulerSingleUserAllDay\"> {{lyteUiI18n('all-day')}} ({{lyteUiSchedulerAllDayCount(ltPropProcessedData,hiddenObj,startDateOfView,ltPropSchedulerView,ltPropMultiUserView)}}) </div> </td></tr></tbody></table></template></template>"},{"type":"attr","position":[1,1,1,1,1,3,1]},{"type":"attr","position":[1,1,1,1,1,3,1,1]},{"type":"for","position":[1,1,1,1,1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"insertYield","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[1,1,1,1,1,3,1,3]},{"type":"text","position":[1,1,1,1,1,3,1,3,1]},{"type":"attr","position":[1,1,1,3,1]},{"type":"for","position":[1,1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1,1]}],"actualTemplate":"<template is=\"for\" items=\"{{timelineArray}}\" item=\"min\" index=\"index\" depth=\"2\"><table><tbody> <tr id=\"T{{lyteUiSchedulerTimeFormat(time,min,null,false,true)}}\" data-time=\"{{lyteUiSchedulerTimeFormat(time,min,null,false)}}\" class=\"lyteSchedulerDate lyteSchedulerMenuQuerySelector lyteSchedulerTimeLineEvent {{lyteUiSchedulerBusinessHour(ltPropBusinessHour,this)}}\"> <td class=\"lyteSchedulerTimelineTd\"> <div class=\"lyteSchedulerHourLabel\"> {{lyteUiSchedulerTimeFormat(time,min,ltPropContinentalTimeFormat,true)}} </div> <div class=\"lyteSchedulerHourQuarterLine\"></div> <div class=\"lyteSchedulerHourHalfLine\"></div> <div class=\"lyteSchedulerHourQuarterLine\"></div> </td> <td>&nbsp;</td> </tr> </tbody></table></template>","tagName":"TBODY"}],"actualTemplate":"<template is=\"for\" items=\"{{timeLine}}\" item=\"time\" index=\"index\" depth=\"2\"><table><tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{timelineArray}}\" item=\"min\" index=\"index\" depth=\"2\"></tr> </tbody></table></template>","tagName":"TBODY"},{"type":"text","position":[1,1,3,1,1,1,1,1,0]},{"type":"attr","position":[1,1,3,1,3,1,3,1]},{"type":"attr","position":[1,1,3,1,3,1,3,1,1]},{"type":"forIn","position":[1,1,3,1,3,1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]}]}},"default":{}}]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"insertYield","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"registerYield","position":[7,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[7]},{"type":"attr","position":[9]},{"type":"registerYield","position":[9,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"insertYield","position":[1,3]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[9]},{"type":"attr","position":[11]},{"type":"if","position":[11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropEvent","ltPropFormat","ltPropDraggable","ltPropMaxAllDayEvent","ltPropMaxTimelineEvent","ltPropMultiUserView","ltPropSchedulerUser","ltPropBusinessDays","ltPropBusinessHour","ltPropSchedulerView","ltPropSchedulerHeaderYield","ltPropCalendarEvent","ltPropEnableDayViewTimeline","ltPropShowEventInCalendar","ltPropShowDayViewCurrentTime","ltPropHideAlldayEvent","ltPropCustomTimeline","ltPropAria","ltPropTimezone","ltPropUserBasedView","ltPropHiddenEventPopoverFreeze","ltPropCalendarPopoverFreeze","ltPropCalendarHeaderType","ltPropHideCalendarNav","ltPropWeekEventOverlap","ltPropEventGap","ltPropTimelineNmore","ltPropHiddenPopoverWrapper","ltPropCalendarPopoverWrapper","ltPropDragThershold","ltPropContinentalTimeFormat","ltPropyieldNav","ltPropTitleYield","ltPropShowWeekNumber","ltPropPopoverAllowMultiple","ltPropWorkingDayOnly","ltPropSchedulerLabelFormat","ltPropShowCurrentTime","ltPropManipulatedEvent","ltPropLabel","ltPropCurrMonth","ltdisplayCurrDate","ltPropCurDay","ltPropDisplayYear","ltPropWeekStart","openSchedulerPopover","ltPropTimeLine","timeLine","timelineArray","currDay","ltCurrStartDate","ltCurrEndDate","ltPropCurrentDate","labelFF","label","month","montharray","DateArray","days","startDateOfView","hiddenObj","eventArr","todayButton","ltPropSchedulerSearch","ltPropSchedulerSearchYield","selectionType","ltPropSortUser","EventPresent","checkboxArr","selectedUserArr","ltPropSchedulerMenu","ltPropSchedulerMenuYield","ltPropSchedulerMenuContent","ltPropSchedulerMenuUserValue","ltPropSchedulerMenuSystemValue","ltPropSchedulerMenuDescription","ltPropSchedulerMenuId","ltPropSchedulerMenuClass","ltPropSchedulerMenuPosition","ltPropSchedulerMenuWidth","ltPropSchedulerMenuHeight","ltPropSchedulerMenuCallout","ltPropSchedulerMenuFreeze","ltPropSchedulerMenuQueryClass","ltPropSchedulerMenuBindToBody","ltPropSchedulerMenuAnimate","ltPropSchedulerMenuWrapperClass","ltPropSchedulerMenuAria","ltPropSchedulerMenuAriaAttribute","isEventAdded","isResizing","dragDir","currEventTag","breakpoint","ybreakpoint","curPgX","curPgY","quadrant","ltPropEventResize","tempResizeClientY","hiddenUser","hasEventHeight"],
_observedAttributesType :["array","string","boolean","number","number","boolean","array","array","array","string","boolean","array","boolean","boolean","boolean","boolean","object","boolean","string","boolean","boolean","boolean","boolean","boolean","boolean","number","boolean","string","string","number","boolean","boolean","boolean","boolean","boolean","boolean","string","boolean","array","array","number","string","string","number","number","boolean","number","array","array","string","string","string","object","array","array","array","array","array","array","string","object","object","string","boolean","boolean","string","boolean","array","array","array","boolean","boolean","array","string","string","string","string","string","string","string","string","boolean","boolean","string","boolean","boolean","string","boolean","object","boolean","boolean","string","string","number","number","number","number","number","boolean","number","object","boolean"],

	data : function(){
		return {
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {array} ltPropEvent
             */
			'ltPropEvent' : Lyte.attr('array' ,{ default : [] } ),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {string} ltPropFormat
             */
			'ltPropFormat' : Lyte.attr('string',{ default : 'DD-MM-YYYY hh:mm A'}),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {boolean} ltPropDraggable
			 * @default false
             */
			'ltPropDraggable' : Lyte.attr('boolean',{default:false}),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {number} ltPropMaxAllDayEvent
			 * @default 5
             */
			'ltPropMaxAllDayEvent' : Lyte.attr('number',{default: 5}),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {number} ltPropMaxTimelineEvent
			 * @default 2
             */
			'ltPropMaxTimelineEvent' : Lyte.attr('number',{default: 2}),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {boolean} ltPropMultiUserView
			 * @default false
             */
			'ltPropMultiUserView' : Lyte.attr('boolean',{default: false}),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {array} ltPropSchedulerUser
             */
			'ltPropSchedulerUser' : Lyte.attr('array',{default:[]}),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {array} ltPropBusinessDays
             */
			'ltPropBusinessDays' : Lyte.attr('array',{default:[1,2,3,4,5]}),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {array} ltPropBusinessHour
             */
			'ltPropBusinessHour' : Lyte.attr('array',{default:['09:00 AM','06:00 PM']}),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {string} ltPropSchedulerView
			 * @default month
             */
			'ltPropSchedulerView' : Lyte.attr('string',{default:'month'}),
			/**
             * This specifies the type of the scheduler.
             * @componentProperty {boolean} ltPropSchedulerHeaderYield
			 * @default false
             */
			'ltPropSchedulerHeaderYield' : Lyte.attr('boolean',{ default : false }),
			'ltPropCalendarEvent' : Lyte.attr('array',{ default : [] }),
			'ltPropEnableDayViewTimeline' : Lyte.attr('boolean',{ default : false }),
			'ltPropShowEventInCalendar' : Lyte.attr('boolean',{ default : false }),
			'ltPropShowDayViewCurrentTime' : Lyte.attr('boolean',{ default : false }),
			'ltPropHideAlldayEvent' : Lyte.attr('boolean',{ default : false }),
			'ltPropCustomTimeline' : Lyte.attr('object',{default: {}}),
			'ltPropAria' : Lyte.attr('boolean',{ default : false }),
			'ltPropTimezone' : Lyte.attr('string',{ default : '' }),
			'ltPropUserBasedView' : Lyte.attr('boolean',{default: false}),
			'ltPropHiddenEventPopoverFreeze' : Lyte.attr('boolean',{default : false}),
			'ltPropCalendarPopoverFreeze' : Lyte.attr('boolean',{default : false}),
			'ltPropCalendarHeaderType' : Lyte.attr('boolean',{default : false}),
			'ltPropHideCalendarNav' : Lyte.attr('boolean',{default : false}),
			'ltPropWeekEventOverlap' : Lyte.attr('boolean',{default : false}),
			'ltPropEventGap' : Lyte.attr('number',{default : 5}),
			'ltPropTimelineNmore' : Lyte.attr('boolean',{default: true}),
			"ltPropHiddenPopoverWrapper" : Lyte.attr('string',{default : ''}),
			'ltPropCalendarPopoverWrapper' : Lyte.attr('string',{default : ''}),
			'ltPropDragThershold' : Lyte.attr('number',{default : 5}),
			'ltPropContinentalTimeFormat' : Lyte.attr('boolean',{default : false}),
			'ltPropyieldNav' : Lyte.attr('boolean',{default : false}),
			'ltPropTitleYield' : Lyte.attr('boolean',{ default : false }),
			'ltPropShowWeekNumber' : Lyte.attr('boolean',{dafault: false}),
			'ltPropPopoverAllowMultiple' : Lyte.attr('boolean',{default: false}),
			'ltPropWorkingDayOnly' : Lyte.attr('boolean',{default: false}),
			'ltPropSchedulerLabelFormat' : Lyte.attr('string'),	
			'ltPropShowCurrentTime' : Lyte.attr('boolean',{default : true}),
			'ltPropManipulatedEvent' : Lyte.attr('array',{ default : [] }),
			'ltPropLabel' :  Lyte.attr('array',{default : ['SUN','MON','TUE','WED','THU','FRI','SAT']}),
			'ltPropCurrMonth' : Lyte.attr('number'),
			'ltdisplayCurrDate' : Lyte.attr('string'),
			'ltPropCurDay' :Lyte.attr('string'),
			'ltPropDisplayYear' : Lyte.attr('number'),
			'ltPropWeekStart' : Lyte.attr('number'),
			'openSchedulerPopover' : Lyte.attr('boolean',{default: false}),
			'ltPropTimeLine' : Lyte.attr('number',{default : 30}),
			'timeLine' : Lyte.attr('array',{ default:['12am','1am','2am','3am','4am','5am','6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm']}),
			'timelineArray' : Lyte.attr('array',{default:[]}),
			'currDay' : Lyte.attr('string'),
			'ltCurrStartDate' : Lyte.attr('string'),
			'ltCurrEndDate' : Lyte.attr('string'),
			'ltPropCurrentDate' : Lyte.attr('object',{default : new Date()}),
			'labelFF' :  Lyte.attr('array',{default : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']}),
			'label' : Lyte.attr('array',{default : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']}),
			'month' :  Lyte.attr( 'array', { default : [ 'January', 'February', 'March', 'April', 'May','June' ,'July','August','September','October','November','December' ] } ),
			'montharray' : Lyte.attr('array', { default : [] } ),
			'DateArray' : Lyte.attr('array', { default : [] } ),
			"days" : Lyte.attr('array',{default:['sunday','monday','tuesday','wednesday','thursday','friday','saturday']}),
			"startDateOfView" : Lyte.attr('string',{default : ''}),
			"hiddenObj" : Lyte.attr('object',{default:{}}),
			"eventArr" : Lyte.attr('object',{default:{}}),
			"todayButton": Lyte.attr('string',{default:_lyteUiUtils.i18n('today')}),
			'ltPropSchedulerSearch': Lyte.attr('boolean',{default : false}),
			'ltPropSchedulerSearchYield' : Lyte.attr('boolean',{default : false}),
			"selectionType" : Lyte.attr('string',{default:''}),
			'ltPropSortUser' : Lyte.attr('boolean',{default: false}),
			'EventPresent' : Lyte.attr('array', { default: [] }),
			'checkboxArr' : Lyte.attr('array',{default:[]}),
			"selectedUserArr" : Lyte.attr('array',{default:[]}),
			 //lyte-menu data
			"ltPropSchedulerMenu" : Lyte.attr('boolean',{default: false}),
			"ltPropSchedulerMenuYield" : Lyte.attr('boolean',{default: false}),
			"ltPropSchedulerMenuContent" : Lyte.attr('array',{default:[]}),
			"ltPropSchedulerMenuUserValue" : Lyte.attr('string'),
			"ltPropSchedulerMenuSystemValue" : Lyte.attr('string'),
			"ltPropSchedulerMenuDescription" : Lyte.attr('string'),
			"ltPropSchedulerMenuId" : Lyte.attr('string'),
			"ltPropSchedulerMenuClass" : Lyte.attr('string'),
			"ltPropSchedulerMenuPosition" : Lyte.attr('string'),
			"ltPropSchedulerMenuWidth" : Lyte.attr('string',{default:'auto'}),
			"ltPropSchedulerMenuHeight" : Lyte.attr('string',{default:'auto'}),
			"ltPropSchedulerMenuCallout" : Lyte.attr('boolean', {default : false}),
			"ltPropSchedulerMenuFreeze" : Lyte.attr('boolean',{default : false}),
			"ltPropSchedulerMenuQueryClass" : Lyte.attr('string',{default: 'lyteMenuSelected'}),
			"ltPropSchedulerMenuBindToBody" : Lyte.attr('boolean',{default : true}),
			"ltPropSchedulerMenuAnimate" : Lyte.attr('boolean',{default : false}),
			"ltPropSchedulerMenuWrapperClass" : Lyte.attr('string'),
			"ltPropSchedulerMenuAria" : Lyte.attr('boolean', { default : false}),
			"ltPropSchedulerMenuAriaAttribute" : Lyte.attr('object' , { default : { role : 'menu'} }) ,
			"isEventAdded" : Lyte.attr('boolean', { default : false}),
			"isResizing" : Lyte.attr('boolean', { default : false}),
			"dragDir" : Lyte.attr('string', { default : ''}),
			"currEventTag": Lyte.attr('string', { default : ''}),
			"breakpoint": Lyte.attr('number', { default : 0}),
			"ybreakpoint": Lyte.attr('number', { default : 0}),
			"curPgX": Lyte.attr('number', { default : 0}),
			"curPgY": Lyte.attr('number', { default : 0}),
			"quadrant": Lyte.attr('number', { default : 0}),
			"ltPropEventResize": Lyte.attr('boolean', { default : false}),
			"tempResizeClientY": Lyte.attr('number'),
			"hiddenUser" : Lyte.attr('object',{default: {}}),
			"hasEventHeight" : Lyte.attr('boolean', { default : false})
		}		
	},
	init : function(){
		this.setData( 'ltPropCurrentDate', this.createDateObj( new Date() ) );
		this.generateTimeLine();
		var date = this.getData('ltPropCurrentDate');
		if(!date){
			date = new Date();
			this.data.ltPropCurrentDate = new Date();
		}
		this.setData('ltdisplayCurrDate',('0' + date.getDate()).slice(-2)+ ' ' + _lyteUiUtils.i18n(this.data.month[date.getMonth()]) + ' ' + date.getFullYear());
		this.setData('ltPropCurDay', _lyteUiUtils.i18n( this.data.days[date.getDay()] ) );
		this.setData('ltPropCurrMonth',date.getMonth());
		this.setData('ltPropDisplayYear',date.getFullYear());	
	},
	didConnect : function(){
		var _this = this;
		this.$node.addEvent = function(event){
			if(event.start){
				var events  = _this.getData('ltPropEvent');
				
				if(!$u.findWhere(events,{'id':event.id})){
					Lyte.arrayUtils( events , 'push' , event );
				}
			}
		}
		this.$node.replaceEvent = function(event,replaceEvent){
			var events = _this.getData('ltPropEvent');
			var delIdx = events.findIndex(function( elem ){
				return elem.id === event.id ? true : false;
			});
			Lyte.arrayUtils( events, 'replaceAt', delIdx, replaceEvent );
		}
		this.$node.UpdateEvent = function(eventid, key , value){
			var events  = _this.getData('ltPropEvent');
			var eventData = $u.findWhere(events,{'id':eventid});
			Lyte.objectUtils( eventData , 'add' , key, value );
			_this.callCurrentView();
		}
		this.$node.deleteEvent = function(event_id){
			if(event_id){
				var events  = _this.getData('ltPropEvent');
				var event_data = $u.findWhere(events,{'id':event_id});

				if(event_data){
					Lyte.arrayUtils( events , 'removeObjects' , event_data );
				}

			}
		}
		this.$node.today = function(){
			_this._navigated = false;
			_this.ResetTimeLine();
			$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',true);
			var date = _this.getData('ltPropCurrentDate') || _this.createDateObj( new Date());
			_this.setData('ltPropCurrMonth',date.getMonth());
			_this.setData('ltPropDisplayYear',date.getFullYear());
			_this.callCurrentView(date,false,_this.getData('ltPropWeekStart'));
			
			if(_this.getMethods('onTodayClick')){
				_this.executeMethod('onTodayClick',$L.moment(date),_this.$node);
			}
		}
		this.$node.moveTo = function(date){
			_this._navigated =  true;
			var day = $L.moment(date,'DD-MM-YYYY').timezone( _this.getData('ltPropTimezone') );
			if(!day._isValid){
				day = $L.moment(new Date());
			}
			if(_this.getData('ltPropSchedulerView') == 'month'){
				day.startOf('month');
			}
			_this.callCurrentView(day.getDObj(),false,_this.getData('ltPropWeekStart'));
			_this.findActiveKeys(day.getDObj());
		}
		this.$node.moveToDay = function(date){	
			date = $L.moment(date,'DD-MM-YYYY').getDObj();
			var view = _this.getData('ltPropSchedulerView');
			_this.ResetTimeLine();
			if($L.moment(date,'DD-MM-YYYY').format('DD-MM-YYYY') ===  _this.createDateObj( new Date(), true).format('DD-MM-YYYY')){
				_this._navigated = false;
				$L('.schedulerToday',_this.$node)[0].setData('ltPropDisabled',true)
			}else{
				_this._navigated = true;
				$L('.schedulerToday',_this.$node)[0].setData('ltPropDisabled',false)
			}
			if(view !== 'day'){
				_this.moveToDay = date;
				_this.setData('ltPropSchedulerView','day');
			}else{
				_this.callCurrentView(date,false,_this.getData('ltPropWeekStart'));
			}
			_this.findActiveKeys(date);
		}
		this.$node.selectUser = function(userid){
			if(typeof userid == 'string'){
				_this.adduser(userid);
			}else if(Array.isArray(userid)){
				userid.forEach(function(user){
					_this.adduser(user);
				})
			}
		}
		this.$node.unselectUser = function(userid){
			if(typeof userid == 'string'){
				_this.removeUser(userid);
			}else if(Array.isArray(userid)){
				userid.forEach(function(user){
					_this.removeUser(user);
				})
			}
		}
		this.$node.clearSelectedUser = function(){
			_this.clearUser();
		}
		this.$node.hideHiddenPopover = function(){
			var popover = $L('#lyteSchedulerHiddenEvent',_this.$node)[0];
			if(popover){
				popover.setData('ltPropShow',false);
			}
		}
		this.$node.openHiddenUserPopover = function( hiddenEvent, user, target, popoverProp ){
			var userDetails =  $u.clone($u.findWhere(_this.getData('ltPropSchedulerUser'),{'id':user}));
			userDetails.eventCount = hiddenEvent.length;
			_this.setData('hiddenUser',userDetails);
			_this.setData('hiddenEvent',$u.clone(hiddenEvent));
			_this.setData('ltPropUserHiddenEvent',true);
			$L('#schedulerPopover',_this.$node)[0] && $L('#schedulerPopover',_this.$node)[0].setAttribute('id',0);
			target.setAttribute('id','schedulerPopover');
			var popover = _this.$node.querySelector('#lyteSchedulerHiddenEvent');
			popover.ltProp(popoverProp);
			popover.setData('ltPropShow',true);			
			var poptitle = $L('.lyteSchedulerMoreEventsPopTitleMonthVal',popover.component.actualModalDiv)[0];
			var popDay = $L('.lyteSchedulerMoreEventsPopTitleDayVal',popover.component.actualModalDiv)[0];
			poptitle.innerHTML = ' ';
			popDay.innerHTML = ' ';
			var year = _this.data.ltPropDisplayYear;
			var month = _this.data.ltPropCurrMonth;
			popDay.appendChild( document.createTextNode(_lyteUiUtils.i18n(_this.data.month[month]) + ' ' + year ));
			if(_this.getMethods('openHiddenUserEvent')){
				_this.executeMethod('openHiddenUserEvent',event.target);
			}
		}
		this.addEventForNav();
		this.callCurrentView(undefined,false,this.getData('ltPropWeekStart'));
		this.addScroll();
		this.MultiDayViewNav();
		this.findActiveKeys( $L.moment(this.getData('startDateOfView'),'DD-MM-YYYY').getDObj() );
		this.$node.rendered = true;
		this._previousView = this.getData('ltPropSchedulerView');
		this._currentView = this.getData('ltPropSchedulerView');
		// _lyteUiUtils.tableNavigation($L('.lyteSchedulerTableNav')[0])
	},
	didDestroy: function(){
		if( $L && $L.schedulerEventResize ){
			$L.schedulerEventResize( "destroy", this );
		}
	},
	adduser : function(userid){
		var selectedList = $u.clone(this.getData('selectedUserArr'));
		var users  = this.getData('ltPropSchedulerUser');
		// var userData = $u.findWhere(users,{'id':userid});
		// var index = users.indexOf(userData);
		if(!selectedList.includes(userid)){
			selectedList.push(userid)
			this.setData('selectedUserArr',selectedList);
		}
	},
	removeUser : function(userid){
		var selectedList = $u.clone(this.getData('selectedUserArr'));
		var users  = this.getData('ltPropSchedulerUser');
		// var userData = $u.findWhere(users,{'id':userid});
		// var index = users.indexOf(userData);
		var SelectedUserIndex = selectedList.indexOf(userid);
		if( SelectedUserIndex !== -1 ){
			selectedList.splice( SelectedUserIndex, 1 );
			this.setData('selectedUserArr',selectedList);
		}
	},
	addEventForNav : function(){
		var leftNav = $L('.lyteSchedulerNavLeft',this.$node)[0];
		var rightNav = $L('.lyteSchedulerNavRight',this.$node)[0];
		if(leftNav){
			leftNav.addEventListener('click', this.schedulerNav.bind(this));
		}
		if(rightNav){
			rightNav.addEventListener('click', this.schedulerNav.bind(this));
		}
	},
	addScroll : function(){
		var _this = this;
		var isMultiView = this.getData('ltPropMultiUserView');
		var view = this.getData('ltPropSchedulerView');
		var isUserBased = this.getData('ltPropUserBasedView');
		if(isMultiView && (view == 'week' || view == 'day')){
			var prevScroll,prevScrollLeft;
			$L('.lyteSchedulerMultiUserView',this.$node)[0].addEventListener('scroll',function(){
				if(isUserBased){
					var scrollLeft = this.scrollLeft;
					if(parseInt(this.scrollWidth - scrollLeft) <= this.offsetWidth && prevScrollLeft !== scrollLeft){
						if(_this.getMethods('onScrollEnd')){
							_this.executeMethod('onScrollEnd',_this.$node);
						}
					}
					prevScrollLeft = scrollLeft;
				}else{
					var scrollTop = this.scrollTop;
					if(parseInt(this.scrollHeight - scrollTop) <= this.offsetHeight && prevScroll !== scrollTop){
						if(_this.getMethods('onScrollEnd')){
							_this.executeMethod('onScrollEnd',_this.$node);
						}
					}
					prevScroll = scrollTop;
				}
				
			});
		}
	},
	eventResize: function(){
		this.toggleEventResize();
	}.observes('ltPropEventResize').on('didConnect'),
	selectedUserArr : function(){
		if(this.getData('ltPropSchedulerView') == 'month' && this.getData('ltPropMultiUserView') === true){
			this.callCurrentView(null, null, this.getData('ltPropWeekStart'));
		}	
		if(this.getData('ltPropSchedulerView') == 'day' && this.getData('ltPropMultiUserView')){
			this.setCurrentTimeLine($L.moment(this.getData('startDateOfView'),"DD-MM-YYYY"))
		}
	}.observes('selectedUserArr.[]'),
	toggleEventResize : function(){
		if( this.getData('ltPropEventResize') ){
			if(this.getData('ltPropSchedulerView') === 'month' && this.getData('ltPropMultiUserView') === true) {
				return;
			}
			if( $L && $L.schedulerEventResize ){
				$L.schedulerEventResize( "connect", this );
			}
		}
		else{
			this.destoryEventResize();
		}
	},
	destoryEventResize: function(){
		if( $L && $L.schedulerEventResize ){
			$L.schedulerEventResize( "destroy", this );
		}
	},
	createDateObj : function( dateObj, isMoment ){
		var moment = $L.moment( dateObj ).timezone( this.getData('ltPropTimezone') );
		var newDate = new Date( parseInt( moment.format('YYYY') ), parseInt( moment.format('MM') ) - 1 , parseInt( moment.format('DD') ), parseInt( moment.format('HH') ), parseInt( moment.format('mm') ), parseInt( moment.format('ss') ) );
		return isMoment ? moment : newDate;
	},
	userSortable : function(){
		var view = this.getData('ltPropSchedulerView');
		var sortableCol = $L('.lyteSchedulerViewMainTable tbody',this.$node);
		if( (view == 'week'|| view == 'day') && this.getData('ltPropMultiUserView') ){
			if(this.getData('ltPropSortUser')){
				sortableCol.sortable({
					onDragStart:function(){
					},helper: function(elem){
						var table_td = elem.querySelector('.UserCol lyte-scheduler-user');
						var clone_tr = document.createElement('lyte-tr');
						var clone_td  = document.createElement('lyte-td');
						clone_td.appendChild(table_td.cloneNode(true));
						clone_tr.appendChild(clone_td);
						clone_tr.appendChild(document.createElement('lyte-td'));
						return clone_tr;
					},onBeforeDrop: function( dragElem , bellowElem , placeholder, from, to, soruce ){
						var table_tr = soruce.querySelectorAll('tr');
						dragElem.remove();
						bellowElem.parentNode.insertBefore(table_tr[from],bellowElem.nextSibling);
					},onDrop : function(dragElem){
						dragElem.remove();
					},placeholder : "lyteSchdeulerPlaceholder",
					threshold: '10'
				});
			}else {
				if(sortableCol[0]){
					sortableCol.sortable("destroy");
				}
			}
		}
	}.observes('ltPropSortUser').on('didConnect'),
	ChangeWeekOrder : function(){
		var start_day = this.getData('ltPropWeekStart');
		if(start_day){
			var dayLabel = this.getData('ltPropLabel');
			var split = dayLabel.slice(start_day);
			dayLabel = split.concat( dayLabel.slice(0,start_day));
			this.setData('label',dayLabel);
			var dayfullform = this.getData('days');
			split = dayfullform.slice(start_day);
			dayfullform = split.concat( dayfullform.slice(0,start_day));
			this.setData('labelFF',dayfullform);
		}
		
	}.observes('ltPropWeekStart').on('init'),
	changeEvent : function(){
		var eventManipulator = new _lyteUiUtils.eventManipulator( this.getData('ltPropFormat') );
		eventManipulator.addEvents( this.data.ltPropEvent, this.getData('ltPropSchedulerView'), this.getData('ltPropMultiUserView') );
		this.ResetTimeLine();
		this.setData('hasEventHeight',false);
		this.setData('ltPropManipulatedEvent',eventManipulator.events);
		this.setCalendarEvent();
		
	}.observes('ltPropEvent.[]').on('init'),
	showEventInCalendarObserver : function(){
		this.setCalendarEvent();
	}.observes('ltPropShowEventInCalendar','ltPropCalendarEvent.[]'),
	setCalendarEvent : function(){
		if(this.getData('ltPropShowEventInCalendar')){
			var calendarEvent = this.getData('ltPropCalendarEvent');
			if( calendarEvent.length ){
				this.setData( 'EventPresent', calendarEvent )
			}else{
				this.transformEventsForCalendar();
			}
		}
	},
	transformEventsForCalendar : function(){
		var events = this.getData('ltPropEvent');
		var format = 'DD-MM-YYYY'; // Calendar format
		var eventDates = [];
		var dateSet = new Set();

		if( !events || !events.length ){
			this.setData('EventPresent', []);
			return;
		}

		// Extract unique dates from start and end properties
		for( var i = 0; i < events.length; i++ ){
			var event = events[i];
			
			if( event.start ){
				var startDate = this.formatDateForCalendar( event.start, format );
				if( startDate ){
					dateSet.add( startDate );
				}
			}

			if( event.end ){
				var endDate = this.formatDateForCalendar( event.end, format );
				if( endDate ){
					dateSet.add( endDate );
				}
			}

			if( event.start && event.end ){
				var dates = this.getDatesBetween( event.start, event.end, format );
				for(var j = 0; j < dates.length; j++){
					dateSet.add( dates[j] );
				}
			}
		}
		eventDates = Array.from( dateSet );
		this.setData('EventPresent', eventDates);
	},

	formatDateForCalendar : function( dateStr, format ){
		if( !dateStr ){
			return null;
		}
		var date;
		if( this.getData('ltPropFormat') ){
			date = $L.moment( dateStr, this.getData('ltPropFormat') );
			return date.format( format );
		} else {
			date = new Date( dateStr );
			if( !isNaN( date.getTime() ) ){
				return this.formatDate( date, format );
			}
		}
	},

	formatDate : function( date, format ){
		var day = ('0' + date.getDate()).slice(-2);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();
		return day + '-' + month + '-' + year;
	},

	getDatesBetween : function( startStr, endStr, format ){
		var dates = [];
		var start, end;
		if( this.getData('ltPropFormat') ){
			start = $L.moment( startStr, this.getData('ltPropFormat') );
			end = $L.moment( endStr, this.getData('ltPropFormat') );
			var current = $L.moment( start.getDObj().toString() );
			while( !current.fromNow( end ).past ){
				dates.push( current.format( format ) );
				current.add( 1, 'day' );
			}
		} else {
			start = new Date( startStr );
			end = new Date( endStr );

			if( !isNaN( start.getTime() ) && !isNaN( end.getTime() ) ){
				var current = new Date( start );
				
				while( current <= end ){
					dates.push( this.formatDate( current, format ) );
					current.setDate( current.getDate() + 1 );
				}
			}
		}
		return dates;
	},
	schedulerView : function(){
		this.setData('hasEventHeight',false)
		var date = null;
		var view = this.getData('ltPropSchedulerView');
		this._previousView = this._currentView;
		this._currentView = this.getData('ltPropSchedulerView');
		if(this.getMethods('onBeforeViewChange')){
			this.executeMethod('onBeforeViewChange',this.getData('ltPropSchedulerView'));
		}
		if(!this._fromButtonSwitch){
			this.findDayViewPosition(this._previousView,this._currentView);
		}else{
			this._fromButtonSwitch = false;
		}
		if(this.moveToDay && view == 'day'){
			date = this.moveToDay;
			this.moveToDay = null;
			this.callCurrentView(date , false ,this.getData('ltPropWeekStart'));
		}else{
			this.callCurrentView(null , !this.$node.rendered ,this.getData('ltPropWeekStart'));
		}
		var startView;
		if(view == 'month'){
			var current_date = this.getData('ltPropCurrentDate');
			var date;
			if(current_date.getMonth() == this.data.ltPropCurrMonth && this.data.ltPropDisplayYear == current_date.getFullYear()){
				date = new Date( current_date.toString() );
			}else{
				date =  new Date(this.data.ltPropDisplayYear,this.data.ltPropCurrMonth,1);
			}
			startView = $L.moment(date);
		}else{
			startView = $L.moment(this.getData('startDateOfView'),'DD-MM-YYYY')
		}
		if(this.getMethods('onViewChange')){
			this.executeMethod('onViewChange',startView,this.getData('ltPropSchedulerView'));
		}
		if(this.currentTimeout){
			clearTimeout(this.currentTimeout);
		}
		_lyteUiUtils.tableNavigation($L('.lyteSchedulerTableNav')[0],'unbind')
		_lyteUiUtils.tableNavigation($L('.lyteSchedulerTableNav')[0])
		this.$node.rendered = true;
		this.addScroll();
		this.destoryEventResize();
		this.toggleEventResize();
	}.observes('ltPropSchedulerView'),
	toggleMultiUserView : function(){
		this.callCurrentView(undefined,undefined,this.getData('ltPropWeekStart'));
		this.addScroll();
		_lyteUiUtils.tableNavigation($L('.lyteSchedulerTableNav')[0],'unbind')
		_lyteUiUtils.tableNavigation($L('.lyteSchedulerTableNav')[0]);
	}.observes('ltPropMultiUserView','ltPropUserBasedView'),
	changeCurrentDate : function(){
		this.callCurrentView(null , !this.$node.rendered ,this.getData('ltPropWeekStart'));
	}.observes('ltPropCurrentDate'),
	callDragDrop : function(){
		this.addDragAndDrop();
	}.observes('ltPropDraggable'),
	addSchedulerEvent: function(){
		var view = this.getData('ltPropSchedulerView');
		var date = undefined;
		if(view == 'month'){
			date  =  new Date( this.getData('ltPropDisplayYear'), this.getData('ltPropCurrMonth'), 1 );
		}
		this.callCurrentView(date,undefined,this.getData('ltPropWeekStart'));
		this.addDragAndDrop();
	}.observes('ltPropManipulatedEvent'),
	onWorkingViewChange : function(){
		this.ResetTimeLine();
		this.callCurrentView(null , !this.$node.rendered ,this.getData('ltPropWeekStart'));
	}.observes('ltPropWorkingDayOnly'),
	findDayViewPosition : function(previousView,currentView){
		if( (previousView == 'day' && (['week','month'].includes(currentView))) ){
			this._DaypreviousDate = this.getData('startDateOfView');
		}
		if((previousView == 'week' && currentView == 'month')){
			this._WeekpreviousDate = this.getData('startDateOfView');
		}
		if( ((currentView == 'day' && this._DaypreviousDate) || (currentView == 'week' && this._WeekpreviousDate)) ){
			if(currentView == 'day'){
				var prevDate = $L.moment(this._DaypreviousDate,'DD-MM-YYYY').get('time');
			}else{
				var prevDate = $L.moment(this._WeekpreviousDate,'DD-MM-YYYY').get('time');
			}
			
			if(previousView == 'month'){
				var startDate = this.createDateObj( new Date( this.data.ltPropDisplayYear,this.data.ltPropCurrMonth,1 ) ).getTime();
				var endDate = this.createDateObj( new Date( this.data.ltPropDisplayYear,this.data.ltPropCurrMonth + 1,0 ) ).getTime();
			}else if(previousView == 'week'){
				var dateArray =  this.data.ltPropDateArray;
				var startDate = dateArray[0].val.get('time');
				var endDate = dateArray[dateArray.length - 1].val.get('time');
			}
			if(startDate <=  prevDate && endDate >= prevDate){
				this._MovetoPreviousDate = true;
			}else{
				this._MovetoPreviousDate = false;
			}
		}
	},
	findWeekoftheYear  : function(now,weekStartDay){
		var onejan = new Date(now.getFullYear(), 0, 1);

		var dayOffset = (onejan.getDay() - weekStartDay + 7) % 7;
		var firstWeekStart = new Date(onejan);
		firstWeekStart.setDate(onejan.getDate() - dayOffset);
		
		var diffDays = Math.floor((now - firstWeekStart) / 86400000);
		var week = Math.ceil((diffDays + 1) / 7);
	
		if (week === 53) {
			var lastdate = new Date(now.getFullYear(), 11, 31);
			var lastWeekOffset = (lastdate.getDay() - weekStartDay + 7) % 7;
			if (lastWeekOffset !== 6) {
				week = 1;
			}			
		}
		return week;
	},
	findActiveKeys : function( startDate ){
		// var startDate = $L.moment(this.getData('startDateOfView'),'DD-MM-YYYY');
		var today_btn = $L('.schedulerToday',this.$node)[0];
		var today = this.createDateObj( new Date() );
		if(today_btn.getData('ltPropDisabled')){
			today_btn.classList.add('lyteSchedulerActiveBtn');
			$L('.lyteSchedulerNavRight',this.$node)[0].classList.remove('lyteSchedulerActiveBtn');
			$L('.lyteSchedulerNavLeft',this.$node)[0].classList.remove('lyteSchedulerActiveBtn');
		}else if(startDate.getTime() > today.getTime()){
			today_btn.classList.remove('lyteSchedulerActiveBtn');
			$L('.lyteSchedulerNavRight',this.$node)[0].classList.remove('lyteSchedulerActiveBtn');
			$L('.lyteSchedulerNavLeft',this.$node)[0].classList.add('lyteSchedulerActiveBtn');
		}else{
			today_btn.classList.remove('lyteSchedulerActiveBtn');
			$L('.lyteSchedulerNavLeft',this.$node)[0].classList.remove('lyteSchedulerActiveBtn');
			$L('.lyteSchedulerNavRight',this.$node)[0].classList.add('lyteSchedulerActiveBtn');
		}
	},
	schedulerNav : function(event){
		var schedulerView =  this.getData('ltPropSchedulerView');	
		this._navigated = true;	
		var weekStart = this.getData('ltPropWeekStart');
		weekStart = weekStart === undefined ? 0 : weekStart;
		var _this = this;
		var isMultiView = this.getData('ltPropMultiUserView');
		switch(schedulerView){
			case 'month':
				if(event.target.classList.contains('lyteSchedulerNavLeft')){
					var displayMonth = this.data.ltPropCurrMonth - 1;
				}else{
					var displayMonth = this.data.ltPropCurrMonth + 1;
				}
				var date = new Date( this.data.ltPropDisplayYear ,displayMonth );
				this.setData('startDateOfView',$L.moment(date).format('DD-MM-YYYY'));
				this.monthView($L.moment(date).getDObj());
				if(displayMonth ===  $L.moment(this.getData('ltPropCurrentDate')).getDObj().getMonth() && this.data.ltPropDisplayYear ===  $L.moment(this.getData('ltPropCurrentDate')).getDObj().getFullYear()){
					$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',true);
				}else{
					$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',false);
				}
				this._WeekpreviousDate = false;
				this._DaypreviousDate = false;
				break;
			case 'week':
				var start_date = this.getData('ltPropDateArray')[0].date;
				var date =  new Date( this.data.ltPropDisplayYear, this.data.ltPropCurrMonth, start_date );
				var dayCount = this.data.ltPropWorkingDayOnly ? 7 : 7;
				if(event.target.classList.contains('lyteSchedulerNavLeft')){
					date.setDate(date.getDate()-dayCount);
				}else{
					date.setDate(date.getDate()+dayCount);
				}
				this.$node.dateHeight = 0;
				if(!isMultiView){
					$L('.lyteSchedulerWeekViewAllDayRow')[0].style.setProperty('--lyte-scheduler-td-height','1px');
				}
				if(this.findWeekoftheYear(date,weekStart) == this.findWeekoftheYear($L.moment(this.getData('ltPropCurrentDate')).getDObj(),weekStart)){
					$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',true);	
				}else{
					$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',false);
				}
				this.weekView($L.moment(date).getDObj(),this.getData('ltPropWeekStart'));
				this._DaypreviousDate = this.getData('startDateOfView');
				break;
			case 'day':
				//if(isMultiView){
					// var events = $L('lyte-scheduler-event-tag',this.$node);
					// for(var index =0 ;index < events.length;index++){
					// 	events[index].remove();
					// }
				//}
				this.$node.dateHeight = 0;
				var curr_date = $L.moment(this.getData('startDateOfView'),'DD-MM-YYYY').getDObj();
				var date =  new Date( curr_date.getFullYear(), curr_date.getMonth(), curr_date.getDate() );
				if(event.target.classList.contains('lyteSchedulerNavLeft')){
					date.setDate( date.getDate() - 1 );
				}else{
					date.setDate( date.getDate() + 1 );
				}
				if($L.moment( date ).format('DD-MM-YYYY') ===  $L.moment(this.getData('ltPropCurrentDate')).format('DD-MM-YYYY')){
					this._navigated = false;
					$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',true);
				}else{
					this._navigated = true;
					$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',false);
				}
				this.ResetTimeLine();
				var start_date = $L.moment( date );
				var _this = this;
				this.setData('startDateOfView',$L.moment(date).format('DD-MM-YYYY'));
				_this.setCurrentTimeLine( start_date )
				start_date = start_date.getDObj();
				// this.dayView( start_date );
				break;
		}
		this.findActiveKeys( date );
		this.setData( 'ltdisplayCurrDate', ('0' + date.getDate()).slice(-2) + ' ' + _lyteUiUtils.i18n(this.data.month[ date.getMonth() ])  );
		this.setData('ltPropCurDay',_lyteUiUtils.i18n(this.data.days[date.getDay()]));
		$L.fastdom.mutate(function(){
			_this.addDragAndDrop();
			_this.destoryEventResize();
			_this.toggleEventResize();
		})
		_lyteUiUtils.tableNavigation($L('.lyteSchedulerTableNav')[0],'unbind')
		_lyteUiUtils.tableNavigation($L('.lyteSchedulerTableNav')[0]);
		this.callCurrentView(date, false, weekStart)
		if(this.getMethods('onNavClick')){
			this.executeMethod('onNavClick',$L.moment(date));
		}
	},
	generateTimeLine : function() {
		var CustomTimeline = this.getData('ltPropCustomTimeline');
		var start = $L.moment(CustomTimeline.start || '12:00 AM', 'hh:mm A').get('hours');
		var end =  $L.moment(CustomTimeline.end || '11:00 PM', 'hh:mm A').get('hours');
		var timeline = this.getData('timeLine');
		this.setData( 'timeLine', timeline.slice(start, end + 1 ) );
		var timeLine = this.$node.getData('ltPropTimeLine');
		var timelineArray = [];
		var index = 0;
		var mins = 60 - timeLine;
		timelineArray[index++] = 0; 
		while(mins){
			timelineArray[index] =  timelineArray[ index - 1 ] + timeLine;
			mins -= timeLine;		
			index++;
			
		}
		if(this.getData('ltPropEnableDayViewTimeline')){
			this.setData('daytimelineArray',timelineArray);
		}else{
			this.setData('daytimelineArray',[0]);
		}
		this.setData('timelineArray',timelineArray);
	},	
	callCurrentView : function( date , init , weekStart){
		this._DayNumberHeight = 0;
		var schedulerView = this.getData('ltPropSchedulerView');
		var _this = this;
		weekStart = weekStart === undefined ? 0 : weekStart;
		var isMultiView = this.getData('ltPropMultiUserView');
		var AllDayMaxEvent = this.getData('ltPropMaxAllDayEvent');
		var TimelineMaxEvent;
		if(this.getData('ltPropTimelineNmore')){
			TimelineMaxEvent = this.getData('ltPropMaxTimelineEvent')
		}else{
			TimelineMaxEvent = Infinity;
		}

		var format = this.getData('ltPropFormat');
		var businessDays = this.getData('ltPropBusinessDays');
		var isWorkingOnly = this.getData('ltPropWorkingDayOnly');
		var popover = $L('#calendarPopover',this.$node)[0];
		var isUserBased = this.getData('ltPropUserBasedView');
		switch(schedulerView){
			case 'month':
				if( this._navigated && this.data.startDateOfView){
					var start_date = $L.moment(new Date(this.data.ltPropDisplayYear,this.data.ltPropCurrMonth,1));
					date = date ? date :  new Date(start_date.format('YYYY'),start_date.format('MM') - 1,start_date.format('DD'));
				}else if( !date ){
					date = this.getData('ltPropCurrentDate');
				}
				if(popover.component && popover.component.actualModalDiv){
					this.setData('selectionType','month');
					var calendar = $L('lyte-calendar',popover.component.actualModalDiv)[0];
					if(calendar){
						calendar.setData('ltPropSelectionType','month');
						if(calendar.getAttribute('view-type') == 'dateView'){
							$L('.lyteDrillCalHeaderButton',popover.component.actualModalDiv)[0].click();
						}
					}
				}else{
					this.setData('selectionType','month');
				}
				
				this.setData('todayButton','thisMonth');
				var eventManipulator = new _lyteUiUtils.eventManipulator( format, date.getMonth(), weekStart, schedulerView, isMultiView, AllDayMaxEvent, TimelineMaxEvent, businessDays, isWorkingOnly, isUserBased, this.findStartDateOfMonthView( $L.moment( date,'DD-MM-YYYY' ).getDObj() ), this.getData('selectedUserArr') );
				if(isMultiView){
					var event = eventManipulator.generateEventObjArrNmore( this.getData('ltPropManipulatedEvent') );
				}else{	
					var event = eventManipulator.generateEventObjArr( this.getData('ltPropManipulatedEvent') );
				}
				this.setData('ltPropProcessedData',event.eventObj);
				this.setData('hiddenObj',event.hiddenObj);
				this.monthView($L.moment( date,'DD-MM-YYYY').getDObj() );
				break;
			case 'week':
				if(this._MovetoPreviousDate){
					var start_date =  $L.moment( this._WeekpreviousDate,'DD-MM-YYYY');
					this._WeekpreviousDate = null;
					this._MovetoPreviousDate = false;
					date = date ? date :  new Date(start_date.format('YYYY'),start_date.format('MM') - 1,start_date.format('DD'));
				}else if( this._navigated && this.data.startDateOfView){
					var start_date = $L.moment( this.data.startDateOfView,'DD-MM-YYYY');
					date = date ? date :  new Date(start_date.format('YYYY'),start_date.format('MM') - 1,start_date.format('DD'));
				}else if( !date ){
					date = this.getData('ltPropCurrentDate');
				}
				var eventManipulator = new _lyteUiUtils.eventManipulator( format, date.getMonth(), weekStart, schedulerView, isMultiView, AllDayMaxEvent, TimelineMaxEvent, businessDays, isWorkingOnly, isUserBased, this.findStartofWeek(date, weekStart), this.getData('selectedUserArr'), this.getData('ltPropTimeLine'), this.getData('ltPropCustomTimeline') );
				if(isMultiView){
					var event = eventManipulator.generateEventObjArr( this.getData('ltPropManipulatedEvent') );
				}else{	
					$L('.lyteSchedulerWeekViewAllDayRow')[0].style.setProperty('--lyte-scheduler-td-height','1px');
					var event = eventManipulator.generateEventObjArrNmore( this.getData('ltPropManipulatedEvent') );
				}
				this.setData('ltPropProcessedData',event.eventObj);
				this.setData('hiddenObj',event.hiddenObj);
				this.weekView($L.moment( date,'DD-MM-YYYY').getDObj(),weekStart);
				if(this.getData('ltPropWeekStart') !== undefined){
					this.setData('selectionType','week');
				}else{
					this.setData('selectionType','day');
				}
				this.setData('todayButton','thisWeek');
				break;
			case 'day':	
				if(this._MovetoPreviousDate){
					var start_date =  $L.moment( this._DaypreviousDate,'DD-MM-YYYY');
					this._DaypreviousDate = null;
					this._MovetoPreviousDate = false;
					date = date ? date :  start_date.getDObj();
				}else if( this._navigated && this.data.startDateOfView){
					var start_date = $L.moment( this.data.startDateOfView,'DD-MM-YYYY');
					date = date ? date : start_date.getDObj();
				}else if( !date ){
					date = this.getData('ltPropCurrentDate');
				}
				if(!isMultiView){
					TimelineMaxEvent = Infinity;
				}
				var currDate = init ? $L.moment( date ).timezone( this.getData('ltPropTimezone') ) :  $L.moment( date );
				var timelineInterval = this.getData('ltPropEnableDayViewTimeline') ? this.getData('ltPropTimeLine') : 60;
				var eventManipulator = new _lyteUiUtils.eventManipulator( format, date.getMonth(), weekStart, schedulerView, isMultiView, AllDayMaxEvent, TimelineMaxEvent, businessDays, isWorkingOnly, isUserBased, currDate.getDObj(), this.getData('selectedUserArr'), timelineInterval, this.getData('ltPropCustomTimeline') );
				var event = eventManipulator.generateEventObjArrNmore( this.getData('ltPropManipulatedEvent') );
				this.$node.startTimeDiv_width = 0;
				this.MultiDayViewNav();
				this.setData('ltPropProcessedData',event.eventObj);
				this.setData('startDateOfView',currDate.format('DD-MM-YYYY'));
				this.dayView( currDate.getDObj() );
				this.setData('hiddenObj',event.hiddenObj);
				this.setData('selectionType','day');
				this.setData('todayButton',_lyteUiUtils.i18n('today'));
				setTimeout(function(){
					this.setCurrentTimeLine($L.moment( this.getData('startDateOfView'),'DD-MM-YYYY' ));
				}.bind(this))
				break;
		}
		if(!init){
			this.isToday( this.createDateObj( new Date() ) );
		}
		var isToday = $L('.schedulerToday',this.$node)[0].getData('ltPropDisabled');
		date = (init || isToday ) ? this.createDateObj( new Date() ) : this.createDateObj( $L.moment(this.data.startDateOfView,'DD-MM-YYYY').getDObj() );
		if(schedulerView ==  'month' && !(init ||isToday ) ){
			date.setMonth(this.data.ltPropCurrMonth);
			date.setDate(1);
			date.setYear(this.data.ltPropDisplayYear)
		}
		this.findActiveKeys(date);
		this.setData('ltdisplayCurrDate', ('0' + date.getDate()).slice(-2) + ' ' + _lyteUiUtils.i18n(this.data.month[date.getMonth()]) + ' ' + date.getFullYear());
		this.setData('ltPropCurDay',_lyteUiUtils.i18n(this.data.days[date.getDay()]));
		$L.fastdom.mutate(function(){
			_this.addDragAndDrop();
		})
	},
	findStartDateOfMonthView : function(startOfMonth){
		var date =  new Date( startOfMonth.getFullYear(), startOfMonth.getMonth(), 1 ); 
		var weekstart = this.getData('ltPropWeekStart') === undefined ? 0 : this.getData('ltPropWeekStart');
		var start_diff = date.getDay()  - weekstart ;
		if( date.getDay() > weekstart ){
			date.setDate(date.getDate() - ( start_diff ));
		}else{
			date.setDate(date.getDate() - ((7 + start_diff) % 7));
		}
		return date;
	},
	findStartofWeek : function(date,weekStart){
		var startofWeek = new Date( date.getFullYear(),date.getMonth(), date.getDate() );
		var start_diff = date.getDay() - weekStart;
		if( date.getDay() > weekStart ){
			startofWeek.setDate(startofWeek.getDate() - ( start_diff ) );
		}else{
			startofWeek.setDate(startofWeek.getDate() - ((7 + start_diff) % 7));
		}
		return startofWeek
	},
	isToday : function(date){
		var view = this.getData('ltPropSchedulerView');
		var dateArray = this.getData('ltPropDateArray');
		var startDate;
		var end_date;
		if(view == 'month'){
			startDate = $L.moment(dateArray[0][0].val.get('time'));
			if(startDate.get('date') !== 1){
				startDate.startOf('month');
				startDate.add(1,'month');
			}
			end_date = dateArray[dateArray.length - 1][6].val;
		}else if(view == 'week'){
			startDate = dateArray[0].val;
			end_date = $L.moment(dateArray[0].val.get('time'));
			end_date.add(6,'day');
		}else{
			startDate = $L.moment(this.getData('startDateOfView'),'DD-MM-YYYY');
			end_date = $L.moment(this.getData('startDateOfView'),'DD-MM-YYYY').endOf('day');
		}
		if(this.isDateEqual(startDate.getDObj()) || (!startDate.fromNow($L.moment(date)).past && end_date.fromNow($L.moment(date)).past) || this.isDateEqual(end_date.getDObj())){
			$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',true);
			this._navigated = false;
		 }else{
			$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',false);
			this._navigated = true;
		 }
	},
	monthView : function(date){
		var date = date || $L.moment().timezone( this.getData('ltPropTimezone') ).getDObj();
		var displayHead = date.getMonth();
		this.setData('ltPropCurrMonth', displayHead);
		this.setData('ltdisplayHead',this.data.month[displayHead] +  ' ' + date.getFullYear());
		this.setData('ltPropDisplayYear', date.getFullYear());
		this.generateMonth( new Date( date.getFullYear(), date.getMonth(), 1 ) );
	},
	generateMonth : function(startOfMonth){
		var result=[];
		var current_month = startOfMonth.getMonth();
		var eventArr  = this.getData('ltPropProcessedData');
		var businessDay = this.getData('ltPropBusinessDays');
		var date = new Date( startOfMonth.getFullYear(), startOfMonth.getMonth(), 1 ); 
		var cur_Month = date.getMonth();
		var date = this.findStartDateOfMonthView(startOfMonth);
		for(var row = 0 ; row < 6; row++ ){
			var week = new Array(7);
			for(index = 0 ; index < 7 ; index++){
				var year = date.getFullYear();
				var month = ( date.getMonth() + 1 );
				var curr_date = ('0' + date.getDate()).slice(-2) + '-' + ('0' + month).slice(-2) + '-' + year;

				var is_business = businessDay.includes(date.getDay()) ? 'lyteSchedulerBusinessDay' : 'lyteSchedulerNonBusinessDay' ;
				week[ index ] = {'val' : $L.moment(curr_date,'DD-MM-YYYY') ,'date' : date.getDate(), 'buisness' : is_business,'events' : eventArr[curr_date] , 'currentDate' : this.isDateEqual( curr_date ),'month' :month-1,'year': year};
				if(current_month == date.getMonth()){
					week[index].current_month = true;
				}
				date.setDate( date.getDate() + 1 );
			}
			result.push( week );
			if(cur_Month != date.getMonth()){
				break;
			}
		}
		var startDate = result[0][0].val;
		this.setData('startDateOfView',startDate.format('DD-MM-YYYY'));
		startDate = startDate.getDObj(); 
		var _this = this;
		$L.fastdom.mutate( function(){
			_this.setDisplayDate($L("scheduler-start-date",_this.$node)[0],startOfMonth);
		});
		this.setData('ltPropDateArray', result);
	},
	weekView : function(date , weekStart){
		weekStart = weekStart ? weekStart : 0;
		var date = date || $L.moment().timezone( this.getData('ltPropTimezone') ).getDObj();
		this.generateWeek(date, weekStart);
		var right = 'right';
		if(_lyteUiUtils.getRTL()){
			right = 'left';
		}
		if(!this.getData('ltPropMultiUserView')){
			var _this = this;
			setTimeout(function(){
				var allDayline = $L('.lyteSchedulerAllDayHighlight',_this.$node)[0];
				var alldayth = $L('.lyteSchedulerSingleUserAllDay',_this.$node)[0];
				if(allDayline && alldayth){
					allDayline.style.top =  alldayth.getBoundingClientRect().bottom - allDayline.offsetParent.getBoundingClientRect().top - 1 + 'px';
					allDayline.style[right] = _lyteUiUtils.getScrollBarWidth() + 'px';
				}
			},10)
		}
	},
	generateWeek : function( date , weekStart ){
		var startofWeek = this.findStartofWeek(date , weekStart);
		var isWorkingOnly = this.getData('ltPropWorkingDayOnly');
		var result = [];
		var businessDay = this.getData('ltPropBusinessDays');

		var eventArr  = this.getData('ltPropProcessedData');
		var nxt_date = new Date(startofWeek);
		
		var count = 7;
		for ( var index = 0; index < count; index++ ) {
			var year = nxt_date.getFullYear();
			var month = ( nxt_date.getMonth() + 1 );
			var curr_date = ('0' + nxt_date.getDate()).slice(-2) + '-' + ('0' + month).slice(-2) + '-' + year;
			if(isWorkingOnly && !businessDay.includes(nxt_date.getDay())){
				nxt_date.setDate(nxt_date.getDate()+1);
				count--;
				index--;
				continue;
			}
			var is_business = businessDay.includes(nxt_date.getDay()) ? 'lyteSchedulerBusinessDay' : 'lyteSchedulerNonBusinessDay' ;
			result[index] = {'val' : $L.moment(curr_date,'DD-MM-YYYY') ,'date' : nxt_date.getDate(),'month' : nxt_date.getMonth(),'day' : nxt_date.getDay(),'buisness': is_business,'events' : eventArr[curr_date], 'currentDate' : this.isDateEqual(curr_date)};
			if(eventArr.allDay && eventArr.allDay[curr_date]){
				result[index].allDay = eventArr.allDay[curr_date];
			}
			nxt_date.setDate(nxt_date.getDate()+1);
		}
		startofWeek = new Date(result[0].val.getDObj().toString());
		var lastofweek = nxt_date.setDate(nxt_date.getDate()-1);
		this.setData('ltPropCurrMonth',startofWeek.getMonth());
		this.setData('ltPropDisplayYear', startofWeek.getFullYear());
		this.setData('startDateOfView',result[0].val.format('DD-MM-YYYY'));
		var _this = this;
		$L.fastdom.mutate( function(){
			var startofWeek = $L.moment(_this.getData('startDateOfView'),'DD-MM-YYYY').getDObj();
			_this.setDisplayDate($L("scheduler-start-date",this.$node)[0],startofWeek);
			_this.setDisplayDate($L("scheduler-end-date",this.$node)[0],result[result.length-1].val.getDObj());
		});	
		var start_Date = $L.moment(startofWeek.getTime());
		startofWeek = new Date( startofWeek.setDate(startofWeek.getDate() + 6) );
		$L('.lyteSchedulerWeekViewWrapper')[0].style.setProperty('--lyte-scheduler-table-col-count',result.length);
		this.setData('ltPropDateArray',result);
		this.setCurrentTimeLine(start_Date,$L.moment(lastofweek).timezone( this.getData('ltPropTimezone') ));
	},
	MultiDayViewNav : function(){
		var scrollLeftNav = this.$node.querySelector('.lyteSchedulerLeftNav');
		var fixedCol = this.$node.querySelector('.lyteSchedulerFixedCol');
		if(scrollLeftNav){
			scrollLeftNav.style.left = fixedCol.offsetWidth + 'px';
			scrollLeftNav.classList.add('lyteSchedulerhideScrollNav');
			var scrollRightNav = this.$node.querySelector('.lyteSchedulerRightNav');
			var scrollDiv = this.$node.querySelector('.lyteSchedulerViewWrapper');
			var _this = this;
			scrollDiv.addEventListener('scroll',function(event){
				
				var MaxScrollWidth = this.scrollWidth - this.offsetWidth;
				if(this.scrollLeft == 0){
					scrollLeftNav.classList.add('lyteSchedulerhideScrollNav');
				}
				if(this.scrollLeft !== 0){
					scrollLeftNav.classList.remove('lyteSchedulerhideScrollNav');
				}
				if(this.scrollLeft == MaxScrollWidth){
					scrollRightNav.classList.add('lyteSchedulerhideScrollNav');
				}
				if(this.scrollLeft !== MaxScrollWidth){
					scrollRightNav.classList.remove('lyteSchedulerhideScrollNav');
				}
			});
		}
	}, 
	showCurrentTimeObserver: function(){
		var result;
		if(this.getData('ltPropSchedulerView') == 'week'){
			result = this.data.ltPropDateArray;
			result = result[result.length-1].val;
		}
		this.setCurrentTimeLine($L.moment(this.getData('startDateOfView'),'DD-MM-YYYY'),result);
	}.observes('ltPropShowCurrentTime'),
	ResetTimeLine : function(){
		if(!this.getData('ltPropMultiUserView')){
			var allDaytr = $L('.lyteSchedulerDayViewAllDayRow');
			for(var index = 0 ; index < allDaytr.length ; index++){
				allDaytr[index].style.setProperty('--lyte-scheduler-td-height','1px');
				allDaytr[index].style.setProperty('--lyte-scheduler-td-height','1px');
			}
		}
		var timeline = $L('.lyteSchedulerMultiUserRow',this.$node);
		for(var index = 0 ; index < timeline.length ; index++){
			timeline[index].style.setProperty('--lyte-scheduler-td-height','1px');
		}
	},
	dayView : function(date){
		var date =  date || $L().moment().timezone( this.getData('ltPropTimezone') ).getDObj();
		this.generateDay(date);
		var _this = this;
		var right = 'right';
		var isUserBased = this.getData('ltPropUserBasedView');
		var isMultiUser = this.getData('ltPropMultiUserView');
		if(_lyteUiUtils.getRTL()){
			right = 'left';
		}
		var allDayline = $L('.lyteSchedulerAllDayHighlight',this.$node)[0];
		if(!isMultiUser){
			setTimeout(function(){
				var alldayth = $L('.lyteSchedulerSingleUserAllDay',_this.$node)[0];
				if(allDayline && alldayth){
					allDayline.style.top =  alldayth.getBoundingClientRect().bottom - allDayline.offsetParent.getBoundingClientRect().top + 'px';
					allDayline.style[right] = _lyteUiUtils.getScrollBarWidth() + 'px';
				}
			},10)
		}else{	
			var fixedTh = $L('.lyteSchedulerAllDayTh',this.$node)[0];
			if(allDayline && fixedTh){
				var AllDayEvent = $L('.lyteSchedulerAllDayEvent',this.$node)[0];
				if(isUserBased){
					allDayline.style.top =  fixedTh.getBoundingClientRect().bottom - allDayline.offsetParent.getBoundingClientRect().top + 'px';
					allDayline.style[right] = _lyteUiUtils.getScrollBarWidth() + 'px';

				}else if(AllDayEvent){
					var fixedHeaderCs = window.getComputedStyle(fixedTh)
					allDayline.style.left = fixedTh.getBoundingClientRect().left - allDayline.offsetParent.getBoundingClientRect().left + 'px';
					allDayline.style.width = AllDayEvent.offsetWidth - parseInt(fixedHeaderCs.borderRight) + 'px';
					allDayline.style.bottom = _lyteUiUtils.getScrollBarWidth() + 'px';
				}
			}			
		}
	},
	generateDay :function(date){
		this.setData('ltPropDisplayYear',date.getFullYear());
		var Day = this.data.days[date.getDay()];
		this.setData('currDay',Day);
		var events = this.getData('ltPropProcessedData');		
		var month = date.getMonth()+1;
		var curr_date = ('0' + date.getDate()).slice(-2) + '-' + ('0' + month).slice(-2) + '-' + date.getFullYear();
		var _this = this;
		var array = {};
		array =  events[curr_date] || {};
		if(events.allDay && events.allDay[curr_date]){
			array.allDay = events.allDay[curr_date];
		}
		this.setData('ltPropDateObj',array);
		$L.fastdom.mutate( function(){
			_this.setDisplayDate($L("scheduler-start-date",_this.$node)[0],date);
		});
		$L('.lyteSchedulerDate').addClass(this.isDateEqual(curr_date) ? 'lyteSchedulerCurrDate' : '');
	},
	showCurrentTime : function(startdate,endDate){
		var view = this.getData('ltPropSchedulerView');
		var currentDate = $L.moment(this.getData('ltPropCurrentDate'));
		if( view === 'day' ){
			return (startdate.format('DD-MM-YYYY') ===  currentDate.format('DD-MM-YYYY') );
		}else if( view === 'week' ){
			return !startdate.fromNow(currentDate).past && endDate.fromNow(currentDate).past;
		}
	},
	setCurrentTimeLine : function(date,endDate){
		var isMultiView = this.getData('ltPropMultiUserView');
		var isUserBased = this.getData('ltPropUserBasedView');
		var view = this.getData('ltPropSchedulerView');
		var isUserBasedView = (view == 'day' && isMultiView && isUserBased) || (view == 'day' && isMultiView && this.getData('ltPropShowDayViewCurrentTime'));
		var isMultiUserDay = view == 'day' && isMultiView;
		if(this.getData('ltPropShowCurrentTime')){
			if(endDate){
				endDate.endOf('day');
			}
			if( this.showCurrentTime(date,endDate) && (!isMultiView ||  isUserBasedView ) ){
				this._navigated = false;
				if($L('.lyteschedulerCurrentTimeLine',this.$node)[0]){
					$L('.lyteschedulerCurrentTimeLine',this.$node)[0].style.display = 'flex';
					var currentLine = $L('.lyteschedulerCurrentTimeLine',this.$node)[0];
					if(this.currentTimeout){
						clearTimeout(this.currentTimeout);
					}
					if(currentLine){
						var current_Time = $L.moment().timezone( this.getData('ltPropTimezone') );
						var min = parseInt(current_Time.format('mm'));
						if(isMultiUserDay){
							var Div_min = 0;
							var timeformat  = '#T' + current_Time.format('hh') + ('0' + Div_min).slice(-2) +  current_Time.format('A') ;
							var div = $L(timeformat,this.$node)[0];
							if(div){
								var divRect = div.getBoundingClientRect();
								var userList = $L('.lyteSchedulerMultiUserRow', this.$node);
								var firstUser = userList[ 1 ];
								var lastUser = userList[ userList.length - 1 ];
								var header_height = $L('.lyteSchedulerFirstColHeader',this.$node)[0].offsetHeight;
								currentLine.style.top = header_height + 'px';
								currentLine.style.height = lastUser.getBoundingClientRect().bottom - firstUser.getBoundingClientRect().top + 'px'; 
								currentLine.style.left =  divRect.left - currentLine.offsetParent.getBoundingClientRect().left + ( divRect.width / 60 ) * (min - Div_min) + currentLine.offsetParent.scrollLeft + 'px';
							}else{
								this.removeCurrentTimeline();
							}
						}else{
							var Div_min = this.getData('ltPropTimeLine') * parseInt((min/this.getData('ltPropTimeLine')));
							var timeformat  = '#T' + current_Time.format('hh') + ('0' + Div_min).slice(-2) +  current_Time.format('A') ;
							var div = $L(timeformat,this.$node)[0];
							if(div){
								var divRect = div.getBoundingClientRect();
								var scrollTop = 0;
								if(isUserBasedView){
									scrollTop = currentLine.offsetParent.scrollTop
								}
								currentLine.style.top =  divRect.top - currentLine.offsetParent.getBoundingClientRect().top + (divRect.height/this.getData('ltPropTimeLine')) * (min - Div_min) + scrollTop + 'px';
								if($L('.lyteSchedulerCurrentTime',this.$node)[0]){
									$L('.lyteSchedulerCurrentTime',this.$node)[0].remove();
								} 
								if(this.getData('ltPropContinentalTimeFormat')){
									currentLine.insertBefore(this.createTextNode(current_Time.format('HH:mm'),'lyteSchedulerCurrentTime'),currentLine.firstChild)
								}else{
									currentLine.insertBefore(this.createTextNode(current_Time.format('hh:mm') + ' ' + _lyteUiUtils.i18n(current_Time.format('A')),'lyteSchedulerCurrentTime'),currentLine.firstChild)
								}
							}else{
								this.removeCurrentTimeline();
							}
						}
						
						var _this = this;
						this.currentTimeout = setTimeout(function(){
							_this.removeCurrentTimeline();
							if(_this.getData('ltPropSchedulerView') == 'week'){
								var result = _this.data.ltPropDateArray;
								_this.setCurrentTimeLine($L.moment(_this.getData('startDateOfView'),"DD-MM-YYYY"),result[result.length - 1].val);
							}else{
								_this.setCurrentTimeLine($L.moment(_this.getData('startDateOfView'),"DD-MM-YYYY"));
							}
							
						},(60 - parseInt(current_Time.get('seconds')))*1000)
					}
				}
			}else{
				if(this.currentTimeout){
					clearTimeout(this.currentTimeout);
				}
				// if($L('.schedulerToday',this.$node).length){
				// 	$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',false)
				// }
				this.removeCurrentTimeline();
			}
			
		}else{
			if(this.currentTimeout){
				clearTimeout(this.currentTimeout);
			}
			this.removeCurrentTimeline();
		}	
		
	},
	removeCurrentTimeline : function(){
		if($L('.lyteschedulerCurrentTimeLine',this.$node)[0]){
			$L('.lyteschedulerCurrentTimeLine',this.$node)[0].style.display = 'none';
			if($L('.lyteSchedulerCurrentTime',this.$node)[0]){
				$L('.lyteSchedulerCurrentTime',this.$node)[0].remove();
			} 
		}
	},
	isDateEqual : function( date ){
		var curr_date = this.getData( 'ltPropCurrentDate' );
		date = $L.moment( date , 'DD-MM-YYYY' ).getDObj();
		return curr_date.getDate() === date.getDate() && curr_date.getMonth() === date.getMonth() && curr_date.getFullYear() === date.getFullYear();
	},
	getTimediff : function(start,end){
		var format = this.getData('ltPropFormat') || 'YYYY-MM-DDTHH:mm:ss';
		var EndDate =  $L.moment(end,format).getDObj();
		var StartDate = $L.moment(start,format).getDObj();
		var timeDiff = EndDate - StartDate;
		return  Math.floor(timeDiff / 1000 / 60);;
	},
	findEndDate : function(newStartDate,eventData){
		var diff = this.getTimediff(eventData.start,eventData.end);
		return $L.moment( newStartDate.getDObj().toString() ).add(diff,'minutes');
	},
	callonDateChange : function(eventData,StartDate){
		if(this.getMethods('onDateChange')){
			this.executeMethod('onDateChange',eventData,StartDate,this.findEndDate(StartDate,eventData),this.$node)
		}
	},
	addDragAndDrop: function(){
		if(!this.getData('ltPropDraggable')){
			return;
		}
		var _this = this;
		var  allDayEvent = false;
		var diff = 0,first = true;
		var total_length;
		var returnval = true;
		var isMultiView  = this.getData('ltPropMultiUserView');
		var view = this.getData('ltPropSchedulerView');
		var userdata_width = $L('.lyteSchedulerFixedCol').length && $L('.lyteSchedulerFixedCol')[0].offsetWidth;
		var width;
		var _animationFrame;
		var _eventList = this.getData('ltPropEvent');
		var timelineInterval = this.getData('ltPropTimeLine');
		var ScrollDivRect;
		var prevScrollTop;
		var currentDrop;
		var header_height;
		var Draginit = true;
		var format = this.getData('ltPropFormat') || 'YYYY-MM-DDTHH:mm:ss';
		var isRTL = _lyteUiUtils.getRTL();
		var isUserBased = this.getData('ltPropUserBasedView');
		var istimelineDrag = (view == 'week' && !isMultiView) || ( view == 'day'&& (!isMultiView || isUserBased));
		var isUserBasedWeek = (view == 'week' && isUserBased && isMultiView);
		var customTimeline = structuredClone(this.getData('ltPropCustomTimeline'));
		var Timeline_start = '#T1200AM';
		var timeline_array = this.getData('timelineArray');
		var Timeline_end = '#T11'+ ('0' + timeline_array[ timeline_array.length - 1 ]).slice(-2) +'PM';
		if(customTimeline.start){
			Timeline_start = '#T'+customTimeline.start.format('hhmmA')
		}else{
			customTimeline.start = $L.moment('12:00 AM','hh:mm A');
		}
		if(customTimeline.end){
			var end_timeline = $L.moment(customTimeline.end.getDObj().toString());
			Timeline_end = '#T'+end_timeline.format('hhmmA')
		}else{
			customTimeline.end = $L.moment('11:59 PM','hh:mm A');
		}
		if(istimelineDrag){
			var height = this.$node.querySelector(Timeline_start).getBoundingClientRect().height / 4;
			var scrollDiv =  this.$node.querySelector(".lyteSchedulerViewWrapper");
			if($L('.lyteSchedulerDate',this.$node)[0]){
				width = $L('.lyteSchedulerDate',this.$node)[0].offsetWidth;
			}
			var MaxScrollHeight =  scrollDiv.scrollHeight - (scrollDiv.offsetHeight );
 			var first_tdWidth =  scrollDiv.querySelector('td').getBoundingClientRect().width;
 		}else if(view == 'day'){
			var timelineEvent = $L('.lyteSchedulerTimeLineEvent',this.$node)[0];
			var height = 0;
			if(timelineEvent){
				var timelineEventOffset = timelineEvent.getBoundingClientRect();
				height = timelineEventOffset.height;
				width = timelineEventOffset.width / 6;
			}
 			var scrollDiv =  this.$node.querySelector(".lyteSchedulerViewWrapper");
 			var MaxScrollWidth =  scrollDiv.scrollWidth - ( scrollDiv.offsetWidth );
 		}	
		var verticalScrollAnimation = function(scrollDiv,element,MaxScrollWidth,event,width, elem_offset){
			var scrollLeft = scrollDiv.scrollLeft;
			var elementOffset = element.getBoundingClientRect();
			var scrollClientRect = scrollDiv.getBoundingClientRect();
			var current_pos = elementOffset.left;
			if(event.clientX >= (scrollClientRect.right - 50) && scrollDiv.scrollLeft <= MaxScrollWidth){
				scrollDiv.scrollLeft += 10;
			}
			if((scrollClientRect.left + userdata_width + 180 - 20 ) >= (event.clientX ) &&  (scrollLeft > 0)){
				scrollDiv.scrollLeft -= 10;
			}
			if( (event.clientX - current_pos) >= width &&  scrollLeft <= MaxScrollWidth ){
				if((element.getBoundingClientRect().left + element.offsetWidth + width) < (ScrollDivRect.left + ScrollDivRect.width )){
					var count = parseInt((event.clientX - current_pos)/width);
					offsetLeft = offsetLeft + count * width;
					_this.StartDate.add(count * 10,'minutes')
				}
				prevScrollLeft = scrollDiv.scrollLeft;
			} 
			if( (current_pos - event.clientX) > width && scrollLeft > 0 && ( elementOffset.left  ) >= ( scrollClientRect.left + userdata_width + 180 )){
				var count = parseInt((current_pos - event.clientX)/width);
				offsetLeft = offsetLeft - count * width;
				_this.StartDate.subtract(count * 10,'minutes')
				prevScrollLeft = scrollDiv.scrollLeft;
			}
			element.style.top = offsetTop + 'px';
			element.style.left = offsetLeft + 'px';
			if(_animationFrame){
				cancelAnimationFrame(_animationFrame);
			}
			_animationFrame = requestAnimationFrame(verticalScrollAnimation.bind(_this,scrollDiv,element,MaxScrollWidth,event,width, elem_offset))
		}
		var scrollAnimation = function(scrollDiv,element,MaxScrollHeight,event,height){
			var scrollTop = scrollDiv.scrollTop;
			var elementOffset = element.getBoundingClientRect();
			var scrollClientRect = scrollDiv.getBoundingClientRect();
			var timelineInterval = this.getData('ltPropTimeLine')
			var isadd = false;
			var currentMin;
			var issubtract = false;
			var minTop =  Topboundaries - element.offsetParent.getBoundingClientRect().top - 0.5;
			var maxTop = Bottomboundaries - elementOffset.height - element.offsetParent.getBoundingClientRect().top - 0.5;
			if(event.type == 'mousemove'){
				var y = event.clientY;
				var x = event.clientX;
			}else{
				var y = event.touches[0].clientY;
			}	
			
			
			if(y >= (scrollClientRect.bottom - 50) && scrollDiv.scrollTop <= MaxScrollHeight){
				scrollDiv.scrollTop += 10;
			}
			if((scrollClientRect.top + header_height - 20 ) >= (y ) &&  (scrollTop > 0)){
				scrollDiv.scrollTop -= 10;
			}
			var Topboundaries = $L(Timeline_start,this.$node)[0].getBoundingClientRect().top;
			var Bottomboundaries = $L(Timeline_end,this.$node)[0].getBoundingClientRect().bottom;
			var elementOffset = element.getBoundingClientRect();
			if( ( scrollDiv.scrollTop - prevScrollTop ) >= height &&  scrollTop <= MaxScrollHeight ){
				var count = parseInt((scrollDiv.scrollTop - prevScrollTop)/height);
				currentMin = count;
				_this.StartDate.add((count * (timelineInterval/4)),'minutes');
				if( ( elementOffset.top + ( count * height ) ) < ( Bottomboundaries ) ){
					var newEndDate = $L.moment(_this.StartDate.getDObj().toString()).add(eventMinDiff,'minutes');
					var actualTimelineEnd = $L.moment(_this.StartDate.getDObj().toString()).add(1,'date').startOf('day');
					isadd = true;
					var endDateMin = newEndDate.getDObj().getTime();
					var startDateMin = _this.StartDate.getDObj().getTime();
					var customEndMin = customTimeline.end.getDObj().getTime();
					var customStartMin = customTimeline.start.getDObj().getTime();
					if(customStartMin >= startDateMin){
						element.style.height = ((endDateMin - customStartMin) * (height/15)) + 'px';
						startTop = y - (y - startTop) % height;
						if(otherElem){
							_this._eventData.start = _this.StartDate.format(format);
							otherElem.remove();
							otherElem = null;
						}
					}else if( startDateMin >= customEndMin ){
						// element.style.height = ((endDateMin - startDateMin) * (height/15)) + 'px';
						offsetTop = offsetTop + (count * height);
						startTop = y - (y - startTop) % height;
						
					}else{
						_this.StartDate.subtract(startDateMin - customEndMin,'minutes');
					}
					
					if(elementOffset.bottom > Bottomboundaries && elementOffset.height > height ){										
						if(!otherElem && actualTimelineEnd.getDObj().getTime() < newEndDate.getDObj().getTime() ){
							_this._actualEnd = _this.findEndDate(_this.StartDate,{start : _this._eventData._actualStart || _this._eventData.start, end : _this._eventData._actualEnd || _this._eventData.end});
							_this._eventData.disableActualEnd = false;
							if(!_this._eventData._actualEnd){
								_this._eventData.start =  _this.StartDate.format(format);
								_this._eventData._actualEnd = _this._actualEnd.format(format);
							}
							_this._eventData.end = $L.moment(_this._eventData.end,format)
							_this._eventData.end.set('hours',24)
							_this._eventData.end.set('minutes',0)
							_this._eventData.end = _this._eventData.end.format(format);
							otherElem = _this.createTimeLineEvent(_this._eventData);
							element.style.height = element.getBoundingClientRect().height - ((currentMin) * height) + 'px';
							isadd = false;
						}
						
					}
				
				}else{
					_this.StartDate.set('hours'	, customTimeline.end.get('hours'));
					_this.StartDate.set('minutes' , timelineInterval - (timelineInterval/4));
					offsetTop = (Bottomboundaries - height) - element.offsetParent.getBoundingClientRect().top ;
					element.style.height = height + 'px';
					isadd = false;
				}
				prevScrollTop = scrollDiv.scrollTop - (scrollDiv.scrollTop - prevScrollTop)%height;
			} 
			if( ( prevScrollTop - scrollDiv.scrollTop  ) >= height && scrollTop > 0 ){
				var count = parseInt((prevScrollTop - scrollDiv.scrollTop)/height);
				issubtract = true;
				if((elementOffset.bottom - ( count * height) ) > ( Topboundaries + height ) ){
					currentMin = count;
					_this.StartDate.subtract((count * (timelineInterval/4)),'minutes');
					var newEndDate = $L.moment(_this.StartDate.getDObj().toString()).add(eventMinDiff,'minutes');
					var startDateMin = _this.StartDate.get('hours')  * 60 +  _this.StartDate.get('minutes');
					var customEndMin = customTimeline.end.get('hours') * 60 + customTimeline.end.get('minutes') + timelineInterval - (timelineInterval/4);
					var customStartMin = customTimeline.start.get('hours') * 60 + customTimeline.start.get('minutes');
					startTop = y - (y - startTop) % height;
					offsetTop = offsetTop - count * height;
					if( (newEndDate.get('hours')  * 60 +  newEndDate.get('minutes')) <= customStartMin && !_this._eventData.disableActualStart ){
						if(otherElem){
							_this._eventData.end = newEndDate.format(format);
							otherElem.remove();
							otherElem = null;
							_this._eventData.disableActualStart = true;
						}
					}
					if( elementOffset.top - (currentMin * height)  < Topboundaries && elementOffset.height > height ){
						var diff = Topboundaries - (elementOffset.top - (currentMin * height));
						element.style.height = elementOffset.height - diff + 'px';
						offsetTop = Topboundaries - element.offsetParent.getBoundingClientRect().top;
						if(!otherElem && customEndMin <= startDateMin ){
							_this._eventData.disableActualStart = false;
							_this._actualStart = $L.moment(_this.StartDate,format);
							if(!_this._eventData._actualStart){
								_this._eventData.end = _this.findEndDate(_this.StartDate,{end : _this._eventData._actualEnd ||_this._eventData.end , start : _this._eventData._actualStart || _this._eventData.start}).format(format);
								_this._eventData._actualStart = $L.moment(_this.StartDate,format).format(format);
							}
							_this._eventData.start = $L.moment(_this._eventData.start,format);
							_this._eventData.start.set('hours',0);
							_this._eventData.start.set('minutes',0);
							_this._eventData.start.set('seconds',0);
							_this._eventData.start = _this._eventData.start.format(format);
							otherElem = _this.createTimeLineEvent(_this._eventData,true);
							if(!otherElem){
								offsetTop += (count * height);
							}
							issubtract = false;
						}
						// issubtract = false;
					}
				}else{
					var count = parseInt((elementOffset.bottom - (elementOffset.top + height)) / height);
					_this.StartDate.subtract((count * (timelineInterval/4)),'minutes');
					element.style.height = height + 'px';

					// issubtract = false;
				}
				prevScrollTop = scrollDiv.scrollTop + (prevScrollTop - scrollDiv.scrollTop)%height;
			}
			var returnVariable = _this.updateExentedTimelineEvent(_this._eventData,isadd,issubtract,view,otherElem,element,height,timelineInterval,offsetTop,currentMin,minTop,maxTop,format,Bottomboundaries)
			offsetTop = returnVariable.offsetTop;
			otherElem = returnVariable.otherElem;
			element.style.left = offsetLeft + 'px';
        	element.style.top = offsetTop  + 'px';
			if(_animationFrame){
				cancelAnimationFrame(_animationFrame);
			}
			_animationFrame = requestAnimationFrame(scrollAnimation.bind(this,scrollDiv,element,MaxScrollHeight,event,height))
		}
		var otherElem;
		var event_tag = this.$node.querySelectorAll('lyte-scheduler-event-tag:not(.lyteSchedulerNoDrag)');
		event_tag.length && $L(event_tag).draggable({
			threshold : _this.getData('ltPropDragThershold'),
			cancel : ".lyteSchedulerDragCancel, .lyteSchedulerGrabResize, .lyteSchedulerHorizontalRightResize, .lyteSchedulerHorizontalLeftResize",
			dblTouchEvent : true,
			zIndex : 10,
			onStart : function(element, event){
				if(!isMultiView){
					header_height = _this.$node.querySelector('.lyteSchedulerViewMainTable thead') ;
					header_height = header_height ? header_height.offsetHeight : _this.$node.querySelector('.lyteSchedulerDayViewAllDayRow').offsetHeight;
				}
				_this._eventData = $u.clone(element.getData('ltPropEvent'));
				_this._ActualEventData = _this.genreateActualEvent(_this._eventData);
				if(event.type == 'mousedown'){
					startTop = event.clientY;
            		startLeft = event.clientX;
				}else{
					startTop = event.touches[0].clientY,
            		startLeft = event.touches[0].clientX;
				}
            	offsetTop = element.offsetTop - parseInt(window.getComputedStyle(element).marginTop) - 0.5;
            	offsetLeft = element.offsetLeft;
            	element.style.zIndex = 10000;				
				allDayEvent = element.classList.contains('lyteSchedulerAllDayEventTag') ? true  : false;
				if(scrollDiv){
					ScrollDivRect = scrollDiv.getBoundingClientRect();
				}
			},
			onDragStart : function ( element, event) {
				var id =  element.dataset.id;
				var scheduler = $L(element).closest('lyte-scheduler')[0];
				var disable_elem = scheduler.querySelectorAll('#u'+ id );
				disable_elem = $L(disable_elem).not(element);
				if(isRTL){
					element.style.right =  'unset';
				}
            	_this._actualHeight = element.getBoundingClientRect().height;
				eventMinDiff = _this.getTimediff(_this._eventData._actualStart || _this._eventData.start,_this._eventData._actualEnd || _this._eventData.end);
				if((view == 'week' && !isUserBased) || view == 'day'){
					if(!isMultiView){
						var id = event.dataset.id;
						if(id.includes('dummy')){
							otherElem = $L('#u'+id.replace('dummy',''),_this.$node)[0];
						}else{
							otherElem = $L('#udummy'+id,_this.$node)[0];
						}
					}
				}else{
					disable_elem.addClass('hideSchedulerEvent');
				}
            	if(!isMultiView){
					if(!element.parent){
						element.parent = $L(element).closest('td')[0];
						element.style.left = '5px';
						offsetLeft = 5;
					}else{
						element.style.left =  element.offsetParent.getBoundingClientRect().left - element.getBoundingClientRect().left   +"px";
						offsetLeft = element.offsetLeft;
					}
				}else{
					if(!element.parent){
						element.parent = $L(element).closest('tr')[0];
					}
				}
            	// if(!isMultiView && !element.classList.contains('lyteSchedulerAllDayEventTag') && !isRTL){
            	// 	// element.style.right =  '5px';
            	// }
				if(!element.classList.contains('lyteSchedulerAllDayEventTag') && !(isMultiView && view == 'day')){
					element.style.width = 'calc(100% - 10px)';
				}
				if(scrollDiv){
					prevScrollTop = scrollDiv.scrollTop;
				}
				_this.StartDate = $L.moment(_this._eventData.start,format);  
				_this.end_date = $L.moment(_this._eventData.end,format);
				customTimeline.start = $L.moment(_this.StartDate.getDObj().toString()).startOf('day');
				customTimeline.end = $L.moment(_this.StartDate.getDObj().toString()).subtract(1,'date').endOf('day');
				if(_this._eventData._actualEnd){
					_this._actualEnd = $L.moment(_this._eventData._actualEnd,format);
				}
				if(_this._eventData._actualStart){
					_this._actualStart = $L.moment(_this._eventData._actualStart,format);
					_this.StartDate = $L.moment(_this._eventData._actualStart,format); 
				}
				
			},
			onDrag : function( element ,dragElem,event ){
				if(!element.classList.contains('lyteSchedulerAllDayEventTag') && Draginit && (!isMultiView && view !== 'day')){
					element.style.width = 'calc(100% - 10px)';
					Draginit = false;
				}
				if(event.type == 'mousemove'){
					var x = event.clientX,
            			y = event.clientY;	
				}else{
					var x = event.touches[0].clientX,
            			y = event.touches[0].clientY;
				}
				var elem_offset = element.getBoundingClientRect();
				var currentMin;
				var isadd = false;
				var issubtract = false;
				var _elemOrginDiv = element.parent;
				_elemOrginDiv = _elemOrginDiv ? _elemOrginDiv : element.offsetParent;
				var _elemOffset = _elemOrginDiv.getBoundingClientRect();
				var Bottomboundaries = $L(Timeline_end,this.$node)[0];
				if(Bottomboundaries){
					Bottomboundaries = Bottomboundaries.getBoundingClientRect().bottom;
				}
				var Topboundaries = $L(Timeline_start,this.$node)[0];
				if(Topboundaries){
					Topboundaries = Topboundaries.getBoundingClientRect().top;
				}
            	if(istimelineDrag && !element.classList.contains('lyteSchedulerAllDayEventTag')){
					otherElem = _this.timelineEventDrag(event, element, width, first_tdWidth, Topboundaries, Bottomboundaries, _elemOffset, elem_offset, ScrollDivRect, allDayEvent, x, y, height, customTimeline, isadd, issubtract, otherElem, scrollAnimation, MaxScrollHeight, scrollDiv);
					if(_this.getMethods('onDragEvent')){
						_this.executeMethod('onDragEvent',_this._eventData,_this.StartDate,_this.findEndDate(_this.StartDate,{start : _this._eventData._actualStart || _this._eventData.start, end: _this._eventData._actualEnd || _this._eventData.end }),_this.$node);
					}
					return false;
				}else if(view === 'day' && !element.classList.contains('lyteSchedulerAllDayEventTag')){
					_this.ispreventDrag = true;
					var Leftboundaries;
					if(!_this.getData('ltPropHideAlldayEvent')){
						Leftboundaries = ScrollDivRect.left + userdata_width + $L('.lyteSchedulerAllDayEvent',_this.$node)[0].offsetWidth;
					}else{
						Leftboundaries = ScrollDivRect.left + userdata_width;
					}
					if( (element.parent.getBoundingClientRect().top + element.parent.getBoundingClientRect().height) <= y  && ( element.getBoundingClientRect().top + element.getBoundingClientRect().height + height) < (ScrollDivRect.top + ScrollDivRect.height)){
            			if(element.parent.nextElementSibling){
            				element.parent = element.parent.nextElementSibling ? element.parent.nextElementSibling : element.parent;
            			}
						offsetTop = element.parent.getBoundingClientRect().top - element.offsetParent.getBoundingClientRect().top;
            		}
            		if( y < (elem_offset.top) && (elem_offset.top - height) > (ScrollDivRect.top + element.offsetHeight  ) ){
            			if(element.parent.previousElementSibling){
            				element.parent = element.parent.previousElementSibling ? element.parent.previousElementSibling : element.parent;
            			}
						offsetTop = element.parent.getBoundingClientRect().top - element.offsetParent.getBoundingClientRect().top;
            		}
					if( (x - startLeft) > width && (element.getBoundingClientRect().left + element.offsetWidth  ) < (ScrollDivRect.left + ScrollDivRect.width ) ){
						var count =  parseInt((x - startLeft)/width);
	            		offsetLeft = offsetLeft + (width * count);
						_this.StartDate.add(10 * count,'minutes')
	            		startLeft = x - (x - startLeft) % width;
						_this.callonDateChange(_this._ActualEventData,_this.StartDate)
	            	}
	            	if( (startLeft - x) > width   && ( element.getBoundingClientRect().left ) >  Leftboundaries ){
						var count =  parseInt((startLeft - x)/width);
						offsetLeft = offsetLeft - (count * width);
						_this.StartDate.subtract(10 * count,'minutes')
	            		startLeft = x + ( startLeft - x ) % width;
						_this.callonDateChange(_this._ActualEventData,_this.StartDate)
	            	}
					if(_animationFrame){
						cancelAnimationFrame(_animationFrame);
					}
					if(_this.getMethods('onDragEvent')){
						_this.executeMethod('onDragEvent',_this._eventData,_this.StartDate,_this.findEndDate(_this.StartDate,_this._eventData),_this.$node);
					}
					_animationFrame = window.requestAnimationFrame(verticalScrollAnimation.bind(_this,scrollDiv,element,MaxScrollWidth,event,width))
					return false;
        		}
			},
			onStop : function(element){
				delete _this.ispreventDrag;
				delete _this.startDate;
				cancelAnimationFrame(_animationFrame);
				Draginit = false;
				var retrunVal = _this.returnval;
				delete _this.returnval;
				return retrunVal;
			}
		});
	 	var allDayEvent = this.$node.querySelectorAll('.lyteSchedulerAllDayEvent');

		allDayEvent.length && $L(allDayEvent).droppable({
			accept : ['.lyteSchedulerAllDayEventTag'],
			onLeave : function () {
				var hoverDiv = $L('.lyteSchedulerhoverDate',_this.$node);
				hoverDiv.removeClass('lyteSchedulerhoverDate');
				if(_this.getMethods('onDragEnterEvent')){
					_this.executeMethod('onDragEnterEvent',draggableElem,droppableElem,_this.$node);
				}
			},
			onEnter : function(draggableElem,droppableElem){
				if((view == 'day' && isMultiView && isUserBased && draggableElem.classList.contains('lyteSchedulerAllDayEventTag'))){
					droppableElem.classList.add('lyteSchedulerhoverDate');
				}
				if(_this.getMethods('onDragEnterEvent')){
					_this.executeMethod('onDragEnterEvent',draggableElem,droppableElem,_this.$node);
				}
			},
			onDrag : function( draggableElem, droppableElem ){
				var view = _this.getData('ltPropSchedulerView');
				var startDate =  draggableElem.parentElement.dataset.date;
				var format = _this.getData('ltPropFormat') || 'YYYY-MM-DDTHH:mm:ss';
				if(!draggableElem.classList.contains('lyteSchedulerAllDayEventTag')  || (view == 'day' && isMultiView && isUserBased)){
					return;
				}
				if( _this.ispreventDrag ){
					return;
				}
				if( view == 'week' && !isUserBasedWeek ){
					var curr_row = droppableElem.parentElement;
					var date_div = curr_row.querySelectorAll('.lyteSchedulerAllDayEvent');
				}else{
					var date_div = _this.$node.querySelectorAll('.lyteSchedulerAllDayEvent');
				}	
				var event_data =  _this._eventData;
				var org_start = $L.moment(event_data.start,format).format('DD-MM-YYYY');
				var userid = droppableElem.dataset.userid;
				var userData = _this.getData('ltPropSchedulerUser')
				var userIndex = userData.findIndex(function(user){ return user.id == userid });
				total_length = _this.getEventInterval(event_data.start,event_data.end,format);	
				if(currentDrop !== droppableElem){
					currentDrop = droppableElem;
					var start_date = $L.moment(droppableElem.children[0].dataset.date,'DD-MM-YYYY').subtract(Math.max((diff - 1),0),'date',true);
					start_date.set('minutes',_this.StartDate.get('minutes'));
					start_date.set('hours',_this.StartDate.get('hours'));
					start_date.set('seconds',_this.StartDate.get('seconds'));
					var end_date = $L.moment(start_date.format('DD-MM-YYYY'),'DD-MM-YYYY').add(Math.max(total_length,0),'date');
					end_date.set('minutes',_this.end_date.get('minutes'));
					end_date.set('hours',_this.end_date.get('hours'));
					end_date.set('seconds',_this.end_date.get('seconds'));
					if(_this.getMethods('onDateChange')){
						_this.executeMethod('onDateChange',event_data,start_date,end_date,_this.$node)
					}
					_this.StartDate = start_date;
					_this.end_date = end_date;
				} 
				if( _this.getMethods('onDragEvent') ){
					_this.executeMethod('onDragEvent',event_data,_this.StartDate,_this.end_date,_this.$node)
				}
				if( event_data ){
					var drop_pos = _this.getEventInterval(date_div[0].children[0].dataset.date,droppableElem.children[0].dataset.date,'DD-MM-YYYY');
					if((org_start !== startDate) && first){
						diff =  _this.getEventInterval(event_data.start , $L.moment(startDate,'DD-MM-YYYY')._dateObj ,format);
						first = false;
					}
					
					for(var index = diff ; index >= 0; index--){
						var dropIndex = isUserBasedWeek ? (userData.length * drop_pos) + userIndex - (userData.length * index) : drop_pos - index;
						if(date_div[ dropIndex ]){
							date_div[ dropIndex ].classList.add('lyteSchedulerhoverDate');
						}
					}
					for(var index = 0; index < ( ( total_length ) - diff - 1)  ; index++){
						var dropIndex = isUserBasedWeek ? (userData.length * drop_pos) + userIndex + ( userData.length * (index + 1)) : drop_pos + index + 1;
						if(date_div[ dropIndex ]){
							date_div[ dropIndex ].classList.add('lyteSchedulerhoverDate');
						}
					}
				}
				return true;
			},
			onDrop : function( draggedElem, droppableElem ){
				var date_div = _this.$node.querySelectorAll('.lyteSchedulerDropPlaceholder');
				$L(date_div).removeClass('lyteSchedulerDropPlaceholder');
				var user;
				if(isUserBased && (view == 'week' || view == 'day')){
					user = droppableElem.dataset.userid;
				}else{
					user = droppableElem.parentElement.dataset.userid;
				}
				var format = 'DD-MM-YYYY';
				var start_date = $L.moment(droppableElem.children[0].dataset.date,format).subtract((( diff ) >= 0 ? diff : 0),'date',true);
				var events  = _this.getData('ltPropManipulatedEvent');
				var event_data = $u.findWhere(events,{id: draggedElem.dataset.id});
				var orginalStart =  $L.moment(event_data.start,_this.data.ltPropFormat);
				var originEnd =  $L.moment(event_data.end,_this.data.ltPropFormat);
				start_date.set('hours',orginalStart.get('hours'));
				start_date.set('minutes',orginalStart.get('minutes'));
				var end_date = $L.moment(start_date.getDObj().toString()).add(_this.getTimediff(orginalStart,originEnd),'minutes');
				if(_this.getMethods('onDropEvent')){
					returnVal = _this.executeMethod('onDropEvent',event_data,start_date,end_date,user);
				}
				return returnVal;

			},
			tolerance :"touch"
		});
		
		var timeLineEvent = this.$node.querySelectorAll('.lyteSchedulerTimeLineEvent');
		if( timeLineEvent.length ){
			var restrict = ".lyteSchedulerEventTimelinetag";
			if(this.getData('ltPropHideAlldayEvent')){
				restrict = undefined;
			}
 			$L(timeLineEvent).droppable({
				onDrop : function(draggedElem,droppableElem){
					if(draggedElem.classList.contains('lyteSchedulerAllDayEventTag')){
						return;	
					}
					var start_time ;
					var end_time;
					if(!isMultiView || istimelineDrag){
						var events  = _this.getData('ltPropManipulatedEvent');
						draggedElem.dataset.id = draggedElem.dataset.id.replace('dummy','');
						var start_date = draggedElem.parent.children[0].dataset.date;	
						start_time = droppableElem.dataset.time;
						if(start_time){
							start_time = _this.StartDate;
							var timeDiff = _this.getTimediff(_this._eventData._actualStart || _this._eventData.start,_this._eventData._actualEnd || _this._eventData.end);
							if(( timeDiff ) ){
								var date = $L.moment(start_time.format(format),format).add( timeDiff,'minutes',true);
								end_time = date;
							}
						}
					}else{
						var user = draggedElem.parent ? draggedElem.parent.dataset.userid : droppableElem.parentElement.dataset.userid;
						var start_date = _this.getData('startDateOfView');
						start_time = droppableElem.children[0].dataset.time;
						var time_division = 1;
						if(start_time){

							var interval = draggedElem.offsetWidth / ( droppableElem.offsetWidth / time_division ) ;
							var date = start_date + ' ' + start_time;
							date = $L.moment(date,format);
							start_time = $L.moment(start_date + ' ' + start_time,format);
							
							var start_time_min = (draggedElem.getBoundingClientRect().left - droppableElem.getBoundingClientRect().left) / (droppableElem.offsetWidth / time_division);
							start_time_min *=  60;
							if(start_time_min){
								date.add(start_time_min,'minutes',true);
								start_time = $L.moment(date.format(format),format);
							}
							if(interval){

								end_time = date.add( (interval  ) * 60 ,'minutes',true);
							}
						}


					}
					delete _this.StartDate;
					delete _this._actualEnd;
					delete _this._actualStart;
					delete _this._eventData;
					delete _this._actualHeight;
					if(_this.getMethods('onDropEvent')){
						_this.returnval = _this.executeMethod( 'onDropEvent', _this._ActualEventData, start_time, end_time, user, draggedElem, droppableElem );
					}
					delete _this._ActualEventData;
				},
				onEnter : function(draggedElem,droppableElem){
					if(_this.getMethods('onDragEnterEvent')){
						_this.executeMethod('onDragEnterEvent',draggedElem,droppableElem,_this.$node);
					}				
				},
				onLeave : function(draggedElem,droppableElem){
					if(_this.getMethods('onDragLeaveEvent')){
						_this.executeMethod('onDragLeaveEvent',draggedElem,droppableElem,_this.$node);
					}				
				},
				tolerance :"touch",
				restrict : restrict
			});
 		}
	},
	timelineEventDrag : function(event, element, width, first_tdWidth, Topboundaries, Bottomboundaries, _elemOffset, elem_offset, ScrollDivRect, allDayEvent, x, y, height, customTimeline, isadd, issubtract, otherElem, scrollAnimation, MaxScrollHeight, scrollDiv){
		var _this = this;
		var currentMin = 0;
		var timelineInterval = this.getData('ltPropTimeLine');
		var isRTL = _lyteUiUtils.getRTL();
		var format = this.getData('ltPropFormat');
		var minTop = Topboundaries - element.offsetParent.getBoundingClientRect().top;
		var view = this.getData('ltPropSchedulerView');
		var maxTop = Bottomboundaries - elem_offset.height - element.offsetParent.getBoundingClientRect().top - 0.5;
		if(  view == 'week' && ( !isRTL && ( _elemOffset.left + _elemOffset.width ) <= x  &&(_elemOffset.left + _elemOffset.width ) <= (ScrollDivRect.left + ScrollDivRect.width)  || ( isRTL && ( _elemOffset.left ) > x  &&( _elemOffset.left - _elemOffset.width ) > ( ScrollDivRect.left ) ) ) && element.parent.nextElementSibling){
			if(isRTL){
				offsetLeft = offsetLeft - width ;
			}else{
				offsetLeft = offsetLeft + width ;
			}
			if(!allDayEvent){
				_this.StartDate.add(1,'date')
				element.parent = element.parent.nextElementSibling ? element.parent.nextElementSibling : element.parent;
				if(otherElem || _this._eventData._actualStart || _this._eventData._actualEnd){
					otherElem = _this.changeTimeLineDate(otherElem,'next',_this._eventData);
					if(_this._eventData._actualStart){_this._eventData._actualStart = _this._actualStart.format(format);}
					if(_this._eventData._actualEnd){_this._eventData._actualEnd = _this._actualEnd.format(format);}
				}
				_this._eventData.end = $L.moment(_this._eventData.end,format).add(1,'day').format(format);
				_this._eventData.start = $L.moment(_this._eventData.start,format).add(1,'day').format(format);
				_this.callonDateChange(_this._ActualEventData,_this.StartDate)
			}
		}
		if( view == 'week' && ( !isRTL && (  x < (_elemOffset.left - 5) && (_elemOffset.left - 5 ) > (ScrollDivRect.left + first_tdWidth) ) || ( isRTL && x > ( _elemOffset.right ) && ( _elemOffset.right  < ( ScrollDivRect.right - first_tdWidth ) ) ) ) && element.parent.previousElementSibling  ){
			if(isRTL){
				offsetLeft = offsetLeft + width ;
			}else{
				offsetLeft = offsetLeft - width ;
			}
			if(!allDayEvent){
				_this.StartDate.subtract(1,'date')
				_this.callonDateChange(_this._ActualEventData,_this.StartDate);
				if(otherElem || _this._eventData._actualStart || _this._eventData._actualEnd){
					otherElem = _this.changeTimeLineDate(otherElem,'prev',_this._eventData);
					if(_this._eventData._actualStart){_this._eventData._actualStart = _this._actualStart.format(format);}
					if(_this._eventData._actualEnd){_this._eventData._actualEnd = _this._actualEnd.format(format);}
				}
				_this._eventData.end = $L.moment(_this._eventData.end,format).subtract(1,'day').format(format);
				_this._eventData.start = $L.moment(_this._eventData.start,format).subtract(1,'day').format(format);
				element.parent = element.parent.previousElementSibling ? element.parent.previousElementSibling : element.parent;
			}
		}
		if(!allDayEvent){
			if( (y - startTop) > height ){
				if( y > Topboundaries ){
					var count = parseInt((y - startTop)/height);
					currentMin = count;
					_this.StartDate.add((count * (timelineInterval/4)),'minutes');
					if( ( elem_offset.top + ( count * height ) ) < ( Bottomboundaries ) ){
						var newEndDate = $L.moment(_this.StartDate.getDObj().toString()).add(eventMinDiff,'minutes');
						var actualTimelineEnd = $L.moment(_this.StartDate.getDObj().toString()).add(1,'date').startOf('day');
						isadd = true;
						var endDateMin = newEndDate.get('hours') * 60 +  newEndDate.get('minutes');
						var startDateMin = _this.StartDate.get('hours')  * 60 +  _this.StartDate.get('minutes');
						var customEndMin = customTimeline.end.get('hours') * 60 + customTimeline.end.get('minutes') + timelineInterval - (timelineInterval/4);
						var customStartMin = customTimeline.start.get('hours') * 60 + customTimeline.start.get('minutes');
						if(customStartMin >= startDateMin){
							element.style.height = ((endDateMin - customStartMin) * (height/15)) + 'px';
							startTop = y - (y - startTop) % height;
							if(otherElem){
								_this._eventData.start = _this.StartDate.format(format);
								otherElem.remove();
								otherElem = null;
							}
						}else if( startDateMin <= customEndMin ){
							element.style.height = ((endDateMin - startDateMin) * (height/15)) + 'px';
							offsetTop = offsetTop + (count * height);
							startTop = y - (y - startTop) % height;
							
						}else{
							_this.StartDate.subtract(startDateMin - customEndMin,'minutes');
						}
						if((elem_offset.bottom + (currentMin) * height) > Bottomboundaries && elem_offset.height > height ){	
							if(!otherElem && actualTimelineEnd.getDObj().getTime() < newEndDate.getDObj().getTime() ){
								_this._actualEnd = _this.findEndDate(_this.StartDate,{start : _this._eventData._actualStart || _this._eventData.start, end : _this._eventData._actualEnd || _this._eventData.end});
								_this._eventData.disableActualEnd = false;
								if(!_this._eventData._actualEnd){
									_this._eventData.start =  _this.StartDate.format(format);
									_this._eventData._actualEnd = _this._actualEnd.format(format);
								}
								_this._eventData.end = $L.moment(_this._eventData.end,format)
								_this._eventData.end.set('hours',24)
								_this._eventData.end.set('minutes',0)
								_this._eventData.end = _this._eventData.end.format(format);
								otherElem = _this.createTimeLineEvent(_this._eventData);
								element.style.height = element.getBoundingClientRect().height - ((currentMin) * height) + 'px';
								isadd = false;
							}
						}
					}else{
						_this.StartDate.set('hours'	, customTimeline.end.get('hours'));
						_this.StartDate.set('minutes' , timelineInterval - (timelineInterval/4));
						offsetTop = (Bottomboundaries - height) - element.offsetParent.getBoundingClientRect().top ;
						element.style.height = height + 'px';
						isadd = false;
					}
				}
			}else if( (startTop - y) > height ){
				var count =  parseInt((startTop - y)/height);
				issubtract = true;
				if((elem_offset.bottom - ( count * height) ) > ( Topboundaries + height ) ){
					currentMin = count;
					_this.StartDate.subtract((count * (timelineInterval/4)),'minutes');
					var newEndDate = $L.moment(_this.StartDate.getDObj().toString()).add(eventMinDiff,'minutes');
					var startDateMin = _this.StartDate.getDObj().getTime();
					var customEndMin = customTimeline.end.getDObj().getTime();
					var customStartMin = customTimeline.start.getDObj().getTime();
					startTop = y - (y - startTop) % height;
					offsetTop = offsetTop - count * height;
					if( newEndDate.getDObj().getTime() <= customStartMin && !_this._eventData.disableActualStart ){
						if(otherElem){
							_this._eventData.end = newEndDate.format(format);
							otherElem.remove();
							otherElem = null;
							_this._eventData.disableActualStart = true;
						}
					}
					if( elem_offset.top - (currentMin * height) <= Topboundaries && elem_offset.height > height ){
						var diff = Topboundaries - (elem_offset.top - (currentMin * height));
						element.style.height = elem_offset.height - diff + 'px';
						offsetTop = Topboundaries - element.offsetParent.getBoundingClientRect().top;
						if(!otherElem && customEndMin >= startDateMin ){
							_this._eventData.disableActualStart = false;
							_this._actualStart = $L.moment(_this.StartDate,format);
							if(!_this._eventData._actualStart){
								_this._eventData.end = _this.findEndDate(_this.StartDate,{end : _this._eventData._actualEnd ||_this._eventData.end , start : _this._eventData._actualStart || _this._eventData.start}).format(format);
								_this._eventData._actualStart = $L.moment(_this.StartDate,format).format(format);
							}
							_this._eventData.start = $L.moment(_this._eventData.start,format);
							_this._eventData.start.set('hours',0);
							_this._eventData.start.set('minutes',0);
							_this._eventData.start.set('seconds',0);
							_this._eventData.start = _this._eventData.start.format(format);
							otherElem = _this.createTimeLineEvent(_this._eventData,true);
							if(!otherElem){
								offsetTop += (count * height);
							}
							issubtract = false;
						}
						// issubtract = false;
					}
				}else{
					var count = parseInt((elem_offset.bottom - (elem_offset.top + height)) / height);
					_this.StartDate.subtract((count * (timelineInterval/4)),'minutes');
					
					element.style.height = height + 'px';
					// issubtract = false;
				}
			}
		}
		if(this._animationFrame){
			cancelAnimationFrame(this._animationFrame);
		}
		this._animationFrame =  window.requestAnimationFrame(scrollAnimation.bind(this,scrollDiv,element,MaxScrollHeight,event,height, elem_offset))

		mouseposition = event.clientY - elem_offset.top;
		var returnVariable = _this.updateExentedTimelineEvent(_this._eventData,isadd,issubtract,view,otherElem,element,height,timelineInterval,offsetTop,currentMin,minTop,maxTop,format,Bottomboundaries);
		offsetTop = returnVariable.offsetTop;
		otherElem = returnVariable.otherElem;
		element.style.left = offsetLeft + 'px';
		element.style.top = offsetTop  + 'px';
		return otherElem;
	},
	createTimeLineEvent : function(_eventData,formstart){
		var cloneEvent = $u.clone(this._eventData);
		var format = this.getData('ltPropFormat') || 'YYYY-MM-DDTHH:mm:ss';

		if(formstart){
			cloneEvent.start = this._eventData._actualStart;
			cloneEvent.end = $L.moment(this._eventData._actualStart,format);
			cloneEvent.end.set('hours',23);
			cloneEvent.end.set('minutes',59);
			cloneEvent.end.set('seconds',59);
			cloneEvent.end = cloneEvent.end.format(format);
			delete cloneEvent._actualStart;
			var Start_Date = $L.moment(this._eventData._actualStart,format).format('DD-MM-YYYY');
		}else{
			cloneEvent.start = $L.moment(this._actualEnd.getDObj().toString());
			cloneEvent.start.set('hours',0);
			cloneEvent.start.set('minutes',0);
			cloneEvent.start.set('seconds',0);
			var Start_Date = cloneEvent.start.format('DD-MM-YYYY');
			cloneEvent.start = cloneEvent.start.format(format);
			cloneEvent.end = this._actualEnd.format(format);
			delete cloneEvent._actualEnd;
		}
		var parentElem = $L(".lyteSchedulerWeekOverlayTable [data-date='"+Start_Date+"']",this.$node)[0];
		if(parentElem){
			return Lyte.Component.render( "lyte-scheduler-event-tag", {'ltPropEvent' : cloneEvent},  parentElem);
		}
		return null;
	},
	updateExentedTimelineEvent : function(_eventData,isadd,issubtract,view,otherElem,element,height,timelineInterval,offsetTop,currentMin,minTop,maxTop,format,Bottomboundaries){
		var _this = this;
		if(_this._eventData._actualStart && !_this._eventData.disableActualStart){
			if(isadd){
				var actualStart = this._actualStart;
				var min = this.getTimediff(this._actualStart,$L.moment(_this._eventData.start,format)  )
				actualStart.add(currentMin * (timelineInterval/4),'minutes');
				if(actualStart.format('YYYY-MM-DD') ==  $L.moment(_this._eventData._actualStart,format).format('YYYY-MM-DD')){
					element.style.height = element.getBoundingClientRect().height + (parseInt( currentMin) * height) + 'px';
					offsetTop -= ((currentMin) * height);
					offsetTop = Math.max(offsetTop,minTop);
					if(otherElem){
						otherElem.getData('ltPropEvent').start = this._actualStart.format(format);
						otherElem.component.fixTimeLineEvent(otherElem.getData('ltPropEvent'),$L.moment(this._actualStart),format,_this,view,otherElem.offsetParent);
					}
				}else{
					// element.style.height =  this._actualHeight + 'px';
					// this.StartDate.add(min,'minutes');
					this._actualStart = $L.moment(this.StartDate.getDObj().toString())
					if(otherElem && !_this._eventData.disableActualStart){
						otherElem.remove();
						otherElem = null;
					}
					_this._eventData.start =  this._actualStart.format(format);
					_this._eventData.end =  this.findEndDate(this._actualStart,{end : _this._eventData.end , start : _this._eventData._actualStart}).format(format);
					delete _this._eventData._actualStart;
					_this._eventData.disableActualStart = true;
				}
				
			}
			if(issubtract){
				var actualStart = this._actualStart;
				var min = this.getTimediff(this._actualStart.format(format),$L.moment(_this._eventData.start,format).format(format)  )
				actualStart.subtract(currentMin * (timelineInterval/4),'minutes');
				if(actualStart.format('YYYY-MM-DD') ==  $L.moment(_this._eventData._actualStart,format).format('YYYY-MM-DD')){
					// element.style.height = element.getBoundingClientRect().height - (parseInt(currentMin) * height) + 'px';
					offsetTop -= ((currentMin) * height);
					offsetTop = Math.max(offsetTop,minTop);
					if(otherElem){
						otherElem.getData('ltPropEvent').start = this._actualStart.format(format);
						otherElem.component.fixTimeLineEvent(otherElem.getData('ltPropEvent'),$L.moment(this._actualStart),format,_this,view,otherElem.offsetParent);
					}
				}else{
					element.style.height =  this._actualHeight + 'px';
					// this.StartDate.subtract(min,'minutes');
					if(otherElem && !_this._eventData.disableActualStart){
						otherElem.remove();
						otherElem = null;
					}
					_this._eventData.start =  this._actualStart.format(format);
					_this._eventData.end =  this.findEndDate(this._actualStart,{end : _this._eventData.end , start : _this._eventData._actualStart}).format(format);
					delete _this._eventData._actualStart;
					_this._eventData.disableActualStart = true;
				}
			}	
		}
		if(_this._eventData._actualEnd && !_this._eventData.disableActualEnd){
			if(isadd){
				var actualEnd = this._actualEnd;
				actualEnd.add( currentMin * (timelineInterval/4),'minutes');
				if(actualEnd.format('YYYY-MM-DD') ==  $L.moment(_this._eventData._actualEnd,format).format('YYYY-MM-DD')){
					element.style.height = element.getBoundingClientRect().height - (currentMin * height) + 'px';
					if(otherElem){
						otherElem.getData('ltPropEvent').end = actualEnd.format(format);
						otherElem.component.fixTimeLineEvent(otherElem.getData('ltPropEvent'),$L.moment(otherElem.getData('ltPropEvent').start,format),format,_this,view,otherElem.offsetParent);
					}
				}else{
					if(otherElem  && !_this._eventData.disableActualEnd){
						otherElem.remove()
						otherElem = null;
					}
					_this._eventData.end =  _this._eventData._actualEnd;
					delete _this._eventData._actualEnd;
					_this._eventData.disableActualEnd = true;
				}
			}
			if(issubtract){
				var actualEnd = this._actualEnd;
				actualEnd.subtract(currentMin * (timelineInterval/4),'minutes');
 				if((actualEnd.format('YYYY-MM-DD') ==  $L.moment(_this._eventData._actualEnd,format).format('YYYY-MM-DD')) ){
					element.style.height = element.getBoundingClientRect().height + (currentMin * height) + 'px';
					if(otherElem){
						otherElem.getData('ltPropEvent').end = actualEnd.format(format);
						otherElem.component.fixTimeLineEvent(otherElem.getData('ltPropEvent'),$L.moment(otherElem.getData('ltPropEvent').start,format),format,_this,view,otherElem.offsetParent);
					}
				}else{
					if(otherElem&& !_this._eventData.disableActualEnd ){
						otherElem.remove();
						otherElem = null;
					}
					_this._eventData.end =  _this._eventData._actualEnd;
					delete _this._eventData._actualEnd;
					_this._eventData.disableActualEnd = true;
				}
			}
			
		}
		return {offsetTop : offsetTop, otherElem : otherElem};
	},
	changeTimeLineDate : function(elem,pos,eventData){
		var format = this.getData('ltPropFormat') || 'YYYY-MM-DDTHH:mm:ss';
		if(elem){
			var eventData = elem.getData('ltPropEvent');
			elem.remove();
		}else{
			eventData = $u.clone(eventData);
			if(eventData._actualStart){
				eventData.start = this._actualStart.format(format);
				eventData.end = $L.moment(eventData.start, format);
				eventData.end.set('hours',23);
				eventData.end.set('minutes',59);
				eventData.end.set('seconds',59);
				eventData.end = eventData.end.format(format);
				delete eventData._actualStart;
			}
			if(eventData._actualEnd){
				eventData.end = this._actualEnd.format(format);
				eventData.start = $L.moment(eventData.end, format);
				eventData.start.set('hours',0);
				eventData.start.set('minutes',0);
				eventData.start.set('seconds',0);
				eventData.start = eventData.start.format(format);
				delete eventData._actualEnd;
			}
			// return null;
		}
		if(pos == 'next'){
			if(this._actualStart){
				eventData.start = this._actualStart.add(1,'date').format(format);
				eventData.end = $L.moment(eventData.end, format).add(1,'date').format(format);
			}
			if(this._actualEnd){
				eventData.end = this._actualEnd.add(1,'date').format(format);
				eventData.start = $L.moment(eventData.start, format).add(1,'date').format(format);
			}
			
		}else if(pos == 'prev'){
			if(this._actualStart){
				eventData.start = this._actualStart.subtract(1,'date').format(format);
				eventData.end = $L.moment(eventData.end, format).subtract(1,'date').format(format);
			}
			if(this._actualEnd){
				eventData.end = this._actualEnd.subtract(1,'date').format(format);
				eventData.start = $L.moment(eventData.start, format).subtract(1,'date').format(format);
			}
			
			
		}
		var parentElem = $L(".lyteSchedulerWeekOverlayTable [data-date='"+$L.moment(eventData.start,format).format('DD-MM-YYYY')+"']",this.$node)[0];
		if(parentElem){
			return Lyte.Component.render( "lyte-scheduler-event-tag", {'ltPropEvent' : eventData},  parentElem);
		}
		return null;
	},
	getEventInterval: function(start , end, format, returntime){
		var start_date = start;
		if(typeof start_date == 'string'){
			start_date = $L.moment(start_date, format)._dateObj;
		}
		var end_date = end;
		if(typeof end_date == 'string'){
			end_date = $L.moment(end ,format)._dateObj;
		}
		var difference = end_date.getTime() - start_date.getTime();
		if(returntime){
			return difference;
		}
    	var TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
		return TotalDays;
	},
	hide : function(position_elem,event_div){
		if((position_elem.offsetHeight + event_div.getBoundingClientRect().height) >= position_elem.parentElement.offsetHeight){
			event_div.classList.add('schedulerhide');
			event_div.style.top = 0;
			event_div.style.left = 0; 
			return true;
		}
	},
	hideUsers : function( hideuserarray ){
		var userList =  this.getData('ltPropSchedulerUser');
		var table_tr = this.$node('.UserCol');
		hideuserarray.forEach(function(index){
			table_tr[index].classList.add('LyteSchdeulerHideUser');
		});
	},
	setDisplayDate : function( dateDiv, date ,showdate ,popover){
		if(!dateDiv){
			return;
		}
		if( dateDiv.children.length){
		
			while(dateDiv.children.length){
				dateDiv.children[0].remove();
			}		
		}
		var tempMoment = $L.moment(date.toString());
		if(this.getData('ltPropSchedulerView') !== 'month' || showdate){
			dateDiv.appendChild(this.createTextNode(tempMoment.format('DD'), 'lyteSchNavigatorDateLabel'));
		}
		if(this.getData('ltPropSchedulerView') == 'month'){
			dateDiv.appendChild(this.createTextNode(_lyteUiUtils.i18n(tempMoment.format('MMMM')), 'lyteSchNavigatorMonthLabel'));
		}else{
			dateDiv.appendChild(this.createTextNode(_lyteUiUtils.i18n(tempMoment.format('MMM')), 'lyteSchNavigatorMonthLabel'));
		}
		dateDiv.appendChild(this.createTextNode(date.getFullYear(), 'lyteSchNavigatorYearLabel'));
		if(this.getData('ltPropSchedulerView') == 'day' && !popover){
			dateDiv.appendChild(this.createTextNode(_lyteUiUtils.i18n(tempMoment.format('dddd').toLowerCase()), 'lyteSchNavigatorDayLabel'));
		}
	},
	createTextNode : function(text, className) {
		var span = document.createElement('span');
		if(className) {
			span.classList.add(className);
		}
		var textnode =  document.createTextNode(text);
		span.appendChild(textnode);
		return span; 
	},
	clearUser : function(){
		this.setData('selectedUserArr',[]);
		var search_popover = $L('#usersreachPopover',this.$node)[0];
		var userlist = $L('.lyteSchedulerUserSearch', search_popover.actualModalDiv);
		for(index = 0; index < userlist.length; index++){
			var checkbox = $L('lyte-checkbox',userlist[index])[0];
			checkbox.setData('ltPropChecked',false);
		}
		var  schedulerUser = $L('[data-userid]');
		schedulerUser.removeClass('lyteSchedulerUserHide');
		schedulerUser.removeClass('lyteSchedulerUserSelected');
	},
	findDateonMenuClick : function(originElem,view){
		var isMultiUser = this.getData('ltPropMultiUserView')
		var date;
		if(view == 'day'){
			date = this.getData('startDateOfView');
		}else if(view == 'week' && !isMultiUser){
			date = parseInt(originElem.dataset.index);
			date = this.data.ltPropDateArray[date].val.format('DD-MM-YYYY');
		}else{
			date = originElem.querySelector('.scheduler-event-div').dataset.date;
		}
		return date;
	},
	findTimeonMenuClick : function(event, isMultiView, view){
		var time;
		if(!isMultiView && view !== 'month'){
			if(!event.target.classList.contains('lyteSchedulerAllDayEvent')){
				time = event.target.closest('.lyteSchedulerTimeLineEvent').dataset.time;
			}
		}else if(isMultiView && view == 'day'){
			if(event.target.classList.contains('lyteSchedulerTimeLineEvent')){
				if(this.getData('ltPropUserBasedView')){
					time = event.target.parentElement.dataset.time;
				}else{
					time = event.target.querySelector('.lyteSchedulerMultiUserViewEventElem').dataset.time;
				}
			}
		}
		return time;
	},
	genreateActualEvent : function(eventObj){
		var cloneEvent = $u.clone(eventObj);
		if(cloneEvent._actualStart){
			cloneEvent.start = cloneEvent._actualStart;
			delete cloneEvent._actualStart;
		}
		if(cloneEvent._actualEnd){
			cloneEvent.end = cloneEvent._actualEnd;
			delete cloneEvent._actualEnd;
		}
		if(cloneEvent._editable){
			delete cloneEvent._editable;
		}
		if(cloneEvent.id){
			cloneEvent.id = cloneEvent.id.replace('dummy','');
		}
		
		return cloneEvent;
	},
	actions : {
		onSchedulerEventHover : function(event,eventTag,eventObj,user){
			if(!eventObj){
				eventObj = eventTag.getData('ltPropEvent');
			}
			var UserData;
			if(user){
				UserData = $u.findWhere(this.getData('ltPropSchedulerUser'),{id: user});
			}
			var cloneEvent = this.genreateActualEvent(eventObj)
			if(this.getMethods('onEventHover')){
				this.executeMethod('onEventHover',event,cloneEvent,eventTag,UserData);
			}
		},
		onSchedulerEventClick : function(event,eventTag,user){
			if(user){
				var eventObj = user;
			}else{
				var eventObj = eventTag.getData('ltPropEvent');
			}
			if(this.getMethods('onEventClick')){
				this.executeMethod('onEventClick',event,eventObj,eventTag);
			}
		},
		onSchedulerEventMouseDown : function(event,eventTag){
			var isGrabResize, isHorizontalResize;
			
			if( event && event.target ){
				isGrabResize = event.target.closest('.lyteSchedulerGrabResize');
				isHorizontalResize = event.target.closest('.lyteSchedulerHorizontalResizeIcon');
			}
			
            if( !this.getData('isEventAdded')|| (!isGrabResize && !isHorizontalResize) || eventTag.classList.contains('lyteSchedulerParticipantEvent')  || eventTag.classList.contains('lyteSchedulerNoDrag') || ( this.getData('ltPropSchedulerView') === 'month' && this.getData('ltPropMultiUserView') === true ) ){
                return;
            }
			eventTag.classList.add('lyteSchedulerOnResize');
			eventTag.style.zIndex = 10000;
            var view = this.getData('ltPropSchedulerView');
			var isMultiUser = this.getData('ltPropMultiUserView');
            this.setData('dragDir','');
            var eventObj = eventTag.getData('ltPropEvent');
            if( $L && $L.schedulerEventResize ){
                if( (view === 'day' && !isMultiUser) ||
                 (view === 'week' && !isMultiUser && !event.allDayEvent) || this.getData('ltPropUserBasedView') ) {
                    if( event.target.tagName === 'SPAN' && event.target.classList.contains('lyteSchedulerGrabResize')){
                        event.target.classList.add('lyteSchedulerGrabResizeShow');
                        $L.schedulerEventResize( event, this, eventObj, eventTag );
                    }
                }
                if( (view === 'day' && isMultiUser )  ||
                 ( view === 'week' && !isMultiUser && event.allDayEvent ) || 
                 ( view === 'week' && isMultiUser ) || 
                 ( view === 'month' && !isMultiUser ) || this.getData('ltPropUserBasedView')) {

                    if( event.target.tagName === 'SPAN' && event.target.classList.contains('lyteSchedulerHorizontalResizeIcon')){
                        event.target.classList.add('lyteSchedulerLeftOrRightResizeIcon');
                        $L.schedulerEventResize( event, this, eventObj, eventTag );
                    }
                }
                else{
                    $L.schedulerEventResize( event, this, eventObj, eventTag );
                }
            }
        },
		clearSelection : function(){
			this.clearUser();
		},
		cancelUserSelect : function(){
			var popover = $L('#usersreachPopover',this.$node)[0];
			popover.ltProp('show',false);
			this.setData('checkboxArr',[]);
		},
		SelectUserSelect : function(){
			var popover = $L('#usersreachPopover',this.$node);
			popover[0].ltProp('show',false);
			var selectedUser = $L('[data-userid]:not(.lyteSchedulerUserSelected)');
			selectedUser.addClass('lyteSchedulerUserHide');	
			var cloneArr = $u.clone(this.getData('checkboxArr'));
			this.setData('selectedUserArr',cloneArr);
		},
		hideandShowCalender : function( event  ){
			var originElem;
			originElem = event.target.closest('lyte-scheduler-icon').getAttribute('id');
			var startDateOfView = this.getData('startDateOfView');
			var view = this.getData('ltPropSchedulerView');
			var isMonth = view == 'month';
			if(isMonth){
				startDateOfView = $L('.lyteSchedulerCurrentMonthDate .lyteSchedulerMonthEventsWrap',this.$node)[0].dataset.date;
			}
			if(!this.getData('ltPropHideCalendarNav')){
				$L('#'+originElem).addClass('lyteSchNavigatorCalOpened');
				var popover = $L('#calendarPopover',this.$node)[0];
				this.setData('ltPropShowCalendar',true);
				popover.setData('ltPropOriginElem','#'+originElem);
				if(_lyteUiUtils.getRTL()){
					popover.setData('ltPropPlacement', 'bottomRight');
				}
				var calendar = $L('lyte-calendar',popover.component.actualModalDiv)[0];
				calendar.setData('ltPropCurrentDate',startDateOfView);
				calendar.setData('viewType','dateView');
				if(view == 'week'){
					var dateArray = this.data.ltPropDateArray;
					calendar.setData('ltPropCurrentWeek',[startDateOfView,dateArray[dateArray.length - 1].val.format('DD-MM-YYYY')])
				}
				if(isMonth){
					var drilldownSpan = $L('.lyteCalsCalMon .lyteDrillCalHeaderButton',popover.component.actualModalDiv)[0];
					if(calendar && calendar.getAttribute('view-type') == 'dateView' && drilldownSpan){
						drilldownSpan.click();
					}
				}
				$L('#calendarPopover',this.$node)[0].setData('ltPropShow',true);
			}
			if(this.getMethods('onCalendarIconClick')){
				this.executeMethod('onCalendarIconClick',originElem,event.target,startDateOfView)
			}
		},
		scrollnav : function(event){
			var scroll_width = this.$node.querySelector('.lyteSchedulerTimeLineEvent').offsetWidth;
			var scrollDiv = this.$node.querySelector('.scrollContainer');
			if(event.target.classList.contains('lyteSchedulerLeftNav')){
				scrollDiv.scrollLeft -= scroll_width; 
			}else{
				scrollDiv.scrollLeft += scroll_width;
			}
		},
		today : function(event){
			this.$node.today();
			this.findActiveKeys(this.createDateObj( new Date()));
		},
		hiddenUserEvent : function(event,UserEvent,user){
			if(event.type == 'keydown'){
				if(event.keyCode && event.keyCode !== 13){
					return;
				}
			}
			this.$node.openHiddenUserPopover(UserEvent, user, event.target, {'placement': 'right' , 'type' : 'box'})
		},
		hiddenEvent : function(event,hiddenObj,date,user,time,view,isAllDay){
			if(event.type == 'keydown'){
				if(event.keyCode && event.keyCode !== 13){
					return;
				}
			}
			var group = event.target.dataset.group;
			var displayEvent = this.getData('ltPropProcessedData');
			var isMultiUser = this.getData('ltPropMultiUserView');
			this.setData('ltPropUserHiddenEvent',false);
			this.setData('hiddenUser',undefined);
			if(isAllDay){
				displayEvent = displayEvent.allDay;
			}
			if(time){
				date = typeof date == 'string' ? $L.moment(date,'DD-MM-YYYY') : date; 
				if(view == 'day' && isMultiUser && displayEvent[date.format('DD-MM-YYYY')] && displayEvent[date.format('DD-MM-YYYY')][user.id]){
					var hiddenEvent = hiddenObj[time];
					var eventData = displayEvent[date.format('DD-MM-YYYY')][user.id][time];
				}else{
					var hiddenEvent = hiddenObj[time];
					var eventData = displayEvent[time];
				}
			}else{
				date = typeof date == 'string' ? $L.moment(date,'DD-MM-YYYY') : date; 
				var hiddenEvent = hiddenObj[date.format('DD-MM-YYYY')];
				var eventData = displayEvent[date.format('DD-MM-YYYY')];
				if(user){
					hiddenEvent = hiddenEvent[user];
					eventData = eventData[user];
				}
			}
			if(group){
				hiddenEvent = hiddenEvent[group];
				var groupData = [];
				eventData[group].forEach(groupElement => {
					groupElement.forEach(element => {
						groupData.push(element.event);
					});
				});
				eventData = groupData;
			}
			if(view == 'day' ){
				var tempArr = [];
				if(eventData){
					if(isMultiUser && !isAllDay){
						eventData.forEach(function(eventArray){
							eventArray.forEach(function(event){
								tempArr.push(event)
							})
						})
					}else{
						eventData.forEach(function(event){
							tempArr.push(event)
						})
					}
					
					this.setData('hiddenEvent',tempArr.concat(hiddenEvent));
				}
			}else{
				if(Array.isArray(eventData)){
					var tempArray = [];
					eventData.forEach(function(event,index){
						if(event.dummy_id){
							event =  $u.clone($u.findWhere(this.getData('ltPropEvent'),{id: event.dummy_id}));
							tempArray.push(event);
							eventData[index] = event;
						}else if(event){
							tempArray.push(event);
						}
					}.bind(this))
					this.setData('hiddenEvent',tempArray.concat(hiddenEvent));
				}else{
					var userData = this.getData('ltPropSchedulerUser');
					var objectToArray = {...eventData,...hiddenEvent};
					var ArrayFormat = [];
					for(let user in objectToArray){
						var obj = $u.clone($u.findWhere(userData,{id: user}));
						if(!obj){
							continue;
						}
						if(obj.events){
							obj.events.push(objectToArray[user])
						}else{
							obj.events = [];
							obj.events.push(objectToArray[user])
						}
						ArrayFormat.push(obj);
					}
					this.setData('hiddenEvent',ArrayFormat);
				}
				
			}
			$L('#schedulerPopover',this.$node)[0] && $L('#schedulerPopover',this.$node)[0].setAttribute('id',0);
			event.target.setAttribute('id','schedulerPopover');
			var popover = this.$node.querySelector('#lyteSchedulerHiddenEvent');
			popover.setData('ltPropPlacement','bottom');	
			popover.setData('ltPropType','callout');
			popover.setData('ltPropShow',true);
			var poptitle = $L('.lyteSchedulerMoreEventsPopTitleMonthVal',popover.component.actualModalDiv);
			date =  date.getDObj();
			var popDay = $L('.lyteSchedulerMoreEventsPopTitleDayVal',popover.component.actualModalDiv);
			this.setDisplayDate(poptitle[0],date,true,true);
			popDay[0].innerHTML = '';
			popDay[0].appendChild(document.createTextNode(_lyteUiUtils.i18n(this.data.days[date.getDay()])));
			if(this.getMethods('openHiddenEvent')){
				this.executeMethod('openHiddenEvent',event.target);
			}
		},
		onDateClick : function(event,item){
			if(event.type == 'keydown'){
				if(event.keyCode && event.keyCode !== 13){
					return;
				}
			}
			if(this.getMethods('onDateClick')){
				this.executeMethod('onDateClick',item);
			}
		},
	},
	methods : {
		onSchedulerNavToday : function(event,startDate,endDate,component,istoday){
			if(istoday){
				this.$node.today();
				$L('#calendarPopover',this.$node)[0].setData('ltPropShow',false);
			}
		},
		eventRender : function(event_div){
			if(this.getMethods('afterEventRender')){
				this.executeMethod('afterEventRender',event_div,this.$node);
			}
		},
		onUserSearchClose : function(event){
			var search = $L('.lyteSchedulerFirstColHeader',this.$node)[0];
			if(event.target === search || search.contains(event.target)){
				return false;
			}else{
				return true;
			}

		},
		boxUnchecked : function(input, component, event, useraction){
			var arr = this.getData('checkboxArr');
			var val = component.getData('ltPropVal');
			var index =  arr.indexOf(val);
			if(index > -1){
				arr.splice( index, 1 );
			}
			this.setData('checkboxArr', arr);
		},
		boxChecked : function(input, component, event, useraction){
			var arr = this.getData('checkboxArr');
			var val = component.getData('ltPropVal');
			arr.push(val);
			this.setData('checkboxArr', arr);
		},
		weekSelected : function(event,week){
			if(this.getData('ltPropSchedulerView') == 'week'){
				$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',false)
				var popover = $L('#calendarPopover')[0];
				this._navigated =  true;
				var date = $L.moment(week,'DD-MM-YYYY');
				this.callCurrentView(date.getDObj(),false,this.getData('ltPropWeekStart'));
				this.setData('selectionType','');
				this.setData('selectionType','week');
				popover.setData('ltPropShow',false);				
				if(this.getMethods('onCalendarNav')){
					this.executeMethod('onCalendarNav',date);
				}
			}
		},
		monthSelected : function(event,month,cal){
			if(this.getData('ltPropSchedulerView') == 'month'){
				$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',false)
				var popover = $L('#calendarPopover')[0];
				popover.setData('ltPropShow',false);
				this._navigated =  true;
				var date = $L.moment('01-'+month+'-'+cal.getData('viewDate').getFullYear(),'DD-MM-YYYY');
				this.callCurrentView(date.getDObj(),false,this.getData('ltPropWeekStart'));
				this.setData('selectionType','');
				this.setData('selectionType','month');
				// popover.setData('ltPropShow',false);
				if(this.getMethods('onCalendarNav')){
					this.executeMethod('onCalendarNav',date);
				}
			}
		},
		dateselect : function(event,date,component){
			
			$L('.schedulerToday',this.$node)[0].setData('ltPropDisabled',false);
			var originElm = $L('.lyteSchNavigatorCalOpened',this.$node);
			var date_obj =  $L.moment(date,'DD-MM-YYYY').getDObj();
			var popover = $L('#calendarPopover')[0];
			popover.setData('ltPropShow',false);
			this._navigated =  true;
			var start_day;
			
			if(this.getData('ltPropSchedulerView') == 'week'){
				if(originElm.hasClass('lyteSchedulerStartDate')){
					start_day = date_obj.getDay();
				}else{
					start_day = date_obj.getDay() + 1;
				}
				var dayLabel = this.getData('ltPropLabel');
				var split = dayLabel.slice(start_day);
				dayLabel = split.concat( dayLabel.slice(0,start_day));
				this.setData('label',dayLabel);
				this.callCurrentView($L.moment(date,'DD-MM-YYYY').getDObj(),false,start_day);
			}else{
				this.ResetTimeLine();
				this.callCurrentView($L.moment(date,'DD-MM-YYYY').getDObj());
			}
			if(this.getMethods('onCalendarNav')){
				this.executeMethod('onCalendarNav',$L.moment(date,'DD-MM-YYYY'));
			}
		},
		menuonclick : function( value , event , element , menuOriginElem , clickedItemAndSubmenu_detail){
			var view = this.getData('ltPropSchedulerView');
			var isMultiView = this.getData('ltPropMultiUserView');
			var time;
			if(!isMultiView && view !== 'month' && !menuOriginElem.classList.contains('lyteSchedulerAllDayEvent')){
				var table = $L('.lyteSchedulerViewMainTable tbody',this.$node)[0];
				var tr = $L('.lyteSchedulerViewMainTable tbody .lyteSchedulerTimeLineEvent',this.$node);
				var AllDay_tr = 0;
				if(view == 'day'){
					AllDay_tr = $L('.lyteSchedulerAllDayEvent',this.$node)[0].offsetHeight;
				}
				
				var current_tr = (event.target.closest('lyte-menu-body').getBoundingClientRect().top - (table.getBoundingClientRect().top + AllDay_tr)) / tr[0].offsetHeight;
				if(current_tr >= 0){
					time = tr[parseInt(current_tr)].dataset.time;
				}else{
					time = undefined;
				}
			}else if(isMultiView && view == 'day'){
				if(menuOriginElem.classList.contains('lyteSchedulerTimeLineEvent')){
					if(this.getData('ltPropUserBasedView')){
						time = menuOriginElem.parentElement.dataset.time;
					}else{
						time = menuOriginElem.querySelector('.lyteSchedulerMultiUserViewEventElem').dataset.time;
					}
				}
			}
			var date = this.findDateonMenuClick(menuOriginElem,view);
			if(this.getMethods('onMenuClick')){
				this.executeMethod('onMenuClick',date,value , event , element , menuOriginElem , clickedItemAndSubmenu_detail,time);
			}
		},
		menuonbeforeopen : function( menu , event , originElem ){
			var event_tag = event.target;
			var flag = true;
			var view = this.getData('ltPropSchedulerView');
			while(event_tag && event_tag.tagName !== 'TR'){
				if(event_tag.tagName === "LYTE-SCHEDULER-EVENT-TAG"){
					flag = false;
					break;
				}
				event_tag = event_tag.parentElement;
				if(!event_tag){
					return false;
				}
			}
			if(event.which == 1 && !event.target.classList.contains("lyteSchedulerEventMoreBtn") && !event.target.classList.contains("lyteSchedulerDayNumber") && flag){
				var date = this.findDateonMenuClick(originElem,view);
				if(this.getData('ltPropMultiUserView')  && view !== 'month' ){
					var userid;
					if(this.getData('ltPropUserBasedView')){
						userid = event.target.dataset.userid;
					}else{
						userid = event.target.closest('tr').dataset.userid;
					}
					var userData = $u.findWhere(this.getData('ltPropSchedulerUser'),{'id':userid});
					userData = structuredClone(userData);
				}
				if(this.getMethods('onBeforeMenuOpen')){
					this.executeMethod('onBeforeMenuOpen',date,event,this.findTimeonMenuClick(event,this.getData('ltPropMultiUserView'),view),userData);
				}
			}else{
				return false;
			}
		},
		menuonopen : function( menu , event , originElem ){
		
			var menu_width =  menu.component.childComp.getBoundingClientRect().width;
			var menu_height =  menu.component.childComp.getBoundingClientRect().height;
			var Leftboundaries =  window.innerWidth;
			var Topboundaries = window.innerHeight;
			if(Topboundaries < event.clientY + menu_height){
				menu.component.childComp.style.top = Topboundaries + document.documentElement.scrollTop - menu_height  + 'px';
			}else{
				menu.component.childComp.style.top = event.clientY + document.documentElement.scrollTop + 'px';
			}			
			if(_lyteUiUtils.getRTL()){
				menu.component.childComp.style.right = 'unset' ;	
			}
			if(Leftboundaries < event.clientX + menu_width ){
				menu.component.childComp.style.left = Leftboundaries - menu_width + 'px';
			}else{
				menu.component.childComp.style.left = event.clientX + 'px';
			}
			var view = this.getData('ltPropSchedulerView');
			var date = this.findDateonMenuClick(originElem,view);
			if(this.getData('ltPropMultiUserView')  && view !== 'month' ){
				var userid = originElem.closest('tr').dataset.userid;
				var userData = $u.findWhere(this.getData('ltPropSchedulerUser'),{'id':userid});
				userData = $u.clone(userData);
			}
			if(this.getMethods('onMenuOpen')){
				this.executeMethod('onMenuOpen',date,event,userData);
			}
		},
		menuonbeforeclose : function ( menu , event  ) {
			if(this.getMethods('onBeforeMenuClose')){
				this.executeMethod('onBeforeMenuClose', menu , event );
			}
		},
		menuonclose: function( menu , event  ){
			if(this.getMethods('onMenuClose')){
				this.executeMethod('onMenuClose',menu , event);
			}
		},		
		ChangeSchedulerView: function(value){
			var previousView = this.getData('ltPropSchedulerView');
			this._fromButtonSwitch = true;
			this.findDayViewPosition(previousView,value)			
			this.setData('ltPropDateArray',[]);
			this.setData('ltPropDateObj',{});
			this.setData('ltPropSchedulerView',value);
		},
		closeschedulerpopover : function(event,element){
			var targetElem = this.$node.querySelector('#schedulerPopover');
			targetElem.setAttribute('id','');
			this.getMethods('onHiddenEventPopoverHide') && this.executeMethod('onHiddenEventPopoverHide',element);
		},
		closeCalender : function(event,popover){
			$L(popover.getData('ltPropOriginElem'),this.$node).removeClass('lyteSchNavigatorCalOpened');
		},
		openUserSearch : function(event,search){
			var popover = $L('#usersreachPopover',this.$node);
			search.closest('.lyteSchedulerFirstColHeader').classList.add('lyteSchedulerUserSearchActive');
			if(!popover[0].getData('ltPropShow')){
				popover[0].ltProp('show',true);
			}
		},
		closeUserPopover : function(){
			$L('.lyteSchedulerUserSearchActive',this.$node)[0].classList.remove('lyteSchedulerUserSearchActive');
		},
		onPopoverShow : function(element){
			this.getMethods('onHiddenEventPopoverShow') && this.executeMethod('onHiddenEventPopoverShow',element);
		}
	}
});
if(!_lyteUiUtils.registeredCustomElements['lyte-scheduler-icon']){
	_lyteUiUtils.registeredCustomElements['lyte-scheduler-icon'] = true;
	Lyte.createCustomElement("lyte-scheduler-icon", {
		static:{

		},
        connectedCallback: function () {
			this.setAttribute('id','SchedulerNavIcon_'+_lyteSchedulerNavId++);
		}
	})

}
if(!_lyteUiUtils.registeredCustomElements['lyte-scheduler-event-dummy-tag']){
	_lyteUiUtils.registeredCustomElements['lyte-scheduler-event-dummy-tag'] = true;
	Lyte.createCustomElement("lyte-scheduler-event-dummy-tag",{
		static:{

		},
        connectedCallback: function () {
			this.addEventListener('focus',function(event){
				var focusedTag = event.target;
				focusedTag.classList.add('lyteSchedulerEventDummyTagFocus');
				var schedulerComp = focusedTag.closest('lyte-scheduler');
				var orginalEvent = $L('#u'+focusedTag.dataset.dummyid,schedulerComp)[0];
				if(orginalEvent){
					var event_text = orginalEvent.querySelector('.lyteSchedulerTimelineEvent');
					var text = document.createTextNode(event_text.innerText);
					var cs = window.getComputedStyle(orginalEvent);
					focusedTag.style.backgroundColor = cs.backgroundColor;
					focusedTag.style.color = cs.color;
					focusedTag.style.borderColor = cs.borderColor;
					focusedTag.appendChild(text);
				}
			})
			this.addEventListener('focusout',function(event){
				event.target.classList.remove('lyteSchedulerEventDummyTagFocus');
				event.target.innerHTML = '';
			})

		}
	});
}

Lyte.Component.registerHelper("lyteUiSchedulerhiddenEvent",function( hiddenObj , date , elem , user, group,time,view){
	if(view == 'day'){
		if(hiddenObj[date]){
			hiddenObj = hiddenObj[date];
			if(hiddenObj[user]){
				hiddenObj = hiddenObj[user];
			}
		}
	}
	var hiddenBtn =  $L(elem).closest('.lyteSchedulerEventMoreBtn')[0];
	if( hiddenObj && hiddenObj[time] ){
		if(hiddenBtn){
			hiddenBtn.classList.remove('lyteSchedulerEventMoreBtnHide');
		}
		return hiddenObj[time].length +' '+ _lyteUiUtils.i18n('more','note');
	}else if( hiddenObj && hiddenObj[date] ){
		var events = hiddenObj[date];
		if(user){
			events = events[user];
		}
		if(events && group){
			if(!events[group]){
				return ;
			}
			var hiddenBtn =  $L(elem).closest('.lyteSchedulerEventMoreBtnHide')[0];
			if(hiddenBtn){
				hiddenBtn.classList.remove('lyteSchedulerEventMoreBtnHide');
			}
			return events[group].length +' '+ _lyteUiUtils.i18n('more','note');
		}else if(events  && (events.length || Object.keys(events).length)){
			var length = events.length || Object.keys(events).length;
			var hiddenBtn =  $L(elem).closest('.lyteSchedulerEventMoreBtnHide')[0];
			if(hiddenBtn){
				hiddenBtn.classList.remove('lyteSchedulerEventMoreBtnHide');
			}
			return length +' '+_lyteUiUtils.i18n('more','note');
		}	
	}else{
		if(hiddenBtn){ 
			hiddenBtn.classList.add('lyteSchedulerEventMoreBtnHide');
		}
	}	
});
Lyte.Component.registerHelper("lyteUiSchedulerEvent",function( event ){
	
	if(event && Object.keys(event).length && !event.dummy_id){
		return true;
	}
	return false;
});
Lyte.Component.registerHelper('lyteUiSchedulerLabelFormat',function(format,date){
	return date.i18N(format); 
});
Lyte.Component.registerHelper('lyteUiSchedulerisSearch',function(array,userid){
	if( !array.length || array.includes(userid)){
		return true;
	}else{
		return false;
	}

})
Lyte.Component.registerHelper('lyteUiSchedulerEventCount',function(event,user,hiddenObj,startDateOfView){
	var count = 0;	
	if(Array.isArray(event)){
		event.forEach(function(date){
			if(!date.val){
				return;
			}
			if(date.events && date.events[user.id] ){
				count += date.events[user.id].count;
				
			}
			var formatedDate = date.val.format('DD-MM-YYYY');
			if(hiddenObj && hiddenObj[formatedDate] && hiddenObj[formatedDate][user.id]){
				count += hiddenObj[formatedDate][user.id].count;
			}
		});
	}else{
		if(!event || !Object.keys(event).length){
			return 0;
		}
		if(event[user.id]){
			count += event[user.id].count ;
		}
		if(event.allDay && event.allDay[user.id]){
			count += event.allDay[user.id].count ;
		}
		if(hiddenObj.allDay && hiddenObj.allDay[startDateOfView] && hiddenObj.allDay[startDateOfView][user.id] ){
			count += hiddenObj.allDay[startDateOfView][user.id].count ;
		}
	}	
	return count;
})
Lyte.Component.registerHelper('lyteUiSchedulerAllDayCount',function(eventData,hiddenObj,startDateOfView,view,isMultiView){
	var count = 0;
	if(eventData ){
		if(view == 'day' ){
			if(isMultiView && eventData.allDay && eventData.allDay[startDateOfView]){
				var events = eventData.allDay[startDateOfView];
				var keys = Object.keys(events);
				var eventArray = [];
				keys.forEach(function(user){
					eventArray = eventArray.concat(events[user]);
					if(hiddenObj && hiddenObj.allDay && hiddenObj.allDay[startDateOfView] && hiddenObj.allDay[startDateOfView][user]){
						eventArray = eventArray.concat( hiddenObj.allDay[startDateOfView][user] )
					}
				})
			}else if(eventData.allDay && eventData.allDay[startDateOfView]){
				var events = eventData.allDay[startDateOfView];
				if(hiddenObj.allDay && hiddenObj.allDay[startDateOfView] && Array.isArray(events)){
					events = events.concat(hiddenObj.allDay[startDateOfView]);
				}	
				var eventArray = events;			
			}
			for(var Iindex = 0;events && Iindex < eventArray.length;Iindex++){
				if(eventArray[Iindex] && Object.keys(eventArray[Iindex]).length && !eventArray[Iindex].dummy_id && !eventArray[Iindex].overdue){
					count++;
				}
			}
		}else if(!isMultiView && view == 'week' && eventData.allDay){			
			for(var index = 0; index < 7; index++){
				var events = eventData.allDay[startDateOfView];
				for(var Iindex = 0;events && Iindex < events.length;Iindex++){
					if(events[Iindex] && Object.keys(events[Iindex]).length && !events[Iindex].dummy_id && !events[Iindex].overdue){
						count++;
					}
				}
				if(hiddenObj && hiddenObj.allDay && hiddenObj.allDay[startDateOfView]){
					count += hiddenObj.allDay[startDateOfView].length;
				}
				startDateOfView = $L.moment(startDateOfView,'DD-MM-YYYY').add(1,'date').format('DD-MM-YYYY');
			}
		}
	}
	return count;
});
Lyte.Component.registerHelper('lyteUiSchedulergetUserData',function(userid,userData){
	var User = $u.findWhere(userData,{'id':userid});
	return User; 
});
Lyte.Component.registerHelper('lyteSchedulerUiFindWeek',function(date,view){
	var now;
	if(!date){
		return;
	}
	if(typeof date == 'string'){
		now  = $L.moment(date,'DD-MM-YYYY');
	}else{
		now = date;
	}
	now = now.getDObj();
	const onejan = new Date(now.getFullYear(), 0, 1);
	var week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1  ) / 7);
	if(week == 53){
		var lastdate = new Date( now.getFullYear() , 11 , 31 );
		if(lastdate.getDay() != 6){
			week = 1;
		}			
	}
	if(view && view == 'day'){
		return _lyteUiUtils.i18n('week')+ ' ' +week;
	}
	return _lyteUiUtils.i18n('short.week') + ' ' +week;
});
Lyte.Component.registerHelper('lyteUiSchedulerfindUser',function(userArray,userid){
	var user = $u.findWhere(userArray,{id: userid});
	return user;
})
Lyte.Component.registerHelper('lyteUiSchedulerIsResize',function(week,event,format,position){
	var lastdate;
	var firstDate;
	if(!event.editable){
		return false;
	}
	lastdate = week[week.length - 1].val;
	firstDate = week[0].val;
	if(position == 'end'){
		var currDate = $L.moment(event.end,format);
	}else{
		var currDate = $L.moment(event.start,format);
	}
	if(lastdate.fromNow(currDate).past && !firstDate.fromNow(currDate).past){
		return true;
	}
	return false;
})
Lyte.Component.registerHelper('lyteUiSchedulerGetProcessedData',function(processedData,date,userid){
	if( processedData && processedData[date] && processedData[date][userid] ){
		return processedData[date][userid];
	}
	return [];
})
