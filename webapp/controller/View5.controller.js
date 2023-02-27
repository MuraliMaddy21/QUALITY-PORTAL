sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("QUALITY-PORTALQUALITY-PORTAL.controller.View5", {

	onClick:function()
        {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("View2");

},
onSubmit:function()
        {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("View3");

},
onPress:function()
        {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("View4");

}

	});

});