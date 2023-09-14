/* 
적용할 이벤트 종류
1. 스크롤 할 때 윈도우의 높이 값만큼 이동
2. 해당 도트를 클릭하면 index에 해당하는 section으로 이동
3. 각 section이 화면에 들어오면 on이라는 클래스를 추가(dot포함)
*/
window.onload = () => {
    parallax();

}

function parallax() {
    const content = document.querySelectorAll('section');
    const dotList = document.querySelectorAll('#navi li');
    const base = -400;

    let posArr = []; //section이 가지고 있는 위치값을 배열로 반환(처음엔 위치값을 모르고 반응형이 들어갈 수 있으니 값을 설정할 수 없다)
    /*
    offsetTop값은 resize 이벤트로 달라지기 때문에 미리 받아올 수 없고 
    이벤트마다 새로 받아와야 하기 때문에 빈 배열로 선언 후에 resize 이벤트 실행 시 새로운 값을 배열에 대입
    */

    onResize(); //onload시 onResize()실행
    window.addEventListener('resize', onResize); //브라우저 창을 줄이거나 늘리는 이벤트
    window.addEventListener('scroll', onScroll);

    [...content].forEach((el) => {
        el.addEventListener('wheel', onWheel); //마우스 휠 한번에 section 페이지가 이동하는 이벤트
    });

    [...dotList].forEach((el)=>{
        el.addEventListener('click', onClick);
    });

    function onResize() {
        posArr = [...content].map((el) => el.offsetTop);
        // console.log(posArr);
    }

    function onWheel(e) {
        //wheel이벤트는 event를 받아와야 하므로 매개변수가 필요하다(e, event)
        /* 
        wheel과 scroll의 차이점
        wheel: 마우스 휠의 작동 유무를 판단
        scroll: 휠로 페이지 내부의 위치 값이 얼마나 이동했는지를 반환

        휠 이벤트는 브라우저마다 적용되는 이벤트가 다르다
        이전 버전에서는 mousewheel과 DOMMouseScroll이라는 이벤트로 분류해서 사용했었음
        mousewheel은 익스플로러, 사파리, 크롬
        DOMMouseScroll은 파이어 폭스

        최신에서는 wheel로 모두 대체됨
        */
        const deltaY = e.deltaY || e.detail || -e.wheelDelta;
        console.log(deltaY);

        if (deltaY < 0) {
            //indexOf는 배열에서 지정된 요소를 찾아 첫 번째 요소를 반환
            if ([...content].indexOf(this) !== 0) {
                const index = [...content].indexOf(this);
                moveScroll(index - 1); //index의 값이 같은 값으로 나오므로 위로 갔는지 아래로 갔는지 차이를 주기 위해 -1, +1을 적용
                console.log(index - 1);
            }
        } else {
            if ([...content].indexOf(this) !== content.length - 1) {
                const index = [...content].indexOf(this);
                moveScroll(index + 1);
                console.log(index + 1);
            }

            // console.log(e.detail);
            // console.log(e.wheelDelta);
        }
    }

    function moveScroll(index) {
        const targetPosition = posArr[index]; //onWheel 이벤트에서 받아온 index에 해당하는 posArr[]에 들어있는 offsetTop값이 반환
        // console.log(targetPosition);

        const currentPosition = window.pageYOffset || document.documentElement.scrollTop; // 현재 스크롤 위치값을 받아옴
        const distance = targetPosition - currentPosition; //현재 스크롤된 값에 이동할 위치 값을 빼서 이동하게 해주는 값(이게 없으면 0부터 계속 다시 시작)
        const duration = 500; //애니메이션 적용 시간

        let isStart; //이동하고 있는지 값을 매개변수로 처리

        window.requestAnimationFrame(step); //requestAnimationFrame: setInterval이랑 같은 것이지만 더 매끄럽게 작용하는 애니메이션

        function step(time) {
            // console.log(time); //현재 적용 시간(시간이 계속 누적)
            if (!isStart) isStart = time; //애니메이션이 시작 전인지 판단
            const progress = time - isStart; //현재 애니메이션이 시작되고 지난 시간
            const percent = Math.min(progress / duration, 1); //애니메이션의 진행도, 1은 최소한의 비율값
            window.scrollTo(0, currentPosition + distance * percent);

            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
    }

    function onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop; //화면의 비율을 가져오기 위한 값
        console.log(scrollTop); //스크롤 값 가져오게됨
        [...dotList].forEach((el, index) => {
            if (scrollTop >= posArr[index] + base) {
                dotList.forEach((el) => {
                    //여기서 el은 dotList
                    el.children[0].classList.remove('on'); //모든 li의 자식태그인 a태그에 on을 삭제 
                })
                el.children[0].classList.add('on'); //posArr배열의 index값을 해당하는 도트에 on이라는 클래스 추가

                [...content].forEach((el) => {
                    el.classList.remove('on');
                })
                content[index].classList.add('on');
            }
        })
    }

    function onClick(){
        const index = Array.from(dotList).indexOf(this);
        console.log(index);
        moveScroll(index);
    }
}