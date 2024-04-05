# News Project
API Rest Service to list, create, modify, y delete news
## Technical Specifications
* API Rest developed in .NET Core 8
* The service connects to SQL Server engine
## Prerequisites
The [.NET Core SDK](https://dotnet.microsoft.com/es-es/download), which provides the dotnet command-line tool.
## Implementation
1. Clone the project
2. Open a cmd in the root project folder and run the following command `dotnet restore`
3. In appSettings.json
- Complete the `ConnectionStrings:Database` property with the properly SQL Server connectionString, [here is a hint](https://www.connectionstrings.com/sql-server/)
- Replace the `Cors:Origins` value list property with the allowed origins
4. Then execute `dotnet run`
5. When app runs, it shows Swagger UI

## News Project Structure
I built as simple as possible the project structure because the low complexity.
I decided to not add a Service Layer, and handle all in the Controller class.
Also, I decided do not use Repository and UnitOfWork pattern.
I defined a section for the Middleware class and implemented an owned CORS.
