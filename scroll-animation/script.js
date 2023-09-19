
window.onload = () => {
    /* 
    1. 스크롤 값 구하기
    2. 이미지의 갯수
    3. 컨테이너 전체의 크기
    4. 컨테이너 크기와 스크롤 값을 나눠서 %로 변환하는 작업
    */

    //미리 값을 지정할 수 있고 고정인 것들
    const scrollBody = document.querySelector('.fix_motion');  //스크롤 애니메이션이 진행될 컨테이너
    const canvasWrap = document.querySelector('.canvas_wrap'); //이미지가 생성될 영역
    const canvas = document.createElement('canvas'); //캔버스 태그를 생성
    //canvas 태그: 스크립트를 이용해서 그래픽 관련된 컨텐츠를 생성할 때 사용하는 요소
    //애니메이션, 단순한 그래픽, 렌더링
    const ctx = canvas.getContext('2d');
    //getContext(): 렌더링 되고 있는 캔버스에서 데이터를 가져오는 함수
    const imgSrc = './images/'; 
    const imgFormat = '.jpg';
    const imgSize = 116;
    const imgArray = [];

    //미리 지정할 수 없는 것들
    let scrollHeight; //스크롤 값
    let sectionOffset; //애니메이션이 실행될 위치를 알아올 값
    let scrollRealHeight; //scrollHeight에서 sectionOffset을 뺀 값
    let scrollPercent;
    let winScrollTop;
    let sectionScrollTop;
    let imgWidth;
    let imgHeight;
    let imgCountNum  = 0; 
    let percent;

    const setSection = () => {
        scrollHeight = scrollBody.offsetHeight; 
        // console.log(scrollHeight); //7000
        winScrollTop = window.pageYOffset; //현재 스크롤 위치
        // console.log(winScrollTop);

        sectionOffset = scrollBody.getBoundingClientRect().top + winScrollTop;
        // console.log(sectionOffset); //508 (고정된 값)
        scrollRealHeight = scrollHeight - window.innerHeight; //전체 높이에서 윈도우의 높이 값만큼 뺀 값
        // console.log(scrollRealHeight); //6077
        sectionScrollTop = winScrollTop - sectionOffset;
        // console.log(sectionScrollTop);
        
        scrollPercent = (sectionScrollTop / scrollRealHeight);
        percent = scrollPercent * 100;
        // console.log(scrollPercent); //108%

        imgWidth = window.innerWidth;
        imgHeight = window.innerHeight;
    }

    const setCanvas = () => {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
    }

    const setAni = () => {
        const sq = Math.min(imgSize, Math.max(0, Number((imgSize * scrollPercent).toFixed(0))));
        // console.log(sq); //0 아니면 116

        ctx.clearRect(0, 0, imgWidth, imgHeight);
        //clearRect(x축, y축, width값, height값): 컨버스 관련 메서드, 컨버스 화면을 삭제
        ctx.drawImage(imgArray[sq], 0, 0, imgWidth, imgHeight); 
        //drawImage(이미지 객체, x축, y축, width값, height값): 컨버스 관련 메서드, 컨버스 화면을 새로 그림


        if(percent >= 35){ //임의의 %
            document.querySelector('.txt.pos1').classList.add('active');
        }
        if(percent >= 45){
            document.querySelector('.txt.pos2').classList.add('active');
        }
        if(percent >= 50){
            document.querySelector('.txt.pos3').classList.add('active');
        }
        if(percent < 35 || percent > 60){
            document.querySelector('.txt.pos1').classList.remove('active');
            document.querySelector('.txt.pos2').classList.remove('active');
            document.querySelector('.txt.pos3').classList.remove('active');
        }
        
    }

    const init = () => {
        canvasWrap.appendChild(canvas);
        
        for(let i = 0; i <= imgSize; i++){
            const img = new Image();
            const imgPath = `${imgSrc}${i}${imgFormat}`;

            img.src = imgPath;
            img.onload = () => {
                imgCountNum += 1;
                if(imgCountNum === imgSize){
                    setSection();
                    setCanvas();
                    setAni();
                }
            }
            imgArray.push(img);
            // console.log(imgArray);
        }
    }
    
    window.addEventListener('scroll', ()=>{
        setSection();
        setAni();
    })
    
    init();
}