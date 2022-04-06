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
- Tensorflow & Keras (for Training & Testing CNN Model)
- Flask Web Framework (for Backend)
- HTML,CSS,JS,Bootstrap(for Frontend)
- OpenCV Library of Python (for Image Processing)

## Working of the Project
- The user uploads an image to the website as shown below.
