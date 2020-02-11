# Building Front-End
cd frontend
npm install
npm run build
docker build -t school-listing/frontend .
docker run -d -p 8100:80 school-listing/frontend

cd ..

# Building Database
cd database
docker build -t school-listing/db .
docker run -d -p 27018:27017 school-listing/db

# Building Back-End
cd backend
npm install
npm run build
docker build -t school-listing/backend .
docker run -d -p 3000:3000 school-listing/backend