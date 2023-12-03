import React, { useState } from 'react';

import { UserAuth } from './context/AuthContext';

export default function ReplyButton ({ parentID, refresh, review=false, text = "Reply" }) {

    const {user, profile} = UserAuth()

    const [open, setOpen] = useState(false)
    const [content, setContent] = useState("");

    const toggleOpen = () => {
        setOpen(!open)
    }

    const handleSubmit = async () => {
        
        if (content.length == 0) return
        const resp = await fetch(`/api/addDiscussion${review ? "Review": ""}?user=${profile.id}&parent=${parentID}&content=${content}`)
        const data = await resp.json()
        const newID = data.discussionID
        setContent("")
        refresh()
        toggleOpen()
    }

    return <div>
        {open ? <div> 
            
                <textarea
                    placeholder="Reply here ..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={handleSubmit}>Submit Reply</button>
            
        
            <div onClick={toggleOpen}>Cancel</div>
        </div> : <div onClick={toggleOpen}> {text}</div >}
    </div>

}