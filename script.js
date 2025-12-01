// ------------------- PAGE SWITCH ---------------------
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// ------------------- QR GENERATOR ---------------------
function generateQR() {
    const text = document.getElementById("textInput").value;

    if (text.trim() === "") {
        alert("Please enter some text");
        return;
    }

    const qr = new QRious({
        element: document.createElement("canvas"),
        size: 250,
        value: text
    });

    const container = document.getElementById("qrContainer");
    container.innerHTML = ""; 
    container.appendChild(qr.element);
}

// ------------------- QR SCANNER -----------------------
const video = document.getElementById("preview");
const result = document.getElementById("result");

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.play();
});

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

function scanQRCode() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
            result.textContent = code.data;
        }
    }
    requestAnimationFrame(scanQRCode);
}

requestAnimationFrame(scanQRCode);
