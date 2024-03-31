using System.Diagnostics;

namespace News.API.Middleware
{
    public class TimeLogMiddleware
    {
        private readonly RequestDelegate _nextRequest;
        private readonly ILogger _logger;

        public TimeLogMiddleware(RequestDelegate nextRequest, ILogger<TimeLogMiddleware> logger)
        {
            _nextRequest = nextRequest;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context) 
        {
            Guid traceId = Guid.NewGuid();
            _logger.LogInformation($"Start Request: {traceId}");
            Stopwatch stopwatch = new Stopwatch();
            
            stopwatch.Start();
            await _nextRequest(context);
            stopwatch.Stop();
            
            TimeSpan ts = stopwatch.Elapsed;
            string elapsedTime = string.Format("{0:00}:{1:00}{2:00}{3:00}",
                ts.Hours, ts.Minutes, ts.Seconds, ts.Milliseconds / 10);
            _logger.LogInformation($"The request {traceId} has taken {elapsedTime}.");
        }
    }
}
