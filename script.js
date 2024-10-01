
// Function to generate the QR code
function generateQRCode() {
    const qrTitle = document.getElementById('qrTitleInput').value;
    const dataInput = document.getElementById('dataInput').value;
    const fileInput = document.getElementById('fileInput').files[0];

    // If a file is selected, read its contents
    if (fileInput) {
        const reader = new FileReader();

        // Handle text, binary, and image files as a base64 encoded string
        reader.onload = function(event) {
            const fileContent = event.target.result;
            // Convert the file content (if binary) into a base64 encoded string for the QR code
            const qrData = isTextFile(fileInput) ? fileContent : btoa(fileContent);
            createQRCode(qrTitle, qrData);
        };

        // Check if the file is a text file, read as text, else read as binary data (ArrayBuffer)
        if (isTextFile(fileInput)) {
            reader.readAsText(fileInput);  // Read text files as text
        } else {
            reader.readAsBinaryString(fileInput);  // Read other files as binary
        }
    } 
    // If no file, use manual data input
    else if (dataInput) {
        createQRCode(qrTitle, dataInput);
    } 
    // If no data at all
    else {
        alert("Please enter some data or choose a file to generate a QR code.");
    }
}

// Function to check if the file is a text file (based on its MIME type)
function isTextFile(file) {
    return file.type.startsWith("text/");
}

// Function to create and display QR code
function createQRCode(qrTitle, data) {
    // Create a wrapper div to hold QR code and title
    const qrWrapper = document.createElement('div');
    qrWrapper.classList.add('qr-wrapper');

    // Create a div to hold the QR code
    const qrDiv = document.createElement('div');
    qrDiv.id = `qrcode-${Date.now()}`;  // Unique ID for each QR code

    // Create QR code title
    const qrTitleDiv = document.createElement('div');
    qrTitleDiv.classList.add('qr-title');
    qrTitleDiv.innerHTML = qrTitle ? `<strong>${qrTitle}</strong>` : ``;

    // Generate QR code
    new QRCode(qrDiv, {
        text: data,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });

    // Create a delete button for each QR code
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        qrWrapper.remove();  // Remove the entire QR code wrapper
    };

    // Append the title, QR code, and delete button to the wrapper
    qrWrapper.appendChild(qrTitleDiv);
    qrWrapper.appendChild(qrDiv);
    qrWrapper.appendChild(deleteButton);

    // Add the new QR code to the container
    document.getElementById('qrcode-container').appendChild(qrWrapper);

    // Clear input fields after generating QR code
    document.getElementById('dataInput').value = '';
    document.getElementById('qrTitleInput').value = '';
    document.getElementById('fileInput').value = '';  // Clear the file input
}