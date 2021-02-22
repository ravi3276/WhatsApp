import React,{useState,useEffect} from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom';
import db from './firebase'
import {useStateValue} from "./StateProvider";
import firebase from 'firebase';
function Chat() {
    const [{user},dispatch]= useStateValue();
    const [seed,setSeed]=useState("");
    const [input,setInput]=useState("");
    const [roomName,setRoomName]=useState("");
    const {roomId} =useParams();
        // console.log(roomId)
    const [message,setMessage]=useState([]);

    useEffect(() => {
       setSeed( Math.floor(Math.random()*5000))
    },[roomId])

    useEffect(() => {
        if (roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))
        }
        
            db.collection('rooms').doc(roomId)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot(snapshot=>(
                setMessage(snapshot.docs.map(doc=>doc.data()))
            ))

     },[roomId])
        console.log(message)
    const sendMessage=(e)=>{
            e.preventDefault();
            db.collection('rooms').doc(roomId).collection("messages").add({
                message: input,
                name:user?.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            })
            setInput("")
    }
    return (
       
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}
             alt="" />
                <div className="chat__headerinfo">
                    <h3>{roomName}</h3>
                    <p>
                    Last seen at ..{" "}
                    {
                        new Date(
                            message[message.length - 1]?.timestamp?.toDate()
                        ).toUTCString()
                    }
                    </p>
                </div>
                <div className="chat__headericon">
                    <IconButton>
                    <SearchIcon />
                    </IconButton>

                    <IconButton>
                    <AttachFileIcon />
                    </IconButton>
                    
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
            {
                message.map(msg=>(
                    <p className={`chat__message
                   ${msg.name===user.displayName && "chat__reciever"} 
                    `}>
                   <span className="chat__messageUser">{msg.name}</span>
                    {msg.message}
                    <span className="chat__messageTime">
                    {
                      new Date ( msg.timestamp?.toDate()).toUTCString()
                    }
                    </span>
        
                    </p>
                ))
            }
           

            </div>
            <div className="chat__footer">
            <SentimentVerySatisfiedIcon />
            <form>
            <input value={input}
            onChange={e=>setInput(e.target.value)}
            type="text" placeholder="Type a message..."/>
            <button type="submit" onClick={sendMessage}>send</button>
            </form>
            <MicIcon />
            </div>
        </div>
    )
}

export default Chat
