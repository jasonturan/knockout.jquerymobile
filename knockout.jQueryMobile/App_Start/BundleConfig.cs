using System.Web;
using System.Web.Optimization;

namespace knockout.jQueryMobile
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-2.1.4.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryMobile").Include(
                        "~/Scripts/jQueryMobile/jquery.mobile-1.4.5.js"));
            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                        "~/Scripts/knockout-3.4.0.debug.js",
                        "~/Scripts/knockout.mapping-latest.debug.js",
                        "~/Scripts/knockout.bindingHandlers.jqm/knockout.bindingHandlers.jqm.js"));
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/underscore").Include(
                       "~/Scripts/underscore.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles
                .Add(new StyleBundle("~/Content/jqueryMobile/css")
                    .Include("~/Content/jQueryMobile/jquery.mobile-1.4.5.css")
                    .Include("~/Content/jQueryMobile/jquery.mobile.flatui.css"));



        }
    }
}
