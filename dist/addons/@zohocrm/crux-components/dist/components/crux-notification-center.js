Lyte.Component.register("crux-notification-center", {
_template:"<template tag-name=\"crux-notification-center\"> <lyte-beta-modal class=\"{{cxPropClass}}\" lt-prop-wrapper-class=\"cxNotifyModalWrapper\" lt-prop-transition=\"{&quot;animation&quot;:&quot;fadeIn&quot;}\" lt-prop-show=\"{{lbind(cxPropShow)}}\" lt-prop-offset=\"{{cxPropOffset}}\" lt-prop-max-height=\"{{cxPropMaxHeight}}\" lt-prop-freeze=\"{{cxPropFreeze}}\" lt-prop-show-close-button=\"{{ShowCloseButton}}\" lt-prop-prevent-focus=\"{{cxPropPreventFocus}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-content class=\"cxNotifyModalContent\"> <template items=\"{{cxPropNotificationData}}\" item=\"item\" index=\"index\" is=\"for\"> <template is=\"if\" value=\"{{item.cxShow}}\"><template case=\"true\"> <div class=\"cxNotifyMsgCont cxNotifyMsgCont_{{item.cxId}} {{cxPropClass}}\"> <div class=\"cxNotifyHeader\"> <div class=\"cxFlexOne cxFlex cxAlignItemCenter\"> <template is=\"if\" value=\"{{item.cxStatus}}\"><template case=\"true\"><div class=\"cxNotifyHeaderIconWrap cxNotifyHeaderIconWrap_{{item.cxStatus}}\"> <div class=\"cxNotifyHeaderIcon cxNotifyHeaderIcon_{{item.cxStatus}}\"></div> </div></template></template> <template is=\"if\" value=\"{{item.cxHeaderUnescape}}\"><template case=\"true\"><div>{{unescape(item.cxHeader)}}</div></template><template case=\"false\"><div>{{item.cxHeader}}</div></template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(item.cxExpandable,'&amp;&amp;',item.cxExpand),'&amp;&amp;',expHandlers(item.cxMinimize,'!'))}}\"><template case=\"true\"><div class=\"cxNotifyActionIconWrap\" onclick=\"{{action('expand',item,event)}}\"> <span class=\"cxNotifyExpandIcon\"></span> </div></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(item.cxExpandable,'&amp;&amp;',expHandlers(item.cxExpand,'!')),'&amp;&amp;',item.cxMinimize)}}\"><template case=\"true\"><div class=\"cxNotifyActionIconWrap\" onclick=\"{{action('minimize',item,event)}}\"> <span class=\"cxNotifyMinimizeIcon\"></span> </div></template></template></template></template> <template is=\"if\" value=\"{{item.cxClose}}\"><template case=\"true\"><div class=\"cxNotifyActionIconWrap\" onclick=\"{{action('close',item,event)}}\"> <span class=\"cxNotifyCloseIcon\"></span> </div></template></template> </div> <div class=\"cxNotifyContent {{if(item.cxMinimize,'cxNotifyContentMinimize','cxNotifyContentExpand')}}\"> <template is=\"if\" value=\"{{item.cxUnescape}}\"><template case=\"true\"><span> {{unescape(item.cxContent)}} </span></template><template case=\"false\"><span> {{item.cxContent}}</span></template></template> <template is=\"if\" value=\"{{item.cxMarkdown}}\"><template case=\"true\"><span>{{unescape(if(item.cxMarkdown,markdown(item.cxMarkdownContent)))}}</span></template></template> <template is=\"if\" value=\"{{item.cxComponentName}}\"><template case=\"true\"><template is=\"component\" class=\"{{item.cxClass}}\" id=\"{{item.cxId}}\" component-name=\"{{item.cxComponentName}}\" notification-data=\"{{item.cxComponentData}}\"></template></template></template> <template is=\"if\" value=\"{{item.cxButton}}\"><template case=\"true\"><div class=\"cxNotifyBtnCont\"> <template items=\"{{item.cxPropButton}}\" item=\"buttonItem\" index=\"buttonIndex\" is=\"for\"> <lyte-button lt-prop-class=\"{{buttonItem.cxButtonClass}}\" lt-prop-size=\"{{buttonItem.cxButtonSize}}\" lt-prop-type=\"{{buttonItem.cxButtonType}}\" lt-prop-appearance=\"{{buttonItem.cxButtonAppearance}}\" onclick=\"{{action('handleButtonClick',buttonItem,buttonIndex)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{buttonItem.cxButtonText}} </template> </lyte-button> </template> </div></template></template> </div> </div> </template></template> </template> </lyte-modal-content> </template> </lyte-beta-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"component","position":[0],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[1,3,7]},{"type":"if","position":[1,3,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropNotificationData","cxPropShow","cxPropOffset","cxPropMaxHeight","cxPropFreeze","ShowCloseButton","cxPropPreventFocus"],
_observedAttributesType :["array","boolean","object","string","boolean","boolean","boolean"],

	data : function(){
		return {
			cxPropNotificationData: Lyte.attr("array", { default: [] }), // No I18n
			cxPropShow: Lyte.attr("boolean", { default: false }), // No I18n
			cxPropOffset: Lyte.attr("object", { default: { "right": "0px", "bottom": "0px" } }), // No I18n
			cxPropMaxHeight: Lyte.attr("string", { default: "90%" }), // No I18n
			cxPropFreeze: Lyte.attr("boolean", { default: false }), // No I18n
			ShowCloseButton: Lyte.attr("boolean", { default: false }), // No I18n
			cxPropPreventFocus: Lyte.attr("boolean", { default: false }), // No I18n
		};
	},

	getCruxAssetsPropertiesFn: function () {
		const cruxAssetService = Lyte.Service.getInjected('cruxAssests');
		if (typeof  cruxAssetService !== 'undefined' && cruxAssetService.getPropertiesForCruxComponents) {
			var node = this.$node;
			var props = cruxAssetService.getPropertiesForCruxComponents(node.cxProp(), node.tagName, this);
			this.setData(props);
		}
	},


	init : function(){

		// Via this function lyte-modal will receive the properties from user
		this.getCruxAssetsPropertiesFn();

		// Add Notification
		this.$node.addNotification = function (newNotifications){
			this.component.addNotifications(newNotifications);
		};

		// Remove Notification
		this.$node.removeNotification = function (notificationId) {
			this.component.removeNotifications(notificationId);
		};

		// Modify Notification
		this.$node.modifyNotification = function (updatedNotification) {
			this.component.updateNotifications(updatedNotification);
		};

		// show Notification
		this.$node.showNotification = function () {
			this.setData("cxPropShow", true);
		};
	},
	actions: {
		expand: async function(notification,event) {
			await this.setContentMaxHeight(notification,event);
			this.expandNotification(notification);
		},
		minimize:async function (notification,event) {
			await this.setContentMaxHeight(notification,event);
			this.minimizeNotification(notification);
		},
		close: function (notification) {
			this.closeNotification(notification);
		},

		handleButtonClick(buttonItem, buttonIndex) {
			if (buttonItem && typeof buttonItem.cxButtonAction === "function") {
				buttonItem.cxButtonAction(buttonItem, buttonIndex);
			}
		},
	},

	methods: {
		// methods are here
	},

	setContentMaxHeight: function (notification,event){
		return new Promise((resolve)=>{
			if(!notification.heightCalculated){
				const content = event.target.closest('.cxNotifyMsgCont').querySelector('.cxNotifyContent');
				notification.heightCalculated = true
				const contentHeight = content.scrollHeight;
				content.style.maxHeight = `${contentHeight}px`;
				setTimeout(() => {
					resolve(true);				
				}, 0);
			}else{
				resolve(true);
			}
		});
	},
	handleNotificationTimeout: function (notification) {
		if (notification && notification.cxDuration && notification.cxShow === true) {
			const timeoutDuration = notification.cxDuration;
			setTimeout(() => {
				this.performNotificationAction(notification, "notificationDuration", "onBeforeClose", "onClose");
			}, timeoutDuration);
		}
	},
	minimizeNotifications: function() {
		const allNotifications = this.getData('cxPropNotificationData');
		const modalContent = this.$node.querySelector('lyte-beta-modal').component.childComp.querySelector('lyte-modal-content');
		for (let i = allNotifications.length - 1; i >= 0 && modalContent.scrollHeight > modalContent.clientHeight; i--){
			if (allNotifications[i] && !allNotifications[i].cxMinimize) {
				Lyte.objectUtils(allNotifications[i], 'add', 'cxExpand', false);
				Lyte.objectUtils(allNotifications[i], 'add', 'cxMinimize', true);
			}
		}
	},


	addNotifications:function(newNotifications){
		var defaultNotificationProps = { cxShow: true, cxExpand: true, cxMinimize: false};
		var preparedNotifications = newNotifications.map(obj => {
			return Object.assign({}, defaultNotificationProps, obj);
		}); //Always use this "preparedNotifications" because of all the object's referance are changed here.

		var callbackResponse;
		var firstNotification = preparedNotifications[0];

		if (firstNotification && firstNotification.cxOnBeforeShow && typeof firstNotification.cxOnBeforeShow === 'function') {
			callbackResponse = firstNotification.cxOnBeforeShow();
			if (firstNotification && callbackResponse === false) {
				Lyte.objectUtils(firstNotification, 'add', 'cxShow', false);
			}
		}

		Lyte.arrayUtils(this.getData('cxPropNotificationData'), 'insertAt', 0, preparedNotifications);
		
		this.checkActiveNotifications();
		if (firstNotification.cxShow) {
			this.alignModalElement(firstNotification);
		}

	},
	removeNotifications: function (notificationId) {
		const removeNotificationData = this.getData('cxPropNotificationData');
		const cxId = typeof notificationId === 'object' ? notificationId.cxId : notificationId;
		const notificationIndex = removeNotificationData.cruxFindIndexOfObject('cxId', cxId);
		if (removeNotificationData && notificationIndex !== -1) {
			Lyte.arrayUtils(removeNotificationData, 'removeAt', notificationIndex);
		}
		this.checkActiveNotifications();
	},
	updateNotifications: function (updatedNotification) {
		const updateNotificationData = this.getData('cxPropNotificationData');
		const cxId = typeof updatedNotification === 'object' ? updatedNotification.cxId : updatedNotification;
		const notificationIndex = updateNotificationData.cruxFindIndexOfObject('cxId', cxId);
		if (updateNotificationData && notificationIndex !== -1) {
			const notification = updateNotificationData[notificationIndex];

			const cxShowStatus = notification.cxShow === false && updatedNotification.cxShow === true;
				Object.assign(notification, updatedNotification);
				Lyte.arrayUtils(updateNotificationData, 'replaceAt', notificationIndex, notification);
			this.handleNotificationTimeout(notification);
				
			this.checkActiveNotifications();
			if (cxShowStatus) {
				this.alignModalElement(notification);
			}
		}
	},
	expandNotification: function (notification){
		this.performNotificationAction(notification, "expand", "onBeforeExpand", "onExpand");
	},
	minimizeNotification: function (notification) {
		this.performNotificationAction(notification, "minimize", "onBeforeMinimize", "onMinimize");
	},
	closeNotification: function (notification) {
		this.performNotificationAction(notification, "close", "onBeforeClose", "onClose");
	},


	performNotificationAction: function (notification, actionType, beforeCallbackKey, afterCallbackKey) {
		let callbackResponse;
		if (notification && notification[beforeCallbackKey] && typeof notification[beforeCallbackKey] === "function") {
			callbackResponse = notification[beforeCallbackKey]();
		}

		if (notification && callbackResponse !== false) {
			switch (actionType) {
				case "expand":
					Lyte.objectUtils(notification, "add", "cxExpand", false);
					Lyte.objectUtils(notification, "add", "cxMinimize", true);
					break;
				case "minimize":
					Lyte.objectUtils(notification, "add", "cxExpand", true);
					Lyte.objectUtils(notification, "add", "cxMinimize", false);
					break;
				case "close":
					$L(`.cxNotifyMsgCont_${notification.cxId}`).addClass('cxNotifyMsgContCloseAnim');
					setTimeout(() => {
						Lyte.objectUtils(notification, "add", "cxShow", false);
						this.checkActiveNotifications();					
					}, 380);
					break;
				case "notificationDuration":
					$L(`.cxNotifyMsgCont_${notification.cxId}`).addClass('cxNotifyMsgContCloseAnim');
					setTimeout(() => {
						Lyte.objectUtils(notification, 'add', 'cxShow', false);
						if (this.getData("cxPropShow")) {
							this.checkActiveNotifications();
						}
					}, 380);
					break;
			}

			if (notification[afterCallbackKey] && typeof notification[afterCallbackKey] === "function") {
				notification[afterCallbackKey]();
			}
		}

	},	
	alignModalElement: function (notification){
		if (notification) {
			const modal = this.$node.querySelector('lyte-beta-modal');
			if (modal && typeof modal.alignModal === 'function') {
				modal.alignModal();
			}

			const modalContent = modal.component.childComp.querySelector('lyte-modal-content');
			if (modalContent.clientHeight < modalContent.scrollHeight) {
				this.minimizeNotifications();
			}

			if (notification && notification.cxOnShow && typeof notification.cxOnShow === 'function') {
				notification.cxOnShow();
			}

			this.handleNotificationTimeout(notification);
		}
	},
	checkActiveNotifications: function(){
		const hasActive = this.getData("cxPropNotificationData").some(notification => notification.cxShow === true);
		this.setData("cxPropShow", hasActive);
	}

});
