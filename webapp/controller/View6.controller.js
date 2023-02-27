sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/ui/core/IconPool",
	"sap/ui/model/json/JSONModel"

], function(Controller, Dialog, IconPool, Button, JSONModel, BindingMode) {
	"use strict";
	var sUrl;
	var oModel;
	var sysid;
	var Json;
	var data;
	var seq;

	return Controller.extend("QUALITY-PORTALQUALITY-PORTAL.controller.View6", {
		
		
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onInit: function() {
			this.getRouter().getRoute("View6").attachMatched(this.onRouteMatched, this);

		},
		onRouteMatched: function(oEvent) {
			var oArguments = oEvent.getParameter("arguments");
			seq = oArguments.insp;
			window.console.log(seq);
		},

		OnSubmit: function() {
			sUrl = "/sap/opu/odata/sap/Z_QUALITY_ODATA_MURALI_SRV";
			oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			 var fil = this.getView().byId('fil').getValue();

			oModel.read("/ZODATA_QUALITY_INSPECTION_DETAILS_MDSet?$filter=InsNumber eq '" + seq + "'&$format=json", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {
					sysid = oData.Sysid;
					var filtered = {
						"results": []
					};
					this.data = oData;
					window.console.log(oData);
					fil=fil.toUpperCase();
					if (fil) {
						for (var i in this.data["results"]) {
							if (this.data["results"][i]["TaskListValidFromDate"]) {
								if ((this.data["results"][i]["TaskListValidFromDate"].toString().toUpperCase()).includes(fil.toString())) {
									filtered["results"].push(this.data["results"][i]);
								}
							}
						}

						var JModel = new JSONModel(filtered);
						this.getView().setModel(JModel, "inspectiondet");
					} else {
						JModel = new JSONModel(oData);
						this.getView().setModel(JModel, "inspectiondet");
					}

				}.bind(this),
				error: function(oData, oResponse) {
					sap.m.MessageToast.show("ERROR OCCURED!Please try again");
				}

			});
		},

		OnNext: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("View3");
		},
		
		Onpopup: function() {

			var oDialog = new sap.m.Dialog({
				title: "Search Help",
				content: new sap.m.Text({
					text: "This is Field to Filter data by Month or Year wise.Please Enter Filter Accordingly!"
				}),
				beginButton: new sap.m.Button({
					text: "Close",
					press: function() {
						oDialog.close();
					}
				})
			});
			oDialog.open();
		}
	});
});