sap.ui.controller("de.example.openui5.view.App", {
	onInit : function() {
		var oModel = new sap.ui.model.odata.ODataModel(
				this._getODataPath(), true);
		sap.ui.getCore().setModel(oModel);

		var oI18n = new sap.ui.model.resource.ResourceModel({
			bundleName : "de.example.openui5.i18n.i18n"
		});
		sap.ui.getCore().setModel(oI18n, "i18n");

	},

	/**
	 * @private
	 */
	_getODataPath : function(){
		var aPath=document.location.pathname.split('/');
		return "/" + aPath[1] + "/simple.svc";

	}
});