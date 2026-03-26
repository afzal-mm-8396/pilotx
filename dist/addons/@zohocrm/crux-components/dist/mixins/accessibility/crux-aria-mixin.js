Lyte.Mixin.register("crux-aria-mixin", {
		/* set aria attributes for view case */
	ariaSetForView : function(){
		if(this.data.cxPropFrom === 'view'){
			var focusableElement = this.$node.firstElementChild;
			this.observeTabindexMixin();
			if(focusableElement && focusableElement.firstElementChild){
				focusableElement = focusableElement.firstElementChild;
			}
			if(focusableElement && focusableElement.tabIndex !== this.data.cxPropTabindex){
				focusableElement.tabIndex = this.data.cxPropTabindex;
			}
			_lyteUiUtils.setAttribute(focusableElement, this.data.cxPropAriaAttributes || {}, {});
		}
	},
	/* set aria attributes for components */
	ariaGetMergedAttributes: function() {
		/* contains all aria props */
		var ariaAttributes = {
			cxAriaAttributes: {},
			cxAriaCheckbox: {},
			cxAriaRadio: {},
			cxTimeAriaAttributes: {},
			cxAriaDropdownAttributes: {},
			cxAriaButton: {},
			cxAriaBody: {},
			cxAriaBox: {},
			cxAriaErrorProperties: {},
			cxAriaFilterDropdownAttributes: {},
			cxAriaMenu: {},
			cxAriaModal: {},
			cxAriaSlider: {},
			cxAriaSearch: {},
			cxAriaPopover: {},
			cxAriaNoteHeading: {},
			cxAriaImageDiv: {},
			cxAriaImagePreview: {},
			cxAriaImageUpload: {},
			cxAriaUploadButton: {},
			cxAriaMessageBox: {},
			cxAriaDownloadIcon: {},
			cxAriaRemoveIcon: {},
			cxAriaUploadIcon: {},
			cxAriaRightIcon: {},
			cxAriaCallIcon: {},
			cxAriaEditIcon: {},
			cxAriaCloseIcon: {}
		};

		/* contains exposed aria props */
		var constAriaKeys = [
			'cxPropAriaCheckbox',
			'cxPropAriaRadio',
			'cxPropTimeAriaAttributes',
			'cxPropAriaButton',
			'cxPropAriaBox',
			'cxPropAriaBody',
			'cxPropAriaErrorProperties'
		];

		/* merge values in exposed Props(constAriaKeys) to all Props(ariaAttributes) */
		constAriaKeys.forEach(attrKey => {
			const value = this.data[attrKey];
			if (value && Object.keys(value).length > 0) {
				const targetKey = attrKey.replace('cxProp', 'cx'); // converts cxPropAriaCheckbox -> cxAriaCheckbox
				ariaAttributes[targetKey] = value;
			}
		});

		/* sets ariaAttribute to all props(ariaAttributes) */
		var tempAriaAttr = this.data.cxPropAriaAttributes;
		if (tempAriaAttr && Object.keys(tempAriaAttr).length !== 0) {
			var hasMatchingKeys = Object.keys(tempAriaAttr).some(key => key in ariaAttributes);
			if (hasMatchingKeys) {
				Object.assign(ariaAttributes, tempAriaAttr);
			} else {
				ariaAttributes.cxAriaAttributes = tempAriaAttr;
			}
		}
	
		var mergedAttrs = this.checkDuplicate(ariaAttributes, this.data.ariaAttributes);
		return this.ariaSetLabelForIcon(mergedAttrs);
	},
	/* check if the aria attributes already having value */
	checkDuplicate : function (ariaAttr, defaultAriaAttr) {
		for (const key in defaultAriaAttr) {
			// Check if the key exists in ariaAttr
			if (ariaAttr.hasOwnProperty(key)) {
				// If both values are objects, do a recursive check
				if (typeof ariaAttr[key] === 'object' && typeof defaultAriaAttr[key] === 'object' && !Array.isArray(ariaAttr[key]) && !Array.isArray(defaultAriaAttr[key])) {
					// Recursively check nested objects
					this.checkDuplicate(ariaAttr[key], defaultAriaAttr[key]);
				} else if (ariaAttr[key] === defaultAriaAttr[key]) {
					// If the value matches, update ariaAttr with defaultAriaAttr's value
					ariaAttr[key] = defaultAriaAttr[key];
				}
			}else{
				ariaAttr[key] = defaultAriaAttr[key];
			}
		}
		return ariaAttr;
	},
	/* sets default label for icons */
	ariaSetLabelForIcon : function(ariaAttributes){
		var defaultIconLabel = {
			cxAriaRemoveIcon : _cruxUtils.getI18n("crm.fileuploader.removefile"),
			cxAriaDownloadIcon : _cruxUtils.getI18n("crm.view.attachment.download"),
			cxAriaUploadIcon :  _cruxUtils.getI18n("crm.button.upload"),
			cxAriaRightIcon : 'Field Icon',
			cxAriaCallIcon : 'Call Icon',
			cxAriaEditIcon : 'Edit Icon',
			cxAriaCloseIcon : 'Close Icon',
			cxAriaLookupIcon : 'Lookup Icon'
		};
		for (const key in defaultIconLabel) {
			if (!ariaAttributes[key]) {
				ariaAttributes[key] = { 'aria-label' : defaultIconLabel[key] };
			}else if(ariaAttributes[key] && !(ariaAttributes[key]['aria-label'])){
				ariaAttributes[key]['aria-label'] = defaultIconLabel[key];
			}
		}
		return ariaAttributes;
	}
});

