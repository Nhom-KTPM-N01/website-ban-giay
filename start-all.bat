@echo off
echo Starting KickZone Microservices...

start "Auth Service" cmd /k "cd auth-service && npm install && npm run dev"
timeout /t 2 /nobreak > nul

start "Profile Service" cmd /k "cd profile-service && npm install && npm run dev"
timeout /t 2 /nobreak > nul

start "Product Service" cmd /k "cd product-service && npm install && npm run dev"
timeout /t 2 /nobreak > nul

start "Cart Service" cmd /k "cd cart-service && npm install && npm run dev"
timeout /t 2 /nobreak > nul

start "Order Service" cmd /k "cd order-service && npm install && npm run dev"
timeout /t 2 /nobreak > nul

start "API Gateway" cmd /k "cd api-gateway && npm install && npm run dev"
timeout /t 3 /nobreak > nul

start "Frontend" cmd /k "cd frontend && npm install && npm start"

echo.
echo All services starting...
echo Frontend: http://localhost:3000
echo API Gateway: http://localhost:8000
echo.
pause
