/**
 * @component crux-table-component
 * @author anuja.manoharan
 * @version 1.0.0
 * @alias crm-custom-table 1
 */
Lyte.Component.register("crux-table-component", {
_template:"<template tag-name=\"crux-table-component\"> <template is=\"if\" value=\"{{cxPropExpress}}\"><template case=\"true\"> <lyte-expresstable lt-prop-aria=\"{{cxPropAria}}\" lt-prop-content=\"{{content}}\" lt-prop-role=\"{{cxPropRole}}\" lt-prop-height=\"{{cxPropHeight}}\" lt-prop-header-label-key=\"field_label\" lt-prop-full-yield=\"{{cxPropFullYield}}\" lt-prop-yield=\"true\" lt-prop-header=\"{{header}}\" lt-prop-fixed-table-scroll=\"true\" id=\"{{cxPropTableId}}\" lt-prop-dual-resize=\"{{cxPropDualResize}}\" onscroll=\"{{action('scroll',event)}}\" lt-prop-scrollbar-option=\"{&quot;showOn&quot; : &quot;{{cxPropShowScrollOn}}&quot;, &quot;containerClass&quot; : &quot;scrollbarClass&quot;}\" on-resize-select=\"{{method('resizeSelect')}}\" on-resize-end=\"{{method('resizeEnd')}}\" class=\"pR {{cxPropTableClass}}\" before-set-fix-table-column-width=\"{{method('beforeSetFixTableColumnWidth')}}\" after-set-fix-table-column-width=\"{{method('afterSetFixTableColumnWidth')}}\" lt-prop-prevent-content-observer=\"true\" lt-prop-prevent-width=\"{{cxPropPreventWidth}}\" lt-prop-sticky-table=\"{{cxPropStickyTable}}\" onmouseover=\"{{action('hoverOnTable',index,true)}}\" onmouseout=\"{{action('hoverOnTable',index)}}\"> <template is=\"registerYield\" yield-name=\"fullYield\"> <lyte-exptable> <lyte-exptable-thead> <lyte-exptable-tr id=\"{{cxPropHeaderRowId}}\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\"> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\"> <lyte-exptable-th resize=\"{{cxPropResizeCheckbox}}\" fixed=\"{{cxPropFixCheckbox}}\"> <lyte-checkbox></lyte-checkbox> </lyte-exptable-th> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'==',true)}}\"><template case=\"true\"> <lyte-exptable-th resize=\"{{field.cxPropResize}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" class=\"{{field.cxPropClass}} cxPropTh{{index}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" data-zcqa=\"{{field[cxPropZcqaSelector]}}\" onmouseover=\"{{action('hoverOnTh',index,true)}}\" onmouseout=\"{{action('hoverOnTh',index)}}\"> <lyte-yield yield-name=\"header-{{field.yieldName}}\"></lyte-yield> </lyte-exptable-th> </template><template case=\"false\"> <lyte-exptable-th resize=\"{{field.cxPropResize}}\" class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} cxSortQuery cxPropTh{{index}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" id=\"{{field[cxPropHeaderIdSelector]}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" data-zcqa=\"{{field[cxPropZcqaSelector]}}\" onmouseover=\"{{action('hoverOnTh',index,true)}}\" onmouseout=\"{{action('hoverOnTh',index)}}\"> <lyte-text class=\"{{if(cruxAnd(cxPropEnableSort,negate(cxPropShowSortIcon)),'cP','')}} cxTableHeadingElem\" lt-prop-tooltip-config=\"{{cruxStringify(cxPropHeaderTooltipConfig)}}\" lt-prop-value=\"{{field[cxPropLabelSelector]}}\" onclick=\"{{action('sort',field,event)}}\" lt-prop-tooltip-class=\"{{cxPropHeaderTooltipClass}}\"></lyte-text> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(field.api_name,'==',cxPropSortedColumn),'||',expHandlers(field.id,'==',cxPropSortedColumn)),'&amp;&amp;',cxPropShowSortIcon)}}\"><template case=\"true\"> <span class=\"cxTableStarLabel\" id=\"sorted_column_{{field.id}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\">*</span> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropNewListView,'&amp;&amp;',cxPropIsAlphaSearchShown),'&amp;&amp;',cxPropModuleDisplayField[cxPropModule])}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxContains(cxPropModuleDisplayField[cxPropModule],field.api_name,cxPropModuleDisplayField[cxPropModule].length)}}\"><template case=\"true\"> <span><lyte-yield yield-name=\"header-alpha-search\" field-name=\"{{field.api_name}}\"></lyte-yield></span> </template></template></template></template> <template is=\"if\" value=\"{{cxPropShowSortIcon}}\"><template case=\"true\"> <span class=\"cxTableSortIcon\" onclick=\" {{action('sortIconClick',field,event)}}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',cxPropSortedColumn),'||',expHandlers(field.id,'==',cxPropSortedColumn))}}\"><template case=\"true\"> <span id=\"sorted_column_{{field.id}}\" title=\"{{field.field_label}}\" class=\"cxTableSortIconNew cxTableColumnSort_{{cxPropSortedOrder}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropNewListView,'!')}}\"><template case=\"true\"> <span class=\"cx_sortIconPlaceholder dIB mL5 vam\"></span> </template></template></template></template></template></template> </lyte-exptable-th> </template></template></template></template> </template> </lyte-exptable-tr> {{log(cxPropContentSearch)}} <template is=\"if\" value=\"{{cxPropContentSearch}}\"><template case=\"true\"><lyte-exptable-tr colspan=\"{{cruxArithResult(ltPropHeader.length,&quot;-&quot;,3)}}\"> <lyte-input lt-prop-type=\"search\" lt-prop-value=\"{{lbind(cxPropSearchInputValue)}}\" lt-prop-placeholder=\"{{cxPropSearchPlaceholder}}\" lt-prop-maxlength=\"{{cxPropSearchMaxlength}}\" lt-prop-direction=\"horizontal\" data-zcqa=\"{{cxPropSearchZcqa}}\" on-value-change=\"{{method('onTableSearch')}}\" on-focus=\"{{method('onSearchFocus')}}\" on-blur=\"{{method('onSearchBlur')}}\" on-clear=\"{{method('onSearchClear')}}\" lt-prop-appearance=\"{{cxPropSearchAppearance}}\" lt-prop-class=\"{{cxPropSeachInputClass}}\" lt-prop-id=\"{{cxPropSeachInputId}}\" lt-prop-autofocus=\"{{cxPropSearchAutofocus}}\"></lyte-input> </lyte-exptable-tr></template></template> <template is=\"if\" value=\"{{cxPropSuffixHeader}}\"><template case=\"true\"><lyte-yield yield-name=\"header-suffix\" hide-template=\"{{cxPropHideTemplate}}\"> </lyte-yield></template></template> </lyte-exptable-thead> <template is=\"if\" value=\"{{cxPropContent.length}}\"><template case=\"true\"><template is=\"if\" value=\"{{showLoadingUp}}\"><template case=\"true\"> <lyte-exptable-tbody> <lyte-exptable-tr class=\"cxTableEmptyRow cxTableUpRow\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\"> <td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <lyte-td-wrap> <div class=\"content-animated-line zcrm-contentloading\" style=\"height: 10px;\"> </div> </lyte-td-wrap> </td> </template> </lyte-exptable-tr> </lyte-exptable-tbody> </template></template><template is=\"for\" items=\"{{content}}\" item=\"row\" index=\"contentIndex\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{row.cxGroupName}}\"><template case=\"true\"> <lyte-exptable-tbody class=\"{{if(row.cxPropContent.length,&quot;&quot;,&quot;lyteExpTbodyClosed&quot;)}}\"> <lyte-exptable-tr class=\"lyteExpTableAccordionHeader\"> <template is=\"if\" value=\"true\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <td fixed=\"{{cxPropFixCheckbox}}\"> <div class=\"lyteExpressAccordionTdChild\" onclick=\"{{action('toggleAccordion',row,this)}}\"> <lyte-yield yield-name=\"body-checkbox\" record-obj=\"{{row}}\" index-val=\"{{contentIndex}}\"></lyte-yield> <div class=\"cxTdGroupbyHead\"> <span class=\"cxTableArrowDown\"> </span>{{row.cxGroupName}} <span class=\"cxTableGroupbyCount\">{{row.total_count}}</span> </div> </div> </td> <td fixed=\"{{cxPropFixCheckbox}}\"> <div class=\"lyteExpressAccordionTdChild cP dIB\"> <lyte-yield yield-name=\"body-record-selection\" record-obj=\"{{row}}\" index-val=\"{{contentIndex}}\"></lyte-yield> </div> </td> <td colspan=\"{{cruxArithResult(ltPropHeader.length,&quot;-&quot;,3)}}\"></td> <template is=\"if\" value=\"{{row.start_record}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr><td class=\"cxExpTableStickyTd\"> <div class=\"lyteExpressAccordionTdChild\"> <span class=\"cxPageCount crm-font-bold f14 mR10\">{{row.start_record}} - {{row.end_record}}</span> <lyte-navigator on-next=\"{{method('navigate','next',row,contentIndex)}}\" on-previous=\"{{method('navigate','previous',row,contentIndex)}}\" lt-prop-value=\"{{lbind(row.startIndex)}}\" lt-prop-records=\"{{row.total_count}}\" lt-prop-perpage=\"{{row.per_page}}\" lt-prop-show-only-icon=\"true\" start-record=\"{{lbind(row.startIndex)}}\" end-record=\"{{lbind(row.end_record)}}\"></lyte-navigator> </div> </td></tr></tbody></table></template></template> </tr></tbody></table></template></template> </lyte-exptable-tr> <template is=\"for\" items=\"{{row.cxPropContent}}\" item=\"single_row\" index=\"indexVal\"> <lyte-exptable-tr dd-class=\"test\" id=\"{{single_row.id}}\" onclick=\"{{action('onRowClick',single_row,event)}}\" onmouseover=\"{{action('onMouseOver',single_row.id,this)}}\" onmouseout=\"{{action('onMouseOut',single_row.id,this)}}\" style=\"{{if(cruxContains(cxPropSelectedRows,single_row.id,cxPropSelectedRows.length),cxPropSelectedRowStyle)}}\" data-zcqa=\"{{if(cxPropZcqaWithId,concat(cxPropZcqaWithId,single_row.id),cxPropRowZcqa)}}\" class=\"lyteExpTableAccordionContent {{if(cruxContains(cxPropSelectedRows,single_row.id,cxPropSelectedRows.length),cxPropSelectedRowClass)}} {{if(single_row.hideRecord,'cruxHideRow','')}} {{single_row.cxPropClass}} lyteExpTableAccordionContent1\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <td fixed=\"{{cxPropFixCheckbox}}\"> <div class=\"lyteExpressAccordionTdChild\"><lyte-checkbox></lyte-checkbox> </div></td> </tr></tbody></table></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'||',field.yieldName)}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <td style=\"{{field.style}}\" fixed=\"{{field.fixed}}\" width=\"{{field.width}}\" class=\"{{field.cxPropClass}} {{cxPropColumnCellClass}}\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <div class=\"lyteExpressAccordionTdChild\"> <lyte-yield yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{single_row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield> </div> </td> </tr></tbody></table></template><template case=\"false\" depth=\"3\"><table><tbody><tr> <td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor mW100','')}}\" style=\"{{field.style}}\"> <div class=\"lyteExpressAccordionTdChild\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;tag&quot;),'&amp;&amp;',expHandlers(single_row[field.api_name].length,'!=',0)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;user&quot;),'&amp;&amp;',single_row[field.api_name])),'||',expHandlers(field.cxTypeMapping,'==',&quot;number&quot;)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;picklist&quot;),'&amp;&amp;',field.enable_colour_code))}}\"><template case=\"true\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-value=\"{{single_row[field.api_name]}}\" cx-prop-field=\"{{field}}\" cx-prop-iso-code=\"{{single_row.Currency}}\" cx-prop-exchange-rate=\"{{single_row.Exchange_Rate}}\" cx-prop-exchange-rate-finance=\"{{single_row.ExchangeRate}}\" cx-prop-home-currency=\"{{single_row.$home_converted_currency[field.api_name]}}\" on-show-more-tags=\"{{method('tagsShowMore')}}\" cx-prop-formatted-currency=\"{{single_row.$formatted_currency[field.api_name]}}\" cx-prop-clip-mode=\"{{cxPropClipMode}}\" cx-prop-width=\"{{field.tagWidth}}\" cx-prop-tooltip=\"{{if(field.cxPropTooltip,field.cxPropTooltip,if(cxPropTooltip,cxPropTooltip,''))}}\" cx-prop-tooltip-props=\"{{cxPropTooltipProps}}\" cx-prop-show-business-card=\"{{cxPropShowBusinessCard}}\" cx-prop-masking-properties=\"{{field.cxPropMaskingProperties}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-toggle-masking=\"{{expHandlers(expHandlers(cruxOr(row[field.api_name],expHandlers(row[field.api_name],'==',0)),'&amp;&amp;',field.mask_details),'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"></template> </template><template case=\"false\"> {{unescape(getCruxTableValue(field,single_row,cxPropModule,cxPropTooltip,cxPropTooltipProps,undefined,cxPropPhoneIconTooltip))}} </template></template> </div> </td> </tr></tbody></table></template></template></template></template> </template> </lyte-exptable-tr> </template> </lyte-exptable-tbody> </template><template case=\"false\"> {{log(\"number2\")}} <lyte-exptable-tbody> <lyte-exptable-tr id=\"{{row.id}}\" onclick=\"{{action('onRowClick',row,event)}}\" onmouseover=\"{{action('onMouseOver',row.id,this)}}\" onmouseout=\"{{action('onMouseOut',row.id,this)}}\" style=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowStyle)}}\" data-zcqa=\"{{if(cxPropZcqaWithId,concat(cxPropZcqaWithId,row.id),cxPropRowZcqa)}}\" class=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowClass)}} {{if(row.hideRecord,'cruxHideRow','')}} {{row.cxPropClass}}\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\"> <lyte-exptable-td fixed=\"{{cxPropFixCheckbox}}\"><lyte-checkbox></lyte-checkbox></lyte-exptable-td> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'||',field.yieldName)}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <lyte-exptable-td style=\"{{field.style}}\" fixed=\"{{field.fixed}}\" width=\"{{field.width}}\" class=\"{{field.cxPropClass}} {{cxPropColumnCellClass}}\"> <lyte-yield yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield> </lyte-exptable-td> </template><template case=\"false\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor mW100','')}}\" style=\"{{field.style}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;tag&quot;),'&amp;&amp;',expHandlers(row[field.api_name].length,'!=',0)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;user&quot;),'&amp;&amp;',row[field.api_name])),'||',expHandlers(field.cxTypeMapping,'==',&quot;number&quot;)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;picklist&quot;),'&amp;&amp;',field.enable_colour_code))}}\"><template case=\"true\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-value=\"{{row[field.api_name]}}\" cx-prop-field=\"{{field}}\" cx-prop-iso-code=\"{{row.Currency}}\" cx-prop-exchange-rate=\"{{row.Exchange_Rate}}\" cx-prop-exchange-rate-finance=\"{{row.ExchangeRate}}\" cx-prop-home-currency=\"{{row.$home_converted_currency[field.api_name]}}\" on-show-more-tags=\"{{method('tagsShowMore')}}\" cx-prop-formatted-currency=\"{{row.$formatted_currency[field.api_name]}}\" cx-prop-clip-mode=\"{{cxPropClipMode}}\" cx-prop-width=\"{{field.tagWidth}}\" cx-prop-tooltip=\"{{if(field.cxPropTooltip,field.cxPropTooltip,if(cxPropTooltip,cxPropTooltip,''))}}\" cx-prop-tooltip-props=\"{{cxPropTooltipProps}}\" cx-prop-show-business-card=\"{{cxPropShowBusinessCard}}\" cx-prop-masking-properties=\"{{field.cxPropMaskingProperties}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-toggle-masking=\"{{expHandlers(expHandlers(cruxOr(row[field.api_name],expHandlers(row[field.api_name],'==',0)),'&amp;&amp;',field.mask_details),'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"></template> </template><template case=\"false\"> {{unescape(getCruxTableValue(field,row,cxPropModule,cxPropTooltip,cxPropTooltipProps,cxPropLookupProperties,cxPropPhoneIconTooltip))}} </template></template> </lyte-exptable-td> </template></template></template></template> </template> </lyte-exptable-tr> </lyte-exptable-tbody> </template></template></template> <template is=\"if\" value=\"{{showLoadingDown}}\"><template case=\"true\"> <lyte-exptable-tbody> <lyte-exptable-tr class=\"cxTableEmptyRow cxTableDownRow dN\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </lyte-exptable-td> </template> </lyte-exptable-tr> </lyte-exptable-tbody> </template></template> </template><template case=\"false\"> <lyte-exptable-tbody> <lyte-exptable-tr class=\"cxTableEmptyRow\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\"> <td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <div class=\"lyteExpressAccordionTdChild\"> <template is=\"if\" value=\"{{cxPropShowLoading}}\"><template case=\"true\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </template></template> </div> </td> </template> </lyte-exptable-tr> </lyte-exptable-tbody> </template></template> </lyte-exptable> </template> <template is=\"registerYield\" yield-name=\"headerYield\" class=\"tablecomponent1 tableBdrCollapse tablecomponent\"> <lyte-exptable-tr id=\"{{cxPropHeaderRowId}}\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"headerIndex\"> <template is=\"if\" value=\"{{cxPropHeaderCellPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"headerCellPrefixYield\" field-obj=\"{{field}}\"></lyte-yield></template></template> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\"> <lyte-exptable-th resize=\"{{cxPropResizeCheckbox}}\" fixed=\"{{cxPropFixCheckbox}}\" sticky-position=\"{{field.cxPropStickyPosition}}\"> <lyte-checkbox></lyte-checkbox> </lyte-exptable-th> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'==',true)}}\"><template case=\"true\"> <lyte-exptable-th resize=\"{{field.cxPropResize}}\" fixed=\"{{field.fixed}}\" sticky-position=\"{{field.cxPropStickyPosition}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" class=\"{{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} cxPropTh{{index}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}} \" data-zcqa=\"{{field[cxPropZcqaSelector]}}\" onmouseover=\"{{action('hoverOnTh',index,true)}}\" onmouseout=\"{{action('hoverOnTh',index)}}\"> <lyte-yield yield-name=\"header-{{field.yieldName}}\" field-obj=\"{{field}}\"></lyte-yield> </lyte-exptable-th> </template><template case=\"false\"> <lyte-exptable-th resize=\"{{field.cxPropResize}}\" class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} cxSortQuery cxPropTh{{index}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" id=\"{{field[cxPropHeaderIdSelector]}}\" sticky-position=\"{{field.cxPropStickyPosition}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" data-zcqa=\"{{field[cxPropZcqaSelector]}}\" onmouseover=\"{{action('hoverOnTh',index,true)}}\" onmouseout=\"{{action('hoverOnTh',index)}}\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <lyte-text tabindex=\"{{headerTabIndex}}\" class=\"{{cruxGetTableTextClass(cxPropEnableSort,cxPropShowSortIcon)}}\" lt-prop-tooltip-config=\"{{cruxStringify(cxPropHeaderTooltipConfig)}}\" lt-prop-value=\"{{field[cxPropLabelSelector]}}\" onclick=\"{{action('sort',field,event)}}\" lt-prop-tooltip-class=\"{{cxPropHeaderTooltipClass}}\"></lyte-text> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(field.api_name,'==',cxPropSortedColumn),'||',expHandlers(field.id,'==',cxPropSortedColumn)),'&amp;&amp;',cxPropShowSortIcon)}}\"><template case=\"true\"> <span class=\"cxTableStarLabel\" id=\"sorted_column_{{field.id}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\">*</span> </template></template> <template is=\"if\" value=\"{{field.cxShowDropdown}}\"><template case=\"true\"> <span><lyte-yield yield-name=\"header-alpha-search\" field-name=\"{{field.api_name}}\"></lyte-yield></span> </template></template> <template is=\"if\" value=\"{{showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId)}}\"><template case=\"true\"> <span tabindex=\"{{headerTabIndex}}\" title=\"Column options\" id=\"cxTableSortIcon_{{cxPropId}}\" class=\"cxTableSortIcon\" data-zcqa=\"sorticon_{{field[cxPropZcqaSelector]}}\" onclick=\" {{action('sortIconClick',field,event)}}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',cxPropSortedColumn),'||',expHandlers(field.id,'==',cxPropSortedColumn))}}\"><template case=\"true\"> <span id=\"sorted_column_{{field.id}}\" title=\"{{field.field_label}}\" tabindex=\"{{headerTabIndex}}\" class=\"cxTableSortIconNew cxTableColumnSort_{{cxPropSortedOrder}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropNewListView,'!')}}\"><template case=\"true\"> <span class=\"cx_sortIconPlaceholder dIB mL5 cxVam\"></span> </template></template></template></template></template></template> </lyte-exptable-th> </template></template></template></template> </template> </lyte-exptable-tr> <template is=\"if\" value=\"{{cxPropSuffixHeader}}\"><template case=\"true\"><lyte-yield yield-name=\"header-suffix\" hide-template=\"{{cxPropHideTemplate}}\"></lyte-yield></template></template> </template> <template is=\"registerYield\" yield-name=\"contentYield\" class=\"tableBdrCollapse tablecomponent2\" id=\"{{cxPropBodyId}}\"> <template is=\"if\" value=\"{{cxPropContent.length}}\"><template case=\"true\"><template is=\"if\" value=\"{{showLoadingUp}}\"><template case=\"true\"> <lyte-exptable-tr class=\"cxTableEmptyRow cxTableUpRow\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <div class=\"content-animated-line zcrm-contentloading\" style=\"height: 10px;\"> </div> </lyte-exptable-td> </template> </lyte-exptable-tr> </template></template> <template is=\"for\" items=\"{{content}}\" item=\"row\" index=\"contentIndex\" unbound=\"{{cxPropDataBind}}\"> <lyte-exptable-tr id=\"{{row.id}}\" onclick=\"{{action('onRowClick',row,event)}}\" onmouseover=\"{{action('onMouseOver',row.id,this)}}\" onmouseout=\"{{action('onMouseOut',row.id,this)}}\" style=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowStyle)}}\" data-zcqa=\"{{if(cxPropZcqaWithId,concat(cxPropZcqaWithId,row.id),cxPropRowZcqa)}}\" class=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowClass)}} {{if(row.hideRecord,'cruxHideRow','')}} {{row.cxPropClass}}\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\"> <lyte-exptable-td fixed=\"{{cxPropFixCheckbox}}\" data-zcqa=\"select_{{row.id}}\"><lyte-checkbox></lyte-checkbox></lyte-exptable-td> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'||',field.yieldName)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cruxContains(field.yieldName,&quot;prefix-&quot;),'!'),'&amp;&amp;',row.cruxTableGroup)}}\"><template case=\"true\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor mW100','')}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" style=\"{{field.style}}\" data-zcqa=\"td_{{row.id}}_{{field.yieldName}}\" onmouseover=\"{{action('showSortIcon',headerIndex,true)}}\" onmouseout=\"{{action('showSortIcon',headerIndex)}}\"> <template is=\"if\" value=\"{{isgroupRendered(row)}}\"><template case=\"true\"> {{log(row.cruxTableGroup)}} {{row.cruxTableGroup}} </template></template> </lyte-exptable-td> </template><template case=\"false\"> <lyte-exptable-td style=\"{{field.style}}\" fixed=\"{{field.fixed}}\" data-zcqa=\"td_{{row.id}}_{{field.yieldName}}\" class=\"{{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} {{cxPropColumnCellClass}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" onmouseover=\"{{action('showSortIcon',headerIndex,true)}}\" onmouseout=\"{{action('showSortIcon',headerIndex)}}\"> <lyte-yield yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\" mask-toggle=\"{{expHandlers(field.mask_details,'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"></lyte-yield> </lyte-exptable-td> </template></template> </template><template case=\"false\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor mW100','')}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" data-zcqa=\"column_{{row.id}}_{{field[cxPropZcqaSelector]}}\" style=\"{{field.style}}\" onmouseover=\"{{action('showSortIcon',headerIndex,true)}}\" onmouseout=\"{{action('showSortIcon',headerIndex)}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropCellPrefixYield,'||',field.cxCellPrefixYield)}}\"><template case=\"true\"><lyte-yield yield-name=\"cellPrefixYield\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;tag&quot;),'&amp;&amp;',expHandlers(row[field.api_name].length,'!=',0)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;user&quot;),'&amp;&amp;',getCruxTableValue1(row,field))),'||',expHandlers(field.cxTypeMapping,'==',&quot;number&quot;)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;picklist&quot;),'&amp;&amp;',field.enable_colour_code)),'&amp;&amp;',expHandlers(row.cruxTableGroup,'!'))}}\"><template case=\"true\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-value=\"{{getCruxTableValue1(row,field)}}\" cx-prop-field=\"{{field}}\" cx-prop-iso-code=\"{{row.Currency}}\" cx-prop-exchange-rate=\"{{row.Exchange_Rate}}\" cx-prop-exchange-rate-finance=\"{{row.ExchangeRate}}\" cx-prop-home-currency=\"{{row.$home_converted_currency[field.api_name]}}\" on-show-more-tags=\"{{method('tagsShowMore')}}\" cx-prop-formatted-currency=\"{{row.$formatted_currency[field.api_name]}}\" cx-prop-clip-mode=\"{{cxPropClipMode}}\" cx-prop-width=\"{{if(field.tagWidth,field.tagWidth,field.width)}}\" cx-prop-tooltip=\"{{if(field.cxPropTooltip,field.cxPropTooltip,if(cxPropTooltip,cxPropTooltip,''))}}\" cx-prop-tooltip-props=\"{{cxPropTooltipProps}}\" cx-prop-show-business-card=\"{{cxPropShowBusinessCard}}\" cx-prop-masking-properties=\"{{field.cxPropMaskingProperties}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-user-detail-view-path=\"{{cxPropUserDetailViewPath}}\" cx-prop-show-mask-unmask-icon=\"{{showEmMaskUnmaskIcon}}\" cx-prop-toggle-masking=\"{{expHandlers(expHandlers(cruxOr(row[field.api_name],expHandlers(row[field.api_name],'==',0)),'&amp;&amp;',field.mask_details),'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{row.cruxTableGroup}}\"><template case=\"true\"> <template is=\"if\" value=\"{{isgroupRendered(row)}}\"><template case=\"true\"> {{log(row.cruxTableGroup)}} {{row.cruxTableGroup}} </template></template> </template><template case=\"false\"> {{unescape(getCruxTableValue(field,row,cxPropModule,cxPropTooltip,cxPropTooltipProps,cxPropLookupProperties,cxPropPhoneIconTooltip,cxPropNumberProperties,cxPropTextareaProperties,cxPropTwitterUrl,cxPhoneProperties,cxPropRecordId,field.unmask,cxPropIsMaskingFeatureEnabled,cxPropProfileId))}} </template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropCellSuffixYield,'||',field.cxPropCellSuffixYield)}}\"><template case=\"true\"><lyte-yield yield-name=\"cellSuffixYield\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield></template></template> </lyte-exptable-td> </template></template></template></template> </template> </lyte-exptable-tr> </template> <template is=\"if\" value=\"{{showLoadingDown}}\"><template case=\"true\"> <lyte-exptable-tr class=\"cxTableEmptyRow cxTableDownRow cxdN\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </lyte-exptable-td> </template> </lyte-exptable-tr> </template></template> </template><template case=\"false\"> <lyte-exptable-tr class=\"cxTableEmptyRow\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <template is=\"if\" value=\"{{cxPropShowLoading}}\"><template case=\"true\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </template></template> </lyte-exptable-td> </template> </lyte-exptable-tr> </template></template> </template> </lyte-expresstable> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(content.length,'||',expHandlers(cxPropHideHeaderOnNoContent,'!'))}}\"><template case=\"true\"> <lyte-table lt-prop-content=\"{{content}}\" lt-prop-cell-intersection=\"{{cxPropCellIntersection}}\" lt-prop-intersection-type=\"{{cxPropIntersectionType}}\" lt-prop-resize-fixed-column=\"{{cxPropResizeFixedColumn}}\" lt-prop-prevent-scrollbar=\"{{cxPropStickyTable}}\" lt-prop-scroll-element=\"{{cxPropScrollElement}}\" lt-prop-sticky-table=\"{{cxPropStickyTable}}\" lt-prop-custom-copy=\"{{cxPropCustomCopy}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-yield=\"true\" id=\"{{cxPropTableId}}\" lt-prop-role=\"{{cxPropRole}}\" lt-prop-width=\"{{cxPropTableWidth}}\" lt-prop-dual-resize=\"{{cxPropDualResize}}\" style=\"height : {{cxPropHeight}}; position: relative; overflow:hidden\" onscroll=\"{{action('scroll',event)}}\" lt-prop-scrollbar-option=\"{&quot;showOn&quot; : &quot;{{cxPropShowScrollOn}}&quot;, &quot;containerClass&quot; : &quot;scrollbarClass&quot;}\" on-before-resize-select=\"{{method('resizeSelect')}}\" on-resize-end=\"{{method('resizeEnd')}}\" class=\"cxCommonTable {{cxPropTableClass}} {{if(cruxOr(cxPropEditMode,cxPropShowMandatoryOnHeader),'cxHideMandatoryForInput')}} {{expHandlers(cxPropStickyTable,'?:','lyteStickyTable','')}}\" onmouseover=\"{{action('hoverOnTable',index,true)}}\" onmouseout=\"{{action('hoverOnTable',index)}}\"> <template is=\"if\" value=\"{{cxPropShowFilterIcon}}\"><template case=\"true\"> <div class=\"cxTableFilterIcons filterIcons cxTableHeaderIcons\"> <div data-zcqa=\"{{cxPropFilterProperties.zcqa}}\" class=\"dIB cxTableHeaderFilterIcon {{if(cxPropShowFilter,'cxTableHeaderFilterOpenedIcon')}}\" onclick=\"{{action('toggleFilter')}}\" lt-prop-title=\"{{cxPropFilterProperties.title}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;}\"> </div> </div> </template></template> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure class=\"cruxTableStructure\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropHideHeaderOnNoContent,'&amp;&amp;',expHandlers(content.length,'!')),'!')}}\"><template case=\"true\"> <lyte-thead class=\"tablecomponent {{cxPropTableProperties.thead_class}}\"> <lyte-tr id=\"{{cxPropHeaderRowId}}\" class=\"{{cxPropTableProperties.thead_tr_class}}\"> <template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"headerIndex\"> <lyte-th resize=\"{{field.cxPropResize}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" class=\"{{cxPropTableProperties.th_class}} {{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} {{if(negate(field.yield),cxPropColumnCellClass,'')}} {{if(cruxAnd(expHandlers(field.yield,'!'),expHandlers(cxPropHeaderCellPrefixYield,'!'),showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId)),'cxTableHasSortIcon')}} {{if(cruxAnd(cruxOr(cxPropEditMode,cxPropShowMandatoryOnHeader),field.required),'cxTableHeaderMandatory')}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" data-zcqa=\"{{if(cxPropHeaderZcqaPrefix,concat(cxPropHeaderZcqaPrefix,'_',field[cxPropZcqaSelector]),field[cxPropZcqaSelector])}}\" id=\"{{field[cxPropHeaderIdSelector]}}\" sticky-position=\"{{field.cxPropStickyPosition}}\" onclick=\"{{action('sort',field,event)}}\"> <template is=\"if\" value=\"{{cxPropHeaderCellPrefixYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"headerCellPrefixYield\" field-obj=\"{{field}}\"></lyte-yield> </template></template><template is=\"if\" value=\"{{expHandlers(field.yield,'==',true)}}\"><template case=\"true\"> <lyte-yield yield-name=\"header-{{field.yieldName}}\"></lyte-yield> </template><template case=\"false\"> <span class=\"cxHeaderWrapper\"> <span class=\"cxThFieldSortEnabled {{if(cruxAnd(field.sortable,cxPropEnableFieldSort,expHandlers(showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId),'!')),'cxCP','')}} \" tabindex=\"{{headerTabIndex}}\"> <lyte-text lt-prop-value=\"{{field[cxPropLabelSelector]}}\" class=\"cxTableHeadingElem {{if(showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId),'cxSkipFocusable')}}\"> </lyte-text> <template is=\"if\" value=\"{{cxPropHeaderProperties[field.id].cxHeaderLabelSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"headerLabelSuffixYield\" field-obj=\"{{field}}\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId),'!')}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{expHandlers(field.api_name,'==',cxPropSortedColumn)}}\"><template case=\"true\"><span id=\"sorted_column_{{field.id}}\" title=\"{{field.field_label}}\" class=\"cxTableSortIconNew cxTableColumnSort_{{cxPropSortedOrder}}\" data-param=\"{&quot;fieldid&quot; : &quot;{{field.id}}&quot;}\"> </span></template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cruxOr(expHandlers(field.api_name,'==',cxPropSortedColumn),expHandlers(field.id,'==',cxPropSortedColumn))}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <span class=\"cxTableStarLabel\" id=\"sorted_column_{{field.id}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\">*</span> </template></template></template></template> </span> <template is=\"if\" value=\"{{expHandlers(cxPropIsAlphaSearchShown,'&amp;&amp;',cxPropModuleDisplayField[cxPropModule])}}\"><template case=\"true\"><template is=\"if\" value=\"{{cruxContains(cxPropModuleDisplayField[cxPropModule],field.api_name)}}\"><template case=\"true\"> <span class=\"cxSfAlphaSearchYeild\"> <lyte-yield yield-name=\"header-alpha-search\" field-name=\"{{field.api_name}}\"></lyte-yield> </span> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(field.tooltip,'&amp;&amp;',expHandlers(field.tooltip.name,'==',&quot;Info Icon&quot;)),'&amp;&amp;',field.tooltip.value),'||',expHandlers(expHandlers(cxPropHeaderProperties[field.id].tooltip,'&amp;&amp;',expHandlers(cxPropHeaderProperties[field.id].tooltip.name,'==',&quot;Info Icon&quot;)),'&amp;&amp;',cxPropHeaderProperties[field.id].tooltip.value))}}\"><template case=\"true\"> <div class=\"cxSubformInfoIcon\" lt-prop-title=\"{{if(cxPropHeaderProperties[field.id].tooltip.value,cxPropHeaderProperties[field.id].tooltip.value,field.tooltip.value)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;top&quot;}\"> </div> </template></template> </span> <template is=\"if\" value=\"{{showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId)}}\"><template case=\"true\"> <span tabindex=\"{{headerTabIndex}}\" title=\"Column options\" id=\"cxTableSortIcon_{{cxPropId}}\" class=\"cxTableSortIcon {{if(cruxAnd(expHandlers(cxPropEnableFieldSort,'!'),expHandlers(expHandlers(checkForMaskPermission(field.mask_details,cxPropProfileId),'&amp;&amp;',cxPropMaskUnmaskIcon),'!')),'pointerEventsNone','')}}\" data-zcqa=\"{{if(cxPropSortZcqaPrefix,concat(cxPropSortZcqaPrefix,'_',field[cxPropZcqaSelector],'_sort'),concat(field[cxPropZcqaSelector],'_sort'))}}\" onclick=\"{{action('sortIconClick',field,event)}}\"></span> </template></template> </template></template> </lyte-th> </template> </lyte-tr> <lyte-yield yield-name=\"row-1\" class=\"lyteRowCopy\" style=\"display: table-row;background: #f2f2f2;\"></lyte-yield> <template is=\"if\" value=\"{{cxPropFilterComponent}}\"><template case=\"true\"> <template is=\"component\" cx-prop-lookupfilter-wrapper-class=\"{{cxPropTableWrapperClass}}\" component-name=\"{{cxPropFilterComponent}}\" cx-prop-show-filter=\"{{cxPropShowFilter}}\" cx-prop-display-fields=\"{{header}}\" cx-prop-comparator=\"{{cxPropComparator}}\" apply-filter=\"{{method('applyFilter')}}\" cx-prop-module-name=\"{{cxPropModule}}\" cx-prop-show-clear=\"{{cxPropFilterShowClear}}\" clear-filter=\"{{method('clearFilter')}}\" set-lookup-filter-conditions=\"{{method('setLookupFilterConditionsCall')}}\" class=\"cxTableLookupFilterComponent lyteRowCopy\" on-before-show=\"{{method('beforeShow')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-show=\"{{method('show')}}\" on-hide=\"{{method('hide')}}\"> </template> </template></template> </lyte-thead> </template></template> <lyte-tbody class=\"tablecomponent2 {{cxPropTableProperties.tbody_class}}\" id=\"{{cxPropBodyId}}\"> <template is=\"for\" items=\"{{content}}\" item=\"row\" index=\"contentIndex\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{lyteViewPort(cruxOr(row.disableViewPort,expHandlers(cxPropViewPortLoading,'!')))}}\"><template case=\"true\"><lyte-tr class=\"cxSubformTdLoadingWrapper {{row.cxPropClass}}\"> <template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"index\" unbound=\"lyteFastRender\"> <lyte-td class=\"cxLoaderHorTd\" style=\"{{field.style}}\"> <span class=\"cxPlaceholderLoader\"></span> <span class=\"cxdN\">{{if(row[field.api_name].name,row[field.api_name].name,row[field.api_name])}} <template is=\"if\" value=\"{{expHandlers(cxPropCellSuffixYield,'||',field.cxPropCellSuffixYield)}}\"><template case=\"true\"> <lyte-yield yield-name=\"cellSuffixYield\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\" view-port=\"{{if(true,true,false)}}\"> </lyte-yield> </template></template> </span> </lyte-td> </template> </lyte-tr></template><template case=\"false\"><lyte-tr id=\"{{row.id}}\" onclick=\"{{action('onRowClick',row,event)}}\" onmouseover=\"{{action('onMouseOver',row.id,this,row)}}\" onmouseleave=\"{{action('onMouseOut',row.id,this,row)}}\" style=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowStyle)}}\" data-zcqa=\"{{getCruxTableBodyTrZcqa(cxPropZcqaWithId,row.id,cxPropRowZcqa)}}\" class=\"{{getCruxTableRowClass(row,cxPropSelectedRows,row.id,cxPropSelectedRows.length,cxPropSelectedRowClass,row.cxPropClass,cxPropAjaxEditId,cxPropFreezeRow,cxPropTableProperties.tbody_tr_class)}}\"> <template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"bodyHeaderIndex\" unbound=\"{{cxPropDataBind}}\"> <lyte-td class=\"{{getCruxTableBodyTdClass(cxPropColumnCellClass,field.cxPropClass,field.cxTypeMapping,cxPropTableProperties.td_class,intPinnedColumn,field.id,field.yield,field.yieldName,cxPropHeaderProperties[field.id].cxPropClass,cxPropCellProperties[row.id][field.api_name].cxPropClass)}}\" style=\"{{field.style}}\" data-zcqa=\"{{getCruxTableBodyTdZcqa(field,cxPropTableId,cxPropCellZcqaWithRowNo,field.field_label,contentIndex)}}\"> <template is=\"switch\" value=\"{{getCxTableRenderingCase(cxPropEditMode,field.cxTypeMapping,getCruxTableValue1(row,field),row[field.api_name].length,field.enable_colour_code,cxPropTextareaProperties.lineClamp,field,row,cxPropNumberProperties,cxPropClipMode,field.yield,field.yieldName,cxPropAllRowsEditable,cxPropAjaxEditId,row.id)}}\"><template case=\"editableRow\"> <lyte-yield yield-name=\"edit-yield\" field-obj=\"{{field}}\" record-obj=\"{{row}}\" index-val=\"{{contentIndex}}\"> </lyte-yield> </template><template case=\"yield\"> <template is=\"if\" value=\"{{isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex])}}\"><template case=\"true\"> <span style=\"{{getInVisibleTdCssAttrValue('style',row,field)}}\" class=\"{{getInVisibleTdCssAttrValue('class',row,field)}} lyteTextEllipsisNode\">{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}}</span> </template><template case=\"false\"> <lyte-yield yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\" visible-status=\"{{visibleStatus}}\" invisible-td-style-value=\"{{getInVisibleTdCssAttrValue('style',row,field,true)}}\" invisible-td-class-value=\"{{getInVisibleTdCssAttrValue('class',row,field,true)}} lyteTextEllipsisNode\" invisible-td-node-value=\"{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}}\" column-index=\"{{bodyHeaderIndex}}\" mask-toggle=\"{{expHandlers(field.mask_details,'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"> </lyte-yield> </template></template> </template><template case=\"editMode\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop=\"{{field.cxProp}}\" cx-prop-maxlength=\"{{field.length}}\" cx-prop-prevent-focus-on-error=\"true\" cx-prop-from=\"create\" id=\"row{{contentIndex}}_column{{bodyHeaderIndex}}\" cx-prop-id=\"{{cxElement}}_row{{contentIndex}}_column{{bodyHeaderIndex}}\" class=\"cxEditElement\" cx-prop-remove-disable-selected=\"true\" cx-prop-value=\"{{getCruxTableValue1(row,field,'',row[field.api_name])}}\" cx-prop-exclude=\"{{cxPropUserProperties[field.api_name].exclude}}\" cx-prop-disabled-list=\"{{cxPropUserProperties[field.api_name].disabledList}}\" cx-prop-mandatory-type=\"{{cxPropCellMandatoryType}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" cx-prop-field=\"{{field}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-appearance=\"box\" cx-prop-disabled=\"{{getCruxTableFieldData('disabled',field,row.id,cxPropCellProperties)}}\" cx-prop-height=\"{{cxPropTextareaProperties.height}}\" on-value-change=\"{{method('valueChange',row,field,contentIndex,this)}}\" on-before-select=\"{{method('onBeforeUserSelect')}}\" cx-prop-icon-class=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'iconClass')}}\" fetch-module-data=\"{{method('fetchmodule')}}\" fetch-total-count=\"{{method('fetchTotalCountFn')}}\" fetch-records=\"{{method('fetchrecord')}}\"> </template> </template><template case=\"lookup\"> <template is=\"if\" value=\"{{isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex])}}\"><template case=\"true\"> <span style=\"{{getInVisibleTdCssAttrValue('style',row,field)}}\" class=\"{{getInVisibleTdCssAttrValue('class',row,field)}} lyteTextEllipsisNode\">{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}} </span> </template><template case=\"false\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <crux-lookup-component cx-prop-field=\"{{field}}\" cx-prop-route-name=\"{{cxPropLookupProperties.routeName}}\" cx-prop-value=\"{{getCruxTableValue1(row,field)}}\" cx-prop-zcqa=\"{{cxPropLookupProperties.zcqa}}\" cx-prop-module=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'module')}}\" cx-prop-dynamic-params=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'dynamicParams')}}\" cx-prop-query-params=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'queryParams')}}\" cx-prop-id=\"{{cxPropLookupProperties.id}}\" cx-prop-transition-data=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'transitionData')}}\" cx-prop-target=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'target')}}\" cx-prop-icon-class=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'iconClass')}}\" cx-prop-show-bc=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'showBc')}}\" cx-prop-hide-icon-for-view=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'hideIconForView')}}\" on-lookup-hover-fetch-bc-data=\"{{method('onLookupHoverFetchBcDataPopup')}}\" cx-prop-hover-callback=\"{{cxPropLookupProperties.hoverCallback}}\"> </crux-lookup-component> </template></template> </template><template case=\"component\"> <template is=\"if\" value=\"{{isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex])}}\"><template case=\"true\"> <span style=\"{{getInVisibleTdCssAttrValue('style',row,field)}}\" class=\"{{getInVisibleTdCssAttrValue('class',row,field)}} lyteTextEllipsisNode\">{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}} </span> </template><template case=\"false\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-value=\"{{getCruxTableValue1(row,field)}}\" cx-prop-field=\"{{field}}\" cx-prop-iso-code=\"{{row.Currency}}\" cx-prop-exchange-rate=\"{{row.Exchange_Rate}}\" cx-prop-exchange-rate-finance=\"{{row.ExchangeRate}}\" cx-prop-home-currency=\"{{row.$home_converted_currency[field.api_name]}}\" on-show-more-tags=\"{{method('tagsShowMore')}}\" cx-prop-formatted-currency=\"{{row.$formatted_currency[field.api_name]}}\" cx-prop-clip-mode=\"{{cxPropClipMode}}\" cx-prop-popover-class=\"{{cxPropTextareaProperties.popoverProperties.class}}\" cx-prop-popover-height=\"{{cxPropTextareaProperties.popoverProperties.height}}\" cx-prop-popover-width=\"{{cxPropTextareaProperties.popoverProperties.width}}\" cx-prop-width=\"{{if(field.tagWidth,field.tagWidth,field.width)}}\" cx-prop-tooltip=\"{{if(field.cxPropTooltip,field.cxPropTooltip,if(cxPropTooltip,cxPropTooltip,''))}}\" cx-prop-tooltip-props=\"{{cxPropTooltipProps}}\" cx-prop-show-business-card=\"{{cxPropShowBusinessCard}}\" cx-prop-masking-properties=\"{{field.cxPropMaskingProperties}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-user-detail-view-path=\"{{cxPropUserDetailViewPath}}\" cx-prop-line-clamp=\"{{cxPropTextareaProperties.lineClamp}}\" cx-prop-highlight-url=\"{{cxPropTextareaProperties.highlightUrl}}\" on-show-less=\"{{method('showLess')}}\" cx-prop-minified=\"{{cxPropImageProperties.minified}}\" cx-prop-type=\"{{cxPropImageProperties.type}}\" on-expand-image-view=\"{{method('expandImageView')}}\" on-crop-success=\"{{method('cropSuccess')}}\" on-preview-close=\"{{method('previewClose')}}\" cx-prop-show-mask-unmask-icon=\"{{showEmMaskUnmaskIcon}}\" cx-prop-toggle-masking=\"{{expHandlers(expHandlers(cruxOr(row[field.api_name],expHandlers(row[field.api_name],'==',0)),'&amp;&amp;',field.mask_details),'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"> </template> </template></template> </template><template case=\"unescape\"> <template is=\"if\" value=\"{{isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex])}}\"><template case=\"true\"> <span style=\"{{getInVisibleTdCssAttrValue('style',row,field)}}\" class=\"{{getInVisibleTdCssAttrValue('class',row,field)}} lyteTextEllipsisNode\">{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}} </span> </template><template case=\"false\"> <template is=\"if\" value=\"{{field.unmask}}\"><template case=\"true\"> {{unescape(getCruxTableValue(field,row,cxPropModule,cxPropTooltip,cxPropTooltipProps,cxPropLookupProperties,cxPropPhoneIconTooltip,cxPropNumberProperties,cxPropTextareaProperties,cxPropTwitterUrl,cxPhoneProperties,cxPropRecordId,true,cxPropIsMaskingFeatureEnabled,cxPropProfileId))}} </template><template case=\"false\"> {{unescape(getCruxTableValue(field,row,cxPropModule,cxPropTooltip,cxPropTooltipProps,cxPropLookupProperties,cxPropPhoneIconTooltip,cxPropNumberProperties,cxPropTextareaProperties,cxPropTwitterUrl,cxPhoneProperties,cxPropRecordId,false,cxPropIsMaskingFeatureEnabled,cxPropProfileId))}} </template></template> </template></template> </template><template case=\"customEditable\"> <lyte-checkbox lt-prop-checked=\"{{lbind(row[field.api_name])}}\"> </lyte-checkbox> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropCellSuffixYield,'||',field.cxPropCellSuffixYield),'&amp;&amp;',expHandlers(isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex]),'!'))}}\"><template case=\"true\"> <lyte-yield yield-name=\"cellSuffixYield\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield> </template></template> </lyte-td> </template> </lyte-tr></template></template> </template> <template is=\"if\" value=\"{{cxPropShowLoading}}\"><template case=\"true\"> <lyte-tr class=\"cxTableEmptyRow\"> <template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"index\"> <lyte-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <template is=\"if\" value=\"{{cxPropShowLoading}}\"><template case=\"true\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </template></template> </lyte-td> </template> </lyte-tr> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropHideHeaderOnNoContent,'!'),'&amp;&amp;',isSlyteTable),'&amp;&amp;',expHandlers(cxPropShowNoRecordsMessage,'||',expHandlers(expHandlers(expHandlers(cxPropContent.length,'!'),'&amp;&amp;',expHandlers(cxPropShowLoading,'!')),'||',showNoRecord)))}}\"><template case=\"true\" depth=\"2\"><table><tbody> <tr class=\"cxSlyteTableCompNoResultsTr\"> <td colspan=\"{{header.length}}\"> <span class=\"cxSlyteTableCompNoResults\">{{cxPropNoRecordsMessage}}</span> </td> </tr> </tbody></table></template></template> </lyte-tbody> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\" depth=\"1\"><table> <tfoot> <tr> <td is=\"for\" lyte-for=\"true\" items=\"{{header}}\" item=\"field\" index=\"index\" depth=\"3\"></td> </tr> </tfoot> </table></template></template> </lyte-table-structure> </template> </lyte-table> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropHideHeaderOnNoContent,'||',expHandlers(isSlyteTable,'!')),'&amp;&amp;',expHandlers(cxPropShowNoRecordsMessage,'||',expHandlers(expHandlers(expHandlers(cxPropContent.length,'!'),'&amp;&amp;',expHandlers(cxPropShowLoading,'!')),'||',showNoRecord)))}}\"><template case=\"true\"> <div class=\"{{if(cxPropNoContentClass,cxPropNoContentClass,'cxTableCompNoResults p30 cxAlignCenter')}}\" data-zcqa=\"{{cxPropNoRecordsZcqa}}\">{{cxPropNoRecordsMessage}}</div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"insertYield","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"text","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"componentDynamic","position":[1,1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"text","position":[1,1,3,2]},{"type":"text","position":[1,1,3,4,0]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"insertYield","position":[3,1,1]},{"type":"attr","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1,0]},{"type":"text","position":[0,1,1,2]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxContains","args":["cxPropSelectedRows","single_row.id","cxPropSelectedRows.length"]}},"cxPropSelectedRowStyle"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"insertYield","position":[1,3,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxContains","args":["cxPropSelectedRows","row.id","cxPropSelectedRows.length"]}},"cxPropSelectedRowStyle"]}}}},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[3,1]},{"type":"insertYield","position":[3,1]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"insertYield","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,5]},{"type":"registerYield","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"for","position":[2],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxContains","args":["cxPropSelectedRows","row.id","cxPropSelectedRows.length"]}},"cxPropSelectedRowStyle"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'height : '","cxPropHeight","'; position: relative; overflow:hidden'"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"insertYield","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,3,2]},{"type":"if","position":[1,3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxContains","args":["cxPropSelectedRows","row.id","cxPropSelectedRows.length"]}},"cxPropSelectedRowStyle"]}}}},{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"switch","position":[1,1],"cases":{"editableRow":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"yield":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"getInVisibleTdCssAttrValue","args":["'style'","row","field"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},"editMode":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"lookup":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"getInVisibleTdCssAttrValue","args":["'style'","row","field"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]},"component":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"getInVisibleTdCssAttrValue","args":["'style'","row","field"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]},"unescape":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"getInVisibleTdCssAttrValue","args":["'style'","row","field"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]},"customEditable":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}],"actualTemplate":"<template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"index\" depth=\"3\"><table><tbody><tr> <td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <lyte-yield yield-name=\"footerYield\" field-obj=\"{{field}}\"> </lyte-yield> </td> </tr></tbody></table></template>","tagName":"TR"}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}],
_observedAttributes :["cxPropTableProperties","cxPropResizeFixedColumn","cxPropEnableAllFieldSort","cxPropCellIntersection","cxPropExpress","cxPropHeader","cxPropContent","cxPropYieldForPrefix","cxPropYieldForSuffix","cxPropLabelSelector","cxPropHeaderRowId","cxPropFilterComponent","cxPropShowFilter","cxPropContentSearch","cxPropSearchInputValue","cxPropSearchMaxlength","cxPropSearchPlaceholder","cxPropFilterShowClear","cxPropDualResize","cxPropHideHeaderOnNoContent","cxPropTableId","cxPropSortColumns","cxPropSortedColumn","cxPropSortedOrder","cxPropBodyId","cxPropNoRecordsMessage","cxPropNoRecordsZcqa","cxPropColumnCellClass","cxPropSelectedRows","cxPropSelectedRowStyle","cxPropFieldTypeMapping","cxPropFieldTypeMappingSelector","header","headerFields","cxPropHeight","content","cxPropEnableBodyScroll","cxPropZcqaSelector","cxPropRowZcqa","cxPropModule","nextRender","new","cxPropDisplayRowNumber","cxPropTableClass","cxPropPrefixYields","lyteUnbound","cxPropSuffixYields","cxPropDataBind","cxPropHeaderIdSelector","cxPropSelectedRowClass","showLoadingDown","showLoadingUp","cxPropHeaderYield","beingSorted","options","cxPropShowSortDropdown","cxPropMaxcharacter","cxPropCheckboxPosition","cxPropResizeCheckbox","cxPropFixCheckbox","cxPropModuleDisplayField","cxPropNewListView","cxPropIsAlphaSearchShown","cxPropPreventWidth","cxPropClipMode","cxPropStickyTable","cxPropTooltip","cxPropTooltipProps","beingResized","cxPropHeaderTooltipConfig","cxPropHeaderTooltipClass","cxPropShowScrollOn","telephonyEnabled","zpbEnabled","cxPropEnableSort","cxPropNoContentClass","cxPropEnableFieldSort","cxPropZcqaWithId","cxPropShowBusinessCard","cxPropShowLoading","cxPropShowSortIcon","mouseOverTable","cxPropLookupProperties","cxPropShowFilterIcon","cxPropDefaultFields","cxPropFreezeRow","cxPropAllRowsEditable","cxPropTableWidth","cxPropPhoneIconTooltip","cxPropRenderOnlyViewportRecords","cxPropCurrency","cxPropExchangeRate","cxPropNumberProperties","cxPropUserDetailViewPath","cxPropCellSuffixYield","cxPropUserDetailViewPath","cxPropScrollRecordCount","cxPropFormulaMapping","cxPropViewPortLoading","cxPropCellPrefixYield","cxPropShowSortIconOnHover","cxPropTextareaProperties","cxPropFilterProperties","cxPropCellZcqaWithRowNo","cxPropHeaderCellPrefixYield","cxPropDateProperties","cxPropDatetimeProperties","cxPropComparator","cxPropImageProperties","cxPropTwitterUrl","cxPropShowNoRecordsMessage","cxPropRole","cxPropAria","cxPropEditMode","cxPropCellProperties","cxPropUserProperties","cxPropHeaderZcqaPrefix","cxPhoneProperties","cxPropErrorOnHovercard","cxPropCellProperties","cxPropFooterYield","cxPropTableWrapperClass","cxPropIsRtlEnabled","cxPropCustomCopy","cxPropHeaderProperties","cxPropShowMandatoryOnHeader","cxPropSortZcqaPrefix","cxPropRecordId","cxPropResetScroll","cxPropIntersectionType","cxPropResetExpressScroll","isSlyteTable","cxPropHideTemplate","cxPropMaskUnmaskIcon","cxPropIsMaskingFeatureEnabled","showEmMaskUnmaskIcon","cxPropTableWrapperClass","cxPropProfileId","cxPropSuffixHeader","cxPropFullYield","headerTabIndex"],
_observedAttributesType :["object","boolean","boolean","boolean","boolean","array","array","boolean","boolean","string","string","string","boolean","boolean","string","number","string","boolean","boolean","boolean","string","boolean","string","string","string","string","string","string","array","string","object","string","array","array","string","array","boolean","string","string","string","number","boolean","number","string","array","boolean","array","string","string","string","boolean","boolean","object","string","array","boolean","number","number","boolean","string","object","boolean","boolean","boolean","boolean","boolean","boolean","object","boolean","object","string","string","boolean","boolean","boolean","string","boolean","string","boolean","boolean","boolean","boolean","object","boolean","object","boolean","boolean","string","string","boolean","string","number","object","string","boolean","string","number","object","boolean","boolean","boolean","object","object","boolean","boolean","object","object","boolean","object","string","boolean","string","boolean","boolean","object","object","string","object","boolean","object","boolean","string","boolean","boolean","object","boolean","string","string","boolean","string","boolean","boolean","boolean","boolean","boolean","boolean","string","string","boolean","boolean","number"],
//No I18n

	data : function(){
		return {
			
			cxPropTableProperties: Lyte.attr("object", { default: {} }),
			cxPropResizeFixedColumn: Lyte.attr('boolean', { default: false }),//No I18n
			/**
			 * Set to true to show sort icon irrespective of sortable value in field meta for lyte table component
			 * @componentProperty { boolean } cxPropEnableAllFieldSort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableAllFieldSort: Lyte.attr('boolean', { default: false }),//No I18n
			/**
			 * Set to true to enable cell intersection observes for the table cells. It will show the cell only when it is in viewport.
			 * @componentProperty { boolean } cxPropCellIntersection=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCellIntersection: Lyte.attr('boolean', { default: false }),//No I18n
			/**
			 * Set to true to render express table
			 * @componentProperty { boolean } cxPropExpress=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropExpress : Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * The array contains the header information like field label, ui type/data type, api_name etc.
			 * @componentProperty { array } cxPropHeader
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropHeader : Lyte.attr("array",{"input" : true}),//No I18n
			/**
			 * This array contains the data to be rendered in the body
			 * @componentProperty { array } cxPropContent
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropContent : Lyte.attr("array", {default : [] ,"input" : true}),//No I18n
			/**
			 * Set to true to render prefix for each row
			 * @componentProperty { boolean } cxPropYieldForPrefix=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropYieldForPrefix : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set to true to render suffix for each row
			 * @componentProperty { boolean } cxPropYieldForSuffix=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropYieldForSuffix : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropLabelSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLabelSelector : Lyte.attr("string", {default : "field_label"}),//No I18n
			/**
			 * @componentProperty { string } cxPropHeaderRowId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderRowId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropFilterComponent
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFilterComponent : Lyte.attr("string",{default:''}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowFilter=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowFilter : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropFilterShowClear=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropContentSearch : Lyte.attr("boolean", {default : true}),//No I18n
			cxPropSearchInputValue : Lyte.attr("string"),//No I18n
			cxPropSearchMaxlength : Lyte.attr("number"),//No I18n
			cxPropSearchPlaceholder : Lyte.attr("string"),//No I18n
			cxPropFilterShowClear : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropDualResize=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDualResize : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropHideHeaderOnNoContent=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropHideHeaderOnNoContent : Lyte.attr("boolean", {default : false , "input" : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropTableId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTableId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropSortColumns=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSortColumns : Lyte.attr("boolean"),//No I18n
			/**
			 * @componentProperty { string } cxPropSortedColumn
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSortedColumn : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropSortedOrder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSortedOrder : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropBodyId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropBodyId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropNoRecordsMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropNoRecordsMessage : Lyte.attr("string", {default : _cruxUtils.getI18n('crm.no.data.found') , "input" : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropNoRecordsZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropNoRecordsZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropColumnCellClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropColumnCellClass : Lyte.attr("string",{"input" : true}),//No I18n
			/**
			 * @componentProperty { array } cxPropSelectedRows
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSelectedRows : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { string } cxPropSelectedRowStyle
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSelectedRowStyle : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { object } cxPropFieldTypeMapping
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldTypeMapping : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { string } cxPropFieldTypeMappingSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldTypeMappingSelector : Lyte.attr("string", {default : "ui_type"}),//No I18n
			/**
			 * @componentProperty { array } header
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			header : Lyte.attr("array"),//No I18n
			/**
			 * @componentProperty { array } headerFields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			headerFields : Lyte.attr("array"),//No I18n
			/**
			 * @componentProperty { string } cxPropHeight
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeight : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } content
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			content : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropEnableBodyScroll=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableBodyScroll : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropZcqaSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqaSelector : Lyte.attr("string", {default : "field_label"}),//No I18n
			/**
			 * @componentProperty { string } cxPropRowZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRowZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropModule
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropModule : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { number } nextRender
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			nextRender : Lyte.attr("number", {default : 5}),//No I18n
			/**
			 * @componentProperty { boolean } new=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			new : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { number } cxPropDisplayRowNumber
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropDisplayRowNumber : Lyte.attr("number", {default : 1}),//No I18n
			/**
			 * @componentProperty { string } cxPropTableClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropTableClass : Lyte.attr("string", {default : "" , "input" : true}),//No I18n
			/**
			 * @componentProperty { array } cxPropPrefixYields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPrefixYields : Lyte.attr("array", {default : []}),// No I18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * @componentProperty { array } cxPropSuffixYields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSuffixYields : Lyte.attr("array", {default : []}),// No I18n
			/**
			 * @componentProperty { string } cxPropDataBind
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDataBind : Lyte.attr("string", {default : "false"}),//No I18n
			/**
			 * @componentProperty { string } cxPropHeaderIdSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderIdSelector : Lyte.attr("string", {default : "id"}),//No I18n
			/**
			 * @componentProperty { string } cxPropSelectedRowClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSelectedRowClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } showLoadingDown=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			showLoadingDown : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } showLoadingUp=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			showLoadingUp : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropHeaderYield
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderYield : Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { string } beingSorted
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			beingSorted : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } options
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			options : Lyte.attr("array"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowSortDropdown=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowSortDropdown : Lyte.attr("boolean", {default : true}), //no i18n
			/**
			 * @componentProperty { number } cxPropMaxcharacter
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxcharacter : Lyte.attr('number',{default : 0}), //no i18n
			/**
			 * @componentProperty { number } cxPropCheckboxPosition
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropCheckboxPosition : Lyte.attr("number", {default : -1}),//no i18n
			/**
			 * @componentProperty { boolean } cxPropResizeCheckbox=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropResizeCheckbox : Lyte.attr("boolean", {default : false}),//no i18n
			/**
			 * @componentProperty { string } cxPropFixCheckbox
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFixCheckbox : Lyte.attr("string", {default : "enable"}),//no i18n
			/**
			 * @componentProperty { object } cxPropModuleDisplayField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropModuleDisplayField : Lyte.attr("object", {default : {}}),//no i18n
			/**
			 * @componentProperty { boolean } cxPropNewListView=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropNewListView : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropIsAlphaSearchShown=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropIsAlphaSearchShown : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropPreventWidth=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPreventWidth : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropClipMode=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClipMode : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropStickyTable=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropStickyTable : Lyte.attr("boolean"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropTooltipProps
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipProps : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { boolean } beingResized=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			beingResized : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropHeaderTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderTooltipConfig : Lyte.attr("object", {default : {"position":"bottom"}}),//No i18n
			/**
			 * @componentProperty { string } cxPropHeaderTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropShowScrollOn
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowScrollOn : Lyte.attr("string", {default : "hover"}),//No I18n
			/**
			 * @componentProperty { boolean } telephonyEnabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			telephonyEnabled : Lyte.attr("boolean", {default : (typeof Crm != "undefined" ? Crm.userDetails.TELEPHONY_ENABLED : false)}),//No I18n
			/**
			 * @componentProperty { boolean } zpbEnabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			zpbEnabled : Lyte.attr("boolean", {default : (typeof Crm != "undefined" ? Crm.userDetails.ZPBENABLED : false)}),//No I18n
			//display_field_api_name : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropEnableSort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableSort : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropNoContentClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropNoContentClass : Lyte.attr("string",{"input" : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropEnableFieldSort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableFieldSort : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropZcqaWithId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqaWithId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowBusinessCard=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowBusinessCard : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowLoading=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowLoading : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowSortIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowSortIcon : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty { boolean } mouseOverTable=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			mouseOverTable : Lyte.attr('boolean'), //no i18n
			/**
			 * @componentProperty { object } cxPropLookupProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLookupProperties : Lyte.attr("object", {default : {routeName : "crm.tab.module.entity.detail"}}),
			/**
			 * @componentProperty { boolean } cxPropShowFilterIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowFilterIcon: Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * @componentProperty { object } cxPropDefaultFields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDefaultFields: Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropFreezeRow=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFreezeRow:  Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropAllRowsEditable=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAllRowsEditable: Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * @componentProperty { string } cxPropTableWidth
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTableWidth: Lyte.attr('string',{default:'100%'}),
			/**
			 * @componentProperty { string } cxPropPhoneIconTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPhoneIconTooltip : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.phoneNo.Link.Title")}),
			/**
			 * @componentProperty { boolean } cxPropRenderOnlyViewportRecords=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRenderOnlyViewportRecords : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropCurrency
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCurrency : Lyte.attr("string"),
			/**
			 * @componentProperty { number } cxPropExchangeRate
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropExchangeRate : Lyte.attr("number"),
			/**
			 * @componentProperty { object } cxPropNumberProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropNumberProperties : Lyte.attr("object"),
			/**
			 * @componentProperty { string } cxPropUserDetailViewPath
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropUserDetailViewPath : Lyte.attr("string", {default : (typeof Crm != "undefined" && Crm.getCrmBasePath() && Crm.getCrmBasePath().indexOf("crm") != -1) ? Crm.getCrmBasePath()+"/settings/users/" : ""}),
			/**
			 * @componentProperty { boolean } cxPropCellSuffixYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCellSuffixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropUserDetailViewPath
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropUserDetailViewPath : Lyte.attr("string", {default : (typeof Crm != "undefined" && Crm.getCrmBasePath() && Crm.getCrmBasePath().indexOf("crm") != -1) ? Crm.getCrmBasePath()+"/settings/users/" : ""}),
			/**
			 * @componentProperty { number } cxPropScrollRecordCount
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropScrollRecordCount : Lyte.attr("number"),
			/**
			 * @componentProperty { object } cxPropFormulaMapping
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFormulaMapping : Lyte.attr("object", {default : {currency : "number", text : "text",longinteger : "number", boolean : "boolean", "datetime" : "date-time", date : "date", double : "number" , decimal : "number" , integer : "number" }}),
			/**
			 * @componentProperty { boolean } cxPropViewPortLoading=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropViewPortLoading: Lyte.attr('boolean',{default:false}),
			/**
			 * @componentProperty { boolean } cxPropCellPrefixYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCellPrefixYield: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropShowSortIconOnHover
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowSortIconOnHover: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { object } cxPropTextareaProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTextareaProperties: Lyte.attr("object", {default : {popoverProperties:{}, highlightUrl : false}}),
			/**
			 * @componentProperty { object } cxPropFilterProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFilterProperties: Lyte.attr("object", {default : {}}),
			/**
			 * @componentProperty { boolean } cxPropCellZcqaWithRowNo=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCellZcqaWithRowNo : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropHeaderCellPrefixYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderCellPrefixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { object } cxPropDateProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDateProperties:  Lyte.attr("object"),
			/**
			 * @componentProperty { object } cxPropDatetimeProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDatetimeProperties:  Lyte.attr("object"),
			/**
			 * @componentProperty { boolean } cxPropComparator=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropComparator	: Lyte.attr("boolean", {default : true}),
			/**
			 * @componentProperty { boolean } cxPropImageProperties
			 * @author gowtham.mp
			 * @version 1.0.0
			 */
			cxPropImageProperties	: Lyte.attr("object"),
			cxPropTwitterUrl : Lyte.attr("string", {default : (typeof RebrandLinkUtil !== "undefined" ? RebrandLinkUtil.getProperty("TW_URL") : "")}),
			cxPropShowNoRecordsMessage: Lyte.attr("boolean", {default : false}),
			cxPropRole : Lyte.attr('string', {default : 'grid'}),
			cxPropAria : Lyte.attr('boolean', {default : false}),
			/**
			 * @componentProperty { boolean } cxPropEditMode=true
			 * @author gowtham.mp
			 * @version 1.0.0
			 */
			cxPropEditMode	: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropCellProperties=false
			 * @author gowtham.mp
			 * @version 1.0.0
			 */
			cxPropCellProperties : Lyte.attr("object"),
				/**
			 * @componentProperty { object } cxPropNumberProperties
			 * @author gowtham.mp
			 * @version 1.0.0
			 */
			cxPropUserProperties : Lyte.attr("object"),

			cxPropHeaderZcqaPrefix : Lyte.attr("string"),

			cxPhoneProperties: Lyte.attr("object"),

			cxPropErrorOnHovercard: Lyte.attr("boolean"),
			cxPropCellProperties: Lyte.attr("object"),
			cxPropFooterYield: Lyte.attr("boolean"),
			cxPropTableWrapperClass : Lyte.attr("string"),
			cxPropIsRtlEnabled: Lyte.attr('boolean',{default:typeof Crm!=="undefined"?Crm.userDetails.RTL_ENABLED:false}),
			cxPropCustomCopy: Lyte.attr("boolean"),
			cxPropHeaderProperties : Lyte.attr("object" , {default : {}}),
			cxPropShowMandatoryOnHeader: Lyte.attr("boolean"),
			cxPropSortZcqaPrefix: Lyte.attr("string"),
			cxPropRecordId: Lyte.attr("string"),
			cxPropResetScroll: Lyte.attr("boolean", {default : true}),
			cxPropIntersectionType: Lyte.attr("string",{default:'cell'}),
			cxPropResetExpressScroll: Lyte.attr("boolean", {default : false}),
			isSlyteTable: Lyte.attr('boolean'),

			/* hide template tags */
			cxPropHideTemplate : Lyte.attr('boolean'),
			cxPropMaskUnmaskIcon : Lyte.attr("boolean",{ default : true }),
			cxPropIsMaskingFeatureEnabled : Lyte.attr("boolean",{default : (typeof Crm !== "undefined" ? Crm.isMaskingFeatureEnabled : false)}),
			showEmMaskUnmaskIcon : Lyte.attr("boolean",{default :false}),
			cxPropTableWrapperClass : Lyte.attr("string"),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			/**
			 * @componentProperty { boolean } cxPropSuffixHeader=false
			 * @author silambarasan.rt
			 */
			cxPropSuffixHeader : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropFullYield=false
			 * @author mahalakshmi
			 */
			cxPropFullYield : Lyte.attr("boolean", {default : false}),
			headerTabIndex: Lyte.attr("number",{default:0})

		}
	},
	init: function(){
		this.setData('isSlyteTable',this.$node && (this.$node.hasAttribute('pb-css-id') || this.$node.hasAttribute("comp-in-parent")) && (_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard));
		if(this.data.isSlyteTable){
			if((!this.getData('cxPropFieldTypeMapping') || Object.keys(this.getData('cxPropFieldTypeMapping')).length === 0) || !this.getData('cxPropFieldTypeMappingSelector')){
				this.setData('cxPropFieldTypeMappingSelector','data_type');
				this.setData('cxPropFieldTypeMapping',{"layout":"layout","autonumber":"text","multiselectpicklist":"text","textarea":"text","text":"text","phone":"text","email":"text","mobile":"text","website":"text","decimal":"number","integer":"number","bigint":"number","double":"number","currency":"number","picklist":"picklist","datetime":"date","date":"date","multiuserlookup":"user","ownerlookup":"user","userlookup":"user","boolean":"boolean","lookup":"text","date_time":"date-time","longinteger":"number","user":"user"});
			}
			if(!this.getData('cxPropDateProperties')){
				this.setData('cxPropDateProperties',{dateInUserPattern:false});
			}
			if(!this.getData('cxPropDatetimeProperties')){
				this.setData('cxPropDatetimeProperties',{datetimeInUserPattern:false});
			}
		}
	},
	isSelected : function() {
		return window.getSelection().isCollapsed == false;
	},
	actions : {

		toggleAccordion : function( data, elem ){

			var isAccOpen = elem.closest("lyte-exptable-tbody");
			if(isAccOpen && isAccOpen.className && isAccOpen.className.includes('lyteExpTbodyClosed')){
				isAccOpen = false;
			}else{
				isAccOpen = true;
			}

			var toggleAcc = true;
			if(!isAccOpen && this.getMethods("onBeforeOpen")){
				/**
				 * @method onBeforeOpen
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				toggleAcc = this.executeMethod("onBeforeOpen");//No I18n
			}else if(isAccOpen && this.getMethods("onBeforeClose")){
				/**
				 * @method onBeforeClose
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				toggleAcc = this.executeMethod("onBeforeClose");//No I18n
			}
			toggleAcc = (toggleAcc===undefined)?true:toggleAcc;
			if(toggleAcc){
			var exp_table = elem.closest('lyte-expresstable');
			if(!data.cxPropContent.length){
				Lyte.objectUtils( data , "add" , "cxPropContent" , data.content );
				exp_table.reset();
				}
				else{
					exp_table.toggleRows( elem.closest( 'lyte-exptable-tbody' ) );
					if(!isAccOpen && this.getMethods("onOpen")){
						/**
						 * @method onOpen
						 * @author mariswaran.sv
						 * @version 1.0.0
						 */
						this.executeMethod("onOpen");//No I18n
					}else if(isAccOpen && this.getMethods("onClose")){
						/**
						 * @method onClose
						 * @author mariswaran.sv
						 * @version 1.0.0
						 */
						this.executeMethod("onClose");//No I18n
					}
				}
			}
    		
    	},
		sort : function(field,event){
			if(!this.data.cxPropShowSortIcon){
				this.sortFn(field,event);
			}
		},
		sortIconClick : function(field,event){
			this.sortFn(field,event);
		},
		onRowClick : function(row,event){
			if(this.isSelected() || event.target.classList.contains("cruxPreventClick")) {
				return false;
			}
			// if(this.$node._actions["on-body-row-click"]){
				/**
				 * @event on-body-row-click
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } row
				 * @param { * } event
				 */
				this.throwEvent("on-body-row-click", row,event);//No I18n
			// }
		},
		onMouseOver : function(id, self,row){
			// if(this.$node._actions["on-mouse-over"]){
				/**
				 * @event on-mouse-over
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } rowObject
				 */
				if(this.data.isSlyteTable){
					this.throwEvent("on-mouse-over", row);//No I18n
				}else{
					this.throwEvent("on-mouse-over",id, self);//No I18n
				}
			// }
		},
		onMouseOut : function(id, self,row){
			// if(this.$node._actions["on-mouse-out"]){
				/**
				 * @event on-mouse-out
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } rowObject
				 */
				if(this.data.isSlyteTable){
					this.throwEvent("on-mouse-out", row);//No I18n
				}else{
					this.throwEvent("on-mouse-out", id, self);//No I18n
				}
			// }
		},
		scroll : function(ev){
			var body = ev.target;
			if(this.getData('beingResized')){
				return;
			}
			if(this.getMethods("onScroll")){
				/**
				 * @method onScroll
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { number } contentLength - Number of rows currently rendered in the table.
				 */
				this.executeMethod("onScroll", this.data.content.length);//No I18n
			}
			if(this.getData("new")){
				this.fetchNextDataNew(body);
				// this.fetchNextData(body);
			}
			else if(this.moreContent && (body.scrollHeight-300 <= (Math.ceil(body.offsetHeight) + Math.ceil(body.scrollTop)))){
				this.scrollTop = body.scrollTop;
				this.moreContent = false;
				var more = this.getData("cxPropContent").slice(this.rendered, this.getData("nextRender")+this.rendered);//No I18n
				if(more && more.length){
					Lyte.arrayUtils(this.getData("content"), "push", more);//No I18n
					this.rendered += more.length;//No I18n
					this.moreContent = true;
					this.scrollTable();
					if(this.getMethods("onScrollRecordsHaveBeenRendered")){
						// /**
						//  * @method onScrollRecordsHaveBeenRendered
						//  * @author anuja.manoharan
						//  * @version 1.0.0
						//  */
						this.executeMethod("onScrollRecordsHaveBeenRendered");//No I18n
					}
				}
				else if(this.getMethods("onScrollFetchMoreRecords")){
					// /**
					//  * @method onScrollFetchMoreRecords
					//  * @author anuja.manoharan
					//  * @version 1.0.0
					//  */
					this.executeMethod("onScrollFetchMoreRecords", this.rendered).then(function(res){//No I18n
						if(res && res.length){
							Lyte.arrayUtils(this.getData("content"), "push", res);//No I18n
							this.rendered+=res.length;
							this.moreContent = true;
							this.scrollTable();
						}
						else{
							this.moreContent = false;
						}
						if(this.getMethods("onScrollRecordsHaveBeenRendered")){
							// /**
							//  * @method onScrollRecordsHaveBeenRendered
							//  * @author anuja.manoharan
							//  * @version 1.0.0
							//  */
							this.executeMethod("onScrollRecordsHaveBeenRendered");//No I18n
						}
					}.bind(this))
				}
			}
		},
		getOnMouseDown : function(event){
			if(event.target.tagName === "LYTE-TABLEHEAD-RESIZE") {
				$L(event.target).closest('lyte-th').addClass('resizeStart'); //No i18N
			}
		},
		hoverOnTh : function(ele, show){
			var elem = this.$node.querySelector(".cxPropTh"+(ele-1));//No i18N
			if(elem){
				if(show){
					elem.classList.add("nLThHover");//No i18N
				}
				else{
					elem.classList.remove("nLThHover");//No i18N
				}
			}
			if(this.data.cxPropShowSortIconOnHover){
				elem = this.$node.querySelector(".cxPropTh"+ele+" .cxTableSortIcon");
				if(show){
					elem.classList.remove("cxTableSortIconHide");
				}
				else{
					elem.classList.add("cxTableSortIconHide");
				}
			}

		},
		phoneClick : function(row, field){
			Lyte.registeredMixins["crux-element-validation"].phoneClick(row[field.api_name],this.getData('cxPropRecordId') ?  this.getData('cxPropRecordId') : row.id, this.data.cxPropModule, row[moduleRecordMapping[this.data.cxPropModule].display_field.api_name]);
		},
		stopEvent : function(){
			event.preventDefault();
		},
		hoverOnTable : function(index,over){
			this.setData('mouseOverTable',over);
		},
		toggleFilter: function(){
			this.throwEvent("toggle-filter");//No I18n
		},
		showSortIcon : function(index, show){
			var elem;
			if(this.data.cxPropShowSortIconOnHover && (elem = this.$node.querySelector(".cxPropTh"+index+" .cxTableSortIcon"))){
					if(show){
						elem.classList.remove("cxTableSortIconHide");
					}
					else{
						elem.classList.add("cxTableSortIconHide");
					}
			}
		}
	},
	sortFn : function(field,ev){
		let eventClone = {target : ev.target};
		if(this.isSelected()) {
			return false;
		}
		clearTimeout(this.sortTimer);
		this.sortTimer = setTimeout(function(){
			if(this.beingResized){
				clearTimeout(this.sortTimer);
				return false;
			}
			if(!this.getData("cxPropShowSortDropdown")){
				this.triggerSortClick(field, ev);
			}
			// else if(this.getData("cxPropEnableSort")){
			// 	this.performSort(field);
			// }
			else if(this.getData("cxPropSortColumns") == true){
				// /**
				//  * @event on-sort
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } field
				//  * @param { * } event
				//  */
				this.throwEvent("on-sort", field, ev , eventClone);//No I18n
			}
		}.bind(this), 100);
	},
	checkIfRowPresent: function(rowIdx){
		let originalContent = this.getData('cxPropContent'), content = this.getData('content');
		if(rowIdx>content.length-1 && rowIdx+1<originalContent.length){
			Lyte.arrayUtils(content,'push',originalContent.slice(content.length,rowIdx+1));
			this.rendered = rowIdx+1;
		}
	},
	scrollToCell: function(rowIdx,colIdx,scrollIfNeeded=true){
		if(!Number.isInteger(rowIdx) && !Number.isInteger(colIdx)){
			return
		}
		let rowElem,columnElem,newScrollLeft,newScrollTop;
		let table = this.$node.querySelector('lyte-table'),headElem = this.$node.querySelector('lyte-thead');
		let tableHeight = table.offsetHeight, tableWidth = table.offsetWidth;
		let scrollDiv = table.querySelector('.lyteTableScroll');
		if(Number.isInteger(rowIdx)){
			this.checkIfRowPresent(rowIdx);
			rowElem = this.$node.querySelector(`.tablecomponent2 lyte-tr:nth-child(${rowIdx+1})`);
			if(rowElem && headElem){
				//if scroll if needed is true, we have to check if the row is hidden and then srcolled
				if((scrollIfNeeded && !(	scrollDiv.scrollTop < (rowElem.offsetTop-headElem.offsetHeight) && (scrollDiv.scrollTop > rowElem.offsetTop-(tableHeight-headElem.offsetHeight))	)) || !scrollIfNeeded){		
					newScrollTop = rowElem.offsetTop-headElem.offsetHeight;
				}
			}
		}
		if(Number.isInteger(colIdx) && headElem){
			columnElem = headElem.querySelector(`lyte-th:nth-child(${colIdx+1})`);
			if(columnElem){
				let offLeft = columnElem.offsetLeft;
				let scrollLeft = scrollDiv.scrollLeft;
				let fixedColumnWidth = 0;
				//checking if there are any fixed columns
				headElem.querySelectorAll("lyte-th[fixed='enable']").forEach((elem)=>{
						fixedColumnWidth += elem.offsetWidth;
				})
				if(this.getData('cxPropIsRtlEnabled')){
					offLeft = scrollDiv.scrollWidth - (offLeft+columnElem.offsetWidth);
					scrollLeft *= -1;
				}
				if((scrollIfNeeded && !(	scrollDiv.scrollLeft < (offLeft-fixedColumnWidth) && (scrollDiv.scrollLeft > offLeft-(tableWidth-fixedColumnWidth))	)) || !scrollIfNeeded){
					newScrollLeft = offLeft - fixedColumnWidth;
					newScrollLeft = this.getData('cxPropIsRtlEnabled') ? -1*newScrollLeft : newScrollLeft;
				}
			}
		}
		table.scrollTable(newScrollLeft,newScrollTop);	
	},
	focusElement: function(rowIdx=0,colIdx=0){
		var elem = this.$node.querySelector(`#row${rowIdx}_column${colIdx}`);
		if(elem){
			elem.focus();
		}
	},
	validateElements: function(){
		let rowElems = this.$node.querySelectorAll('.tablecomponent2 lyte-tr'), isValid = true,focused; //eslint-disable-line @zoho/webperf/no-complex-selector
		rowElems.forEach((rowElem,idx)=>{
			rowElem.children.forEach((cellElem,celIdx)=>{
				if(cellElem){
					let elem = cellElem.firstElementChild;
					if(elem.classList.contains('cxEditElement')){
						isValid = elem.component.validate() && isValid;
						if(!focused && !isValid){
							this.scrollToCell(idx,celIdx);
							elem.focus();
							focused = true;
						}
					}
				}
			});
		});
		return isValid;
	},
	didConnect : function(){
//To add a common class for the Crux table element to achieve "no result" handling by Karthipan
		this.$node.classList.add('cxTableContainer');
		this.$node.focus = (rowIdx,colIdx)=>{
			this.focusElement(rowIdx,colIdx);
		};
		this.$node.validate = ()=>{
			return this.validateElements();
		};
		this.$node.scrollElemIntoView  = (rowIdx,coldIx,scrollIfNeeded)=>{
			this.scrollToCell(rowIdx,coldIx,scrollIfNeeded);
		}
		this.$node.resize = ()=>{
			this.checkIfMoreRecordsNeeded();
		}
		// $L(this.$node).scroll({showOn : "scroll", handlerClass : "scrollbarClass", containerClass : "scrollbarClass"});//No I18n
		if (this.pos && this.pos > 2 && !this.data.cxPropExpress) { // this.pos > 2 added, since it scrolls the 1st element always -> temp fix
			this.$node.querySelector(".lyteTableScroll").scrollTop = this.$node.querySelectorAll("lyte-tr")[this.pos].offsetTop;//No I18n
		}
		if(this.getData("cxPropEnableBodyScroll")){
			this.boundEvent = this.resize.bind(this);
			window.addEventListener("resize", this.boundEvent, true);
		}
		// this.$node.insertContent = function(index, contentarray){
		// 	Lyte.arrayUtils(this.getData("content"), "insertAt", index, contentarray);
		// 	this.scrollTable();

		// },
		// this.$node.showLoadingDown = function(val){
		// 	this.setData("showLoadingDown", val);
		// }
		this.$node.maskUnmask=(api_name,unmask)=>{
			this.maskUnmask(api_name,unmask);
		};
		this.checkIfMoreRecordsNeeded();
	},
	checkIfMoreRecordsNeeded: function(){
		if(this.data.cxPropEnableBodyScroll && !this.data.cxPropScrollRecordCount
		&& !this.data.cxPropExpress 
		&& this.data.content && this.data.cxPropContent
		&& this.data.content.length!==this.data.cxPropContent.length
		&& this.data.new){
			let scrollDiv = this.$node.querySelector('.lyteTableScroll');
			if(scrollDiv){
				let clientHeight = scrollDiv.clientHeight;
				let rowCount = Math.ceil((clientHeight)/this.minHeightOfRow);
				if(rowCount > this.data.content.length){
					let diff = rowCount - this.data.content.length;
					Lyte.arrayUtils(this.getData("content"), "push", this.getData("cxPropContent").slice(this.endIndex,this.endIndex+diff));//No I18n
					this.maxRenderCount = rowCount;
					this.endIndex+=diff;//No I18n
				}
			}
		}
	},
	observeFields : function(){
		if(!this.data.cxPropHeader){
			this.data.cxPropHeader = [];
		}
		this.setData('intPinnedColumn',"");
		var header = this.data.cxPropHeader.slice(0);//No I18n
		var mapping = this.data.cxPropFieldTypeMapping;//NO I18n
		var subTypeMapping = {'text':{medium:'text-area',large:'text-area'}}
		var selector = this.data.cxPropFieldTypeMappingSelector;//NO I18n
		var formulaMapping = this.data.cxPropFormulaMapping;//No I18n
		for(var i=0; i<header.length; i++){
			// if( !this.data.cxPropHeaderProperties.hasOwnProperty(header[i].id) ){
			// 	this.data.cxPropHeaderProperties[header[i].id] = {};
			// }
			if(header[i].cxPropPinned){
				this.setData('intPinnedColumn',header[i].id);
			}
			if(header[i].ui_type == 116 && subTypeMapping[formulaMapping[header[i].formula.return_type]] && subTypeMapping[formulaMapping[header[i].formula.return_type]][header[i].formula.sub_return_type]){
				header[i].cxTypeMapping = subTypeMapping[formulaMapping[header[i].formula.return_type]][header[i].formula.sub_return_type];
			}
			else if(header[i].ui_type == 116 || header[i].ui_type == 117){
				header[i].cxTypeMapping = formulaMapping[header[i].formula.return_type];
			}
			else if(header[i].ui_type == 118){
				header[i].cxTypeMapping = formulaMapping[header[i].rollup_summary.return_type];
			}
			else if(!header[i].custom_field && (header[i].api_name === "Solution_Number" || header[i].api_name === "Quote_Number" || !mapping[header[i][selector]] || header[i].api_name === "Invoice_Number" || header[i].api_name === "Case_Number" || header[i].api_name === "SO_Number")){
				header[i].cxTypeMapping = "text";
			}
			else if((header[i].ui_type == 333 || header[i].ui_type == 14 || header[i].ui_type == 786) && this.getData("cxPropModule") == "Activities"){
				header[i].cxTypeMapping = "allday";
			}
			else{
				header[i].cxTypeMapping = mapping[header[i][selector]];
			}
			if(this.data.cxPropIsAlphaSearchShown && this.data.cxPropModuleDisplayField[this.data.cxPropModule] && this.data.cxPropModuleDisplayField[this.data.cxPropModule].indexOf(header[i].api_name) > -1){
				header[i].cxShowDropdown = true;
			}
			if(this.getData('cxPropEditMode')){
				this.copyProperties(header[i],this.getData(`cxProp${header[i].cxTypeMapping.charAt(0).toUpperCase()+header[i].cxTypeMapping.substring(1)}Properties`));
			}
		}
		if(this.data.cxPropYieldForPrefix == true || this.data.cxPropYieldForSuffix == true){
			var prefixYields , prefixLength , suffixYields , suffixLength;
			if(this.getData("cxPropHeaderYield")){
				prefixYields = this.getData("cxPropHeaderYield").prefix ? this.getData("cxPropHeaderYield").prefix : [] , prefixLength = prefixYields.length;//eslint-disable-line no-unused-expressions
				for(i=0; i < prefixLength; i++){
					header.splice(i, 0, {yield : true, fixed : prefixYields[i].fixed, width : prefixYields[i].width, yieldName : "prefix-"+(i+1),
						style : prefixYields[i].style, cxPropClass : prefixYields[i].class})
				}
				suffixYields = this.getData("cxPropHeaderYield").suffix ? this.getData("cxPropHeaderYield").suffix : [] , suffixLength = suffixYields.length;//eslint-disable-line no-unused-expressions
				for(i=0; i<suffixLength; i++){
					header.push({yield : true, fixed : suffixYields[i].fixed, width : suffixYields[i].width, yieldName : "suffix-"+(i+1),
						style : suffixYields[i].style, cxPropClass : suffixYields[i].class})
				}
			}
			else if((this.data.cxPropPrefixYields && this.data.cxPropPrefixYields.length > 0) || (this.data.cxPropSuffixYields && this.data.cxPropSuffixYields.length > 0)){
				prefixYields = this.data.cxPropPrefixYields , prefixLength = prefixYields.length; //eslint-disable-line no-unused-expressions
				for(i=0; i < prefixLength; i++){
					header.splice(i, 0, {yield : true, fixed : prefixYields[i].fixed, width : prefixYields[i].width, yieldName : "prefix-"+(i+1),
						style : prefixYields[i].style, cxPropClass : prefixYields[i].class})
				}
				suffixYields = this.data.cxPropSuffixYields , suffixLength = suffixYields.length; //eslint-disable-line no-unused-expressions
				for(i=0; i<suffixLength; i++){
					header.push({yield : true, fixed : suffixYields[i].fixed, width : suffixYields[i].width, yieldName : "suffix-"+(i+1),
						style : suffixYields[i].style, cxPropClass : suffixYields[i].class})
				}
			}else{
				var count = 1;
				var prefix = this.$node.querySelector("template[yield-name='header-prefix-"+count+"']");//No I18n
				var suffix = this.$node.querySelector("template[yield-name='header-suffix-"+count+"']");//No I18n
				if(prefix || suffix){
					var start = 0, end = 1;
					while(prefix || suffix){
						if(prefix){
							header.splice(start, 0, {yield : true, fixed : prefix.getAttribute("cx-prop-fixed"), width : prefix.getAttribute("cx-prop-width"),
								yieldName : "prefix-"+(start+1), style : prefix.getAttribute("cx-prop-style")});//No I18n
							start++;
						}
						if(suffix){
							header.push({yield : true, fixed : suffix.getAttribute("cx-prop-fixed"), width : suffix.getAttribute("cx-prop-width"),
								yieldName : "suffix-"+end, style : suffix.getAttribute("cx-prop-style")});//No I18n
							end++;
						}
						count++;
						prefix = this.$node.querySelector("template[yield-name='header-prefix-"+count+"']");//No I18n
						suffix = this.$node.querySelector("template[yield-name='header-suffix-"+count+"']");//No I18n
					}
				}
			}
		}
		if(this.data.cxPropCheckboxPosition > -1){
			header.splice(this.data.cxPropCheckboxPosition, 0, {cxCheckbox : true, fixed : "enable"});//no i18n
		}
		this.setData("header", header);//No I18n
		var headerFields = header.slice(0)
		this.setData('headerFields',headerFields)//No I18n
		// this.setData("display_field_api_name", (this.data.cxPropModule && (typeof moduleRecordMapping != "undefined") && moduleRecordMapping[this.data.cxPropModule].display_field) ? moduleRecordMapping[this.data.cxPropModule].display_field.api_name : "");//No I18n
	}.observes("cxPropHeader", "cxPropPrefixYields", "cxPropSuffixYields", "cxPropHeaderYield", "cxPropYieldForPrefix", "cxPropYieldForSuffix").on("init"),//No I18n
	copyProperties: function(header,properties){
		if(properties){
			let cxProp = {};
			let apiSet = new Set();
			if(this.getData('cxPropHeader') && this.getData('cxPropHeader').length){
				this.getData('cxPropHeader').forEach((head)=>{ apiSet.add(head.api_name); });
			};
			Object.keys(properties).filter((prop)=> !apiSet.has(prop.api_name)).forEach((prop)=>{
				cxProp[prop] = properties[prop];
			});
			if(properties[header.api_name]){
				let fieldProp = properties[header.api_name];
				Object.keys(fieldProp).forEach((prop)=>{
					cxProp[prop] = fieldProp[prop];
				});
			}
			header.cxProp = JSON.stringify(cxProp);
		}
	},
	minHeightOfRow : 37,
	validateDisplayRowNumber : function() {
        if(this.data.cxPropDisplayRowNumber == undefined || isNaN(this.getData("cxPropDisplayRowNumber"))) {
            this.setData('cxPropDisplayRowNumber',1);//No I18n
        }
    }.observes('cxPropDisplayRowNumber').on('init'),//No I18n
	observeContent : function(change){
		if(this.obj) {
			clearInterval(this.obj.interval);
		}
		if(this.obju) {
			clearInterval(this.obju.interval)
		}
		this.clearValues();
		this.obj = undefined;
		this.obju = undefined;
		if(!this.data.cxPropContent){
			this.data.cxPropContent = [];
		}
		this.data.renderedGroups = [];
		var groupTable = this.data.cxPropContent.length && this.data.cxPropContent[0].cxGroupName ? true : false;
		if(this.data.cxPropEnableBodyScroll == true){
			this.maxRenderCount = Math.ceil(window.innerHeight/this.minHeightOfRow);		
			var halfCount = this.data.cxPropContent.length/2;
			if(halfCount >= 50){
				halfCount = 50;
			}
			if(this.data.cxPropScrollRecordCount){
				this.maxRenderCount = this.data.cxPropScrollRecordCount;
			}
			else if(halfCount >= this.maxRenderCount && !this.data.cxPropRenderOnlyViewportRecords){
				this.maxRenderCount = Math.ceil(halfCount);
				this.setData("showLoadingDown", true);//No I18n
			}
			if(this.data.new){
				this.upContent = true;
				this.downContent = true;
				this.startIndex = this.data.cxPropDisplayRowNumber >= (this.data.cxPropContent.length -5) ? this.data.cxPropDisplayRowNumber - this.maxRenderCount : this.data.cxPropDisplayRowNumber -5;
				if(this.startIndex <= 0){
					this.startIndex = 0;
					this.upContent = false;
				}
				if(this.startIndex != 0){
					this.setData("showLoadingUp", true);//No I18n
				}
				this.endIndex = this.startIndex+this.maxRenderCount;
				if(this.endIndex >= this.data.cxPropContent.length){
					var diff = this.endIndex-this.data.cxPropContent.length;
					this.startIndex = this.startIndex-diff;
					if(this.startIndex <= 0){
						this.startIndex = 0;
						this.upContent = false;	
						this.setData("showLoadingUp", false);
					}
					this.setData("showLoadingDown", false);// No I18n
				}
				else{
					this.setData("showLoadingDown", true);// No I18n
				}
				this.pos = this.data.cxPropDisplayRowNumber-this.startIndex;//No I18n
				var more = this.data.cxPropContent.slice(this.startIndex, this.endIndex);
				for(var i=0; i<more.length; i++){
					delete more[i].hideRecord;
				}
				if(groupTable){
					more[this.startIndex].cxPropContent = more[this.startIndex].content.slice(this.startIndex,more[this.startIndex].per_page);
					// for( var i =this.startIndex+1 ; i<more.length; i++ ){
					// 	more[this.startIndex+i].cxPropContent = []
					// }
					
				}
				this.setData("content", more);//No I18n
				this.endIndex = this.endIndex - 1;
				if(change){
					this.checkIfMoreRecordsNeeded();
				}
				if(this.getData("showLoadingUp") == true){
					$L.fastdom.mutate(function(){
						var width = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").clientWidth;//No i18n
						var ele = this.$node.querySelectorAll(".cxTableLoadingDiv");//No i18n
						for(var i=0; i<ele.length; i++){
							ele[i].style.width = width+"px";
						}
						var more = this.getData("cxPropContent").slice(0, this.startIndex);//No I18n
						if(more && more.length){
							this.countDown = 0;
							this.intervalDown = setInterval(function(){
								for(var i=0; i<2; i++){
									if(more[this.countDown]){
										more[this.countDown].hideRecord = true;
										Lyte.arrayUtils(this.getData("content"), "insertAt", this.countDown, more[this.countDown]);// No I18n
										this.countDown++;
									}
									else{
										clearInterval(this.intervalDown);
										var rows = document.querySelectorAll(".cruxHideRow");//No I18n
										for(var j=0; j<rows.length; j++){
											rows[j].classList.remove("cruxHideRow");
										}
										//this.$node.querySelector("lyte-expresstable").fixRowHeight();//No I18n
										//this.$node.querySelector("lyte-expresstable").setHeaderWidth();//No I18n
										this.$node.querySelector("lyte-expresstable") ? this.$node.querySelector("lyte-expresstable").contentObserver() : "";//No I18n
										// var height = (more.length)*this.minHeightOfRow;
										// this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").scrollTop = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").scrollTop+height;//No I18n
										// var height = (this.getData("cxPropDisplayRowNumber")+1)*this.minHeightOfRow;//No I18n
										// var height = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .lyteExpTableRowGroup lyte-exptable-tr:nth-child(11)").offsetTop-this.minHeightOfRow;//No I18n
										// this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").scrollTop = height;//No I18n
										// var height = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .lyteExpTableRowGroup lyte-exptable-tr:nth-child(11)").offsetTop;//No I18n
										this.setData("showLoadingUp", false);//No I18n
										if(this.getMethods("onScrollSetLatestEntityPosition")){
											// /**
											//  * @method onScrollSetLatestEntityPosition
											//  * @author anuja.manoharan
											//  * @version 1.0.0
											//  */
											this.executeMethod("onScrollSetLatestEntityPosition");//No I18n
										}
										if(this.getMethods("onScrollRecordsHaveBeenRendered")){
											// /**
											//  * @method onScrollRecordsHaveBeenRendered
											//  * @author anuja.manoharan
											//  * @version 1.0.0
											//  */
											this.executeMethod("onScrollRecordsHaveBeenRendered");//No I18n
										}
									}
								}
							}.bind(this), 10);
						}
					}.bind(this))
				}
			}
			else{
				this.rendered = 0;
				this.moreContent = true;


				if(change && change.hasOwnProperty('index')){
					if(this.data.cxPropContent!=this.data.content){ //eslint-disable-line eqeqeq, @zoho/zstandard/proper-usage-of-if
						if(change.index<=this.data.content.length){
							if(change.removedItems){
								Lyte.arrayUtils(this.data.content,'removeAt',change.index,change.removedItems.length);
							}
							if(change.insertedItems){
								Lyte.arrayUtils(this.data.content,'insertAt',change.index,change.insertedItems);
							}
						}
					}else{
						this.setData("content", this.data.cxPropContent);//No I18n
					}

				}else{
					if(this.data.cxPropContent.length > this.maxRenderCount){
						this.setData("content", this.data.cxPropContent.slice(0,this.maxRenderCount));//No I18n
					}else{
						this.setData("content", this.data.cxPropContent);//No I18n
					}
				}
				this.rendered = this.data.content.length;//No I18n

			}
		}
		else{
		var table_data = this.data.cxPropContent;
		if(groupTable){
			table_data[0].cxPropContent = table_data[0].content.slice(0,table_data[0].per_page);
			var table_data_len = table_data.length;
			for( var j = 1; j < table_data_len; j++ ){
				table_data[j].cxPropContent = [];
			}
		}
			this.setData("content", table_data);//No I18n
			this.moreContent = false;

			if($L('.lyteTableScroll',this.$node) && this.data.mouseOverTable){
				$L('.lyteTableScroll',this.$node).resetScrollbar()//No I18n
			}
		}
		let tableScroll = this.$node.querySelector(".lyteTableScroll")
		if(!this.getData('cxPropEditMode') && tableScroll){
		_cruxUtils.addMurhyInfo("crux-table-component.js", "Feb Default Changes");
			$L.fastdom.mutate(function(){
				tableScroll.scrollLeft = 0;//No I18n
				tableScroll.scrollTop = 0;//No I18n
			})
		}
		let expressTable = this.$node.querySelector("lyte-expresstable");
		if(expressTable){
			if(this.getData('cxPropResetExpressScroll')){
				expressTable.scrollTo(0,0);
			}
			expressTable.reset();
		}
		this.data.content.length ? this.$node.classList.remove('cxTableNoContent') : this.$node.classList.add('cxTableNoContent');
	}.observes("cxPropContent.[]").on("init"),//No I18n 
	resize : function(event){
		clearTimeout(this.timeout);
		var self = this;
		this.timeout = setTimeout(function(){
			var noOfRows = Math.ceil(window.innerHeight/self.minHeightOfRow);
			if(self.getData("new")){
				if(noOfRows > self.maxRenderCount){
					self.maxRenderCount = noOfRows;
					self.fetchNextDataNew(document.querySelector(".lyteTableScroll"))//No I18n
					// self.fetchNextData(document.querySelector(".lyteTableScroll"));//No i18n
				}
			}
			else if(self.moreContent && noOfRows > self.rendered && self.getData("cxPropContent")){
				Lyte.arrayUtils(self.getData("content"), "push", self.getData("cxPropContent").slice(self.rendered, noOfRows));//No I18n
				self.maxRenderCount = self.rendered = noOfRows;
			}
		}, 300);
	},
	maskUnmask:function(api_name,unmask){
		if( this.data.cxPropDataBind==="lyteFastRender"){
			const header = [...this.data.cxPropHeader];
    		const index = header.findIndex(item => item.api_name === api_name);
			if (index !== -1) {
				header[index].unmask = unmask; 
				this.setData("cxPropHeader", header);
			}
			var content=this.data.cxPropContent;
			let resetNeeded;
			if(this.getData('cxPropExpress') && this.getData('cxPropResetExpressScroll')){
				this.setData('cxPropResetExpressScroll',false);
				resetNeeded = true;
			}
			this.setData("cxPropContent",[]);
			this.setData("cxPropContent",content);
			if(resetNeeded){
				this.setData('cxPropResetExpressScroll',true);
			}
		}else{
			var curr_obj=this.data.cxPropHeader.filter((item)=>item.api_name === api_name);
			Lyte.objectUtils( curr_obj[0] , "add" , "unmask" , unmask );
		}
	},
	didDestroy : function(){
		window.removeEventListener("resize", this.boundEvent, true);
		if(this.obj) {
			clearInterval(this.obj.interval);
		}
		if(this.obju) {
			clearInterval(this.obju.interval)
		}
		clearInterval(this.intervalUp);
		clearInterval(this.intervalDown);
		this.removeUnmaskProps();
		this.obj = undefined;
		this.obju = undefined;
		if(document.getElementById("cxTableSortMenu")){
			document.getElementById("cxTableSortMenu").remove();
		}
	},
	removeUnmaskProps : function(){
		let header = this.data.cxPropHeader || [];
		header.forEach((fld)=>{
			delete fld.unmask;
		});
	},
	scrollTable : function(left, top){
		if(!this.getData("cxPropExpress")){
			var table = this.$node.querySelector("lyte-table");//No I18n
			delete table._scrolldiv._alive
			if(top){
				table.scrollTable(left, top);
			}
			else{
				table.scrollTable();
			}
		}else{
			this.$node.querySelector("lyte-expresstable") ? this.$node.querySelector("lyte-expresstable").reset() : "";
		}
	},
	fetchNextData :  function(body){
		// clearTimeout( this._debounce );
		// this._debounce = setTimeout( function(){
			var scrollT =  this.scrollTop;
			this.scrollTop = body.scrollTop;
			if(this.disableScroll) {
					return;
			}
			// if(this.downContent && !this.waitDown && body.scrollTop > scrollT){
			if(this.downContent && !this.waitDown && (body.scrollTop > (document.querySelector(".lyteExpTableRowGroup").offsetHeight-500))){
				this.downContent = false;
				var start = this.endIndex+1;
				var end = this.endIndex+this.maxRenderCount;
				// this.endIndex = this.endIndex+this.maxRenderCount;
				var more = this.getData("cxPropContent").slice(start, end);//No I18n
				var self = this;
				if(more && more.length){
				var obj;
				if(this.obj ) {
					obj = this.obj;
					Lyte.arrayUtils(obj.moreArr, 'push', more);//No I18n
				} else {
					obj = this.obj = {};
					if(this.upContent) {
						obj.startIndex = this.endIndex - this.startIndex + 1;
					} else {
						obj.startIndex = this.endIndex + 1;
					}
					obj.moreArr = more;
					obj.count = 0;
					obj.interval = setInterval(function() {
						for(var i=0;i<2;i++) {
							if(obj.moreArr[obj.count]) {
								Lyte.arrayUtils(self.getData("content"), 'push', obj.moreArr[obj.count++]);//No I18n
								// Lyte.arrayUtils(self.getData("content"), 'insertAt', obj.startIndex++, );//No I18n
							} else {
								clearInterval(obj.interval);
								self.waitDown = false;
								self.obj = undefined;
							}
						}
					},10);
				}
				// this.waitDown = true;
				this.endIndex+=more.length;
				this.downContent = true;
				// obj.endIndex = this.endIndex;
				this.setData("showLoadingDown", false);//No I18n
				}
				else if(this.getMethods("onScrollFetchMoreRecords")){
					// /**
					//  * @method onScrollFetchMoreRecords
					//  * @author anuja.manoharan
					//  * @version 1.0.0
					//  */
					this.executeMethod("onScrollFetchMoreRecords", this.endIndex).then(function(res){//No I18n
						if(res && res.length){
							Lyte.arrayUtils(this.getData("content"), "push", res);//No I18n
							this.endIndex+=res.length;
							this.downContent = true;
							this.scrollTable();
							this.setData("showLoadingDown", false);//No I18n
						}
					}.bind(this))
				}
				else{
					this.setData("showLoadingDown", false);//No I18n
				}
			}
			if(this.upContent && !this.waitUp && body.scrollTop < scrollT){
				this.upContent = false;
				var end = this.startIndex;
				if(end == 0){
					return;
				}
				// this.endIndex = this.startIndex-1;
				this.startIndex = end-this.maxRenderCount;
				if(this.startIndex < 0){
					this.startIndex = 0;
				}
				var more = this.getData("cxPropContent").slice(this.startIndex, end);//No I18n
				if(more && more.length){
					var obju;
					if(this.obju) {
						obju = this.obju;
						Lyte.arrayUtils(obju.moreArr, 'insertAt', 0, more);//No I18n
					} else {
						obju = this.obju = {};
						obju.moreArr = more;
						obju.count = 0;
						var self = this;
						obju.interval = setInterval(function() {
							var length = obju.moreArr.length;
							for(var i=0;i<2;i++) {
								var index = length - 1 - obju.count;
								obju.count++;
								if(obju.moreArr[index]) {
									Lyte.arrayUtils(self.getData("content"), 'insertAt', 0, obju.moreArr[index])//No I18n
								} else {
									clearInterval(obju.interval);
									self.obju = undefined;
									self.waitUp = false;
									break;
								}
							}
						}, 10);
					}
					// this.waitUp = true;
					// Lyte.arrayUtils(this.getData("content"), "insertAt", 0, more);//No I18n
					// Lyte.arrayUtils(this.getData("content"), "push", more);
					this.upContent = true;
					// var tbScrl = this.$node.getElementsByClassName(".lyteTableScroll")[0];
					// this.scrollTable(tbScrl.scrollLeft, tbScrl.scrollTop+(this.maxRenderCount*this.minHeightOfRow)-350);//No I18n
				}
				this.setData("showLoadingUp", false);//No I18n
			}
		// }.bind( this ), 100 )
	},
	fetchNextDataNew : function(body){
		if(this.data.cxPropExpress){
			var compareHeight = this.$node.querySelector(".lyteExpOriginalTable .lyteExpTableRowGroup").offsetHeight-this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").offsetHeight-100;			
		}
		else{
			var compareHeight = this.$node.querySelector("lyte-tbody").offsetHeight-this.$node.querySelector(".lyteTableScroll").offsetHeight;
		}
		if(this.downContent && (body.scrollTop > compareHeight)){
			this.downContent = false;
			var start = this.endIndex+1;
			var end = this.endIndex+this.maxRenderCount+1;
			var more, moreThan50 = false;
			if(end+50 <= this.getData("cxPropContent").length){
				more = this.getData("cxPropContent").slice(start, end);//No I18n
				moreThan50 = true;
			}
			else{
				more = this.getData("cxPropContent").slice(start);// No I18n
			}
			if(more && more.length){
				this.countUp = 0;
				this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .cxTableDownRow") ? this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .cxTableDownRow").classList.remove("dN") : "";//No I18n
				this.intervalUp = setInterval(function() {
					for(var i=0;i<2;i++) {
				// 		if(more[this.countUp]) {
							more[this.countUp].hideRecord = true;
							Lyte.arrayUtils(this.getData("content"), 'push', more[this.countUp++]);//No I18n
				// 		} else {
				        if(!more[this.countUp]){
							clearInterval(this.intervalUp);
							var rows = document.querySelectorAll(".cruxHideRow");//No I18n
							for(var j=0; j<rows.length; j++){
								rows[j].classList.remove("cruxHideRow");
							}
							if(moreThan50 || this.getMethods("onScrollFetchMoreRecords")){
								this.downContent = true;
								this.endIndex = this.endIndex+this.maxRenderCount;
								this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .cxTableDownRow") ? this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .cxTableDownRow").classList.add("dN") : "";//No I18n
							}
							else{
								this.setData("showLoadingDown", false);//No I18n
							}
							//this.$node.querySelector("lyte-expresstable").fixRowHeight();//No I18n
							//this.$node.querySelector("lyte-expresstable").setHeaderWidth();//NO I18n
							let expTableNode = this.$node.querySelector("lyte-expresstable"); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
							if (expTableNode) {
								expTableNode.contentObserver();//No I18n
							}
							if(this.getMethods("onScrollRecordsHaveBeenRendered")){
								// /**
								//  * @method onScrollRecordsHaveBeenRendered
								//  * @author anuja.manoharan
								//  * @version 1.0.0
								//  */
								this.executeMethod("onScrollRecordsHaveBeenRendered");//No I18n
							}
							break;
						}
					}
				}.bind(this),10);
			}
			else if(this.getMethods("onScrollFetchMoreRecords")){
				this.executeMethod("onScrollFetchMoreRecords", this.endIndex).then(function(res){//No I18n
					if(res && res.length){
						Lyte.arrayUtils(this.getData("content"), "push", res);//No I18n
						this.endIndex+=res.length;
						this.downContent = true;
						this.scrollTable();
						this.setData("showLoadingDown", false);//No I18n
					}
				}.bind(this))
			}
			else{
				this.setData("showLoadingDown", false);//No I18n
			}
		}
		// var scrollT =  this.scrollTop;
		// this.scrollTop = body.scrollTop;
		// if(this.upContent && body.scrollTop < scrollT){
		// 	this.upContent = false;
		// 	var end = this.startIndex;
		// 	if(end == 0){
		// 		return;
		// 	}
		// 	this.startIndex = end-this.maxRenderCount;
		// 	if(this.startIndex < 0){
		// 		this.startIndex = 0;
		// 	}
		// 	var more = this.getData("cxPropContent").slice(this.startIndex, end);//No I18n
		// 	if(more && more.length){
		// 		this.countDown = 0;
		// 		this.intervalDown = setInterval(function(){
		// 			for(var i=0; i<2; i++){
		// 				if(more[this.countDown]){
		// 					more[this.countDown].hideRecord = true;
		// 					Lyte.arrayUtils(this.getData("content"), "insertAt", 0, more[this.countDown++]);// No I18n
		// 				}
		// 				else{
		// 					clearInterval(this.intervalDown);
		// 					var rows = document.querySelectorAll(".cruxHideRow");//No I18n
		// 					for(var i=0; i<rows.length; i++){
		// 						rows[i].classList.remove("cruxHideRow");
		// 					}
		// 					this.setData("showLoadingUp", false);//No I18n
		// 				}
		// 			}
		// 		}.bind(this), 10);
		// 	}
		// 	// this.setData("showLoadingUp", false);// No I18n
		// }
	},
	methods : {
		onTableSearch: function(obj) {
			let contentObj = this.getData("cxPropContent");
			let headerObj = this.getData("cxPropHeader");
			let contentArr = [];
			let value = obj.newValue;
			let keysToSearch = headerObj.map(item => item.api_name).filter(Boolean);
			let addedRecord = new Set(); // Use Set for unique values
		
			const matchValue = (field, item) => {
				return item[field] && item[field].toString().includes(value);
			};
		
			for (let item of contentObj) {
				for (let field_name of keysToSearch) {
					// Check properties directly on the item
					if (matchValue(field_name, item)) {
						let recordKey = item.id || item.cxGroupName;
						if (!addedRecord.has(recordKey)) {
						contentArr.push(item);
						addedRecord.add(recordKey); 
						}
						
						
					}
		
					// Check for arrays in item properties
					for (let key in item) {
						if (Array.isArray(item[key])) {
							for (let subItem of item[key]) {
								if (matchValue(field_name, subItem)) {
									
									let recordKey = item.id || item.cxGroupName; //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
									if (!addedRecord.has(recordKey)) { //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
										contentArr.push(item);
										addedRecord.add(recordKey);
									}
								}
							}
						} else if (typeof item[key] === 'object') {
							for (let subKey in item[key]) {
								if (matchValue(field_name, item[key][subKey])) {
									
									let recordKey = item.id || item.cxGroupName; //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
									if (!addedRecord.has(recordKey)) { //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
										contentArr.push(item);
										addedRecord.add(recordKey);
									}
								}
							}
						}
					}
				}
			}
			if(this.getMethods("onAfterSearch")){
				this.executeMethod("onAfterSearch",contentArr);
				this.setData("content", contentArr);
			}
		},
		onSearchFocus :  function(event , element){
			if(this.getMethods("onSearchFocus")){
				/**
	    		 * @method onSearchFocus
	    		 * @author mahalakshmi.m
	    		 * @version 1.0.0
	    		 * @param { * } arg1
	    		 */
				return this.executeMethod("onSearchFocus",event , element);
			}
		},
		onSearchBlur :  function(event , element){
			if(this.getMethods("onSearchBlur")){
				/**
	    		 * @method onSearchBlur
	    		 * @author mahalakshmi.m
	    		 * @version 1.0.0
	    		 * @param { * } arg1
	    		 */
				return this.executeMethod("onSearchBlur",event , element);
			}
		},
		onSearchClear : function(event , element){
			if(this.getMethods("onSearchClear")){
				/**
	    		 * @method onSearchBlur
	    		 * @author mahalakshmi.m
	    		 * @version 1.0.0
	    		 * @param { * } arg1
	    		 */
				return this.executeMethod("onSearchClear",event , element);
			}
		},
		onBeforeUserSelect :  function(event, selected_value,component, lyte_drop_item,value ){
			if(this.getMethods('onBeforeSelect')){ //NO I18n
				return this.executeMethod('onBeforeSelect', event, selected_value,component, lyte_drop_item,value); //NO I18n
			}
		},
		valueChange: function(row,field,contentIndex,comp,value){
			if(this.getMethods('onValueChange')){
				this.executeMethod('onValueChange',value,row,field,contentIndex,comp);
			}
		},
		previewClose: function(comp){
			if(this.getMethods('onPreviewClose')){
				return this.executeMethod("onPreviewClose",comp)
			}
		},
		cropSuccess: function(res,value){
			if(this.getMethods("onCropSuccess")){
	    		return this.executeMethod("onCropSuccess",res,value)
			}
		},
		expandImageView: function(comp){
			if(this.getMethods("onExpandImageView")){
	    		return this.executeMethod("onExpandImageView",comp)
			}
		},
		showLess: function(arg1){
			if(this.getMethods("onShowLess")){
	    		// /**
	    		//  * @method onShowLess
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  */
	    		return this.executeMethod("onShowLess",arg1);
	    	}
		},
		beforeShow: function(arg1,arg2){
			if(this.getMethods("onBeforeShow")){
	    		// /**
	    		//  * @method onBeforeShow
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  * @param { * } arg2
	    		//  */
	    		return this.executeMethod("onBeforeShow",arg1,arg2);
	    	}
		},
		beforeHide: function(arg1,arg2){
			if(this.getMethods("onBeforeHide")){
	    		// /**
	    		//  * @method onBeforeHide
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  * @param { * } arg2
	    		//  */
	    		return this.executeMethod("onBeforeHide",arg1,arg2);
	    	}
		},
		show: function(arg1,arg2){
			if(this.getMethods("onShow")){
	    		// /**
	    		//  * @method onShow
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  * @param { * } arg2
	    		//  */
	    		this.executeMethod("onShow",arg1,arg2);
	    	}
		},
		hide: function(arg1,arg2){
			if(this.getMethods("onHide")){
	    		// /**
	    		//  * @method onHide
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  * @param { * } arg2
	    		//  */
	    		this.executeMethod("onHide", arg1,arg2);
	    	}
		},
		fetchmodule: function(modId){
			if(this.getMethods('fetchModuleData')){
				// /**
				//  * @method fetchModuleData
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } modId
				//  */
				return this.executeMethod('fetchModuleData',modId);
			}
		},
		fetchrecord: function(modId, obj){
			if(this.getMethods('fetchRecords')){
				// /**
				//  * @method fetchRecords
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } modId
				//  * @param { * } obj
				//  */
				return this.executeMethod('fetchRecords',modId, obj);
			}
		},
		fetchTotalCountFn : function(modId, cvid){
			if(this.getMethods('fetchTotalCount')){
				return this.executeMethod('fetchTotalCount', modId, cvid , this.$node);
			}
		},
		resizeSelect : function(source ,table ,event){
			this.setData('beingResized',true);//No I18n
			if(this.getMethods("onResizeSelect")){
				// /**
				//  * @method onResizeSelect
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } source
				//  * @param { * } table
				//  * @param { * } event
				//  */
				this.executeMethod("onResizeSelect", source ,table ,event);//No I18n
			}
		},
		resizeEnd : function(source ,table ,event){
			this.beingResized = true;
			this.setData('beingResized',false);//No I18n
			setTimeout(function(){
				this.beingResized = false;
			}.bind(this), 200);
			$L(source).removeClass('resizeStart');
			if(this.getMethods("onResizeEnd")){
				// /**
				//  * @method onResizeEnd
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } source
				//  * @param { * } table
				//  * @param { * } event
				//  */
				this.executeMethod("onResizeEnd", source ,table ,event);//No I18n
			}
		},
		applyLookupFilter : function(elem,event,validation){
			if(this.getMethods('applyFilter')){
				// /**
				//  * @method applyFilter
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } elem
				//  * @param { * } event
				//  * @param { * } validation
				//  */
				this.executeMethod('applyFilter',elem,event,validation); //No I18n
			}
		},
		setLookupFilterConditionsCall : function(elem){
			if(this.getMethods('setLookupFilterConditions')){
				// /**
				//  * @method setLookupFilterConditions
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } elem
				//  */
				return this.executeMethod('setLookupFilterConditions',elem); //no i18n
			}
			return {};
		},
		navigate : function(from, row, rowIndex){
			var data = Array.from(this.getData("cxPropContent"));
			row.page = from === "next" ? (row.page+1) : row.page-1;//no i18n
			row.startIndex = from === "next" ? ((row.page - 1) * (row.per_page)) : ((row.startIndex) - (row.per_page));
				
			var content= data[rowIndex].content.slice(row.startIndex, row.startIndex * row.per_page);
			Lyte.objectUtils( data[rowIndex] , "add" , "cxPropContent" , content );

			
		},
		// afterRenderTable : function(){
		// 	$L.fastdom.mutate(function(){
		// 		if(this.$node.querySelector(".cxUpLoading")){
		// 			this.$node.querySelector(".cxUpLoading").style.top = this.$node.querySelector(".cxTableUpRow").getBoundingClientRect().top+42;
		// 			this.$node.querySelector(".cxUpLoading").style.width = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").offsetWidth;
		// 		}
		// 		if(this.$node.querySelector(".cxDownLoading")){
		// 			this.$node.querySelector(".cxDownLoading").style.top = this.$node.querySelectorAll("lyte-exptable-tr")[107].offsetTop;
		// 			// this.$node.querySelector(".cxDownLoading").style.top = this.$node.querySelector(".cxTableDownRow").getBoundingClientRect().top+42;
		// 			this.$node.querySelector(".cxDownLoading").style.width = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").offsetWidth;
		// 		}
		// 	}.bind(this));
		// }
		tagsShowMore : function(){
			if(this.getMethods("onShowMoreTags")){
				// /**
				//  * @method onShowMoreTags
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  */
				this.executeMethod("onShowMoreTags");//No I18n
			}
		},
		sortClick : function(value, ev, menu, elem){
			this.sortClick(value, ev, menu, elem);
		},
		beforeSetFixTableColumnWidth : function(table){
			if(this.getMethods('onBeforeSetFixTableColumnWidth'))
			{
				// /**
				//  * @method onBeforeSetFixTableColumnWidth
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } table
				//  */
				this.executeMethod('onBeforeSetFixTableColumnWidth', table);//No I18n
			}
		},
		afterSetFixTableColumnWidth : function(table){
			if(this.getMethods('onAfterSetFixTableColumnWidth'))
			{
				// /**
				//  * @method onAfterSetFixTableColumnWidth
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } table
				//  */
				this.executeMethod('onAfterSetFixTableColumnWidth', table);//No I18n
			}
		},
		onLookupHoverFetchBcDataPopup : function(modId, recId){
			if(this.getMethods("onLookupHoverFetchBcData")){
				// /**
				//  * @method onLookupHoverFetchBcData
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } modId
				//  * @param { * } recId
				//  */
				return this.executeMethod("onLookupHoverFetchBcData",modId, recId);
			}
			},
		afterAriaAdd : function(){
			// console.log('After Aria Add Method Executed...');
		}
	},
	clearValues : function(){
		clearInterval(this.intervalUp);
		clearTimeout(this.intervalDown);
		this.setData({showLoadingUp : false, showLoadingDown : false});
	},
	performSort : function(field){
		if(field.cxPropPreventSort){
			return;
		}
		var options = ["asc", "desc"];//No I18n
		if(field.cxPropSortOptions){
			options = field.cxPropSortOptions;
		}
		else if(this.getMethods("onSort") && this.getData("cxPropSortedColumn") && (this.getData("cxPropSortedColumn") == field.api_name || this.getData("cxPropSortedColumn") == field.id)){
			if(this.getData("cxPropSortedOrder") == "asc"){
				options = ["desc", "unsort"];//No I18n
			}
			else{
				options = ["asc", "unsort"];//No I18n
			}
		}
		var labels = {asc : "crm.column.sort.asc", desc : "crm.column.sort.desc", unsort: "crm.column.unsort"}//No I18n
		for(var i=0; i<options.length; i++){
			options[i] = {label : _cruxUtils.getI18n(labels[options[i]]), value : options[i]};
		}
		this.setData("options", options);//No I18n
		this.setData("beingSorted", field.api_name)//No I18n
		// document.getElementById("cxTableSortMenu").setData({ltPropShow : true});
	},
	sortClick : function(value, ev, menu, elem){
		var self = this;
		self.setData("cxPropSortedColumn", self.getData("beingSorted"));//No I18n
		self.setData("cxPropSortedOrder", value);//No I18n
		if(this.getMethods("onSort")){
			this.executeMethod("onSort", this.getData("cxPropSortedColumn"), value, ev, menu, elem);//No I18n
		}
		else{
			var api_name = this.getData("beingSorted");//No I18n
			var content = this.getData("cxPropContent").slice(0);//No I18n
			content.sort(function(row1, row2){
				if(row1[api_name] == undefined || row1[api_name] == ""){
					return (value == "asc") ? 1: -1;
				}
				if(row2[api_name]== undefined || row2[api_name] == ""){
					return (value == "desc") ? 1 : -1;
				}
				return row1[api_name].localeCompare(row2[api_name]);
			});
			this.setData("cxPropContent", content);//No I18n
		}
	},
	triggerSortClick : function(field, ev){
		var sort = "asc";
		if(this.getData("cxPropSortedOrder") && (this.getData("cxPropSortedColumn") == field.api_name || this.getData("cxPropSortedColumn") == field.id)){
			sort = this.getData("cxPropSortedOrder") == "asc" ? "desc" : "asc";
		}
		this.setData("beingSorted", field.api_name);
		this.sortClick(sort, ev)
		//this.sortClick(value, ev, menu, elem);
	},
	observeFilter : function(){
		_cruxUtils.addMurhyInfo("crux-table-component.js", "Feb Default Changes");
		if(!this.data.cxPropExpress && this.data.cxPropShowFilter){
			var self = this
			$L.fastdom.measure(function(){
				var height = self.data.cxPropShowFilter ? self.$node.querySelector(".cxTableLookupFilterComponent").offsetHeight : 0;
				var prevHeight = self.$node.querySelector("lyte-tr").offsetHeight;
				$L.fastdom.mutate(function(){
					self.$node.querySelector(".lyteScrollContainer.lyteScrollContainerY").style.top = self.data.cxPropShowFilter ? (prevHeight+height+"px") : (prevHeight+"px");
				})
			})			
		}
	}.observes("cxPropShowFilter").on("didConnect"),
	observeFields1 : function(){
		if(this.data.cxPropShowSortIconOnHover){
			var ele = this.$node.querySelectorAll(".cxTableSortIcon") , len = ele.length;
			for(var i=0; i<len; i++){
				ele[i].classList.add("cxTableSortIconHide");
			}
		}
	}.observes("cxPropHeader").on("didConnect"),
	keyDownEvent : function(){
		if(this.$node.cxProp('aria')){
			this.bindEventForAria();
		}
	}.observes("cxPropContent", 'cxPropAria').on('didConnect')
}, {
	mixins: ['crux-element-validation', 'crux-aria-table-mixin'],
	alias: 'crm-custom-table'
});
//This helper is exposed to crm developers, do not change the argument order or use this reference inside helper
Lyte.Component.registerHelper("getCruxTableValue", function (field, row, module, showToolTip, toolTipProps, lookupProperties, phoneTooltip, numProps, textareaProps, twitterUrl, cxPhoneProperties ,  cxPropRecordId,toggleMasking , isMaskingFeatureEnabled,profileId) { //eslint-disable-line block-spacing
	var lyteWidgetAttribute = _cruxUtils.isLyteWidgetBuild ? 'lyte-widget' : '';
	var value =  Lyte.Component.registeredHelpers.getCruxTableValue1(row, field);
	var tooltipData='';
	if(value!=='undefined' && field.cxTypeMapping==='boolean' && field.cxDisplayText){
		return value;
	}
	// if(!value && field.api_name.indexOf(".") > -1){
	// 	value = row[field.api_name.split(".")[0]];
	// 	if(value){
	// 		value = value[[field.api_name.split(".")[1]]];
	// 	}
	// }
	if((!value || value.length == 0) && field.cxTypeMapping != "number"){
		return "";
	}
	let fldMaskPermission = true, orignalVal = value;
	if(isMaskingFeatureEnabled && !toggleMasking &&  ( value || (field.cxTypeMapping==='number' && typeof value!=='undefined' && value!==null)) && field.mask_details){ // eslint-disable-next-line eqeqeq
		var phone_masking=field.cxTypeMapping==='phone' || field.data_type==='phone';
		value=Lyte.Component.registeredHelpers.cruxMaskValue(value,field.mask_details,true,phone_masking);
		fldMaskPermission = Lyte.Component.registeredHelpers.checkForMaskPermission(field.mask_details , profileId);
	}else if(field.cxPropMaskingProperties && Object.keys(field.cxPropMaskingProperties).length>0 && typeof value!=='undefined'){
		value = Lyte.Component.registeredHelpers.cruxMaskValue(value, field.cxPropMaskingProperties);
		fldMaskPermission = false;
	}
	if(showToolTip && toolTipProps){
		if(toolTipProps.config){
			tooltipData = `lt-prop-tooltip-config='${JSON.stringify(toolTipProps.config)}'`;
		}
		if(toolTipProps.class){
			tooltipData += `lt-prop-tooltip-class=${toolTipProps.class}`
		}
	}
	// let getDataZcqaAttr = (field , value)=>{ //eslint-disable-line no-unused-vars,@zoho/zohocrm/no-unused-vars
	// 	let labelSelector = this.getData && this.getData('cxPropLabelSelector') ? this.getData('cxPropLabelSelector') : 'field_label';
	// 	let tableId = this.getData && this.getData('cxPropTableId') ? this.getData('cxPropTableId')+'_' : '';
	// 	return `data-zcqa="${tableId}${field[labelSelector]}_${value}"`;
	// };
	switch(field.cxTypeMapping){
		case "phone":
			if(field.cxPropMaskingProperties){
				return $ESAPI.encoder().encodeForHTML(value);
			}
			var cxPropCallAllowed = true;
			if(row.Data_Processing_Basis_Details){
				cxPropCallAllowed = row.Data_Processing_Basis_Details.Contact_Through_Phone;
			}
			var res = "<div class='phoneRtl";
			var toBeContinued = 0;
			if(cxPropCallAllowed == false || (field.private && field.private.restricted)){
				res+="' style='min-width : 100%;'>";
			}
			else if(typeof Crm !== "undefined" && Crm.userDetails && Crm.userDetails.TELEPHONY_ENABLED){
				res+=" cruxPreventClick cxPhoneViewOutbound'>";
				toBeContinued = 1;
			}
			else if(typeof Crm !== "undefined" && Crm.userDetails && Crm.userDetails.ZPBENABLED){
				res+=" cxPhoneViewZPBEnabled cruxPreventClick'>";
				toBeContinued = 2;
			}
			else{
				res+=" cruxPreventClick' onmouseover='Lyte.registeredMixins[\"crux-aria-table-mixin\"].phoneMouseOver(this);' onmouseout='Lyte.registeredMixins[\"crux-aria-table-mixin\"].phoneMouseOut(this);' style='min-width:100%;'><zpb-phone phoneno='"+$ESAPI.encoder().encodeForHTMLAttribute(value)+"' callbackparam='{\"module\" : \""+module+"\", \"searchid\" : \""+(cxPropRecordId ? cxPropRecordId : row.id)+"\"}'>";
				toBeContinued = 3;
			}
			var entityName = (typeof moduleRecordMapping != "undefined") && moduleRecordMapping[module] && moduleRecordMapping[module].display_field ? row[moduleRecordMapping[module].display_field.api_name] : "";
			if(showToolTip){
				res += "<lyte-text " + lyteWidgetAttribute + " "+tooltipData+ " lt-prop-value='" + $ESAPI.encoder().encodeForHTML(value) + "'></lyte-text>";
			}
			else{
				res+=$ESAPI.encoder().encodeForHTML(value);
			}
			if(toBeContinued == 1){
				res+="<span class='cxCalliconOuter' onclick='Lyte.registeredMixins[\"crux-element-validation\"].phoneClick(\""+$ESAPI.encoder().encodeForJavaScript(value)+"\", \""+(cxPropRecordId ? cxPropRecordId : row.id)+"\", \""+module+"\",\""+$ESAPI.encoder().encodeForJavaScript(entityName)+"\");'><i class='cxCallIcon cruxPreventClick'></i><span id='calllabel1' class='cruxPreventClick cxPhoneViewCallLabel'>"+_cruxUtils.getI18n("Call")+"</span></span>";
			}
			else if(toBeContinued == 2){
				var callbackparamfn = "asyncFn(crmCallsNew.getClick2CallPromise,'" + (cxPropRecordId ? cxPropRecordId : row.id ) + "','" + module + "','" + entityName + "','','"+$ESAPI.encoder().encodeForJavaScript(value)+"','"+field.column_name+"','"+field.id+"')";	//no i18N
				res+="<span class='cxPhoneViewZPBEnabledIconWrap'><zpb-phone number='"+$ESAPI.encoder().encodeForHTMLAttribute(value)+"' module='"+module+"' recordid='"+(cxPropRecordId ? cxPropRecordId : row.id)+"' callbackparamfn="+$ESAPI.encoder().encodeForHTMLAttribute(callbackparamfn)+"></zpb-phone></span>";
			}
			else if(toBeContinued == 3){
				res += `</zpb-phone><a style='visibility : hidden;' class='pH2 phoneRtl' title='${phoneTooltip}' href='${cxPhoneProperties && cxPhoneProperties.mode === 'tel' ? "tel:" + $ESAPI.encoder().encodeForHTMLAttribute(value) : "skype:" + $ESAPI.encoder().encodeForHTMLAttribute(value) + '?call'}' onclick='sE();'></a>`;
			}
			return res+="</div>";
		case "allday":
		case "date":
		case "date-time":
			var isAllDayEventFld = row.All_day && (module === 'Events' || module === 'Meetings') && ['Start_DateTime','End_DateTime'].indexOf(field.api_name) !== -1 ? true : false;
			var formatDate = this.getData('cxPropDateProperties') ? 
								this.getData('cxPropDateProperties')[field.api_name] && this.getData('cxPropDateProperties')[field.api_name].hasOwnProperty('dateInUserPattern') ? 
								!this.getData('cxPropDateProperties')[field.api_name].dateInUserPattern: 
								this.getData('cxPropDateProperties').hasOwnProperty('dateInUserPattern') ? !this.getData('cxPropDateProperties').dateInUserPattern : false 
								: false;
			var formatDatetime = this.getData('cxPropDatetimeProperties') ? 
								this.getData('cxPropDatetimeProperties')[field.api_name] && this.getData('cxPropDatetimeProperties')[field.api_name].hasOwnProperty('datetimeInUserPattern') ? 
								!this.getData('cxPropDatetimeProperties')[field.api_name].datetimeInUserPattern: 
								this.getData('cxPropDatetimeProperties').hasOwnProperty('datetimeInUserPattern') ? !this.getData('cxPropDatetimeProperties').datetimeInUserPattern : false 
								: false;
		
			if((toggleMasking || !field.mask_details ) && (formatDate || formatDatetime || (isAllDayEventFld && value.indexOf("T") !== -1))){
				if(field.cxTypeMapping == "date" && formatDate){
					return "<crux-date-component " + lyteWidgetAttribute + " cx-prop-value='"+value+"' cx-prop-date-in-user-pattern=false></crux-date-component>";
				}
				else if(field.cxTypeMapping == "date-time" && formatDatetime){
					return "<crux-date-time-component " + lyteWidgetAttribute + " cx-prop-value='"+value+"' cx-prop-datetime-in-user-pattern=false></crux-date-time-component>";
				}
			}
			if((isAllDayEventFld || field.cxTypeMapping == "date") && value.indexOf(":") > -1){
				value = value.substring(0, value.split(":")[0].lastIndexOf(" "));//No I18n
			}
			if(showToolTip){
					return "<lyte-text " + lyteWidgetAttribute + " class='newDTField' "+tooltipData+" lt-prop-value='" + $ESAPI.encoder().encodeForHTMLAttribute(value) +"'></lyte-text>";//No I18n
			}else{
					return "<span>"+$ESAPI.encoder().encodeForHTMLAttribute(value)+"</span>";
			}
		case "boolean":
			return "<span class="+(value == true ? 'criteria-yes' : '')+"></span>";
		case "email":
		if((field.cxPropMaskingProperties || field.mask_details) && !fldMaskPermission){
			return $ESAPI.encoder().encodeForHTML(value);
		}
		if(showToolTip){   
				return "<a class='cxEmailViewLink cruxPreventClick emailUnblock' href='mailto:"+$ESAPI.encoder().encodeForHTMLAttribute(orignalVal)+"'> <lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='"+$ESAPI.encoder().encodeForHTML(value)+"'></lyte-text></a>";
		}else{
				return "<a class='cxEmailViewLink cruxPreventClick emailUnblock' href='mailto:"+$ESAPI.encoder().encodeForHTMLAttribute(orignalVal)+"'>"+$ESAPI.encoder().encodeForHTML(value)+"</a>";
		} 
		case "layout":
			if(showToolTip){
				return "<lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='" + $ESAPI.encoder().encodeForHTML(value.display_label) +"'></lyte-text>";//No I18n
			}else{
				return $ESAPI.encoder().encodeForHTML(value.display_label);
			}
		case "number":
				var currencyTypeField = false;
				if(field.data_type == "currency" || (field.data_type == "formula" && field.formula.return_type == "currency")){
					currencyTypeField = true;
				}
				var dataType = field.data_type;
				if(dataType == "formula" || (field.formula && field.formula.return_type)){
					if(field.formula.return_type == "currency"){
						dataType = "currency";//No i18n
					}
					else{
						dataType = "number";//No I18n
					}
				}
				if(toggleMasking || !field.mask_details || !value){
					//check for no currecy type handling for masked data
					value = (value || value===0) ? this.component.getNumberValueForView(value.toString(), dataType, numProps && numProps.isoCode ? numProps.isoCode : row.Currency, field.ui_type, numProps && numProps.currencyDetails ? numProps.currencyDetails :Crm.userDetails.CURRENCY_DETAILS,field.hasOwnProperty('decimal_place')?field.decimal_place:numProps && numProps.defaultRoundOff ? numProps.defaultRoundOff: Crm.userDetails.defaultRoundOff ? Crm.userDetails.defaultRoundOff : 2, numProps && numProps.currencyCode ?numProps.currencyCode : Crm.userDetails.BASE_CURRENCY,numProps && numProps.exchangeRate ?numProps.exchangeRate:undefined,numProps && numProps.exchangeRateFinance ?numProps.exchangeRateFinance:undefined,row.$home_converted_currency ? row.$home_converted_currency[field.api_name]:undefined,numProps && numProps.hasOwnProperty('displayCurrency') ? numProps.displayCurrency : true,row.$formatted_currency ? row.$formatted_currency[field.api_name]:undefined,field.separator,numProps && numProps.defaultOrgCurrency? numProps.defaultOrgCurrency: Crm.userDetails.defaultOrgCurrency,field.currency ? field.currency.rounding_option:undefined,field.currency?field.currency.precision:undefined) : '';//No I18n
				}
			return `<div class="${(currencyTypeField ? 'numberDivCurrencyView' : 'numberDivNumberView')}">${showToolTip ? `<lyte-text  ${lyteWidgetAttribute} lt-prop-value='${value}'></lyte-text>`:value}</div>`;
		case "text-area":
			if(showToolTip){
				return "<div class='pR'><pre style='word-wrap : break-word; white-space : pre-wrap; min-width : 200px;'>"+$ESAPI.encoder().encodeForHTML(value)+"</pre>" + "<span id='showMoreDesc' class='showMoreAddedEvents'></span></div>";
			}else{
				return "<pre style='word-wrap : break-word; white-space : pre-wrap; min-width : 200px; max-width : 500px;'>"+$ESAPI.encoder().encodeForHTML(value)+"</pre>";
			}
		case "twitter":
			if((field.cxPropMaskingProperties || field.mask_details) && !fldMaskPermission){
				return $ESAPI.encoder().encodeForHTML(value);
			}
			if(showToolTip){
				return "<a data-zcqa='dummy' class='link cruxPreventClick' href='"+twitterUrl+"/"+$ESAPI.encoder().encodeForURL(orignalVal)+"' target='_blank'> <lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='"+$ESAPI.encoder().encodeForHTML(value)+"'></lyte-text></a>";
			}else{
				return "<a data-zcqa='dummy' class='link cruxPreventClick' href='"+twitterUrl+"/"+$ESAPI.encoder().encodeForURL(orignalVal)+"' target='_blank'>"+$ESAPI.encoder().encodeForHTML(value)+"</a>";
			}
		case "website":
			var href = "";
			var http="http"; //No i18N
			var https="https"; //No i18N
			if(orignalVal && orignalVal!=="" && !(orignalVal.indexOf(http)===0 || orignalVal.indexOf(https)===0)){
				href = http+"://"+orignalVal;//No I18n
			}
			else if(orignalVal){
				href = orignalVal;
			}
			if((field.cxPropMaskingProperties || field.mask_details) && !fldMaskPermission){
				return $ESAPI.encoder().encodeForHTML(value);
			}
			if(showToolTip){
				return "<a class='link cruxPreventClick' href='"+$ESAPI.encoder().encodeForHTMLAttribute(href)+"' target='_blank'> <lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='"+$ESAPI.encoder().encodeForHTML(value)+"'></lyte-text></a>";
			}else{
				return "<a class='link cruxPreventClick' href='"+$ESAPI.encoder().encodeForHTMLAttribute(href)+"' target='_blank'>"+$ESAPI.encoder().encodeForHTML(value)+"</a>";
			}
			case "lookup":
			case "multi_module_lookup":
			var toPass = ["routeName","dynamicParams", "queryParams", "transitionData", "target", "iconClass","showBc","hideIconForView","module","cxPropShowImage","cxPropShowLookupPopupFields"];
			var props = {field : field, row : row};
		_cruxUtils.addMurhyInfo("crux-table-component.js", "Feb Default Changes");
			let currentLookupProp = lookupProperties && lookupProperties[field.api_name] ? lookupProperties[field.api_name] : {};
			if(field.cxTypeMapping === "multi_module_lookup" && Array.isArray(currentLookupProp)){ //eslint-disable-line valid-typeof
				currentLookupProp = currentLookupProp.find(function(item){
					return item.api_name === row[field.api_name].module.api_name;
				});
			}
			toPass.forEach(function(item){
				props[item] = currentLookupProp.hasOwnProperty(item) ? currentLookupProp[item] : lookupProperties[item] ? lookupProperties[item] : "";
			});
			if(props.iconClass){
				props.iconClass = props.iconClass ;
				if(props.iconClass.indexOf("{{")===-1){
					props.iconClass=props.iconClass;
				}else{
					props.iconClass=row.cxPropIconClass?row.cxPropIconClass:"";
				}
			}
			if(props.dynamicParams){
				props.dynamicParams = JSON.parse(props.dynamicParams);
				props.dynamicParams = props.dynamicParams.map(function(item){
					if(item.indexOf("{{") == -1){
						return item;
					}
					var keys = item.split("{{")[1].split("}}")[0].split(".");
					
					var ret = props[keys[0]];
					/* eslint-disable @zoho/zstandard/proper-usage-of-loop */
					var keys_len=keys.length ;
					for(var i=1; i<keys_len; i++){
						var key = keys[i];
						if(key.indexOf("[") !== -1){
							if(key.indexOf("]") !== -1){
									key=keys[i];
							}
							else{
								 key = key.split("[")[1];
								var _ret = props[key];
								var key_length=keys.length;
								for(i=i+1; i<key_length; i++){
									key = keys[i];
									if(key.indexOf("]") !== -1){
										key = key.split("]")[0];
										_ret = _ret[key];
										break;
									}
								}
								ret = ret[_ret];
							}
						}
						else if(ret &&ret[key]){
							// if(ret &&ret[key] ){
								ret = ret[key];	
							// }
						 				        
						}
					}
					/* eslint-enable @zoho/zstandard/proper-usage-of-loop */
					if(props.cxPropIdModuleMap && props.cxPropIdModuleMap[ret] ){
						return props.cxPropIdModuleMap[ret];
					}
					return ret;
				})
				props.dynamicParams = JSON.stringify(props.dynamicParams)
			}
			else if(field.cxTypeMapping === "multi_module_lookup"){
				props.dynamicParams = [row[field.api_name].module.api_name, row[field.api_name].id];
				props.dynamicParams = JSON.stringify(props.dynamicParams);
				props.module = row[field.api_name].module.api_name;
			}
			if(props.queryParams){
				props.queryParams = JSON.parse(props.queryParams);
				for(var key in props.queryParams){
					if(props.queryParams[key].indexOf("{{") != -1){
						var _val = props.queryParams[key].split("{{")[1].split("}}")[0].split(".");
						var ret = props[_val[0]];
						for(var i=1; i<_val.length; i++){
							ret = ret[_val[i]];
						}
						props.queryParams[key] = ret;
					}
				}
				props.queryParams = JSON.stringify(props.queryParams);
			}
			var valObj ;
			if(typeof value === "string"){
				value = {name : value};
			}
			var label_selector = 'name';
			if (typeof value !== "string") {
				label_selector = value[label_selector] ? label_selector : 'display_label';
				valObj = Object.assign({}, value);
				valObj.name = $ESAPI.encoder().encodeForHTML(value.name);
			}
			var lookupVal = valObj ? valObj[label_selector] : value;     //temp fix for
			if(field.cxTypeMapping === "multi_module_lookup"){
				lookupVal = JSON.stringify(valObj);
			}
			var cxPropField = field instanceof Record ? JSON.stringify(store.peekRecord(field.$.model._name , field.id).$.toJSON()) : JSON.stringify(field);
			return "<crux-lookup-component " + lyteWidgetAttribute + " cx-prop-show-lookup-popup-fields='" + (props.cxPropShowLookupPopupFields !== "" ? props.cxPropShowLookupPopupFields : false) + "' cx-prop-field='" + cxPropField + "' cx-prop-route-name='" + lookupProperties.routeName + "' cx-prop-value='" + lookupVal + "' lookup-id='" + (valObj ? valObj.id : "") + "' cx-prop-zcqa='" + (lookupProperties.zcqa ? lookupProperties.zcqa : valObj ? valObj.name : value) + "' cx-prop-dynamic-params='" + props.dynamicParams + "' cx-prop-query-params='" + props.queryParams + "' cx-prop-id='" + (lookupProperties.id ? lookupProperties.id : row.id) + "' cx-prop-transition-data='" + props.transitionData + "' cx-prop-target='" + props.target + "' cx-prop-icon-class='" + props.iconClass + "'   cx-prop-show-bc='" + (props.showBc !== "" ? props.showBc : false) + "' cx-prop-module='" + (props.dynamicParams !== "" ? JSON.parse(props.dynamicParams)[0] : "") + "' cx-prop-hide-icon-for-view='" + (props.hideIconForView !== "" ? props.hideIconForView : false) + "'></crux-lookup-component>";
		case "picklist":
			if (value && typeof value != "string") {
				value = value.join("; ");
			}
			return showToolTip ? `<lyte-text ${lyteWidgetAttribute} ${tooltipData} lt-prop-value="${$ESAPI.encoder().encodeForHTML(value)}"></lyte-text>` : $ESAPI.encoder().encodeForHTML(value);
		case "role":
			return showToolTip ? `<lyte-text ${lyteWidgetAttribute} ${tooltipData} lt-prop-value="${$ESAPI.encoder().encodeForHTML(value.name)}"></lyte-text>`:value.name;
		default:
			if (showToolTip) {
				return "<lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='" + $ESAPI.encoder().encodeForHTML(value && typeof value === 'object' && value.name ? value.name.toString() : value.toString()) + "'></lyte-text>";//No i18n
			} else {
				return $ESAPI.encoder().encodeForHTML(value.toString());
			}
	}
});

