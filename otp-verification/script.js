const emailStep = document.getElementById('emailStep');
const otpStep = document.getElementById('otpStep');
const emailPhoneInput = document.getElementById('emailPhone');
const inputError = document.getElementById('inputError');
const sentTo = document.getElementById('sentTo');
const otpNotification = document.getElementById('otpNotification');
const otpDisplay = document.getElementById('otpDisplay');
const otpInputs = document.querySelectorAll('.otp-input');
const verifyBtn = document.getElementById('verifyBtn');
const resendBtn = document.getElementById('resendBtn');
const backBtn = document.getElementById('backBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const timer = document.getElementById('timer');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const closeNotification = document.getElementById('closeNotification');
const copyOtp = document.getElementById('copyOtp');

let generatedOtp = '';
let otpExpiration;
let timerInterval;
let resendTimer = 0;
let notificationTimeout;

function generateOtp() {
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpExpiration = Date.now() + 300000; // 5 minutes from now
    otpDisplay.textContent = generatedOtp;
    
    // Clear any existing timeout
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }
    
    // Show notification
    otpNotification.style.display = 'block';
    
    // Auto-hide notification after 20 seconds
    notificationTimeout = setTimeout(() => {
        otpNotification.style.display = 'none';
    }, 20000);
    
    // Start resend cooldown
    startResendCooldown();
}

otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        
        if (value && !isNaN(value)) {
            input.classList.add('filled');
            
            if (index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        } else {
            e.target.value = '';
        }
        
        resetValidation();
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpInputs[index - 1].focus();
            otpInputs[index - 1].value = '';
            otpInputs[index - 1].classList.remove('filled');
        }
        
        if (e.key === 'ArrowLeft' && index > 0) {
            otpInputs[index - 1].focus();
        }
        
        if (e.key === 'ArrowRight' && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });
    
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        
        if (/^\d+$/.test(pastedData)) {
            pastedData.split('').forEach((digit, i) => {
                if (i < otpInputs.length) {
                    otpInputs[i].value = digit;
                    otpInputs[i].classList.add('filled');
                }
            });
            
            const lastFilledIndex = Math.min(pastedData.length - 1, otpInputs.length - 1);
            otpInputs[lastFilledIndex].focus();
        }
    });
});

function resetValidation() {
    otpInputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
}

function getOTP() {
    return Array.from(otpInputs).map(input => input.value).join('');
}

function startTimer(duration, display) {
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    let timer = duration;
    let minutes, seconds;
    
    // Update immediately
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        updateTimerDisplay();
        
        if (--timer < 0) {
            clearInterval(timerInterval);
            display.textContent = "";
            timerInterval = null;
        }
    }, 1000);
    
    function updateTimerDisplay() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = `OTP expires in: ${minutes}:${seconds}`;
    }
}

function startResendCooldown() {
    resendTimer = 30; // 30 seconds cooldown
    resendBtn.disabled = true;
    resendBtn.style.opacity = '0.5';
    resendBtn.style.cursor = 'not-allowed';
    
    const cooldownInterval = setInterval(() => {
        if (resendTimer > 0) {
            resendBtn.textContent = `Resend OTP (${resendTimer}s)`;
            resendTimer--;
        } else {
            clearInterval(cooldownInterval);
            resendBtn.textContent = 'Resend OTP';
            resendBtn.disabled = false;
            resendBtn.style.opacity = '1';
            resendBtn.style.cursor = 'pointer';
        }
    }, 1000);
}

function validateOTP() {
    const otp = getOTP();
    
    if (otp.length !== 6 || Date.now() > otpExpiration) {
        showError("OTP expired or incorrect.");
        return;
    }
    
    verifyBtn.classList.add('loading');
    
    setTimeout(() => {
        verifyBtn.classList.remove('loading');
        
        if (otp === generatedOtp) {
            otpInputs.forEach(input => {
                input.classList.add('valid');
                input.classList.remove('invalid');
            });
            successMessage.classList.add('show');
            errorMessage.classList.remove('show');
            
            setTimeout(() => {
                otpInputs.forEach(input => {
                    input.value = '';
                    input.classList.remove('filled', 'valid');
                });
                emailStep.style.display = 'block';
                otpStep.style.display = 'none';
                successMessage.classList.remove('show');
            }, 3000);
        } else {
            showError("Invalid OTP. Please try again.");
        }
    }, 1500);
}

function showError(message = "Invalid OTP. Please try again.") {
    otpInputs.forEach(input => {
        if (input.value) {
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
    });
    errorMessage.querySelector('span').textContent = message;
    errorMessage.classList.add('show');
    successMessage.classList.remove('show');
    
    setTimeout(() => {
        otpInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled', 'invalid');
        });
        otpInputs[0].focus();
        errorMessage.classList.remove('show');
    }, 2000);
}

sendOtpBtn.addEventListener('click', () => {
    const emailPhone = emailPhoneInput.value.trim();
    
    // Basic validation for email or phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    if (emailPhone.length === 0) {
        inputError.textContent = "Please enter a valid email or phone number.";
        return;
    }
    
    if (!emailRegex.test(emailPhone) && !phoneRegex.test(emailPhone)) {
        inputError.textContent = "Please enter a valid email address or phone number.";
        return;
    }
    
    inputError.textContent = "";
    sentTo.textContent = emailPhone;
    
    // Show loading state
    sendOtpBtn.classList.add('loading');
    
    setTimeout(() => {
        sendOtpBtn.classList.remove('loading');
        emailStep.style.display = 'none';
        otpStep.style.display = 'block';
        generateOtp();
        startTimer(300, timer);
        otpInputs[0].focus();
    }, 1000);
});

verifyBtn.addEventListener('click', validateOTP);

backBtn.addEventListener('click', () => {
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Reset form
    otpInputs.forEach(input => {
        input.value = '';
        input.classList.remove('filled', 'valid', 'invalid');
    });
    
    emailStep.style.display = 'block';
    otpStep.style.display = 'none';
    otpNotification.style.display = 'none';
});

resendBtn.addEventListener('click', () => {
    if (!resendBtn.disabled) {
        generateOtp();
        startTimer(300, timer);
        
        // Clear existing OTP inputs
        otpInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled', 'valid', 'invalid');
        });
        otpInputs[0].focus();
    }
});

// Add enter key support for email input
emailPhoneInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendOtpBtn.click();
    }
});

// Add enter key support for OTP verification
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && otpStep.style.display !== 'none') {
        validateOTP();
    }
});

// Close notification button
closeNotification.addEventListener('click', () => {
    otpNotification.style.display = 'none';
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }
});

// Copy OTP button
copyOtp.addEventListener('click', () => {
    navigator.clipboard.writeText(generatedOtp).then(() => {
        copyOtp.textContent = 'Copied!';
        copyOtp.style.background = 'rgba(74, 222, 128, 0.2)';
        
        setTimeout(() => {
            copyOtp.textContent = 'Copy Code';
            copyOtp.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 2000);
    }).catch(() => {
        // Fallback for browsers that don't support clipboard API
        const tempInput = document.createElement('input');
        tempInput.value = generatedOtp;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        copyOtp.textContent = 'Copied!';
        copyOtp.style.background = 'rgba(74, 222, 128, 0.2)';
        
        setTimeout(() => {
            copyOtp.textContent = 'Copy Code';
            copyOtp.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 2000);
    });
});
