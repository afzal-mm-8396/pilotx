//$Id$
/**
 * To get the rebrand properties.This is set in Crm.init(), which in turn is called from footer.jsp
 */
RebrandLinkUtil = {     //eslint-disable-line @zoho/webperf/no-global-variables
    "properties":undefined,//no i18n
    "setProperties":function(props){//no i18n
        this.properties = props;
    },
    "getProperties":function(){//no i18n
        return this.properties;
    },
    "getProperty":function(key){//no i18n
        if(this.properties){
            return this.properties[key];
        }
    }		
}
