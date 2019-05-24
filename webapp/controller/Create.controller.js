sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";

	return Controller.extend("utg.app.controller.Create", {

		onInit: function () {
			// Register to the add route matched
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("create").attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function () {
			// register for metadata loaded events
			var oModel = this.getView().getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},

		_onMetadataLoaded: function () {
			// create default properties
			var oProperties = {
				ProductID: "" + parseInt(Math.random() * 1000000000, 10),
				TypeCode: "PR",
				TaxTarifCode: 1,
				CurrencyCode: "EUR",
				MeasureUnit: "EA"
			};

			// create new entry in the model
			this._oContext = this.getView().getModel().createEntry("/ProductSet", {
				properties: oProperties,
				success: this._onCreateSuccess.bind(this)
			});

			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},
		_onCreateSuccess: function (oProduct) {
			// navigate to the new product's object view
			var oRouter = UIComponent.getRouterFor(this);
			var sId = oProduct.ProductID;
			oRouter.navTo("detail", {
				ProductID: sId
			}, true);

			// unbind the view to not show this object again
			this.getView().unbindObject();

			// show success messge
			var sMessage = "Product Created" +[oProduct.Name];
			sap.m.MessageToast.show(sMessage, {
				closeOnBrowserNavigation: false
			});
		},

		onCancel: function () {
			// this.onNavBack();
			this.getView().getModel().deleteCreatedEntry(this._oContext);
		},
		onSave: function () {
			this.getView().getModel().submitChanges();
		}

		/*onNavBack : function() {

			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("worklist", {}, bReplace);
			}
		}*/

	});
});