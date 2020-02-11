# Building Front-End
cd frontend
npm install
npm run build
docker build -t school-listing/frontend .
docker run -d -p 8100:80 school-listing/frontend

cd ..

# Building Back-End
cd backend
npm install
npm run build
docker build -t school-listing/backend .
docker run -d -p 3000:3000 school-listing/backend