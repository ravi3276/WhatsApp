import React,{useEffect,useState} from 'react'
import './SidebarChat.css'
import Avatar from '@material-ui/core/Avatar';
import db from './firebase';
import {Link} from 'react-router-dom';

function SidebarChat({addnewchat,id,name}) {

    const [seed,setSeed]=useState("");
    
        useEffect(() => {
           setSeed( Math.floor(Math.random()*5000))
        },[])

       

        
            const createChat = () =>{
                const roomName=prompt('please enter chatName')

                if(roomName){
                    db.collection('rooms').add({
                        name: roomName,
                    })
                }

            }


    return !addnewchat ? (
        <Link className="link" to={`/rooms/${id}`}>
        
        <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`} alt="" />

        <div className="sidebarchat__info">
        <h2>{name}</h2>
        <p>Last message..</p>
        </div>
      
        </div>
        </Link>
    ):(
        <div className="sidebarchat"
        onClick={createChat}
        >
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
