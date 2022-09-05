import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = 'http://localhost:8080';
  const loginBody = JSON.stringify({
    account: 'guest',
    password: 'guest'
  });
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
  // sleep(1);
}