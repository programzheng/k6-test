import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = 'http://localhost:8080';
  const users = [
    {
      account: 'guest',
      password: 'guest',
    },
    {
      account: 'guest2',
      password: 'guest2',
    },
    {
      account: 'guest2',
      password: 'guest2',
    },
    {
      account: 'guest3',
      password: 'guest3',
    },
  ]
  const randomIndex = Math.floor(Math.random() * users.length);
  const user = users[randomIndex];
  const loginBody = JSON.stringify(user);
  const loginParams = {
    headers:{
      'Content-Type': 'application/json'
    }
  }
  const loginResponse = http.post(`${url}/api/v1/users/login`, loginBody, loginParams);

  const loginResponseBody = loginResponse.json();
  const loginToken = loginResponseBody.value.token;

  const gamePlayParams = {
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginToken}`
    }
  }
  http.post(`${url}/api/v1/games/play`, null, gamePlayParams);
}