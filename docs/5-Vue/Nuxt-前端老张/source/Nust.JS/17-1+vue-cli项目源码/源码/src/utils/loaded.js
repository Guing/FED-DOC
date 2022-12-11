window.onload = function(){
    console.log("begin")
    let videoContainer = document.getElementById("vue-video-player");
    videoContainer.getElementsByTagName("video")[0].oncontextmenu = function (){
        return false;
    }
    console.log("end")
}
