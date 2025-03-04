---
title: Music Motion Creation
year: 2025
---
This project explores the design of an interactive music system that transforms movement into sound. Our goal was to create a more engaging and physical way for beginner musicians to compose music. The system is easy to learn, and requires no physical instruments: in a sense, it turns your body into the instrument.

Using a Kinect motion sensor, we track the user’s position and arm movements. A screen displays animated animals, each representing a different sound loop. The user's hands are shown by dots on the screen, allowing them to select the animals. By moving their hands, users can adjust the volume of different animals, layering sounds to hear their own song.
<Images images="IMG_6614.jpg,IMG_6625.jpg" height="500px" width="500px" lgColumns="2">
A central theme of this project was conducting academic research to establish a grounded design rationale. We studied related academic papers, analysed qualitative and quantitative data from interviews and surveys, tested prototypes and evaluated the final system’s user experience. This approach ensured that every aspect of the system was designed with purpose. For example, after testing a prototype without visual feedback, we introduced a more interactive screen with animals.

The system uses the Kinect as its single input, processes the data, and then outputs the sounds through speakers while displaying animated animals on the screen. We used Python and PyKinect2 to process data from the Kinect, along with Pygame for rendering and audio mixing. I painted the animals by hand.

<single-image src="cover.png" height="3000" width="400">