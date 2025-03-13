---
title: Music Motion Creation
year: 2025
order: 1
---
This project explores the design of an interactive music system that transforms movement into sound. Our goal was to create a more engaging and physical way for beginner musicians to compose music. The system is easy to learn, and requires no physical instruments: in a sense, it turns your body into the instrument.
<hr>
Using a Kinect motion sensor, we track the user’s position and arm movements. A screen displays animated animals, each representing a different sound loop. The user's hands are shown by dots on the screen, allowing them to select the animals. By moving their hands, users can adjust the volume of different animals, layering sounds to hear their own song.
<Images images="1dance.jpg,2dance.jpg" height="500px" width="500px" lgColumns="2" caption= "Demo of the system">
A central theme of this project was conducting academic research to establish a grounded design rationale. We studied related academic papers, analysed qualitative and quantitative data from interviews and surveys, tested prototypes and evaluated the final system’s user experience. This approach ensured that every aspect of the system was designed with purpose. For example, after testing a prototype without visual feedback, we introduced a more interactive screen with animals.
<hr>
The system uses the Kinect as its single input, processes the data, and then outputs the sounds through speakers while displaying animated animals on the screen. We used Python and PyKinect2 to process data from the Kinect, along with Pygame for rendering and audio mixing. I painted the animals by hand.
<hr>
<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1065402192?h=d70e87b558&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Music motion creation"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

<single-image src="cover.png" height="3000" width="1000">
