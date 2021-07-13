# Getir-Challenge
#### Technologies used - Node, Express, Mongoose, Pm2, Jest
#### Live node js app deployed on AWS EC2 using PM2
###### EndPoint Url: 18.119.106.143:9001/records
###### Allows only post method with the following params 
```
  {
    "startDate": "2016-01-23",
    "endDate": "2018-02-23",
    "minCount": 2700,
    "maxCount": 3000
  }
```
If valid params are not passed api throws relevant error messages.

### Steps to run locally
```
git clone 
cd getir
npm i
npm start
starts at port 9001 on localhost
```
### To run test cases
```
npm run test
```
