
window.onload = () => {
    //동적으로 팝업창을 생성하는 함수
    createPopUp({
        name: '#popUp',
        data_url: './component/popUp.html',
    })

    const isCookie = document.cookie.indexOf('popUp=done');
    console.log(isCookie); //0
    //indexOf(): 특정한 곳의 문자 찾아주기

    if(isCookie === -1){
        document.querySelector('#popUp').style.display = 'block';
    } else {
        document.querySelector('#popUp').style.display = 'none';
    }
    
    document.querySelector('.closeBtn').addEventListener('click', function(){
        removePopUp(this);
    });
    
    document.querySelector('.del').addEventListener('click', function(){
        setCookie('popUp', 'done', 0);
    })
}
function createPopUp(opt) {
    // console.log(opt.name); //#popUp

    //팝업 생성 스타일
    let idName = opt.name.split('#')[1]; //받아온 name에서 #을 분리해서 제거
    // console.log(idName); //popUp

    let container = document.createElement('aside');
    container.setAttribute('id', idName); //새로운 아이디를 적용
    //스타일 지정
    /* container.style.position = 'absolute';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)'; */

    const content = document.createElement('div');
    content.classList.add('content');
    container.appendChild(content);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox';
    const label = document.createElement('label');
    label.innerText = '오늘 하루 그만 보기';
    wrap.appendChild(checkBox);
    wrap.appendChild(label);
    container.appendChild(wrap);

    const link = document.createElement('a');
    link.href = "#";
    link.classList.add('closeBtn');
    link.innerText = 'Close';
    container.appendChild(link);

    document.body.appendChild(container);
   
    const xhr = new XMLHttpRequest();
    /* 
    XMLHttpRequest
    : 웹페이지에서 서버와 통신을 하기 위한 방법 중의 하나로 
    서버에 데이터를 보내고 결과를 받아오는 과정을 거치는데 이 때 주고 받는 데이터를 다루는 방법
    */

//    console.log(xhr.readyState); //가지고 있는 state 값: 0 (open하기 전)
    xhr.open('GET', opt.data_url); //서버에 데이터를 보내는 방식(get, post, delete, put), 객체
    //open()을 통해 함수를 초기화 후에 서버에 요청
    // console.log(xhr.readyState); //가지고 있는 state 값: 1 (open한 후)
    xhr.onreadystatechange = () => {
        // console.log(xhr.readyState);
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200) {
                console.log('성공');
                content.innerHTML = xhr.responseText;
                //responseText: 응답받은 데이터를 문자열로 변환
            }else {
                console.log('실패');
            }
        }
    }
    xhr.send();
    //onreadystatechange = XMLHttpRequest에서 받아온 state의 값이 변경되면 호출되는 이벤트
    /* 
    readystate값에 따라서 처리 결과를 숫자로 전송

    0(UNSET) : 요청이 생성된 상태로 아직 서버에 요청을 하지 않은 상태
    1(OPEN) : 함수가 호출된 상태로 open()을 실행한 상태로 보며, 요청이 초기화된 상태
    2(HEADERS_RECIEVED) : 함수를 호출 후, 결과를 요청한 상태
    3(LOADING) : 서버에 요청한 결과를 받아오는 중
    4(DONE) : 서버에 요청한 결과를 받은 상태 (결과는 성공 / 실패, 이것도 숫자로 알려줌)
    - 200 = 서버에 수신이 성공
    - 400 = 서버에 수신이 실패 (404가 대표적)

    */
}

function removePopUp(el){

    const isChecked = el.previousElementSibling.querySelector('input[type=checkbox]').checked;
    // console.log(isChecked);

    const idName = el.parentNode.getAttribute('id'); 
    // console.log(idName); //popUp

    if(isChecked){
        setCookie(idName,'done', 1);
    }

    el.parentNode.style.display = 'none'; //화면에서만 안 보이게
    el.parentNode.parentNode.removeChild(el.parentNode); //구조상에서 아예 삭제
}

function setCookie(el, val, time){
    let today = new Date();
    let date = today.getDate();
    // console.log(date); //오늘 날짜의 일 나옴: 26
    today.setDate(date + time); //쿠키에서 정한 날짜를 오늘 날짜에 더해서 연장
    
    let dueDate = today.toUTCString();
    //toGMTString: 브라우저에서 쿠키 만료 일자 포맷 함수 GMT 기준으로 -9시간 차이 발생
    //toUTCString
    // console.log(dueDate);

    document.cookie = `${el} = ${val}; path=/; expires=${dueDate}`;
    console.log(document.cookie); //popUp=done
    
}