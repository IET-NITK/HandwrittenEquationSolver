# Handwritten Equation Solver


## AIM of the Project
As the name of the project suggests, we intend to make such a system(Web Interface) in which user will just upload his/her handwritten equation(s) and in return would get the solution to that.
> Note: The project is restricted only for Polynomials & Linear Equations(1 & 2 Variable)

## Implementation
- For detecting handwritten equation, we need to detect number,mathematical symbols,variables etc. So firstly, we trained a CNN(Convolutional Nueral Network) Model over a specified dataset.
- Now once the CNN Model was tested enough for detecting handwritten contents, we further proceed to apply some Algebra to solve these detected Equations/Polynomials.
- Then, we created a Frontend where user can upload & crop the images of the handwritten equation and can feed it further to the Backend Servers.
- The user uploaded images are way to diffrent from the images that CNN demands,Hence we applied Image processing(OpenCV) on the user uploaded image to convert it into a desired image.

## Frameworks & Modules Used
- **Tensorflow** & **Keras** (for Training & Testing CNN Model)
- **Flask** Web Framework (for Backend)
- **HTML**,**CSS**,**JS**,**Bootstrap**(for Frontend)
- **OpenCV** Library of Python (for Image Processing)
- **sympy** module(Handles all equation Solving)

## Working of the Project
> Note: For the project 'a','b' are variables & 'x' is the multiplication sign.Also '=0' is already understood by the model so user need not write it. So if the Equation is 15a=45, then user need to write 15a-45 and then upload it on the website.
- The user uploads an image to the website as shown below:-
![eq](https://user-images.githubusercontent.com/85332648/161968276-040dad35-b81d-4a47-b595-f428496ff800.jpeg)
- Then the image is processed and converted to desired image that model wants as shown below.
![image](https://user-images.githubusercontent.com/85332648/161968517-78d5adaf-96bc-472b-a5c2-7dbab94c7bdf.png)
- Model then detect that an equation with variable 'a' has been uploaded & generates the following output.
![image](https://user-images.githubusercontent.com/85332648/161969317-027e503f-a9a7-45b4-b077-d06458b8e9b0.png)
- Similarly for Linear Equation in two vraible user need to upload two Images as shown below:-
![eq1](https://user-images.githubusercontent.com/85332648/161969873-2dd69652-67b2-4930-9de3-c97184875e3c.jpeg)
![eq2](https://user-images.githubusercontent.com/85332648/161969912-505cc709-95ba-492b-bfd7-dcce54944027.jpeg)
- Again Model coverts both images as desired images & Solves it!!
![image](https://user-images.githubusercontent.com/85332648/161970223-07b7aaa5-ef10-49d9-b28e-d6ff49df8766.png)
![image](https://user-images.githubusercontent.com/85332648/161970272-64c63894-d011-4e15-9264-5f33c4609531.png)
- Model produces Following output:-
![image](https://user-images.githubusercontent.com/85332648/161970375-8d5d9888-e699-4a15-819d-52a759ddd2cc.png)

