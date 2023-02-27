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

	return Controller.extend("QUALITY-PORTALQUALITY-PORTAL.controller.View3", {

		OnSubmit: function() {
			sUrl = "/sap/opu/odata/sap/Z_QUALITY_ODATA_MURALI_SRV";
			oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			var inspectionlot = this.getView().byId('inslot').getValue();
			if (inspectionlot === "") {
				this.getView().byId('inslot').setValueState('Error');
				sap.m.MessageToast.show('Please fill Inspection Lot Number');
				return;
			} else {
				this.getView().byId('inslot').setValueState();
			}
			var fil = this.getView().byId('fil').getValue();

			oModel.read("/ZODATA_QUALITY_RESPONSE_MDSet?$filter=IInsplot eq '" + inspectionlot + "'&$format=json", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {
					sysid = oData.Sysid;
					var filtered = {
						"results": []
					};
					this.data = oData;
					fil=fil.toUpperCase();
					if (fil) {
						for (var i in this.data["results"]) {
							if (this.data["results"][i]["CreatDat"]) {
								if ((this.data["results"][i]["CreatDat"].toString().toUpperCase()).includes(fil.toString())) {
									filtered["results"].push(this.data["results"][i]);
								}
							}
						}

						var JModel = new JSONModel(filtered);
						this.getView().setModel(JModel, "response");
					} else {
						JModel = new JSONModel(oData);
						this.getView().setModel(JModel, "response");
					}

				}.bind(this),
				error: function(oData, oResponse) {
					sap.m.MessageToast.show("ERROR OCCURED!Please try again");
				}

			});
		},

		OnNext: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("View4");
		},
			Oninfo:function(oEvent)
	    {
	    	
	    	var oSelect = oEvent.getSource().getParent();
	    	var oBinding = oSelect.getBindingContext("response").getObject();
	    	var insp = oBinding.Iststpumf; 
	    	var inspected = oBinding.Anzwertg;  
	    	window.console.log(insp);
	    	window.console.log(inspected);
	    if(insp === inspected)
	    {
	    		sap.m.MessageToast.show("Approved");
	    }
	    else
	    {
	    		sap.m.MessageToast.show("Rejected");
	    }
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