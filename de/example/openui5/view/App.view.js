sap.ui.jsview("de.example.openui5.view.App", {

	getControllerName : function() {
		return "de.example.openui5.view.App";
	},

	createContent : function(oController) {
		this.setDisplayBlock(true);
		var app = new sap.m.App();
		app.addPage(sap.ui.xmlview("de.example.openui5.view.Page"));
		return app;
	}

});