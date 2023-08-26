# AR Digi Mobile App
# Login Details: 
    1. username: admin, password: 12345, tenant: tenant1 / tenant2, Configure Server: port- 8888(.env)
# All Hamburger Detail is in Profile.js file. 
    File Path: Pages -> Profile.js  
# Landing Page with all asset details. 
    File Path: AssetComponent.js
# QR / OCR Scan. 
    Component Name: Scan, OcrScanner
    File Path: Pages -> Scan.js / Pages -> OcrScanner.js
    Library Used: 
        a. QR code Scan: react-native-qrcode-scanner
        b. OCR Scan: rn-text-detector
# Live Parameter, Documents and live Trends for particular asset through QR/OCR scanning(Live parameters with Augmented View) or through landing page
  1. Live Parameter, Documents and live Trends for particular asset through landing page is in 
     Pages -> Parameter.js, Pages -> Documentation.js and 
     Pages -> Trends.js(All Live Trends related code is in Trends folder. Path: components -> Trends)
  2. Live Parameter for particular asset through QR/OCR scanning(Live parameters with Augmented View) is in
     a. Pages -> Scan.js / Pages -> OcrScanner.js then Pages -> KksSelection.js then Pages - > CamersScreen.js (in case of an asset belongs to multiple unit, header and subheader)
     b. Pages - > CamersScreen.js(in case of an asset having single hirerchy )
# Global Documents for all assets.
    File Path: components -> DocumentRepository.js
# Historical trend view for asstes. 
    Folder Path: components -> HistoricalTrend, Pages -> Analyze.js
# Task Management(Mutitenancy): Task List, create Task, View and Edit Task, Status update, Attachments of images / voice notes, Delete Task and Audit trails
    1. TaskList- All Task list view for particular tenant. TaskList Path: components -> TaskManagement -> MyTaskList.js
    2. Create Task- Create Task for any tenant. Create Task Path: components -> TaskManagement -> CreateTask.js
    3. View & Edit Task- Any task can be viewed and edited from the taskList Page. 
    View & Edit Task Path: components -> TaskManagement -> ViewTask.js & components -> TaskManagement -> EditTask.js
    4. Status Update- Task can be marked as completed from the taskList page using swiping the particular task or else it can be done from the view page. Once a task is marked as completed, it can't be edited.
    Path: components -> TaskManagement -> MyTaskList.js / components -> TaskManagement -> ViewTask.js
    5. Attachments of images / voice notes- while creating or editing a task user can attach voice note, but once the task is created then only user can attach images to the particular task which can be previewed and downloaded as well. 
        a. Image Attachment Path: components -> Attachments -> Attachments.js
        b. Voice Note Path: components -> TaskManagement -> Recording.js
    6. Delete Task- A Task can be deleted from the task list page while swiping the particular task. 
       File Path: components -> TaskManagement -> MyTaskList.js
    7. Audit Trail- All the actions are captured in audit trail. File Path: components -> Actions -> Actions.js
# Remote Support: Video call with screen sharing functionalities and data view. 
    Folder Path: components -> VideoCall
# Notification: Notificaiton feature for Task Management and video call. 
    File Path: components -> Notification.js & components -> NotificationIcon.js (For Task Notification)
    File Path: components -> VideoCall -> components -> VideoCallNotification.js (For Video Call Notification)
# Dashboard view along with graphs for Number of Users, Task, Video call. 
    File Path: components -> DashBoard -> DashBoard.js

# Common Css file for ARDigi and ARPower build:
    File Path: css -> CommonCss
    BrandName: utils -> BrandName.js(When brandName is AR Digi then companyName = AR Power and vice - versa)

# Bath File for ARDigi and ARPower release build for Android: 
Created a batch file and two separate folders which contain manifest file and string.xml file paths

Script for the batch file is given below: 

    @ECHO OFF
ECHO hello world 
IF "%1%" == "ARDigi" ( 
CALL COPY C:\Users\002AZX744\Bckup_project_ARDIGI\ManifestFileBackup\ARDigi\AndroidManifest.xml C:\Users\002AZX744\AR_DIGI_Project_Main\ar-digi-companion\ar-digi-app\android\app\src\main
CALL COPY C:\Users\002AZX744\Bckup_project_ARDIGI\ManifestFileBackup\ARDigi\strings.xml C:\Users\002AZX744\AR_DIGI_Project_Main\ar-digi-companion\ar-digi-app\android\app\src\main\res\values
)ELSE (
CALL COPY C:\Users\002AZX744\Bckup_project_ARDIGI\ManifestFileBackup\ARPower\AndroidManifest.xml C:\Users\002AZX744\AR_DIGI_Project_Main\ar-digi-companion\ar-digi-app\android\app\src\main
CALL COPY C:\Users\002AZX744\Bckup_project_ARDIGI\ManifestFileBackup\ARPower\strings.xml C:\Users\002AZX744\AR_DIGI_Project_Main\ar-digi-companion\ar-digi-app\android\app\src\main\res\values
)
CALL cd C:\Users\002AZX744\AR_DIGI_Project_Main\ar-digi-companion\ar-digi-app\android
CALL .\gradlew assembleRelease

PAUSE 


# sonarQube :
    link: http://inggn12442wspr:9000/projects
    User :  daac_dev
    pass :  daacdevrights

# Mobile Mock ups:
    ARPowe(Purple Theme): https://xd.adobe.com/view/0b3ff00f-402b-4f41-9c72-d2acf16e3008-5e6c/screen/7cda471e-c1ed-4b2b-bfe7-046ab63b4fe7/
    ARDigi(Green Theme): https://xd.adobe.com/view/016707c7-ea56-41b1-b9d6-b985645d3eb2-5434/grid/

# API Documentation: 
    https://siemensapc.sharepoint.com.mcas.ms/:x:/r/teams/ARDigiCompanion435/_layouts/15/Doc.aspx?action=edit&sourcedoc=%7Be53fb925-ad67-4285-ab6c-bc3377ed07ab%7D&wdOrigin=TEAMS-WEB.teamsSdk.openFilePreview&wdExp=TEAMS-CONTROL&web=1

# Swagger Link(port: 8888): http://ec2-34-196-202-136.compute-1.amazonaws.com:8888/swagger-ui/index.html?urls.primaryName=openapi#/task-resource/getAllTasksUsingGET 

# Future Scope: 
    1. Screen Unsharing while clicking cancel button(the person who is sharing screen) of the pop up for permission in Video call
    2. 



  





