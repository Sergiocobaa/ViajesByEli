# Dockerfile (CORREGIDO)

# Stage 1: Base Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Stage 2: Build (para compilar el código)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 🛑 CRUCIAL: Copia el archivo .csproj desde la subcarpeta 'src/'
COPY ["src/ViajesByEli.Api.csproj", "src/"]

# Restaura las dependencias (dentro de /src)
RUN dotnet restore "src/ViajesByEli.Api.csproj"

# Copia el resto del código fuente.
COPY . .

# Publica la aplicación (ajustamos la ruta para apuntar a la carpeta del proyecto)
WORKDIR "/src/src" 
RUN dotnet publish "ViajesByEli.Api.csproj" -c Release -o /app/publish

# Stage 3: Final (la imagen de despliegue)
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ViajesByEli.Api.dll"]