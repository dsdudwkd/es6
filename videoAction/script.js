
window.onload = () => {
    /* 
    1. svg 관련 속성
    2. 비디오 컨트롤 관련 속성
    3. 스크롤 위치 값
    */

    const svgPath = document.querySelector('path');
    let winScrollTop; //현재 스크롤 값
    let scrollHeight; //document의 전체 height값
    let scrollRealHeight; //scrollHeight에서 윈도우의 높이 값(=스크롤 바)만큼 빼야되는 값
    let percent; //스크롤 값에서 스크롤 높이 값을 나눈 값에서 * 100

    let svgVal; //svg의 전체 길이를 새로 받아옴
    let svgMove; //svg의 위치 값을 새로 계산하기 위해서 생성할 값

    const isPlay = false; //처음에 동영상이 안 움직이고 있으니 false로 설정
    
    const svgSet = () => {
        svgPath.style.strokeDasharray = `${svgPath.getTotalLength()}`, `${svgPath.getTotalLength()}`;
        svgPath.style.strokeDashoffset = svgPath.getTotalLength();
        //svg의 경로를 전체 길이로 설정하고 offset을 전체 길이로 해서 숨김 처리
        //strokeDashArray: 점선을 생성해주는 속성
        //getTotalLength(): svg의 전체 길이를 구함
        //strokeDashoffset: svg의 점선 시작 지점
    }

    const init = () => {
        svgSet();
    }

    const drawSvg = () => {
        //정확한 값을 가져오기 위해서 두 가지 다 작성하는 것도 좋은 방법(둘 다 같은 의미)
        winScrollTop = window.pageYOffset || document.documentElement.scrollTop; //document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        scrollRealHeight = scrollHeight - window.innerHeight;
        percent = (winScrollTop / scrollRealHeight) * 100;
        // console.log(percent);

        svgVal = svgPath.getTotalLength();
        svgMove = Math.max(0, Math.min(svgVal, svgVal - (svgVal * (percent / 100))));
        svgPath.style.strokeDashoffset = svgMove;

        if(percent >= 100 && !isPlay){
            isPlay = true; //다른 속성을 위해 제어가 필요할 때 사용하기 위해 입력
            document.querySelector('.video_wrap').style.opacity = 1;
            
            setTimeout(()=>{
                document.querySelector('.svg_wrap').style.opacity = 0;
                document.querySelector('video').play(); //비디오 재생
            },300)
        } else if(percent < 100 && isPlay){
            isPlay = false;
            document.querySelector('.svg_wrap').style.opacity = 1;
            
            document.querySelector('video').pause(); //일시정지
            document.querySelector('video').currentTime = 0; //재생시간 선택
            document.querySelector('.video_wrap').style.opacity = 0;
        }
    }

    window.addEventListener('scroll', ()=>{
        drawSvg();
    })

    init();
}