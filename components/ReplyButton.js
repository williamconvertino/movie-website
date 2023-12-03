import React, { useState } from 'react';

import { UserAuth } from './context/AuthContext';

export default function ReplyButton ({ parentReview, parentDiscussion, refresh, text = "Reply" }) {

    const {user, profile} = UserAuth()

    const [open, setOpen] = useState(false)
    const [content, setContent] = useState("");

    const toggleOpen = () => {
        setOpen(!open)
    }

    const handleSubmit = async () => {
        
        if (content.length == 0) return

        const censoredResp = await fetch(`/api/censor?content=${content}`)
        const censoredData = await censoredResp.json()
        const censoredContent = censoredData.censoredContent
        setContent(censoredContent)

        const resp = await fetch(`/api/addDiscussion?user=${profile.id}&parentReview=${parentReview}&parentDiscussion=${parentDiscussion}&content=${censoredContent}`)
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