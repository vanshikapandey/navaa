const request = new XMLHttpRequest();


request.addEventListener('readystatechange',()=>{
  if(request.readyState === 4 && request.status === 200){
    console.log(request.responseText);
  }else if(request.readyState === 4){
    console.log('could not fetch the data');
  }
});

request.open('GET' , 'http://localhost:8000/api/user/details');
request.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNAZ21haWwuY29tIiwiaWF0IjoxNjE3Njk2ODMzfQ.POaO7mpcIO5UGVcy_uOE_8G01qM3oPTQWrwF9M29Zx8')
request.send();