Lyte.Component.registerHelper("cruxGetDateValue", function(row, field){//No I18n
	if(row.All_day || field.cxTypeMapping == "date" && row[field.api_name].indexOf(":") > -1){
		return row[field.api_name].substring(0, row[field.api_name].split(":")[0].lastIndexOf(" "));
	}
	return row[field.api_name];
});

Lyte.Component.registerHelper("cruxGetWebsiteHref", function(value){//No I18n
	var http = "http";//No I18n
	var https = "https";//No I18n
	if(value && value != "" && !(value.indexOf(http) == 0 || value.indexOf(https) == 0)){
		return http+"://"+value;
	}
	else if(value){
		return value;
	}
	return "";
});
Lyte.Component.registerHelper("isgroupRendered", function(rec,a){//No I18n
	if(this.component.data.renderedGroups.indexOf(rec.id)  == -1){
		this.component.data.renderedGroups.push(rec.id);
		return true
	}else{
		return false
	}
})
//third argument is dummy, it is used to observe value change for edit mode
//eslint-disable-next-line no-unused-vars
Lyte.Component.registerHelper("getCruxTableValue1", function(row, field ,obs){ //eslint-disable-line @zoho/zohocrm/no-unused-vars
	var value = row[field.api_name];
	if(!value &&field.api_name && field.api_name.indexOf(".") > -1){
		value = row[field.api_name.split(".")[0]];
		if(value){
			value = value[[field.api_name.split(".")[1]]];
		}
	}
	return value;
})

