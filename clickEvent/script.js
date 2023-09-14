
window.onload = () => {
    /* 
    1. 객체를 생성할 위치 = 클릭한 위치


    */


    const clickEvent = () => {
        document.body.addEventListener('click', onImgShow);
        function onImgShow(e) {
            const {pageX: positionX, pageY: positionY } = e;
            /* const positionX = e.pageX;
            const positionY = e.pageY; */

            console.log(pageX, pageY);
        }
    }
    clickEvent();
}
