document.addEventListener('DOMContentLoaded', () => {
    const poundsInput = document.getElementById('pounds');
    const resultSpan = document.getElementById('result');
    const timerDiv = document.getElementById('timer');
    const countdownSpan = document.getElementById('countdown');

    let timeoutId = null;
    let countdownInterval = null;
    let secondsLeft = 10;

    function convertWeight() {
        const pounds = parseFloat(poundsInput.value);

        if (timeoutId) {
            clearTimeout(timeoutId);
            clearInterval(countdownInterval);
        }

        if (!poundsInput.value || isNaN(pounds)) {
            resultSpan.textContent = '';
            timerDiv.classList.add('hidden');
            return;
        }

        const kg = pounds * 0.453592;
        resultSpan.textContent = kg.toFixed(2);

        secondsLeft = 10;
        countdownSpan.textContent = secondsLeft;
        timerDiv.classList.remove('hidden');

        countdownInterval = setInterval(() => {
            secondsLeft--;
            countdownSpan.textContent = secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);

        timeoutId = setTimeout(() => {
            resultSpan.textContent = '';
            poundsInput.value = '';
            timerDiv.classList.add('hidden');
            clearInterval(countdownInterval);
            timeoutId = null;
        }, 10000);
    }

    poundsInput.addEventListener('input', convertWeight);
});

(function(){
    function c(){
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement('script');
            d.innerHTML = "window.__CF$cv$params={r:'951954e1c65c7a30',t:'MTc1MDIzNDQ1MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName('head')[0].appendChild(d);
        }
    }
    if (document.body) {
        var a = document.createElement('iframe');
        a.height = 1;
        a.width = 1;
        a.style.position = 'absolute';
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = 'none';
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        if ('loading' !== document.readyState) c();
        else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
        else {
            var e = document.onreadystatechange || function(){};
            document.onreadystatechange = function(b){
                e(b);
                if ('loading' !== document.readyState) {
                    document.onreadystatechange = e;
                    c();
                }
            };
        }
    }
})();
