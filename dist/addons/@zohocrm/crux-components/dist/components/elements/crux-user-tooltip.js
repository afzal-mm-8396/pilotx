//$Id$
/**
 * This component is rendered when a user hovers over crux-user-component. It displays the users information in a popover. It can be used without the crux-user-component as well.
 * @component crux-user-tooltip
 * @author anuja.manoharan
 * @version 1.0.0
 */
Lyte.Component.register("crux-user-tooltip", {
_template:"<template tag-name=\"crux-user-tooltip\"> <lyte-popover lt-prop-origin-elem=\"{{originElem}}\" lt-prop-wrapper-class=\"{{cxPropWrapperClass}} cxInfoPopover\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\" lt-prop-scrollable=\"false\" lt-prop-type=\"{{toolTipType}}\" on-before-show=\"{{method('showPopover')}}\" lt-prop-duration=\"0\" lt-prop-show=\"{{show}}\" lt-prop-max-width=\"500px\" lt-prop-content-padding=\"15px 10px\" lt-prop-placement=\"{{placement}}\"> <template is=\"yield\" yield-name=\"popover\"> <lyte-popover-content class=\"cxUserbcpopup\" onclick=\"{{action('popoverbodyclicked')}}\"> <div class=\"crm-font-regular\"> <template is=\"if\" value=\"{{ifEquals(userData.status,'deleted')}}\"><template case=\"true\"><div class=\"cxRedCol cxUserbcpopupContent \">{{cruxGetI18n('crm.user.deleted')}}</div></template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(userData.status,'closed')}}\"><template case=\"true\"><div class=\"cxRedCol cxUserbcpopupContent \">{{cruxGetI18n('crm.account.closed')}}</div></template></template></template></template> <div class=\"cxUpSpace\"> <div class=\" cxUpSizeWrap cxVat\"><img class=\"cxUpSize cxVam\" src=\"{{getCruxUsrImgUrlByZuid(userData.zuid)}}\"></div> <div class=\"cxbcUserNameWrap cxVam\"> <div class=\"{{if(clientUser,'','cxbcUserNamePointer')}} cxbcUserName\" data-zcqa=\"cxUserName\" onclick=\"{{action('openUserPage')}}\">{{userData.full_name}}</div> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(userData.type__s,'==',&quot;Client Portal User&quot;),'&amp;&amp;',expHandlers(userData.status,'==',&quot;disabled&quot;)),'&amp;&amp;',cxPropDisplayPortalInfo)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{userData.zuid}}\"><template case=\"true\"><span class=\"cxUserTooltipRedBadge\">Disabled</span></template><template case=\"false\"><span class=\"cxUserTooltipRedBadge\">Deleted</span></template></template> </template></template> <template is=\"if\" value=\"{{cruxAnd(userData.role,userData.profile,cruxOr(negate(portalUser,cruxAnd(portalUser,ifNotEquals(userData.type__s,'Regular User',cxPropDisplayPortalInfo)))))}}\"><template case=\"true\"><div class=\" cxUpSpaceContent\" data-zcqa=\"cxUserProf\"> <span class=\"{{if(ifEquals(userData.type__s,'Client Portal User'),'cxUserTooltipClientPortalUserLabel','')}}\">{{userData.role.name}}</span>, {{userData.profile.name}} </div></template></template> </div> </div> <div class=\"cxUserbcInfo \"> <template is=\"if\" value=\"{{userData.email}}\"><template case=\"true\"><div class=\"cxUserbcInfoItem \"> <div class=\"cxEmailIconWrap cxAlignCenter\"><span class=\"cxEmailIcon\"></span></div> <span class=\"cxUserbcInfoContent\" data-zcqa=\"cxUserMail\"> <a href=\"mailto:{{userData.email}}\">{{userData.email}}</a> </span> </div></template></template> <template is=\"if\" value=\"{{userData.phone}}\"><template case=\"true\"><div class=\"cxPhoneIconWrapParent \"> <div class=\"cxPhoneIconWrap cxAlignCenter cxVam\"><span class=\"cxPhoneIcon\"></span></div> <span class=\"cxPhoneIconContent cxVam\">{{userData.phone}}</span> </div></template></template> <template is=\"if\" value=\"{{userData.mobile}}\"><template case=\"true\"> <div class=\"cxMobileIconWrapParent\"> <div class=\"cxMobileIconWrap cxAlignCenter\"> <span class=\"cxMobileIcon cxVam\"></span> </div> <span class=\"cxPhoneIconContent cxVam\">{{userData.mobile}}</span> </div> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(isChatEnabled,'&amp;&amp;',expHandlers(isCurrentUser,'!')),'&amp;&amp;',userData.zuid),'&amp;&amp;',expHandlers(portalUser,'!'))}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-user-tooltip.html\",\"Feb Default Changes\")}} <div class=\"cxDashBorder\"></div> <div id=\"actionLayer\"> <div class=\"cxBcActionIcons\" lt-prop-title=\"{{cruxGetI18n('crm.start.chat')}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\" onclick=\"{{action('chat')}}\" data-zcqa=\"cxUserChat\"> <span class=\"cxBcChatIcon\"></span> </div> <div class=\"cxBcActionIcons\" lt-prop-title=\"{{cruxGetI18n('crm.start.call')}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\" onclick=\"{{action('call')}}\" data-zcqa=\"cxUserAudioCall\"> <span class=\"cxBcCallIcon\"></span> </div> <div class=\"cxBcActionIcons\" lt-prop-title=\"{{cruxGetI18n('crm.start.video.call')}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;top&quot;}\" onclick=\"{{action('videoCall')}}\" data-zcqa=\"cxUserVideoCall\"> <span class=\"cxVideoCallIcon\"></span> </div> </div> </template></template> </div> </lyte-popover-content> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3,1,0]},{"type":"attr","position":[1,1,3,3,1]},{"type":"text","position":[1,1,3,3,1,0]},{"type":"attr","position":[1,1,3,3,3]},{"type":"if","position":[1,1,3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3,3,5]},{"type":"if","position":[1,1,3,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3]}]}},"default":{}},{"type":"attr","position":[1,1,5,1]},{"type":"if","position":[1,1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,3,1]},{"type":"text","position":[0,3,1,0]}]}},"default":{}},{"type":"attr","position":[1,1,5,3]},{"type":"if","position":[1,1,5,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,1,5,5]},{"type":"if","position":[1,1,5,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]}},"default":{}},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"attr","position":[5,5]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["originelemRef","userId","usermetaInfo","cxPropUserDetailViewPath","cxPropDisplayPortalInfo","cxPropWrapperClass","originElem","toolTipType","show","userData","user_types","isCurrentUser","isChatEnabled","portalUser"],
_observedAttributesType :["string","string","object","string","boolean","string","string","string","boolean","object","string","boolean","boolean","boolean"],
 //No I18n
	data : function(){
		return {
			originelemRef: Lyte.attr('string'),  //NO I18N
			userId: Lyte.attr("string"), //No I18n
			usermetaInfo: Lyte.attr("object",{"default" :{}}), //No I18n
			cxPropUserDetailViewPath : Lyte.attr("string", {default : (typeof Crm != "undefined" && Crm.getCrmBasePath() && Crm.getCrmBasePath().indexOf("crm") != -1) ? Crm.getCrmBasePath()+"/settings/users/" : ""}),
			cxPropDisplayPortalInfo : Lyte.attr("boolean", {default : true}),
			cxPropWrapperClass : Lyte.attr('string'),  //NO I18N
			originElem: Lyte.attr('string'),  //NO I18N
			toolTipType: Lyte.attr('string'),  //NO I18N
			show: Lyte.attr('boolean', { default: false }),  //NO I18N
			userData: Lyte.attr("object"), //No I18n
			user_types: Lyte.attr('string', { default: "Regular User,Client Portal User" }),  //NO I18N
			isCurrentUser: Lyte.attr('boolean', { default: false }),  //NO I18N

			/**
			 * If the user has chat enabled, the chat icon will be displayed
			 * @internal
			 * @componentProperty { boolean } isChatEnabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			isChatEnabled: Lyte.attr('boolean', { default: false }),  //NO I18N
			portalUser : Lyte.attr("boolean", {default : typeof Crm != "undefined" ? Crm.userDetails.CLIENT_ACCOUNT : false})
		}
	},
	methods: {
		showPopover : function(){
			var userid = this.data.userId;
			var record = store.peekRecord("user", userid);
			if(record === undefined || !record.email){
				let user_type = this.data.user_types;
				if(typeof cruxAssets !== "undefined" && cruxAssets.cxUserInfoTypes){
					user_type = cruxAssets.cxUserInfoTypes;
				}
				store.findRecord("user", userid, {type__s : user_type}, false, true, {tempApiVersion : "V7"}).then(function(response){
					if(!response || (response && !Object.keys(response).length)){
						store.findRecord("user", userid, {type__s : user_type}, false, true).then(function(resp){
							if(!resp || (resp && !Object.keys(resp).length)){
								var usrobj = this.data.usermetaInfo;
								if(usrobj && usrobj.name){
									usrobj.full_name = usrobj.name;
									delete usrobj.name;
									usrobj.id = userid;
									store.pushPayload("user", usrobj);
								}
							}
							else{
								resp[0].client_user = true;
							}
							this.setData("show", true);
						}.bind(this))
					}else{
						this.setData("show", true);
					}
				}.bind(this))
				this.setData("show", false);
				return false;
			}
			else{
				this.setData({isChatEnabled : typeof crmConstants != "undefined" ? crmConstants.isCliqEnabled : false, isCurrentUser : typeof Crm != "undefined" && (userid == Crm.userDetails.USER_ID) ? true : false,
					userData : record, clientUser : record.client_user});
			}
		}
	},

	actions: {
		openUserPage: function(){
			if(this.data.clientuser || (typeof Crm != "undefined" && Crm.userDetails.CLIENT_ACCOUNT)){
				return;
			}
			this.data.cxPropUserDetailViewPath ? window.open(this.data.cxPropUserDetailViewPath+this.data.userId, "_blank") : "";
		},

		chat: function(){
			WebMessanger.chat(this.getData('userData').zuid);  //NO I18N
		},

		call: function(){
			WebMessanger.startAudioCall(this.getData('userData').zuid);  //NO I18N
		},

		videoCall: function(){
			WebMessanger.startVideoCall(this.getData('userData').zuid);  //NO I18N
		},
		popoverbodyclicked : function(event){
			if(event && !event.target.closest("#actionLayer")) { // eslint-disable-line @zoho/webperf/directly-select-with-id
				event.stopPropagation();
			}
		}
	},

	show: function(elem, placement){
		clearTimeout(this.hideTimeout);
		!elem.isSameNode(this.data.originelemRef) ? this.setData("show", false) : "";
		this.setOriginElem(elem);
		this.setData("originElem", ".userBcOrigin");
		if(placement){
			var xPos = elem.getBoundingClientRect().x;
			var directions = window._lyteUiUtils && window._lyteUiUtils.getRTL() ? ["right", "left"] : ["left", "right"];
			var placement = directions[0];
			if(xPos-350 <=0 || xPos+elem.offsetWidth+350<window.innerWidth){
				placement = directions[1];
			}
			this.setData({placement : placement, toolTipType : "callout"});
		}
		else{
			this.setData({placement : undefined, toolTipType : "box"});
		}
		this.hideTimeout = setTimeout(function(){
			this.setData("show", true);
			if(!this.data.listenersAdded){
				var eventTarget = document.querySelector(".cxInfoPopover .lytePopover");
				eventTarget.addEventListener("mouseleave", this._leaveFunc);
				eventTarget.addEventListener("mouseenter", this._enterFunc);
				this.setData("listenersAdded", true);
			}
		}.bind(this), 300);
	},

	hide: function(){
		clearTimeout(this.hideTimeout);
		this.hideTimeout = setTimeout(function(){
			this.removeOriginElem();
			this.setData("show", false);
		}.bind(this), 300);
	},

	setOriginElem: function(elemRef){
		this.removeOriginElem();
		elemRef.classList.add('userBcOrigin');  //NO I18N
		this.setData('originElemRef', elemRef);  //NO I18N
	},

	removeOriginElem: function(){
		var elems = document.getElementsByClassName('userBcOrigin');  //NO I18N
		var len = elems.length;
		for(var i = 0; i < len; i ++){
			elems[0].classList.remove('userBcOrigin');  //NO I18N
		}
		this.setData('originElemRef', undefined);  //NO I18N
	},

	_leaveFunc: function(){
		var comp = document.getElementsByTagName('crux-user-tooltip')[0].component;
		comp.setData('inPopover', false);  //NO I18N
		comp.hide();
	},
	
	_enterFunc: function(){
		var comp = document.getElementsByTagName('crux-user-tooltip')[0].component;
		clearTimeout(comp.hideTimeout);  //NO I18N
		comp.setData('inPopover', true);  //NO I18N
		comp.setData('show', true);  //NO I18N
	},
	didDestroy : function(){
		clearTimeout(this.hideTimeout);
	}
});


Lyte.Component.registerHelper("getCruxUsrImgUrlByZuid", function(zuid){//NO I18N
	if(typeof RebrandLinkUtil != "undefined"){
		return "//" + RebrandLinkUtil.getProperty("CONTACTS_URL") + "/file?ID=" + zuid + "&fs=thumb";		
	}
	return "";
});

/**
 * @syntax nonYielded
 * <crux-user-tooltip></crux-user-tooltip>
 */
