using DeviceManagement.Database;
using DeviceManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace DeviceManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly ILogger<DeviceController> _logger;
        private readonly IDatabaseDriver _databaseDriver;

        public DeviceController(ILogger<DeviceController> logger,
            IDatabaseDriver databaseDriver)
        {
            _logger = logger;
            _databaseDriver = databaseDriver;
        }

        [HttpGet("/DeviceProbes")]
        public IEnumerable<DeviceProbes> GetCompatibleProbes()
        {
            var d = _databaseDriver.listDevices();

            var r = new List<DeviceProbes>();
            foreach (var device in d)
            {
                var deviceProbes = new DeviceProbes
                {
                    Device = device,
                    CompatibleProbes = new List<Probe>(),
                };

                var probes = _databaseDriver.listProbes();
                foreach (var pr in probes)
                {
                    if (!device.Connectors.Any(connector => pr.Connector == connector.Type))
                    {
                        continue;
                    }

                    deviceProbes.CompatibleProbes.Add(pr);                    
                }

                r.Add(deviceProbes);
            }

            return r;
        }
    }
}