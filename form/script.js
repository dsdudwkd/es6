
window.onload = () => {
    // submit 버튼을 누르기 전에 forEach를 돌리는데
    document.querySelectorAll('input[type=submit]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (!isText('userId', 4)) { e.preventDefault(); } //isText의 조건이 맞지 않는 경우 submit의 기본 이벤트인 제출 이벤트가 실행되지 않음
            if (!isPw('userPw1', 'userPw2', 8)) { e.preventDefault(); }
            if (!isCheck('hobby')){ e.preventDefault(); }
            if (!isCheck('gender')){ e.preventDefault(); }
        })
    })

    const isText = (name, textLength = 4) => {
        const text = document.querySelector(`[name="${name}"]`).value;
        const msg = document.querySelector(`[name="${name}"]`).getAttribute('placeholder');

        //사용자가 아무런 값을 입력하지 않았을 때 조건
        if (text === '') {
            alert(msg);
            document.querySelector(`[name="${name}"]`).classList.add('error');
        } else {
            if (text.length < textLength) {
                // alert('최소 4글자 이상 입력하세요')
                alert(`최소 ${textLength}글자 이상 입력하세요`);
                document.querySelector(`[name="${name}"]`).classList.add('error');
            } else {
                document.querySelector(`[name=${name}]`).classList.remove('error');
            }
        }
    }

    // const isPw = (name1, name2, textLength = 8) => {
    //     const pw1 = document.querySelector(`[name="${name1}"]`).value;
    //     const pw2 = document.querySelector(`[name="${name2}"]`).value;
    //     let i = 0; //유효성 검사를 통과할 때마다 +1씩 값을 증가시킴, 유효성 검사의 항목 수 통과 유무를 판단하는 요소
    //     let isConfirm = false; //하나의 유효성 검사를 통과 못했을 때 경고창이 하나만 나오면 되는데 굳이 다른 것까지 보여줄 필요없도록 처리하는 요소

    //     /* 
    //     정규표현식: 문자열에 특정 문자의 조합들과 체크하기 위해서 사용하는 패턴
    //     ex) const text = /a/ => 문자열에 a라는 문자 존재 여부 체크
    //         const apple = /apple/ => 문자열에 apple이라는 단어 존재 여부 체크
    //         const text = /[a-z]/ => a부터 z까지의 문자열
    //         const num = /[0-9]/ => 0~9까지
    //         const text = /[^a-z]/ => ^는 부정의 의미, a-z까지의 문자가 아닌 문자
    //     */
    //     const num = /[0-9]/;
    //     const eng = /[a-z/]/;
    //     const spc = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;

    //     /* 
    //     패스워드 조건문
    //     1. pw1과 pw2가 서로 같아야함
    //     2. 비밀번호의 길이가 일정 갯수 이상
    //     3. 비밀번호의 조합 여부(숫자, 특수문자, 문자 포함했는지)
    //     */

    //     if (pw1 === pw2) {
    //         if (pw1.length >= textLength) {
    //             i++; //조건을 만족했다는 표시로 i를 ++하는 것
    //             console.log(i);
    //         } else {
    //             alert(`비밀번호는 최소 ${textLength}자리 이상 입력하세요`);
    //         }

    //         if (num.test(pw1)) {
    //             i++;
    //             console.log(i);
    //         } else {
    //             alert('비밀번호는 숫자를 하나 이상 포함해야 합니다.');
    //         }
    //         if (eng.test(pw1)) {
    //             i++;
    //             console.log(i);
    //         } else {
    //             alert('비밀번호는 문자를 하나 이상 포함해야 합니다.');
    //         }
    //         if (spc.test(pw1)) {
    //             i++;
    //             console.log(i);
    //         } else {
    //             alert('비밀번호는 특수문자를 하나 이상 포함해야 합니다.');
    //         }

    //         if (i === 4) {
    //             document.querySelector(`[name=${name1}]`).classList.remove('error');
    //             document.querySelector(`[name=${name2}]`).classList.remove('error');

    //             isConfirm = true;
    //             return isConfirm;
    //         } else {
    //             document.querySelector(`[name="${name1}"]`).classList.add('error');
    //             document.querySelector(`[name="${name2}"]`).classList.add('error');

    //             return isConfirm;
    //         }
    //     } else {
    //         alert('비밀번호를 동일하게 입력하세요.');

    //         document.querySelector(`[name="${name1}"]`).classList.add('error');
    //         document.querySelector(`[name="${name2}"]`).classList.add('error');

    //         return isConfirm;
    //     }


    // }

    const isPw = (name1, name2, textLength = 8) => {
        const pw1 = document.querySelector(`[name="${name1}"]`).value;
        const pw2 = document.querySelector(`[name="${name2}"]`).value;

        if (pw1 === pw2 && pw1.length >= textLength) {
            const num = /[0-9]/;
            const eng = /[a-z/]/;
            const spc = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;

            let i = 0;

            if (num.test(pw1)) {
                i++;
            } else {
                alert('비밀번호는 숫자를 하나 이상 포함해야 합니다.');
                return false; //넘겨줄 값이 없기 때문에 return으로 종료(false라고 명시적으로 종료)
            }

            if (eng.test(pw1)) {
                i++;
            } else {
                alert('비밀번호는 문자를 하나 이상 포함해야 합니다.');
                return false;
            }

            if (spc.test(pw1)) {
                i++;
            } else {
                alert('비밀번호는 특수문자를 하나 이상 포함해야 합니다.');
                return false;
            }

            if (i === 3) {
                document.querySelector(`[name="${name1}"]`).classList.remove('error');
                document.querySelector(`[name="${name2}"]`).classList.remove('error');
            }
        } else {
            alert('비밀번호를 동일하게 입력하고, 5자리 이상 입력하세요.');
            
            document.querySelector(`[name="${name1}"]`).classList.add('error');
            document.querySelector(`[name="${name2}"]`).classList.add('error');
        }
    }

    const isCheck = (name) => {
        const item = document.querySelector(`input[name="${name}"]`);

        let isChecked = false;

        item.forEach((el)=>{
            if(el.checked){
                isChecked = true;
                el.parentNode.querySelector(`input[name="${name}"]`).style.display = 'none';
            } else {
                el.parentNode.querySelector(`input[name="${name}"]`).style.display = 'block';
            }
        })
        return isChecked;

    }
}