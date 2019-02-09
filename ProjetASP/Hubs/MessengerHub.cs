using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProjetASP.Hubs
{
    public class MessengerHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);

            using(HttpClient hc = new HttpClient())
            {
                var reqparm = new System.Collections.Specialized.NameValueCollection();
                reqparm.Add("user", Uri.EscapeDataString(user));
                reqparm.Add("message", Uri.EscapeDataString(message));

                var jsonString = JsonConvert.SerializeObject(reqparm);
                var content = new StringContent(jsonString, Encoding.UTF8, "application/json");

                var _ = await hc.PostAsync("http://192.168.43.211:3000/save", content);
            }
        }
    }
}
