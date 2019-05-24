sap.ui.define([], function () {
	"use strict";

	return {

		status: function (iPrice) {
			var sStatus = "";
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			if (iPrice > 900) {
				sStatus = oResourceBundle.getText("highPriceList");
			} else if (iPrice <= 300) {
				sStatus = "Price is Fine";
			} else {
				sStatus = "Ok";
			}
			return sStatus;
		}
	};
});