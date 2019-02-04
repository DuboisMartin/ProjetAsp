using Microsoft.AspNetCore.SignalR;
using System;
using System.Net;
using System.Threading.Tasks;

namespace ProjetASP.Hubs
{
    public class MessengerHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);

            using (WebClient wc = new WebClient())
            {
                var reqparm = new System.Collections.Specialized.NameValueCollection();
                reqparm.Add("user", Uri.EscapeDataString(user));
                reqparm.Add("message", Uri.EscapeDataString(message));
                wc.UploadValuesAsync(new Uri("http://192.168.43.211:3000/back"), "POST", reqparm);
            }
        }
    }
}
