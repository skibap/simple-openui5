sap.ui
		.controller(
				"de.example.openui5.view.Page",
				{
					onInit : function() {
						jQuery.sap.require("sap.m.MessageToast");
						jQuery.sap.require("sap.m.MessageBox");
					},

					handleCreate : function(oEvent) {
						if (!this.oCreateDialog) {
							this.oCreateDialog = sap.ui.xmlfragment(
									"createDialog",
									"de.example.openui5.view.CreateDialog",
									this);
							this.oCreateDialog.setModel(this.getView()
									.getModel("i18n"), "i18n");
							this.oButtonData = {
								Ok : false
							};
							this.oButtonModel = new sap.ui.model.json.JSONModel(
									this.oButtonData);
							this.oCreateDialog.setModel(this.oButtonModel,
									"button");
						}
						this.oCreateDialog.open();
					},
					
					handleCreateDialogCloseButton : function(oEvent) {
						oEvent.getSource().getParent().close();
					},

					handleLiveChangeId : function(oEvent) {
						this
								.enableOkButton(oEvent.getParameter("newValue") == "" ? false
										: true);
					},

					enableOkButton : function(bEnable) {
						this.oButtonData.Ok = bEnable;
						this.oButtonModel.refresh();
					},

					handleCreateDialogOkButton : function(oEvent) {
						var oId = {}, oDescription = {}, oProduct = {};
						oId = sap.ui.core.Fragment.byId("createDialog", "id");

						if (oId.getValue() == "") {
							this.oCreateDialog.close();
							return;
						}

						oDescription = sap.ui.core.Fragment.byId(
								"createDialog", "description");
						oProduct.Key = oId.getValue();
						oProduct.Description = oDescription.getValue();
						this.getView().getModel().create(
								"/Products",
								oProduct,
								null,
								jQuery.proxy(this.handleCreateProductSuccess,
										this),
								jQuery.proxy(this.handleCreateProductError,
										this));
					},

					handleCreateProductSuccess : function(oData, response) {
						this.oCreateDialog.close();
						sap.m.MessageToast.show(this.getView().getModel("i18n")
								.getProperty("CreateSuccessMessage"));
					},

					handleCreateProductError : function(oError) {
						this.oCreateDialog.close();
						sap.m.MessageBox.alert(this.getView().getModel("i18n")
								.getProperty("CreateErrorMessage"));
					},

					handleDelete : function(oEvent) {
						var oModel = this.getView().getModel();
						var sPath = oEvent.getParameter("listItem")
								.getBindingContext().getPath();
						var that = this;
						oModel.remove(sPath, {
							fnSuccess : function() {
								sap.m.MessageToast.show(that.getView()
										.getModel("i18n").getProperty(
												"RemoveSuccessMessage"));
							},
							fnError : function() {
								sap.m.MessageBox.alert(that.getView().getModel(
										"i18n").getProperty(
										"RemoveErrorMessage"));
							}
						});

					},

					handleDescriptionChange : function(oEvent) {
						var oModel = this.getView().getModel();
						var sPath = oEvent.getSource().getBindingContext()
								.getPath();
						var oProduct = {
							Description : oEvent.getParameter("newValue")
						};
						var that = this;
						oModel.update(sPath, oProduct, {
							fnSuccess : function() {
								sap.m.MessageToast.show(that.getView()
										.getModel("i18n").getProperty(
												"UpdateSuccessMessage"));
							},
							fnError : function() {
								sap.m.MessageBox.alert(that.getView().getModel(
										"i18n").getProperty(
										"UpdateErrorMessage"));
							}
						});
					},

					handleDescriptionLiveChange : function(oEvent) {
					}
				});