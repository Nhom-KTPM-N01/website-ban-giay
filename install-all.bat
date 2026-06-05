@echo off
echo Installing dependencies for all services...
echo.

echo [1/7] API Gateway...
cd api-gateway && npm install
cd ..

echo [2/7] Auth Service...
cd auth-service && npm install
cd ..

echo [3/7] Profile Service...
cd profile-service && npm install
cd ..

echo [4/7] Product Service...
cd product-service && npm install
cd ..

echo [5/7] Cart Service...
cd cart-service && npm install
cd ..

echo [6/7] Order Service...
cd order-service && npm install
cd ..

echo [7/7] Frontend...
cd frontend && npm install
cd ..

echo.
echo Done! Run start-all.bat to start all services.
pause
