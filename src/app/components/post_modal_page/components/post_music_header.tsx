import {Button, ButtonGroup} from "@mui/material";

export const Post_music_header = ({onBack, songSelectPage, setSongSelectPage, songPostPage}) => {

    if(songPostPage) {
        return (
            <div className={"border-b-2 border-black pb-2"}>
                <button onClick={onBack}>Back</button>
            </div>
        )
    }

    if(songSelectPage){
        return (
            <div className={"border-b-2 border-black flex justify-center pb-2"}>
                    <ButtonGroup>
                        <Button color={"success"} disabled={!songSelectPage}
                                onClick={() => setSongSelectPage(!songSelectPage)}>Your Song</Button>
                        <Button color={"success"} disabled={songSelectPage}
                                onClick={() => setSongSelectPage(!songSelectPage)}>Search</Button>
                    </ButtonGroup>
            </div>
        )
    }

    return (
        <div className={"border-b-2 border-black flex justify-between pb-2"}>
            <button onClick={onBack}>Back</button>
            <div>
                <ButtonGroup>
                    <Button color={"success"} disabled={!songSelectPage}
                            onClick={() => setSongSelectPage(!songSelectPage)}>Your Song</Button>
                    <Button color={"success"} disabled={songSelectPage}
                            onClick={() => setSongSelectPage(!songSelectPage)}>Search</Button>
                </ButtonGroup>
            </div>
            <div className="opacity-0">Back</div>
            {/* 透明なスペーサー */}
        </div>
    )
}