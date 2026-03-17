/**
 * @component lyte-font-library
 * @version 1.0.0
 */
_lyteUiUtils.fontLibraryRandomIdCounter = 0;

Lyte.Component.register("lyte-font-library", {
_template:"<template tag-name=\"lyte-font-library\"> <lyte-menu lt-prop-freeze=\"false\" lt-prop-query=\"[data-submenuquery='{{itemQuery}}']\" class=\"variantsSubMenu\" lt-prop-yield=\"true\" lt-prop-event=\"mouseenter\" lt-prop-position=\"right\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"lyteFontLibraryVariantsSubMenuBody\"> <template is=\"for\" items=\"{{variantsSubMenu}}\" item=\"variant\" index=\"index\"> <lyte-menu-item onclick=\"{{action('selectFontVariant',fontBeingHovered,variant,event)}}\" data-value=\"{{variant.key}}\" style=\"font-family:'{{fontBeingHovered.name}}', sans-serif; font-weight: {{variant.weight}}; font-style: {{variant.style}};\"> <lyte-menu-label>{{variant.label}}</lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <div class=\"lyteFontLibraryDropdownWrap\"> <lyte-dropdown lt-prop-allow-focusable-elements=\"true\" lt-prop-active-element=\"#{{inputId}} input\" class=\"lyteFontLibraryDropdown\" on-open=\"{{method('emptySearch')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button> {{if(selectedFontName,selectedFontName,lyteUiI18n('lyte.fontlibrary.select_font'))}} </lyte-drop-button> <lyte-drop-box class=\"lyteFontLibraryDropdownBox\"> <lyte-drop-header> <div class=\"lyteFontLibraryDropHeader\"> <lyte-search id=\"{{inputId}}\" class=\"lyteFontLibraryDropdownSearch\" lt-prop-placeholder=\"{{lyteUiI18n('lyte.fontlibrary.search')}}\" lt-prop-appearance=\"box\" lt-prop-query-selector=\"{&quot;scope&quot;: &quot;[data-body-id=\\&quot;{{bodyId}}\\&quot;]&quot;, &quot;search&quot;: &quot;lyte-drop-item&quot;, &quot;target&quot;: &quot;lyte-drop-item&quot;, &quot;related&quot;: &quot;lyte-drop-label, .lyteFontLibrarySectionHeader&quot; }\"> </lyte-search> <div class=\"lyteFontLibraryViewToggle\"> <span class=\"lyteFontLibraryViewButton {{if(expHandlers(dropdownView,'==','list'),'is-active','')}}\" onclick=\"{{action('setDropdownView','list')}}\"> <span class=\"lyteFontLibraryTabIcon lyteFontLibraryListIcon\"></span> </span> <span class=\"lyteFontLibraryViewButton {{if(expHandlers(dropdownView,'==','grid'),'is-active','')}}\" onclick=\"{{action('setDropdownView','grid')}}\"> <span class=\"lyteFontLibraryTabIcon lyteFontLibraryGridIcon\"></span> </span> </div> </div> </lyte-drop-header> <lyte-drop-body data-body-id=\"{{bodyId}}\" class=\"lyteFontLibraryDropdownBody\"> <template is=\"if\" value=\"{{expHandlers(dropdownView,'==','list')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(recentFontsList.length,'>',0)}}\"><template case=\"true\"> <lyte-drop-group> <lyte-drop-label class=\"lyteFontLibrarySectionHeader\">{{lyteUiI18n('lyte.fontlibrary.recent_fonts')}}</lyte-drop-label> <template is=\"for\" items=\"{{recentFontsList}}\" item=\"font\" index=\"index\"> <lyte-drop-item onmouseenter=\"{{action('setVariant',font)}}\" data-submenuquery=\"{{if(expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1)),itemQuery,'')}}\" data-value=\"{{font.name}}\" data-font-name=\"{{font.name}}\" data-font-url=\"{{if(font.url,font.url,font.cssUrl)}}\" data-font-weight=\"{{font.displayWeight}}\" data-font-style=\"{{font.displayStyle}}\" onclick=\"{{action('selectDropdownFont',font,event)}}\" style=\"font-family:'{{font.name}}', sans-serif; font-weight: {{font.displayWeight}}; font-style: {{font.displayStyle}};\"> {{if(font.displayLabel,font.displayLabel,font.name)}} <template is=\"if\" value=\"{{expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1))}}\"><template case=\"true\"> <span class=\"lyteFontLibraryVariantChevron\"></span> </template></template> </lyte-drop-item> </template> </lyte-drop-group> </template></template> <template is=\"if\" value=\"{{expHandlers(themeFontsList.length,'>',0)}}\"><template case=\"true\"> <lyte-drop-group> <lyte-drop-label class=\"lyteFontLibrarySectionHeader\">{{lyteUiI18n('lyte.fontlibrary.theme_fonts')}}</lyte-drop-label> <template is=\"for\" items=\"{{themeFontsList}}\" item=\"font\" index=\"index\"> <lyte-drop-item onmouseenter=\"{{action('setVariant',font)}}\" data-submenuquery=\"{{if(expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1)),itemQuery,'')}}\" data-value=\"{{font.name}}\" data-font-name=\"{{font.name}}\" data-font-url=\"{{if(font.url,font.url,font.cssUrl)}}\" data-font-weight=\"{{font.displayWeight}}\" data-font-style=\"{{font.displayStyle}}\" onclick=\"{{action('selectDropdownFont',font,event)}}\" style=\"font-family:'{{font.name}}', sans-serif; font-weight: {{font.displayWeight}}; font-style: {{font.displayStyle}};\"> {{if(font.displayLabel,font.displayLabel,font.name)}} <template is=\"if\" value=\"{{expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1))}}\"><template case=\"true\"> <span class=\"lyteFontLibraryVariantChevron\"></span> </template></template> </lyte-drop-item> </template> </lyte-drop-group> </template></template> <template is=\"if\" value=\"{{expHandlers(myFontsList.length,'>',0)}}\"><template case=\"true\"> <lyte-drop-group> <div class=\"lyteFontLibraryMyFontsFooter\"> <lyte-drop-label class=\"lyteFontLibrarySectionHeader\">{{lyteUiI18n('lyte.fontlibrary.my_fonts')}}</lyte-drop-label> </div> <template is=\"for\" items=\"{{myFontsList}}\" item=\"font\" index=\"index\"> <lyte-drop-item onmouseenter=\"{{action('setVariant',font)}}\" data-submenuquery=\"{{if(expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1)),itemQuery,'')}}\" data-value=\"{{font.name}}\" data-font-name=\"{{font.name}}\" data-font-url=\"{{if(font.url,font.url,font.cssUrl)}}\" data-font-weight=\"{{font.displayWeight}}\" data-font-style=\"{{font.displayStyle}}\" onclick=\"{{action('selectDropdownFont',font,event)}}\" style=\"font-family:'{{font.name}}', sans-serif; font-weight: {{font.displayWeight}}; font-style: {{font.displayStyle}};\"> {{if(font.displayLabel,font.displayLabel,font.name)}} <template is=\"if\" value=\"{{expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1))}}\"><template case=\"true\"> <span class=\"lyteFontLibraryVariantChevron\"></span> </template></template> </lyte-drop-item> </template> </lyte-drop-group> </template></template> <span class=\"lyteFontLibraryFooterAction\" onclick=\"{{action('openModal')}}\">{{lyteUiI18n('lyte.fontlibrary.add_fonts')}}</span> <lyte-drop-group> <lyte-drop-label class=\"lyteFontLibrarySectionHeader\">{{lyteUiI18n('lyte.fontlibrary.default_fonts')}}</lyte-drop-label> <template is=\"for\" items=\"{{ltPropDefaultFonts}}\" item=\"font\" index=\"index\"> <lyte-drop-item onmouseenter=\"{{action('setVariant',font)}}\" data-submenuquery=\"{{if(expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1)),itemQuery,'')}}\" data-value=\"{{font.name}}\" data-font-name=\"{{font.name}}\" data-font-url=\"{{if(font.url,font.url,font.cssUrl)}}\" data-font-weight=\"{{font.displayWeight}}\" data-font-style=\"{{font.displayStyle}}\" onclick=\"{{action('selectDropdownFont',font,event)}}\" style=\"font-family:'{{font.name}}', sans-serif; font-weight: {{font.displayWeight}}; font-style: {{font.displayStyle}};\"> {{if(font.displayLabel,font.displayLabel,font.name)}} <template is=\"if\" value=\"{{expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1))}}\"><template case=\"true\"> <span class=\"lyteFontLibraryVariantChevron\"></span> </template></template> </lyte-drop-item> </template> <template is=\"if\" value=\"{{expHandlers(ltPropDefaultFonts.length,'===',0)}}\"><template case=\"true\"> <div class=\"lyteFontLibraryEmpty\">{{lyteUiI18n('lyte.fontlibrary.no_fonts_found')}}</div> </template></template> </lyte-drop-group> </template></template> <template is=\"if\" value=\"{{expHandlers(dropdownView,'==','grid')}}\"><template case=\"true\"> <div class=\"lyteFontLibraryDropGrid\"> <div class=\"lyteFontLibrarySectionHeader\">{{lyteUiI18n('lyte.fontlibrary.recent_fonts')}}</div> <div class=\"lyteFontLibraryCardGrid\"> <template is=\"for\" items=\"{{recentFontsList}}\" item=\"font\" index=\"index\"> <div class=\"lyteFontLibraryCard\" style=\"font-family:'{{font.name}}', sans-serif; font-weight: {{font.displayWeight}}; font-style: {{font.displayStyle}};\" onmouseenter=\"{{action('setVariant',font)}}\" data-submenuquery=\"{{if(expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1)),itemQuery,'')}}\" data-font-name=\"{{font.name}}\" data-font-url=\"{{if(font.url,font.url,font.cssUrl)}}\" data-font-weight=\"{{font.displayWeight}}\" data-font-style=\"{{font.displayStyle}}\" onclick=\"{{action('selectDropdownFont',font,event)}}\"> <template is=\"if\" value=\"{{expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1))}}\"><template case=\"true\"> <span class=\"lyteFontLibraryCardChevron\"></span> </template></template> <div class=\"lyteFontLibraryCardTitle\">{{if(font.displayLabel,font.displayLabel,font.name)}}</div> <div class=\"lyteFontLibraryCardPreview\">{{lyteUiI18n('lyte.fontlibrary.preview_text')}}</div> </div> </template> </div> <div class=\"lyteFontLibrarySectionHeader\">{{lyteUiI18n('lyte.fontlibrary.theme_fonts')}}</div> <div class=\"lyteFontLibraryCardGrid\"> <template is=\"for\" items=\"{{themeFontsList}}\" item=\"font\" index=\"index\"> <div class=\"lyteFontLibraryCard\" style=\"font-family:'{{font.name}}', sans-serif; font-weight: {{font.displayWeight}}; font-style: {{font.displayStyle}};\" onmouseenter=\"{{action('setVariant',font)}}\" data-submenuquery=\"{{if(expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1)),itemQuery,'')}}\" data-font-name=\"{{font.name}}\" data-font-url=\"{{if(font.url,font.url,font.cssUrl)}}\" data-font-weight=\"{{font.displayWeight}}\" data-font-style=\"{{font.displayStyle}}\" onclick=\"{{action('selectDropdownFont',font,event)}}\"> <template is=\"if\" value=\"{{expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1))}}\"><template case=\"true\"> <span class=\"lyteFontLibraryCardChevron\"></span> </template></template> <div class=\"lyteFontLibraryCardTitle\">{{if(font.displayLabel,font.displayLabel,font.name)}}</div> <div class=\"lyteFontLibraryCardPreview\">{{lyteUiI18n('lyte.fontlibrary.preview_text')}}</div> </div> </template> </div> <div class=\"lyteFontLibraryMyFontsFooter\"> <div class=\"lyteFontLibrarySectionHeader\">{{lyteUiI18n('lyte.fontlibrary.my_fonts')}}</div> <span class=\"lyteFontLibraryFooterAction\" onclick=\"{{action('openModal')}}\">{{lyteUiI18n('lyte.fontlibrary.add_fonts')}}</span> </div> <div class=\"lyteFontLibraryCardGrid\"> <template is=\"for\" items=\"{{myFontsList}}\" item=\"font\" index=\"index\"> <div class=\"lyteFontLibraryCard\" style=\"font-family:'{{font.name}}', sans-serif; font-weight: {{font.displayWeight}}; font-style: {{font.displayStyle}};\" onmouseenter=\"{{action('setVariant',font)}}\" data-submenuquery=\"{{if(expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1)),itemQuery,'')}}\" data-font-name=\"{{font.name}}\" data-font-url=\"{{if(font.url,font.url,font.cssUrl)}}\" data-font-weight=\"{{font.displayWeight}}\" data-font-style=\"{{font.displayStyle}}\" onclick=\"{{action('selectDropdownFont',font,event)}}\"> <template is=\"if\" value=\"{{expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1))}}\"><template case=\"true\"> <span class=\"lyteFontLibraryCardChevron\"></span> </template></template> <div class=\"lyteFontLibraryCardTitle\">{{if(font.displayLabel,font.displayLabel,font.name)}}</div> <div class=\"lyteFontLibraryCardPreview\">{{lyteUiI18n('lyte.fontlibrary.preview_text')}}</div> </div> </template> <template is=\"if\" value=\"{{expHandlers(myFontsList.length,'===',0)}}\"><template case=\"true\"> <div class=\"lyteFontLibraryEmpty\">{{lyteUiI18n('lyte.fontlibrary.no_my_fonts')}}</div> </template></template> </div> <div class=\"lyteFontLibrarySectionHeader\">{{lyteUiI18n('lyte.fontlibrary.default_fonts')}}</div> <div class=\"lyteFontLibraryCardGrid\"> <template is=\"for\" items=\"{{ltPropDefaultFonts}}\" item=\"font\" index=\"index\"> <div class=\"lyteFontLibraryCard\" style=\"font-family:'{{font.name}}', sans-serif; font-weight: {{font.displayWeight}}; font-style: {{font.displayStyle}};\" onmouseenter=\"{{action('setVariant',font)}}\" data-submenuquery=\"{{if(expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1)),itemQuery,'')}}\" data-font-name=\"{{font.name}}\" data-font-url=\"{{if(font.url,font.url,font.cssUrl)}}\" data-font-weight=\"{{font.displayWeight}}\" data-font-style=\"{{font.displayStyle}}\" onclick=\"{{action('selectDropdownFont',font,event)}}\"> <template is=\"if\" value=\"{{expHandlers(font.variants,'&amp;&amp;',expHandlers(font.variants.length,'>',1))}}\"><template case=\"true\"> <span class=\"lyteFontLibraryCardChevron\"></span> </template></template> <div class=\"lyteFontLibraryCardTitle\">{{if(font.displayLabel,font.displayLabel,font.name)}}</div> <div class=\"lyteFontLibraryCardPreview\">{{lyteUiI18n('lyte.fontlibrary.preview_text')}}</div> </div> </template> </div> </div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> <lyte-modal class=\"lyteFontLibraryModal\" lt-prop-show-close-button=\"true\" lt-prop-width=\"760px\" lt-prop-height=\"480px\" lt-prop-freeze=\"true\" on-show=\"{{method('onModalShow')}}\" lt-prop-show=\"{{lbind(ltPropShow)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header class=\"lyteFontLibraryHeader\"> <span class=\"lyteFontLibraryTitle\">{{lyteUiI18n('lyte.fontlibrary.font_library')}}</span> </lyte-modal-header> <lyte-modal-content class=\"lyteFontLibraryContent\"> <div class=\"lyteFontLibraryListView\"> <div class=\"lyteFontLibrarySidebar\"> <lyte-input id=\"{{sidebarInputId}}\" lt-prop-placeholder=\"{{lyteUiI18n('lyte.fontlibrary.search')}}\" lt-prop-appearance=\"box\" on-value-change=\"{{method('searchElements',event)}}\"> </lyte-input> <div class=\"lyteFontLibraryNav\"> <div class=\"lyteFontLibraryNavItem {{if(expHandlers(selectedCategory,'==','my'),'is-active','')}}\" onclick=\"{{action('selectCategory','my')}}\"> <span>{{lyteUiI18n('lyte.fontlibrary.my_fonts')}}</span> <span class=\"lyteFontLibraryCount\">{{myFontsList.length}}</span> </div> <div class=\"lyteFontLibraryNavItem {{if(expHandlers(selectedCategory,'==','all'),'is-active','')}}\" onclick=\"{{action('selectCategory','all')}}\"> <span>{{lyteUiI18n('lyte.fontlibrary.all_fonts')}}</span> </div> <template is=\"for\" items=\"{{categories}}\" item=\"cat\" index=\"index\"> <div class=\"lyteFontLibraryNavItem {{if(expHandlers(selectedCategory,'==',cat.id),'is-active','')}}\" onclick=\"{{action('selectCategory',cat.id)}}\"> <span>{{if(expHandlers(cat.id,'==','others'),lyteUiI18n('lyte.fontlibrary.others'),cat.label)}}</span> </div> </template> </div> <div class=\"lyteFontLibraryLanguage\"> <lyte-dropdown class=\"lyteFontLibraryLanguageDropdown\" on-option-selected=\"{{method('selectLanguage')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{ltPropLanguageOptions}}\" item=\"option\" index=\"index\"> <lyte-drop-item data-value=\"{{option}}\">{{if(expHandlers(option,'==','all'),lyteUiI18n('lyte.fontlibrary.all_languages'),option)}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </div> <div class=\"lyteFontLibraryFontList\" onscroll=\"{{action('onFontListScroll',event)}}\"> <template is=\"if\" value=\"{{expHandlers(selectedCategory,'==','my')}}\"><template case=\"true\"> <div class=\"lyteFontLibraryMyFontsHeader\"> <button class=\"lyteFontLibraryRemoveAll {{if(expHandlers(myFontsList.length,'==',0),'is-disabled','')}}\" onclick=\"{{action('removeAllMyFonts',event)}}\"> {{lyteUiI18n('lyte.fontlibrary.remove_all')}} </button> </div> </template></template> <template is=\"for\" items=\"{{visibleFonts}}\" item=\"font\" index=\"index\"> <div class=\"lyteFontLibraryFontRow {{lyteUiMyFontClass(font,myFontsList)}}\" data-font-name=\"{{font.name}}\" data-font-url=\"{{if(font.url,font.url,font.cssUrl)}}\" data-font-weight=\"{{font.displayWeight}}\" data-font-style=\"{{font.displayStyle}}\" onclick=\"{{action('selectFont',font.name)}}\"> <span class=\"lyteFontLibraryFontName\" style=\"font-family:'{{font.name}}', sans-serif; font-weight: {{font.displayWeight}}; font-style: {{font.displayStyle}};\">{{font.name}}</span> <template is=\"if\" value=\"{{expHandlers(selectedCategory,'==','my')}}\"><template case=\"true\"> <span class=\"lyteFontLibraryRemoveIcon\" onclick=\"{{action('removeFromMyFonts',font.name,event)}}\">✕</span> </template><template case=\"false\"> <span class=\"lyteFontLibraryAddIcon\" onclick=\"{{action('addToMyFonts',font.name,event)}}\">+</span> </template></template> </div> </template> <template is=\"if\" value=\"{{expHandlers(filteredFonts.length,'===',0)}}\"><template case=\"true\"> <div class=\"lyteFontLibraryEmpty\">{{lyteUiI18n('lyte.fontlibrary.no_fonts_found')}}</div> </template></template> </div> <div class=\"lyteFontLibraryDetails\"> <template is=\"if\" value=\"{{expHandlers(lyteUiIsEmptyObject(selectedFont),'!')}}\"><template case=\"true\"> <div class=\"lyteFontLibraryDetailsHeader\"> <div class=\"lyteFontLibraryDetailsTitle\">{{selectedFont.name}}</div> <div class=\"lyteFontLibraryDetailsControls\"> <lyte-dropdown class=\"lyteFontLibraryVariantDropdown\" on-option-selected=\"{{action('selectVariant')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button style=\"font-family:'{{selectedFont.name}}', sans-serif; font-weight: {{selectedVariantWeight}}; font-style: {{selectedVariantStyle}};\"> {{selectedVariantLabel}} </lyte-drop-button> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{variantOptions}}\" item=\"variant\" index=\"index\"> <lyte-drop-item data-value=\"{{variant.key}}\" style=\"font-family:'{{selectedFont.name}}', sans-serif; font-weight: {{variant.weight}}; font-style: {{variant.style}};\">{{variant.label}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <span class=\"lyteFontLibraryAaToggle {{if(showAaPanel,'is-active','')}}\" onclick=\"{{action('toggleAaPanel')}}\">Aa</span> <span class=\"lyteFontLibraryInfoToggle {{if(showInfoPanel,'is-active','')}}\" onclick=\"{{action('toggleInfoPanel')}}\">i</span> </div> </div> <div class=\"lyteFontLibraryPreview\" style=\"font-family:'{{selectedFont.name}}', sans-serif; font-weight: {{selectedVariantWeight}}; font-style: {{selectedVariantStyle}};\"> {{lyteUiI18n('lyte.fontlibrary.preview_text')}} </div> </template></template> <template is=\"if\" value=\"{{lyteUiIsEmptyObject(selectedFont)}}\"><template case=\"true\"> <div class=\"lyteFontLibraryPlaceholder\">{{lyteUiI18n('lyte.fontlibrary.select_font_details')}}</div> </template></template> <div class=\"lyteFontLibraryInfoPanel {{if(showInfoPanel,'is-open','')}}\"> <div class=\"lyteFontLibraryInfoPanelHeader\"> <span class=\"lyteFontLibraryInfoPanelTitle\">{{if(selectedFont,selectedFont.name,'')}}</span> <span class=\"lyteFontLibraryInfoPanelIcon\" onclick=\"{{action('toggleInfoPanel')}}\">i</span> </div> <div class=\"lyteFontLibraryInfoPanelBody\"> <div class=\"lyteFontLibraryInfoRow\"> <span class=\"lyteFontLibraryInfoLabel\">{{lyteUiI18n('lyte.fontlibrary.font_family')}}</span> <span class=\"lyteFontLibraryInfoValue\">{{if(selectedFont,selectedFont.name,'')}}</span> </div> <div class=\"lyteFontLibraryInfoRow\"> <span class=\"lyteFontLibraryInfoLabel\">{{lyteUiI18n('lyte.fontlibrary.category')}}</span> <span class=\"lyteFontLibraryInfoValue\">{{if(expHandlers(infoCategoryId,'==','others'),lyteUiI18n('lyte.fontlibrary.others'),if(infoCategoryLabel,infoCategoryLabel,'-'))}}</span> </div> <div class=\"lyteFontLibraryInfoRow\"> <span class=\"lyteFontLibraryInfoLabel\">{{lyteUiI18n('lyte.fontlibrary.font_variants')}}</span> <span class=\"lyteFontLibraryInfoValue\">{{if(infoVariantsText,infoVariantsText,'-')}}</span> </div> <div class=\"lyteFontLibraryInfoRow\"> <span class=\"lyteFontLibraryInfoLabel\">{{lyteUiI18n('lyte.fontlibrary.languages')}}</span> <span class=\"lyteFontLibraryInfoValue\">{{if(infoLanguagesText,infoLanguagesText,'-')}}</span> </div> </div> </div> </div> <div class=\"lyteFontLibraryAaPanel {{if(showAaPanel,'is-open','')}}\"> <div class=\"lyteFontLibraryAaPanelHeader\"> <button class=\"lyteFontLibraryAaBack\" onclick=\"{{action('toggleAaPanel')}}\">‹</button> <span class=\"lyteFontLibraryAaPanelTitle\">{{if(selectedFont,selectedFont.name,'')}}</span> <span class=\"lyteFontLibraryAaPanelAa\">Aa</span> </div> <div class=\"lyteFontLibraryAaPanelBody\"> <div class=\"lyteFontLibraryAaControls\"> <lyte-dropdown class=\"lyteFontLibraryAaVariantDropdown\" on-option-selected=\"{{action('selectAaVariant')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button style=\"font-family:'{{if(selectedFont,selectedFont.name,'')}}', sans-serif; font-weight: {{selectedVariantWeight}}; font-style: {{selectedVariantStyle}};\"> {{selectedVariantLabel}} </lyte-drop-button> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{variantOptions}}\" item=\"variant\" index=\"index\"> <lyte-drop-item data-value=\"{{variant.key}}\" style=\"font-family:'{{if(selectedFont,selectedFont.name,'')}}', sans-serif; font-weight: {{variant.weight}}; font-style: {{variant.style}};\">{{variant.label}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> <template is=\"for\" items=\"{{previewSizes}}\" item=\"size\" index=\"index\"> <div class=\"lyteFontLibraryAaRow\"> <span class=\"lyteFontLibraryAaSize\">{{size}}</span> <span class=\"lyteFontLibraryAaSample\" style=\"font-family:'{{if(selectedFont,selectedFont.name,'')}}', sans-serif; font-weight: {{selectedVariantWeight}}; font-style: {{selectedVariantStyle}}; font-size: {{size}}px;\"> {{lyteUiI18n('lyte.fontlibrary.preview_text')}} </span> </div> </template> </div> </div> </div> </lyte-modal-content> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","fontBeingHovered.name","'', sans-serif; font-weight: '","variant.weight","'; font-style: '","variant.style","';'"]}}}},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1,1]},{"type":"componentDynamic","position":[3,1,1,1]},{"type":"attr","position":[3,1,1,3,1]},{"type":"attr","position":[3,1,1,3,3]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","font.name","'', sans-serif; font-weight: '","font.displayWeight","'; font-style: '","font.displayStyle","';'"]}}}},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","font.name","'', sans-serif; font-weight: '","font.displayWeight","'; font-style: '","font.displayStyle","';'"]}}}},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","font.name","'', sans-serif; font-weight: '","font.displayWeight","'; font-style: '","font.displayStyle","';'"]}}}},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"text","position":[7,0]},{"type":"text","position":[9,1,0]},{"type":"componentDynamic","position":[9,1]},{"type":"attr","position":[9,3]},{"type":"for","position":[9,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","font.name","'', sans-serif; font-weight: '","font.displayWeight","'; font-style: '","font.displayStyle","';'"]}}}},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[9,5]},{"type":"if","position":[9,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[9]}]}},"default":{}},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","font.name","'', sans-serif; font-weight: '","font.displayWeight","'; font-style: '","font.displayStyle","';'"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"text","position":[1,5,0]}]},{"type":"text","position":[1,5,0]},{"type":"attr","position":[1,7,1]},{"type":"for","position":[1,7,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","font.name","'', sans-serif; font-weight: '","font.displayWeight","'; font-style: '","font.displayStyle","';'"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"text","position":[1,5,0]}]},{"type":"text","position":[1,9,1,0]},{"type":"attr","position":[1,9,3]},{"type":"text","position":[1,9,3,0]},{"type":"attr","position":[1,11,1]},{"type":"for","position":[1,11,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","font.name","'', sans-serif; font-weight: '","font.displayWeight","'; font-style: '","font.displayStyle","';'"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"text","position":[1,5,0]}]},{"type":"attr","position":[1,11,3]},{"type":"if","position":[1,11,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,13,0]},{"type":"attr","position":[1,15,1]},{"type":"for","position":[1,15,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","font.name","'', sans-serif; font-weight: '","font.displayWeight","'; font-style: '","font.displayStyle","';'"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"text","position":[1,5,0]}]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1,1]},{"type":"componentDynamic","position":[3,1,1,1]},{"type":"attr","position":[3,1,1,3,1]},{"type":"text","position":[3,1,1,3,1,1,0]},{"type":"text","position":[3,1,1,3,1,3,0]},{"type":"attr","position":[3,1,1,3,3]},{"type":"text","position":[3,1,1,3,3,1,0]},{"type":"attr","position":[3,1,1,3,5]},{"type":"for","position":[3,1,1,3,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]},{"type":"attr","position":[3,1,1,5,1]},{"type":"registerYield","position":[3,1,1,5,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1,1,5,1]},{"type":"attr","position":[3,1,3]},{"type":"attr","position":[3,1,3,1]},{"type":"if","position":[3,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1]}]}},"default":{}},{"type":"attr","position":[3,1,3,3]},{"type":"for","position":[3,1,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","font.name","'', sans-serif; font-weight: '","font.displayWeight","'; font-style: '","font.displayStyle","';'"]}}}},{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},{"type":"attr","position":[3,1,3,5]},{"type":"if","position":[3,1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1,5,1]},{"type":"if","position":[3,1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","selectedFont.name","'', sans-serif; font-weight: '","selectedVariantWeight","'; font-style: '","selectedVariantStyle","';'"]}}}},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","selectedFont.name","'', sans-serif; font-weight: '","variant.weight","'; font-style: '","variant.style","';'"]}}}},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"attr","position":[1,3,5]},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''","selectedFont.name","'', sans-serif; font-weight: '","selectedVariantWeight","'; font-style: '","selectedVariantStyle","';'"]}}}},{"type":"text","position":[3,1]}]}},"default":{}},{"type":"attr","position":[3,1,5,3]},{"type":"if","position":[3,1,5,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1,5,5]},{"type":"text","position":[3,1,5,5,1,1,0]},{"type":"attr","position":[3,1,5,5,1,3]},{"type":"text","position":[3,1,5,5,3,1,1,0]},{"type":"text","position":[3,1,5,5,3,1,3,0]},{"type":"text","position":[3,1,5,5,3,3,1,0]},{"type":"text","position":[3,1,5,5,3,3,3,0]},{"type":"text","position":[3,1,5,5,3,5,1,0]},{"type":"text","position":[3,1,5,5,3,5,3,0]},{"type":"text","position":[3,1,5,5,3,7,1,0]},{"type":"text","position":[3,1,5,5,3,7,3,0]},{"type":"attr","position":[3,1,7]},{"type":"attr","position":[3,1,7,1,1]},{"type":"text","position":[3,1,7,1,3,0]},{"type":"attr","position":[3,1,7,3,1,1]},{"type":"registerYield","position":[3,1,7,3,1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''",{"type":"helper","value":{"name":"if","args":["selectedFont","selectedFont.name","''"]}},"'', sans-serif; font-weight: '","selectedVariantWeight","'; font-style: '","selectedVariantStyle","';'"]}}}},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''",{"type":"helper","value":{"name":"if","args":["selectedFont","selectedFont.name","''"]}},"'', sans-serif; font-weight: '","variant.weight","'; font-style: '","variant.style","';'"]}}}},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3,1,7,3,1,1]},{"type":"attr","position":[3,1,7,3,3]},{"type":"for","position":[3,1,7,3,3],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'font-family:''",{"type":"helper","value":{"name":"if","args":["selectedFont","selectedFont.name","''"]}},"'', sans-serif; font-weight: '","selectedVariantWeight","'; font-style: '","selectedVariantStyle","'; font-size: '","size","'px;'"]}}}},{"type":"text","position":[1,3,1]}]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[5]}],
_observedAttributes :["ltPropShow","ltPropFonts","ltPropThemeFonts","ltPropDefaultFonts","searchText","selectedCategory","selectedFontName","selectedVariantKey","selectedFont","variantOptions","selectedVariantLabel","selectedVariantWeight","selectedVariantStyle","showAaPanel","showInfoPanel","previewSizes","dropdownView","ltPropLanguageOptions","selectedLanguage","fontPage","fontPageSize","fontList","categories","filteredFonts","visibleFonts","myFonts","recentFonts","myFontsList","themeFontsList","defaultFontsList","recentFontsList","inputId","sidebarInputId","bodyId","itemQuery","variantsSubMenu","fontBeingHovered","infoVariantsText","infoLanguagesText","infoCategoryLabel","infoCategoryId"],
_observedAttributesType :["boolean","array","array","array","string","string","string","string","object","array","string","number","string","boolean","boolean","array","string","array","string","number","number","array","array","array","array","array","array","array","array","array","array","string","string","string","string","array","object","string","string","string","string"],

    _lyteUtilFunctions: ["open", "close"],

    init: function() {
        this._prepareFonts();
    },

    didConnect: function() {
        this.$node.open = function() {
            this.setData("ltPropShow", true);
        }.bind(this);
        this.$node.close = function() {
            this.setData("ltPropShow", false);
        }.bind(this);
        this._loadedFonts = {};
        this._scheduleObserverRefresh();
    },

    didDestroy: function() {
        delete this.$node.open;
        delete this.$node.close;
        if (this._fontObserver) {
            this._fontObserver.disconnect();
            this._fontObserver = null;
        }
    },

    data: function() {
        return {
            ltPropShow: Lyte.attr("boolean", { default: false, input: true }),
            ltPropFonts: Lyte.attr("array", { default: [], input: true }),
            ltPropThemeFonts: Lyte.attr("array", { default: [], input: true }),
            ltPropDefaultFonts: Lyte.attr("array", { default: [], input: true }),

            searchText: Lyte.attr("string", { default: "" }),
            selectedCategory: Lyte.attr("string", { default: "all" }),
            selectedFontName: Lyte.attr("string", { default: "" }),
            selectedVariantKey: Lyte.attr("string", { default: "" }),
            selectedFont: Lyte.attr("object", { default: null }),
            variantOptions: Lyte.attr("array", { default: [] }),
            selectedVariantLabel: Lyte.attr("string", { default: "" }),
            selectedVariantWeight: Lyte.attr("number", { default: 400 }),
            selectedVariantStyle: Lyte.attr("string", { default: "normal" }),
            showAaPanel: Lyte.attr("boolean", { default: false }),
            showInfoPanel: Lyte.attr("boolean", { default: false }),
            previewSizes: Lyte.attr("array", { default: [48, 36, 26, 20, 16, 14] }),
            dropdownView: Lyte.attr("string", { default: "list" }),
            ltPropLanguageOptions: Lyte.attr("array", { default: [], input: true }),
            selectedLanguage: Lyte.attr("string", { default: "all" }),
            fontPage: Lyte.attr("number", { default: 1 }),
            fontPageSize: Lyte.attr("number", { default: 20 }),

            fontList: Lyte.attr("array", { default: [] }),
            categories: Lyte.attr("array", { default: [] }),
            filteredFonts: Lyte.attr("array", { default: [] }),
            visibleFonts: Lyte.attr("array", { default: [] }),
            myFonts: Lyte.attr("array", { default: [] }),
            recentFonts: Lyte.attr("array", { default: [] }),
            myFontsList: Lyte.attr("array", { default: [] }),
            themeFontsList: Lyte.attr("array", { default: [] }),
            defaultFontsList: Lyte.attr("array", { default: [] }),
            recentFontsList: Lyte.attr("array", { default: [] }),
            inputId: Lyte.attr( 'string', { 'default':  'lyteFontLibinput-' + _lyteUiUtils.fontLibraryRandomIdCounter } ),
            sidebarInputId: Lyte.attr( 'string', { 'default':  'lyteFontLibSidebarInput-' + _lyteUiUtils.fontLibraryRandomIdCounter } ),
            bodyId: Lyte.attr( 'string', { 'default': 'lyteFontLibBody-' + _lyteUiUtils.fontLibraryRandomIdCounter } ),
            itemQuery: Lyte.attr("string", { default: "lyteFontLibVariant-" + _lyteUiUtils.fontLibraryRandomIdCounter++ }),
            variantsSubMenu: Lyte.attr("array", { default: [] }),
            fontBeingHovered: Lyte.attr("object", { default: {} }),
            infoVariantsText: Lyte.attr("string", { default: "" }),
            infoLanguagesText: Lyte.attr("string", { default: "" }),
            infoCategoryLabel: Lyte.attr("string", { default: "" }),
            infoCategoryId: Lyte.attr("string", { default: "" })
        };
    },

    _prepareFonts: function() {
        var fontInput = this.data.ltPropFonts || [];
        this.setData("fontPage", 1);
        var list = this._normalizeFonts(fontInput);
        this.setData("fontList", list);
        this._buildCategories(list);
        this._buildLanguages(list);
        this._updateDerivedLists();
        this._scheduleObserverRefresh();
    },

    _normalizeFonts: function(fontMap) {
        var list = [];
        var self = this;
        if (Array.isArray(fontMap)) {
            fontMap.forEach(function(entry) {
                if (!entry || !entry.name) {
                    return;
                }
                var variantList = Array.isArray(entry.variants) ? entry.variants : [];
                var resolved = self._resolveFontSource(entry, variantList);
                list.push({
                    name: entry.name,
                    type: (entry.type || "").toLowerCase(),
                    languages: self.splitLanguageString(entry.languages),
                    url: resolved.url,
                    displayWeight: resolved.weight,
                    displayStyle: resolved.style,
                    variants: Array.isArray(entry.variants) ? entry.variants : (entry.variants || {}),
                    variantNames: entry.variantNames || {},
                    subsets: entry.subsets || {}
                });
            });
            return list;
        }
        Object.keys(fontMap || {}).forEach(function(name) {
            var entry = fontMap[name] || {};
            list.push({
                name: name,
                type: (entry.type || "").toLowerCase(),
                languages: self.splitLanguageString(entry.languages),
                url: entry.url || entry.cssUrl || entry.fontUrl || "",
                displayWeight: entry.weight || 400,
                displayStyle: entry.style || "normal",
                variants: entry.variants || {},
                variantNames: entry.variantNames || {},
                subsets: entry.subsets || {}
            });
        });
        return list;
    },

    splitLanguageString: function(languages) {
        languages = languages || '';

        return languages.split( ',' ) || [];
    },

    _resolveFontSource: function(entry, variantList) {
        if (!entry) {
            return { url: "", weight: 400, style: "normal" };
        }
        if (entry.url || entry.cssUrl || entry.fontUrl) {
            return {
                url: entry.url || entry.cssUrl || entry.fontUrl,
                weight: entry.weight || 400,
                style: entry.style || "normal"
            };
        }
        if (variantList && variantList.length) {
            for (var i = 0; i < variantList.length; i++) {
                var v = variantList[i];
                if (v && v.weight === 400 && (v.style || "normal") === "normal" && v.url) {
                    return { url: v.url, weight: v.weight || 400, style: v.style || "normal" };
                }
            }
            for (var j = 0; j < variantList.length; j++) {
                if (variantList[j] && variantList[j].url) {
                    return { url: variantList[j].url, weight: variantList[j].weight || 400, style: variantList[j].style || "normal" };
                }
            }
        }
        return { url: "", weight: 400, style: "normal" };
    },

    _buildCategories: function(list) {
        var seen = {};
        var categories = [];
        list.forEach(function(font) {
            var type = (font.type || "").toLowerCase() || "others";
            if (!seen[type]) {
                seen[type] = true;
                categories.push({ id: type, label: this._humanizeType(type) });
            }
        }.bind(this));
        var othersIndex = -1;
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].id === "others") {
                othersIndex = i;
                break;
            }
        }
        if (othersIndex !== -1 && othersIndex !== categories.length - 1) {
            var othersCategory = categories.splice(othersIndex, 1)[0];
            categories.push(othersCategory);
        }
        this.setData("categories", categories);
    },

    _buildLanguages: function(list) {
        var langSet = {};
        list.forEach(function(font) {
            var languages = Array.isArray(font.languages) ? font.languages : this.splitLanguageString(font.languages);
            languages.forEach(function(lang) {
                if (lang) {
                    langSet[lang] = true;
                }
            }.bind(this));
        }.bind(this));
        var options = Object.keys(langSet).sort(function(a, b) {
            return a.localeCompare(b);
        });
        options.unshift("all");
        this.setData("ltPropLanguageOptions", options);
        if (this.data.selectedLanguage && this.data.selectedLanguage !== "all" && options.indexOf(this.data.selectedLanguage) === -1) {
            this.setData("selectedLanguage", "all");
        }
    },

    _fontMatchesLanguage: function(font, language) {
        if (!language || language === "all") {
            return true;
        }
        var langs = Array.isArray(font.languages) ? font.languages : this.splitLanguageString(font.languages);
        return langs.indexOf(language) !== -1;
    },

    _scheduleObserverRefresh: function() {
        if (this._observerScheduled) {
            return;
        }
        this._observerScheduled = true;
        setTimeout(function() {
            this._observerScheduled = false;
            this._setupFontObserver();
        }.bind(this), 0);
    },

    getTargets: function() {
        var targets = [];
        var dropdown = this.$node.querySelector("lyte-dropdown");
        if (dropdown && dropdown.getDropBox) {
            var dropBox = dropdown.getDropBox();
            if (dropBox) {
                targets = targets.concat(Array.prototype.slice.call(dropBox.querySelectorAll("[data-font-name][data-font-url]")));
            }
        }
        var modal = this.$node.querySelector("lyte-modal");
        if (modal && modal.component && modal.component.childComp) {
            var modalItems = modal.component.childComp.querySelectorAll("[data-font-name][data-font-url]");
            targets = targets.concat(Array.prototype.slice.call(modalItems));
        }
        return targets;
    },

    _setupFontObserver: function() {
        if (this._fontObserver) {
            this._fontObserver.disconnect();
            this._fontObserver = null;
        }
        var targets = this.getTargets();
        if (!targets.length) {
            return;
        }
        if (typeof IntersectionObserver === "undefined") {
            Array.prototype.forEach.call(targets, function(target) {
                this._loadFontFromElement(target);
            }.bind(this));
            return;
        }
        this._fontObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    this._loadFontFromElement(entry.target);
                    this._fontObserver.unobserve(entry.target);
                }
            }.bind(this));
        }.bind(this), { rootMargin: "150px 0px", threshold: 0.1 });

        Array.prototype.forEach.call(targets, function(target) {
            this._fontObserver.observe(target);
        }.bind(this));
    },

    _loadFontFromElement: function(element) {
        if (!element) {
            return;
        }
        var name = element.getAttribute("data-font-name");
        var url = element.getAttribute("data-font-url");
        var weightAttr = element.getAttribute("data-font-weight");
        var styleAttr = element.getAttribute("data-font-style");
        if (!name || !url) {
            return;
        }
        this._loadFont({
            name: name,
            url: url,
            weight: weightAttr ? parseInt(weightAttr, 10) : undefined,
            style: styleAttr || undefined
        });
    },

    _loadFont: function(font) {
        if (!font || !font.name) {
            return;
        }
        var url = font.url || font.cssUrl || font.fontUrl;
        if (!url) {
            return;
        }
        var cacheKey = font.name + "|" + url;
        if (this._loadedFonts && this._loadedFonts[cacheKey]) {
            return;
        }
        if (/\\.css(\\?|$)/.test(url) || url.indexOf("webfonts.zoho.com/css") !== -1) {
            if (!document.querySelector('link[data-font-family="' + cacheKey + '"]')) {
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = url;
                link.setAttribute("data-font-family", cacheKey);
                document.head.appendChild(link);
            }
        } else {
            var styleTag = document.getElementById("lyte-font-library-fonts");
            if (!styleTag) {
                styleTag = document.createElement("style");
                styleTag.id = "lyte-font-library-fonts";
                document.head.appendChild(styleTag);
            }
            var weight = font.weight || 400;
            var style = font.style || "normal";
            var format = font.format || this._guessFontFormat(url);
            var src = this._buildFontSrc(url, format);
            styleTag.appendChild(document.createTextNode(
                "@font-face{font-family:'" + font.name + "';font-weight:" + weight + ";font-style:" + style + ";font-display:swap;src:" + src + ";}"
            ));
        }
        if (!this._loadedFonts) {
            this._loadedFonts = {};
        }
        this._loadedFonts[cacheKey] = true;
    },

    _buildFontSrc: function(url, format) {
        if (Array.isArray(url)) {
            return url.map(function(item) {
                if (!item || !item.url) {
                    return "";
                }
                var fmt = item.format || this._guessFontFormat(item.url);
                return "url('" + item.url + "') format('" + fmt + "')";
            }.bind(this)).filter(Boolean).join(",");
        }
        if (format) {
            return "url('" + url + "') format('" + format + "')";
        }
        return "url('" + url + "')";
    },

    _guessFontFormat: function(url) {
        if (!url) {
            return "";
        }
        if (url.indexOf(".woff2") !== -1) {
            return "woff2";
        }
        if (url.indexOf(".woff") !== -1) {
            return "woff";
        }
        if (url.indexOf(".ttf") !== -1) {
            return "truetype";
        }
        if (url.indexOf(".otf") !== -1) {
            return "opentype";
        }
        if (url.indexOf(".svg") !== -1) {
            return "svg";
        }
        if (url.indexOf(".eot") !== -1) {
            return "embedded-opentype";
        }
        return "";
    },

    _humanizeType: function(type) {
        if (!type || type === "others") {
            return "Others";
        }
        var label = type.replace(/_/g, " ").replace(/-/g, " ");
        label = label.replace(/sansserif/gi, "sans serif");
        label = label.replace(/fixedwidth/gi, "fixed width");
        return label
            .split(" ")
            .filter(function(word) { return word; })
            .map(function(word) { return word.charAt(0).toUpperCase() + word.slice(1); })
            .join(" ");
    },

    _getFontByName: function(name) {
        var list = this.data.fontList || [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].name === name) {
                return list[i];
            }
        }
        return null;
    },

    _updateDerivedLists: function() {
        var list = this.data.fontList || [];
        var myFonts = this.data.myFonts || [];
        var themeFonts = this.data.ltPropThemeFonts || [];
        var recentFonts = this.data.recentFonts || [];
        var search = (this.data.searchText || "").toLowerCase();
        var language = this.data.selectedLanguage || "all";
        var category = this.data.selectedCategory || "all";

        var themeFontsList = this._resolveFontList(themeFonts, list);

        var myFontsList = this._resolveFontList(myFonts, list);
        var recentFontsList = this._resolveFontList(recentFonts, list);

        if (search) {
            themeFontsList = themeFontsList.filter(function(font) { return font.name.toLowerCase().indexOf(search) !== -1; });
            myFontsList = myFontsList.filter(function(font) { return font.name.toLowerCase().indexOf(search) !== -1; });
            recentFontsList = recentFontsList.filter(function(font) { return font.name.toLowerCase().indexOf(search) !== -1; });
        }

        if (language && language !== "all") {
            var matchesLanguage = function(font) { return this._fontMatchesLanguage(font, language); }.bind(this);
            themeFontsList = themeFontsList.filter(matchesLanguage);
            myFontsList = myFontsList.filter(matchesLanguage);
            recentFontsList = recentFontsList.filter(matchesLanguage);
        }

        var filteredFonts = [];
        if (category === "my") {
            filteredFonts = myFontsList.slice();
        } else if (category === "all") {
            filteredFonts = list.slice();
        } else {
            filteredFonts = list.filter(function(font) {
                var type = font.type || "others";
                return type === category;
            });
        }

        if (search) {
            filteredFonts = filteredFonts.filter(function(font) { return font.name.toLowerCase().indexOf(search) !== -1; });
        }
        if (language && language !== "all") {
            filteredFonts = filteredFonts.filter(function(font) { return this._fontMatchesLanguage(font, language); }.bind(this));
        }

        var page = this.data.fontPage || 1;
        var pageSize = this.data.fontPageSize || 20;
        var visibleCount = page * pageSize;
        var visibleFonts = filteredFonts.slice(0, visibleCount);

        this.setData("themeFontsList", themeFontsList);
        this.setData("myFontsList", myFontsList);
        this.setData("recentFontsList", recentFontsList);
        this.setData("filteredFonts", filteredFonts);
        this.setData("visibleFonts", visibleFonts);

        if (!this.data.selectedFontName && filteredFonts.length) {
            this.setSelected( filteredFonts[0].name );
            this._syncVariantSelection(filteredFonts[0]);
        } else if (this.data.selectedFontName) {
            this.setSelected( this.data.selectedFontName );
        }
    },

    _resolveFontList: function(values, list) {
        if (!values || !values.length) {
            return [];
        }
        return values.map(function(item) {
            if (typeof item === "string") {
                var baseFont = this._getFontByName(item);
                if (baseFont) {
                    return Object.assign({}, baseFont, { displayLabel: baseFont.name });
                }
                return { name: item, type: "", displayLabel: item };
            }
            if (item && item.name) {
                var resolved = this._getFontByName(item.name) || { name: item.name };
                return this._mergeFontOverride(resolved, item);
            }
            return null;
        }.bind(this)).filter(Boolean);
    },

    _mergeFontOverride: function(baseFont, override) {
        var merged = Object.assign({}, baseFont || {}, override || {});
        merged.name = (override && override.name) || (baseFont && baseFont.name) || merged.name;
        merged.displayLabel = (override && (override.label || override.displayLabel)) || merged.displayLabel || merged.name;
        var variant = null;
        var variantKey = override && override.variantKey;
        if (variantKey && baseFont) {
            var options = this._getVariantOptions(baseFont);
            for (var i = 0; i < options.length; i++) {
                if (options[i].key === variantKey) {
                    variant = options[i];
                    break;
                }
            }
        }
        if (!variant && variantKey) {
            var parsed = this._parseVariantKey(variantKey);
            if (parsed) {
                variant = { key: variantKey, weight: parsed.weight, style: parsed.style, label: this._formatVariantLabel(parsed.weight, parsed.style) };
            }
        }
        var weight = (override && (override.weight || override.displayWeight)) || (variant && variant.weight);
        var style = (override && (override.style || override.displayStyle)) || (variant && variant.style);
        merged.displayWeight = weight || merged.displayWeight || 400;
        merged.displayStyle = style || merged.displayStyle || "normal";
        if (variant) {
            merged.variantKey = variant.key;
            merged.variantLabel = variant.label || merged.variantLabel;
            if (variant.url) {
                merged.url = variant.url;
            }
        }
        if (override && override.url) {
            merged.url = override.url;
        }
        if (override && override.variantLabel) {
            merged.variantLabel = override.variantLabel;
        }
        return merged;
    },

    _parseVariantKey: function(key) {
        if (!key) {
            return null;
        }
        if (String(key).indexOf("-") !== -1) {
            var parts = String(key).split("-");
            var weight = parseInt(parts[0], 10);
            if (isNaN(weight)) {
                weight = 400;
            }
            var style = parts[1] || "normal";
            return { weight: weight, style: style };
        }
        if (String(key).toLowerCase().indexOf("i") !== -1) {
            var weightItalic = parseInt(String(key).replace(/[^0-9]/g, ""), 10);
            return { weight: isNaN(weightItalic) ? 400 : weightItalic, style: "italic" };
        }
        var weightOnly = parseInt(key, 10);
        return { weight: isNaN(weightOnly) ? 400 : weightOnly, style: "normal" };
    },

    _formatVariantLabel: function(weight, style) {
        var labelMap = {
            100: "Thin",
            200: "Extra Light",
            300: "Light",
            400: "Normal",
            500: "Medium",
            600: "Semi Bold",
            700: "Bold",
            800: "Extra Bold",
            900: "Black"
        };
        var label = labelMap[weight] || String(weight || 400);
        if (weight === 400 && style === "normal") {
            label = "Normal";
        } else if (weight === 400 && style === "italic") {
            label = "Italic";
        } else if (weight === 700 && style === "normal") {
            label = "Bold";
        } else if (weight === 700 && style === "italic") {
            label = "Bold Italic";
        } else if (style === "italic") {
            label = label + " Italic";
        }
        return label;
    },

    _trackRecentFont: function(font) {
        if (!font) {
            return;
        }
        var name = typeof font === "string" ? font : font.name;
        if (!name) {
            return;
        }
        var label = typeof font === "string" ? "" : (font.displayLabel || font.label || "");
        var list = (this.data.recentFonts || []).slice();
        var filtered = list.filter(function(item) {
            return (typeof item === "string" ? item : item.name) !== name;
        });
        var entry = label ? { name: name, label: label } : name;
        if (typeof font === "object") {
            entry = Object.assign({}, { name: name }, {
                name: name,
                label: label || font.label || font.displayLabel,
                variantKey: font.variantKey,
                variantLabel: font.variantLabel,
                weight: font.weight || font.displayWeight,
                style: font.style || font.displayStyle,
                url: font.url || font.cssUrl || font.fontUrl
            });
        }
        filtered.unshift(entry);
        if (filtered.length > 10) {
            filtered = filtered.slice(0, 10);
        }
        this.setData("recentFonts", filtered);
    },

    _isInList: function(name, list) {
        if (!list || !list.length) {
            return false;
        }
        return list.indexOf(name) !== -1;
    },

    _syncVariantSelection: function(font) {
        if (!font) {
            this.setData("variantOptions", []);
            this.setData("selectedVariantLabel", "");
            return;
        }
        var variants = this._getVariantOptions(font);
        this.setData("variantOptions", variants);
        if (!variants.length) {
            this.setData("selectedVariantKey", "");
            this.setData("selectedVariantLabel", "");
            this.setData("selectedVariantWeight", 400);
            this.setData("selectedVariantStyle", "normal");
            this._updateInfoText(font, []);
            return;
        }
        this.setData("selectedVariantKey", variants[0].key);
        this.setData("selectedVariantLabel", variants[0].label);
        this.setData("selectedVariantWeight", variants[0].weight || 400);
        this.setData("selectedVariantStyle", variants[0].style || "normal");
        this._updateInfoText(font, variants);
        if (variants[0].url) {
            this._loadFont({
                name: font.name,
                url: variants[0].url,
                weight: variants[0].weight || 400,
                style: variants[0].style || "normal"
            });
        }
    },

    _getVariantOptions: function(font) {
        if (!font) {
            return [];
        }
        if (Array.isArray(font.variants) && font.variants.length) {
            var labelMap = {
                100: "Thin",
                200: "Extra Light",
                300: "Light",
                400: "Normal",
                500: "Medium",
                600: "Semi Bold",
                700: "Bold",
                800: "Extra Bold",
                900: "Black"
            };
            var seen = {};
            return font.variants.map(function(variant) {
                if (!variant) {
                    return null;
                }
                var weight = variant.weight || 400;
                var style = variant.style || "normal";
                var key = weight + "-" + style;
                if (seen[key]) {
                    return null;
                }
                seen[key] = true;
                var label = labelMap[weight] || String(weight);
                if (weight === 400 && style === "normal") {
                    label = "Normal";
                } else if (weight === 400 && style === "italic") {
                    label = "Italic";
                } else if (weight === 700 && style === "normal") {
                    label = "Bold";
                } else if (weight === 700 && style === "italic") {
                    label = "Bold Italic";
                } else if (style === "italic") {
                    label = label + " Italic";
                }
                var url = variant.url || variant.cssUrl || variant.fontUrl || "";
                return { key: key, label: label, weight: weight, style: style, url: url };
            }).filter(Boolean);
        }
        var names = font.variantNames ? font.variantNames : {};
        var keys = Object.keys(names);
        return keys.map(function(key) {
            var value = names[key] || [];
            var label = value[1] || value[0] || (key === "400i" ? "Italic" : key);
            if (key === "400") {
                label = "Normal";
            }
            if (key === "400i") {
                label = "Italic";
            }
            var weight = parseInt(key, 10);
            if (isNaN(weight)) {
                weight = 400;
            }
            var style = key && key.toLowerCase().indexOf("i") !== -1 ? "italic" : "normal";
            return { key: key, label: label, weight: weight, style: style };
        });
    },

    _preloadVariantFonts: function(font) {
        var menu = this._getVariantOptions(font);
        if (!font || !menu || !menu.length) {
            return;
        }
        menu.forEach(function(variant) {
            if (!variant || !variant.url) {
                return;
            }
            this._loadFont({
                name: font.name,
                url: variant.url,
                weight: variant.weight || 400,
                style: variant.style || "normal"
            });
        }.bind(this));
    },

    _updateInfoText: function(font, variants) {
        if (!font) {
            this.setData("infoVariantsText", "");
            this.setData("infoLanguagesText", "");
            this.setData("infoCategoryLabel", "");
            this.setData("infoCategoryId", "");
            return;
        }
        var variantLabels = (variants || []).map(function(variant) { return variant.label; }).filter(Boolean);
        this.setData("infoVariantsText", variantLabels.join(", "));
        var languages = Array.isArray(font.languages) ? font.languages : this._parseLanguages(font.languages);
        this.setData("infoLanguagesText", languages.join(", "));
        var categoryId = (font.type || "").toLowerCase() || "others";
        this.setData("infoCategoryId", categoryId);
        this.setData("infoCategoryLabel", this._humanizeType(categoryId));
    },

    _loadSelectedVariantFont: function() {
        var font = this.data.selectedFont;
        if (!font) {
            return;
        }
        var url = font.url;
        var weight = this.data.selectedVariantWeight || 400;
        var style = this.data.selectedVariantStyle || "normal";
        var key = this.data.selectedVariantKey;
        if (key && this.data.variantOptions) {
            for (var i = 0; i < this.data.variantOptions.length; i++) {
                if (this.data.variantOptions[i].key === key) {
                    url = this.data.variantOptions[i].url || url;
                    weight = this.data.variantOptions[i].weight || weight;
                    style = this.data.variantOptions[i].style || style;
                    break;
                }
            }
        }
        if (url) {
            this._loadFont({
                name: font.name,
                url: url,
                weight: weight,
                style: style
            });
        }
    },

    setSelected: function( name ) {
        var category = this.data.selectedCategory;

        if( category === 'my' ) {
            this.setData( 'selectedFontName', '' );
            this.setData( 'selectedFont', {} );
        }
        else {
            this.setData("selectedFontName", name);
            var font = this._getFontByName(name);
            this.setData("selectedFont", font);
            this._syncVariantSelection(font);
        }
        
    },

    _applyVariantOverride: function(fontRef) {
        if (!fontRef || typeof fontRef === "string") {
            return;
        }
        var options = this.data.variantOptions || [];
        var variant = null;
        if (fontRef.variantKey) {
            for (var i = 0; i < options.length; i++) {
                if (options[i].key === fontRef.variantKey) {
                    variant = options[i];
                    break;
                }
            }
        }
        if (!variant && (fontRef.weight || fontRef.style)) {
            var targetWeight = fontRef.weight || fontRef.displayWeight;
            var targetStyle = fontRef.style || fontRef.displayStyle;
            for (var j = 0; j < options.length; j++) {
                if (options[j].weight === targetWeight && options[j].style === targetStyle) {
                    variant = options[j];
                    break;
                }
            }
        }
        if (variant) {
            this.setData("selectedVariantKey", variant.key);
            this.setData("selectedVariantLabel", variant.label || "");
            this.setData("selectedVariantWeight", variant.weight || 400);
            this.setData("selectedVariantStyle", variant.style || "normal");
            var variantUrl = variant.url || fontRef.url;
            if (variantUrl && this.data.selectedFontName) {
                this._loadFont({
                    name: this.data.selectedFontName,
                    url: variantUrl,
                    weight: variant.weight || 400,
                    style: variant.style || "normal"
                });
            }
            return;
        }
        if (fontRef.variantKey) {
            this.setData("selectedVariantKey", fontRef.variantKey);
        }
        var weight = fontRef.weight || fontRef.displayWeight;
        var style = fontRef.style || fontRef.displayStyle;
        if (weight || style) {
            this.setData("selectedVariantWeight", weight || 400);
            this.setData("selectedVariantStyle", style || "normal");
            var label = fontRef.variantLabel || this._formatVariantLabel(weight || 400, style || "normal");
            this.setData("selectedVariantLabel", label);
        } else if (fontRef.variantLabel) {
            this.setData("selectedVariantLabel", fontRef.variantLabel);
        }
        if (fontRef.url && this.data.selectedFontName) {
            this._loadFont({
                name: this.data.selectedFontName,
                url: fontRef.url,
                weight: weight || 400,
                style: style || "normal"
            });
        }
    },

    filterVisibleFontsBasedOnLanguage: function() {
        var selectedLanguage = this.data.selectedLanguage || "all",
        allFonts = this.getData( 'ltPropFonts' ), that = this;

        var newList = allFonts.filter(function(font) {    
            var languages = Array.isArray(font.languages) ? font.languages : that.splitLanguageString(font.languages);
            return languages.indexOf(selectedLanguage) !== -1;
        } );
    },

    getInputQuery: function() {
        var inputId = this.getData( 'inputId' ),
        inputQuery = inputId + ' input' ;

        return '#' + inputQuery;
    },

    disableGridNavigation: function() {
        $L( this.getInputQuery() ).keyboardNavigator( 'destroy' );
    },

    enableGridNavigation: function() {
        $L( this.getInputQuery() ).keyboardNavigator( {
            child: '.lyteFontLibraryCard',
            selectedClass: 'lyteFontLibraryCardSelected',
            scope: '[data-body-id="' + this.getData( 'bodyId' ) + '"]'
        } );
    },

    getSearch: function() {
        return document.getElementById( this.getData( 'inputId' ) );
    },

    onFontsChange: function() {
        this._prepareFonts();
    }.observes("ltPropFonts"),

    onSearchOrCategoryChange: function() {
        this._updateDerivedLists();
        this._scheduleObserverRefresh();
    }.observes("searchText", "selectedCategory", "selectedLanguage", "myFonts.[]", "recentFonts.[]", "fontList.[]", "ltPropThemeFonts.[]", "ltPropDefaultFonts.[]"),

    onModalToggle: function() {
        if (this.data.ltPropShow) {
            this._scheduleObserverRefresh();
            return;
        }
        this.setData("showAaPanel", false);
        this.setData("showInfoPanel", false);
    }.observes("ltPropShow"),

    actions: {
        setVariant: function(hoveredFont) {
            var menu = hoveredFont ? this._getVariantOptions(hoveredFont) : [];
            var hasVariant = menu && menu.length > 1;
            if (hasVariant) {
                this.setData("variantsSubMenu", menu);
                this.setData("fontBeingHovered", hoveredFont);
                this._preloadVariantFonts(hoveredFont);
                return;
            }
            this.setData("variantsSubMenu", []);
            this.setData("fontBeingHovered", {});
        },

        onDropdownSearchKeyup: function(event) {
            var value = event && event.target ? event.target.value : "";
            this.setData("searchText", value || "");
        },

        selectCategory: function(category) {
            this.setData("fontPage", 1);
            this.setData("selectedCategory", category);
        },

        setDropdownView: function(view) {
            var search = this.getSearch();

            search.focus();

            if( view === 'dropdown' ) {
                this.disableGridNavigation();
            }
            
            this.setData("dropdownView", view);

            if( view === 'grid' ) {
                this.enableGridNavigation();
            }
        },

        toggleAaPanel: function() {
            var next = !this.data.showAaPanel;
            this.setData("showAaPanel", next);
            if (next) {
                this.setData("showInfoPanel", false);
            }
            if (next) {
                this._loadSelectedVariantFont();
            }
        },

        toggleInfoPanel: function() {
            var next = !this.data.showInfoPanel;
            this.setData("showInfoPanel", next);
            if (next) {
                this.setData("showAaPanel", false);
            }
        },

        selectAaVariant: function(event) {
            this.actions.selectVariant.call(this, event);
            this._loadSelectedVariantFont();
        },

        selectFont: function(name) {
            this.setSelected( name );
        },

        selectFontVariant: function(fontRef, variant, event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
            var fontName = typeof fontRef === "string" ? fontRef : (fontRef && fontRef.name);
            this.actions.selectFont.call(this, fontName);
            if (variant && variant.key) {
                this.setData("selectedVariantKey", variant.key);
                this.setData("selectedVariantLabel", variant.label || "");
                this.setData("selectedVariantWeight", variant.weight || 400);
                this.setData("selectedVariantStyle", variant.style || "normal");
                if (variant.url) {
                    this._loadFont({
                        name: fontName,
                        url: variant.url,
                        weight: variant.weight || 400,
                        style: variant.style || "normal"
                    });
                }
            }
            if (variant) {
                this._trackRecentFont({
                    name: fontName,
                    label: fontRef && (fontRef.displayLabel || fontRef.label),
                    variantKey: variant.key,
                    variantLabel: variant.label,
                    weight: variant.weight,
                    style: variant.style,
                    url: variant.url
                });
            } else {
                this._trackRecentFont(fontRef || fontName);
            }
            var dropdown = this.$node.querySelector(".lyteFontLibraryDropdown");
            if (dropdown && dropdown.close) {
                dropdown.close();
            }

            var myMenu = this.$node.querySelector( '.variantsSubMenu' );

            myMenu.ltProp( 'show', false );
        },

        selectDropdownFont: function(fontRef, event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
            var name = typeof fontRef === "string" ? fontRef : (fontRef && fontRef.name);
            this.actions.selectFont.call(this, name);
            this._applyVariantOverride(fontRef);
            this._trackRecentFont(fontRef || name);
            var dropdown = this.$node.querySelector(".lyteFontLibraryDropdown");
            if (dropdown && dropdown.close) {
                dropdown.close();
            }
        },

        addToMyFonts: function(name, event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
            var list = this.data.myFonts || [];
            if (list.indexOf(name) === -1) {
                list = list.slice();
                list.push(name);
                this.setData("myFonts", list);
            }
        },

        removeFromMyFonts: function(name, event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
            var list = this.data.myFonts || [];
            var index = list.indexOf(name);
            if (index !== -1) {
                list = list.slice();
                list.splice(index, 1);
                this.setData("myFonts", list);
            }
        },

        removeAllMyFonts: function(event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
            if (!this.data.myFonts || !this.data.myFonts.length) {
                return;
            }
            this.setData("myFonts", []);
        },

        selectVariant: function(event) {
            var target = event && event.target && event.target.closest ? event.target.closest("lyte-drop-item") : null;
            var value = target ? target.getAttribute("data-value") : "";
            if (value) {
                this.setData("selectedVariantKey", value);
                var options = this.data.variantOptions || [];
                for (var i = 0; i < options.length; i++) {
                    if (options[i].key === value) {
                        this.setData("selectedVariantLabel", options[i].label);
                        this.setData("selectedVariantWeight", options[i].weight || 400);
                        this.setData("selectedVariantStyle", options[i].style || "normal");
                        if (options[i].url && this.data.selectedFontName) {
                            this._loadFont({
                                name: this.data.selectedFontName,
                                url: options[i].url,
                                weight: options[i].weight || 400,
                                style: options[i].style || "normal"
                            });
                        }
                        break;
                    }
                }
            }
        },

        addNewFromGrid: function() {
            this.setData("selectedCategory", "all");
        },

        openModal: function() {
            var dropdown = this.$node.querySelector(".lyteFontLibraryDropdown");
            if (dropdown && dropdown.close) {
                dropdown.close();
            }
            this.setData("ltPropShow", true);
        },

        onFontListScroll: function(event) {
            var target = event && event.target ? event.target : null;
            if (!target) {
                return;
            }
            var nearBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 20;
            if (!nearBottom) {
                return;
            }
            var total = (this.data.filteredFonts || []).length;
            var page = this.data.fontPage || 1;
            var pageSize = this.data.fontPageSize || 20;
            if (page * pageSize >= total) {
                return;
            }
            this.setData("fontPage", page + 1);
            this._updateDerivedLists();
            this._scheduleObserverRefresh();
        }
    },

    methods: {
        searchElements: function(event) {
            var input = document.getElementById(this.getData('sidebarInputId'));
            var value = input && input.ltProp ? input.ltProp('value') : (event && event.target ? event.target.value : "");
            this.setData("fontPage", 1);
            this.setData("searchText", value || "");
        },
        
        selectLanguage: function(event) {
            var target = event && event.target && event.target.closest ? event.target.closest("lyte-drop-item") : null;
            var value = target ? target.getAttribute("data-value") : "";
            if (!value) {
                return;
            }
            this.setData("selectedLanguage", value);
            this.filterVisibleFontsBasedOnLanguage();
        },

        emptySearch: function() {
            this.querySelector( '.lyteFontLibraryDropdown' ).setValue( '' );
        },

        onViewTabOpen: function(tabId) {
            return tabId;
        },

        onModalShow: function() {
            this._scheduleObserverRefresh();
        }
    }
});
