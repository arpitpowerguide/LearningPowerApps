// This JavaScript function will switch the BPF on the Case form, depending on the option chosen under the "Switch Process" command.
// primaryControl parameter will hold the information of the case record that you are presently working, while "requestedProcessFlow" will hold the user-selected choice (Service Request or Return & Refund)

function switchBPF(primaryControl, requestedProcessFlow) {

    // formcontext hold the component details (fields, section, tab, subgrid, BPF, quick view etc) available on the currently open form
    var formContext = primaryControl;
    
    //Check if user has opted 'Service Request' from command bar then display Service Request business process flow
     if (requestedProcessFlow == "Service Request") {
        // The GUID of the Service Request Business Process flow is hard-coded here and will not change even after it is deployed to different environments. You can capture this unique Id from the URL of the respective BPF by opening it in edit mode.
        formContext.data.process.setActiveProcess("0F750E6E-2F93-EE11-BE36-000D3A1CFE3D");
     }
    
    //Check if user has opted 'Return & Refund' from command bar then display Return & Refund business process flow
     else if (requestedProcessFlow == "Return & Refund") {
        // The GUID of the Return & Refund Business Process flow is hard-coded here and will not change even after it is deployed to different environments. You can capture this unique Id from the URL of the respective BPF by opening it in edit mode.
        formContext.data.process.setActiveProcess("F656E5AC-3093-EE11-BE36-000D3A1CFE3D");
     }
    
    //if nothing is opted by user then display by default Service Request business process flow
     else {
            formContext.data.process.setActiveProcess("0F750E6E-2F93-EE11-BE36-000D3A1CFE3D");
     }
}

function CheckPremiumCustomer(executionContext)
{
        // Getting Form Context
        var formContext = executionContext.getFormContext();

        // check if customer lookup has value or not null
        if(formContext.getAttribute("arp_customer").getValue() != null)
        {
            // Getting the value of Customer Lookup Field from Case form. Lookup always return object which contains PrimaryId, PrimaryName and Table reference
            var contactLookupObj = formContext.getAttribute("arp_customer").getValue();

             // Getting only GUID of the customer record
            var ContactRecordId = contactLookupObj[0].id;

            // Call Dataverse WEB API to retrieve contact record using GUID that we have received in previous step.
            // you need to specify the columns list (arp_customertype) that you want to retrieve from contact table
            Xrm.WebApi.retrieveRecord("contact", ContactRecordId, "?$select=arp_customertype").then(
            function success(result) {

                // Get customer type from contact
                var customerType = result.arp_customertype;

                // if customer type is Premium
                if(customerType==750870000)
                {
                    // Display notification on Case form
                    formContext.ui.setFormNotification("Customer is PREMIUM. Please prioritize and expedite the resolution process", 'INFORMATION');
                }

            },
            function (error) {
                console.log(error.message);
                // handle error conditions
            }
            
        );
    }
}

function openApprovalPage(primaryControl)
{
    var formContext = primaryControl;
    var caseId = formContext.data.entity.getId().replace("{", "").replace("}", "");

    // Centered Dialog
    var pageInput = {
        pageType: "custom",
        name: "arp_financeapprovalpage_22b78",
        entityName: "arp_case",
        recordId: caseId,
    };
    var navigationOptions = {
        target: 2, 
        position: 1,
        width: {value: 50, unit:"%"}
    };
    Xrm.Navigation.navigateTo(pageInput, navigationOptions)
        .then(
            function () {
                // Called when the dialog closes
            }
        ).catch(
            function (error) {
                // Handle error
            }
        );
}
