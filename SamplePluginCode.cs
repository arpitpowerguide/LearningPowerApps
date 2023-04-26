using System;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
namespace PowerGuide_Plugin_Solution.NotifyPlugin
{    
    public class NotifyContactCreate: PluginBase
    {
        public NotifyContactCreate(string unsecure, string secure) : base(typeof(NotifyContactCreate))
        {
           // TODO: Implement your custom configuration handling.
        }
        protected override void ExecutePluginCode(LocalPluginContext localContext)
        {
            if (localContext == null)
            {
                throw new InvalidPluginExecutionException(nameof(localContext));
            }           
            ITracingService tracingService = localContext.TracingService;
            try
            {  
                IPluginExecutionContext context = (IPluginExecutionContext)localContext.PluginExecutionContext;
                IOrganizationService service = localContext.OrganizationService;

                // TODO: Implement your custom Plug-in business logic.
            }
            catch (Exception ex)
            {
                tracingService?.Trace("An error occurred executing Plugin PowerGuide_Plugin_Solution.NotifyPlugin.NotifyContactCreate : {0}", ex.ToString());
                throw new InvalidPluginExecutionException("An error occurred executing Plugin PowerGuide_Plugin_Solution.NotifyPlugin.NotifyContactCreate .", ex);
            }
        }
    }
}