Lyte.Component.registerHelper("getTableLookupProperty", function(lookupProps, row, field, name){
		_cruxUtils.addMurhyInfo("crux-table-component.js", "Feb Default Changes");
	//showbc must have default value as true
	var prop = lookupProps[field.api_name] 
		&& lookupProps[field.api_name].hasOwnProperty(name) 
		? lookupProps[field.api_name][name] 
		: lookupProps.hasOwnProperty(name) ? lookupProps[name] : name === "showBc" ? true : undefined;
	if(prop){
		let props =  Lyte.deepCopyObject(lookupProps);
		props.row = row;
		props.field = field;
		switch (name) {
			case "dynamicParams":
				prop = JSON.parse(prop);
				prop = prop.map(function (item) {
					if (item.indexOf("{{") == -1) {
						return item;
					}
					var key = item.split("{{")[1].split("}}")[0].split(".");
					var ret = props[key[0]];
					for (var i = 1; i < key.length; i++) {
						ret = ret[key[i]];
					}
					return ret;
				})
				return JSON.stringify(prop);
			case "queryParams":
				prop = JSON.parse(prop);
				for (var key in prop) {
					if (prop[key].indexOf("{{") != -1) {
						var _val = prop[key].split("{{")[1].split("}}")[0].split(".");
						var ret = props[_val[0]];
						for (var i = 1; i < _val.length; i++) {
							ret = ret[_val[i]];
						}
						prop[key] = ret;
					}
				}
				return JSON.stringify(prop);
			default:
				return prop;
		}
	}
});
//class="{{if(cruxContains(cxPropSelectedRows, row.id, cxPropSelectedRows.length), cxPropSelectedRowClass)}} {{row.cxPropClass}} {{if(cruxAnd(ifEquals(cxPropAjaxEditId,row.id),cxPropAjaxEditId),if(cxPropFreezeRow,'cxSubformRowEditMode cxSubformRowFreeze','cxSubformRowEditMode'))}} {{cxPropTableProperties.tbody_tr_class}}">
Lyte.Component.registerHelper("getCruxTableRowClass", function (currentRow, selectedRows, id, selectedRowsLength, cxPropSelectedRowClass, currentRowcxPropClass, cxPropAjaxEditId, cxPropFreezeRow, tbody_tr_class) {
	let returnClass = `${currentRowcxPropClass || ''} ${tbody_tr_class || ''}`.trim();
	if (selectedRows && id) {
		returnClass += selectedRows.indexOf(id) > -1 ? ` ${cxPropSelectedRowClass}` : '';
	}
	if (cxPropAjaxEditId && id && cxPropAjaxEditId === id) {
		returnClass += cxPropFreezeRow ? ' cxSubformRowEditMode cxSubformRowFreeze' : ' cxSubformRowEditMode';//No I18n
	}
	return returnClass;
});
//data-zcqa="{{getCruxTableBodyTrZcqa(cxPropZcqaWithId,row.id,cxPropRowZcqa)}}"
Lyte.Component.registerHelper("getCruxTableBodyTrZcqa", function (cxPropZcqaWithId, id, cxPropRowZcqa) {
	let finalZcqa = cxPropRowZcqa || '';
	if (cxPropZcqaWithId) {
		finalZcqa = `${cxPropZcqaWithId}${id}`;
	}
	return finalZcqa;
});
//data-zcqa="{{if(cxPropTableId, concat('value_', cxPropTableId, '_', if(cxPropCellZcqaWithRowNo,concat(field.field_label,'_',contentIndex+1),field.field_label)), concat('value_', if(cxPropCellZcqaWithRowNo,concat(field.field_label,'_',contentIndex+1),field.field_label)))}}">
Lyte.Component.registerHelper("getCruxTableBodyTdZcqa", function (field, cxPropTableId, cxPropCellZcqaWithRowNo, fieldLabel, contentIndex) {
	return `value_${cxPropTableId ? `${cxPropTableId}_` : ''}${(cxPropCellZcqaWithRowNo ? `${fieldLabel}_${contentIndex + 1}` : fieldLabel)}`;
});
Lyte.Component.registerHelper("isCxTableComponentNeeded", function (fieldData, fieldDataLength, enable_colour_code, lineClamp, field, row, cxPropNumberProperties, cxPropClipMode, cxTypeMapping) {
	return (
		(cxTypeMapping === "tag" && row[field.api_name].length !== 0) ||
		(cxTypeMapping === "user" && row[field.api_name]) ||
		(cxTypeMapping === "picklist" && enable_colour_code) ||
		(cxTypeMapping === "number" && !cxPropNumberProperties) ||
		(cxTypeMapping === 'text-area' && (cxPropClipMode || lineClamp)) ||
		(cxTypeMapping === 'image')
	);
});
//class="{{field.cxPropClass}} {{if(ifEquals(field.yieldName,'ajaxActions'),'cxTableStickycolumn')}}" --->if(cxPropAllRowsEditable || cxPropAjaxEditId !==undefined && cxPropAjaxEditId===row.id)
//class="{{cxPropTableProperties.td_class}} {{cxPropColumnCellClass}} {{field.cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor ','')}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}" --> non-yield
//class="{{cxPropTableProperties.td_class}} {{field.cxPropClass}} {{cxPropColumnCellClass}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}" -->yield
Lyte.Component.registerHelper("getCruxTableBodyTdClass", function (cxPropColumnCellClass, cxPropClass, cxTypeMapping, tdClass, intPinnedColumn, fieldId, fieldYield, yieldName,headerPropClass,cellClass) {
	let finalClass = `${tdClass || ''} ${cxPropClass || ''} ${headerPropClass || ''} ${cxPropColumnCellClass || ''} ${cellClass || ''}  ${!(fieldYield || yieldName) && cxTypeMapping === 'multi-picklist' ? 'wspaceNor mW100' : ''} ${fieldId === intPinnedColumn ? 'cxTableLastPinnedColumn' : ''}`;
	return finalClass && finalClass.trim();
});
Lyte.Component.registerHelper("getInVisibleStatusTdValue", function (row, field, numProps) {
	let returnValue = field.api_name ? row[field.api_name] : undefined;
	if (returnValue !== undefined && returnValue !==null ) {
		if (field.cxTypeMapping === 'user') { //eslint-disable-line @zoho/zstandard/no-ifel
			return returnValue.name;
		} else if (field.cxTypeMapping === 'number') {
			if (this.component.getNumberValueForView && returnValue && returnValue !== "null" && returnValue !== "undefined") {
				let dataType = field.data_type;
				if (dataType === "formula" || (field.formula && field.formula.return_type) || (field.dataparam && field.dataparam.return_type) || (field.rollup_summary && field.rollup_summary.return_type)) {
					if ((field.formula && field.formula.return_type === "currency") || (field.dataparam && field.dataparam.return_type === "currency") || (field.rollup_summary && field.rollup_summary.return_type === "currency")) {
						dataType = "currency";//No i18n
					} else {
						dataType = "number";//No I18n
					}
				}
				returnValue = this.component.getNumberValueForView(returnValue.toString(),
					dataType,
					numProps && numProps.isoCode ? numProps.isoCode : row.Currency,
					field.ui_type,
					numProps && numProps.currencyDetails ? numProps.currencyDetails : Crm.userDetails.CURRENCY_DETAILS,
					field.hasOwnProperty('decimal_place') ? field.decimal_place : numProps && numProps.defaultRoundOff ? numProps.defaultRoundOff : Crm.userDetails.defaultRoundOff ? Crm.userDetails.defaultRoundOff : 2,
					numProps && numProps.currencyCode ? numProps.currencyCode : Crm.userDetails.BASE_CURRENCY,
					numProps && numProps.exchangeRate ? numProps.exchangeRate : undefined,
					numProps && numProps.exchangeRateFinance ? numProps.exchangeRateFinance : undefined,
					row.$home_converted_currency ? row.$home_converted_currency[field.api_name] : undefined,
					numProps && numProps.hasOwnProperty('displayCurrency') ? numProps.displayCurrency : true,
					row.$formatted_currency ? row.$formatted_currency[field.api_name] : undefined,
					field.separator, numProps && numProps.defaultOrgCurrency ? numProps.defaultOrgCurrency : Crm.userDetails.defaultOrgCurrency,
					field.currency ? field.currency.rounding_option : undefined,
					field.currency ? field.currency.precision : undefined);
			}
			return returnValue;
		} else if (field.cxTypeMapping === "boolean") {
			return "";
		}else if(field.cxTypeMapping === "lookup"){
			return returnValue.name;
		}
		return returnValue;
	}
});
Lyte.Component.registerHelper("getInVisibleTdCssAttrValue", function (attributeName, row, field) {
	let finalAttributeValue = "";
	switch (field.cxTypeMapping) {
		case 'boolean': {
			if (attributeName === 'class' && row[field.api_name]) {
				finalAttributeValue = "criteria-yes";
			}
			break;
		}
		case 'email':
		case 'twitter': {
			if (attributeName === 'class' && row[field.api_name]) {
				finalAttributeValue = "cxInvisibleTdLinkSpan";
			}
			break;
		}
		case 'picklist': {
			if (field.enable_colour_code) {
				let attributeVal = this.component.getColouredPicklistStyleDetails(field,
					Lyte.Component.registeredHelpers.getCruxTableValue1(row, field),
					'-None-');
				if (attributeName === 'class' && attributeVal.pkColorEnabledClass) {
					finalAttributeValue = attributeVal.pkColorEnabledClass;
				} else if (attributeName === 'style' && attributeVal.propColorStyleObj) {
					finalAttributeValue = attributeVal.propColorStyleObj;
				}
			}
			break;
		}
	}
	return finalAttributeValue;
});
Lyte.Component.registerHelper("isFillerTdContentNeeded", function (cxPropCellIntersection, isCellVisible) {
	let showFillerContent = false;
	if (cxPropCellIntersection) {
		showFillerContent = isCellVisible ? false : true;
	}
	return showFillerContent;
});

