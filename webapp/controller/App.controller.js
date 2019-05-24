sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"utg/app/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/core/UIComponent"
	],

	function (Controller, MessageToast, fmt, Filter, FilterOperator, UIComponent) {
		"use strict";
		return Controller.extend("utg.app.controller.App", {

			formatter: fmt,
			onPress: function () {
				var sMessage="You clicked "+ 124;
				MessageToast.show(sMessage);
/*				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("detail");*/
			},

			onItemSelected: function (oEvent) {
				/*var oSelectedItem = oEvent.getSource();
				var oContext = oSelectedItem.getBindingContext();
				var sPath = oContext.getPath();
				var oProductDetailPanel = this.byId("idDetailPanel");

				oProductDetailPanel.bindElement({
					path: sPath
				});
				oProductDetailPanel.setVisible(true);*/
				var oItem = oEvent.getSource();
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("detail", {
					ProductID: oItem.getBindingContext().getPath().substr(1)
				});

			},
			onFilterProducts: function (oEvent) {

				var aFilter = [];
				var sQuery = oEvent.getParameter("newValue");
				var oList = this.getView().byId("idProductsList");
				var oBinding = oList.getBinding("items");
				if (sQuery) {
					aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
				}
				oBinding.filter(aFilter);
			},
			onCreate: function () {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("create");
			}

		});

	});