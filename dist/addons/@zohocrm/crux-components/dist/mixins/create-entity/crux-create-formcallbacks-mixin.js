Lyte.Mixin.register("crux-create-formcallbacks-mixin", {
    onFormAfterSave: function (layoutCompData, subformDetails = {}, customData) {
        if (customData && customData.layoutComponentData) {
            layoutCompData = customData.layoutComponentData;
        }
        layoutCompData.layoutComponentDomNode.destroyComponent();
        this.lookupCallBackHandler(customData, subformDetails);
    },
    onFormCancel: function (layoutCompData, subformDetails = {}, customData) {
        if (customData && customData.layoutComponentData) {
            layoutCompData = customData.layoutComponentData;
        }
        layoutCompData.layoutComponentDomNode.destroyComponent();
        this.lookupCallBackHandler(customData, subformDetails);
    }
});