Lyte.Component.registerHelper("getCruxTableFieldData", function(prop,field,rowId,cellProp) {
	switch(prop){
		case 'disabled':
			return cellProp && cellProp[rowId] && cellProp[rowId][field.api_name] && cellProp[rowId][field.api_name].hasOwnProperty('read_only') ?  cellProp[rowId][field.api_name]['read_only'] : (field.disabled || field.read_only);

	}
});
Lyte.Component.registerHelper("getCxTableRenderingCase", function (cxPropEditMode,
	cxTypeMapping,
	fieldData,
	fieldDataLength,
	enable_colour_code,
	lineClamp,
	field,
	row,
	cxPropNumberProperties,
	cxPropClipMode,
	fieldYield,
	yieldName,
	cxPropAllRowsEditable,
	cxPropAjaxEditId,
	rowId) {

	//<%if(cxPropAllRowsEditable || cxPropAjaxEditId !==undefined && cxPropAjaxEditId===row.id){%>
	if (cxPropAllRowsEditable || cxPropAjaxEditId !== undefined && cxPropAjaxEditId === rowId) {
		return 'editableRow';
	}
	//<%if(field.yield || field.yieldName){%>
	if (fieldYield || yieldName) {
		return 'yield';
	}
	//<%if(cxPropEditMode){%>
	if (cxPropEditMode) {
		return 'editMode';
	}
	//<%if(field.cxTypeMapping == "lookup" && row[field.api_name]){%>
	if (cxTypeMapping === "lookup" && fieldData) {
		return 'lookup';
	}
	//<%}else if((field.cxTypeMapping == "tag" && row[field.api_name].length != 0) || (field.cxTypeMapping == "user" && row[field.api_name]) || (field.cxTypeMapping == "picklist" && field.enable_colour_code) || (field.cxTypeMapping == "number" && !cxPropNumberProperties) || (field.cxTypeMapping=='text-area' && (cxPropClipMode || cxPropTextareaProperties.lineClamp)) || (field.cxTypeMapping=='image')){%>
	if ((cxTypeMapping === "tag" && fieldData && fieldData.length !== 0) ||
		(cxTypeMapping === "user" && fieldData) ||
		(cxTypeMapping === "picklist" && enable_colour_code) ||
		(cxTypeMapping === "number" && !cxPropNumberProperties) ||
		(cxTypeMapping === 'text-area' && ( lineClamp || cxPropClipMode)) ||
		(cxTypeMapping === 'image')
	) {
		return 'component';
	}
	return (cxTypeMapping === "boolean" && field && field.cxPropEditable )? "customEditable" : 'unescape';
});
//(cxPropShowSortIcon && (field.sortable || cxPropEnableAllFieldSort)) || (checkForMaskPermission(field.mask_details , cxPropProfileId) && cxPropMaskUnmaskIcon) || (!field.mask_details && cxPropShowNoMaskFieldSortIcon)
Lyte.Component.registerHelper("showCxTableMenuIcon", function(cxPropShowSortIcon,sortable,showMenuIcon,cxPropEnableAllFieldSort,maskDetails,cxPropProfileId) {
	if( showMenuIcon ){ return showMenuIcon; } // This check is to enable the sort icon only for specific fields when cxPropShowSortIcon is set to false.
	if( !cxPropShowSortIcon ){ return false; }
	if(cxPropEnableAllFieldSort){ return cxPropEnableAllFieldSort; }
	if(maskDetails ){
		return Lyte.Component.registeredHelpers.checkForMaskPermission(maskDetails , cxPropProfileId);
	}
	return  sortable;
	// return (cxPropShowSortIcon && (showMenuIcon!==undefined ? showMenuIcon : sortable || cxPropEnableAllFieldSort)) || (Lyte.Component.registeredHelpers.checkForMaskPermission(maskDetails , cxPropProfileId) && cxPropMaskUnmaskIcon) || (!maskDetails && cxPropShowNoMaskFieldSortIcon);
});
/**
 * @syntax nonYielded
 * <crux-table-component
 * cx-prop-header='[{"api_name":"SingleLine","field_label":"Single Line","data_type":"text"},{"api_name":"Annual_Revenue","field_label":"Annual Revenue","data_type":"currency"},{"api_name":"is_Email_Optout","field_label":"is Email Optout","data_type":"boolean"},{"api_name":"CF_Picklist","field_label":"CF Picklist","data_type":"picklist","enable_colour_code":true,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"3201447000000002203","type":"used"},{"display_value":"Acquired","sequence_number":2,"reference_value":"Acquired","colour_code":"#25b52a","actual_value":"Acquired","id":"3201447000000002205","type":"used"},{"display_value":"Active","sequence_number":3,"reference_value":"Active","colour_code":"#ffd6bc","actual_value":"Active","id":"3201447000000002207","type":"used"},{"display_value":"Market Failed","sequence_number":4,"reference_value":"Market Failed","colour_code":"#eb4d4d","actual_value":"Market Failed","id":"3201447000000002209","type":"used"},{"display_value":"Project Cancelled","sequence_number":5,"reference_value":"Project Cancelled","colour_code":"#eb4d4d","actual_value":"Project Cancelled","id":"3201447000000002211","type":"used"},{"display_value":"Shut Down","sequence_number":6,"reference_value":"Shut Down","colour_code":"#eb4d4d","actual_value":"ShutDown","id":"3201447000000002213","type":"used"}]},{"api_name":"Total_Employees","field_label":"Total Employees"},{"api_name":"Email","field_label":"Custom Email","data_type":"email"},{"api_name":"Phone","field_label":"Mobile Number","data_type":"phone"}]'
 * cx-prop-content='[{"SingleLine":"Custom TextValue","is_Email_Optout":true,"Annual_Revenue":133,"CF_Picklist":"Shut Down","Email":"new@zmail.com"},{"SingleLine":"2 TextValue","is_Email_Optout":false,"Annual_Revenue":789,"CF_Picklist":"Project Cancelled","Phone":"9918902290","Email":"test-new@zmail.com"},{"SingleLine":"Old Old Old TextValue","is_Email_Optout":true,"Annual_Revenue":666,"Total_Employees":1020},{"SingleLine":"qiwoqeujilsjndifjl sfiansfikjiosfj","is_Email_Optout":false,"Annual_Revenue":35,"CF_Picklist":"Active","Phone":"9918902290","Email":"test-new@zmail.com"},{"Total_Employees":15001,"SingleLine":"Custom TextValue","is_Email_Optout":true,"Annual_Revenue":133234},{"SingleLine":"CustomTable One","is_Email_Optout":true,"CF_Picklist":"Market Failed"},{"SingleLine":"Table textcontent TextValue","is_Email_Optout":true,"Annual_Revenue":30000,"Phone":"9918902290","Email":"test-new@zmail.com"},{"Total_Employees":15001,"SingleLine":"qwerty","is_Email_Optout":false,"Annual_Revenue":112010928,"CF_Picklist":"Acquired"},{"SingleLine":"new sample","is_Email_Optout":true,"CF_Picklist":"Shut Down"},{"is_Email_Optout":false,"Annual_Revenue":900,"Phone":"9918902290","Email":"records.tes@gmail.com","CF_Picklist":"Active"}]'>
 * </crux-table-component>
 */
