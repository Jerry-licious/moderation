# Google Meet Moderation Tool

Meet moderation tool is an extension for Google chrome that provides utility functions to moderate a Google Meet session. Its function is based on clicking buttons in Google Meet to simplify certain tasks. 

### Installation

The extension is not available on the Google Web Store ~~because I can't afford the registration fee~~ because the extension is still in development, thus it must be installed as an unpacked extension. 

#### 1. Download

The extension is available on [GitHub](https://github.com/kaminingyou/moderation/releases/tag/0.1), find the latest release and download the zip file (**0.2.zip**). After downloading, extract the zip file. 

#### 2. Developer Mode

Start up Google Chrome, type `chrome://extensions/` into the **address bar** and press the **enter** key. Look for a switch labelled **Developer mode** on the top-right corner of the screen and press it.

#### 3. Load Unpacked

After developer mode is enabled, look for a button labelled **Load unpacked** and click it. Then open the extracted zip file and click **select folder**. After loading the folder, an extension named *Google Meet Moderation Tool* should appear. 

### Usage

After joining a Google Meet hangout, an icon should be visible on the top-right corner of the browser that looks like this: <img src="./images/logo128.png" alt="Icon" style="zoom:38%;" />. 

Clicking on the icon reveals a menu that allows you to enable the extension's utility functions. Buttons that are **grey** are toggle buttons that allow you to enable or disable specific functions, they turn orange when the feature is enabled. Buttons that are **blue** are buttons that allow you to triggered a specific feature once. 

#### Deny Join Requests

Google Meet allows people of the same GSuite organisation to join a session without any permissions, while people from other organisations or people that simply use their Gmail will require the permission of people in the session. When a person outside the organisation attempts to join, a pop-up window is presented to users to allow them to accept or deny the entry of that person. 

When toggled on, this feature *automatically looks for and presses the **deny** button*, so that nobody from outside the meet could join. 

#### Un-mutable

Before Google Meet updated at March 19th, members of the same hangout can mute other members. 

When toggled on, this feature *automatically looks for and presses the unmute button for yourself*, so that other members can not mute you.

#### Purge

The creator of a Google Meet session can kick all other members. 

When triggered, this feature *automatically opens the **people** tab, goes through every single member and **removes** them from the session* to clear the meeting room.

Note that this feature temporarily takes control over the window and any other inputs made by the user may interrupt the process and cause an error. The process may also be halted if anyone joins the session during the process.

If the process stops, press the button again to restart it.

#### Mass Dispel

The creator of a Google Meet session can mute all other members.

When triggered, this feature *automatically opens the **people** tab, goes through every single member and **mutes** them* to mute all members of the meeting room. 

Note that this feature temporarily takes control over the window and any other inputs made by the user may interrupt the process and cause an error.

If the process stops, press the button again to restart it.

#### Blacklist

The **blacklist** is a collection of **names** that can be changed by the extension and is used to remove members. The blacklist identifies and remove members by their **names** that are **displayed in Google Meet** and the identification process is **case sensitive**. If a person **impersonates** another person in a meet session and is **blacklisted**, the **original person can be removed by the blacklist as well**.

##### Add To Blacklist

When triggered, this feature *adds the name in the textbox into the **blacklist***.

##### Remove From Blacklist

When triggered, this feature *removes the name in the textbox from the **blacklist***.

##### Clear Blacklist

When triggered, this feature *removes **all** names from the **blacklist***. 

##### Remove Blacklisted

When triggered, this feature *automatically opens the **people** tab, looks for members that are in the **blacklist** and removes them* to remove all blacklisted members of the meeting room. 

Note that this feature temporarily takes control over the window and any other inputs made by the user may interrupt the process and cause an error. The process may also be halted if anyone joins the session during the process. Impersonators in **blacklist** may result in original person getting removed. 

If the process stops, press the button again to restart it.

##### Enable Blacklist

When enabled, this feature *automatically opens the **people** tab and removes all blacklisted members of the meeting room **once every 3 seconds*** to constantly remove blacklisted members in case they re-join. 

Note that this feature takes control over the window **every 3 seconds** and keeps the control over it until all blacklisted members are removed, so any other inputs made by the user may interrupt the process and cause an error. Impersonators in **blacklist** may result in original person getting removed. 