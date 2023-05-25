import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useNavigate } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';
import FileUpload from './FileUpload';

const PatientVideoCallPage = () => {

    const navigate = useNavigate()
    const roomId = localStorage.getItem("ptAppointmentId")
    // console.log("roomCode",roomId)
    const pt = JSON.parse(localStorage.getItem("patientDetails"))
    const ptName = pt.firstName

    const myMeeting = async (element) => {
        const appID = 626528421;       //tele-health
        const serverSecret = "c2c7fce47f9e72f2f039bdc026c4bfdc";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            ptName
        )

        const zp = ZegoUIKitPrebuilt.create(kitToken)

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            // sharedLinks: [
            //     {
            //         name: 'Personal link',
            //         url:
            //             window.location.protocol + '//' +
            //             window.location.host + window.location.pathname +
            //             '?roomID=' +
            //             roomId,
            //     },
            // ],
            showPreJoinView: false,
            showScreenSharingButton: true,
            maxUsers: 2,
            showUserList: false,
            layout: "Auto",
            showLayoutButton: true,
            // showRoomDetailsButton: true,
            turnOnCameraWhenJoining: false,
            turnOnMicrophoneWhenJoining: false,
            showLeavingView: false,
            onLeaveRoom: (() => {
                navigate(`/patient`)
                window.location.reload('false')
            }),
            lowerLeftNotification: {
                showUserJoinAndLeave: true, // Whether to display notifications on the lower left area when participants join and leave the room. Displayed by default.
                showTextChat: true // Whether to display the latest messages on the lower left area. Displayed by default.
            },
            // branding: {
            //     logoURL: `url("./whiteLogo.png")`  // The branding LOGO URL.
            // },
            showRoomTimer: true,
            whiteboardConfig: {
                showAddImageButton: true // It's set to false by default. To use this feature, activate the File Sharing feature, and then import the plugin. Otherwise, this prompt will occur: "Failed to add image, this feature is not supported."
                // showCreateAndCloseButton?: boolean; // Whether to display the button that is used to create/turn off the whiteboard. Displayed by default.
            },
            // onLeaveRoom: (newZegoUser) => navigate(`/patient`) // This will be triggered when you left the room.
        })
    }
    return (
        <div className='bg-blue-50'>
            <PatientNavbar />
            <div className='grid grid-cols-5'>
                <div className='col-span-4 p-8' >
                    <div ref={myMeeting} style={{ width: '100%', height: '75%' }} />
                </div>
                <div className='col-span-1 bg-indigo-200'><FileUpload /></div>
            </div>
        </div>
    )
}

export default PatientVideoCallPage