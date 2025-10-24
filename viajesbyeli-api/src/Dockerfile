# Stage 1: Base Runtime (para la imagen final y ligera)
# Usamos la imagen de runtime de .NET 8.0, que es la más actual.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Stage 2: Build (para compilar el código)
# Usamos la imagen del SDK de .NET 8.0 para asegurar la compatibilidad.
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia los archivos de proyecto (.csproj) primero para optimizar la caché de Docker.
# Asumo que el archivo de proyecto está directamente bajo /src/
COPY ["ViajesByEli.Api.csproj", "."]

# Restaura las dependencias
RUN dotnet restore "ViajesByEli.Api.csproj"

# Copia el resto del código fuente.
COPY . .

# Publica la aplicación
RUN dotnet publish "ViajesByEli.Api.csproj" -c Release -o /app/publish

# Stage 3: Final (la imagen de despliegue)
FROM base AS final
WORKDIR /app

# Copia los archivos compilados del paso 'build' al paso 'final'.
COPY --from=build /app/publish .

# Define el punto de entrada para iniciar la API.
ENTRYPOINT ["dotnet", "ViajesByEli.Api.dll"]