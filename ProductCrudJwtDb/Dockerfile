FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5106

ENV ASPNETCORE_URLS=http://+:5106

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["ProductCrudJwtDb/AspCoreJwtDb.csproj", "ProductCrudJwtDb/"]
RUN dotnet restore "ProductCrudJwtDb/AspCoreJwtDb.csproj"
COPY . .
WORKDIR "/src/ProductCrudJwtDb"
RUN dotnet build "AspCoreJwtDb.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "AspCoreJwtDb.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AspCoreJwtDb.dll"]
