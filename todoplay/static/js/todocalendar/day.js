const makeCalendar = (date) => {
    const currentMonth = new Date(date).getMonth() + 1;
    const currentDay = new Date(date).getDate();

    const selectedDate = document.location.search;
    console.log(selectedDate);
    const selectedMonth = selectedDate.substr(30, 1);
    console.log(selectedMonth);

    var dayIndex = selectedDate.indexOf('%', 30);
    console.log(dayIndex);

    const selectedDay = selectedDate.substring(32, dayIndex);
    console.log(selectedDay);

    
    document.querySelector(`.mon-day`).innerText = `${selectedMonth}/${selectedDay}`;
}

const date = new Date();
makeCalendar(date);


// 미니 캘린더 프리뷰
let miniDate = new Date();

const renderCalendar = () => {

    const viewYear = miniDate.getFullYear(); // 해당 년 받아오기
    const viewMonth = miniDate.getMonth(); // 해당 월 받아오기

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]; // 달 이름을 영어로 출력하기 위한 배열

    document.querySelector(".year-month").textContent = `${monthNames[viewMonth]}`;

    const prevLast = new Date(viewYear, viewMonth, 0); // 지난달의 마지막 날 Date 객체
    const thisLast = new Date(viewYear, viewMonth + 1, 0); // 이번달의 마지막 날 Date 객체

    const PLDate = prevLast.getDate(); // 지난달의 마지막 날짜
    const PLDay = prevLast.getDay(); // 지난달의 마지막 요일

    const TLDate = thisLast.getDate(); // 이번달의 마지막 날짜
    const TLDay = thisLast.getDay(); // 이번달의 마지막 요일

    // 날짜들을 담아둘 배열
    const prevDates = []; // 이전달 날짜
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = []; // 다음달 날짜

   
    if (PLDay !== 6) { // 이전 달을 표현할 날짜 생성 (지난달 마지막 요일이 토요일(6) 이면 굳이 그릴 그릴 필요 없음)
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i); // 이번달 마지막 날짜의 요일을 기준으로 필요한 개수를 파악해서 1부터 1씩 증가시키며 하나씩 채워넣음
    }

    const dates = prevDates.concat(thisDates, nextDates); // concat 메서드를 통해서 세 배열을 합침
    const firstDateIndex = dates.indexOf(1); // 지난달 부분을 알아내기 위함
    const lastDateIndex = dates.lastIndexOf(TLDate); // 다음달 부분을 알아내기 위함

    dates.forEach((date, i) => { // 이전달과 다음달 부분의 투명도 조절 위함
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ?
            'this' // 이번달
            :
            'other'; // 나머지 (span대그로 감싸 classa 로 지정)
        dates[i] = `<button class="date"><span class="${condition}">${date}</span></button>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');

    const today = new Date(); // 오늘 날짜 표기하기 위해
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) { // 현재 월을 보고 있는게 맞는지
        for (let miniDate of document.querySelectorAll('.this')) { // this 태그 찾기
            if (+miniDate.innerText === today.getDate()) { // +연산자로 숫자로 변경
                miniDate.classList.add('today'); // 해당 태그에 today 클래스 추가
                break;
            }
        }
    }
}

renderCalendar();

const goToday = () => {
    miniDate = new Date();
    renderCalendar();
}
//삭제
