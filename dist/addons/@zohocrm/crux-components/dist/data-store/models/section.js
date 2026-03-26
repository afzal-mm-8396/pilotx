//$Id$
//store.unregisterModel("section")
store.registerModel("section", {	//No I18N	
    id: Lyte.attr('string'),//No I18N
    column_count: Lyte.attr('number'),//No I18N
    display_label: Lyte.attr('string'),//No I18N
    name: Lyte.attr('string'),//No I18N
    sequence_number: Lyte.attr('number'),//No I18N
    fields: Lyte.hasMany('field'),//No I18N
    layout: Lyte.belongsTo('layout')//No I18N
});