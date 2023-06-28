/** callback url react page */

import { Profiler, ProfilerOnRenderCallback, useEffect } from "react";
import { redirect, useLocation } from "react-router-dom";
import { OAuth } from "../../shared/oAuth";
import { API } from "../../shared/api";

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime)
}

export function Callback(): JSX.Element {
        const location = useLocation();
        useEffect(() => {
            const run = async () => {
                const params = new URLSearchParams(location.search);
                const code = params.get('code');
                const isValidState = OAuth.validateState();
                if (!isValidState) {
                    redirect('/?error=invalid_state');
                    return;
                }
                const provider = location.pathname.split('/')[2].split('?')[0];
                await API.sendTokenRequest(code as string, provider);
        }
        
        if (location.pathname.includes('callback') && location.search.includes('code'))
            run()
        }, [])
    
        return <Profiler id="Callback" onRender={onRender}>
            
            <></>
            </Profiler>
}