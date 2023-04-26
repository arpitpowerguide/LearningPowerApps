using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Activities;
namespace PowerApps.Samples
{
    public sealed class IncreamentBy100 : CodeActivity
    {
        //Define the Input and Output Parameters
        [RequiredArgument]
        [Input("input")]
        public InArgument<integer> WFInput { get; set; }
        [Output("output")]
        public OutArgument<integer> WFOutput { get; set; }

        protected override void Execute(CodeActivityContext executionContext)
        {
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();

            //Create an Organization Service
            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.InitiatingUserId);

            //write your custom business logic here
             Int input = WFInput.Get(context);
             WFOutput.Set(context, WFInput + 100);

        }   
    }
}

