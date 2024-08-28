Sometime we make a lot of requests to server at a time, this is possiable to harm server if amount of requestss over server's capacity
![alt text](<Screenshot 2024-08-28 at 2.02.37 PM.png>)
To handle this point, I will devide request to smaller package to allow call maximum 3 request(optional, maybe more depend on configuration) at a time by put requests within a queue to ensure all requests don't go to server at the same time
![alt text](<Screenshot 2024-08-28 at 2.06.34 PM.png>)