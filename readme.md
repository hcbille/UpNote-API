##Info:
This project is to add API functionality to UpNote since it's currently lacking. 
It uses an Android device as the API gateway with Termux as the software setup.


##Prereq:
1. An Android device - preferably a device that does not require batteries since it will be on 24/7. I use a first-gen MiBox.
2. Install (Termux)[https://github.com/termux/termux-app] and (Termux:Boot)[https://github.com/termux/termux-boot] and UpNote. I downloaded Termux and Termux:Boot from (F-Droid)[https://f-droid.org/] and UpNote from (Aurora)[https://auroraoss.com/] since it's not compatible with my device on Google Play.

##Install:
1. Clone the project.
2. Run "install.sh" to copy files from boot/ to .termux/boot to make the project and ssh autorun.
3. run "runMe.sh" to start the API

#UpNote endpoint used:
upnote://x-callback-url/note/new?title=[title]&text=[text]&notebook=[notebook]

#URL to try it locally:
http://localhost:3000/create_note?apiKey=[XXXXXX]&title=Test+Note&text=This+is+a+test+note&notebook=Test


Code written with help by (ChatGPT)[https://chat.openai.com/chat/]