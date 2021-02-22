import React,{useState,useEffect} from 'react';
import './Sidebar.css';
import Avatar from '@material-ui/core/Avatar';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from './firebase';
import {useStateValue} from './StateProvider';
function Sidebar() {
        const[{user},dispatch]= useStateValue();
    const [rooms,setRooms]=useState([]);

    useEffect(() => {
      const unsubscribe=  db.collection("rooms").onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>(
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))

        return ()=>{
            unsubscribe();
        }
    },[])

    return (
        <div className="sidebar">
                <div className="sidebar__header">
                <IconButton>
                  <Avatar alt={user?.displayName} src={user?.photoURL} />
                </IconButton>

                <div className="sidebar__headerRight">
                <IconButton>
                  <DonutLargeIcon />
                </IconButton>

                <IconButton>
                    <ChatIcon />
                </IconButton>

                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                </div>
                </div>


                <div className="sidebar__search">

                    <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder="Search or Start new chat" />
                    </div>
                </div>

                <div className="sidebar__chats">

                <SidebarChat addnewchat/>

                {
                    rooms.map(room=>(
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>

                    ))
                }

                
               
                </div>
        </div>
    )
}

export default Sidebar
